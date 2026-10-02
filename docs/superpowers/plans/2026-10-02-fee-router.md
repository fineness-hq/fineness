# Fee Router Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the dedicated `/fee-router` page into Fineness with full 1:1 visual parity with `fineness-fee-router.html` and Fineness's existing design system, including navigation updates, interactive client countdown, telemetry, tables, and Web3 action desk.

**Architecture:** Next.js 16 App Router server page (`app/fee-router/page.tsx`) rendering shared `Masthead`, `FeeRouterClient` client island, and shared `Footer`. Graceful fallback / preview mode when contract addresses are unconfigured.

**Tech Stack:** Next.js 16.3.4 (App Router), React 19, TypeScript 5, Tailwind CSS v4, Lucide React, Framer Motion, Viem (dynamic import on client).

## Global Constraints

- Design parity: match existing light editorial theme (`#f2f0ee`, `#ffffff`, `#768143`, `#b8a371`, `#141414`), Inter font, Geist Mono tabular figures.
- Zero-crash fallback: When contracts are zero address (`0x00...00`), page renders labeled PREVIEW state cleanly without throwing or hydration mismatch.
- SSR safe: No browser-only APIs (`window`, `localStorage`, `window.ethereum`) called during SSR.
- All existing 74 tests plus new tests must pass (`npm test`).
- Type check (`npx tsc --noEmit`) and lint (`npm run lint`) must pass with 0 errors.

---

### Task 1: Navigation Update in MenuButton & Footer

**Files:**
- Modify: `src/site/components/MenuButton.tsx`
- Modify: `src/site/components/Footer.tsx`

**Interfaces:**
- `MenuButton`: adds `['FEE', 'Fee Router', '/fee-router']` to `LINKS`.
- `Footer`: adds Fee Router link in the footer navigation.

- [ ] **Step 1: Update MenuButton.tsx**
Add `['FEE', 'Fee Router', '/fee-router']` to `LINKS` array.

- [ ] **Step 2: Update Footer.tsx**
Add `Fee Router` link in footer links section.

- [ ] **Step 3: Verify existing tests still pass**
Run `npm test`.

---

### Task 2: Create FeeRouterClient Component

**Files:**
- Create: `src/site/components/FeeRouterClient.tsx`

**Interfaces:**
- Produces: `export default function FeeRouterClient(): JSX.Element`

- [ ] **Step 1: Write FeeRouterClient.tsx**
Port all sections from `fineness-fee-router.html` into clean React 19 + TypeScript + Tailwind CSS v4:
- Preview banner
- Hero with chips and live Freeze countdown (calculates 1st of month 05:00 UTC with 72h window)
- 3 Routes cards (50% Freeze Burn, 30% Verification Vault, 20% Data) with proportional split bar
- Telemetry stats cards with loading skeleton & preview numbers
- Buyback guard and copyable Contract addresses duo cards
- Burn history table and Bounty ledger table
- Monthly ritual 4-step cards
- Safety bounds table
- Guarantees duo cards
- Permissionless Web3 action desk with wallet connector and action log

- [ ] **Step 2: Ensure SSR safety**
Wrap client-only timers and `window.ethereum` lookups in `useEffect`.

---

### Task 3: Create Server Route Page `app/fee-router/page.tsx`

**Files:**
- Create: `app/fee-router/page.tsx`

**Interfaces:**
- Produces: `export default function FeeRouterPage(): JSX.Element`
- Metadata: `export const metadata: Metadata`

- [ ] **Step 1: Create app/fee-router/page.tsx**
Wire up `Masthead`, `FeeRouterClient`, and `Footer` with latest edition data.

- [ ] **Step 2: Typecheck**
Run `npx tsc --noEmit`.

---

### Task 4: Add Unit & Route Tests for Fee Router

**Files:**
- Create: `tests/fee-router.test.ts`
- Modify: `scripts/e2e.mjs` (add `/fee-router` check)

- [ ] **Step 1: Write tests/fee-router.test.ts**
Verify file exists, page renders expected titles, countdown math, and routes.

- [ ] **Step 2: Run test suite**
Run `npm test`.

- [ ] **Step 3: Run full build check**
Run `npm run build`.
