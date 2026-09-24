'use client';

import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import {
  Flame,
  FileX,
  Award,
  Sparkles,
  Scan,
  Check,
  RefreshCw,
  XCircle,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

/**
 * CrucibleManifesto:
 * Modeled after kentir's ComparisonSection.tsx (pinned scroll scene).
 * Features:
 * - 220svh pinned scroll container.
 * - Sticky stage where the giant headline splits horizontally ("Paper Claims" ← vs → "Sovereign Bullion").
 * - Opposing comparison cards rise up smoothly from the bottom with cubic ease.
 * - Interactive 3D tilt, live spectrometry scanline, and interactive "TEST WITH FLAME" button.
 */
export default function CrucibleManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(0);
  const [cardsProgress, setCardsProgress] = useState(0);
  const [distance, setDistance] = useState(450);
  const [riseVal, setRiseVal] = useState(240);

  // Interactive Smelt Test State
  const [isSmelting, setIsSmelting] = useState(false);
  const [hasTested, setHasTested] = useState(false);

  // 3D tilt tracking for Bullion Card
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, rotX: 0, rotY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stageRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const stageHeight = stageRef.current.offsetHeight;
      const totalScrollable = rect.height - stageHeight;
      if (totalScrollable <= 0) return;

      const isMobile = window.innerWidth <= 768;
      const p = isMobile
        ? Math.max(0, Math.min(1, (80 - rect.top) / (vh * 0.7)))
        : Math.max(0, Math.min(1, (80 - rect.top) / totalScrollable));

      // Title splits first (progress 0.05 to 0.55)
      const s = Math.max(0, Math.min(1, (p - 0.05) / 0.5));
      // Cards rise up (progress 0.12 to 0.72)
      const c = Math.max(0, Math.min(1, (p - 0.12) / 0.55));
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - c, 3);

      const d = isMobile ? window.innerWidth * 0.55 : window.innerWidth * 0.42;
      const r = (1 - ease) * Math.min(240, vh * 0.35);

      setSplit(s);
      setCardsProgress(ease);
      setDistance(d);
      setRiseVal(r);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 6;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    setMousePos({ x: px, y: py, rotX, rotY });
  }

  function handleMouseLeave() {
    setMousePos({ x: 50, y: 50, rotX: 0, rotY: 0 });
  }

  function triggerSmeltTest() {
    setIsSmelting(true);
    setTimeout(() => {
      setIsSmelting(false);
      setHasTested(true);
    }, 900);
  }

  const scale = 0.9 + cardsProgress * 0.1;

  return (
    <section
      ref={containerRef}
      id="crucible-disclosure"
      aria-labelledby="manifesto-title"
      className="relative w-full border-b border-[var(--rule)] bg-[var(--surface-alt)]"
      style={{ height: '220svh', minHeight: '1600px' }}
    >
      {/* Sticky Stage Container */}
      <div
        ref={stageRef}
        className="sticky top-16 md:top-20 h-[calc(100svh-64px)] md:h-[calc(100svh-80px)] min-h-[580px] flex flex-col justify-center items-center overflow-hidden px-[max(4vw,20px)]"
      >
        {/* Ambient Radial Spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(196,139,15,0.08)_0%,transparent_65%)]"
        />

        {/* Pinned Splitting Headline (Inspired by kentir ComparisonSection) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none px-4">
          <div
            className="flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--tint)] px-3 py-1 font-mono text-[11px] font-bold text-[var(--gold)] mb-4 transition-opacity duration-150"
            style={{ opacity: Math.max(0, 1 - split * 1.6) }}
          >
            <Flame size={12} className="text-[var(--gold)] animate-pulse" />
            <span>THE CRUCIBLE DISCLOSURE</span>
          </div>

          <h2
            id="manifesto-title"
            className="font-[var(--font-inter)] flex flex-wrap items-center justify-center gap-x-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--ink)]"
          >
            <span
              className="inline-block transition-transform duration-75 will-change-transform text-red-600"
              style={{
                transform: `translateX(-${split * distance}px)`,
                opacity: Math.max(0, 1 - split),
              }}
            >
              Paper Illusions
            </span>
            <span
              className="inline-block font-mono text-sm md:text-lg font-bold text-[var(--ink-3)] transition-opacity duration-75 uppercase tracking-widest"
              style={{ opacity: Math.max(0, 1 - split * 2) }}
            >
              versus
            </span>
            <span
              className="inline-block text-[var(--gold)] transition-transform duration-75 will-change-transform"
              style={{
                transform: `translateX(${split * distance}px)`,
                opacity: Math.max(0, 1 - split),
              }}
            >
              Sovereign Bullion
            </span>
          </h2>

          <p
            className="mt-4 max-w-xl text-center text-xs sm:text-sm text-[var(--ink-2)] transition-opacity duration-150"
            style={{ opacity: Math.max(0, 1 - split * 1.8) }}
          >
            Scroll to separate rehypothecated commodity IOUs from independently assayed 24K physical gold.
          </p>
        </div>

        {/* Rising Comparison Cards Grid */}
        <div
          className="relative z-20 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 will-change-transform"
          style={{
            opacity: cardsProgress,
            transform: `translateY(${riseVal}px) scale(${scale})`,
          }}
        >
          {/* Card Left: The Fragile Paper Claim */}
          <div className="relative flex flex-col justify-between rounded-xl border border-red-500/40 bg-[var(--surface)] p-5 sm:p-7 shadow-lg overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />
            
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded bg-red-500/10 text-red-600 font-bold border border-red-500/20">
                    <FileX size={14} />
                  </span>
                  <div>
                    <span className="mono text-xs font-black uppercase tracking-wider text-red-600">
                      PAPER DERIVATIVE
                    </span>
                    <div className="mono text-[9px] text-[var(--ink-3)]">UNALLOCATED POOL</div>
                  </div>
                </div>

                <span className="mono inline-flex items-center gap-1 rounded bg-red-500/10 border border-red-500/30 px-2 py-0.5 text-[9px] font-black text-red-600">
                  <ShieldAlert size={10} />
                  FAILED ASSAY
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-lg sm:text-xl font-bold text-[var(--ink)]">
                The Illusion of Fractional Gold
              </h3>
              <p className="mt-1 text-xs text-[var(--ink-2)] leading-relaxed">
                Opaque protocols mint ERC-20 tokens claiming 1:1 gold parity while commingling vault reserves with corporate liabilities and denying physical bar redemption.
              </p>

              {/* Vulnerabilities checklist */}
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-3 font-mono text-[11px] space-y-2">
                <div className="text-[9px] font-bold uppercase tracking-wider text-red-600 flex items-center justify-between border-b border-red-500/20 pb-1">
                  <span>COUNTERPARTY RISK</span>
                  <span>SCORE &lt; 375 / 1000</span>
                </div>
                <div className="flex items-start gap-2 text-[var(--ink-2)]">
                  <XCircle size={13} className="text-red-500 shrink-0 mt-0.5" />
                  <span>Unverified spreadsheets without cryptographic proof-of-reserves</span>
                </div>
                <div className="flex items-start gap-2 text-[var(--ink-2)]">
                  <XCircle size={13} className="text-red-500 shrink-0 mt-0.5" />
                  <span>Unallocated pooled bullion commingled with debt covenants</span>
                </div>
                <div className="flex items-start gap-2 text-[var(--ink-2)]">
                  <XCircle size={13} className="text-red-500 shrink-0 mt-0.5" />
                  <span>Zero legal title to specific LBMA 400oz serialized bars</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[var(--rule)] flex items-center justify-between mono text-[10px]">
              <span className="text-[var(--ink-3)]">RECOURSE:</span>
              <span className="font-bold text-red-600 uppercase">STRUCK FROM REGISTER</span>
            </div>
          </div>

          {/* Card Right: The 24K Sovereign Bullion (3D Interactive Tilt + Laser Scan) */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              perspective: 1000,
              transform: `rotateX(${mousePos.rotX}deg) rotateY(${mousePos.rotY}deg)`,
            }}
            className="relative flex flex-col justify-between rounded-xl border-2 border-[var(--gold)] bg-[var(--surface)] p-5 sm:p-7 shadow-xl overflow-hidden transition-transform duration-100 ease-out"
          >
            {/* Dynamic Specular Gloss Highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, rgba(196,139,15,0.3), transparent 70%)`,
              }}
            />

            {/* Bullion Edge */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)]" />

            {/* Looping Spectrometer Laser Scanline */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-75 shadow-[0_0_8px_var(--gold)] animate-pulse"
              style={{
                top: `${(mousePos.y * 0.8 + 10)}%`,
                transition: 'top 0.15s ease-out',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--tint)] text-[var(--gold)] font-bold border border-[var(--gold)]/40 shadow-xs">
                    <Award size={15} />
                  </span>
                  <div>
                    <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                      24K SOVEREIGN BULLION
                    </span>
                    <div className="mono text-[9px] text-[var(--ink-3)]">ALLOCATED LBMA STANDARD</div>
                  </div>
                </div>

                <span className="mono inline-flex items-center gap-1 rounded bg-[var(--tint)] border border-[var(--gold)]/50 px-2 py-0.5 text-[9px] font-black text-[var(--gold)] shadow-2xs">
                  <Sparkles size={10} className="text-[var(--gold)]" />
                  CERTIFIED PURE
                </span>
              </div>

              <h3 className="mt-4 font-[var(--font-inter)] text-lg sm:text-xl font-bold text-[var(--ink)]">
                The Cryptographic Gold Standard
              </h3>
              <p className="mt-1 text-xs text-[var(--ink-2)] leading-relaxed">
                Independently audited tokens bind every on-chain unit to a specific, serial-numbered LBMA 400oz bar vaulted in Zurich or London with legal title.
              </p>

              {/* Live Spectrometer Telemetry */}
              <div className="mt-4 rounded-lg border border-[var(--gold)]/40 bg-[var(--surface-alt)]/90 p-3 font-mono text-[11px] space-y-1.5">
                <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-[var(--gold)] border-b border-[var(--rule)]/60 pb-1">
                  <span className="flex items-center gap-1">
                    <Scan size={10} className="animate-pulse" />
                    LIVE SPECTROMETER
                  </span>
                  <span className="text-emerald-600 font-bold">100% PASS</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--ink-3)]">BAR SERIAL:</span>
                  <span className="font-bold">#AU-999.9-CH-8821</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--ink-3)]">VAULT:</span>
                  <span className="font-bold">ZURICH FREEPORT (SEGREGATED)</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--ink-3)]">REDEMPTION:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <Check size={10} /> 1:1 PHYSICAL DELIVERY
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Smelt Testing Action Button */}
            <div className="relative z-10 mt-5 pt-3 border-t border-[var(--rule)] flex items-center justify-between">
              <button
                type="button"
                onClick={triggerSmeltTest}
                disabled={isSmelting}
                className="inline-flex items-center gap-1.5 rounded border border-[var(--gold)] bg-[var(--dark)] px-3 py-1 font-mono text-[10px] font-bold text-white shadow-xs transition-all hover:bg-[var(--gold)] hover:text-black active:scale-95 disabled:opacity-70 cursor-pointer"
              >
                {isSmelting ? (
                  <>
                    <RefreshCw size={11} className="animate-spin text-[var(--gold)]" />
                    <span>SMELTING 1,064°C...</span>
                  </>
                ) : hasTested ? (
                  <>
                    <ShieldCheck size={11} className="text-emerald-400" />
                    <span>SEALED (24K AU)</span>
                  </>
                ) : (
                  <>
                    <Flame size={11} className="text-[var(--gold)]" />
                    <span>TEST WITH FLAME</span>
                  </>
                )}
              </button>

              <div className="mono text-[10px] font-bold text-[var(--gold)]">
                ≥ 750 / 1000 (HALLMARKED)
              </div>
            </div>

            {/* Heatwave Flash Animation Overlay */}
            {isSmelting && (
              <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-gradient-to-t from-amber-600/30 via-[var(--gold)]/20 to-transparent backdrop-blur-[1px] animate-pulse">
                <div className="rounded bg-[var(--dark)] px-3 py-1 font-mono text-[10px] font-black text-[var(--gold)] shadow-md">
                  ASSAY CONFIRMED // 999.9 FINE GOLD
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
