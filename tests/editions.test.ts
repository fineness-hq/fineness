import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { validateEdition } from '../src/build/validate';
import { fineness } from '../src/scoring/fineness';
import sourcesJson from '../data/sources.json';
import type { Edition, SourceRegistry } from '../src/types';

const sources = sourcesJson as unknown as SourceRegistry;
const dir = 'data/editions';
const snapDir = 'data/snapshots';

// Generic gate for EVERY edition file: future editions need no new test
// files. Frozen files only gain checks here, never edits.
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
const snapshots = fs.readdirSync(snapDir).filter((f) => f.endsWith('.json'));
const snapshotHashes = new Set(
  snapshots.map((f) => {
    const raw = fs.readFileSync(path.join(snapDir, f), 'utf8');
    return `sha256:${createHash('sha256').update(raw, 'utf8').digest('hex')}`;
  }),
);

describe('all editions', () => {
  it('at least one frozen edition exists', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const f of files) {
    const edition = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as unknown as Edition;
    describe(`edition ${edition.edition}`, () => {
      it('validates and recomputes', () => {
        expect(edition.venues.length).toBeGreaterThan(0);
        expect(() => validateEdition(edition, sources)).not.toThrow();
        for (const v of edition.venues) {
          if (v.status !== 'prelaunch') expect(fineness(v.scores)).toBe(v.fineness);
        }
      });

      it('ordering is stable (fineness desc, name asc, pen last)', () => {
        const ranked = edition.venues.filter((v) => v.status !== 'prelaunch');
        const sorted = [...ranked].sort(
          (a, b) => b.fineness - a.fineness || a.name.localeCompare(b.name),
        );
        expect(ranked.map((v) => v.id)).toEqual(sorted.map((v) => v.id));
      });

      it('header hash matches a committed snapshot', () => {
        expect(snapshotHashes.has(edition.snapshotHash)).toBe(true);
      });

      it('sourceIds resolve', () => {
        const ids = new Set(Object.keys(sources));
        for (const v of edition.venues) {
          for (const s of v.metrics.sourceIds) expect(ids.has(s)).toBe(true);
        }
      });
    });
  }
});
