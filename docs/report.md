# FINENESS — Project Report & Architecture Overview

**Monthly register scoring tokenized asset venues 0–1000 on what actually backs the token**

- **Web Application:** https://fineness-sepia.vercel.app
- **Latest Edition:** https://fineness-sepia.vercel.app/editions/2026-10
- **Machine JSON:** https://fineness-sepia.vercel.app/editions/2026-10.json
- **Methodology:** https://fineness-sepia.vercel.app/method
- **GitHub Repository:** https://github.com/fineness-hq/fineness
- **X Profile:** https://x.com/finenesslabs

---

## 1. Project Description

**Fineness** is a monthly ranked register of venues that launch or trade tokenized assets. Each venue receives a **fineness score** from 0 to 1000, derived from five weighted criteria. The editorial thesis: most venues marketed as real-world-asset platforms launch memecoins, and the real asset appears only as the **pairing asset**. Fineness measures that gap and prices it as purity.

A build-time pipeline (nothing computes at request time) pulls public figures into a dated snapshot, scores them with a pure function, and freezes a permanent edition page plus machine-readable JSON. As of this report: 2 frozen editions (2026-09, 2026-10), 10 venues each, peak 745 (Pons, 14k). Nothing in the category clears 18 karat.

---

## 2. Core Value Proposition & Problem Solved

### The Problem

- **Backing opacity:** venues marketed as RWA platforms whose only real-asset exposure is an index pairing or synthetic reference.
- **Unreproducible scores:** ratings whose inputs, weights, and math cannot be checked by the reader.
- **Moving history:** live dashboards where yesterday's numbers silently change.
- **Pay-to-rank:** sponsored placements presented as objective measurement.

### The Fineness Solution

- **Pure scoring function:** `fineness(scores, weights)` — weighted mean × 100, rounded once. Same inputs, same output, re-computable in the browser.
- **Shareable disagreement:** reader weights serialize into `?w=` URLs with live re-sort; every shared link carries the methodology with it.
- **Frozen editions:** SHA-256 snapshot hash in every header; rebuilds reproduce byte-identical values; corrections ship as dated notes, never silent edits.
- **Integrity by construction:** no paid placement code path exists; every figure carries a resolving `sourceId`; missing metrics render as `not published`, never zero.
- **Full autonomy:** monthly cron pulls, carries, validates, commits, and publishes with zero hands; AI analyst proposes inside a ±1 cap; `--strict` halts on any policy smell.

---

## 3. End-to-End Application Flow

```
[Monthly cron: day 1, 05:00 UTC — or `npm run monthly`]
    │
    ▼
1. Ingest (`src/ingest/`)
    ├── Bitquery contract volume, DefiLlama fees/TVL, explorer verification
    ├── Fresh null never clobbers a published figure (retention rule)
    └── Atomic write: data/snapshots/<as-of>.json + SHA-256
    │
    ▼
2. AI analyst + carry (`src/llm/`, `src/build/carry.ts`)
    ├── reviewEdition proposes moves inside ±1 with rewritten rationale
    ├── No credentials or garbage reply → carry previous edition unchanged
    └── ranks/bands recompute, deltas embedded, struck dates recorded
    │
    ▼
3. Validate + publish
    ├── validateEdition hard-fails (scores, rationale, sourceIds, hash)
    ├── warnScoreMoves + checkAdmission + scopeNote (non-blocking, `--strict` to halt)
    ├── tests + tsc + lint + build green, commit snapshot + edition, push
    └── Vercel deploys: /editions/<id>, /editions/<id>.json
```

```
[Visitor]
    │
    ▼
1. Open `/` → latest frozen edition (hero, telemetry, ticker, register)
2. Reweight sliders → live re-sort → share `?w=` link
3. Expand venue → scores, rationale, metrics, contracts, links
4. Open `/venues/:id` → fineness history across editions
5. Developers → `/editions/:id.json` verbatim machine data
```

---

## 4. Key Architectural Components

### A. Scoring engine (`src/scoring/`)

