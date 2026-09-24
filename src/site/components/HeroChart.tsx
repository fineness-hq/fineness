'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, BarChart2, Sparkles, TableProperties } from 'lucide-react';
import type { Band } from '../../scoring/fineness';
import type { Venue } from '../../types';
import { BAND_COLOR } from './Entry';
import { usd } from '../lib/format';
import CrucibleBull from './CrucibleBull';

interface HeroChartProps {
  venues: Venue[];
  ready: boolean;
}

type ViewMode = 'purity' | 'backing' | 'volume';
type MainTab = 'guardian' | 'table';

/**
 * Web3 Crucible Board:
 * Features:
 * - 3D Crucible Bull Mascot Guardian with levitation & interactive cursor tilt
 * - Realtime top venue podium and multi-metric audit leaderboard table
 * - Instant smooth-scroll anchor jumps to register entries
 */
export default function HeroChart({ venues, ready }: HeroChartProps) {
  const [tab, setTab] = useState<MainTab>('guardian');
  const [mode, setMode] = useState<ViewMode>('purity');
  const reduce = useReducedMotion();

  // Top 5 venues sorted by fineness
  const top = [...venues].sort((a, b) => b.fineness - a.fineness).slice(0, 5);
  const top3 = top.slice(0, 3);

  function jump(id: string) {
    window.dispatchEvent(new CustomEvent<string>('fineness:expand', { detail: id }));
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div
      className="tera-board relative overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--surface)]/95 p-4 sm:p-5 shadow-xl backdrop-blur-md transition-all hover:border-[var(--dark)]"
      role="region"
      aria-label="Crucible mascot guardian and top tokenized asset venues leaderboard"
    >
      {/* Top indicator bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-[var(--gold)]" />

      {/* Header with status and view toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[var(--rule)] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
          </span>
          <span className="mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
            CRUCIBLE // {tab === 'guardian' ? 'GUARDIAN 3D' : 'LEADERBOARD'}
          </span>
        </div>

        {/* Tab switcher: Mascot vs Table */}
        <div className="flex items-center gap-1 rounded bg-[var(--surface-alt)] p-0.5 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setTab('guardian')}
            className={`flex items-center gap-1 rounded px-2.5 py-1 font-semibold transition-all ${
              tab === 'guardian'
                ? 'bg-[var(--dark)] text-white shadow-xs'
                : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
            }`}
          >
            <Sparkles size={11} className={tab === 'guardian' ? 'text-[var(--gold)]' : ''} />
            GUARDIAN
          </button>
          <button
            type="button"
            onClick={() => setTab('table')}
            className={`flex items-center gap-1 rounded px-2.5 py-1 font-semibold transition-all ${
              tab === 'table'
                ? 'bg-[var(--dark)] text-white shadow-xs'
                : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
            }`}
          >
            <TableProperties size={11} />
            TOP 5
          </button>
        </div>
      </div>

      {/* Tab Content: 3D Mascot Guardian */}
      {tab === 'guardian' && (
        <div className="mt-3 flex flex-col gap-3">
          <CrucibleBull />

          {/* Quick Podium Ticker */}
          <div className="rounded border border-[var(--rule)] bg-[var(--surface-2)] p-2.5">
            <div className="mb-1.5 flex items-center justify-between text-[10px] font-mono text-[var(--ink-3)]">
              <span className="font-semibold uppercase tracking-wider text-[var(--ink)]">
                TOP PURITY ARBITRATION
              </span>
              <button
                type="button"
                onClick={() => setTab('table')}
                className="text-[var(--gold)] hover:underline"
              >
                EXPAND TABLE (5) →
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {top3.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => jump(v.id)}
                  className="group flex flex-col rounded border border-[var(--rule-soft)] bg-[var(--surface)] p-2 text-left transition-all hover:border-[var(--gold)] hover:bg-[var(--tint)]"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="mono font-bold text-[var(--ink-3)]">0{i + 1}</span>
                    <span
                      className="mono font-bold"
                      style={{ color: BAND_COLOR[v.band as Band] }}
                    >
                      {v.fineness}‰
                    </span>
                  </div>
                  <span className="mt-0.5 truncate text-xs font-semibold text-[var(--ink)] group-hover:text-[var(--action)]">
                    {v.name}
                  </span>
                  <span className="mono text-[9px] uppercase tracking-wider text-[var(--ink-3)]">
                    {v.band}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Detailed Table View */}
      {tab === 'table' && (
        <div className="mt-3">
          {/* Subheader with mode selector pills */}
          <div className="flex items-center justify-between border-b border-[var(--rule)] pb-2 text-[10px]">
            <span className="mono font-semibold text-[var(--ink-3)]">METRIC FILTER:</span>
            <div className="flex items-center gap-1 rounded bg-[var(--surface-alt)] p-0.5 font-mono">
              <button
                type="button"
                onClick={() => setMode('purity')}
                className={`rounded px-2 py-0.5 font-medium transition-all ${
                  mode === 'purity'
                    ? 'bg-[var(--dark)] text-white shadow-xs'
                    : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                }`}
              >
                PURITY
              </button>
              <button
                type="button"
                onClick={() => setMode('backing')}
                className={`rounded px-2 py-0.5 font-medium transition-all ${
                  mode === 'backing'
                    ? 'bg-[var(--dark)] text-white shadow-xs'
                    : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                }`}
              >
                BACKING
              </button>
              <button
                type="button"
                onClick={() => setMode('volume')}
                className={`rounded px-2 py-0.5 font-medium transition-all ${
                  mode === 'volume'
                    ? 'bg-[var(--dark)] text-white shadow-xs'
                    : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                }`}
              >
                24H VOL
              </button>
            </div>
          </div>

      {/* Leaderboard list */}
      <ul className="mt-4 space-y-2.5">
        {top.map((v, i) => (
          <li key={v.id}>
            <button
              type="button"
              onClick={() => jump(v.id)}
              className="group relative flex w-full flex-col gap-1.5 rounded border border-transparent bg-[var(--surface-2)] p-2.5 text-left transition-all hover:border-[var(--gold)] hover:bg-[var(--tint)] hover:shadow-xs"
              aria-label={`${v.name}, fineness score ${v.fineness}, view audit entry`}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="mono flex h-5 w-5 items-center justify-center rounded bg-[var(--surface-alt)] text-[11px] font-semibold text-[var(--ink-2)] group-hover:bg-[var(--dark)] group-hover:text-white">
                    0{i + 1}
                  </span>
                  <span className="font-semibold text-[var(--ink)] group-hover:text-[var(--action)]">
                    {v.name}
                  </span>
                  <span className="mono rounded bg-[var(--surface-alt)] px-1.5 py-0.2 text-[9px] uppercase tracking-wider text-[var(--ink-3)]">
                    {v.chain}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {mode === 'purity' && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="mono text-xs font-bold tabular-nums"
                        style={{ color: BAND_COLOR[v.band as Band] }}
                      >
                        {v.fineness}‰
                      </span>
                      <span className="mono rounded border border-[var(--rule)] bg-[var(--surface)] px-1 py-0.2 text-[9px] uppercase font-semibold text-[var(--ink-2)]">
                        {v.band}
                      </span>
                    </div>
                  )}

                  {mode === 'backing' && (
                    <span className="mono flex items-center gap-1 text-[11px] font-medium text-[var(--ink-2)]">
                      <ShieldCheck size={12} className="text-[var(--ok)]" />
                      {v.pairing.assetType}
                    </span>
                  )}

                  {mode === 'volume' && (
                    <span className="mono text-[11px] font-medium tabular-nums text-[var(--ink)]">
                      {usd(v.metrics.dailyVolumeUsd)}
                    </span>
                  )}

                  <ArrowUpRight
                    size={13}
                    className="text-[var(--ink-3)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[var(--action)]"
                  />
                </div>
              </div>

              {/* Animated Progress Gauge */}
              <div className="relative mt-1 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-alt)]">
                {/* 375 Hallmark Notch */}
                <div
                  className="absolute inset-y-0 left-[37.5%] z-10 w-[1px] bg-[var(--ink-3)]/60"
                  title="375 Hallmark Threshold"
                />

                <motion.div
                  className="h-full rounded-full transition-colors"
                  style={{
                    backgroundColor: BAND_COLOR[v.band as Band],
                  }}
                  initial={reduce ? false : { width: '0%' }}
                  animate={ready || reduce ? { width: `${(v.fineness / 1000) * 100}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.16, 0.33, 0.3, 1.01] }}
                />
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Footer hint */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--rule)] pt-3 text-[10px] text-[var(--ink-3)]">
        <span className="mono flex items-center gap-1 font-medium">
          <BarChart2 size={11} className="text-[var(--action)]" />
          HALLMARK CUT: 375‰
        </span>
        <span className="mono font-medium tracking-wide">CLICK ROW TO EXPAND AUDIT ↓</span>
      </div>
        </div>
      )}
    </div>
  );
}
