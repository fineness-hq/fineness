import type { Venue } from "../types";

/**
 * Admission review assistant for brief section 7. Non-blocking: returns
 * warning strings, never throws. Only venues admitted under the standard
 * (Edition 02 onward) are checked; Edition 01 listed ten findable venues
 * with no standard, so they are grandfathered.
 *
 * Machine-decidable conditions only. C3 (a completed launch or live
 * market) has no direct schema signal, so an all-null market record is
 * flagged for manual launch-evidence review rather than failed outright.
 */

export const STANDARD_FROM = "2026-10";

/** Split threshold (brief §16 Q1): resident register + watch list. */
export const WATCHLIST_SPLIT_AT = 3;

export interface AdmissionFinding {
  id: string;
  failed: string[];
}

function hasMarketEvidence(v: Venue): boolean {
  const m = v.metrics;
  return (
    m.cumulativeVolumeUsd != null ||
    m.dailyVolumeUsd != null ||
    m.fees24hUsd != null ||
    m.tvlUsd != null
  );
}

export function checkAdmission(venues: Venue[]): AdmissionFinding[] {
  const out: AdmissionFinding[] = [];
  for (const v of venues) {
    if (v.admittedEdition < STANDARD_FROM) continue;
    const failed: string[] = [];
    const verified = (v.contracts ?? []).some(
      (c) => c.verified && typeof c.address === "string" && c.address.length > 0,
    );
    if (!verified) failed.push("C1: no verified contract on a public chain explorer");
    if (v.pairing?.assetType === "none" || v.pairing?.assetType == null) {
      failed.push("C2: pairing claims no real world backing");
    }
    if (!hasMarketEvidence(v)) {
      failed.push("C3: no published market figures, confirm a completed launch manually");
    }
    if (v.links?.site == null && v.links?.docs == null) {
      failed.push("C4: no reachable interface or docs under operator control");
    }
    if (failed.length > 0) out.push({ id: v.id, failed });
  }
  return out;
}

/**
 * Register scope note (brief §16 Q1). The register stays a single
 * cross-chain ranking while off-chain venues are few; at
 * WATCHLIST_SPLIT_AT non-resident venues the desk splits into a resident
 * register plus a watch list. Informational, never blocking.
 */
export function scopeNote(venues: Venue[]): string | null {
  const offChain = venues.filter((v) => !v.resident).length;
  if (offChain >= WATCHLIST_SPLIT_AT) {
    return `scope: ${offChain} off-chain venues reach the split threshold: open a resident register plus watch list`;
  }
  return null;
}
