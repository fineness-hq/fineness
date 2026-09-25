# Fineness Runbook

Monthly operating schedule for the Fineness register. Mirrors the brief
run book with repository specific paths and commands.

## Monthly schedule

| Day | Step | Gate |
|---|---|---|
| 1 | Automated pull, snapshot written and committed | Pipeline green, no partial writes |
| 2 to 3 | Admission review, additions and strikes with written reasons | Every change carries a reason |
| 4 to 6 | Score review, any moved score needs a cited reason | Two sign offs recorded in the commit |
| 7 | Freeze, deltas computed against prior snapshot | Snapshot hash recorded in edition header |
| 8 | Publish edition page and JSON | Acceptance checks pass |

## Snapshot naming

Snapshots live in `data/snapshots/` and are named by ingest date:
`data/snapshots/YYYY-MM-DD.json` (for example `2026-09-01.json` for the
day 1 pull). The inner `asOf` field records the data cut date, which can
be later than the pull date (Edition 2026-09 used `asOf: 2026-09-20`).
Editions live in `data/editions/` and are named by month:
`data/editions/YYYY-MM.json`. The edition header `snapshotHash` records
the sha256 of the exact snapshot bytes, linking the two. Verify with:

```bash
node -e "const c=require('node:crypto');const f=require('node:fs');const raw=f.readFileSync('data/snapshots/2026-09-01.json','utf8');console.log('sha256:'+c.createHash('sha256').update(raw,'utf8').digest('hex'))"
```

The printed hash must equal the edition `snapshotHash`.

## Automation (hands-free monthly run)

Day 1 runs without humans via `.github/workflows/monthly.yml` (cron day 1,
05:00 UTC, plus manual dispatch). One command does the same locally:

```bash
npm run monthly -- --edition=<YYYY-MM> --as-of=<YYYY-MM-DD> --published=<YYYY-MM-DD>
```

What it does, in order: read the latest frozen edition, pull providers for
its venue ids (`src/ingest/`, retention rule keeps published figures on
fresh gaps), write the snapshot atomically, hash it into the header, carry
all editorial judgement forward (`src/build/carry.ts`, scores never move
here), validate (`validateEdition`, hard fail), print `warnScoreMoves`
warnings, write the edition atomically. Any validation failure deletes the
fresh snapshot and exits non-zero, so a bad run leaves no trace and the
previous edition stays live.

Environment: `BITQUERY_API_KEY` (secret, optional — absent means Bitquery
lookups stay null), `EXPLORER_API_URL` (variable, optional — defaults to the
Robinhood Chain Blockscout endpoint). Venue-to-provider slugs live in
`src/ingest/venues.ts`; add a slug only after confirming the provider lists
the venue, otherwise lookups stay null by design.

Fully autonomous by default: the scheduled run pulls, carries, validates,
commits and publishes with zero hands. Nothing in the pipeline prompts,
pauses, or waits for input.

The AI analyst authors score moves with rewritten rationale inside the
±1 cap; the code gates below are the sign-off: `validateEdition`
hard-fails bad ranges and unknown sources, `warnScoreMoves` flags
cap breaches, `checkAdmission` flags standard failures. `--strict`
inverts it — any warning fails the run before anything is written.

Two cases still originate outside the pipeline and are intentionally
not automated: brand-new venue records (thesis, pairing, links — the
model only emits a watchlist, never a fabricated record) and
user-reported errors (which become signed correction notes). Both arrive
as normal commits, and the next scheduled run carries them forward
untouched.

Automation modes: default publishes whenever validation passes and only
logs policy smells, so clean months ship with zero humans. Pass `--strict`
to invert it — any score-move, admission, or scope warning fails the run
before anything is written, so humans are called in on exception only.

## Build and verify

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build
```

All four must pass with zero errors. The build fails on any figure with
a `sourceId` absent from `data/sources.json`.

## Routes and JSON

- `/` renders the latest edition and is canonical.
- `/editions/2026-09` is the permanent edition page.
- `/editions/2026-09/edition.json` serves the edition JSON verbatim with
  an `application/json` content type.
- The brief route `/editions/2026-09.json` is served by a rewrite in
  `next.config.ts` mapping `/editions/:edition.json` to
  `/editions/:edition/edition.json`, because App Router files cannot
  contain a dot segment.
- `/method` mirrors `docs/METHOD.md`.
- `/venues/:id` shows venue history across editions.

## Immutability and corrections

A published edition never changes silently. Corrections ship as dated
correction notes appended to the edition, with the original figure kept
visible. Rebuilding an edition from its snapshot must reproduce byte
identical fineness values and ordering.

Correction rule (answers brief §16 Q4, after MSCI corrections practice):
any error in a published figure, score, band, rank, or source reference
ships a dated note signed by two reviewers (`signedBy`, enforced in
`validateEdition`). Pure prose slips (typos, grammar) fix silently in the
next edition with the fix logged in the commit message. Corrections apply
to the latest and immediately prior edition only; older history stands.
