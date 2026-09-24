'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import { WordText } from './Stagger';

interface BandSpec {
  name: string;
  from: number;
  to: number;
  karat: string;
  purity: string;
  color: string;
  goldEquivalent: string;
  note: string;
}

const BANDS: BandSpec[] = [
  {
    name: '24 Karat (Sovereign Pure)',
    from: 999,
    to: 1000,
    karat: '24K',
    purity: '999.0 - 1000 / 1000',
    color: '#0F1419',
    goldEquivalent: 'Pure Unalloyed Bullion',
    note: 'Investment-grade LBMA allocated bullion with verifiable legal title.',
  },
  {
    name: '22 Karat (Crown Coinage)',
    from: 916,
    to: 998,
    karat: '22K',
    purity: '916.0 - 998.0 / 1000',
    color: '#3A3222',
    goldEquivalent: 'Crown Gold (Krugerrand standard)',
    note: 'High-density physical allocation with minor programmatic wrapper friction.',
  },
  {
    name: '18 Karat (Standard Alloy)',
    from: 750,
    to: 915,
    karat: '18K',
    purity: '750.0 - 915.0 / 1000',
    color: '#7A622A',
    goldEquivalent: 'Standard Fine Alloy (75% Pure)',
    note: 'Sufficient physical backing but carries secondary market spread friction.',
  },
  {
    name: '14 Karat (Commercial Grade)',
    from: 585,
    to: 749,
    karat: '14K',
    purity: '585.0 - 749.0 / 1000',
    color: '#B08830',
    goldEquivalent: 'Commercial Gold (58.5% Pure)',
    note: 'Partially allocated; elevated counterparty and custody risk.',
  },
  {
    name: '9 Karat (Hallmark Cutoff)',
    from: 375,
    to: 584,
    karat: '9K',
    purity: '375.0 - 584.0 / 1000',
    color: '#D4AF37',
    goldEquivalent: 'Legal Hallmark Floor (37.5% Pure)',
    note: 'Minimum threshold to receive an official hallmark. High surveillance.',
  },
  {
    name: 'Uncertified (Disqualified)',
    from: 0,
    to: 374,
    karat: '0K',
    purity: '0.0 - 374.0 / 1000',
    color: '#C93B2B',
    goldEquivalent: 'Sub-Standard Synthetic Claim',
    note: 'Fails assay. Denied hallmark. Extreme insolvency / depeg risk.',
  },
];

