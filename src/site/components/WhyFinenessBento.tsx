'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Lock,
  TrendingUp,
  ShieldCheck,
  Sliders,
  Check,
  AlertTriangle,
  Vault,
  Radio,
  Sparkles,
  ArrowRight,
  Activity,
  Layers,
} from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

interface DeckItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: typeof Lock;
  statLabel: string;
  statValue: string;
  tag: string;
}

const DECKS: DeckItem[] = [
  {
    id: 'lending',
    badge: 'DECK I: COLLATERAL DEFENSE',
    title: 'Protect Money Markets from Toxic Paper Claims',
    subtitle: 'Zero unhedged liquidation gaps in DeFi lending protocols',
    desc: 'Money markets (Aave, Morpho) and stablecoin minters link maximum loan-to-value limits directly to Fineness Karat standings, isolating real allocated gold from commingled corporate liabilities.',
    icon: Lock,
    statLabel: 'MAXIMUM LTV CEILING',
    statValue: '85% ALLOCATED / 0% UNBACKED',
    tag: 'MONEY MARKET GRADE',
  },
  {
    id: 'depeg',
    badge: 'DECK II: ARBITRAGE RADAR',
    title: 'Detect Depository Divergence Before Liquidity Drains',
    subtitle: 'Spot London Good Delivery vs on-chain liquidity spread',
    desc: 'Arbitrageurs monitor real-time divergence between spot physical gold prices ($2,741.80/oz) and on-chain automated market maker liquidity, front-running depeg runs before redemption insolvency triggers.',
    icon: TrendingUp,
    statLabel: 'SPOT REDEMPTION PARITY',
    statValue: '1.0000 AU (CONFIRMED 99.8%)',
    tag: 'REAL-TIME SPREAD',
  },
  {
    id: 'sanctuary',
    badge: 'DECK III: EDITORIAL INTEGRITY',
    title: 'The Unbribable Assayer’s Sanctuary',
    subtitle: 'Zero listing fees, zero foundation grants, zero marketing tolls',
    desc: 'Fineness operates with absolute editorial independence. No venue can buy an 18K or 24K hallmark. If vault reserves fail inspection, the protocol is struck from the public ledger without warning.',
    icon: ShieldCheck,
    statLabel: 'SPONSORED RATINGS ACCEPTED',
    statValue: '$0.00 ZERO TOLERANCE',
    tag: 'UNCONDITIONAL HONESTY',
  },
  {
    id: 'equalizer',
    badge: 'DECK IV: HARMONIC EQUALIZER',
    title: 'Dynamic Risk Calibration & URL State Persistence',
    subtitle: 'Five criteria mathematically balanced in harmonic equilibrium',
    desc: 'Asset Backing (30%), Volume (25%), Reserves (20%), Custody (15%), and Durability (10%) dynamically balance into a unified Karat rating, serializing directly into verifiable URL permalinks.',
    icon: Sliders,
    statLabel: 'WEIGHT FORMULA EQUILIBRIUM',
    statValue: '30 / 25 / 20 / 15 / 10 HOUSE',
    tag: 'URL-ENCODED CALIPERS',
  },
];

/**
 * WhyFinenessBento:
 * Scroll-driven pinned 4-Deck Treasury Vault Showcase.
 * Features:
 * - 240svh pinned scroll container.
 * - Sticky viewport where scroll progress scrubs smoothly through the 4 institutional decks.
 * - Top deck selector with liquid gold progress indicator.
 * - Continuous looping visual widgets inside each deck (pulsing LTV monitor, 360 radar sweep, radiant wax seal, 5-bar dancing equalizer).
 */
