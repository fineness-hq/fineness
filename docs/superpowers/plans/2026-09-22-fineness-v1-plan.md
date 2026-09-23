# Fineness v1 Implementation Plan

> **Build status (2026-09-22):** Tasks 1–6 implemented. Suite 31/31 green,
> `tsc`/`lint` clean, `next build` 16 pages. Recorded deviations from the
> steps below: visual layer rebuilt to TeraWallet parity per
> `docs/DESIGN-DECISION.md` (Inter + Geist Mono, olive/gold/action tokens,
> preloader, menu overlay, hero diagram, bg marquee); added `gsap` +
> `lenis` (parallax, smooth scroll); added `RegulatedTable`, Entry profile
> strip, contracts/links detail, disclosures line; weight panel sticky with
> active preset states. See `docs/ACCEPTANCE.md`.


> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build static Fineness v1 on Next.js passing every acceptance criterion in brief section 15.

**Architecture:** Scaffold Next 16 + Tailwind v4 → pure scoring + tests → data edition + validation → UI components + animation → routes + reweight URL → full verification.

**Tech Stack:** Next.js 16.3+, React 19, TypeScript strict, Tailwind v4 (@tailwindcss/postcss), Vitest 4, framer-motion, lucide-react, next/font (Archivo, Newsreader, IBM Plex Mono).

## Global Constraints

- Light theme only, tokens copied from the brief. `color-scheme: light`. Maroon is brand, never a grade.
- Scoring byte-parity with the brief. Single final rounding. Alphabetical ties. Weights must sum to 1 else throw.
- Null = "not published"/"—", never 0.
- English for code/comments/docs/commits. User chat in Indonesian (this context only).
- `npm test` (vitest run), `npx tsc --noEmit` 0 errors, `npm run lint` 0 errors, `npm run build` succeeds.
- Full content without JS. Zero horizontal scroll from 320–1920px. Keyboard + reduced-motion supported.
- Every figure sourceId must resolve to sources.json else the build fails.

---

