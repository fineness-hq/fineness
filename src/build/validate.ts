import { band, CRITERIA, fineness } from "../scoring/fineness";
import type { Edition, SourceRegistry } from "../types";

function fail(venue: string, reason: string): never {
  throw new Error(`invalid venue ${venue}: ${reason}`);
}

/** Throw on bad scores, incomplete rationale, unknown sourceId, or bad metrics. */
export function validateEdition(
  edition: Edition,
  sources: SourceRegistry,
): void {
  if (!Array.isArray(edition.venues) || edition.venues.length === 0) {
    throw new Error("edition has no venues");
  }
  for (const v of edition.venues) {
    for (const c of CRITERIA) {
      const s = v.scores?.[c];
      if (!Number.isInteger(s) || s < 0 || s > 10) {
        fail(v.id, `score ${c} must be an integer 0..10`);
      }
      const r = v.rationale?.[c];
      if (typeof r !== "string" || r.trim().length === 0) {
        fail(v.id, `rationale ${c} must be non-empty`);
      }
    }
    if (typeof v.thesis !== "string" || v.thesis.trim().length === 0) {
      fail(v.id, "thesis must be non-empty");
    }
    if (!v.metrics || !Array.isArray(v.metrics.sourceIds)) {
      fail(v.id, "metrics with sourceIds required, null fields allowed but metrics must exist");
    }
    for (const id of v.metrics.sourceIds) {
      if (!Object.hasOwn(sources, id)) fail(v.id, `unknown sourceId ${id}`);
    }
    for (const key of [
      "cumulativeVolumeUsd",
      "dailyVolumeUsd",
      "fees24hUsd",
      "tvlUsd",
    ] as const) {
      const n = v.metrics[key];
      if (n !== null && (typeof n !== "number" || !Number.isFinite(n) || n < 0)) {
        fail(v.id, `metric ${key} must be null or a finite number >= 0`);
      }
    }
    if (fineness(v.scores) !== v.fineness) {
      fail(v.id, "fineness does not recompute from scores");
    }
    if (band(v.fineness) !== v.band) {
      fail(v.id, "band does not match fineness");
    }
  }
}