- `CRITERIA = asset, traction, transparency, compliance, durability`.
- `HOUSE_WEIGHTS = 0.30 / 0.25 / 0.20 / 0.15 / 0.10`, `HALLMARK = 375`.
- Bands: `22k ≥916`, `18k ≥750`, `14k ≥585`, `9k ≥375`, else below-hallmark.
- Ties break alphabetically; zero-sum reader weights fall back to equal.

### B. Ingest providers (`src/ingest/`)

- `http.ts` never throws (gap → null), `cleanMetric` accepts only finite ≥ 0.
- `defillama.ts` fees/TVL, `bitquery.ts` contract volume (key-gated, null without),
  `explorer.ts` verification (null = retain previous).
- `venues.ts` mapping stays empty until each provider listing is verified.

### C. Build pipeline (`src/build/`)

- `edition.ts` merge + score + sort + rank, `hashSnapshot` content addressing.
- `carry.ts` carries judgement, embeds house-weight deltas, records struck dates.
- `validate.ts` hard-fails scores, rationale, sourceIds, enums, hash-shape, rank rules.
- `admission.ts` machine-checks the §7 standard for new admissions (grandfathers Edition 01) plus the cross-chain split trigger.
- `score-moves.ts` non-blocking ±1 policy warnings.

### D. AI review (`src/llm/`)

- OpenAI-compatible client, temp 0, 120 s timeout; any failure → null → carry.
- Model proposes, code disposes: integer clamp, ±1 cap, rewritten rationale required per move, known ids only, retain/struck verdicts, watchlist for new venues (max 10).

### E. Frontend (`app/`, `src/site/`)

- Next.js App Router: `/` (latest), `/editions/[edition]` (permanent) + `.json` rewrite,
  `/method`, `/venues` index, `/venues/[id]` dossiers, `/desk` (internal, noindex).
- Server-rendered register with client live-reweight islands; full content without JS except reweighting; no page-level horizontal scroll 320–1920px.

---

## 5. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | Next.js 16.3.4 (App Router) + React 19 | Register, editions, dossiers, JSON routes |
| **Language** | TypeScript 5 (Strict Mode) | End-to-end type safety |
| **Styling & Motion** | Tailwind CSS v4 + framer-motion | Light editorial theme, reveals, charts |
| **Data Providers** | Bitquery, DefiLlama, chain explorer | Volume, fees, TVL, verification (monthly) |
| **AI Review** | OpenAI-compatible endpoint | Score proposals inside policy caps |
| **Automation** | GitHub Actions cron + `scripts/monthly.ts` | Hands-free monthly run with gates |
| **Testing** | Vitest 4.1.11 | 74 tests across 14 files |
| **Fonts** | Inter + Geist Mono + IBM Plex Mono | Display/body, numerals, preloader |

### Pinned Edition Facts (2026-10, frozen)

| Fact | Value |
|---|---|
| Snapshot hash | `sha256:4b69e671aedc1a8d31a4365abd087477fbc084f85b95b00de1ab90ec43dc9f59` |
| Top venue | Pons, 745 / 14k |
| Certified / below hallmark | 8 / 2 |
| Source registry entries | 20 |

---

## 6. Verification & Quality Assurance Summary

- **TypeScript Compilation:** Zero errors (`npx tsc --noEmit`).
- **Lint:** ESLint 0 errors (`npm run lint`).
- **Tests:** 74 passed / 14 files (`npm test`) — scoring fixtures, deltas, carry, validation, admission, weight URLs, AI review guards, acceptance criteria, per-edition gates.
- **Live E2E:** All route checks green (`npm run e2e`) — home content, edition pages, verbatim JSON, custom-weight banner, method, all 10 venue dossiers, 404s.
- **Determinism:** Rebuilding any edition from its snapshot reproduces byte-identical fineness values and ordering (verified by execution, not just reading).
- **Security & Privacy:** `.env.local` git-ignored (LLM + Bitquery keys server/CI-side only); no wallet, no accounts, no paid-placement path; security headers (`nosniff`, strict referrer, `DENY` framing).
- **Production Deployment:** Live on Vercel (`fineness-sepia.vercel.app`), auto-deployed on push to main.
