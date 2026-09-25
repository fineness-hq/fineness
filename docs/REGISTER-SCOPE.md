# Register Scope Decisions

Date: 2026-09-25. Resolves brief §16 open questions 1, 3 and 4 from
external precedent. Where this document conflicts with the brief, the
brief wins.

## Q1 — cross-chain: one ranking until three off-chain venues

Index practice keeps one comparable universe with segmented views until
scale forces a split. The register therefore stays a single cross-chain
ranking; `resident: false` venues rank inline with a resident marker.
When non-resident venues reach three (`WATCHLIST_SPLIT_AT` in
`src/build/admission.ts`), the desk splits into a resident register plus
a watch list. `scopeNote()` prints the trigger; it never blocks a run.

## Q3 — prelaunch holding pen, after S&P `NR`

S&P designates issuers with insufficient information `NR` (not rated)
rather than scoring absence as failure; provisional ratings were retired
for the same reason. Fineness does the equivalent: a venue admitted
without a completed launch carries `status: prelaunch`, is listed in a
holding pen, and is neither scored nor ranked (`rank: 0`).

Rules:

- Frozen editions are never rewritten: past scores stand as published.
- From the next admission on, a venue with no completed public launch
  enters as `prelaunch` and is promoted to `active` on its first live
  market, gaining scores and rank from that edition.
- Working scores may be kept on the record; the UI renders `PRELAUNCH`
  with no fineness, no band and no delta.
- `validateEdition` rejects ranked prelaunch records.

## Q4 — correction threshold, after MSCI corrections practice

MSCI restates only important errors (currently 50 bps at index level),
always fixes constituent-list errors, applies a 12-month window, and
announces every correction simultaneously. Adapted to a frozen monthly
register that never restates:

- Any error in a published figure, score, band, rank, or source
  reference ships a dated correction note with the original figure kept
  visible and **two reviewer sign-offs** (`signedBy`, enforced in
  `validateEdition`).
- Pure prose slips (typos, grammar) fix silently in the next edition
  with the fix logged in the commit message.
- Corrections apply to the latest and immediately prior edition only;
  older history stands.
