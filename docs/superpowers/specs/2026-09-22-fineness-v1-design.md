# Fineness v1 — Design Spec (Approved for Build)

> Date: 2026-09-22. Source of truth: `DEVELOPER_BRIEF.md` v1.0. The brief wins over any conflict.
> Reference stack: `D:\Project\wealthypeople\kentir` (Next 16, React 19, TS strict, Tailwind v4, Vitest).
> Visual language: motion and structure inspired by terawallet.app (numbered sections, giant hero, marquee, scroll-reveal, sticky, accordion, preloader) — mapped onto the light bullion/certificate theme of Fineness. Not a copy of the dark Framer style.

**Goal:** Monthly static register ranking tokenized-asset venues with reproducible 0–1000 fineness scores, shareable browser reweighting, cross-edition deltas, and machine-readable JSON.

**Architecture:** Build-time pipeline. Ingest (day 1) → immutable snapshot → pure scoring function → edition page + JSON. Editorial writes only `scores` + `rationale`. Ingest writes only `metrics` + `contracts`. No server-side computation at request time.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind CSS v4, Vitest 4, `framer-motion` (motion) for scroll-reveal/marquee/accordion animation, `lucide-react` for icons. No DB, no auth, no wallet. Static deploy (Vercel / files). `npm run dev -- --turbo`, `next build` must pass tsc + eslint with 0 errors.

## Global Constraints

- Light theme only. Token CSS copied from brief section 11. `color-scheme: light`. Maroon = brand/structure, never for venue grades.
- Fonts: Archivo (headings/venues/UI, expanded at display sizes above 560px), Newsreader (prose, measure near 66ch), IBM Plex Mono (numbers/addresses/labels/code + tabular-nums). Via `next/font/google`.
- Scoring: `src/scoring/fineness.ts` must match the brief code behavior exactly. Round once at the end. Alphabetical ties. Weights must sum to 1 else throw. Sliders 0..10 map through normalise, sum of 0 maps to equal weights.
- Null discipline: missing metric = `null`, renders as "not published" / "—", never 0 or an empty cell.
- Immutability: a published edition never changes except through an appended correction note with the old figure struck through.
- Editorial integrity: no paid placement (no code path accepts one), no affiliate links, every figure carries a sourceId resolving to sources.json (build fails otherwise), team holdings disclosed in the header, copy states "editorial judgement on public information, not audit/rating".
- Accessibility: 4.5:1 contrast, full keyboard navigation, aria labels, visible focus rings, `prefers-reduced-motion` disables marquee/parallax/reveal (renders static). Minimum 44px touch targets.
- Responsive: 320–1920px, zero horizontal page scroll. Tables scroll inside their own containers. Full content without JS. Weight adjustment is the only JS enhancement.
- Language for code/comments/docs: English. Commits in English only.

## Pages and Routes

- `/` → latest edition (canonical), either redirect logic or the same render as latest.
- `/editions/2026-09` → permanent edition page. `/editions/2026-09.json` → same JSON the page renders.
- `/method` → methodology + admission standard (mirrors docs/METHOD.md).
- `/venues/:id` → venue history across editions, fineness over time (table + SVG sparkline, no chart library).
- Reweight query `?w=6,5,4,3,2` in CRITERIA order [asset,traction,transparency,compliance,durability]. Applied before first paint. "Custom weights active" banner + reset button to house weights. URL updated via replaceState as sliders move.

## Components (src/site/components)

