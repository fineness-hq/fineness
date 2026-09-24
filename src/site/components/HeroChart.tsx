'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, BarChart2 } from 'lucide-react';
import type { Band } from '../../scoring/fineness';
import type { Venue } from '../../types';
import { BAND_COLOR } from './Entry';
import { usd } from '../lib/format';
import AuditorCat from './AuditorCat';

interface HeroChartProps {
  venues: Venue[];
  ready: boolean;
}

type ViewMode = 'purity' | 'backing' | 'volume';

/** Compact backing labels for the mini card. */
const SHORT_BACKING: Record<string, string> = {
  'tokenized-equity': 'EQUITY',
  'inventory-index': 'INDEX',
  collectible: 'VAULT',
  synthetic: 'SYNTH',
  none: '—',
};

/**
 * Web3 Crucible Stage:
 * Features:
 * - Unboxed Grand Bureaucrat Auditor Cat on the background
 * - Overlapping Glassmorphic Crucible Leaderboard HUD floating on the left
 * - Multi-metric toggles (PURITY / BACKING / 24H VOL)
 * - Animated Karat progress bars & 375 hallmark cutoffs
 */
export default function HeroChart({ venues, ready }: HeroChartProps) {
  const [mode, setMode] = useState<ViewMode>('purity');
  const reduce = useReducedMotion();

  // Top 5 venues sorted by fineness
  const top = [...venues].sort((a, b) => b.fineness - a.fineness).slice(0, 5);

  function jump(id: string) {
    window.dispatchEvent(new CustomEvent<string>('fineness:expand', { detail: id }));
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="relative w-full max-w-[560px] select-none flex flex-col items-center justify-center">
      {/* 1. The Grand Bureaucrat Auditor Cat (Seamless on Background Canvas) */}
      <div className="relative w-full">
        <AuditorCat className="w-full" />
      </div>

      {/* 2. Floating Glassmorphic Crucible Leaderboard HUD (Overlapping Left Side) */}
      <motion.div
        className="w-full sm:w-[200px] md:w-[215px] sm:absolute sm:-left-16 md:-left-24 sm:top-8 z-20 overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--surface)]/95 p-2 shadow-xl backdrop-blur-md transition-all hover:border-[var(--dark)]"
        initial={ready && !reduce ? { opacity: 0, x: -16, y: 10 } : false}
        animate={ready || reduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 0.33, 0.3, 1.01] }}
        style={{ perspective: 800 }}
      >
        {/* Top 24K Gold Bar */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[var(--gold)]" />

        {/* Header with status and view mode pills */}
        <div className="flex items-center justify-between gap-1.5 border-b border-[var(--rule)] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--gold)]" />
            </span>
            <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]">
              TOP 5
            </span>
          </div>

          {/* Mode pills — abbreviated to fit the mini card */}
          <div className="flex items-center gap-0.5 rounded bg-[var(--surface-alt)] p-0.5 font-mono text-[9px]">
            <button
              type="button"
              title="Purity"
              onClick={() => setMode('purity')}
              className={`rounded px-1.5 py-0.5 font-semibold transition-all ${
                mode === 'purity'
                  ? 'bg-[var(--dark)] text-white shadow-xs'
                  : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
              }`}
            >
              PUR
            </button>
            <button
              type="button"
              title="Backing"
              onClick={() => setMode('backing')}
              className={`rounded px-1.5 py-0.5 font-semibold transition-all ${
                mode === 'backing'
                  ? 'bg-[var(--dark)] text-white shadow-xs'
                  : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
              }`}
            >
              BKG
            </button>
            <button
              type="button"
              title="24h volume"
              onClick={() => setMode('volume')}
              className={`rounded px-1.5 py-0.5 font-semibold transition-all ${
                mode === 'volume'
                  ? 'bg-[var(--dark)] text-white shadow-xs'
                  : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
              }`}
            >
              VOL
            </button>
          </div>
        </div>

        {/* Venue rows (top 5) */}
        <ul className="mt-2 space-y-1.5">
          {top.map((v, i) => (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => jump(v.id)}
                className="group relative flex w-full flex-col gap-1 rounded border border-transparent bg-[var(--surface-2)] p-1 sm:p-1.5 text-left transition-all hover:border-[var(--gold)] hover:bg-[var(--tint)] hover:shadow-xs"
                aria-label={`${v.name}, fineness score ${v.fineness}`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="mono flex h-4 w-4 items-center justify-center rounded bg-[var(--surface-alt)] text-[9px] font-bold text-[var(--ink-2)] group-hover:bg-[var(--dark)] group-hover:text-white">
                      0{i + 1}
                    </span>
                    <span className="max-w-[72px] truncate font-semibold text-[var(--ink)] group-hover:text-[var(--action)] text-[11px]">
                      {v.name}
                    </span>
                    <span className="mono rounded bg-[var(--surface-alt)] px-1 py-0.2 text-[8px] uppercase tracking-wider text-[var(--ink-3)] sm:hidden">
                      {v.chain}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {mode === 'purity' && (
                      <span
                        className="mono text-[11px] font-bold tabular-nums"
                        style={{ color: BAND_COLOR[v.band as Band] }}
                      >
                        {v.fineness}<span className="text-[9px] font-normal opacity-75">/1000</span>
                      </span>
                    )}
                    {mode === 'backing' && (
                      <span className="mono flex items-center gap-1 text-[10px] font-medium text-[var(--ink-2)]">
                        <ShieldCheck size={11} className="text-[var(--ok)]" />
                        {SHORT_BACKING[v.pairing.assetType] ?? v.pairing.assetType}
                      </span>
                    )}
                    {mode === 'volume' && (
                      <span className="mono text-[10px] font-medium tabular-nums text-[var(--ink)]">
                        {usd(v.metrics.dailyVolumeUsd)}
                      </span>
                    )}
                    <ArrowUpRight
                      size={11}
                      className="text-[var(--ink-3)] opacity-0 transition-all group-hover:opacity-100 group-hover:text-[var(--action)]"
                    />
                  </div>
                </div>

                {/* Animated Progress Gauge */}
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-alt)]">
                  <div
                    className="absolute inset-y-0 left-[37.5%] z-10 w-[1px] bg-[var(--ink-3)]/60"
                    title="375 Hallmark Cutoff"
                  />
                  <motion.div
                    className="h-full rounded-full transition-colors"
                    style={{
                      backgroundColor: BAND_COLOR[v.band as Band],
                    }}
                    initial={ready && !reduce ? { width: '0%' } : false}
                    animate={ready || reduce ? { width: `${(v.fineness / 1000) * 100}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: [0.16, 0.33, 0.3, 1.01] }}
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>

        {/* Footer hint */}
        <div className="mt-2 flex items-center justify-between border-t border-[var(--rule)] pt-1.5 text-[9px] text-[var(--ink-3)] font-mono">
          <span className="flex items-center gap-1">
            <BarChart2 size={10} className="text-[var(--action)]" />
            375 CUT
          </span>
          <span className="font-semibold text-[var(--gold)]">OPEN ENTRY ↓</span>
        </div>
      </motion.div>
    </div>
  );
}
