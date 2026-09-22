export const CRITERIA = [
  'asset', 'traction', 'transparency', 'compliance', 'durability'
] as const;

export type Criterion = typeof CRITERIA[number];
export type Scores  = Record<Criterion, number>;
export type Weights = Record<Criterion, number>;

export const HOUSE_WEIGHTS: Weights = {
  asset:        0.30,  // asset quality and verifiability
  traction:     0.25,  // volume, share, fee revenue, pool depth
  transparency: 0.20,  // contracts, locks, docs, named entity
  compliance:   0.15,  // regulatory standing, disclosure
  durability:   0.10,  // age, shock resilience, dependencies
};

export const HALLMARK = 375;

/**
 * Scores are integers 0..10. Weights must sum to 1.
 * Returns fineness in parts per thousand, 0..1000.
 */
export function fineness(scores: Scores, weights: Weights = HOUSE_WEIGHTS): number {
  const total = CRITERIA.reduce((a, c) => a + weights[c], 0);
  if (Math.abs(total - 1) > 1e-9) throw new Error('weights must sum to 1');
  const raw = CRITERIA.reduce((a, c) => a + scores[c] * weights[c], 0);
  return Math.round(raw * 100);
}

export type Band = '22k' | '18k' | '14k' | '9k' | 'below-hallmark';

export function band(f: number): Band {
  if (f >= 916) return '22k';
  if (f >= 750) return '18k';
  if (f >= 585) return '14k';
  if (f >= HALLMARK) return '9k';
  return 'below-hallmark';
}

/** Slider integers 0..10 normalised to weights summing to 1. */
export function normalise(raw: Record<Criterion, number>): Weights {
  const sum = CRITERIA.reduce((a, c) => a + raw[c], 0);
  const out = {} as Weights;
  for (const c of CRITERIA) {
    out[c] = sum === 0 ? 1 / CRITERIA.length : raw[c] / sum;
  }
  return out;
}
