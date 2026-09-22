import { describe, it, expect } from 'vitest';
import { computeDeltas } from './deltas';
describe('deltas', () => {
  it('arithmetic difference at house weights', () => {
    const d = computeDeltas([{ id: 'a', fineness: 700, rank: 1 }], [{ id: 'a', fineness: 745, rank: 2 }], '2026-09');
    expect(d['a'].fineness).toBe(-45); expect(d['a'].rank).toBe(1);
  });
  it('new admission has no delta', () => {
    const d = computeDeltas([{ id: 'b', fineness: 500, rank: 3 }], [], '2026-09');
    expect(d['b']).toBeUndefined();
  });
});
