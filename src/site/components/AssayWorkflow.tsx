'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import {
  Vault,
  Scale,
  Award,
  ShieldCheck,
  CheckCircle2,
  Scan,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Stamp,
  Radio,
} from 'lucide-react';

interface Station {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: typeof Database;
  primaryDetails: Array<{ label: string; value: string; note: string }>;
  deliverable: { title: string; tag: string; stamp: string };
}

const REFINERY_STATIONS: Station[] = [
  {
    id: 'ingest',
    badge: 'STAGE I: INGESTION',
    title: 'The Vault & Chain Ingestion',
    subtitle: 'Autonomous monthly depository proof sampling',
    desc: 'At the monthly snapshot cut, automated daemons sample live smart contract bytecode, decentralized oracle feeds, and custodian vault registries simultaneously.',
    icon: Database,
    primaryDetails: [
      { label: 'BLOCK TIMESTAMP', value: 'ETH #21,049,281', note: 'Frozen snapshot cut' },
      { label: 'VAULT AUDIT LOCATIONS', value: 'Zurich, London, New York', note: 'Segregated depositories' },
      { label: 'CHAINLINK ORACLES', value: 'XAU / USD Feed Active', note: 'Spot price convergence' },
      { label: 'CUSTODIAN ATTESTATIONS', value: 'Inspectorate & Bureau Veritas', note: 'Monthly bar-by-bar lists' },
    ],
    deliverable: {
      title: 'RAW TELEMETRY DOSSIER',
      tag: 'IMMUTABLE PROOFS',
      stamp: 'INGESTED 100%',
    },
  },
  {
    id: 'smelt',
    badge: 'STAGE II: SMELTING',
    title: 'The 5-Pillar Metallurgical Crucible',
    subtitle: 'Balancing physical backing against structural counterparty opacity',
    desc: 'Raw parameters pass through the Crucible engine. Five mathematical criteria weigh the token across tangible reserves, market volume, reserve disclosure, custody, and contract durability.',
    icon: Scale,
    primaryDetails: [
      { label: 'ASSET BACKING (30%)', value: '1:1 Physical Allocated', note: 'Gold bars legally titled to holders' },
      { label: 'VOLUME TRACTION (25%)', value: '$84.2M 30-Day Velocity', note: 'Secondary market liquidity health' },
      { label: 'RESERVE TRANSPARENCY (20%)', value: 'Public Serial Registry', note: 'Bar-by-bar inventory search' },
      { label: 'CUSTODY COMPLIANCE (15%)', value: 'Bankruptcy-Remote Trust', note: 'Segregated from issuer balance sheet' },
    ],
    deliverable: {
      title: '5-PILLAR CALIPER BALANCED',
      tag: 'DETERMINISTIC MATH',
      stamp: 'SCORE: 999 / 1000',
    },
  },
  {
    id: 'hallmark',
    badge: 'STAGE III: HALLMARK',
    title: 'The Sovereign Karat Hallmark',
    subtitle: 'Striking the permanent seal of purity into open machine-readable JSON',
    desc: 'The official Fineness hallmark (0 to 1000) is engraved onto the public register. An immutable SHA-256 hash seals the entire edition dataset into public IPFS and web endpoints.',
    icon: Stamp,
    primaryDetails: [
      { label: 'KARAT PURITY GRADE', value: '24 Karat (999.9 Fine)', note: 'Surpasses 750 / 1000 threshold' },
      { label: 'HALLMARK GATE', value: 'Passed 375 / 1000 Cutoff', note: 'Certified institutional asset' },
      { label: 'SNAPSHOT DIGEST', value: 'sha256:d8388ed9157e...', note: 'Cryptographically sealed' },
      { label: 'MACHINE ACCESS', value: '/editions/2026-10.json', note: 'Free public developer endpoint' },
    ],
    deliverable: {
      title: 'SOVEREIGN ASSAY HALLMARK',
      tag: 'CERTIFIED PURE',
      stamp: 'STAMP STRUCK ★',
    },
  },
];

