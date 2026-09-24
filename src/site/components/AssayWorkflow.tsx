'use client';

import React, { useState } from 'react';
import {
  Vault,
  Scale,
  Award,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Database,
  Flame,
  ArrowRight,
  Layers,
  Fingerprint,
  Link as LinkIcon,
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
    subtitle: 'Freezing public blockchain state and physical depository proofs',
    desc: 'At the monthly snapshot cut, our automated daemons sample raw smart contract bytecode, decentralized oracle feeds, and custodian vault registries simultaneously.',
    icon: Vault,
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
    icon: Award,
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
 * Bespoke Swiss Bullion Refinery Conduit.
 * Replaces the dark code terminal with an elegant, tactile, luxury metallurgical assay bench.
 */
export default function AssayWorkflow() {
  const [activeStationIdx, setActiveStationIdx] = useState(0);
  const station = REFINERY_STATIONS[activeStationIdx];
  const Icon = station.icon;

  return (
    <section aria-labelledby="workflow-title" className="page-wrap py-16 border-b border-[var(--rule)]">
      <Reveal>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-6 mb-10">
          <div>
            <p className="eyebrow">CRUCIBLE REFINERY // AUDIT PIPELINE</p>
            <h2
              id="workflow-title"
              className="mt-1 font-[var(--font-inter)] text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)]"
            >
              <WordText text="How the Crucible Machine Audits" />
            </h2>
            <p className="prose mt-2 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
              From raw contract bytecode and depository vault certificates to an immutable 24-Karat hallmark: an unhurried, deterministic assay.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--gold)] font-bold">
            <ShieldCheck size={16} />
            <span>SWISS ASSAY PROTOCOL</span>
          </div>
        </div>

        {/* 3-Station Interactive Stepper Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] shadow-xs">
          {REFINERY_STATIONS.map((st, idx) => {
            const isCurrent = activeStationIdx === idx;
            const StIcon = st.icon;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setActiveStationIdx(idx)}
                className={`flex items-center gap-3 p-4 rounded-lg text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-2 border-[var(--gold)] bg-[var(--surface)] shadow-md text-[var(--ink)]'
                    : 'border border-transparent text-[var(--ink-2)] hover:bg-[var(--surface)]/80 hover:text-[var(--ink)]'
                }`}
              >
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
              </button>
            );
          })}
        </div>

        {/* Active Station Refinery Bench Showcase */}
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
                    className="p-3 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)]/60"
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

            {/* Right Column: Physical Bullion Ingot Hallmark Presentation (5 Cols) */}
            <div className="lg:col-span-5 w-full flex flex-col justify-between rounded-xl border-2 border-[var(--gold)]/60 bg-gradient-to-br from-[var(--surface)] via-[var(--tint)]/50 to-[var(--surface)] p-6 sm:p-7 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--gold)]/30 font-mono text-xs">
                <span className="text-[var(--gold)] font-bold tracking-wider text-[10px] uppercase flex items-center gap-1.5">
                  <Award size={14} />
                  <span>{station.deliverable.tag}</span>
                </span>
                <span className="rounded bg-[var(--tint)] border border-[var(--gold)]/50 px-2 py-0.5 text-[9px] font-black text-[var(--gold)]">
                  {station.deliverable.stamp}
                </span>
              </div>

              {/* Physical Bullion Stamp Ingot Representation */}
              <div className="my-6 rounded-xl border border-[var(--gold)]/40 bg-[var(--surface)] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="mono text-2xl font-black text-[var(--gold)]">AU 999.9</span>
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

              {/* Navigation Action to Next Stage */}
              <div className="pt-3 border-t border-[var(--gold)]/30 flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--ink-3)] text-[10px]">
                  STEP {activeStationIdx + 1} OF {REFINERY_STATIONS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveStationIdx((activeStationIdx + 1) % REFINERY_STATIONS.length)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--gold)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                >
                  <span>NEXT REFINERY STAGE</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </Reveal>
    </section>
  );
}
