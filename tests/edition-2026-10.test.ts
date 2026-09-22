import fs from 'node:fs';
import { describe, it, expect } from 'vitest';
import { computeDeltas } from '../src/build/deltas';
import { hashSnapshot } from '../src/build/edition';
import { validateEdition } from '../src/build/validate';
import { warnScoreMoves } from '../src/build/score-moves';
import { fineness } from '../src/scoring/fineness';
import edition10Json from '../data/editions/2026-10.json';
import edition09Json from '../data/editions/2026-09.json';
import sourcesJson from '../data/sources.json';
import type { Edition, SourceRegistry } from '../src/types';

const edition = edition10Json as unknown as Edition;
const prev = edition09Json as unknown as Edition;
const sources = sourcesJson as unknown as SourceRegistry;

describe('edition 2026-10', () => {
  it('has 10 retained venues in house order with pons leading', () => {
    expect(edition.venues.length).toBe(10);
    expect(edition.venues[0].id).toBe('pons');
    expect(edition.venues[0].fineness).toBe(745);
    expect(edition.venues.map((v) => v.id).sort()).toEqual(
      prev.venues.map((v) => v.id).sort(),
    );
  });

  it('fineness recomputes from scores at house weights', () => {
    for (const v of edition.venues) {
      expect(fineness(v.scores)).toBe(v.fineness);
    }
    const sorted = [...edition.venues].sort(
      (a, b) => b.fineness - a.fineness || a.name.localeCompare(b.name),
    );
    expect(sorted.map((v) => v.id)).toEqual(edition.venues.map((v) => v.id));
  });

  it('passes validation with new sourceIds resolving', () => {
    expect(() => validateEdition(edition, sources)).not.toThrow();
  });

  it('header hash matches the day-22 snapshot bytes', () => {
    const raw = fs.readFileSync('data/snapshots/2026-09-22.json', 'utf8');
    expect(hashSnapshot(raw)).toBe(edition.snapshotHash);
  });

  it('deltas equal arithmetic differences at house weights', () => {
    const deltas = computeDeltas(edition.venues, prev.venues, '2026-09');
    expect(deltas['pons']).toMatchObject({ fineness: 30, rank: 1 });
    expect(deltas['long-xyz']).toMatchObject({ fineness: 0, rank: -1 });
    expect(deltas['stonkfun'].fineness).toBe(20);
    expect(deltas['flap'].fineness).toBe(-20);
    expect(deltas['pair'].fineness).toBe(15);
    expect(deltas['bankr'].fineness).toBe(20);
    expect(deltas['factory-new'].fineness).toBe(10);
    for (const v of edition.venues) {
      expect(deltas[v.id].basis).toBe('2026-09');
    }
  });

  it('score review leaves no policy warnings', () => {
    expect(warnScoreMoves(edition, prev)).toEqual([]);
  });

  it('peak still below 18 karat', () => {
    const peak = Math.max(...edition.venues.map((v) => v.fineness));
    expect(peak).toBe(745);
    expect(peak).toBeLessThan(750);
  });
});
