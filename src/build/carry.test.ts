import { describe, expect, it } from 'vitest';
import { buildNextEdition } from './carry';
import edition09Json from '../../data/editions/2026-09.json';
import snapshot09Json from '../../data/snapshots/2026-09-01.json';
import type { Edition, Snapshot } from '../types';

const prev = edition09Json as unknown as Edition;
const snapshot = snapshot09Json as unknown as Snapshot;

describe('buildNextEdition', () => {
  it('carries editorial judgement and applies fresh metrics', () => {
    const edition = buildNextEdition(prev, snapshot, {}, {
      edition: '2026-10',
      published: '2026-10-08',
      dataAsOf: '2026-10-01',
      snapshotHash: 'sha256:test',
    });
    expect(edition.edition).toBe('2026-10');
    expect(edition.venues.length).toBe(prev.venues.length);
    for (const v of edition.venues) {
      const p = prev.venues.find((o) => o.id === v.id);
      expect(v.scores).toEqual(p?.scores);
      expect(v.rationale).toEqual(p?.rationale);
      expect(v.thesis).toBe(p?.thesis);
      expect(v.metrics.asOf).toBe(snapshot.asOf);
    }
    const pons = edition.venues.find((v) => v.id === 'pons');
    expect(pons?.metrics.fees24hUsd).toBeNull();
  });

  it('recomputes ranks at house weights', () => {
    const tweaked: Snapshot = {
      ...snapshot,
      venues: snapshot.venues.map((v) => ({ ...v })),
    };
    const edition = buildNextEdition(prev, tweaked, {}, {
      edition: '2026-10',
      published: '2026-10-08',
      dataAsOf: '2026-10-01',
      snapshotHash: 'sha256:test',
    });
    const sorted = [...edition.venues].sort(
      (a, b) => b.fineness - a.fineness || a.name.localeCompare(b.name),
    );
    expect(sorted.map((v) => v.id)).toEqual(edition.venues.map((v) => v.id));
  });
});