1. `Masthead` — sticky top bar, Fineness masthead + edition label + Method/JSON links. Compact TeraWallet-style nav: small, mono labels, blur on scroll.
2. `AlertStrip` — announcement strip (for example "Nothing clears 18k").
3. `Hero` (Tera 01 intro style) — giant display headline, the Fineness version of "Your assets. Your rules.": "Most RWA venues launch memecoins." + subthesis + stat row. Per-line scroll reveal, subtle bullion-gradient background parallax. Short preloader (600ms) in the Tera style, skipped under reduced motion.
4. `StatRow` — 3–4 numbers (venues listed, median fineness, below-hallmark count, dataAsOf).
5. `ScaleTable` — karat scale table 22k/18k/14k/9k/below.
6. `WeightPanel` — 5 sliders (integer 0..10) + preset buttons: house (6,5,4,3,2, which normalise to house weights 30/25/20/15/10), volume (traction-heavy), safety (transparency+compliance heavy), equal. Shows normalised percentages. Live URL update + resort without closing expanded entries or losing scroll.
7. `Register` + `Entry` + `CutLine` — ranked list. Collapsed entry: rank, name, chain, thesis, profile strip, fineness (mono tabular), band badge, delta. Expanded (Tera FAQ style accordion): 5 scores + rationale, key figures, contracts, links, facts. CutLine: "HALLMARK 375" divider positioned dynamically, hidden when no venue sits below 375, layout animation (framer-motion `layout`).
8. `ComparisonTable`, `RegulatedTable`, `StruckList`, `Limits`, `NextEdition`, `Sources` — numbered sections in the Tera style (02 areas, 03 process…): 01 Register, 02 Scale, 03 Method preview, 04 Comparison, 05 Struck, 06 Limits, 07 Next, 08 Sources. Each section: mono label `01 / register`, large heading, reveal on scroll (IntersectionObserver + motion).
9. `Ticker` (Tera-style marquee) — scrolling band "LONG.XYZ 720 · PONS 715 · …" with CSS keyframes, pause on hover, off under reduced motion.
10. `Footer` — small masthead, disclaimer "Not audits, credit ratings, or investment advice", JSON/Method links.

## Data and Build

- `data/sources.json`: sourceId registry mapping to {name, url, type}. Minimum: coindesk-research, airdropalert, defillama, bitquery, explorer, docs-venue.
- `data/snapshots/2026-09-01.json`: raw ingest output (may stub metrics matching the edition, but in snapshot structure).
- `data/editions/2026-09.json`: header {edition, published, dataAsOf, snapshotHash, houseWeights, disclosures[]} + 10 venues matching the brief section 14 seed, with sensible consistent rationale/theses/pairing/metrics/contracts/links/facts. Hash = sha256 of the snapshot (computed at build time, stored in the header).
- `src/build/edition.ts`: merges snapshot + editorial into edition JSON. `src/build/deltas.ts`: computes deltas against the prior edition (no deltas for 2026-09; prepares the function for 2026-10). `src/ingest/*`: bitquery.ts, defillama.ts, explorer.ts, run.ts (snapshot writes only, never invents numbers; null when absent).
- Build validation: every figure sourceId must exist in sources.json else fail. Scores must be integers 0..10 else fail.

## Animation (terawallet.app mapped onto the light theme)

- Preloader 500–700ms with logo/mark + maroon progress bar, fade out.
- Hero: staggered line reveals (y:24 to 0, opacity), 0.6s ease-out, 0.05 delay per line.
- Sections: `whileInView` fade+rise, viewport once, margin -80px.
- Marquee ticker: CSS animation 30s linear infinite, duplicated list for a seamless loop.
- Entry expand: auto-height animation (framer-motion AnimatePresence), rotating chevron.
- CutLine: animated `top` via layout spring (stiffness 300, damping 30).
- Sliders: maroon thumb, rule track, mono value bubble. FLIP resort (layout) so scroll position holds.
- Reduced motion: all animation disabled via `useReducedMotion` + CSS media query.

## Testing

- `src/scoring/fineness.test.ts`: fixtures copied from the brief (10 venues + 5 expects). Must stay green.
- `src/build/deltas.test.ts`: delta arithmetic, NEW entries without deltas, struck section, house-weights-only.
- `src/site/weight-url.test.ts`: `?w=` parse/serialize, normalise, stable round-trip ranking.
- `tests/edition-2026-09.test.ts`: edition JSON validity (score ranges, complete rationale, sourceIds resolve, null discipline, tie-break ordering).
- Manual: keyboard-only full flow, JS-off full render, 390px with no scroll, shared URL opens with the sender ranking before first paint.

## Out of Scope (unchanged)

Live prices, wallet/accounts/notifications, paid placement (permanent exclusion), self-submission.