/**
 * AssayWorkflow:
 * Scroll-driven pinned Swiss Bullion Refinery Forge.
 * Features:
 * - 220svh pinned scroll container.
 * - Sticky viewport where scroll position directly scrubs through the 3 refinery stages.
 * - Live golden conduit progress bar tracking scroll progress.
 * - Seamless stage transitions driven by scrolling down the page.
 */
export default function AssayWorkflow() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const reduce = useReducedMotion();

  // Scroll-driven stage progression
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

      // Derive stage from scroll progress:
      // 0.0 - 0.33 -> Stage 0
      // 0.33 - 0.66 -> Stage 1
      // 0.66 - 1.0  -> Stage 2
      let s = 0;
      if (p >= 0.66) {
        s = 2;
      } else if (p >= 0.33) {
        s = 1;
      }
      setActiveStage(s);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const station = REFINERY_STATIONS[activeStage];
  const Icon = station.icon;

  function scrollToStage(idx: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const stageHeight = stageRef.current ? stageRef.current.offsetHeight : window.innerHeight;
    const totalScrollable = containerRef.current.offsetHeight - stageHeight;
    const targetScroll = window.scrollY + rect.top + (idx / 2) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  return (
    <section
      ref={containerRef}
      id="refinery-pipeline"
      aria-labelledby="workflow-title"
      className="relative w-full border-b border-[var(--rule)] bg-[var(--surface-alt)]"
      style={{ height: '220svh', minHeight: '1600px' }}
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
              <p className="eyebrow">CRUCIBLE REFINERY // SCROLL-DRIVEN PIPELINE</p>
              <h2
                id="workflow-title"
                className="mt-1 font-[var(--font-inter)] text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[var(--ink)]"
              >
                How the Crucible Machine Audits
              </h2>
              <p className="prose mt-1 max-w-[66ch] text-xs sm:text-sm leading-relaxed text-[var(--ink-2)]">
                Scroll down to advance through the three-station metallurgical refinery: from raw contract telemetry to permanent 24K hallmark.
              </p>
            </div>

            {/* Scroll-Linked Telemetry Badge */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--tint)] px-3 py-1 text-[var(--gold)] font-bold shadow-2xs">
                <Radio size={12} className="animate-pulse" />
                <span>FORGE SCROLL: {scrollPct}%</span>
              </div>
            </div>
          </div>

          {/* 3-Station Stepper Navigation with Scroll-Driven Progress Track */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
            {/* Liquid Gold Scroll Progress Bar under the tabs */}
            <div
              className="absolute bottom-0 left-0 h-1 bg-[var(--gold)] rounded-b-xl transition-all duration-100 ease-out"
              style={{ width: `${scrollPct}%` }}
            />

            {REFINERY_STATIONS.map((st, idx) => {
              const isCurrent = activeStage === idx;
              const StIcon = st.icon;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => scrollToStage(idx)}
                  className={`flex items-center gap-3 p-3.5 rounded-lg text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-2 border-[var(--gold)] bg-[var(--tint)]/60 shadow-xs text-[var(--ink)]'
                      : 'border border-transparent text-[var(--ink-2)] hover:bg-[var(--surface-alt)] hover:text-[var(--ink)]'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black transition-colors ${
                      isCurrent
                        ? 'bg-[var(--gold)] text-white shadow-xs'
                        : 'border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]'
                    }`}
                  >
                    <StIcon size={16} />
                  </div>
                  <div>
                    <span className="mono text-[9px] font-black uppercase tracking-wider text-[var(--gold)] block">
                      {st.badge}
                    </span>
                    <span className="font-[var(--font-inter)] text-xs sm:text-sm font-bold block mt-0.5 text-[var(--ink)]">
                      {st.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Station Display Card */}
          <div className="mt-6 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8 shadow-xl overflow-hidden transition-all duration-300">
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              
              {/* Left Column: Descriptive Dossier (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--rule)] text-[10px] sm:text-[11px] font-mono text-[var(--ink-3)]">
                    <span className="font-bold uppercase tracking-wider text-[var(--gold)]">
                      {station.badge}
                    </span>
                    <span>•</span>
                    <span>{station.subtitle}</span>
                  </div>

                  <h3 className="mt-3 font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)] leading-snug">
                    {station.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[var(--ink-2)] leading-relaxed max-w-xl">
                    {station.desc}
                  </p>
                </div>

                {/* Technical Evidence Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-[var(--rule)] font-mono text-xs">
                  {station.primaryDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="p-3 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)]/60"
                    >
                      <span className="text-[9px] text-[var(--ink-3)] block uppercase tracking-wider font-bold">
                        {detail.label}
                      </span>
                      <strong className="text-xs text-[var(--ink)] block mt-0.5 font-extrabold">
                        {detail.value}
                      </strong>
                      <span className="text-[9px] text-[var(--ink-2)] block mt-0.5">
                        {detail.note}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono text-[var(--ink-3)]">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                    <CheckCircle2 size={12} />
                    <span>DETERMINISTIC VERIFICATION</span>
                  </span>
                  <span className="text-[10px]">SCROLL TO ADVANCE STAGE</span>
                </div>
              </div>

              {/* Right Column: Physical Bullion Ingot Presentation (5 Cols) */}
              <div className="lg:col-span-5 relative w-full flex flex-col justify-between rounded-xl border-2 border-[var(--gold)]/60 bg-gradient-to-br from-[var(--surface)] via-[var(--tint)]/50 to-[var(--surface)] p-5 sm:p-6 shadow-md overflow-hidden">
                
                {/* Continuous Laser Scanning Line */}
                <motion.div
                  aria-hidden="true"
                  animate={reduce ? {} : { y: ['-10%', '340%', '-10%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80 shadow-[0_0_8px_var(--gold)] z-20"
                />

                <div className="relative z-10 flex items-center justify-between pb-2 border-b border-[var(--gold)]/30 font-mono text-xs">
                  <span className="text-[var(--gold)] font-bold tracking-wider text-[10px] uppercase flex items-center gap-1.5">
                    <Award size={13} />
                    <span>{station.deliverable.tag}</span>
                  </span>
                  <span className="rounded bg-[var(--tint)] border border-[var(--gold)]/50 px-2 py-0.5 text-[9px] font-black text-[var(--gold)]">
                    {station.deliverable.stamp}
                  </span>
                </div>

                {/* Bullion Ingot Visual */}
                <div className="relative z-10 my-4 rounded-xl border border-[var(--gold)]/40 bg-[var(--surface)] p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="mono text-xl sm:text-2xl font-black text-[var(--gold)] flex items-center gap-2">
                      <span>AU 999.9</span>
                      <Sparkles size={14} className="text-[var(--gold)] animate-spin" />
                    </span>
                    <span className="mono text-[9px] font-bold text-[var(--ink-3)]">SWISS ASSAY</span>
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[var(--ink-3)]">ASSET CLASS:</span>
                      <span className="font-bold text-[var(--ink)]">ALLOCATED GOLD</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[var(--ink-3)]">RESERVE AUDIT:</span>
                      <span className="font-bold text-emerald-600">100% COLLATERALIZED</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[var(--ink-3)]">CRUCIBLE GATE:</span>
                      <span className="font-bold text-[var(--gold)]">PASSED (≥ 375 / 1000)</span>
                    </div>
                  </div>
                </div>

                {/* Looping Step Indicator */}
                <div className="relative z-10 pt-2 border-t border-[var(--gold)]/30 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[var(--ink-3)]">
                    STAGE {activeStage + 1} OF 3
                  </span>
                  <span className="font-bold text-[var(--gold)] flex items-center gap-1">
                    <span>SCROLL DOWN</span>
                    <ArrowRight size={11} className="animate-pulse" />
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
