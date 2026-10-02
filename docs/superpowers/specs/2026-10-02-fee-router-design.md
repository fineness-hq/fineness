# Design Specification: Fineness Fee Router Page

**Date:** 2026-10-02  
**Target:** Implementation of dedicated `/fee-router` page and navigation integration  
**Status:** Approved for implementation plan  

---

## 1. Overview & Goal

Integrate the **Fineness Fee Router** (`fineness-fee-router.html`) into the existing Next.js 16 + React 19 codebase.
The Fee Router manages the tokenomics of `$FINE`, distributing creator fees arriving in ETH on Robinhood Chain into three immutable routes:
- **50% Freeze Burn:** Bought back during the monthly freeze window and burned via ERC-20 `burn()`.
- **30% Verification Vault:** Bought back and allocated to a timelocked bounty vault for readers who prove errors in the register.
- **20% Data:** Direct ETH transfer to the data wallet to fund upstream APIs (DefiLlama, Bitquery, nodes).

The implementation will match Fineness's existing editorial / TeraWallet design system (`Inter`, `Geist Mono`, `#f2f0ee` background, olive/gold/maroon accents, semantic borders, and Framer Motion transitions).

---

## 2. Architecture & File Structure

```text
fineness/
├── app/
│   └── fee-router/
│       └── page.tsx                     # Server component with metadata & SEO
├── src/
│   └── site/
│       └── components/
│           ├── FeeRouterClient.tsx      # Main interactive client component
│           └── MenuButton.tsx           # Updated with '/fee-router' menu item
└── tests/
    └── fee-router.test.ts               # Component & route render verification
```

---

## 3. Detailed Component Breakdown

### A. Route Entry: `app/fee-router/page.tsx`
- **Type:** Next.js Server Component.
- **Responsibilities:**
  - Exports Next.js metadata (`title: 'Fineness : Fee Router'`, OpenGraph, Twitter card).
  - Renders shared `Masthead` (`edition={LATEST_EDITION.edition}`) with the edition chip and standard navigation.
  - Renders `FeeRouterClient` inside a `<main>` container.
  - Renders shared `Footer` (`edition={LATEST_EDITION.edition}`).

### B. Client Component: `src/site/components/FeeRouterClient.tsx`
- **Type:** React 19 Client Component (`'use client'`).
- **Styling:** Tailwind CSS v4, matching `:root` CSS variables and classes from `tokens.css` and `globals.css` (neutral background, cards with `bg-[var(--surface)]`, `border-[var(--rule)]`, crisp typography).
- **Core Sections:**
  1. **Preview Banner:** Displayed when contracts are unconfigured / zero address (`0x00...00`), explaining that figures are preview sample data.
  2. **Hero Section:**
     - Eyebrow: `TOKEN ECONOMICS // FEE ROUTER`
     - Title: `Hash and burn.`
     - Subtitle explaining the 3 routes.
     - Pill chips: `Owner: none`, `Withdraw: none`, `Keeper: none`, `Burn: ERC20 burn()`.
     - **Next Freeze Countdown Card:** Live client countdown timer to the 1st of the month (05:00 UTC) with 72h window calculation (`Window open` vs `Window closed`), UTC opening/closing times, and latest edition hash.
  3. **Where Every Fee Goes (3 Routes):**
     - Three split cards:
       - 50% Freeze Burn (Gold accent)
       - 30% Verification Vault (Green accent)
       - 20% Data (Ink/Slate accent)
     - Proportional visual split-bar (`flex: 50`, `flex: 30`, `flex: 20`).
  4. **Router Telemetry (Stats Grid & Duo Card):**
     - 8 Metric cards: `$FINE burned`, `$FINE to vault`, `Pending buyback`, `Unclaimed fees`, `Lifetime ETH in`, `ETH spent on buyback`, `ETH to data`, `Vault balance`.
     - Loading skeleton animation states.
     - **Buyback Guard Card:** Trading venue phase, reference price, age, status tag (Usable/Maturing/Stale), spot price.
     - **Contracts Card:** Copyable addresses for Fee Router, Verification Vault, $FINE, Data wallet, Pons escrow.
  5. **Ledger Tables:**
     - **Burn History Table:** Month, venue phase, ETH spent, $FINE bought, burned, to vault, transaction hash link to Blockscout.
     - **Bounty Ledger Table:** Category, recipient, amount, status tag (Executable / Paid / Cancelled), evidence hash.
  6. **Monthly Ritual:**
     - 4-step cards: Reference Price (04:00) $\to$ Freeze Opens (05:00) $\to$ Carry Drains (Up to 72h) $\to$ Hash and Burn (Same minute).
  7. **Safety Bounds Table:**
     - Delayed reference, one-sided band ($\le 2\%$), impact cap ($3\%$), ritual window ($72\text{h}$).
  8. **Guarantees Duo Cards:**
     - Fee Router trust model (no owner, no withdraw, no keeper) vs Verification Vault trust model (capped, timelocked registrar).
  9. **Web3 Action Desk:**
     - EIP-1193 wallet connector (`window.ethereum`), checking for Robinhood Chain.
     - Action buttons: `harvest()`, `recordCheckpoint()`, `executeBuyback()`.
     - Action log terminal with transaction status and error simulations.

### C. Navigation Integration
- Add `['FEE', 'Fee Router', '/fee-router']` to `LINKS` in `src/site/components/MenuButton.tsx`.
- Add link in `src/site/components/Footer.tsx`.

---

## 4. Web3 & Contract Fallbacks (Zero Crash Guarantee)
- If `window.ethereum` is absent or contract addresses are `0x000...000`, the page automatically displays **Preview Mode** with realistic sample figures without throwing any runtime or hydration errors.
- Viem client dynamically imported or gracefully handled so that the SSR build (`npm run build`) runs statically without requiring a live node connection.

---

## 5. Verification & Acceptance
- `npm run build`: Must compile statically with 0 errors.
- `npx tsc --noEmit`: 0 TypeScript errors.
- `npm run lint`: 0 ESLint warnings/errors.
- `npm test`: All tests green, including route verification for `/fee-router`.
- Responsive design: 0 horizontal scroll from 320px to 1920px.
