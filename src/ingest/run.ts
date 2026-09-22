// Monthly ingest job. Pulls published figures, never fabricates them.
//
// Retention rule: a fresh null never clobbers a previously published
// figure (a gap may be transient). Newly published figures override.
// Venues without any published figure keep nulls, which the register
// renders as "not published". Writes are atomic: temp file plus rename.

import { rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { Snapshot, SnapshotVenue } from '../types';
import { fetchBitqueryVolume } from './bitquery';
import { fetchDefillamaStats } from './defillama';
import { fetchContractVerification } from './explorer';
import { VENUE_INGEST } from './venues';

function take<T>(fresh: T | null, prev: T | null): T | null {
  return fresh ?? prev ?? null;
}

async function ingestVenue(
  id: string,
  prev: SnapshotVenue | undefined,
  asOf: string,
): Promise<{ venue: SnapshotVenue; providers: string[] }> {
  const used: string[] = [];
  const prevContracts = prev?.contracts ?? [];

  const mapping = VENUE_INGEST[id];
  let fees24hUsd = prev?.fees24hUsd ?? null;
  let tvlUsd = prev?.tvlUsd ?? null;
  if (mapping?.defillamaSlug) {
    const stats = await fetchDefillamaStats(mapping.defillamaSlug);
    if (stats.fees24hUsd != null) {
      fees24hUsd = stats.fees24hUsd;
      used.push('defillama');
    }
    if (stats.tvlUsd != null) {
      tvlUsd = stats.tvlUsd;
      used.push('defillama');
    }
  }

  const addresses = prevContracts.map((c) => c.address);
  const volume = await fetchBitqueryVolume(addresses);
  const cumulativeVolumeUsd = take(volume.cumulativeVolumeUsd, prev?.cumulativeVolumeUsd ?? null);
  const dailyVolumeUsd = take(volume.dailyVolumeUsd, prev?.dailyVolumeUsd ?? null);
  if (volume.cumulativeVolumeUsd != null || volume.dailyVolumeUsd != null) {
    used.push('bitquery');
  }

  const contracts = await Promise.all(
    prevContracts.map(async (c) => {
      const verified = await fetchContractVerification(c.address);
      if (verified != null) used.push('explorer');
      return { ...c, verified: verified ?? c.verified };
    }),
  );

  void asOf;
  return {
    venue: {
      id,
      cumulativeVolumeUsd,
      dailyVolumeUsd,
      fees24hUsd,
      tvlUsd,
      contracts,
    },
    providers: [...new Set(used)],
  };
}

export interface RunResult {
  snapshot: Snapshot;
  providers: Record<string, string[]>;
}

/**
 * Run the monthly pull for venue ids, falling back to the previous
 * snapshot, and write the new snapshot atomically. Returns the snapshot
 * plus per-venue contributing provider ids for edition sourceIds.
 */
export async function run(
  venueIds: string[],
  outputPath: string,
  asOf: string,
  prev?: Snapshot,
): Promise<RunResult> {
  const byId = new Map((prev?.venues ?? []).map((v) => [v.id, v]));
  const venues: SnapshotVenue[] = [];
  const providers: Record<string, string[]> = {};
  for (const id of venueIds) {
    const { venue, providers: used } = await ingestVenue(id, byId.get(id), asOf);
    venues.push(venue);
    providers[id] = used;
  }
  const snapshot: Snapshot = {
    snapshot: asOf.slice(0, 7) + '-01',
    asOf,
    venues,
  };
  const tmp = join(dirname(outputPath), `.${Date.now()}.tmp`);
  await writeFile(tmp, JSON.stringify(snapshot, null, 2) + '\n', 'utf8');
  await rename(tmp, outputPath);
  return { snapshot, providers };
}
