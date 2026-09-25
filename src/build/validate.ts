import { band, CRITERIA, fineness } from "../scoring/fineness";
import type { Edition, SourceRegistry } from "../types";

function fail(venue: string, reason: string): never {
  throw new Error(`invalid venue ${venue}: ${reason}`);
}

const PAIRING_TYPES = ["none", "tokenized-equity", "inventory-index", "collectible", "synthetic"];
const VERIFIABILITY = ["on-chain", "public-inventory", "attestation", "none"];
const STATUSES = ["active", "prelaunch", "paused", "struck"];

/** Throw on bad scores, incomplete rationale, unknown sourceId, or bad metrics. */
export function validateEdition(
  edition: Edition,
  sources: SourceRegistry,
): void {
  if (!Array.isArray(edition.venues) || edition.venues.length === 0) {
    throw new Error("edition has no venues");
  }
  for (const v of edition.venues) {
    if (!PAIRING_TYPES.includes(v.pairing?.assetType)) {
      fail(v.id, `pairing.assetType must be one of ${PAIRING_TYPES.join("|")}`);
    }
    if (!VERIFIABILITY.includes(v.pairing?.verifiability)) {
      fail(v.id, `pairing.verifiability must be one of ${VERIFIABILITY.join("|")}`);
    }
    if (typeof v.pairing?.redeemable !== "boolean") {
      fail(v.id, "pairing.redeemable must be a boolean");
    }
    if (!STATUSES.includes(v.status)) {
      fail(v.id, `status must be one of ${STATUSES.join("|")}`);
    }
    if (!/^\d{4}-\d{2}$/.test(v.admittedEdition ?? "")) {
      fail(v.id, "admittedEdition must be YYYY-MM");
    }
    if (!Array.isArray(v.contracts)) fail(v.id, "contracts must be an array");
    for (const c of v.contracts ?? []) {
      if (typeof c.label !== "string" || typeof c.address !== "string" || typeof c.verified !== "boolean") {
        fail(v.id, "each contract needs {label, address, verified}");
      }
    }
    if (!Array.isArray(v.facts) || v.facts.some((f) => !Array.isArray(f) || f.length !== 2)) {
      fail(v.id, "facts must be [figure, note] pairs");
    }
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
    if (v.struckDate !== null && v.struckDate !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(v.struckDate)) {
      fail(v.id, "struckDate must be null or YYYY-MM-DD");
    }
    if ((v.status === "struck") === (v.struckDate == null)) {
      fail(v.id, "struck status and struckDate must agree");
    }
    if (v.delta !== undefined) {
      const d = v.delta;
      if (
        typeof d.fineness !== "number" ||
        typeof d.rank !== "number" ||
        typeof d.bandChanged !== "boolean" ||
        typeof d.crossedHallmark !== "boolean" ||
        typeof d.basis !== "string" ||
        d.basis.length === 0
      ) {
        fail(v.id, "delta must be {fineness, rank, bandChanged, crossedHallmark, basis}");
      }
    }
  }
  if (!Array.isArray(edition.corrections)) {
    throw new Error("edition corrections must be an array");
  }
  for (const c of edition.corrections ?? []) {
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(c.date ?? "") ||
      typeof c.note !== "string" ||
      c.note.trim().length === 0 ||
      typeof c.originalFigure !== "string" ||
      c.originalFigure.trim().length === 0
    ) {
      throw new Error("each correction needs {date YYYY-MM-DD, note, originalFigure}");
    }
  }
}
