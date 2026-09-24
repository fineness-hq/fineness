'use client';

import React, { useEffect, useRef } from 'react';
import { Lock, TrendingUp, ShieldCheck, Sliders, Check, AlertTriangle, Scale, ArrowUpRight } from 'lucide-react';

/**
 * WhyFinenessBento:
 * Modeled after kentir's WorksSection.tsx (sticky stacking cards).
 * Features:
 * - 4 full-width architectural lifecycle cards that stick to top-24 as the user scrolls.
 * - Previous cards scale down and dim as the next card stacks smoothly over them.
 * - Interactive widgets inside each card (LTV comparison, depeg radar, assayer seal, caliper sliders).
 */
export default function WhyFinenessBento() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stackRef.current || window.innerWidth <= 768) return;
      const cards = Array.from(stackRef.current.children) as HTMLElement[];
      const vh = window.innerHeight;

      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const rect = next.getBoundingClientRect();
        const overlap = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.8)));
        card.style.transform = `scale(${1 - overlap * 0.035})`;
        card.style.filter = `brightness(${1 - overlap * 0.12})`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section aria-labelledby="why-title" className="page-wrap py-20 border-b border-[var(--rule)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-6 mb-12">
        <div>
          <p className="eyebrow">UTILITY // WHO RELIES ON FINENESS</p>
          <h2
            id="why-title"
            className="mt-1 font-[var(--font-inter)] text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)]"
          >
            Built for Capital That Cannot Afford to Guess
          </h2>
          <p className="prose mt-2 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
            When institutional treasuries and DeFi money markets accept tokenized gold, hearsay is catastrophic. Fineness delivers deterministic purity.
          </p>
        </div>

        <div className="mono text-xs font-bold text-[var(--gold)]">
          STANDARDS // FOUR SOVEREIGN PILLARS
        </div>
      </div>

      {/* Sticky Stacking Cards Container (Inspired by kentir WorksSection) */}
      <div ref={stackRef} className="space-y-8">
        
        {/* Card 1: Protocol Treasuries */}
        <article className="sticky top-24 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl transition-transform duration-200 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] mb-4">
                  <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                    PILLAR: LENDING & TREASURY RISK
                  </span>
                  <span className="mono text-[10px] font-bold text-[var(--ink-3)] uppercase border border-[var(--rule)] px-2 py-0.5 rounded bg-[var(--surface-alt)]">
                    COLLATERAL DEFENSE
                  </span>
                </div>

                <h3 className="font-[var(--font-inter)] text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                  Protect Lending Protocols from Toxic Paper Claims
                </h3>
                <p className="mt-3 text-sm text-[var(--ink-2)] leading-relaxed max-w-xl">
                  DeFi money markets, stablecoin minters, and DAO treasuries parameterize loan-to-value (LTV) limits and liquidation haircuts using Fineness Karat standings.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--rule)] grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[var(--ink-3)] block text-[10px] uppercase">PARAMETERIZATION</span>
                  <span className="font-bold text-[var(--ink)]">AAVE / MORPHO / MAKER</span>
                </div>
                <div>
                  <span className="text-[var(--ink-3)] block text-[10px] uppercase">LIQUIDATION GAP</span>
                  <span className="font-bold text-emerald-600">0% UNHEDGED</span>
                </div>
              </div>
            </div>

            {/* Visual Widget: Collateral Tier Matrix */}
            <div className="lg:col-span-5 w-full space-y-3 font-mono text-xs">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <Check size={14} /> ≥ 750 / 1000 • 18K - 24K TIER
                  </span>
                  <span className="rounded bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                    85% MAX LTV
                  </span>
                </div>
                <p className="text-[11px] text-[var(--ink-2)]">
                  LBMA Allocated Bullion in Zurich/London. Third-party monthly attestation letters confirmed.
                </p>
              </div>

              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-600 flex items-center gap-1.5">
                    <AlertTriangle size={14} /> &lt; 375 / 1000 • UNVERIFIED
                  </span>
                  <span className="rounded bg-red-600 px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                    0% COLLATERAL
                  </span>
                </div>
                <p className="text-[11px] text-[var(--ink-2)]">
                  Synthetic unallocated paper claims. Commingled with corporate debt. Immediate borrow freeze.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2: Depeg Radar */}
        <article className="sticky top-24 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl transition-transform duration-200 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] mb-4">
                  <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                    PILLAR: ARBITRAGE & LIQUIDITY
                  </span>
                  <span className="mono text-[10px] font-bold text-[var(--ink-3)] uppercase border border-[var(--rule)] px-2 py-0.5 rounded bg-[var(--surface-alt)]">
                    DEPEG DETECTOR
                  </span>
                </div>

                <h3 className="font-[var(--font-inter)] text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                  Detect Vault Divergence Before Liquidity Drains
                </h3>
                <p className="mt-3 text-sm text-[var(--ink-2)] leading-relaxed max-w-xl">
                  Arbitrageurs monitor the spread between secondary market automated market maker pricing and real-world physical vault redemption confidence.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--rule)] grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[var(--ink-3)] block text-[10px] uppercase">TRACKED ASSETS</span>
                  <span className="font-bold text-[var(--ink)]">10 SOVEREIGN VENUES</span>
                </div>
                <div>
                  <span className="text-[var(--ink-3)] block text-[10px] uppercase">ORACLE CONVERGENCE</span>
                  <span className="font-bold text-[var(--gold)]">SUB-MINUTE LATENCY</span>
                </div>
              </div>
            </div>

            {/* Visual Widget: Depeg Spread Gauge */}
            <div className="lg:col-span-5 w-full rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-5 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--ink-3)]">PHYSICAL PARITY INDEX</span>
                <span className="font-bold text-emerald-600">1.0000 AU</span>
              </div>
              <div className="w-full bg-[var(--rule)] h-2 rounded-full overflow-hidden">
                <div className="bg-[var(--gold)] h-full w-[96%]" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[var(--ink-2)] pt-1 border-t border-[var(--rule)]/60">
                <span>ZURICH FREEPORT ATTESTATION:</span>
                <span className="font-bold text-[var(--ink)]">CONFIRMED 99.8%</span>
              </div>
            </div>
          </div>
        </article>

        {/* Card 3: Unbribable Assayer */}
        <article className="sticky top-24 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl transition-transform duration-200 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] mb-4">
                  <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                    PILLAR: EDITORIAL INTEGRITY
                  </span>
                  <span className="mono text-[10px] font-bold text-emerald-600 uppercase border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">
                    UNBRIBABLE AUDIT
                  </span>
                </div>

                <h3 className="font-[var(--font-inter)] text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                  Zero Sponsored Hallmarks or Paid Placements
                </h3>
                <p className="mt-3 text-sm text-[var(--ink-2)] leading-relaxed max-w-xl">
                  Fineness accepts zero listing fees, token allocations, or foundation grants. If an audited protocol conceals custodian reports, it is struck from the public ledger without appeal.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--rule)] grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[var(--ink-3)] block text-[10px] uppercase">SPONSORSHIPS</span>
                  <span className="font-bold text-[var(--ink)]">$0 ACCEPTED</span>
                </div>
                <div>
                  <span className="text-[var(--ink-3)] block text-[10px] uppercase">STRIKE CADENCE</span>
                  <span className="font-bold text-red-600">ZERO TOLERANCE</span>
                </div>
              </div>
            </div>

            {/* Visual Seal Stamp */}
            <div className="lg:col-span-5 w-full flex items-center gap-4 rounded-xl border border-[var(--gold)]/40 bg-[var(--tint)]/60 p-5">
              <span className="mono text-4xl font-black text-[var(--gold)]">✦</span>
              <div className="font-mono text-xs">
                <div className="font-bold uppercase tracking-wider text-[var(--ink)] text-sm">ASSAYER&apos;S SANCTUARY</div>
                <p className="mt-1 text-[11px] text-[var(--ink-2)] leading-relaxed">
                  Deterministic math published directly to machine-readable JSON. Code and audits are open-source.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Card 4: Custom Risk Calipers */}
        <article className="sticky top-24 rounded-2xl border-2 border-[var(--gold)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl transition-transform duration-200 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] mb-4">
                  <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                    PILLAR: METHODOLOGY FREEDOM
                  </span>
                  <span className="mono text-[10px] font-bold text-[var(--gold)] uppercase border border-[var(--gold)]/30 bg-[var(--tint)] px-2 py-0.5 rounded">
                    URL PERSISTENCE
                  </span>
                </div>

                <h3 className="font-[var(--font-inter)] text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                  Calibrate and Share Your Own Sovereign Risk Model
                </h3>
                <p className="mt-3 text-sm text-[var(--ink-2)] leading-relaxed max-w-xl">
                  Disagree with our house ratios? Shift the weights across the five criteria. Your customized criteria weights serialize directly into the URL for verifiable peer sharing.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--rule)] grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[var(--ink-3)] block text-[10px] uppercase">STATE SERIALIZATION</span>
                  <span className="font-bold text-[var(--gold)]">QUERY PARAMS (?w=)</span>
                </div>
                <div>
                  <span className="text-[var(--ink-3)] block text-[10px] uppercase">SHARING FORMAT</span>
                  <span className="font-bold text-[var(--ink)]">VERIFIABLE PERMALINK</span>
                </div>
              </div>
            </div>

            {/* Visual Caliper Slider Preview */}
            <div className="lg:col-span-5 w-full grid grid-cols-2 gap-2.5 font-mono text-xs">
              <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                <span className="text-[var(--ink-3)] block text-[10px]">ASSET BACKING</span>
                <span className="font-bold text-[var(--gold)] text-base mt-0.5 block">30% WEIGHT</span>
              </div>
              <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                <span className="text-[var(--ink-3)] block text-[10px]">VOLUME LIQUIDITY</span>
                <span className="font-bold text-[var(--ink)] text-base mt-0.5 block">25% WEIGHT</span>
              </div>
              <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                <span className="text-[var(--ink-3)] block text-[10px]">RESERVE AUDITS</span>
                <span className="font-bold text-[var(--ink)] text-base mt-0.5 block">20% WEIGHT</span>
              </div>
              <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                <span className="text-[var(--ink-3)] block text-[10px]">CUSTODY & LEGAL</span>
                <span className="font-bold text-[var(--ink)] text-base mt-0.5 block">15% WEIGHT</span>
              </div>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}
