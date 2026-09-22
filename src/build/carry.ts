import { buildEdition, type EditionInput, type EditorialVenue } from './edition';
import type { Edition, Snapshot } from '../types';

/**
 * Build the next edition by carrying all editorial judgement forward
 * (scores, rationale, thesis, pairing, links, facts, status) and applying
 * fresh snapshot metrics. Scores never move here: movement is a human
 * decision recorded in review, so full-auto runs publish steady numbers
 * with refreshed data. Ranks and bands recompute at house weights.
 */
export function buildNextEdition(
  prev: Edition,
  snapshot: Snapshot,
  providers: Record<string, string[]>,
  input: EditionInput,
): Edition {
  const snapById = new Map(snapshot.venues.map((v) => [v.id, v]));
  const editorial: EditorialVenue[] = prev.venues.map((v) => {
    const snap = snapById.get(v.id);
    // Union of prior and fresh provenance: retained figures keep their
    // original source, refreshed figures gain the confirming provider.
    const sourceIds = [...new Set([...v.metrics.sourceIds, ...(providers[v.id] ?? [])])];
    return {
      id: v.id,
      name: v.name,
      chain: v.chain,
      resident: v.resident,
      status: v.status,
      admittedEdition: v.admittedEdition,
      thesis: v.thesis,
      scores: { ...v.scores },
      rationale: { ...v.rationale },
      pairing: { ...v.pairing },
      metrics: {
        cumulativeVolumeUsd: snap?.cumulativeVolumeUsd ?? null,
        dailyVolumeUsd: snap?.dailyVolumeUsd ?? null,
        fees24hUsd: snap?.fees24hUsd ?? null,
        tvlUsd: snap?.tvlUsd ?? null,
        sourceIds,
      },
      links: { ...v.links },
      facts: v.facts.map((f) => [...f] as [string, string]),
    };
  });
  return buildEdition(snapshot, editorial, input);
}