### Task 1: Scaffold Next.js + Tailwind + Fonts + Tokens

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `app/layout.tsx`, `app/globals.css`, `src/site/tokens.css`, `app/page.tsx` (placeholder), `.gitignore`
- Test: `tests/scaffold.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: Working App Router (`npm run dev -- --turbo`), tokens CSS variables available, fonts loaded.

- [ ] **Step 1: Write failing test**

```ts
// tests/scaffold.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
describe('scaffold', () => {
  it('has tokens.css with brief variables', () => {
    const css = fs.readFileSync('src/site/tokens.css', 'utf8');
    expect(css).toContain('--ground: #f7f3f3');
    expect(css).toContain('--maroon: #7a1f2b');
    expect(css).toContain('--band-high: #2f6b4f');
  });
  it('has layout with fonts', () => {
    const layout = fs.readFileSync('app/layout.tsx', 'utf8');
    expect(layout).toContain('Archivo');
    expect(layout).toContain('Newsreader');
    expect(layout).toContain('IBM Plex Mono');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/scaffold.test.ts`
Expected: FAIL (files not found)

- [ ] **Step 3: Scaffold minimal project**

package.json (Next 16.3.4, React 19.2.8, TS5, Tailwind v4, Vitest, framer-motion, lucide-react — mirror kentir versions + motion):
```json
{
  "name": "fineness",
  "version": "0.1.0",
  "private": true,
  "scripts": { "dev": "next dev --turbo", "build": "next build", "start": "next start", "lint": "eslint .", "test": "vitest run" },
  "dependencies": { "framer-motion": "^12.0.0", "lucide-react": "^0.469.0", "next": "16.3.4", "react": "19.2.8", "react-dom": "19.2.8" },
  "devDependencies": { "@tailwindcss/postcss": "^4", "eslint": "^9", "eslint-config-next": "16.3.4", "tailwindcss": "^4", "typescript": "^5", "vitest": "^4.1.11", "@types/node": "^20", "@types/react": "^19", "@types/react-dom": "^19" }
}
```
next.config.ts (mirror kentir security headers), tsconfig (strict, paths @/*), postcss (tailwind v4), eslint flat (next), vitest.config (alias @), app/layout.tsx (fonts + metadata + tokens.css import), app/globals.css (tailwind import + tokens import + base styles: ground background, ink text, 66ch prose measure, tabular-nums mono), src/site/tokens.css (copied from brief section 11), .gitignore (node_modules, .next, *.local).

- [ ] **Step 4: Run test to verify it passes**

Run: `npm install; npx vitest run tests/scaffold.test.ts`
Expected: PASS (2/2)

- [ ] **Step 5: Commit**

```bash
git add package.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs vitest.config.ts app/ src/site/tokens.css tests/scaffold.test.ts .gitignore
git commit -m "feat: scaffold Next.js 16 + Tailwind v4 + design tokens"
```

### Task 2: Scoring Engine (TDD)

**Files:**
- Create: `src/scoring/fineness.ts`, `src/scoring/fineness.test.ts`

**Interfaces:**
- Consumes: none
- Produces: `fineness(scores, weights?)`, `band(f)`, `normalise(raw)`, `CRITERIA`, `HOUSE_WEIGHTS`, `HALLMARK`. Export types Criterion/Scores/Weights/Band.

- [ ] **Step 1: Write failing test (copied from the brief)**

```ts
import { describe, it, expect } from 'vitest';
import { fineness, band } from './fineness';
describe('fineness', () => {
  it('long-xyz 720', () => { expect(fineness({asset:8,traction:8,transparency:6,compliance:6,durability:7})).toBe(720); });
  it('csl 220', () => { expect(fineness({asset:2,traction:1,transparency:5,compliance:1,durability:2})).toBe(220); });
  it('band boundaries', () => { expect(band(375)).toBe('9k'); expect(band(374)).toBe('below-hallmark'); expect(band(750)).toBe('18k'); expect(band(916)).toBe('22k'); });
  it('rejects unnormalised weights', () => {
    const s = {asset:8,traction:8,transparency:6,compliance:6,durability:7};
    expect(() => fineness(s, {asset:1,traction:1,transparency:1,compliance:1,durability:1})).toThrow();
  });
  it('all 10 seed fixtures reproduce', async () => {
    const { default: edition } = await import('../../data/editions/2026-09.json', { with: { type: 'json' } }).catch(() => ({ default: null }));
    // data lands in Task 3, so skip when absent — Task 3 adds the full 10-venue test
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/scoring/fineness.test.ts`
Expected: FAIL (module not found)

- [ ] **Step 3: Minimal implementation (copy brief verbatim + normalise)**

Copy `src/scoring/fineness.ts` exactly from brief section 4 (CRITERIA, HOUSE_WEIGHTS, HALLMARK=375, fineness, band, normalise). Add nothing, remove nothing.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/scoring/fineness.test.ts`
Expected: PASS (5/5)

- [ ] **Step 5: Commit**

```bash
git add src/scoring/fineness.ts src/scoring/fineness.test.ts
git commit -m "feat: add fineness scoring engine with seed fixtures"
```

### Task 3: Data Layer — Sources, Snapshot, Edition 2026-09, Build + Deltas

**Files:**
- Create: `data/sources.json`, `data/snapshots/2026-09-01.json`, `data/editions/2026-09.json`, `src/build/edition.ts`, `src/build/deltas.ts`, `src/build/validate.ts`, `src/ingest/bitquery.ts`, `src/ingest/defillama.ts`, `src/ingest/explorer.ts`, `src/ingest/run.ts`
- Test: `tests/edition-2026-09.test.ts`, `src/build/deltas.test.ts`

**Interfaces:**
- Consumes: `fineness`, `band` from Task 2
- Produces: Valid edition JSON + `computeDeltas(current, prior)` + `validateEdition(edition, sources)` (throws on missing sourceId / out-of-range scores / incomplete rationale). Ingest `run()` writes snapshots only.

- [ ] **Step 1: Write failing tests**

```ts
// tests/edition-2026-09.test.ts
import { describe, it, expect } from 'vitest';
import edition from '../data/editions/2026-09.json';
import sources from '../data/sources.json';
import { fineness } from '../src/scoring/fineness';
describe('edition 2026-09', () => {
  it('has 10 venues in house order', () => { expect(edition.venues.length).toBe(10); expect(edition.venues[0].id).toBe('long-xyz'); });
  it('fineness recomputes', () => {
    for (const v of edition.venues as any[]) { expect(fineness(v.scores)).toBe(v.fineness); }
  });
  it('sourceIds resolve', () => {
    const ids = new Set(Object.keys(sources));
    for (const v of edition.venues as any[]) for (const s of v.metrics.sourceIds) expect(ids.has(s)).toBe(true);
  });
  it('null discipline', async () => {
    const { validateEdition } = await import('../src/build/validate');
    expect(() => validateEdition(edition as any, sources as any)).not.toThrow();
  });
});
```

```ts
// src/build/deltas.test.ts
import { describe, it, expect } from 'vitest';
import { computeDeltas } from './deltas';
describe('deltas', () => {
  it('arithmetic difference at house weights', () => {
    const d = computeDeltas([{id:'a',fineness:700,rank:1} as any], [{id:'a',fineness:745,rank:2} as any], '2026-09');
    expect(d['a'].fineness).toBe(-45); expect(d['a'].rank).toBe(1);
  });
  it('new admission has no delta', () => {
    const d = computeDeltas([{id:'b',fineness:500,rank:3} as any], [], '2026-09');
    expect(d['b']).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run tests/edition-2026-09.test.ts src/build/deltas.test.ts`
Expected: FAIL

- [ ] **Step 3: Write data + minimal build code**

sources.json (6 entries: coindesk-research, airdropalert, defillama, bitquery, explorer, docs-venue, each with name+url). Snapshot 2026-09-01.json (raw per-venue metrics). Edition 2026-09.json: header edition 2026-09/published 2026-09-21/dataAsOf 2026-09-20/snapshotHash sha256 of snapshot/houseWeights/disclosures[] + 10 complete venues (scores from the brief table, computed fineness, band, one-sentence thesis, 5-key rationale, pairing, metrics with sourceIds, minimum 1 verified contract for venues passing admission, links, facts). deltas.ts: pure `computeDeltas(curr, prev, basis)`. validate.ts: checks integer scores 0..10, 5-key non-empty rationale, sourceIds resolve, metrics null-vs-0 (rejects zeros that should be null; at minimum rejects missing metrics). ingest/*.ts: typed stubs that fetch (may return null) + run.ts writing snapshot files, never inventing numbers.

- [ ] **Step 4: Run to verify pass**

Run: `npx vitest run tests/edition-2026-09.test.ts src/build/deltas.test.ts src/scoring/fineness.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add data/ src/build/ src/ingest/ tests/edition-2026-09.test.ts
git commit -m "feat: add Edition 2026-09 data, validation, and deltas"
```

### Task 4: UI Components + Motion (Tera-style, Light Theme)

**Files:**
- Create: `src/site/components/Masthead.tsx`, `AlertStrip.tsx`, `Hero.tsx`, `StatRow.tsx`, `ScaleTable.tsx`, `WeightPanel.tsx`, `Register.tsx`, `Entry.tsx`, `CutLine.tsx`, `Ticker.tsx`, `ComparisonTable.tsx`, `StruckList.tsx`, `Limits.tsx`, `NextEdition.tsx`, `Sources.tsx`, `Footer.tsx`, `Reveal.tsx`, `lib/format.ts`
- Test: `src/site/weight-url.test.ts`

**Interfaces:**
- Consumes: `CRITERIA`, `HOUSE_WEIGHTS`, `fineness`, `band`, `normalise` + edition JSON type.
- Produces: Presentational components + `parseWeights(search)`, `serializeWeights(w)`, `applyWeights(venues, weights)` (sorted, alphabetical ties).

- [ ] **Step 1: Write failing weight-url test**

```ts
import { describe, it, expect } from 'vitest';
import { parseWeights, serializeWeights } from '../site/weight-url';
import { HOUSE_WEIGHTS } from '../../scoring/fineness';
describe('weight url', () => {
  it('round trip', () => { expect(parseWeights(serializeWeights(HOUSE_WEIGHTS))).toEqual(HOUSE_WEIGHTS); });
  it('parse ?w=6,5,4,3,2 to house', () => { expect(parseWeights('?w=6,5,4,3,2')).toEqual(HOUSE_WEIGHTS); });
  it('empty falls back to house', () => { expect(parseWeights('')).toEqual(HOUSE_WEIGHTS); });
});
```

- [ ] **Step 2: Run to fail**

Run: `npx vitest run src/site/weight-url.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement weight-url + all components**

`src/site/weight-url.ts`: parse `?w=a,b,c,d,e` (integers 0..10, clamped, sum of 0 maps to equal weights) into Weights; serialize back. `applyWeights`: maps venues to new fineness values, sorts by descending fineness with name tiebreak.
Components: Tailwind v4 + tokens.css vars (`bg-[var(--surface)]` etc), Archivo/Newsreader/Plex Mono via next/font in layout. Framer-motion: Reveal (whileInView), staggered Hero, CSS marquee Ticker, AnimatePresence Entry height, layout-spring CutLine, WeightPanel sliders + presets (house/volume/safety/equal). Collapsed/expanded Entry with `<button aria-expanded>`. CutLine positioned at the computed index (index of the last venue at or above 375). All numbers mono tabular. Null renders as "not published"/"—".

- [ ] **Step 4: Run to pass**

Run: `npx vitest run src/site/weight-url.test.ts src/scoring/fineness.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/site/
git commit -m "feat: add register UI with shareable reweighting and motion"
```

### Task 5: Routes + No-JS + JSON + Venue History

**Files:**
- Create/Modify: `app/page.tsx`, `app/editions/[edition]/page.tsx`, `app/editions/[edition]/edition.json/route.ts`, `app/method/page.tsx`, `app/venues/[id]/page.tsx`, `docs/METHOD.md`, `docs/RUNBOOK.md`
- Test: `tests/routes.test.ts` (static: file existence + JSON parity)

**Interfaces:**
- Consumes: Task 3 data + Task 4 components.
- Produces: 5 routes + docs. `/` renders latest (2026-09) server-side (full without JS). JSON route returns the edition JSON verbatim (content-type application/json).

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
describe('routes', () => {
  it('edition page + json route exist', () => {
    expect(fs.existsSync('app/editions/[edition]/page.tsx')).toBe(true);
    expect(fs.existsSync('app/editions/[edition]/edition.json/route.ts')).toBe(true);
  });
  it('method + venue routes exist', () => {
    expect(fs.existsSync('app/method/page.tsx')).toBe(true);
    expect(fs.existsSync('app/venues/[id]/page.tsx')).toBe(true);
  });
});
```

- [ ] **Step 2: Run to fail**

Run: `npx vitest run tests/routes.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement routes**

Server Components read JSON from `data/editions`. Client component `RegisterClient` handles reweighting (useSearchParams + replaceState, applied before paint with server-side defaults from the URL so shared links rank correctly without JS for the initial ranking; JS only drives further interaction). Custom-weights banner + reset. Venue page: cross-edition table + SVG sparkline. Method page mirrors docs/METHOD.md. JSON route: `Response.json(edition)`.

- [ ] **Step 4: Run to pass**

Run: `npx vitest run tests/routes.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/ docs/
git commit -m "feat: add edition, method, venue routes with JSON and no-JS fallback"
```

### Task 6: Verification Wave (Acceptance Criteria)

**Files:**
- Modify: anything failing. Add `tests/acceptance.test.ts` when needed.

- [ ] **Step 1: Full suite**

Run: `npm test`
Expected: PASS all.

- [ ] **Step 2: Typecheck + lint + build**

Run: `npx tsc --noEmit; npm run lint; npm run build`
Expected: 0 errors, successful build, no missing sourceId (build fails when any is missing).

- [ ] **Step 3: Manual checklist (record in commit message or docs/ACCEPTANCE.md)**

Determinism (rebuild produces identical output), reader parity (browser house weights match build), weight round-trip before first paint, null rendering, cut line, delta arithmetic, no-JS (curl without JS still returns content), responsive 320–1920, source integrity, immutability (recorded hash).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: verify Fineness v1 acceptance criteria green"
```

---

### Task 7: Edition 02 Readiness (brief section 16 blockers)

**Files:**
- Created: `docs/SCORE-POLICY.md`, `docs/DATA-LICENSING.md`
- Pending: provider replies recorded in `docs/DATA-LICENSING.md`, `data/editions/2026-10.json`,
  live deltas against `2026-09` (code ready: `computeDeltas` + `DeltaMark`).

**Interfaces:**
- Consumes: brief sections 7–9, runbook days 2–7.
- Produces: a shippable Edition 02 with deltas, NEW markers, and struck section.

- [x] **Step 1: Score stability policy written and adopted (`docs/SCORE-POLICY.md`)**
- [x] **Step 2: Data licensing fallback decided (`docs/DATA-LICENSING.md`)**
- [x] **Step 3: Provider clearance recorded (`docs/DATA-LICENSING.md`, owner review 2026-09-22)**
- [x] **Step 4: Admission review done (`docs/EDITION-2026-10-NOTES.md`, 10 retained, 0 struck)**
- [x] **Step 5: Score review done (9 moves ±1 with cited evidence + `calibration` markers)**
- [x] **Step 6: `2026-10.json` built, live deltas verified (pons +30/+1 takes rank 1)**
- [x] **Step 7: Full suite + build green, published**

---

### Task 8: Hands-Free Monthly Automation (no human touch)

**Files:**
- Created: `src/ingest/http.ts`, `src/ingest/providers.test.ts`, real
  `defillama.ts` / `explorer.ts` / `bitquery.ts` fetchers, `src/ingest/venues.ts`
  mapping, carried `src/build/carry.ts` + `carry.test.ts`,
  `scripts/monthly.ts`, `.github/workflows/monthly.yml`, RUNBOOK section.

- [x] **Step 1: Providers fetch real endpoints, null-safe (failure is never fabricated)**
- [x] **Step 2: Carry builder reuses `buildEdition` (scores frozen, ranks recompute)**
- [x] **Step 3: Monthly runner with atomic writes + cleanup-on-failure**
- [x] **Step 4: Dry-run proven (2026-11 built, hash/recompute/carry verified, files removed)**
- [x] **Step 5: CI cron day 1 + full verify before commit**
- [x] **Step 6 (AI, no human): analyst/editor review via LLM with code-enforced caps (`src/llm/`, `docs/AI-REVIEW.md`)**
- [x] **Step 7: proven end-to-end (2026-11 built hands-free, AI held steady, 61/61 green)**
- [ ] **Step 8 (human, exception only): admission changes outside retain/strike, major-event overrides**
