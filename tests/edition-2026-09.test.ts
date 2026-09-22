import { describe, it, expect } from 'vitest';
import edition from '../data/editions/2026-09.json';
import sources from '../data/sources.json';
import { fineness } from '../src/scoring/fineness';
import type { Edition, SourceRegistry, Venue } from '../src/types';
const typedEdition = edition as unknown as Edition;
const typedSources = sources as unknown as SourceRegistry;
const venues = typedEdition.venues as Venue[];
describe('edition 2026-09', () => {
  it('has 10 venues in house order', () => { expect(venues.length).toBe(10); expect(venues[0].id).toBe('long-xyz'); });
  it('fineness recomputes', () => {
    for (const v of venues) { expect(fineness(v.scores)).toBe(v.fineness); }
  });
  it('sourceIds resolve', () => {
    const ids = new Set(Object.keys(typedSources));
    for (const v of venues) for (const s of v.metrics.sourceIds) expect(ids.has(s)).toBe(true);
  });
  it('null discipline', async () => {
    const { validateEdition } = await import('../src/build/validate');
    expect(() => validateEdition(typedEdition, typedSources)).not.toThrow();
  });
});
