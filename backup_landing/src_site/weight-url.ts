import { CRITERIA, HOUSE_WEIGHTS, band, fineness, normalise } from '../scoring/fineness';
import type { Criterion, Weights } from '../scoring/fineness';
import type { Venue } from '../types';

export type RawWeights = Record<Criterion, number>;

const PRESET_SCALE = 20;

function clampSlider(value: number): number {
  if (!Number.isFinite(value)) return NaN as unknown as number;
  return Math.min(10, Math.max(0, Math.round(value)));
}

/** Parse `?w=a,b,c,d,e` in CRITERIA order. Invalid or empty falls back to house weights. */
export function parseWeights(search: string): Weights {
  if (!search) return { ...HOUSE_WEIGHTS };
  const query = search.includes('?') ? search.slice(search.indexOf('?')) : search;
  let token: string | null = null;
  try {
    token = new URLSearchParams(query).get('w');
  } catch {
    return { ...HOUSE_WEIGHTS };
  }
  if (token == null || token.trim() === '') return { ...HOUSE_WEIGHTS };
  const parts = token.split(',').map((p) => clampSlider(Number(p.trim())));
  if (parts.length !== CRITERIA.length || parts.some((n) => !Number.isFinite(n))) {
    return { ...HOUSE_WEIGHTS };
  }
  const raw = {} as RawWeights;
  CRITERIA.forEach((c, i) => {
    raw[c] = parts[i];
  });
  return normalise(raw);
}

/** House slider positions. Normalised they equal HOUSE_WEIGHTS. */
export const HOUSE_RAW: RawWeights = {
  asset: 6,
  traction: 5,
  transparency: 4,
  compliance: 3,
  durability: 2,
};

/**
 * Parse raw slider integers from `?w=a,b,c,d,e`.
 * Keeps sender values so shared links render the sender ranking before first paint.
 * Invalid or empty input falls back to house sliders.
 */
export function parseRawSliders(search: string): RawWeights {
  if (!search) return { ...HOUSE_RAW };
  const query = search.includes('?') ? search.slice(search.indexOf('?')) : search;
  let token: string | null = null;
  try {
    token = new URLSearchParams(query).get('w');
  } catch {
    return { ...HOUSE_RAW };
  }
  if (token == null || token.trim() === '') return { ...HOUSE_RAW };
  const parts = token.split(',').map((p) => clampSlider(Number(p.trim())));
  if (parts.length !== CRITERIA.length || parts.some((n) => !Number.isFinite(n))) {
    return { ...HOUSE_RAW };
  }
  const raw = {} as RawWeights;
  CRITERIA.forEach((c, i) => {
    raw[c] = parts[i];
  });
  return raw;
}

/** Serialize normalized weights to `?w=a,b,c,d,e` slider integers. */
export function serializeWeights(weights: Weights): string {
  const ints = CRITERIA.map((c) => {
    const v = weights[c];
    if (!Number.isFinite(v)) return 0;
    return Math.min(10, Math.max(0, Math.round(v * PRESET_SCALE)));
  });
  if (ints.every((n) => n === 0)) return '?w=2,2,2,2,2';
  return `?w=${ints.join(',')}`;
}

/** Recompute fineness at custom weights, sorted desc with alphabetical tiebreak. */
export function applyWeights(venues: Venue[], weights: Weights): Venue[] {
  const scored = venues.map((v) => {
    const f = fineness(v.scores, weights);
    return { ...v, fineness: f, band: band(f) };
  });
  scored.sort((a, b) => b.fineness - a.fineness || a.name.localeCompare(b.name));
  return scored.map((v, i) => ({ ...v, rank: i + 1 }));
}
