import { band, HALLMARK } from "../scoring/fineness";

export interface RankedVenue {
  id: string;
  fineness: number;
  rank: number;
}

export interface Delta {
  fineness: number;
  rank: number;
  bandChanged: boolean;
  crossedHallmark: boolean;
  basis: string;
}

/**
 * Deltas at house weights only. New admissions carry no delta.
 * Rank delta is prior rank minus current rank.
 */
export function computeDeltas(
  curr: RankedVenue[],
  prev: RankedVenue[],
  basis: string,
): Record<string, Delta> {
  const prior = new Map(prev.map((v) => [v.id, v]));
  const out: Record<string, Delta> = {};
  for (const v of curr) {
    const p = prior.get(v.id);
    if (!p) continue;
    out[v.id] = {
      fineness: v.fineness - p.fineness,
      rank: p.rank - v.rank,
      bandChanged: band(v.fineness) !== band(p.fineness),
      crossedHallmark:
        (p.fineness >= HALLMARK) !== (v.fineness >= HALLMARK),
      basis,
    };
  }
  return out;
}
