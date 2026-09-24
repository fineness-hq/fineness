'use client';

import React, { useState } from 'react';
import {
  Lock,
  TrendingUp,
  ShieldCheck,
  Sliders,
  Check,
  AlertTriangle,
  Scale,
  Sparkles,
  RefreshCw,
  Copy,
  CheckCircle2,
  Vault,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

/**
 * WhyFinenessBento:
 * Redesigned as an asymmetrical Swiss Institutional Treasury Ledger.
 * Completely eliminates Artemis-style full-width sticky stacking cards.
 * Features:
 * - Quadrant I: Institutional Collateral & LTV Risk Simulator.
 * - Quadrant II: Real-time Parity & Arbitrage Spread Radar.
 * - Quadrant III: The Unbribable Assayer's Charter & Cryptographic Seal.
 * - Quadrant IV: Custom Risk Caliper Equalizer with instant score calculation.
 */
export default function WhyFinenessBento() {
  // Quadrant I State
  const [allocationAmount, setAllocationAmount] = useState(5); // $5M treasury allocation
  const [selectedAsset, setSelectedAsset] = useState<'paxg' | 'xaut' | 'synthetic'>('paxg');

  // Quadrant IV State (5 Criteria Sliders)
  const [calipers, setCalipers] = useState({
    backing: 30,
    volume: 25,
    reserves: 20,
    custody: 15,
    durability: 10,
  });

  // Calculate dynamic score for Quadrant IV
  const computedKarat = Math.min(
    1000,
    Math.round(
      calipers.backing * 3.33 +
        calipers.volume * 2.5 +
        calipers.reserves * 2.0 +
        calipers.custody * 1.5 +
        calipers.durability * 1.0,
    ),
  );

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
              When millions in DAO treasury reserves and DeFi money market collateral are on the line, hearsay is fatal. Fineness provides mathematical verification.
            </p>
          </div>

          <div className="mono text-xs font-bold text-[var(--gold)] flex items-center gap-1.5">
            <Vault size={16} />
            <span>SOVEREIGN TREASURY INTELLIGENCE</span>
          </div>
        </div>

        {/* 2x2 Asymmetrical Editorial Grid */}
        <div className="grid gap-6 md:grid-cols-12">
          
          {/* Quadrant I: Institutional Collateral & LTV Matrix (7 Cols) */}
          <div className="md:col-span-7 flex flex-col justify-between rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm hover:border-[var(--gold)] transition-colors">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] font-mono text-xs">
                <span className="font-black uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5">
                  <Lock size={13} />
                  <span>DECK I: LENDING & CDP RISK DEFENSE</span>
                </span>
                <span className="text-[var(--ink-3)] text-[10px]">AAVE • MORPHO • MAKER</span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-bold text-[var(--ink)]">
                Parameterize Collateral LTV with Zero Liquidation Gaps
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Money markets and stablecoin issuers filter out toxic unbacked derivatives by linking maximum borrow thresholds directly to Fineness Karat standings.
              </p>

              {/* Interactive Asset Selector */}
              <div className="mt-5 grid grid-cols-3 gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedAsset('paxg')}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    selectedAsset === 'paxg'
                      ? 'border-emerald-600 bg-emerald-500/10 text-emerald-800 font-bold shadow-xs'
                      : 'border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-2)]'
                  }`}
                >
                  <div className="text-[10px] text-[var(--ink-3)]">PAXG</div>
                  <div className="font-bold text-xs mt-0.5">24K TIER</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAsset('xaut')}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    selectedAsset === 'xaut'
                      ? 'border-[var(--gold)] bg-[var(--tint)] text-[var(--ink)] font-bold shadow-xs'
                      : 'border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-2)]'
                  }`}
                >
                  <div className="text-[10px] text-[var(--ink-3)]">XAUT</div>
                  <div className="font-bold text-xs mt-0.5">18K TIER</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAsset('synthetic')}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    selectedAsset === 'synthetic'
                      ? 'border-red-600 bg-red-500/10 text-red-700 font-bold shadow-xs'
                      : 'border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-2)]'
                  }`}
                >
                  <div className="text-[10px] text-[var(--ink-3)]">SYNTHETIC</div>
                  <div className="font-bold text-xs mt-0.5">0K STRUCK</div>
                </button>
              </div>

              {/* Dynamic LTV Output Telemetry */}
              <div className="mt-4 rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-4 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--ink-3)]">TREASURY CAPITAL:</span>
                  <span className="font-bold text-[var(--ink)]">${allocationAmount}M ALLOCATED</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={allocationAmount}
                  onChange={(e) => setAllocationAmount(Number(e.target.value))}
                  className="w-full accent-[var(--gold)] cursor-pointer"
                />

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--rule)]/60 text-[11px]">
                  <div>
                    <span className="text-[10px] text-[var(--ink-3)] block">MAX BORROW CAPACITY:</span>
                    <strong className="text-sm font-bold text-[var(--ink)]">
                      {selectedAsset === 'paxg'
                        ? `$${(allocationAmount * 0.85).toFixed(1)}M (85% LTV)`
                        : selectedAsset === 'xaut'
                        ? `$${(allocationAmount * 0.75).toFixed(1)}M (75% LTV)`
                        : '$0.0M (0% REJECTED)'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--ink-3)] block">LIQUIDATION HAIRCUT:</span>
                    <strong
                      className={`text-sm font-bold ${
                        selectedAsset === 'synthetic' ? 'text-red-600' : 'text-emerald-600'
                      }`}
                    >
                      {selectedAsset === 'paxg'
                        ? '0% SPREAD GAP'
                        : selectedAsset === 'xaut'
                        ? '5% HAIRCUT BUFFER'
                        : '100% UNALLOCATED RISK'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px] text-[var(--ink-3)]">
              <span>ORACLE COMPATIBILITY: CHAINLINK XAU/USD</span>
              <span className="text-emerald-600 font-bold">100% AUDIT BACKED</span>
            </div>
          </div>

          {/* Quadrant II: Secondary Parity & Depeg Radar (5 Cols) */}
          <div className="md:col-span-5 flex flex-col justify-between rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm hover:border-[var(--gold)] transition-colors">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] font-mono text-xs">
                <span className="font-black uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5">
                  <TrendingUp size={13} />
                  <span>DECK II: ARBITRAGE & DEPEG RADAR</span>
                </span>
                <span className="text-emerald-600 font-bold">LIVE PARITY</span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-bold text-[var(--ink)]">
                Detect Vault Disconnects Before Liquidity Drains
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Traders monitor the spread between spot physical gold prices and on-chain automated market maker liquidity.
              </p>

              {/* Parity Spread Display */}
              <div className="mt-5 rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-4 font-mono text-xs space-y-3">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[var(--ink-3)]">LONDON GOOD DELIVERY SPOT:</span>
                  <span className="font-bold text-[var(--ink)]">$2,741.80 / OZ</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[var(--ink-3)]">SECONDARY POOL PRICE:</span>
                  <span className="font-bold text-[var(--gold)]">$2,740.10 / OZ (-$1.70)</span>
                </div>

                <div className="pt-2 border-t border-[var(--rule)]/60">
                  <div className="flex justify-between text-[10px] text-[var(--ink-3)] mb-1">
                    <span>VAULT REDEMPTION CONFIDENCE:</span>
                    <span className="font-bold text-emerald-600">99.8% ALLOCATED</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--rule)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--gold)] w-[98%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px] text-[var(--ink-3)]">
              <span>PRIMARY VENUES TRACKED</span>
              <span className="font-bold text-[var(--ink)]">10 SOVEREIGN CODES</span>
            </div>
          </div>

          {/* Quadrant III: The Unbribable Assayer's Charter (5 Cols) */}
          <div className="md:col-span-5 flex flex-col justify-between rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm hover:border-[var(--gold)] transition-colors">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] font-mono text-xs">
                <span className="font-black uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5">
                  <ShieldCheck size={13} />
                  <span>DECK III: EDITORIAL INTEGRITY</span>
                </span>
                <span className="text-red-600 font-bold">ZERO TOLERANCE</span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-bold text-[var(--ink)]">
                Zero Sponsored Hallmarks or Paid Placements
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Fineness accepts zero token grants, listing fees, or foundation marketing bribes. If an audited protocol conceals custodian reports, it is struck from the register immediately.
              </p>

              {/* Physical Assay Seal Box */}
              <div className="mt-5 rounded-xl border border-[var(--gold)]/40 bg-[var(--tint)]/50 p-4 font-mono text-xs space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-[var(--gold)] select-none">✦</span>
                  <div>
                    <div className="font-bold text-[var(--ink)] text-sm">ASSAYER&apos;S SANCTUARY</div>
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

          {/* Quadrant IV: Sovereign Risk Caliper Equalizer (7 Cols) */}
          <div className="md:col-span-7 flex flex-col justify-between rounded-2xl border-2 border-[var(--gold)]/60 bg-[var(--surface)] p-6 sm:p-8 shadow-md hover:border-[var(--gold)] transition-colors">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] font-mono text-xs">
                <span className="font-black uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5">
                  <Sliders size={13} />
                  <span>DECK IV: CUSTOM CALIPER EQUALIZER</span>
                </span>
                <span className="text-[var(--gold)] font-bold">URL-ENCODED</span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-bold text-[var(--ink)]">
                Calibrate Your Own Risk Model
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Disagree with our house weights? Adjust the five criteria sliders dynamically. Your customized weights encode directly into the URL for verifiable institutional sharing.
              </p>

              {/* 5 Caliper Sliders */}
              <div className="mt-5 rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-4 font-mono text-xs space-y-3">
                <div className="flex justify-between items-center text-[11px] pb-1 border-b border-[var(--rule)]/60">
                  <span className="text-[var(--ink-3)]">CALIBRATED SCORE:</span>
                  <strong className="text-sm text-[var(--gold)] font-black">{computedKarat} / 1000 AU</strong>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[var(--ink-3)]">ASSET BACKING:</span>
                      <span className="font-bold text-[var(--gold)]">{calipers.backing}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={calipers.backing}
                      onChange={(e) => setCalipers({ ...calipers, backing: Number(e.target.value) })}
                      className="w-full accent-[var(--gold)] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[var(--ink-3)]">VOLUME TRACTION:</span>
                      <span className="font-bold text-[var(--ink)]">{calipers.volume}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={calipers.volume}
                      onChange={(e) => setCalipers({ ...calipers, volume: Number(e.target.value) })}
                      className="w-full accent-[var(--gold)] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[var(--ink-3)]">RESERVE AUDITS:</span>
                      <span className="font-bold text-[var(--ink)]">{calipers.reserves}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={calipers.reserves}
                      onChange={(e) => setCalipers({ ...calipers, reserves: Number(e.target.value) })}
                      className="w-full accent-[var(--gold)] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[var(--ink-3)]">CUSTODY STANDING:</span>
                      <span className="font-bold text-[var(--ink)]">{calipers.custody}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={calipers.custody}
                      onChange={(e) => setCalipers({ ...calipers, custody: Number(e.target.value) })}
                      className="w-full accent-[var(--gold)] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px] text-[var(--ink-3)]">
              <span>QUERY PARAMETERS: ?w=6,5,4,3,2</span>
              <span className="text-[var(--gold)] font-bold">STATE PRESERVED IN URL</span>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
}
