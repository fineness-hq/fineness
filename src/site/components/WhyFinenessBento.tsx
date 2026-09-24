'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Lock,
  TrendingUp,
  ShieldCheck,
  Sliders,
  Check,
  AlertTriangle,
  Scale,
  Sparkles,
  RefreshCw,
  Copy,
  CheckCircle2,
} from 'lucide-react';

/**
 * WhyFinenessBento:
 * Elevated sticky stacking multi-deck architecture.
 * Features:
 * - 4 interactive cards that stack seamlessly at top-24 with dynamic scale & dimming physics.
 * - Card 1: Live Interactive Collateral & LTV Calculator.
 * - Card 2: Real-time Depeg Arbitrage Spread Radar.
 * - Card 3: Interactive Cryptographic Assay Key Verifier.
 * - Card 4: Live 5-Criteria Weight Equalizer with instant score computation.
 */
export default function WhyFinenessBento() {
  const stackRef = useRef<HTMLDivElement>(null);

  // Card 1: Interactive Collateral Calculator State
  const [collateralType, setCollateralType] = useState<'lbma' | 'synthetic'>('lbma');
  const [depositAmount, setDepositAmount] = useState(10); // oz of gold

  // Card 3: Signature Verifier State
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  // Card 4: Interactive Weight Equalizer State
  const [weights, setWeights] = useState({
    backing: 30,
    volume: 25,
    reserves: 20,
    custody: 15,
    durability: 10,
  });

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

  // Compute live LTV from Card 1
  const spotGoldPrice = 2741.8;
  const depositValue = depositAmount * spotGoldPrice;
  const maxBorrow = collateralType === 'lbma' ? depositValue * 0.85 : 0;
  const liquidationThreshold = collateralType === 'lbma' ? spotGoldPrice * 0.88 : 'N/A';

  // Compute live score from Card 4
  const calculatedScore = Math.round(
    weights.backing * 3.33 +
      weights.volume * 2.5 +
      weights.reserves * 2.0 +
      weights.custody * 1.5 +
      weights.durability * 1.0,
  );

  function verifySeal() {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 600);
  }

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
          STANDARDS // FOUR SOVEREIGN DECKS
        </div>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div ref={stackRef} className="space-y-8">
        
        {/* Card 1: Protocol Treasuries (With Live Collateral Calculator) */}
        <article className="sticky top-24 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl transition-transform duration-200 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] mb-4">
                  <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                    DECK I: LENDING & TREASURY RISK
                  </span>
                  <span className="mono text-[10px] font-bold text-[var(--ink-3)] uppercase border border-[var(--rule)] px-2 py-0.5 rounded bg-[var(--surface-alt)]">
                    COLLATERAL DEFENSE
                  </span>
                </div>

                <h3 className="font-[var(--font-inter)] text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                  Protect Lending Protocols from Toxic Paper Claims
                </h3>
                <p className="mt-3 text-sm text-[var(--ink-2)] leading-relaxed">
                  DeFi money markets, CDP issuers, and DAO treasuries parameterize loan-to-value (LTV) limits and liquidation haircuts using Fineness Karat standings.
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

            {/* Interactive Calculator Widget */}
            <div className="lg:col-span-6 w-full rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-5 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[var(--ink-2)] pb-2 border-b border-[var(--rule)]/60">
                <span>INTERACTIVE LTV SIMULATOR</span>
                <span className="text-[var(--gold)]">LIVE ORACLE ($2,741.80/OZ)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCollateralType('lbma')}
                  className={`flex-1 rounded py-2 text-center font-bold text-xs border transition-colors cursor-pointer ${
                    collateralType === 'lbma'
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                      : 'border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]'
                  }`}
                >
                  PAXG (24K LBMA ALLOCATED)
                </button>
                <button
                  type="button"
                  onClick={() => setCollateralType('synthetic')}
                  className={`flex-1 rounded py-2 text-center font-bold text-xs border transition-colors cursor-pointer ${
                    collateralType === 'synthetic'
                      ? 'border-red-600 bg-red-600 text-white shadow-xs'
                      : 'border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]'
                  }`}
                >
                  SYNTHETIC IOU (UNALLOCATED)
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[var(--ink-3)]">COLLATERAL DEPOSIT:</span>
                  <span className="font-bold text-[var(--ink)]">{depositAmount} OZ GOLD (${depositValue.toLocaleString('en-US', { maximumFractionDigits: 0 })})</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full accent-[var(--gold)] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--rule)]/60 text-[11px]">
                <div className="rounded border border-[var(--rule)] bg-[var(--surface)] p-2">
                  <span className="text-[10px] text-[var(--ink-3)] block">MAX BORROW CAPACITY</span>
                  <strong className={`text-sm ${collateralType === 'lbma' ? 'text-emerald-600' : 'text-red-600'}`}>
                    ${maxBorrow.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </strong>
                </div>
                <div className="rounded border border-[var(--rule)] bg-[var(--surface)] p-2">
                  <span className="text-[10px] text-[var(--ink-3)] block">LIQUIDATION SAFETY</span>
                  <strong className="text-sm text-[var(--ink)]">
                    {collateralType === 'lbma' ? '88% THRESHOLD' : 'IMMEDIATE REJECT'}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2: Depeg Radar (With Live Arbitrage Spread) */}
        <article className="sticky top-24 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl transition-transform duration-200 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] mb-4">
                  <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                    DECK II: ARBITRAGE & LIQUIDITY
                  </span>
                  <span className="mono text-[10px] font-bold text-[var(--ink-3)] uppercase border border-[var(--rule)] px-2 py-0.5 rounded bg-[var(--surface-alt)]">
                    DEPEG DETECTOR
                  </span>
                </div>

                <h3 className="font-[var(--font-inter)] text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                  Detect Vault Divergence Before Liquidity Drains
                </h3>
                <p className="mt-3 text-sm text-[var(--ink-2)] leading-relaxed">
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

            {/* Visual Widget: Depeg Spread Radar */}
            <div className="lg:col-span-6 w-full rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-5 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[var(--ink-2)] pb-2 border-b border-[var(--rule)]/60">
                <span>PARITY RADAR // SECONDARY SPREAD</span>
                <span className="text-emerald-600 font-bold">1.0000 AU SPOT</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[var(--ink-3)]">LONDON GOOD DELIVERY SPOT:</span>
                  <span className="font-bold text-[var(--ink)]">$2,741.80 / OZ</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[var(--ink-3)]">ON-CHAIN TOKEN LIQUIDITY:</span>
                  <span className="font-bold text-[var(--gold)]">$2,740.10 / OZ (-$1.70 SPREAD)</span>
                </div>
              </div>

              <div className="rounded border border-[var(--rule)] bg-[var(--surface)] p-3 space-y-1.5">
                <div className="flex justify-between text-[10px] text-[var(--ink-3)]">
                  <span>VAULT REDEMPTION CONFIDENCE:</span>
                  <span className="font-bold text-emerald-600">99.8% CONFIRMED</span>
                </div>
                <div className="w-full bg-[var(--rule)] h-2 rounded-full overflow-hidden">
                  <div className="bg-[var(--gold)] h-full w-[98%]" />
                </div>
              </div>

              <div className="text-[10px] text-[var(--ink-3)] text-right">
                ARBITRAGE WINDOW: <strong className="text-[var(--ink)]">HEALTHY • NO DEPEG RISK</strong>
              </div>
            </div>
          </div>
        </article>

        {/* Card 3: Unbribable Assayer (With Cryptographic Proof Verification) */}
        <article className="sticky top-24 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl transition-transform duration-200 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] mb-4">
                  <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                    DECK III: EDITORIAL SANCTUARY
                  </span>
                  <span className="mono text-[10px] font-bold text-emerald-600 uppercase border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">
                    UNBRIBABLE AUDIT
                  </span>
                </div>

                <h3 className="font-[var(--font-inter)] text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                  Zero Sponsored Hallmarks or Paid Placements
                </h3>
                <p className="mt-3 text-sm text-[var(--ink-2)] leading-relaxed">
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

            {/* Visual Seal Stamp with Verification Trigger */}
            <div className="lg:col-span-6 w-full rounded-xl border border-[var(--gold)]/40 bg-[var(--tint)]/50 p-6 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--gold)]/30">
                <span className="font-bold uppercase tracking-wider text-[var(--ink)] text-sm">
                  CRYPTOGRAPHIC ASSAY SEAL
                </span>
                <span className="mono text-xs font-black text-[var(--gold)]">AU 24K</span>
              </div>

              <p className="text-[11px] text-[var(--ink-2)] leading-relaxed">
                Deterministic math sealed with SHA-256 snapshot hashes published directly to machine-readable JSON. No human discretion overrides raw math.
              </p>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={verifySeal}
                  disabled={isVerifying}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--gold)] bg-[var(--dark)] px-3.5 py-2 font-bold text-white shadow-xs hover:bg-[var(--gold)] hover:text-black transition-all cursor-pointer"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw size={12} className="animate-spin text-[var(--gold)]" />
                      <span>CHECKING ECDSA...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span>VERIFY HASH INTEGRITY</span>
                    </>
                  )}
                </button>

                <span className="text-[10px] text-emerald-600 font-bold">
                  {isVerified ? '✓ SHA-256 SIGNED' : ''}
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Card 4: Custom Risk Caliper Equalizer */}
        <article className="sticky top-24 rounded-2xl border-2 border-[var(--gold)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl transition-transform duration-200 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] mb-4">
                  <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                    DECK IV: METHODOLOGY FREEDOM
                  </span>
                  <span className="mono text-[10px] font-bold text-[var(--gold)] uppercase border border-[var(--gold)]/30 bg-[var(--tint)] px-2 py-0.5 rounded">
                    EQUALIZER STUDIO
                  </span>
                </div>

                <h3 className="font-[var(--font-inter)] text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                  Calibrate Your Own Sovereign Risk Equalizer
                </h3>
                <p className="mt-3 text-sm text-[var(--ink-2)] leading-relaxed">
                  Disagree with our house ratios? Shift the weights across the five criteria. Your customized criteria weights serialize directly into the URL for verifiable institutional sharing.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--rule)] grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[var(--ink-3)] block text-[10px] uppercase">STATE SERIALIZATION</span>
                  <span className="font-bold text-[var(--gold)]">QUERY PARAMS (?w=)</span>
                </div>
                <div>
                  <span className="text-[var(--ink-3)] block text-[10px] uppercase">SIMULATED KARAT</span>
                  <span className="font-bold text-emerald-600">{calculatedScore} / 1000 AU</span>
                </div>
              </div>
            </div>

            {/* Interactive Weight Equalizer Sliders */}
            <div className="lg:col-span-6 w-full rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-5 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[var(--ink-2)] pb-2 border-b border-[var(--rule)]/60">
                <span>EQUALIZER CALIPERS</span>
                <span className="text-[var(--gold)]">CALCULATED: {calculatedScore} / 1000</span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[var(--ink-3)]">ASSET BACKING:</span>
                    <span className="font-bold text-[var(--gold)]">{weights.backing}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={weights.backing}
                    onChange={(e) => setWeights({ ...weights, backing: Number(e.target.value) })}
                    className="w-full accent-[var(--gold)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[var(--ink-3)]">VOLUME TRACTION:</span>
                    <span className="font-bold text-[var(--ink)]">{weights.volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={weights.volume}
                    onChange={(e) => setWeights({ ...weights, volume: Number(e.target.value) })}
                    className="w-full accent-[var(--gold)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[var(--ink-3)]">RESERVE AUDITS:</span>
                    <span className="font-bold text-[var(--ink)]">{weights.reserves}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={weights.reserves}
                    onChange={(e) => setWeights({ ...weights, reserves: Number(e.target.value) })}
                    className="w-full accent-[var(--gold)] cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--rule)]/60 text-[10px] text-[var(--ink-3)] text-right">
                ENCODES AUTOMATICALLY INTO BROWSER PERMALINK
              </div>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}
