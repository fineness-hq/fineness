'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Flame,
  FileX,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ShieldCheck,
  Scan,
  Check,
} from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

/**
 * CrucibleManifesto:
 * Autonomous looping Touchstone X-Ray & Thermal Scorch stage.
 * Features:
 * - Continuous looping caliper sweep (hypnotic back-and-forth x-ray scan).
 * - Animated specular light sheen and molten laser scanline.
 * - Rotating touchstone heraldic seal.
 * - Zero tedious manual sliders; pure cinematic visual storytelling.
 */
export default function CrucibleManifesto() {
  const reduce = useReducedMotion();

  return (
    <section
      id="crucible-disclosure"
      aria-labelledby="manifesto-title"
      className="page-wrap py-16 border-b border-[var(--rule)] overflow-hidden"
    >
      <Reveal>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--tint)] px-3 py-1 font-mono text-xs font-bold text-[var(--gold)] mb-3 shadow-2xs">
            <Flame size={13} className="text-[var(--gold)] animate-pulse" />
            <span>THE CRUCIBLE DISCLOSURE</span>
          </div>

          <h2
            id="manifesto-title"
            className="font-[var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] leading-tight"
          >
            <WordText text="Separating Sovereign Bullion from Paper Illusions." />
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[var(--ink-2)] leading-relaxed">
            The tokenized commodity market is flooded with promises. Fineness stress-tests claims through autonomous metallurgical assay, isolating real Swiss vaulted bars from unallocated paper claims.
          </p>
        </div>

        {/* Autonomous Looping Touchstone Dual Comparison */}
        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          
          {/* Card Left: The Fragile Paper Claim (With Looping Pulse Alarm) */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-red-500/30 bg-[var(--surface)] p-6 sm:p-8 shadow-md overflow-hidden">
            {/* Caution Bar with Looping Gradient Wave */}
            <motion.div
              aria-hidden="true"
              animate={reduce ? {} : { x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-400 to-red-600 opacity-80"
            />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-600 font-bold border border-red-500/20">
                    <FileX size={16} />
                  </span>
                  <div>
                    <span className="mono text-xs font-black uppercase tracking-wider text-red-600">
                      UNALLOCATED PAPER CLAIM
                    </span>
                    <div className="mono text-[10px] text-[var(--ink-3)]">REHYPOTHECATED COMMODITY</div>
                  </div>
                </div>

                <span className="mono inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-2.5 py-1 text-[10px] font-black text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-ping" />
                  FAILED ASSAY
                </span>
              </div>

              <h3 className="mt-5 font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)]">
                The Illusion of Fractional Gold
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Opaque protocols mint ERC-20 derivatives claiming gold parity while commingling vault reserves with corporate liabilities and denying direct physical bar redemption.
              </p>

              {/* Vulnerabilities checklist */}
              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 font-mono text-xs space-y-2.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-600 flex items-center justify-between border-b border-red-500/20 pb-1.5">
                  <span>COUNTERPARTY VULNERABILITIES</span>
                  <span>SCORE &lt; 375 / 1000</span>
                </div>
                <div className="flex items-start gap-2 text-[var(--ink-2)]">
                  <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <span>Spreadsheets without cryptographic proof-of-reserves</span>
                </div>
                <div className="flex items-start gap-2 text-[var(--ink-2)]">
                  <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <span>Unallocated pooled bullion commingled with debt covenants</span>
                </div>
                <div className="flex items-start gap-2 text-[var(--ink-2)]">
                  <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <span>No legal title to specific LBMA 400oz serialized bars</span>
                </div>
                <div className="flex items-start gap-2 text-[var(--ink-2)]">
                  <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <span>Zero redemption right if secondary liquidity pools depeg</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px]">
              <span className="text-[var(--ink-3)]">STANDBY LIQUIDATION RISK:</span>
              <span className="font-bold text-red-600 uppercase">STRUCK FROM REGISTER</span>
            </div>
          </div>

          {/* Card Right: 24K Sovereign Bullion (With Looping Laser Scan & Ambient Shimmer) */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-[var(--gold)] bg-[var(--surface)] p-6 sm:p-8 shadow-xl overflow-hidden">
            {/* Bullion Gold Crown Edge */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)]" />

            {/* Continuous Looping Laser Spectrometry Scanline */}
            <motion.div
              aria-hidden="true"
              animate={reduce ? {} : { y: ['-10%', '620%', '-10%'] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80 shadow-[0_0_10px_var(--gold)] z-20"
            />

            {/* Continuous Molten Gold Ambient Light Breathe */}
            <motion.div
              aria-hidden="true"
              animate={reduce ? {} : { opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,139,15,0.3)_0%,transparent_60%)]"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--gold)]/30">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--tint)] text-[var(--gold)] font-bold border border-[var(--gold)]/40 shadow-xs">
                    <Award size={18} />
                  </span>
                  <div>
                    <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                      24K SOVEREIGN BULLION
                    </span>
                    <div className="mono text-[10px] text-[var(--ink-3)]">ALLOCATED LBMA 400oz BAR</div>
                  </div>
                </div>

                <span className="mono inline-flex items-center gap-1.5 rounded-full bg-[var(--tint)] border border-[var(--gold)]/50 px-3 py-1 text-[10px] font-black text-[var(--gold)] shadow-2xs">
                  <Sparkles size={11} className="text-[var(--gold)] animate-spin" />
                  CERTIFIED PURE
                </span>
              </div>

              <h3 className="mt-5 font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)]">
                The Cryptographic Gold Standard
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                Independently audited tokens bind every on-chain unit to a specific, serial-numbered LBMA 400oz bar vaulted in Zurich or London with legal title.
              </p>

              {/* Looping Spectrometer Telemetry Ingot Box */}
              <div className="mt-6 rounded-xl border border-[var(--gold)]/40 bg-[var(--surface-alt)]/90 p-4 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] border-b border-[var(--rule)]/60 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Scan size={12} className="animate-pulse" />
                    AUTONOMOUS SPECTROMETER
                  </span>
                  <span className="text-emerald-600 font-bold">100% PASS</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--ink-3)]">BAR SERIAL NUMBER:</span>
                  <span className="font-bold text-[var(--ink)]">#AU-999.9-CH-8821</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--ink-3)]">VAULT JURISDICTION:</span>
                  <span className="font-bold text-[var(--ink)]">ZURICH FREEPORT (SEGREGATED)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--ink-3)]">MONTHLY ATTESTATION:</span>
                  <span className="font-bold text-[var(--gold)]">BUREAU VERITAS VERIFIED</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--ink-3)]">REDEMPTION RIGHT:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <Check size={12} /> 1:1 PHYSICAL DELIVERY
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-[var(--gold)]/30 flex items-center justify-between font-mono text-[10px]">
              <span className="text-[var(--ink-3)]">STANDARD COMPLIANCE:</span>
              <span className="font-bold text-[var(--gold)] uppercase">≥ 750 / 1000 (HALLMARKED)</span>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
}