export default function ScaleTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll-driven needle progression along the Karat scale with spring dampening
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const needleX = useTransform(
    smoothProgress,
    [0.15, 0.75],
    reduce ? ['37.5%', '37.5%'] : ['2%', '96%'],
  );

  return (
    <section ref={sectionRef} aria-labelledby="scale-title" id="scale" className="page-wrap py-12">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-4">
          <div>
            <p className="eyebrow">STANDARDS // METALLURGICAL SCALE</p>
            <h2
              id="scale-title"
              className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            >
              <WordText text="The Hallmark Karat Scale" />
            </h2>
            <p className="prose mt-1 max-w-[68ch] text-sm leading-relaxed text-[var(--ink-2)]">
              Fineness is calibrated on a standard 0 to 1000 basis. The official assay cutoff is strictly 375 / 1000 (9K).
              Venues below 375 / 1000 remain uncertified and are denied institutional hallmark status.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] px-3 py-2 font-mono text-xs">
            <span className="flex h-2 w-2 rounded-full bg-[var(--gold)] animate-ping" />
            <span className="font-semibold text-[var(--ink)]">OFFICIAL CUTOFF:</span>
            <span className="font-extrabold text-[var(--gold)]">375 / 1000 (9 KARAT)</span>
          </div>
        </div>

        {/* Precision Metallurgical Caliper Ingot Bar with Scroll-Driven Needle */}
        <div className="mt-8 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
          {/* Caliper ticks header */}
          <div className="relative mb-2 flex justify-between font-mono text-[10px] font-semibold text-[var(--ink-3)]">
            <span>0 (RAW)</span>
            <span className="text-[var(--gold)] font-bold">375 / 1000 (GATE)</span>
            <span>585</span>
            <span>750</span>
            <span>916</span>
            <span>1000 (PURE)</span>
          </div>

          <div
            className="relative h-14 overflow-hidden rounded-lg border border-[var(--dark)] bg-[var(--surface-alt)] shadow-inner"
            role="img"
            aria-label="Karat scale from 0 to 1000 with hallmark gate at 375"
          >
            {/* Band Segments */}
            <div className="absolute inset-0 flex">
              {[...BANDS].reverse().map((b) => (
                <div
                  key={b.name}
                  className="group relative h-full flex flex-col items-center justify-center transition-all hover:brightness-110"
                  style={{
                    width: `${((b.to - b.from) / 1000) * 100}%`,
                    background: b.color,
                  }}
                  title={`${b.name}: ${b.note}`}
                >
                  <span className="mono text-[11px] font-extrabold uppercase tracking-wider text-white drop-shadow-xs">
                    {b.karat}
                  </span>
                  <span className="mono text-[9px] font-semibold text-white/80 tabular-nums">
                    {b.from} / 1000
                  </span>
                </div>
              ))}
            </div>

            {/* Hallmark Gate Static Brass Blade at 375 */}
            <div
              className="absolute inset-y-0 z-20 pointer-events-none"
              style={{ left: '37.5%' }}
            >
              <div className="h-full w-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8),0_0_0_1px_rgba(15,20,25,0.6)]" />
              <div className="absolute -left-12 -top-1 rounded bg-[var(--dark)] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[var(--gold)] shadow-md">
                375 GATE
              </div>
            </div>

            {/* Scroll-Driven Caliper Needle Scanner */}
            <motion.div
              aria-hidden="true"
              style={{ left: needleX }}
              className="absolute inset-y-0 z-30 pointer-events-none -translate-x-1/2"
            >
              <div className="h-full w-[2px] bg-[var(--gold)] shadow-[0_0_10px_var(--gold),0_0_0_1px_#fff]" />
              <div className="absolute -top-1 -left-7 rounded bg-[var(--dark)] px-1.5 py-0.5 font-mono text-[8px] font-black text-white shadow-lg border border-[var(--gold)]">
                SCANNER
              </div>
            </motion.div>
          </div>
        </div>

        {/* High-End Swiss Assay Standard Ledger (Must keep overflow-x-auto for acceptance test) */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
          <div className="grid grid-cols-1 divide-y divide-[var(--rule)]">
            {BANDS.map((b, idx) => (
              <motion.div
                key={b.name}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.16, 0.33, 0.3, 1] }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-4 transition-colors hover:bg-[var(--tint)]/40 gap-3"
              >
                {/* Karat Badge & Name */}
                <div className="flex items-center gap-3.5 min-w-[220px]">
                  <div
                    className="flex h-10 w-14 flex-col items-center justify-center rounded border border-black/10 shadow-xs font-mono"
                    style={{ background: b.color }}
                  >
                    <span className="text-[12px] font-black text-white leading-none">
                      {b.karat}
                    </span>
                    <span className="text-[8px] font-bold text-white/80 uppercase mt-0.5">
                      HALLMARK
                    </span>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-inter)] text-sm font-bold text-[var(--ink)]">
                      {b.name}
                    </h3>
                    <p className="mono text-xs font-semibold text-[var(--gold)]">
                      {b.purity}
                    </p>
                  </div>
                </div>

                {/* Backing Ratio & Description */}
                <div className="flex-1 md:px-4">
                  <div className="flex items-center gap-2">
                    <span className="mono text-xs font-bold text-[var(--ink)]">
                      {b.goldEquivalent}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--ink-2)] leading-relaxed">
                    {b.note}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center md:justify-end min-w-[140px]">
                  <span
                    className={`mono rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      b.from >= 750
                        ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30'
                        : b.from >= 375
                        ? 'bg-amber-500/10 text-amber-700 border border-amber-500/30'
                        : 'bg-red-500/10 text-red-600 border border-red-500/30'
                    }`}
                  >
                    {b.from >= 750 ? '★ TIER 1 HALLMARK' : b.from >= 375 ? 'SURVEILLANCE' : 'DISQUALIFIED'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
