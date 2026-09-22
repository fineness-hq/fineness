// Monthly hands-free run: ingest → snapshot → carried edition → validate.
// Scores never move here; movement is a human review decision. Any validation
// failure removes the snapshot again and exits non-zero, so a bad run leaves
// no trace and the previous edition stays live.

import { rm, readFile, rename, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { buildNextEdition } from '../src/build/carry';
import { validateEdition } from '../src/build/validate';
import { warnScoreMoves } from '../src/build/score-moves';
import { run } from '../src/ingest/run';
import type { Edition, Snapshot, SourceRegistry } from '../src/types';

function arg(name: string, fallback: string): string {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf8')) as T;
}

async function atomicWrite(path: string, content: string): Promise<void> {
  const tmp = join(dirname(path), `.${Date.now()}.tmp`);
  await writeFile(tmp, content, 'utf8');
  await rename(tmp, path);
}

async function main(): Promise<void> {
  const root = process.cwd();
  const asOf = arg('as-of', today());
  const published = arg('published', today());
  const editionId = arg('edition', asOf.slice(0, 7));
  if (!/^\d{4}-\d{2}$/.test(editionId)) throw new Error(`bad edition id ${editionId}`);

  const editionsDir = join(root, 'data', 'editions');
  const snapshotsDir = join(root, 'data', 'snapshots');
  const sources = await readJson<SourceRegistry>(join(root, 'data', 'sources.json'));

  // Latest published edition is the carry base.
  const { readdir } = await import('node:fs/promises');
  const files = (await readdir(editionsDir)).filter((f) => f.endsWith('.json')).sort();
  if (files.length === 0) throw new Error('no published editions to carry from');
  const prev = await readJson<Edition>(join(editionsDir, files[files.length - 1]));
  if (prev.edition >= editionId) {
    throw new Error(`edition ${editionId} is not newer than ${prev.edition}; refusing to overwrite the register`);
  }

  // Rebuild the previous snapshot shape from the frozen edition so the
  // retention rule has a fallback even when the snapshot file is absent.
  const prevSnapshot: Snapshot = {
    snapshot: prev.dataAsOf,
    asOf: prev.dataAsOf,
    venues: prev.venues.map((v) => ({
      id: v.id,
      cumulativeVolumeUsd: v.metrics.cumulativeVolumeUsd,
      dailyVolumeUsd: v.metrics.dailyVolumeUsd,
      fees24hUsd: v.metrics.fees24hUsd,
      tvlUsd: v.metrics.tvlUsd,
      contracts: v.contracts,
    })),
  };

  const snapshotPath = join(snapshotsDir, `${asOf}.json`);
  const { snapshot, providers } = await run(
    prev.venues.map((v) => v.id),
    snapshotPath,
    asOf,
    prevSnapshot,
  );

  try {
    const raw = await readFile(snapshotPath, 'utf8');
    const snapshotHash = `sha256:${createHash('sha256').update(raw, 'utf8').digest('hex')}`;
    const edition = buildNextEdition(prev, snapshot, providers, {
      edition: editionId,
      published,
      dataAsOf: asOf,
      snapshotHash,
      disclosures: [...prev.disclosures],
    });
    validateEdition(edition, sources);
    const warnings = warnScoreMoves(edition, prev);
    for (const w of warnings) console.log(`warn: ${w}`);
    await atomicWrite(
      join(editionsDir, `${editionId}.json`),
      JSON.stringify(edition, null, 2) + '\n',
    );
    const filled = snapshot.venues.filter(
      (v) =>
        v.cumulativeVolumeUsd != null ||
        v.dailyVolumeUsd != null ||
        v.fees24hUsd != null ||
        v.tvlUsd != null,
    ).length;
    console.log(
      `edition ${editionId}: ${snapshot.venues.length} venues, ${filled} with figures, ${warnings.length} warnings, hash ${snapshotHash.slice(0, 19)}…`,
    );
  } catch (err) {
    await rm(snapshotPath, { force: true });
    throw err;
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
