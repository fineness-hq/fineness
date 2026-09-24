'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Lock,
  TrendingUp,
  ShieldCheck,
  Sliders,
  Check,
  AlertTriangle,
  Radio,
  Sparkles,
  ArrowRight,
  Activity,
  Layers,
  Crosshair,
  Compass,
} from 'lucide-react';
import Reveal from './Reveal';

/**
 * WhyFinenessBento:
 * Architectural 4-Deck Bento Grid with Scroll Parallax & Vernier Telemetry Caliper.
 * 
 * Mechanical difference vs AssayWorkflow:
 * - AssayWorkflow is a pinned horizontal conveyor belt (100vh lock).
 * - WhyFinenessBento is an OPEN asymmetric bento grid in natural document flow.
 * - Scroll drives a live Vernier Caliper precision hairline and multi-plane 3D column parallax.
 * - Dynamic gold spotlighting illuminates the 4 institutional decks as user scrolls past.
 */
export default function WhyFinenessBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Measure scroll through this section for Vernier Caliper and subtle parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // Calculate how far through the section the viewport is
      const total = rect.height + vh;
      const current = vh - rect.top;
      const progress = Math.max(0, Math.min(1, current / total));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offsets
  const leftColOffset = (scrollProgress - 0.5) * -20;
  const rightColOffset = (scrollProgress - 0.5) * 20;

  return (
    <section
      ref={sectionRef}
      id="utility-suite"
      aria-label="Institutional Suite & Utility"
      className="relative w-full py-20 md:py-28 bg-[var(--surface)] border-b border-[var(--rule)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Scroll-Driven Vernier Caliper Scale */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--rule)] pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
              <p className="eyebrow text-[var(--gold)] font-mono text-xs tracking-widest">
                UTILITY // INSTITUTIONAL SUITE & RISK ENGINE
              </p>
            </div>
            <h2 className="mt-2 font-[var(--font-inter)] text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[var(--ink)]">
              Built for Capital That Cannot Afford to Guess
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] max-w-2xl leading-relaxed">
              DeFi lending markets, institutional allocators, and arbitrageurs rely on Fineness hallmarks to parameterize liquidation buffers and detect depository divergence.
            </p>
          </div>

          {/* Vernier Caliper Calibrated Readout */}
          <div className="shrink-0 flex flex-col items-end font-mono">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold)] mb-1">
              <Compass size={14} className="animate-spin" />
              <span>VERNIER CALIPER: {Math.round(scrollProgress * 100)}%</span>
            </div>
            {/* Caliper Hairline */}
            <div className="w-48 h-2 rounded-full bg-[var(--surface-alt)] border border-[var(--rule)] overflow-hidden relative">
              <div
                className="absolute top-0 bottom-0 bg-[var(--gold)] transition-all duration-75"
                style={{
                  left: 0,
                  width: `${scrollProgress * 100}%`,
                }}
              />
            </div>
            <span className="text-[10px] text-[var(--ink-3)] mt-1">AXIS DEPTH: 4 INSTITUTIONAL QUADRANTS</span>
          </div>
        </div>

        {/* 4-Deck Bento Grid (12-Column Asymmetric Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* DECK 1: COLLATERAL DEFENSE ENGINE (Cols 1-7) */}
          <div
            className="lg:col-span-7 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface-alt)] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-[var(--gold)]/80 transition-all duration-300 relative group overflow-hidden"
            style={{
              transform: `translateY(${leftColOffset}px)`,
              transition: 'transform 0.1s ease-out, border-color 0.3s ease',
            }}
          >
            {/* Gold Spotlight Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(196,139,15,0.12),transparent_70%)] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[var(--gold)]">
                  <Lock size={14} />
                  <span>DECK I: COLLATERAL DEFENSE</span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]">
                  LENDING PROTOCOLS
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)] leading-snug">
                Protect Money Markets from Toxic Paper Claims
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Money markets (Aave, Morpho) and stablecoin minters link maximum loan-to-value limits directly to Fineness Karat standings, isolating real allocated gold from commingled corporate liabilities.
              </p>
            </div>

            {/* Live Interactive LTV Gauge & Haircut Visual */}
            <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 font-mono">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[var(--ink-2)] font-semibold">MAXIMUM LTV CEILING</span>
                <span className="text-[var(--gold)] font-black text-sm">85% ALLOCATED</span>
              </div>

              <div className="w-full h-3 rounded-full bg-[var(--surface-alt)] border border-[var(--rule)] overflow-hidden flex">
                <div className="h-full bg-[var(--gold)] w-[85%] relative flex items-center justify-end pr-2 text-[9px] font-bold text-white">
                  <span>85% 24K</span>
                </div>
                <div className="h-full bg-red-500/30 w-[15%] flex items-center justify-center text-[8px] text-red-400 font-bold">
                  HAIRCUT
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] pt-3 border-t border-[var(--rule)] text-[var(--ink-2)]">
                <div>
                  <span className="text-[var(--ink-3)] block uppercase">LIQUIDATION BUFFER:</span>
                  <span className="font-bold text-[var(--ink)]">15% AUTOMATIC GAP</span>
                </div>
                <div className="text-right">
                  <span className="text-[var(--ink-3)] block uppercase">ORACLE CONVERGENCE:</span>
                  <span className="font-bold text-emerald-600">ZERO LATENCY</span>
                </div>
              </div>
            </div>
          </div>

          {/* DECK 2: DEPEG ARBITRAGE RADAR (Cols 8-12) */}
          <div
            className="lg:col-span-5 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface-alt)] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-[var(--gold)]/80 transition-all duration-300 relative group overflow-hidden"
            style={{
              transform: `translateY(${rightColOffset}px)`,
              transition: 'transform 0.1s ease-out, border-color 0.3s ease',
            }}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[var(--gold)]">
                  <TrendingUp size={14} />
                  <span>DECK II: ARBITRAGE RADAR</span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-600">
                  LIVE SWEEP
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl font-black text-[var(--ink)] leading-snug">
                Detect Depository Divergence
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Spot physical London Good Delivery spreads ($2,741.80/oz) vs AMM liquidity pools to front-run depeg runs before insolvency triggers.
              </p>
            </div>

            {/* Radar Sweep Widget */}
            <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[#0C1014] p-4 text-center font-mono relative overflow-hidden flex flex-col items-center justify-center h-40">
              {/* Radar Grid Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-28 h-28 rounded-full border border-emerald-500/20" />
                <div className="w-20 h-20 rounded-full border border-emerald-500/30 absolute" />
                <div className="w-12 h-12 rounded-full border border-emerald-500/40 absolute" />
                {/* Crosshairs */}
                <div className="w-full h-[1px] bg-emerald-500/20 absolute" />
                <div className="h-full w-[1px] bg-emerald-500/20 absolute" />
              </div>

              {/* Rotating Radar Sweep Cone */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(16,185,129,0.3) 360deg)',
                  animation: 'spin 4s linear infinite',
                }}
              />

              {/* Target Lock Center */}
              <div className="relative z-10">
                <Crosshair size={24} className="text-emerald-400 mx-auto animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-300 block mt-1">
                  1.0000 AU REDEMPTION PARITY
                </span>
                <span className="text-[9px] text-white/50 block">
                  PARITY SPREAD: 0.02% (NORMAL)
                </span>
              </div>
            </div>
          </div>

          {/* DECK 3: ASSAYER'S SANCTUARY (Cols 1-5) */}
          <div
            className="lg:col-span-5 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface-alt)] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-[var(--gold)]/80 transition-all duration-300 relative group overflow-hidden"
            style={{
              transform: `translateY(${leftColOffset}px)`,
              transition: 'transform 0.1s ease-out, border-color 0.3s ease',
            }}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[var(--gold)]">
                  <ShieldCheck size={14} />
                  <span>DECK III: EDITORIAL SANCTUARY</span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--gold)]/40 bg-[var(--tint)] text-[var(--gold)]">
                  ZERO TOLLS
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl font-black text-[var(--ink)] leading-snug">
                Unbribable Assayer Integrity
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Zero listing fees, zero foundation grants, zero marketing tolls. No venue can buy a 24K hallmark. If vault reserves fail inspection, the venue is struck from the public ledger.
              </p>
            </div>

            {/* Wax Seal Visual */}
            <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 flex items-center gap-4 font-mono">
              <div className="h-12 w-12 rounded-full border-2 border-[var(--gold)] flex items-center justify-center shrink-0 text-[var(--gold)] bg-[var(--tint)] shadow-inner">
                <Sparkles size={20} className="animate-spin text-[var(--gold)]" />
              </div>
              <div>
                <span className="text-[10px] text-[var(--ink-3)] uppercase block font-bold">
                  SPONSORED FEES ACCEPTED
                </span>
                <span className="text-base font-black text-[var(--ink)] block">
                  $0.00 ZERO TOLERANCE
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">
                  100% UNBRIBABLE EDITORIAL CODE
                </span>
              </div>
            </div>
          </div>

          {/* DECK 4: HARMONIC EQUALIZER (Cols 6-12) */}
          <div
            className="lg:col-span-7 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface-alt)] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-[var(--gold)]/80 transition-all duration-300 relative group overflow-hidden"
            style={{
              transform: `translateY(${rightColOffset}px)`,
              transition: 'transform 0.1s ease-out, border-color 0.3s ease',
            }}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[var(--gold)]">
                  <Sliders size={14} />
                  <span>DECK IV: HARMONIC EQUALIZER</span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]">
                  URL STATE PERSISTENT
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)] leading-snug">
                Dynamic Risk Calibration & URL State Persistence
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Backing (30%), Volume (25%), Reserves (20%), Custody (15%), and Durability (10%) mathematically balance into a unified Karat rating, serializing directly into verifiable URL permalinks.
              </p>
            </div>

            {/* Dancing Equalizer Bars & Formula Preview */}
            <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 font-mono">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[var(--ink-2)] font-semibold">5-PILLAR EQUILIBRIUM:</span>
                <span className="text-[var(--gold)] font-bold">30 / 25 / 20 / 15 / 10 HOUSE</span>
              </div>

              {/* Equalizer Frequency Dancing Bars */}
              <div className="flex items-end justify-between gap-2 h-16 pt-2 pb-1 px-4 rounded-lg bg-[var(--surface-alt)] border border-[var(--rule)]">
                {[
                  { label: 'BACK', pct: '85%', delay: '0s' },
                  { label: 'VOL', pct: '65%', delay: '0.2s' },
                  { label: 'RES', pct: '92%', delay: '0.4s' },
                  { label: 'CUST', pct: '78%', delay: '0.1s' },
                  { label: 'DUR', pct: '60%', delay: '0.3s' },
                  { label: 'HARMONIC', pct: '95%', delay: '0.5s' },
                  { label: 'KARAT', pct: '100%', delay: '0.25s' },
                ].map((bar, bIdx) => (
                  <div key={bIdx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-full bg-[var(--gold)] rounded-t transition-all duration-300"
                      style={{
                        height: bar.pct,
                        opacity: 0.75 + (bIdx % 3) * 0.1,
                      }}
                    />
                    <span className="text-[8px] text-[var(--ink-3)] font-bold">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
