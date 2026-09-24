'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Vault,
  Scale,
  Award,
  ShieldCheck,
  CheckCircle2,
  Scan,
  Activity,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Stamp,
} from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

interface Station {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: typeof Vault;
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

const CYCLE_DURATION_MS = 4500;

/**
 * AssayWorkflow:
 * Autonomous looping Swiss Bullion Refinery Bench.
 * Features:
 * - Continuous looping station progression with smooth animated progress indicators.
 * - Continuous oscillating balance caliper and laser sweep animations.
 * - Looping telemetry pulse indicator.
 * - Zero cumbersome manual controls; smooth automated visual flow.
 */
export default function AssayWorkflow() {
  const [activeStationIdx, setActiveStationIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  // Continuous auto-cycling stage timer
  useEffect(() => {
    const interval = 50;
    const duration = CYCLE_DURATION_MS;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(timer);
        setProgress(0);
        setActiveStationIdx((prev) => (prev + 1) % REFINERY_STATIONS.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [activeStationIdx]);

  const station = REFINERY_STATIONS[activeStationIdx];
  const Icon = station.icon;

  return (
    <section aria-labelledby="workflow-title" className="page-wrap py-16 border-b border-[var(--rule)]">
      <Reveal>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-6 mb-10">
          <div>
            <p className="eyebrow">CRUCIBLE REFINERY // CONTINUOUS PIPELINE</p>
            <h2
              id="workflow-title"
              className="mt-1 font-[var(--font-inter)] text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)]"
            >
              <WordText text="How the Crucible Machine Audits" />
            </h2>
            <p className="prose mt-2 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
              An autonomous, continuous three-station pipeline stress-testing on-chain reserves from raw bytecode to an immutable 24K hallmark.
            </p>
          </div>

          {/* Looping Status Pill */}
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-emerald-600">AUTONOMOUS FORGE CYCLING</span>
          </div>
        </div>

        {/* 3-Station Looping Navigation Track */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] shadow-xs">
          {REFINERY_STATIONS.map((st, idx) => {
            const isCurrent = activeStationIdx === idx;
            const StIcon = st.icon;
            return (
              <div
                key={st.id}
                onClick={() => {
                  setActiveStationIdx(idx);
                  setProgress(0);
                }}
                className={`relative flex items-center gap-3 p-4 rounded-lg text-left transition-all cursor-pointer overflow-hidden ${
                  isCurrent
                    ? 'border-2 border-[var(--gold)] bg-[var(--surface)] shadow-md text-[var(--ink)]'
                    : 'border border-transparent text-[var(--ink-2)] hover:bg-[var(--surface)]/80 hover:text-[var(--ink)]'
                }`}
              >
                {/* Looping Progress Line for Active Station */}
                {isCurrent && (
                  <div
                    className="absolute top-0 inset-x-0 h-1 bg-[var(--gold)] transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black transition-colors ${
                    isCurrent
                      ? 'bg-[var(--gold)] text-white shadow-xs'
                      : 'border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]'
                  }`}
                >
                  <StIcon size={18} />
                </div>
                <div>
                  <span className="mono text-[10px] font-black uppercase tracking-wider text-[var(--gold)] block">
                    {st.badge}
                  </span>
                  <span className="font-[var(--font-inter)] text-sm font-bold block mt-0.5 text-[var(--ink)]">
                    {st.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Station Showcase with Looping Ambient Motion */}
        <div className="mt-8 rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-10 shadow-lg overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Column: Descriptive Dossier (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-[var(--rule)] text-[11px] font-mono text-[var(--ink-3)]">
                  <span className="font-bold uppercase tracking-wider text-[var(--gold)]">
                    {station.badge}
                  </span>
                  <span>•</span>
                  <span>{station.subtitle}</span>
                </div>

                <h3 className="mt-4 font-[var(--font-inter)] text-2xl sm:text-3xl font-black text-[var(--ink)] leading-snug">
                  {station.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--ink-2)] leading-relaxed max-w-xl">
                  {station.desc}
                </p>
              </div>

              {/* Primary Technical Evidence Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[var(--rule)] font-mono text-xs">
                {station.primaryDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="p-3.5 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)]/60"
                  >
                    <span className="text-[10px] text-[var(--ink-3)] block uppercase tracking-wider font-bold">
                      {detail.label}
                    </span>
                    <strong className="text-xs text-[var(--ink)] block mt-1 font-extrabold">
                      {detail.value}
                    </strong>
                    <span className="text-[10px] text-[var(--ink-2)] block mt-0.5">
                      {detail.note}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[var(--ink-3)]">
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <CheckCircle2 size={13} />
                  <span>DETERMINISTIC VERIFICATION</span>
                </span>
                <span>ZERO HUMAN DISCRETION</span>
              </div>
            </div>

            {/* Right Column: Physical Bullion Ingot Display with Looping Laser Scan (5 Cols) */}
            <div className="lg:col-span-5 relative w-full flex flex-col justify-between rounded-xl border-2 border-[var(--gold)]/60 bg-gradient-to-br from-[var(--surface)] via-[var(--tint)]/50 to-[var(--surface)] p-6 sm:p-7 shadow-md overflow-hidden">
              
              {/* Continuous Looping Laser Scanner on Ingot */}
              <motion.div
                aria-hidden="true"
                animate={reduce ? {} : { y: ['-10%', '340%', '-10%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80 shadow-[0_0_8px_var(--gold)] z-20"
              />

              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[var(--gold)]/30 font-mono text-xs">
                <span className="text-[var(--gold)] font-bold tracking-wider text-[10px] uppercase flex items-center gap-1.5">
                  <Award size={14} />
                  <span>{station.deliverable.tag}</span>
                </span>
                <span className="rounded bg-[var(--tint)] border border-[var(--gold)]/50 px-2 py-0.5 text-[9px] font-black text-[var(--gold)]">
                  {station.deliverable.stamp}
                </span>
              </div>

              {/* Physical Bullion Stamp Ingot Representation */}
              <div className="relative z-10 my-6 rounded-xl border border-[var(--gold)]/40 bg-[var(--surface)] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="mono text-2xl font-black text-[var(--gold)] flex items-center gap-2">
                    <span>AU 999.9</span>
                    <Sparkles size={16} className="text-[var(--gold)] animate-spin" />
                  </span>
                  <span className="mono text-[10px] font-bold text-[var(--ink-3)]">SWISS ASSAY</span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[var(--ink-3)]">ASSET CLASS:</span>
                    <span className="font-bold text-[var(--ink)]">PHYSICAL ALLOCATED GOLD</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[var(--ink-3)]">RESERVE INTEGRITY:</span>
                    <span className="font-bold text-emerald-600">100% COLLATERALIZED</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[var(--ink-3)]">CRUCIBLE GATE:</span>
                    <span className="font-bold text-[var(--gold)]">PASSED (≥ 375 / 1000)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px] text-[var(--ink-3)]">
                  <span>PUBLIC REGISTRY:</span>
                  <span className="font-bold text-[var(--ink)]">EDITION 2026-10</span>
                </div>
              </div>

              {/* Looping Step Indicator */}
              <div className="relative z-10 pt-3 border-t border-[var(--gold)]/30 flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--ink-3)] text-[10px]">
                  STEP {activeStationIdx + 1} OF {REFINERY_STATIONS.length} (AUTO-CYCLING)
                </span>
                <span className="text-xs font-bold text-[var(--gold)] flex items-center gap-1">
                  <span>CONTINUOUS ASSAY</span>
                  <ArrowRight size={13} className="animate-pulse" />
                </span>
              </div>
            </div>

          </div>
        </div>
      </Reveal>
    </section>
  );
}