export default function WhyFinenessBento() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeDeckIdx, setActiveDeckIdx] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const reduce = useReducedMotion();

  // Scroll-driven deck progression
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stageRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const stageHeight = stageRef.current.offsetHeight;
      const totalScrollable = rect.height - stageHeight;
      if (totalScrollable <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollPct(Math.round(p * 100));

      // Derive active deck:
      // 0.00 - 0.25 -> Deck 0
      // 0.25 - 0.50 -> Deck 1
      // 0.50 - 0.75 -> Deck 2
      // 0.75 - 1.00 -> Deck 3
      let d = 0;
      if (p >= 0.75) {
        d = 3;
      } else if (p >= 0.5) {
        d = 2;
      } else if (p >= 0.25) {
        d = 1;
      }
      setActiveDeckIdx(d);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const deck = DECKS[activeDeckIdx];
  const Icon = deck.icon;

  function scrollToDeck(idx: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const stageHeight = stageRef.current ? stageRef.current.offsetHeight : window.innerHeight;
    const totalScrollable = containerRef.current.offsetHeight - stageHeight;
    const targetScroll = window.scrollY + rect.top + (idx / 3) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  return (
    <section
      ref={containerRef}
      id="institutional-decks"
      aria-labelledby="why-title"
      className="relative w-full border-b border-[var(--rule)] bg-[var(--surface-alt)]"
      style={{ height: '240svh', minHeight: '1700px' }}
    >
      {/* Sticky Stage Viewport */}
      <div
        ref={stageRef}
        className="sticky top-16 md:top-20 h-[calc(100svh-64px)] md:h-[calc(100svh-80px)] min-h-[580px] flex flex-col justify-center items-center overflow-hidden px-[max(4vw,20px)] py-6"
      >
        <div className="w-full max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-4 mb-6">
            <div>
              <p className="eyebrow">UTILITY // SCROLL-DRIVEN TREASURY SUITE</p>
              <h2
                id="why-title"
                className="mt-1 font-[var(--font-inter)] text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[var(--ink)]"
              >
                Built for Capital That Cannot Afford to Guess
              </h2>
              <p className="prose mt-1 max-w-[66ch] text-xs sm:text-sm leading-relaxed text-[var(--ink-2)]">
                Scroll down to navigate through the four sovereign decks protecting treasuries, arbitrageurs, and protocols.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[var(--gold)] font-bold">
              <Vault size={16} />
              <span>TREASURY SUITE: {scrollPct}%</span>
            </div>
          </div>

          {/* 4-Deck Navigation Stepper Bar */}
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
            {/* Liquid Gold Scroll Progress Bar under the deck tabs */}
            <div
              className="absolute bottom-0 left-0 h-1 bg-[var(--gold)] rounded-b-xl transition-all duration-100 ease-out"
              style={{ width: `${scrollPct}%` }}
            />

            {DECKS.map((d, idx) => {
              const isCurrent = activeDeckIdx === idx;
              const DIcon = d.icon;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => scrollToDeck(idx)}
                  className={`flex items-center gap-2.5 p-3 rounded-lg text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-2 border-[var(--gold)] bg-[var(--tint)]/60 shadow-xs text-[var(--ink)]'
                      : 'border border-transparent text-[var(--ink-2)] hover:bg-[var(--surface-alt)] hover:text-[var(--ink)]'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black transition-colors ${
                      isCurrent
                        ? 'bg-[var(--gold)] text-white shadow-xs'
                        : 'border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]'
                    }`}
                  >
                    <DIcon size={14} />
                  </div>
                  <div className="truncate">
                    <span className="mono text-[8px] font-black uppercase tracking-wider text-[var(--gold)] block">
                      DECK {idx + 1}
                    </span>
                    <span className="font-[var(--font-inter)] text-xs font-bold block truncate text-[var(--ink)]">
                      {d.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Deck Presentation Card */}
          <div className="mt-6 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8 shadow-xl overflow-hidden transition-all duration-300">
            <div className="grid gap-6 lg:grid-cols-12 items-center">
              
              {/* Left Column: Deck Narrative Dossier (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--rule)] text-[10px] sm:text-[11px] font-mono text-[var(--ink-3)]">
                    <span className="font-bold uppercase tracking-wider text-[var(--gold)]">
                      {deck.badge}
                    </span>
                    <span>•</span>
                    <span>{deck.subtitle}</span>
                  </div>

                  <h3 className="mt-3 font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)] leading-snug">
                    {deck.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed max-w-xl">
                    {deck.desc}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)]/60 font-mono text-xs">
                  <span className="text-[9px] text-[var(--ink-3)] block uppercase tracking-wider font-bold">
                    {deck.statLabel}
                  </span>
                  <strong className="text-sm sm:text-base font-black text-[var(--ink)] mt-0.5 block text-[var(--gold)]">
                    {deck.statValue}
                  </strong>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono text-[var(--ink-3)]">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                    <Check size={13} />
                    <span>INSTITUTIONAL GRADE</span>
                  </span>
                  <span className="text-[10px]">SCROLL DOWN TO ADVANCE DECK</span>
                </div>
              </div>

              {/* Right Column: Visual Looping Deck Widget (5 Cols) */}
              <div className="lg:col-span-5 w-full flex flex-col justify-center">
                
                {/* Deck 0: Collateral LTV Widget */}
                {activeDeckIdx === 0 && (
                  <div className="rounded-xl border-2 border-[var(--gold)]/60 bg-[var(--surface-alt)] p-5 font-mono text-xs space-y-3 shadow-md">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--rule)] text-[10px]">
                      <span className="font-bold uppercase tracking-wider text-[var(--gold)]">COLLATERAL MATRIX</span>
                      <span className="text-emerald-600 font-bold">PAXG // 24K</span>
                    </div>

                    <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 space-y-1">
                      <div className="flex justify-between font-bold text-emerald-800 text-[11px]">
                        <span>LBMA 400oz ALLOCATED:</span>
                        <span>85% MAX LTV</span>
                      </div>
                      <div className="text-[9px] text-[var(--ink-2)]">Direct legal title in Zurich Freeport • Zero liquidation gap</div>
                    </div>

                    <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 space-y-1">
                      <div className="flex justify-between font-bold text-red-700 text-[11px]">
                        <span>UNALLOCATED SYNTHETIC:</span>
                        <span>0% REJECTED</span>
                      </div>
                      <div className="text-[9px] text-[var(--ink-2)]">Commingled issuer debt • Disqualified from money markets</div>
                    </div>
                  </div>
                )}

                {/* Deck 1: 360-Degree Radar Widget */}
                {activeDeckIdx === 1 && (
                  <div className="relative h-44 rounded-xl border-2 border-[var(--gold)]/60 bg-[var(--dark)] text-white p-4 font-mono text-xs shadow-md overflow-hidden flex items-center justify-center">
                    {/* Concentric Radar Rings */}
                    <div className="absolute h-32 w-32 rounded-full border border-white/10" />
                    <div className="absolute h-20 w-20 rounded-full border border-white/10" />
                    <div className="absolute h-10 w-10 rounded-full border border-white/10" />
                    <div className="absolute inset-x-0 h-[1px] bg-white/10" />
                    <div className="absolute inset-y-0 w-[1px] bg-white/10" />

                    {/* Rotating Radar Sweeper */}
                    <motion.div
                      aria-hidden="true"
                      animate={reduce ? {} : { rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 origin-center pointer-events-none"
                      style={{
                        background: 'conic-gradient(from 0deg, rgba(196,139,15,0.45) 0deg, transparent 60deg, transparent 360deg)',
                      }}
                    />

                    {/* Blips */}
                    <div className="absolute top-8 left-12 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[9px] font-bold text-white/80">ZURICH</span>
                    </div>
                    <div className="absolute bottom-8 right-14 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-ping" />
                      <span className="text-[9px] font-bold text-white/80">LONDON</span>
                    </div>

                    <div className="absolute bottom-2 left-3 text-[9px] text-white/60">
                      SPREAD: <strong className="text-emerald-400">-$1.70 (HEALTHY PARITY)</strong>
                    </div>
                  </div>
                )}

                {/* Deck 2: Assayer's Sanctuary Wax Seal Widget */}
                {activeDeckIdx === 2 && (
                  <div className="relative rounded-xl border-2 border-[var(--gold)]/60 bg-gradient-to-br from-[var(--surface)] via-[var(--tint)]/50 to-[var(--surface)] p-6 font-mono text-xs shadow-md overflow-hidden text-center space-y-3">
                    <motion.div
                      aria-hidden="true"
                      animate={reduce ? {} : { opacity: [0.2, 0.45, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,139,15,0.3)_0%,transparent_60%)] pointer-events-none"
                    />

                    <div className="relative z-10 flex flex-col items-center">
                      <span className="text-4xl font-black text-[var(--gold)] select-none animate-pulse">✦</span>
                      <div className="font-bold text-[var(--ink)] text-sm mt-1 uppercase tracking-wider">
                        ASSAYER&apos;S SANCTUARY
                      </div>
                      <p className="text-[11px] text-[var(--ink-2)] mt-1 max-w-xs">
                        Deterministic mathematical audit published directly to open JSON. No foundation grants, no marketing tolls.
                      </p>
                      <div className="mt-3 rounded bg-[var(--dark)] px-3 py-1 text-[10px] font-bold text-[var(--gold)]">
                        SHA-256 SEAL SECURED
                      </div>
                    </div>
                  </div>
                )}

                {/* Deck 3: Dancing Equalizer Widget */}
                {activeDeckIdx === 3 && (
                  <div className="rounded-xl border-2 border-[var(--gold)]/60 bg-[var(--surface-alt)] p-5 font-mono text-xs shadow-md space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--rule)]/60 text-[10px]">
                      <span className="font-bold uppercase tracking-wider text-[var(--gold)]">EQUALIZER FREQUENCY</span>
                      <strong className="text-[var(--ink)]">999 / 1000 [24K]</strong>
                    </div>

                    <div className="grid grid-cols-5 gap-2 items-end h-28 pt-2">
                      {[
                        { label: 'BACKING', delay: 0 },
                        { label: 'VOLUME', delay: 0.2 },
                        { label: 'RESERVES', delay: 0.4 },
                        { label: 'CUSTODY', delay: 0.1 },
                        { label: 'DURABILITY', delay: 0.3 },
                      ].map((col) => (
                        <div key={col.label} className="flex flex-col items-center gap-1.5 h-full justify-end">
                          <motion.div
                            animate={
                              reduce
                                ? {}
                                : {
                                    height: ['35%', '90%', '50%', '85%', '35%'],
                                  }
                            }
                            transition={{
                              duration: 2.4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: col.delay,
                            }}
                            className="w-full bg-[var(--gold)] rounded-t-sm shadow-xs"
                          />
                          <span className="text-[8px] font-bold text-[var(--ink-3)] uppercase tracking-tighter truncate w-full text-center">
                            {col.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
