import { createHash } from "node:crypto";
import { band, fineness, HOUSE_WEIGHTS } from "../scoring/fineness";
import type { CorrectionNote, Edition, Snapshot, Venue } from "../types";

export interface EditorialVenue extends Omit<
  Venue,
  "fineness" | "band" | "rank" | "delta" | "metrics" | "contracts"
> {
  metrics: Omit<Venue["metrics"], "asOf"> & { asOf?: string };
}

/** Hash raw snapshot bytes for the edition header. */
export function hashSnapshot(content: string): string {
  return `sha256:${createHash("sha256").update(content, "utf8").digest("hex")}`;
}

export interface EditionInput {
  edition: string;
  published: string;
  dataAsOf: string;
  snapshotHash: string;
  disclosures?: string[];
  corrections?: CorrectionNote[];
}

/**
 * Merge snapshot metrics with editorial records, score at house weights,
 * sort by fineness descending with alphabetical tiebreak, assign ranks.
 */
export function buildEdition(
  snapshot: Snapshot,
  editorial: EditorialVenue[],
  input: EditionInput,
): Edition {
  const byId = new Map(snapshot.venues.map((v) => [v.id, v]));
  const scored = editorial.map((v) => {
    const snap = byId.get(v.id);
    const score = fineness(v.scores, HOUSE_WEIGHTS);
    return {
      ...v,
      fineness: score,
      band: band(score),
      metrics: { ...v.metrics, asOf: v.metrics.asOf ?? snapshot.asOf },
      contracts: snap ? snap.contracts : [],
    };
  });
  scored.sort((a, b) => b.fineness - a.fineness || a.name.localeCompare(b.name));
  const venues = scored.map((v, i) => ({ ...v, rank: i + 1 }));
  return {
    edition: input.edition,
    published: input.published,
    dataAsOf: input.dataAsOf,
    snapshotHash: input.snapshotHash,
    houseWeights: { ...HOUSE_WEIGHTS },
    disclosures: input.disclosures ?? [],
    corrections: input.corrections ?? [],
    venues,
  };
}
