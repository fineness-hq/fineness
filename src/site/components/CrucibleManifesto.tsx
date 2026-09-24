'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  ShieldAlert,
  ShieldCheck,
  FileX,
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  Activity,
  Scan,
  Check,
  RefreshCw,
} from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

/**
 * CrucibleManifesto:
 * Bespoke interactive and scroll-driven comparative assay showcase.
 * Features:
 * - Scroll-linked parallax entry from opposing directions.
 * - Interactive 3D holographic tilt on cursor movement with specular gloss highlight.
 * - Looping gold spectrometry laser scanline.
 * - Interactive "Test Ingot with Flame" smelting trigger with gold hallmark stamp.
 * - High-contrast contrast between fragile unallocated paper claims and 24K sovereign bullion.
 */
export default function CrucibleManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll-driven transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const paperX = useTransform(scrollYProgress, [0, 0.45], reduce ? [0, 0] : [-80, 0]);
  const paperRotate = useTransform(scrollYProgress, [0, 0.45], reduce ? [0, 0] : [-3, 0]);
  const bullionX = useTransform(scrollYProgress, [0, 0.45], reduce ? [0, 0] : [80, 0]);
  const bullionRotate = useTransform(scrollYProgress, [0, 0.45], reduce ? [0, 0] : [3, 0]);
  const centerRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 360]);

  // Interactive card state
  const [activeTab, setActiveTab] = useState<'both' | 'paper' | 'bullion'>('both');
  const [isSmelting, setIsSmelting] = useState(false);
  const [hasTested, setHasTested] = useState(false);

  // 3D tilt tracking for Bullion Card
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, rotateX: 0, rotateY: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    // Subtle tilt: max 6deg
    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 6;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

    setMousePos({ x: px, y: py, rotateX: rotX, rotateY: rotY });
  }

  function handleMouseLeave() {
    setMousePos({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  }

  function triggerSmeltTest() {
    setIsSmelting(true);
    setTimeout(() => {
      setIsSmelting(false);
      setHasTested(true);
    }, 900);
  }

  return (
    <section
      ref={containerRef}
      aria-labelledby="manifesto-title"
      className="page-wrap py-16 border-b border-[var(--rule)] overflow-hidden"
    >
      <Reveal>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--tint)] px-3 py-1 font-mono text-xs font-bold text-[var(--gold)] shadow-2xs">
            <Flame size={13} className="text-[var(--gold)] animate-pulse" />
            <span>THE CRUCIBLE DISCLOSURE</span>
          </div>

          <h2
            id="manifesto-title"
            className="mt-4 font-[var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] leading-tight"
          >
            <WordText text="Separating Sovereign Bullion from Paper Illusions." />
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--ink-2)] leading-relaxed">
            The tokenized commodity market is flooded with promises. Anyone can deploy an ERC-20 contract and claim it is backed by physical gold. Fineness acts as the independent assay office of decentralized finance — stress-testing claims against immutable proof.
          </p>

          {/* Interactive Mode Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`rounded-full px-3.5 py-1.5 font-bold transition-all border ${
                activeTab === 'both'
                  ? 'border-[var(--dark)] bg-[var(--dark)] text-white shadow-xs'
                  : 'border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)] hover:border-[var(--gold)]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Layers size={13} />
                <span>DUAL COMPARATOR</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('paper')}
              className={`rounded-full px-3.5 py-1.5 font-bold transition-all border ${
                activeTab === 'paper'
                  ? 'border-red-600 bg-red-600 text-white shadow-xs'
                  : 'border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)] hover:border-red-500 hover:text-red-600'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FileX size={13} />
                <span>ISOLATE PAPER RISK</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bullion')}
              className={`rounded-full px-3.5 py-1.5 font-bold transition-all border ${
                activeTab === 'bullion'
                  ? 'border-[var(--gold)] bg-[var(--gold)] text-white shadow-xs'
                  : 'border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)] hover:border-[var(--gold)] hover:text-[var(--gold)]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Award size={13} />
                <span>ISOLATE 24K BULLION</span>
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Dual Comparison Cards with Scroll Parallax */}
        <div className="relative mt-12 grid gap-6 md:grid-cols-2 items-stretch">
          
          {/* Center Rotating Touchstone Seal (Desktop Only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center justify-center"
          >
            <motion.div
              style={{ rotate: centerRotate }}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-[var(--surface)] text-[var(--gold)] shadow-md"
            >
              <Flame size={20} className="text-[var(--gold)]" />
            </motion.div>
            <div className="mt-1.5 rounded bg-[var(--dark)] px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider text-white shadow-xs">
              VS
            </div>
          </div>

          {/* Card Left: The Fragile Paper Claim */}
          {(activeTab === 'both' || activeTab === 'paper') && (
            <motion.div
              style={{ x: paperX, rotateZ: paperRotate }}
              className={`relative flex flex-col justify-between rounded-2xl border-2 border-red-500/40 bg-[var(--surface)] p-6 sm:p-8 shadow-sm transition-all overflow-hidden ${
                activeTab === 'paper' ? 'md:col-span-2 max-w-3xl mx-auto' : ''
              }`}
            >
              {/* Caution Strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-red-600" />
              
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[var(--rule)]">
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

                <h3 className="mt-6 font-[var(--font-inter)] text-2xl font-bold text-[var(--ink)]">
                  The Illusion of Fractional Gold
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                  Opaque protocols mint ERC-20 derivatives claiming gold parity while concealing physical vault location, commingling reserves with corporate liabilities, and denying direct physical redemption.
                </p>

                {/* Audit Vulnerability Checklist */}
                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 font-mono text-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-red-600 mb-2.5 flex items-center justify-between">
                    <span>COUNTERPARTY VULNERABILITIES</span>
                    <span>0 / 1000 CRITERIA PASS</span>
                  </div>
                  <ul className="space-y-2.5 text-[var(--ink-2)]">
                    <li className="flex items-start gap-2">
                      <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                      <span>Unverified spreadsheets without cryptographic proof-of-reserves</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                      <span>Unallocated pooled bullion commingled with debt covenants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                      <span>No legal title to specific London Good Delivery 400oz bars</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                      <span>Zero redemption right if secondary liquidity pools depeg</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Severity Telemetry */}
              <div className="mt-8 pt-4 border-t border-[var(--rule)] flex flex-wrap items-center justify-between gap-2 mono text-[10px]">
                <span className="text-[var(--ink-3)]">STANDBY LIQUIDATION RISK:</span>
                <span className="rounded bg-red-600 px-2 py-0.5 font-bold text-white uppercase tracking-wider">
                  DISQUALIFIED (&lt; 375)
                </span>
              </div>
            </motion.div>
          )}

          {/* Card Right: The 24-Karat Sovereign Bullion (With 3D Tilt, Laser Scan & Smelt Test) */}
          {(activeTab === 'both' || activeTab === 'bullion') && (
            <motion.div
              style={{
                x: bullionX,
                rotateZ: bullionRotate,
                perspective: 1000,
                rotateX: mousePos.rotateX,
                rotateY: mousePos.rotateY,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`relative flex flex-col justify-between rounded-2xl border-2 border-[var(--gold)] bg-[var(--surface)] p-6 sm:p-8 shadow-lg transition-all duration-150 overflow-hidden ${
                activeTab === 'bullion' ? 'md:col-span-2 max-w-3xl mx-auto' : ''
              }`}
            >
              {/* Dynamic Specular Gloss Sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 320px at ${mousePos.x}% ${mousePos.y}%, rgba(196, 139, 15, 0.25), transparent 70%)`,
                }}
              />

              {/* Bullion Gold Crown Edge */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)]" />

              {/* Looping Laser Spectrometry Scanline */}
              <motion.div
                aria-hidden="true"
                animate={reduce ? {} : { y: ['-10%', '600%', '-10%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-60 shadow-[0_0_8px_var(--gold)]"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--rule)]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--tint)] text-[var(--gold)] font-bold border border-[var(--gold)]/40 shadow-xs">
                      <Award size={18} />
                    </span>
                    <div>
                      <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                        24K SOVEREIGN BULLION
                      </span>
                      <div className="mono text-[10px] text-[var(--ink-3)]">ALLOCATED LBMA STANDARD</div>
                    </div>
                  </div>

                  <span className="mono inline-flex items-center gap-1.5 rounded-full bg-[var(--tint)] border border-[var(--gold)]/50 px-2.5 py-1 text-[10px] font-black text-[var(--gold)] shadow-2xs">
                    <Sparkles size={11} className="text-[var(--gold)]" />
                    CERTIFIED PURE
                  </span>
                </div>

                <h3 className="mt-6 font-[var(--font-inter)] text-2xl font-bold text-[var(--ink)]">
                  The Cryptographic Gold Standard
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                  Legitimate bullion protocols bind each on-chain token to a specific, serial-numbered LBMA Good Delivery 400oz gold bar vaulted in Zurich, London, or New York, with direct legal ownership.
                </p>

                {/* Laser Spectrometry & Proof Ingot Box */}
                <div className="mt-6 rounded-xl border border-[var(--gold)]/40 bg-[var(--surface-alt)]/80 p-4 font-mono text-xs">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] mb-2.5 border-b border-[var(--rule)]/60 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Scan size={12} className="animate-pulse" />
                      SPECTROMETER VERIFIED PROOFS
                    </span>
                    <span className="text-emerald-600 font-bold">100% AUDITED</span>
                  </div>
                  <ul className="space-y-2 text-[var(--ink)]">
                    <li className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--ink-3)]">BAR SERIAL NUMBER:</span>
                      <span className="font-bold">#AU-999.9-CH-8821</span>
                    </li>
                    <li className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--ink-3)]">VAULT JURISDICTION:</span>
                      <span className="font-bold">ZURICH (SEGREGATED)</span>
                    </li>
                    <li className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--ink-3)]">ASSAY CADENCE:</span>
                      <span className="font-bold text-[var(--gold)]">MONTHLY ATTESTED</span>
                    </li>
                    <li className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--ink-3)]">REDEMPTION RIGHT:</span>
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <Check size={12} /> 1:1 PHYSICAL DELIVERY
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Interactive Smelt Testing Action Button */}
              <div className="relative z-10 mt-8 pt-4 border-t border-[var(--rule)] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={triggerSmeltTest}
                  disabled={isSmelting}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--gold)] bg-[var(--dark)] px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-xs transition-all hover:bg-[var(--gold)] hover:text-black active:scale-95 disabled:opacity-70 cursor-pointer"
                >
                  {isSmelting ? (
                    <>
                      <RefreshCw size={12} className="animate-spin text-[var(--gold)]" />
                      <span>HEATING CRUCIBLE...</span>
                    </>
                  ) : hasTested ? (
                    <>
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span>ASSAY SEALED (24K)</span>
                    </>
                  ) : (
                    <>
                      <Flame size={12} className="text-[var(--gold)]" />
                      <span>TEST WITH FLAME</span>
                    </>
                  )}
                </button>

                <div className="mono text-[10px] font-bold text-[var(--gold)]">
                  STANDARD: ≥ 750 / 1000 (HALLMARKED)
                </div>
              </div>

              {/* Flame Smelting Flash Overlay */}
              <AnimatePresence>
                {isSmelting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-gradient-to-t from-amber-600/30 via-[var(--gold)]/20 to-transparent backdrop-blur-[1px]"
                  >
                    <div className="flex flex-col items-center gap-2 text-center font-mono">
                      <Flame size={36} className="text-amber-400 animate-bounce" />
                      <div className="rounded bg-[var(--dark)] px-3 py-1 text-xs font-black text-[var(--gold)] shadow-md">
                        SMELTING 1,064°C // PURITY 999.9 CONFIRMED
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </Reveal>
    </section>
  );
}
