import fs from 'node:fs';
import { describe, it, expect } from 'vitest';
import { computeDeltas } from '../src/build/deltas';
import { hashSnapshot } from '../src/build/edition';
import { validateEdition } from '../src/build/validate';
import { warnScoreMoves } from '../src/build/score-moves';
import { fineness } from '../src/scoring/fineness';
import edition11Json from '../data/editions/2026-11.json';
import edition10Json from '../data/editions/2026-10.json';
import sourcesJson from '../data/sources.json';
import type { Edition, SourceRegistry } from '../src/types';

const edition = edition11Json as unknown as Edition;
const prev = edition10Json as unknown as Edition;
const sources = sourcesJson as unknown as SourceRegistry;

describe('edition 2026-11', () => {
  it('produced fully automatically with AI review and steady scores', () => {
    expect(edition.venues.length).toBe(10);
    expect(edition.venues[0].id).toBe('pons');
    for (const v of edition.venues) {
      const p = prev.venues.find((o) => o.id === v.id);
      expect(v.scores).toEqual(p?.scores);
      expect(fineness(v.scores)).toBe(v.fineness);
    }
  });

  it('passes validation and policy check', () => {
    expect(() => validateEdition(edition, sources)).not.toThrow();
    expect(warnScoreMoves(edition, prev)).toEqual([]);
  });

  it('header hash matches its snapshot bytes', () => {
    const raw = fs.readFileSync('data/snapshots/2026-11-01.json', 'utf8');
    expect(hashSnapshot(raw)).toBe(edition.snapshotHash);
  });

  it('deltas are all zero against 2026-10', () => {
    const deltas = computeDeltas(edition.venues, prev.venues, '2026-10');
    for (const v of edition.venues) {
      expect(deltas[v.id]).toMatchObject({ fineness: 0, rank: 0, basis: '2026-10' });
    }
  });
});
