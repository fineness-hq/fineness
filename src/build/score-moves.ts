import { CRITERIA } from "../scoring/fineness";
import type { Edition } from "../types";

/**
 * Review assistant for SCORE-POLICY.md. Non-blocking: returns warning
 * strings, never throws. Flags moved scores without a rationale change
 * (likely oversight) and moves beyond ±1 per edition (cap, rule 2).
 */
export function warnScoreMoves(curr: Edition, prev: Edition): string[] {
  const warnings: string[] = [];
  const prior = new Map(prev.venues.map((v) => [v.id, v]));
  for (const v of curr.venues) {
    const p = prior.get(v.id);
    if (!p) continue;
    for (const c of CRITERIA) {
      const from = p.scores[c];
      const to = v.scores[c];
      if (to === from) continue;
      if (Math.abs(to - from) > 1) {
        warnings.push(
          `${v.id} ${c}: moved ${from} -> ${to}, beyond the ±1 cap without a recorded major event`,
        );
      }
      if (p.rationale[c] === v.rationale[c]) {
        warnings.push(
          `${v.id} ${c}: score moved ${from} -> ${to} but rationale text is unchanged`,
        );
      }
    }
  }
  return warnings;
}
