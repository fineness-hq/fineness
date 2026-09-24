'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
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

/**
 * WhyFinenessBento:
 * Architectural 4-Deck Bento Grid with Spring-Dampened Parallax & Vernier Caliper.
 * Hardware-accelerated with Framer Motion motion values for 60/120fps buttery smooth scroll.
 */
export default function WhyFinenessBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const [caliperPct, setCaliperPct] = useState(0);
  const reduce = useReducedMotion();

  // Framer Motion scroll and spring dampening
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const leftColY = useTransform(smoothProgress, [0, 1], reduce ? [0, 0] : [28, -28]);
  const rightColY = useTransform(smoothProgress, [0, 1], reduce ? [0, 0] : [-28, 28]);
  const caliperScale = useTransform(smoothProgress, [0.1, 0.9], [0, 1]);

  useEffect(() => {
    return smoothProgress.on('change', (v) => {
      const clamped = Math.max(0, Math.min(100, Math.round(v * 100)));
      setCaliperPct(clamped);
    });
  }, [smoothProgress]);

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
              <span>VERNIER CALIPER: {caliperPct}%</span>
            </div>
            {/* Caliper Hairline */}
            <div className="w-48 h-2 rounded-full bg-[var(--surface-alt)] border border-[var(--rule)] overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--gold)] w-full origin-left will-change-transform"
                style={{ scaleX: reduce ? 1 : caliperScale }}
              />
            </div>
            <span className="text-[10px] text-[var(--ink-3)] mt-1">AXIS DEPTH: 4 INSTITUTIONAL QUADRANTS</span>
          </div>
        </div>

        {/* 4-Deck Bento Grid (12-Column Asymmetric Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* DECK 1: COLLATERAL DEFENSE ENGINE (Cols 1-7) */}
          <motion.div
            style={{ y: leftColY }}
            className="lg:col-span-7 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface-alt)] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-[var(--gold)]/80 transition-colors duration-250 relative group overflow-hidden will-change-transform"
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
          </motion.div>

          {/* DECK 2: DEPEG ARBITRAGE RADAR (Cols 8-12) */}
          <motion.div
            style={{ y: rightColY }}
            className="lg:col-span-5 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface-alt)] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-[var(--gold)]/80 transition-colors duration-250 relative group overflow-hidden will-change-transform"
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
          </motion.div>

          {/* DECK 3: ASSAYER'S SANCTUARY (Cols 1-5) */}
          <motion.div
            style={{ y: leftColY }}
            className="lg:col-span-5 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface-alt)] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-[var(--gold)]/80 transition-colors duration-250 relative group overflow-hidden will-change-transform"
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
          </motion.div>

          {/* DECK 4: HARMONIC EQUALIZER (Cols 6-12) */}
          <motion.div
            style={{ y: rightColY }}
            className="lg:col-span-7 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface-alt)] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-[var(--gold)]/80 transition-colors duration-250 relative group overflow-hidden will-change-transform"
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

              {/* Equalizer Frequency Dancing Bars - Hardware Accelerated Transform */}
              <div className="flex items-end justify-between gap-2 h-16 pt-2 pb-1 px-4 rounded-lg bg-[var(--surface-alt)] border border-[var(--rule)]">
                {[
                  { label: 'BACK', scale: 0.85, delay: 0 },
                  { label: 'VOL', scale: 0.65, delay: 0.2 },
                  { label: 'RES', scale: 0.92, delay: 0.4 },
                  { label: 'CUST', scale: 0.78, delay: 0.1 },
                  { label: 'DUR', scale: 0.60, delay: 0.3 },
                  { label: 'HARMONIC', scale: 0.95, delay: 0.5 },
                  { label: 'KARAT', scale: 1.0, delay: 0.25 },
                ].map((bar, bIdx) => (
                  <div key={bIdx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <motion.div
                      animate={{
                        scaleY: [bar.scale * 0.7, bar.scale, bar.scale * 0.8],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 1.6 + (bIdx % 3) * 0.3,
                        delay: bar.delay,
                        ease: 'easeInOut',
                      }}
                      className="w-full h-full bg-[var(--gold)] rounded-t will-change-transform origin-bottom"
                      style={{
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
          </motion.div>

        </div>

      </div>
    </section>
  );
}
