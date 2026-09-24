'use client';

import React, { useState, useEffect } from 'react';
import { Database, Cpu, Stamp, Play, Pause, Radio, Terminal, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

interface StageConfig {
  id: string;
  roman: string;
  tag: string;
  title: string;
  stamp: string;
  desc: string;
  icon: typeof Database;
  metrics: Array<{ k: string; v: string }>;
  logs: Array<{ tag: string; text: string; color: string }>;
}

const STAGES: StageConfig[] = [
  {
    id: 'ingest',
    roman: 'STAGE I',
    tag: 'ON-CHAIN TELEMETRY',
    title: 'On-Chain & Vault Ingestion',
    stamp: 'FREEZE BLOCK',
    desc: 'Public RPC nodes query live ERC-20 bytecode, oracle feeds, and custodian vault registries at a frozen monthly block timestamp.',
    icon: Database,
    metrics: [
      { k: 'SNAPSHOT HEIGHT', v: 'ETH #21,049,281' },
      { k: 'PRIMARY VAULTS', v: 'ZURICH / LONDON / NY' },
      { k: 'PROOF FORMAT', v: 'MERKLE ATTESTATION' },
    ],
    logs: [
      { tag: 'RPC_INGEST', text: 'Connecting to sovereign execution client (geth/reth)...', color: 'text-amber-500' },
      { tag: 'CONTRACT', text: 'Disassembling token bytecode: 0x45804880De22913dAfEac04871b0fe79...', color: 'text-[var(--ink-2)]' },
      { tag: 'ORACLE', text: 'Chainlink XAU/USD feed verified at $2,741.80/oz', color: 'text-emerald-600' },
      { tag: 'VAULT_API', text: 'Ingesting LBMA Bar Registry JSON from Freeport Zurich...', color: 'text-[var(--gold)]' },
      { tag: 'ATTESTATION', text: '[PASS] Bureau Veritas monthly audit certificate confirmed', color: 'text-emerald-600' },
    ],
  },
  {
    id: 'smelt',
    roman: 'STAGE II',
    tag: 'METALLURGY',
    title: '5-Pillar Metallurgical Smelt',
    stamp: 'HOUSE CALIPER',
    desc: 'The Crucible scoring engine weighs raw metrics across Asset Backing (30%), Volume (25%), Reserves (20%), Custody (15%), and Durability (10%).',
    icon: Cpu,
    metrics: [
      { k: 'HOUSE RATIO', v: '30 / 25 / 20 / 15 / 10' },
      { k: 'HALLMARK GATE', v: '375 / 1000 MINIMUM' },
      { k: 'STRESS FACTOR', v: '1.0X DETERMINISTIC' },
    ],
    logs: [
      { tag: 'CALIPER', text: 'Applying house weights: Backing 30%, Volume 25%, Reserves 20%...', color: 'text-amber-500' },
      { tag: 'STRESS_TEST', text: 'Simulating 15% secondary liquidity drain across Uniswap V3...', color: 'text-[var(--ink-2)]' },
      { tag: 'COUNTERPARTY', text: 'Evaluating custodian bankruptcy-remoteness under Swiss law...', color: 'text-[var(--gold)]' },
      { tag: 'REHYPOTHECATION', text: 'Checking unallocated debt liens: 0 liens detected', color: 'text-emerald-600' },
      { tag: 'CRUCIBLE_SCORE', text: '[CALCULATED] Millesimal fineness score: 999 / 1000 (24K AU)', color: 'text-emerald-600' },
    ],
  },
  {
    id: 'hallmark',
    roman: 'STAGE III',
    tag: 'CRYPTOGRAPHIC SEAL',
    title: 'Cryptographic Assay Hallmark',
    stamp: 'SHA-256 SEAL',
    desc: 'The official Fineness Karat Hallmark is struck. An immutable SHA-256 snapshot hash seals the edition permanently into public JSON registers.',
    icon: Stamp,
    metrics: [
      { k: 'EDITION STATUS', v: 'OCTOBER 2026 FROZEN' },
      { k: 'HASH PROTOCOL', v: 'SHA-256 MERKLE ROOT' },
      { k: 'REGISTRY ACCESS', v: 'PUBLIC RAW JSON' },
    ],
    logs: [
      { tag: 'DIE_STAMP', text: 'Engraving sovereign assay hallmark onto public ledger...', color: 'text-amber-500' },
      { tag: 'HASH_SEAL', text: 'Generating digest: sha256:d8388ed9157e3f88c...', color: 'text-[var(--gold)]' },
      { tag: 'DIFF_ENGINE', text: 'Comparing deltas vs previous edition 2026-09: 0 ranking moves', color: 'text-[var(--ink-2)]' },
      { tag: 'BROADCAST', text: 'Dispatched edition payload to CDN & IPFS gateway...', color: 'text-emerald-600' },
      { tag: 'CERTIFIED', text: '[IMMUTABLE] Edition sealed with 0 editorial exceptions', color: 'text-emerald-600' },
    ],
  },
];

const STAGE_INTERVAL_MS = 5000;

/**
 * AssayWorkflow:
 * Modeled after kentir's StepsSection.tsx.
 * Features:
 * - Interactive stage machine with auto-advancing progress bar.
 * - Live real-time telemetry streaming (packet counts, jitter, scanning pointer).
 * - Interactive simulation controls (Pause / Play, Manual Stage Select, Test Run).
 */
export default function AssayWorkflow() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoAdvance, setIsAutoAdvance] = useState(true);
  const [progress, setProgress] = useState(0);

  // Live telemetry metrics modeled after kentir
  const [packetCount, setPacketCount] = useState(1482);
  const [activeLogIdx, setActiveLogIdx] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Real-time jittering packet counter
  useEffect(() => {
    const t = setInterval(() => {
      setPacketCount((p) => p + Math.floor(Math.random() * 7) - 3);
    }, 1200);
    return () => clearInterval(t);
  }, []);

  // Endless terminal scanner line-by-line
  useEffect(() => {
    const stream = setInterval(() => {
      setActiveLogIdx((prev) => (prev + 1) % 5);
    }, 900);
    return () => clearInterval(stream);
  }, []);

  // Auto-advance loop with smooth 50ms interval
  useEffect(() => {
    if (!isAutoAdvance) return;

    const interval = 50;
    const duration = STAGE_INTERVAL_MS;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(timer);
        setProgress(0);
        setActiveStage((prev) => (prev + 1) % STAGES.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoAdvance, activeStage]);

  const currentStage = STAGES[activeStage];

  function runSimulateCheck() {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 800);
  }

  return (
    <section aria-labelledby="workflow-title" className="page-wrap py-16 border-b border-[var(--rule)]">
      {/* Header with Live Telemetry Pill */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-6">
        <div>
          <p className="eyebrow">CRUCIBLE ENGINE // TECHNICAL FORGE</p>
          <h2
            id="workflow-title"
            className="mt-1 font-[var(--font-inter)] text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)]"
          >
            How the Crucible Machine Audits
          </h2>
          <p className="prose mt-2 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
            From raw smart contract bytecode to an immutable sovereign gold hallmark: a three-station deterministic pipeline.
          </p>
        </div>

        {/* Live Engine Status Strip */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-600 font-bold">
            <Radio size={12} className="animate-pulse" />
            <span>FORGE ENGINE ACTIVE</span>
          </div>
          <span className="text-[var(--ink-3)] hidden sm:inline">•</span>
          <span className="text-[var(--ink-2)] font-mono text-[11px] tabular-nums hidden sm:inline">
            SAMPLES: <strong className="text-[var(--ink)]">{packetCount.toLocaleString()}</strong>
          </span>
        </div>
      </div>

      {/* Main Interactive Stage & Terminal Grid (Inspired by kentir StepsSection) */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
        
        {/* Left Column: Stage Selector & Navigator (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--rule)] font-mono text-xs text-[var(--ink-3)]">
            <span className="font-bold uppercase tracking-wider text-[var(--ink-2)]">ASSAY STATIONS</span>
            <button
              type="button"
              onClick={() => setIsAutoAdvance(!isAutoAdvance)}
              className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 border border-[var(--rule)] bg-[var(--surface)] text-[10px] font-bold text-[var(--ink-2)] hover:border-[var(--gold)] cursor-pointer"
            >
              {isAutoAdvance ? (
                <>
                  <Pause size={10} className="text-[var(--gold)]" />
                  <span>PAUSE CYCLE</span>
                </>
              ) : (
                <>
                  <Play size={10} className="text-emerald-600" />
                  <span>RESUME CYCLE</span>
                </>
              )}
            </button>
          </div>

          {STAGES.map((s, idx) => {
            const isActive = activeStage === idx;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveStage(idx);
                  setProgress(0);
                  setIsAutoAdvance(false);
                }}
                className={`group relative flex flex-col text-left rounded-xl border p-4 sm:p-5 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[var(--gold)] bg-[var(--surface)] shadow-md'
                    : 'border-[var(--rule)] bg-[var(--surface-alt)]/60 hover:border-[var(--rule-2)] hover:bg-[var(--surface)]'
                }`}
              >
                {/* Active progress bar top border */}
                {isActive && (
                  <div
                    className="absolute top-0 inset-x-0 h-1 bg-[var(--gold)] rounded-t-xl transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <div className="flex items-center justify-between pb-2 border-b border-[var(--rule)]/60">
                  <span className="mono text-[10px] font-black uppercase tracking-wider text-[var(--gold)]">
                    {s.roman} // {s.tag}
                  </span>
                  <span className="mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-3)]">
                    {s.stamp}
                  </span>
                </div>

                <div className="mt-3 flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      isActive
                        ? 'border-[var(--gold)] bg-[var(--gold)] text-white'
                        : 'border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)] group-hover:border-[var(--gold)]'
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <h3 className="font-[var(--font-inter)] text-base font-bold text-[var(--ink)]">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--ink-2)] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Live Terminal & Telemetry Stage (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border-2 border-[var(--rule)] bg-[var(--dark)] text-white shadow-xl overflow-hidden font-mono">
          
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[10px] font-bold text-white/60 tracking-wider">
                CRUCIBLE_RUNTIME // {currentStage.roman} ({currentStage.id.toUpperCase()})
              </span>
            </div>

            <div className="flex items-center gap-3 text-[10px]">
              <button
                type="button"
                onClick={runSimulateCheck}
                disabled={isSimulating}
                className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <RefreshCw size={10} className={isSimulating ? 'animate-spin text-[var(--gold)]' : ''} />
                <span>RE-PROVE</span>
              </button>
              <span className="text-emerald-400 font-bold">100% DETERMINISTIC</span>
            </div>
          </div>

          {/* Metrics Telemetry Strip */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-white/5 border-b border-white/10 text-[10px]">
            {currentStage.metrics.map((m) => (
              <div key={m.k} className="border-l-2 border-[var(--gold)] pl-2.5">
                <span className="block text-white/50 text-[9px] uppercase tracking-wider">{m.k}</span>
                <span className="block font-bold text-white mt-0.5">{m.v}</span>
              </div>
            ))}
          </div>

          {/* Scrolling Terminal Output Area */}
          <div className="p-4 sm:p-5 space-y-2 text-xs min-h-[220px]">
            {currentStage.logs.map((log, idx) => {
              const isPointer = activeLogIdx === idx;
              return (
                <div
                  key={log.text}
                  className={`flex items-start gap-2.5 py-1 px-2 rounded transition-colors ${
                    isPointer ? 'bg-white/10' : 'bg-transparent'
                  }`}
                >
                  <span className="text-[var(--gold)] shrink-0 font-bold select-none text-[10px]">
                    {isPointer ? '▶' : ' '}
                  </span>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white/70 shrink-0">
                    {log.tag}
                  </span>
                  <span className={`text-[11px] leading-relaxed ${log.color}`}>
                    {log.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Terminal Footer Status Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-t border-white/10 text-[10px] text-white/50">
            <span className="flex items-center gap-1.5">
              <Terminal size={11} className="text-[var(--gold)]" />
              <span>DAEMON: /bin/crucible-assay-core --frozen</span>
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={11} /> MERKLE ROOT FROZEN
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
