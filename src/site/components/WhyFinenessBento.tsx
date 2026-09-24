'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Sliders, ShieldCheck, TrendingUp, Lock, ArrowUpRight, Scale, AlertTriangle, Check } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

/**
 * WhyFinenessBento:
 * Asymmetrical Web3 Bento grid.
 * Zero "01/02" numbering badges; bespoke tactile widgets, collateral safety metrics, and audit seals.
 */
export default function WhyFinenessBento() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="why-title" className="page-wrap py-14 border-b border-[var(--rule)]">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-4">
          <div>
            <p className="eyebrow">UTILITY // WHO RELIES ON FINENESS</p>
            <h2
              id="why-title"
              className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            >
              <WordText text="Built for Capital That Cannot Afford to Guess" />
            </h2>
            <p className="prose mt-1 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
              When institutional treasuries and DeFi money markets accept tokenized gold, hearsay is catastrophic. Fineness delivers deterministic purity.
            </p>
          </div>

          <div className="mono text-xs font-bold text-[var(--gold)]">
            STANDARDS // INDEPENDENT ASSAY
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="mt-8 grid gap-5 md:grid-cols-12">
          
          {/* Card 1: Protocol Treasuries (Large Wide - 7 Cols) */}
          <motion.div
            className="group relative md:col-span-7 flex flex-col justify-between rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-7 shadow-xs transition-all hover:border-[var(--gold)] hover:shadow-md"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.16, 0.33, 0.3, 1] }}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <span className="mono text-[10px] font-black tracking-wider text-[var(--gold)] uppercase bg-[var(--tint)] px-2.5 py-0.5 rounded border border-[var(--gold)]/30">
                  TREASURY & MONEY MARKET RISK
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--surface-alt)] text-[var(--ink)] group-hover:bg-[var(--gold)] group-hover:text-white transition-all">
                  <Lock size={14} />
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl font-bold text-[var(--ink)]">
                Collateral Defense for Lending Protocols
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--ink-2)]">
                DeFi money markets, stablecoin minters, and DAO treasuries use Fineness Karat standings to parameterize loan-to-value (LTV) limits and liquidation thresholds.
              </p>

              {/* Visual Widget: Collateral Tier Comparison */}
              <div className="mt-5 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/20 text-emerald-700 font-bold">
                      <Check size={12} />
                    </span>
                    <div>
                      <div className="font-bold text-[var(--ink)]">≥ 750 / 1000 • 18K - 24K TIER</div>
                      <div className="text-[10px] text-[var(--ink-3)]">LBMA Allocated Gold • Third-party custody proof</div>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                    85% MAX LTV
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-red-500/10 text-red-600 font-bold">
                      <AlertTriangle size={12} />
                    </span>
                    <div>
                      <div className="font-bold text-[var(--ink)]">&lt; 375 / 1000 • UNVERIFIED</div>
                      <div className="text-[10px] text-[var(--ink-3)]">Unallocated synthetic promise • Commingled debt</div>
                    </div>
                  </div>
                  <span className="rounded bg-red-600/80 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                    0% COLLATERAL
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-3 border-t border-[var(--rule)] mono text-[10px] text-[var(--ink-3)]">
              <span>PARAMETERIZATION: AAVE / MAKER / MORPHO</span>
              <span className="text-[var(--gold)] font-bold">ZERO LIQUIDATION GAP</span>
            </div>
          </motion.div>

          {/* Card 2: Depeg Radar (5 Cols) */}
          <motion.div
            className="group relative md:col-span-5 flex flex-col justify-between rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-7 shadow-xs transition-all hover:border-[var(--gold)] hover:shadow-md"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 0.33, 0.3, 1] }}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <span className="mono text-[10px] font-black tracking-wider text-[var(--gold)] uppercase bg-[var(--tint)] px-2.5 py-0.5 rounded border border-[var(--gold)]/30">
                  ARBITRAGE & DEPEG RADAR
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--surface-alt)] text-[var(--ink)] group-hover:bg-[var(--gold)] group-hover:text-white transition-all">
                  <TrendingUp size={14} />
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl font-bold text-[var(--ink)]">
                Detect Vault Disconnects
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--ink-2)]">
                Traders isolate divergence between on-chain secondary market pricing and physical redemption confidence before liquidity dries up.
              </p>

              {/* Visual Widget: Depeg Spread Telemetry */}
              <div className="mt-5 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] p-3 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--ink-3)]">PHYSICAL PARITY INDEX</span>
                  <span className="font-bold text-emerald-600">1.0000 AU</span>
                </div>
                <div className="w-full bg-[var(--rule)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[var(--gold)] h-full w-[94%]" />
                </div>
                <div className="flex items-center justify-between text-[9px] text-[var(--ink-3)]">
                  <span>SWISS VAULT ATTESTATION</span>
                  <span className="font-semibold text-[var(--ink)]">CONFIRMED 99.8%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-3 border-t border-[var(--rule)] mono text-[10px] text-[var(--ink-3)]">
              <span>PRIMARY VENUES TRACKED</span>
              <span className="font-bold text-[var(--ink)]">10 SOVEREIGN</span>
            </div>
          </motion.div>

          {/* Card 3: Unbribable Assayer (5 Cols) */}
          <motion.div
            className="group relative md:col-span-5 flex flex-col justify-between rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-7 shadow-xs transition-all hover:border-[var(--gold)] hover:shadow-md"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 0.33, 0.3, 1] }}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <span className="mono text-[10px] font-black tracking-wider text-[var(--gold)] uppercase bg-[var(--tint)] px-2.5 py-0.5 rounded border border-[var(--gold)]/30">
                  EDITORIAL INDEPENDENCE
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--surface-alt)] text-[var(--ink)] group-hover:bg-[var(--gold)] group-hover:text-white transition-all">
                  <ShieldCheck size={14} />
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl font-bold text-[var(--ink)]">
                Zero Sponsored Hallmarks
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--ink-2)]">
                Fineness accepts zero listing fees, token grants, or sponsored placements. If an audited protocol conceals audits or commingles reserves, it is immediately struck from the register.
              </p>

              {/* Visual Seal Stamp */}
              <div className="mt-5 flex items-center gap-3 rounded-lg border border-[var(--gold)]/40 bg-[var(--tint)]/70 p-3">
                <span className="mono text-2xl font-black text-[var(--gold)]">✦</span>
                <div className="font-mono text-[10px]">
                  <div className="font-bold uppercase tracking-wider text-[var(--ink)]">ASSAYER&apos;S SANCTUARY</div>
                  <div className="text-[var(--ink-2)]">No paid ratings • No retroactive revisions</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-3 border-t border-[var(--rule)] mono text-[10px] text-[var(--ink-3)]">
              <span>STRIKE POLICY</span>
              <span className="text-red-600 font-bold">ZERO TOLERANCE</span>
            </div>
          </motion.div>

          {/* Card 4: Custom Risk Calipers (7 Cols) */}
          <motion.div
            className="group relative md:col-span-7 flex flex-col justify-between rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-7 shadow-xs transition-all hover:border-[var(--gold)] hover:shadow-md"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 0.33, 0.3, 1] }}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <span className="mono text-[10px] font-black tracking-wider text-[var(--gold)] uppercase bg-[var(--tint)] px-2.5 py-0.5 rounded border border-[var(--gold)]/30">
                  SOVEREIGN METHODOLOGY
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--surface-alt)] text-[var(--ink)] group-hover:bg-[var(--gold)] group-hover:text-white transition-all">
                  <Sliders size={14} />
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl font-bold text-[var(--ink)]">
                Reweigh and Calibrate Your Own Risk Model
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--ink-2)]">
                Disagree with our house weights? Adjust the five criteria sliders dynamically. Your personalized criteria calibration encodes directly into the URL for verifiable institutional sharing.
              </p>

              {/* Visual Caliper Widget */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[10px]">
                <div className="rounded border border-[var(--rule)] bg-[var(--surface-alt)] p-2">
                  <div className="text-[var(--ink-3)]">ASSET BACKING</div>
                  <div className="font-bold text-[var(--gold)] text-sm mt-0.5">30% WEIGHT</div>
                </div>
                <div className="rounded border border-[var(--rule)] bg-[var(--surface-alt)] p-2">
                  <div className="text-[var(--ink-3)]">VOLUME TRACTION</div>
                  <div className="font-bold text-[var(--ink)] text-sm mt-0.5">25% WEIGHT</div>
                </div>
                <div className="rounded border border-[var(--rule)] bg-[var(--surface-alt)] p-2 col-span-2 sm:col-span-1">
                  <div className="text-[var(--ink-3)]">RESERVE AUDITS</div>
                  <div className="font-bold text-[var(--ink)] text-sm mt-0.5">20% WEIGHT</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-3 border-t border-[var(--rule)] mono text-[10px] text-[var(--ink-3)]">
              <span>STATE PERSISTENCE</span>
              <span className="font-bold text-[var(--gold)]">URL-ENCODED CALIPERS</span>
            </div>
          </motion.div>

        </div>
      </Reveal>
    </section>
  );
}
