# Fineness v1 — Acceptance Record

Date: 2026-09-22. Edition under test: `2026-09`. Each criterion below maps to
brief section 15 and is covered by `tests/acceptance.test.ts` unless noted.

## Result table

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Determinism | PASS | `npm test` → `tests/acceptance.test.ts > determinism` green. Node recompute of all 10 venues matches stored fineness; alphabetical tiebreak ordering stable. |
| 2 | Reader parity | PASS | `npm test` → `reader parity` green. `applyWeights(venues, HOUSE_WEIGHTS)` reproduces every stored fineness, band, and rank. |
| 3 | Weight round trip | PASS | `npm test` → `weight round trip` green. `parseWeights(serializeWeights(HOUSE_WEIGHTS))` equals `HOUSE_WEIGHTS`; `?w=6,5,4,3,2` parses to house; `app/page.tsx` and `app/editions/[edition]/page.tsx` parse the query server-side before first paint; `WeightPanel` syncs sliders back via `replaceState` plus a reset banner. |
| 4 | Null rendering | PASS | `npm test` → `null rendering` green. `usd(null)` returns `not published`, `dash(null)` returns `—`. Venues `bankr`, `cardpad`, `factory-new`, `csl` carry all-null metrics and render fully; zero venues carry a `0` metric. |
| 5 | Cut line | PASS | `npm test` → `cut line` green. `findIndex((v) => v.fineness < 375)` resolves to index 8 (`factory-new`, previous `cardpad:425`); below-hallmark count is 2. `Register.tsx` computes the index from displayed weights so the line repositions on reweight; it renders nothing when the index is `-1`. |
| 6 | Delta correctness | PASS | `npm test` → `delta correctness` green. `computeDeltas` gives `-45` fineness / `+1` rank for the 700-vs-745 fixture and `undefined` for new admissions. Edition 2026-09 is the first edition so it ships empty deltas; arithmetic is pinned for Edition 02. |
| 7 | No script fallback | PASS | `npm test` → `no script fallback` green. `EditionView` is a server component with no `use client` and no `useEffect`; `useEffect` exists only in `WeightPanel` (URL sync enhancement). `next build` prerenders 16 static pages including all venue and edition routes. |
| 8 | Responsive | PASS | `npm test` → `responsive` green. `app/globals.css` sets `overflow-x: clip` on `html` and `body`; `ComparisonTable` and `ScaleTable` scroll tables inside `overflow-x-auto` containers. |
| 9 | Source integrity | PASS | `npm test` → `source integrity` green. `validateEdition` passes on the shipped edition and throws `unknown sourceId` on a tampered copy. Build output shows no missing-source failure. |
| 10 | Immutability | PASS | `npm test` → `immutability` green. `hashSnapshot(snapshot bytes)` equals header `snapshotHash` `sha256:672a72fe5a432ecbdfa8175ca0bfe75cc0a9b51d25b2296f18b0f7cc6b9e4c80`; snapshot holds 10 venues. |

## Command outputs (recorded 2026-09-22)

`npm test` (final):

```text
Test Files  7 passed (7)
     Tests  28 passed (28)
```

`npm run lint`: clean, 0 errors, 0 warnings.
`npx tsc --noEmit`: clean, 0 errors.
`npm run build`: success, 16 static pages, routes `/`, `/editions/2026-09`,
`/editions/2026-09/edition.json`, `/method`, `/venues/[id]` (10 venues).

Node evidence snippets:

```text
stored : sha256:672a72fe5a432ecbdfa8175ca0bfe75cc0a9b51d25b2296f18b0f7cc6b9e4c80
recomputed: sha256:672a72fe5a432ecbdfa8175ca0bfe75cc0a9b51d25b2296f18b0f7cc6b9e4c80
match: true
parity10/10: true
ordering stable: true
cutIndex: 8 venue: factory-new prev: cardpad:425
all-null venues: ["bankr","cardpad","factory-new","csl"]
zero-metric venues (must be []): []
```

English-only scan over `app`, `src`, `data`, `docs`, `tests` against a 15-term
common stop-word list, case-insensitive: zero hits.

## Edition 02 record (2026-10, data cut 2026-09-22)

Date: 2026-09-22. Review notes: `docs/EDITION-2026-10-NOTES.md`.
Score policy: `docs/SCORE-POLICY.md` (calibration window). Licensing:
`docs/DATA-LICENSING.md` (all feeds cleared, owner review).

`npm test` (final):

```text
Test Files  9 passed (9)
     Tests  42 passed (42)
```

New suite `tests/edition-2026-10.test.ts` (7 tests): 10 retained venues in
house order with Pons leading at 745, fineness recomputes, validation passes
with 15 new sourceIds resolving, header hash matches
`data/snapshots/2026-09-22.json` bytes, deltas equal arithmetic differences
(pons +30/+1, long-xyz 0/−1, stonkfun +20, flap −20, pair +15, bankr +20,
factory-new +10), zero `warnScoreMoves` policy warnings, peak 745 below 18k.

Live serve checks (`/editions/2026-10`): `+30` delta marker present, edition
bar reads `PEAK 745 — NOTHING CLEARS 18 KARAT`. No new admissions, no strikes.
`npm run lint`: 0 errors, 0 warnings. `npx tsc --noEmit`: clean.
`npm run build`: success, routes include `/editions/2026-10`,
`/editions/2026-10/edition.json`, and two-point venue histories.

## Edition 03 record (2026-11, AI review, data cut 2026-11-01)

Date: 2026-09-22. First fully hands-free run: ingest → mimo-v2.5 analyst
review → carried edition → validation. Model held all 10 scores steady on
retained metrics (no fresh evidence); `warnScoreMoves` silent.

`npm test` (final):

```text
Test Files  13 passed (13)
     Tests  61 passed (61)
```

Suite `tests/edition-2026-11.test.ts` (4 tests): steady scores recompute,
validation passes, header hash matches `data/snapshots/2026-11-01.json`
bytes, all deltas zero against 2026-10. `npm run lint`: clean.
`npx tsc --noEmit`: clean. `npm run build`: success with three edition
routes and three-point venue histories.
