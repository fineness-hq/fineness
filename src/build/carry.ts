import { buildEdition, type EditionInput, type EditorialVenue } from './edition';
import { computeDeltas } from './deltas';
import type { EditionReview } from '../llm/review';
import type { Edition, Snapshot } from '../types';

/**
 * Build the next edition by carrying all editorial judgement forward
 * (scores, rationale, thesis, pairing, links, facts, status) and applying
 * fresh snapshot metrics. An AI review may move scores inside the ±1 cap
 * with rewritten rationale; without one, everything carries unchanged and
 * the run publishes steady numbers with refreshed data. Ranks and bands
 * recompute at house weights. Deltas vs the prior edition are embedded
 * at house weights only; struck venues record the freeze date.
 */
export function buildNextEdition(
  prev: Edition,
  snapshot: Snapshot,
  providers: Record<string, string[]>,
  input: EditionInput,
  review?: EditionReview | null,
): Edition {
  const snapById = new Map(snapshot.venues.map((v) => [v.id, v]));
  const editorial: EditorialVenue[] = prev.venues.map((v) => {
    const snap = snapById.get(v.id);
    const rev = review?.venues[v.id];
    // Union of prior and fresh provenance: retained figures keep their
    // original source, refreshed figures gain the confirming provider.
    const sourceIds = [...new Set([...v.metrics.sourceIds, ...(providers[v.id] ?? [])])];
    const status = rev?.status ?? v.status;
    const struckDate =
      status === 'struck'
        ? v.status === 'struck'
          ? (v.struckDate ?? input.dataAsOf)
          : input.dataAsOf
        : null;
    return {
      id: v.id,
      name: v.name,
      chain: v.chain,
      resident: v.resident,
      status,
      struckDate,
      admittedEdition: v.admittedEdition,
      thesis: rev?.thesis ?? v.thesis,
      scores: rev ? { ...rev.scores } : { ...v.scores },
      rationale: rev ? { ...rev.rationale } : { ...v.rationale },
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
  const edition = buildEdition(snapshot, editorial, {
    ...input,
    disclosures: input.disclosures,
    corrections: [...(prev.corrections ?? []), ...(input.corrections ?? [])],
  });
  const deltas = computeDeltas(edition.venues, prev.venues, prev.edition);
  for (const v of edition.venues) {
    if (deltas[v.id]) v.delta = deltas[v.id];
  }
  return edition;
}
