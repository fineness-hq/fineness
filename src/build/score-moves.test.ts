import { describe, it, expect } from 'vitest';
import { warnScoreMoves } from './score-moves';
import editionJson from '../../data/editions/2026-09.json';
import type { Edition } from '../types';

const edition = editionJson as unknown as Edition;

function clone(): Edition {
  return JSON.parse(JSON.stringify(edition)) as Edition;
}

describe('warnScoreMoves', () => {
  it('silent when nothing moves', () => {
    expect(warnScoreMoves(clone(), clone())).toEqual([]);
  });

  it('silent for new admissions', () => {
    const curr = clone();
    curr.venues.push({ ...curr.venues[0], id: 'brand-new', name: 'Brand New' });
    expect(warnScoreMoves(curr, edition)).toEqual([]);
  });

  it('flags moved score with unchanged rationale', () => {
    const curr = clone();
    curr.venues[0].scores.asset += 1;
    const warnings = warnScoreMoves(curr, edition);
    expect(warnings.some((w) => w.includes('long-xyz asset'))).toBe(true);
  });

  it('flags moves beyond the ±1 cap', () => {
    const curr = clone();
    curr.venues[0].scores.asset += 2;
    curr.venues[0].rationale.asset = 'Fresh audited statements landed.';
    const warnings = warnScoreMoves(curr, edition);
    expect(warnings.some((w) => w.includes('beyond the ±1 cap'))).toBe(true);
    expect(warnings.some((w) => w.includes('rationale text is unchanged'))).toBe(false);
  });
});
