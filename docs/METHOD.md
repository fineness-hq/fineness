# Fineness Method

Standing methodology of the Fineness register. This document mirrors the
`/method` page. Scores are editorial judgements on public information.
Fineness is never an audit, a credit rating, or investment advice.

## Scoring engine

Each venue is scored 0 to 10 on five criteria with fixed house weights:

| Criterion | House weight |
|---|---:|
| Asset quality and verifiability | 30% |
| Traction: volume, share, fee revenue, pool depth | 25% |
| Transparency: contracts, locks, docs, named entity | 20% |
| Compliance: regulatory standing, disclosure | 15% |
| Durability: age, shock resilience, dependencies | 10% |

The weighted mean is multiplied by 100 and rounded once at the end to a
fineness value from 0 to 1000. Weights must sum to 1 or scoring throws.
Ties break alphabetically by venue name so ordering is stable across
rebuilds. Zero sum reader weights fall back to equal weighting.

### Band scale

| Fineness | Band |
|---|---|
| 916 and above | 22k |
| 750 to 915 | 18k |
| 585 to 749 | 14k |
| 375 to 584 | 9k |
| Below 375 | Below hallmark, listed but not certified |

The hallmark is 375. Deltas are computed at house weights only. Reader
reweighting changes the ranking but never the published delta.

## Admission standard

From Edition 02 a venue is admitted when all four conditions hold at the
cut date:

1. A deployed contract on a public chain, verified on that chain explorer.
2. A pairing asset that claims real world backing, or a launch mechanic
   that routes value to a real world asset.
3. At least one completed public launch or live market.
4. A reachable public interface or documentation under a domain the
   operator controls.

A venue is struck after 60 days without a launch, a dark public
interface, or loss of domain and key control. A venue that fails the
pairing condition on re-review is struck rather than scored low, because
it was never in the category.

## Null discipline

A missing metric is `null` and renders as "not published" or an em dash,
never as zero. Four of the ten Edition 2026-09 venues publish no
verifiable volume. That is the normal case, not an error state, and the
ingest job never fabricates a figure to fill a gap.

## Integrity

- No venue pays for inclusion, placement, or removal.
- Affiliate and referral links are prohibited anywhere in an edition.
- Every figure carries a `sourceId` resolving to the edition source list.
- The build fails on any unknown `sourceId`.
- Published editions are immutable. Corrections ship as dated notes with
  the original figure kept visible.
