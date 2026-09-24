'use client';

import React, { useState, useEffect } from 'react';
import {
  Database,
  Cpu,
  Stamp,
  Play,
  Pause,
  Radio,
  Terminal,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  Sliders,
  Activity,
  Layers,
  Flame,
} from 'lucide-react';

interface StageConfig {
  id: string;
  roman: string;
  tag: string;
  title: string;
  stamp: string;
  desc: string;
  icon: typeof Database;
  metrics: Array<{ k: string; v: string }>;
  elements: Array<{ symbol: string; name: string; pct: number; color: string }>;
  logs: Array<{ tag: string; text: string; color: string }>;
}

const STAGES: StageConfig[] = [
  {
    id: 'ingest',
    roman: 'STAGE I',
    tag: 'ON-CHAIN TELEMETRY',
    title: 'On-Chain & Vault Ingestion',
    stamp: 'FREEZE BLOCK',
    desc: 'Query live ERC-20 bytecode, decentralized oracle feeds, and custodian vault registries at a frozen monthly block timestamp.',
    icon: Database,
    metrics: [
      { k: 'BLOCK HEIGHT', v: 'ETH #21,049,281' },
      { k: 'PRIMARY VAULTS', v: 'ZURICH / LONDON / NY' },
      { k: 'PROOF FORMAT', v: 'MERKLE ATTESTATION' },
    ],
    elements: [
      { symbol: 'Au', name: 'Gold Content', pct: 99.99, color: 'bg-[var(--gold)]' },
      { symbol: 'Ag', name: 'Silver Trace', pct: 0.01, color: 'bg-slate-400' },
      { symbol: 'Cu', name: 'Base Metals', pct: 0.00, color: 'bg-amber-700' },
    ],
    logs: [
      { tag: 'RPC_INGEST', text: 'Connecting to sovereign execution client (geth/reth)...', color: 'text-amber-500' },
      { tag: 'BYTECODE', text: 'Disassembling token bytecode: 0x45804880De22913dAfEac04871b0fe79...', color: 'text-[var(--ink-2)]' },
      { tag: 'CHAINLINK', text: 'Chainlink XAU/USD feed verified at $2,741.80/oz', color: 'text-emerald-600' },
      { tag: 'LBMA_SYNC', text: 'Ingesting LBMA Bar Registry JSON from Freeport Zurich...', color: 'text-[var(--gold)]' },
      { tag: 'CERTIFICATE', text: '[PASS] Bureau Veritas monthly audit certificate confirmed', color: 'text-emerald-600' },
    ],
  },
  {
    id: 'smelt',
    roman: 'STAGE II',
    tag: 'METALLURGY',
    title: '5-Pillar Metallurgical Smelt',
    stamp: 'HOUSE CALIPER',
    desc: 'The Crucible scoring engine balances Asset Backing (30%), Volume (25%), Reserves (20%), Custody (15%), and Durability (10%).',
    icon: Cpu,
    metrics: [
      { k: 'HOUSE RATIO', v: '30 / 25 / 20 / 15 / 10' },
      { k: 'HALLMARK GATE', v: '375 / 1000 MINIMUM' },
      { k: 'STRESS FACTOR', v: '1.0X DETERMINISTIC' },
    ],
    elements: [
      { symbol: 'Au', name: 'Gold Content', pct: 99.95, color: 'bg-[var(--gold)]' },
      { symbol: 'Ag', name: 'Silver Trace', pct: 0.04, color: 'bg-slate-400' },
      { symbol: 'Cu', name: 'Base Metals', pct: 0.01, color: 'bg-amber-700' },
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
    desc: 'The official Fineness Karat Hallmark is struck. An immutable SHA-256 snapshot hash seals the edition permanently into public JSON.',
    icon: Stamp,
    metrics: [
      { k: 'EDITION STATUS', v: 'OCTOBER 2026 FROZEN' },
      { k: 'HASH PROTOCOL', v: 'SHA-256 MERKLE ROOT' },
      { k: 'REGISTRY ACCESS', v: 'PUBLIC RAW JSON' },
    ],
    elements: [
      { symbol: 'Au', name: 'Gold Content', pct: 100.0, color: 'bg-[var(--gold)]' },
      { symbol: 'Ag', name: 'Silver Trace', pct: 0.00, color: 'bg-slate-400' },
      { symbol: 'Cu', name: 'Base Metals', pct: 0.00, color: 'bg-amber-700' },
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

const STAGE_INTERVAL_MS = 5500;

/**
 * AssayWorkflow:
 * Elevated into an interactive Crucible Smelter & Spectrometry Console.
 * Features:
 * - Dynamic stage switching with auto-cycling progress.
 * - Live Spectrometer elemental graph (Au / Ag / Cu).
 * - Real-time terminal log scanning pointer.
 * - Interactive Stress Factor Slider (simulates real-time score adjustment).
 */
export default function AssayWorkflow() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoAdvance, setIsAutoAdvance] = useState(true);
  const [progress, setProgress] = useState(0);

  // Live telemetry metrics
  const [packetCount, setPacketCount] = useState(1482);
  const [activeLogIdx, setActiveLogIdx] = useState(0);
  const [stressDrawdown, setStressDrawdown] = useState(15); // Simulated liquidity drain %

  // Telemetry jitter
  useEffect(() => {
    const t = setInterval(() => {
      setPacketCount((p) => p + Math.floor(Math.random() * 7) - 3);
    }, 1200);
    return () => clearInterval(t);
  }, []);

  // Scanning pointer
  useEffect(() => {
    const stream = setInterval(() => {
      setActiveLogIdx((prev) => (prev + 1) % 5);
    }, 900);
    return () => clearInterval(stream);
  }, []);

  // Stage timer
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

  // Calculated dynamic fineness score under stress
  const simulatedScore = Math.max(850, 999 - Math.round(stressDrawdown * 1.8));

  return (
    <section aria-labelledby="workflow-title" className="page-wrap py-16 border-b border-[var(--rule)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-6">
        <div>
          <p className="eyebrow">CRUCIBLE ENGINE // TECHNICAL PIPELINE</p>
          <h2
            id="workflow-title"
            className="mt-1 font-[var(--font-inter)] text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)]"
          >
            How the Crucible Machine Audits
          </h2>
          <p className="prose mt-2 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
            A three-station deterministic pipeline stress-testing on-chain reserves from raw bytecode to an immutable sovereign gold hallmark.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-600 font-bold">
            <Radio size={12} className="animate-pulse" />
            <span>SPECTROMETER ACTIVE</span>
          </div>
          <span className="text-[var(--ink-3)] hidden sm:inline">•</span>
          <span className="text-[var(--ink-2)] font-mono text-[11px] tabular-nums hidden sm:inline">
            SAMPLES: <strong className="text-[var(--ink)]">{packetCount.toLocaleString()}</strong>
          </span>
        </div>
      </div>

      {/* Main Interactive Smelter Console Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
        
        {/* Left Column: Stage Navigator (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--rule)] font-mono text-xs text-[var(--ink-3)]">
            <span className="font-bold uppercase tracking-wider text-[var(--ink-2)]">FORGE STATIONS</span>
            <button
              type="button"
              onClick={() => setIsAutoAdvance(!isAutoAdvance)}
              className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 border border-[var(--rule)] bg-[var(--surface)] text-[10px] font-bold text-[var(--ink-2)] hover:border-[var(--gold)] cursor-pointer"
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

        {/* Right Column: Smelter Spectrometry & Live Console (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border-2 border-[var(--rule)] bg-[var(--dark)] text-white shadow-xl overflow-hidden font-mono">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[10px] font-bold text-white/60 tracking-wider">
                SPECTROMETER_RUNTIME // {currentStage.roman}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 size={11} /> 100% DETERMINISTIC
              </span>
            </div>
          </div>

          {/* Elemental Absorption Spectrometry Graph (Interactive SVG Bar) */}
          <div className="p-4 bg-black/30 border-b border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-[10px] text-white/60">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[var(--gold)]">
                <Activity size={12} /> ELEMENTAL ABSORPTION SPECTRUM
              </span>
              <span className="font-bold text-white">999.9 FINE GOLD</span>
            </div>

            <div className="space-y-1.5">
              {currentStage.elements.map((el) => (
                <div key={el.symbol} className="space-y-0.5">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-white/80">{el.name} ({el.symbol})</span>
                    <span className="font-bold text-white tabular-nums">{el.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${el.color} transition-all duration-300`}
                      style={{ width: `${el.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Stress Test Drawdown Slider */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px]">
            <div className="space-y-0.5">
              <span className="text-white/60 block text-[9px] uppercase tracking-wider">
                SIMULATE SECONDARY LIQUIDITY DRAIN
              </span>
              <span className="font-bold text-white">
                STRESS TEST: <strong className="text-[var(--gold)]">{stressDrawdown}% DRAIN</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-56">
              <input
                type="range"
                min="0"
                max="50"
                value={stressDrawdown}
                onChange={(e) => setStressDrawdown(Number(e.target.value))}
                className="w-full accent-[var(--gold)] cursor-pointer"
              />
              <span className="text-[10px] font-bold text-emerald-400 tabular-nums shrink-0">
                {simulatedScore} / 1000
              </span>
            </div>
          </div>

          {/* Scrolling Terminal Output Area */}
          <div className="p-4 sm:p-5 space-y-1.5 text-xs min-h-[190px]">
            {currentStage.logs.map((log, idx) => {
              const isPointer = activeLogIdx === idx;
              return (
                <div
                  key={log.text}
                  className={`flex items-start gap-2 py-1 px-2 rounded transition-colors ${
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

          {/* Footer Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-t border-white/10 text-[10px] text-white/50">
            <span className="flex items-center gap-1.5">
              <Terminal size={11} className="text-[var(--gold)]" />
              <span>DAEMON: /bin/crucible-assay-spectrometer</span>
            </span>
            <span className="text-emerald-400 font-bold">
              SHA-256 SEAL VALIDATED
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
