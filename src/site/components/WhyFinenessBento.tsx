'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Lock,
  TrendingUp,
  ShieldCheck,
  Sliders,
  Crosshair,
} from 'lucide-react';

/**
 * WhyFinenessBento:
 * Architectural 4-Deck Bento Grid with Spring-Dampened Parallax & Vernier Caliper.
 * Hardware-accelerated with Framer Motion motion values for 60/120fps buttery smooth scroll.
 */
export default function WhyFinenessBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Framer Motion scroll and spring dampening
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const leftColY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [28, -28]);
  const rightColY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-28, 28]);

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
              How readers use the register: compare backing evidence, reweight the criteria, share the result.
            </p>
          </div>

          {/* Architectural Badge */}
          <div className="shrink-0 flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]">
            <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
            <span className="font-bold text-[var(--ink)]">4 STRUCTURAL DECKS</span>
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
                  <span>DECK I: READ THE GAP</span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]">
                  EDITORIAL THESIS
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)] leading-snug">
                Separate backing evidence from hype
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                The register measures one gap: venues marketed as real-world-asset platforms whose only real asset exposure is the pairing. Eight of ten venues clear the hallmark — two do not.
              </p>
            </div>

            {/* Register split gauge from the latest edition */}
            <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 font-mono">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[var(--ink-2)] font-semibold">REGISTER SPLIT</span>
                <span className="text-[var(--gold)] font-black text-sm">8 OF 10 CERTIFIED</span>
              </div>

              <div className="w-full h-3 rounded-full bg-[var(--surface-alt)] border border-[var(--rule)] overflow-hidden flex">
                <div className="h-full bg-[var(--band-high)] w-[80%] relative flex items-center justify-end pr-2 text-[9px] font-bold text-white">
                  <span>8 CERTIFIED</span>
                </div>
                <div className="h-full bg-[var(--band-none)]/70 w-[20%] flex items-center justify-center text-[8px] text-white font-bold">
                  2 BELOW
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] pt-3 border-t border-[var(--rule)] text-[var(--ink-2)]">
                <div>
                  <span className="text-[var(--ink-3)] block uppercase">Gate:</span>
                  <span className="font-bold text-[var(--ink)]">375 HALLMARK</span>
                </div>
                <div className="text-right">
                  <span className="text-[var(--ink-3)] block uppercase">Below means:</span>
                  <span className="font-bold text-[var(--ink)]">LISTED, NOT CERTIFIED</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* DECK 2: EDITION DELTAS (Cols 8-12) */}
          <motion.div
            style={{ y: rightColY }}
            className="lg:col-span-5 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface-alt)] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-[var(--gold)]/80 transition-colors duration-250 relative group overflow-hidden will-change-transform"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[var(--gold)]">
                  <TrendingUp size={14} />
                  <span>DECK II: EDITION DELTAS</span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]">
                  FROZEN DELTAS
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl font-black text-[var(--ink)] leading-snug">
                Follow movement month over month
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Every edition carries fineness and rank movement against the prior edition — computed at house weights only, so reader reweighting never rewrites history.
              </p>
            </div>

            {/* Delta readout */}
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
                  FINENESS Δ · RANK Δ
                </span>
                <span className="text-[9px] text-white/50 block">
                  BAND CHANGE FLAGGED
                </span>
              </div>
            </div>
          </motion.div>

          {/* DECK 3: SCORER'S SANCTUARY (Cols 1-5) */}
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
                Unbribable Scorer Integrity
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Zero listing fees, zero foundation grants, zero marketing tolls. No venue can buy placement. A venue goes quiet for 60 days, goes dark, or fails pairing on re-review — it is struck from the register.
              </p>
            </div>

            {/* Cat Seal Visual */}
            <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 flex items-center gap-4 font-mono">
              <div className="relative h-14 w-14 rounded-xl border-2 border-[var(--gold)] overflow-hidden shrink-0 shadow-md">
                <Image
                  src="/images/cat-inspector-8bit.jpg"
                      alt="Scorer Cat Integrity Seal"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] text-[var(--ink-3)] uppercase block font-bold">
                  SPONSORED FEES ACCEPTED
                </span>
                <span className="text-base font-black text-[var(--ink)] block">
                  $0.00 ZERO TOLERANCE
                </span>
                <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">
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
                House weights, reader reweighting
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Asset (30%), traction (25%), transparency (20%), compliance (15%) and durability (10%) balance into one fineness figure — and your own weights serialize into a shareable URL.
              </p>
            </div>

            {/* Dancing Equalizer Bars & Formula Preview */}
            <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 font-mono">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[var(--ink-2)] font-semibold">5-CRITERION EQUILIBRIUM:</span>
                <span className="text-[var(--gold)] font-bold">30 / 25 / 20 / 15 / 10 HOUSE</span>
              </div>

              {/* Equalizer Frequency Dancing Bars - Hardware Accelerated Transform */}
              <div className="flex items-end justify-between gap-2 h-16 pt-2 pb-1 px-4 rounded-lg bg-[var(--surface-alt)] border border-[var(--rule)]">
                {[
                  { label: 'ASSET', scale: 0.85, delay: 0 },
                  { label: 'TRACT', scale: 0.65, delay: 0.2 },
                  { label: 'TRANSP', scale: 0.92, delay: 0.4 },
                  { label: 'COMPL', scale: 0.78, delay: 0.1 },
                  { label: 'DURAB', scale: 0.60, delay: 0.3 },
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
