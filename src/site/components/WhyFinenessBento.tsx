'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Lock,
  TrendingUp,
  ShieldCheck,
  Sliders,
  Check,
  AlertTriangle,
  Vault,
  Radio,
  Sparkles,
} from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

/**
 * WhyFinenessBento:
 * Autonomous 2x2 Swiss Institutional Treasury Ledger.
 * Features:
 * - Quadrant I: Continuous breathing collateral LTV safety monitor.
 * - Quadrant II: 360-degree continuous rotating radar sweep with pulsing vault blips.
 * - Quadrant III: Radiant ambient wax seal glow with automated assayer axioms.
 * - Quadrant IV: Dancing 5-bar harmonic weight equalizer in continuous wave rhythm.
 * - Zero cumbersome manual sliders; pure hypnotic looping financial visualization.
 */
export default function WhyFinenessBento() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="why-title" className="page-wrap py-16 border-b border-[var(--rule)]">
      <Reveal>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-6 mb-10">
          <div>
            <p className="eyebrow">UTILITY // INSTITUTIONAL SUITE</p>
            <h2
              id="why-title"
              className="mt-1 font-[var(--font-inter)] text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)]"
            >
              <WordText text="Built for Capital That Cannot Afford to Guess" />
            </h2>
            <p className="prose mt-2 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
              When millions in DAO treasury reserves and DeFi money market collateral are on the line, hearsay is fatal. Fineness provides automated mathematical verification.
            </p>
          </div>

          <div className="mono text-xs font-bold text-[var(--gold)] flex items-center gap-1.5">
            <Vault size={16} />
            <span>SOVEREIGN TREASURY INTELLIGENCE</span>
          </div>
        </div>

        {/* 2x2 Asymmetrical Looping Grid */}
        <div className="grid gap-6 md:grid-cols-12">
          
          {/* Quadrant I: Lending Collateral Defense (7 Cols) */}
          <div className="md:col-span-7 relative flex flex-col justify-between rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] font-mono text-xs">
                <span className="font-black uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5">
                  <Lock size={13} />
                  <span>DECK I: LENDING & CDP RISK DEFENSE</span>
                </span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  ACTIVE MONITOR
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-bold text-[var(--ink)]">
                Parameterize Collateral LTV with Zero Liquidation Gaps
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Money markets and stablecoin issuers filter out toxic unbacked derivatives by linking maximum borrow thresholds directly to Fineness Karat standings.
              </p>

              {/* Looping Visual Health Comparison */}
              <div className="mt-5 space-y-2.5 font-mono text-xs">
                {/* PAXG 24K Tier */}
                <div className="relative flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 overflow-hidden">
                  <motion.div
                    aria-hidden="true"
                    animate={reduce ? {} : { opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-emerald-500/10 pointer-events-none"
                  />
                  <div className="relative z-10 flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/20 text-emerald-700 font-bold">
                      <Check size={13} />
                    </span>
                    <div>
                      <div className="font-bold text-[var(--ink)]">PAXG // 24K LBMA ALLOCATED</div>
                      <div className="text-[10px] text-[var(--ink-3)]">100% Segregated Gold • Zurich & London</div>
                    </div>
                  </div>
                  <span className="relative z-10 rounded bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    85% MAX LTV
                  </span>
                </div>

                {/* Synthetic 0K Tier */}
                <div className="relative flex items-center justify-between p-3.5 rounded-xl border border-red-500/30 bg-red-500/5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-red-500/10 text-red-600 font-bold">
                      <AlertTriangle size={13} />
                    </span>
                    <div>
                      <div className="font-bold text-[var(--ink)]">SYNTHETIC IOU // UNALLOCATED</div>
                      <div className="text-[10px] text-[var(--ink-3)]">Commingled Corporate Debt • 0 Bar Registry</div>
                    </div>
                  </div>
                  <span className="rounded bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    0% DISQUALIFIED
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px] text-[var(--ink-3)]">
              <span>ORACLE CADENCE: REAL-TIME SYNC</span>
              <span className="text-emerald-600 font-bold">ZERO LIQUIDATION GAP</span>
            </div>
          </div>

          {/* Quadrant II: Secondary Parity & Looping Radar Sweep (5 Cols) */}
          <div className="md:col-span-5 relative flex flex-col justify-between rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] font-mono text-xs">
                <span className="font-black uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5">
                  <TrendingUp size={13} />
                  <span>DECK II: ARBITRAGE RADAR</span>
                </span>
                <span className="text-emerald-600 font-bold">PARITY 1.0000 AU</span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-bold text-[var(--ink)]">
                Detect Vault Disconnects Before Liquidity Drains
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Traders monitor the spread between spot physical gold prices and on-chain automated market maker liquidity.
              </p>

              {/* Looping 360 Radar Sweep Canvas / Graphic */}
              <div className="mt-5 relative h-36 rounded-xl border border-[var(--rule)] bg-[var(--dark)] overflow-hidden flex items-center justify-center font-mono">
                {/* Concentric Radar Rings */}
                <div className="absolute h-28 w-28 rounded-full border border-white/10" />
                <div className="absolute h-20 w-20 rounded-full border border-white/10" />
                <div className="absolute h-10 w-10 rounded-full border border-white/10" />
                <div className="absolute inset-x-0 h-[1px] bg-white/10" />
                <div className="absolute inset-y-0 w-[1px] bg-white/10" />

                {/* Looping 360-degree Sweeper Needle */}
                <motion.div
                  aria-hidden="true"
                  animate={reduce ? {} : { rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 origin-center pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(196,139,15,0.4) 0deg, transparent 60deg, transparent 360deg)',
                  }}
                />

                {/* Pulsing Radar Blips */}
                <div className="absolute top-8 left-14 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[9px] font-bold text-white/70">ZURICH</span>
                </div>
                <div className="absolute bottom-8 right-16 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-ping" />
                  <span className="text-[9px] font-bold text-white/70">LONDON</span>
                </div>
                <div className="absolute top-12 right-12 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[8px] text-white/50">NEW YORK</span>
                </div>

                <div className="absolute bottom-2 left-3 text-[9px] text-white/60">
                  SPREAD: <strong className="text-emerald-400">-$1.70 (HEALTHY)</strong>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px] text-[var(--ink-3)]">
              <span>SCANNING DEPOSITORIES</span>
              <span className="font-bold text-[var(--ink)]">100% VAULT SYNC</span>
            </div>
          </div>

          {/* Quadrant III: The Unbribable Assayer's Charter (5 Cols) */}
          <div className="md:col-span-5 relative flex flex-col justify-between rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] font-mono text-xs">
                <span className="font-black uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5">
                  <ShieldCheck size={13} />
                  <span>DECK III: EDITORIAL SANCTUARY</span>
                </span>
                <span className="text-red-600 font-bold">ZERO TOLERANCE</span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-bold text-[var(--ink)]">
                Zero Sponsored Hallmarks or Paid Placements
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Fineness accepts zero token grants, listing fees, or foundation marketing bribes. If an audited protocol conceals custodian reports, it is struck from the register immediately.
              </p>

              {/* Looping Radiant Wax Seal Box */}
              <div className="relative mt-5 rounded-xl border border-[var(--gold)]/40 bg-[var(--tint)]/50 p-5 font-mono text-xs overflow-hidden">
                {/* Radiant Ambient Auroral Glow */}
                <motion.div
                  aria-hidden="true"
                  animate={reduce ? {} : { opacity: [0.2, 0.45, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(196,139,15,0.3)_0%,transparent_60%)] pointer-events-none"
                />

                <div className="relative z-10 flex items-center gap-3">
                  <span className="text-4xl font-black text-[var(--gold)] select-none animate-pulse">✦</span>
                  <div>
                    <div className="font-bold text-[var(--ink)] text-sm flex items-center gap-1.5">
                      <span>ASSAYER&apos;S SANCTUARY</span>
                      <Sparkles size={12} className="text-[var(--gold)]" />
                    </div>
                    <div className="text-[11px] text-[var(--ink-2)] mt-0.5">
                      Deterministic math sealed with SHA-256 snapshot hashes published openly.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px] text-[var(--ink-3)]">
              <span>LISTING FEE PAID:</span>
              <span className="font-bold text-[var(--gold)]">$0.00 EVER</span>
            </div>
          </div>

          {/* Quadrant IV: Sovereign Equalizer with Dancing Harmonic Waves (7 Cols) */}
          <div className="md:col-span-7 relative flex flex-col justify-between rounded-2xl border-2 border-[var(--gold)]/60 bg-[var(--surface)] p-6 sm:p-8 shadow-md overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] font-mono text-xs">
                <span className="font-black uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5">
                  <Sliders size={13} />
                  <span>DECK IV: 5-PILLAR EQUALIZER</span>
                </span>
                <span className="text-[var(--gold)] font-bold">AUTONOMOUS BALANCE</span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-bold text-[var(--ink)]">
                Dynamic Harmonic Calibration
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                The five criteria dynamically balance liquidity, custodian proof, and legal segregation into a unified Karat fineness standing.
              </p>

              {/* Dancing Equalizer Wave Animation */}
              <div className="mt-5 rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-5 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] pb-2 border-b border-[var(--rule)]/60 mb-3">
                  <span className="text-[var(--ink-3)]">EQUALIZER FREQUENCY SPECTRUM:</span>
                  <strong className="text-[var(--gold)] font-bold">999 / 1000 [24K]</strong>
                </div>

                <div className="grid grid-cols-5 gap-2.5 items-end h-24 pt-2">
                  {[
                    { label: 'BACKING', pct: '30%', delay: 0 },
                    { label: 'VOLUME', pct: '25%', delay: 0.2 },
                    { label: 'RESERVES', pct: '20%', delay: 0.4 },
                    { label: 'CUSTODY', pct: '15%', delay: 0.1 },
                    { label: 'DURABILITY', pct: '10%', delay: 0.3 },
                  ].map((col) => (
                    <div key={col.label} className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <motion.div
                        animate={
                          reduce
                            ? {}
                            : {
                                height: ['40%', '85%', '55%', '90%', '40%'],
                              }
                        }
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: col.delay,
                        }}
                        className="w-full bg-[var(--gold)] rounded-t-sm shadow-xs"
                      />
                      <span className="text-[8px] font-bold text-[var(--ink-3)] uppercase tracking-tighter truncate w-full text-center">
                        {col.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px] text-[var(--ink-3)]">
              <span>WEIGHT FORMULA: 30 / 25 / 20 / 15 / 10</span>
              <span className="text-[var(--gold)] font-bold">STATE PRESERVED IN URL</span>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
}
