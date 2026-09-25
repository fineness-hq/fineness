import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { describe, it, expect } from 'vitest';
import { computeDeltas } from '../src/build/deltas';
import { hashSnapshot } from '../src/build/edition';
import { validateEdition } from '../src/build/validate';
import { HOUSE_WEIGHTS, band, fineness } from '../src/scoring/fineness';
import { dash, usd } from '../src/site/lib/format';
import { applyWeights, parseWeights, serializeWeights } from '../src/site/weight-url';
import editionJson from '../data/editions/2026-09.json';
import snapshotJson from '../data/snapshots/2026-09-01.json';
import sourcesJson from '../data/sources.json';
import type { Edition, SourceRegistry, Venue } from '../src/types';

const edition = editionJson as unknown as Edition;
const sources = sourcesJson as unknown as SourceRegistry;
const venues = edition.venues as Venue[];

describe('acceptance criteria', () => {
  it('determinism: rebuild reproduces fineness values and ordering', () => {
    const recomputed = venues.map((v) => ({ id: v.id, fineness: fineness(v.scores) }));
    for (const r of recomputed) {
      expect(venues.find((v) => v.id === r.id)?.fineness).toBe(r.fineness);
    }
    const sorted = [...venues].sort(
      (a, b) => b.fineness - a.fineness || a.name.localeCompare(b.name),
    );
    expect(sorted.map((v) => v.id)).toEqual(venues.map((v) => v.id));
  });

  it('reader parity: browser recompute at house weights matches build values', () => {
    const displayed = applyWeights(venues, { ...HOUSE_WEIGHTS });
    for (const v of displayed) {
      const stored = venues.find((s) => s.id === v.id);
      expect(v.fineness).toBe(stored?.fineness);
      expect(v.band).toBe(band(stored?.fineness ?? 0));
    }
    expect(displayed.map((v) => v.id)).toEqual(venues.map((v) => v.id));
  });

  it('weight round trip: sliders update URL and loading URL restores ranking', () => {
    expect(parseWeights(serializeWeights(HOUSE_WEIGHTS))).toEqual(HOUSE_WEIGHTS);
    expect(parseWeights('?w=6,5,4,3,2')).toEqual(HOUSE_WEIGHTS);
    expect(parseWeights('')).toEqual(HOUSE_WEIGHTS);
    // Server parses the query before first paint in both entry pages.
    const home = fs.readFileSync('app/page.tsx', 'utf8');
    const editionPage = fs.readFileSync('app/editions/[edition]/page.tsx', 'utf8');
    expect(home).toContain('parseWeights');
    expect(editionPage).toContain('parseWeights');
    expect(editionPage).toContain('parseRawSliders');
  });

  it('null rendering: all-null metrics render fully with no zeros', () => {
    expect(usd(null)).toBe('not published');
    expect(dash(null)).toBe('n/a');
    const allNull = venues.filter(
      (v) =>
        v.metrics.cumulativeVolumeUsd == null &&
        v.metrics.dailyVolumeUsd == null &&
        v.metrics.fees24hUsd == null &&
        v.metrics.tvlUsd == null,
    );
    expect(allNull.length).toBeGreaterThan(0);
    const zeros = venues.filter((v) =>
      [v.metrics.cumulativeVolumeUsd, v.metrics.dailyVolumeUsd, v.metrics.fees24hUsd, v.metrics.tvlUsd].some(
        (m) => m === 0,
      ),
    );
    expect(zeros).toEqual([]);
  });

  it('cut line: positioned at first venue below 375, absent when none below', () => {
    const cutIndex = venues.findIndex((v) => v.fineness < 375);
    expect(venues[cutIndex].id).toBe('factory-new');
    expect(venues[cutIndex - 1].fineness).toBeGreaterThanOrEqual(375);
    const register = fs.readFileSync('src/site/components/Register.tsx', 'utf8');
    expect(register).toContain('findIndex((v) => v.fineness < 375)');
    const clean: Venue[] = venues
      .filter((v) => v.fineness >= 375)
      .map((v) => ({ ...v }));
    expect(clean.findIndex((v) => v.fineness < 375)).toBe(-1);
  });

  it('delta correctness: arithmetic difference, new admissions carry no delta', () => {
    const d = computeDeltas(
      [{ id: 'a', fineness: 700, rank: 1 }],
      [{ id: 'a', fineness: 745, rank: 2 }],
      '2026-09',
    );
    expect(d['a'].fineness).toBe(-45);
    expect(d['a'].rank).toBe(1);
    const fresh = computeDeltas([{ id: 'b', fineness: 500, rank: 3 }], [], '2026-09');
    expect(fresh['b']).toBeUndefined();
  });

  it('no script fallback: edition content is server rendered', () => {
    const view = fs.readFileSync('src/site/EditionView.tsx', 'utf8');
    expect(view).not.toContain("'use client'");
    expect(view).not.toContain('useEffect');
    const home = fs.readFileSync('app/page.tsx', 'utf8');
    expect(home).toContain('LATEST_EDITION');
  });

  it('responsive: no page-level horizontal scroll, tables scroll in containers', () => {
    const css = fs.readFileSync('app/globals.css', 'utf8');
    expect(css).toContain('overflow-x: clip');
    const comparison = fs.readFileSync('src/site/components/ComparisonTable.tsx', 'utf8');
    const scale = fs.readFileSync('src/site/components/ScaleTable.tsx', 'utf8');
    expect(comparison).toContain('overflow-x-auto');
    expect(scale).toContain('overflow-x-auto');
  });

  it('source integrity: unknown sourceId fails validation', () => {
    expect(() => validateEdition(edition, sources)).not.toThrow();
    const bad: Edition = {
      ...edition,
      venues: venues.map((v) => ({
        ...v,
        scores: { ...v.scores },
        rationale: { ...v.rationale },
        metrics: { ...v.metrics, sourceIds: [...v.metrics.sourceIds] },
      })),
    };
    bad.venues[0].metrics.sourceIds.push('missing-source');
    expect(() => validateEdition(bad, sources)).toThrow(/unknown sourceId/);
  });

  it('immutability: header hash matches snapshot bytes', () => {
    const raw = fs.readFileSync('data/snapshots/2026-09-01.json', 'utf8');
    expect(hashSnapshot(raw)).toBe(edition.snapshotHash);
    const direct = `sha256:${createHash('sha256').update(raw, 'utf8').digest('hex')}`;
    expect(edition.snapshotHash).toBe(direct);
    expect(snapshotJson.venues.length).toBe(10);
  });

  it('regulated table: compliance desc with alphabetical tiebreak', () => {
    const rows = [...venues].sort(
      (a, b) => b.scores.compliance - a.scores.compliance || a.name.localeCompare(b.name),
    );
    expect(rows[0].id).toBe('pools-trade');
    for (let i = 1; i < rows.length; i += 1) {
      const prev = rows[i - 1];
      const curr = rows[i];
      const ordered =
        prev.scores.compliance > curr.scores.compliance ||
        (prev.scores.compliance === curr.scores.compliance &&
          prev.name.localeCompare(curr.name) < 0);
      expect(ordered).toBe(true);
    }
    const view = fs.readFileSync('src/site/EditionView.tsx', 'utf8');
    expect(view).toContain('RegulatedTable');
    const regulated = fs.readFileSync('src/site/components/RegulatedTable.tsx', 'utf8');
    expect(regulated).toContain('overflow-x-auto');
    expect(regulated).toContain('id="regulated"');
  });

  it('entry profile: strip plus contracts and links in expanded detail', () => {
    const entry = fs.readFileSync('src/site/components/Entry.tsx', 'utf8');
    expect(entry).toContain('profileStrip');
    expect(entry).toContain('Contracts');
    expect(entry).toContain('Links');
    expect(entry).toContain('verified');
  });

  it('disclosures: edition holdings rendered in sources section', () => {
    const sourcesView = fs.readFileSync('src/site/components/Sources.tsx', 'utf8');
    expect(sourcesView).toContain('disclosures');
    expect(edition.disclosures).toEqual([]);
  });
});
