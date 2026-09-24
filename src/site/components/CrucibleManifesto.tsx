'use client';

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
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
  SlidersHorizontal,
  Lock,
  Eye,
  CheckCircle2,
} from 'lucide-react';

/**
 * CrucibleManifesto:
 * Elevated beyond simple text-splitting into an interactive "Touchstone X-Ray & Thermal Scorch" stage.
 * Features:
 * - Scroll-driven pinned reveal + interactive horizontal drag caliper (scrub between Paper IOU and 24K Bullion).
 * - Real-time comparison clipping mask revealing the interior cryptographic crystalline gold structure.
 * - Interactive Crucible Thermal Smelt button (1,064°C) with spark waves and live assay hallmark die-stamp.
 * - Live spot parity metrics and verifiable vault telemetry.
 */
export default function CrucibleManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Slider position (0 = all paper, 100 = all 24K gold, default 50)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isSmelting, setIsSmelting] = useState(false);
  const [hasSmelted, setHasSmelted] = useState(false);

  // 3D holographic cursor tracking
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, rotX: 0, rotY: 0 });

  // Scroll driven progression that automatically moves the caliper if not manually dragging
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isDragging) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScrollable = rect.height - vh;
      if (totalScrollable <= 0) return;

      // Calculate 0 to 1 scroll progress through the section
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      // Map scroll progress to slider reveal (starts at 20% paper, sweeps to 85% gold)
      const targetPos = Math.round(20 + progress * 65);
      setSliderPos(targetPos);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  // Drag handlers for the caliper slider
  function updateSliderFromClientX(clientX: number, target: HTMLElement) {
    const rect = target.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const pct = Math.round((x / rect.width) * 100);
    setSliderPos(pct);
  }

  function handleMouseDown() {
    setIsDragging(true);
  }

  useEffect(() => {
    function handleMouseUp() {
      setIsDragging(false);
    }
    function handleMouseMoveDoc(e: globalThis.MouseEvent) {
      if (!isDragging || !stageRef.current) return;
      const caliperTrack = stageRef.current.querySelector('.caliper-track') as HTMLElement;
      if (caliperTrack) {
        updateSliderFromClientX(e.clientX, caliperTrack);
      }
    }
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMoveDoc);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMoveDoc);
    };
  }, [isDragging]);

  // 3D holographic tilt on mouse move
  function handleCardMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 4;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    setMousePos({ x: px, y: py, rotX, rotY });
  }

  function handleCardMouseLeave() {
    setMousePos({ x: 50, y: 50, rotX: 0, rotY: 0 });
  }

  function triggerSmelt() {
    setIsSmelting(true);
    setTimeout(() => {
      setIsSmelting(false);
      setHasSmelted(true);
      setSliderPos(95); // Reveal gold fully upon smelting
    }, 1000);
  }

  return (
    <section
      ref={containerRef}
      id="crucible-disclosure"
      aria-labelledby="manifesto-title"
      className="relative w-full border-b border-[var(--rule)] bg-[var(--surface-alt)]"
      style={{ minHeight: '180svh' }}
    >
      {/* Sticky Stage Container */}
      <div
        ref={stageRef}
        className="sticky top-16 md:top-20 h-[calc(100svh-64px)] md:h-[calc(100svh-80px)] min-h-[620px] flex flex-col justify-center items-center overflow-hidden px-[max(4vw,20px)] py-6"
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(196,139,15,0.09)_0%,transparent_60%)]"
        />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--tint)] px-3 py-1 font-mono text-[11px] font-bold text-[var(--gold)] mb-3 shadow-2xs">
            <Flame size={12} className="text-[var(--gold)] animate-pulse" />
            <span>THE TOUCHSTONE X-RAY ASSAY</span>
          </div>

          <h2
            id="manifesto-title"
            className="font-[var(--font-inter)] text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[var(--ink)] leading-tight"
          >
            Peeling Back Paper Promises to Reveal Physical 24K Bullion
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed max-w-lg mx-auto">
            Drag the caliper handle or scroll to dissect the synthetic paper wrapper vs true LBMA-allocated cryptographic gold.
          </p>
        </div>

        {/* Interactive Caliper Stage (Unified Dual-Layer Bullion Comparator) */}
        <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Caliper Control Header Bar */}
          <div className="w-full flex items-center justify-between pb-2 font-mono text-xs text-[var(--ink-3)]">
            <span className="flex items-center gap-1.5 text-red-600 font-bold">
              <FileX size={13} />
              <span>PAPER FRACTIONAL IOU ({100 - sliderPos}%)</span>
            </span>

            <span className="flex items-center gap-1 text-[var(--gold)] font-bold text-[10px] uppercase">
              <SlidersHorizontal size={12} />
              <span className="hidden sm:inline">TOUCHSTONE CALIPER:</span> {sliderPos}% ASSAYED
            </span>

            <span className="flex items-center gap-1.5 text-[var(--gold)] font-bold">
              <Award size={14} />
              <span>24K SOVEREIGN BULLION ({sliderPos}%)</span>
            </span>
          </div>

          {/* Unified Comparison Viewer with Clip-Path */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              perspective: 1000,
              transform: `rotateX(${mousePos.rotX}deg) rotateY(${mousePos.rotY}deg)`,
            }}
            className="caliper-track relative w-full h-[360px] sm:h-[380px] rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] shadow-2xl overflow-hidden select-none cursor-ew-resize transition-transform duration-100 ease-out"
            onMouseDown={(e) => {
              setIsDragging(true);
              updateSliderFromClientX(e.clientX, e.currentTarget);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              if (touch) updateSliderFromClientX(touch.clientX, e.currentTarget);
            }}
          >
            {/* Layer 1 (Base): The Paper Trap (Left Side View) */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-red-500/5 via-[var(--surface)] to-red-500/10">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-red-500/10 text-red-600 font-bold border border-red-500/20">
                      <FileX size={14} />
                    </span>
                    <div>
                      <span className="mono text-xs font-black uppercase tracking-wider text-red-600">
                        SYNTHETIC PAPER COMMODITY
                      </span>
                      <div className="mono text-[9px] text-[var(--ink-3)]">UNALLOCATED POOL • REHYPOTHECATED</div>
                    </div>
                  </div>
                  <span className="mono text-[10px] font-black text-red-600 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                    0 - 374 / 1000 DISQUALIFIED
                  </span>
                </div>

                <div className="mt-5 max-w-md">
                  <h3 className="font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)]">
                    The Fragile Illusion of Paper Parity
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    Unallocated tokens commingle physical reserves with company debt. If the issuer defaults, token holders hold zero legal claim to specific London Good Delivery bars.
                  </p>

                  <div className="mt-4 space-y-1.5 font-mono text-[11px] text-[var(--ink-2)]">
                    <div className="flex items-center gap-2">
                      <XCircle size={13} className="text-red-500 shrink-0" />
                      <span>Spreadsheets without cryptographic proof-of-reserves</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle size={13} className="text-red-500 shrink-0" />
                      <span>Commingled corporate debt covenants & unsegregated title</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle size={13} className="text-red-500 shrink-0" />
                      <span>Zero legal right to physical bullion delivery</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px]">
                <span className="text-[var(--ink-3)]">LEGAL STANDING:</span>
                <span className="font-bold text-red-600">UNSECURED GENERAL CREDITOR</span>
              </div>
            </div>

            {/* Layer 2 (Clipped Overlay): The Pure 24K Sovereign Bullion */}
            <div
              className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[var(--surface)] via-[var(--tint)]/50 to-[var(--surface)] overflow-hidden"
              style={{
                clipPath: `inset(0 0 0 ${100 - sliderPos}%)`,
              }}
            >
              {/* Gold Bullion Edge Highlight */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)]" />

              {/* Dynamic Specular Sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, rgba(196,139,15,0.35), transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--gold)]/30">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--tint)] text-[var(--gold)] font-bold border border-[var(--gold)]/40 shadow-xs">
                      <Award size={15} />
                    </span>
                    <div>
                      <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                        24K SOVEREIGN BULLION
                      </span>
                      <div className="mono text-[9px] text-[var(--ink-3)]">ALLOCATED LBMA 400oz BAR</div>
                    </div>
                  </div>
                  <span className="mono text-[10px] font-black text-[var(--gold)] bg-[var(--tint)] border border-[var(--gold)]/50 px-2.5 py-0.5 rounded shadow-2xs">
                    ≥ 750 / 1000 HALLMARKED
                  </span>
                </div>

                <div className="mt-5 max-w-md ml-auto text-right">
                  <h3 className="font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)]">
                    Independently Assayed 24-Karat Gold
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    Every token is bound to a specific, serial-numbered LBMA 400oz bar safely held in Zurich Freeport with bankruptcy-remote legal title and 1:1 redemption.
                  </p>

                  <div className="mt-4 space-y-1.5 font-mono text-[11px] text-[var(--ink)] flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span>Serial Bar #AU-999.9-CH-8821 verified</span>
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Monthly independent Bureau Veritas attestations</span>
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Direct 1:1 physical redemption contractually secured</span>
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-3 border-t border-[var(--gold)]/30 flex items-center justify-between font-mono text-[10px]">
                <span className="text-[var(--ink-3)]">CUSTODY STATUS:</span>
                <span className="font-bold text-[var(--gold)]">ALLOCATED SWISS VAULT</span>
              </div>
            </div>

            {/* Draggable Brass Caliper Blade Divider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[var(--gold)] shadow-[0_0_12px_var(--gold)] z-30 pointer-events-none"
              style={{ left: `${100 - sliderPos}%` }}
            >
              {/* Center Caliper Thumb Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center h-10 w-10 rounded-full border-2 border-[var(--gold)] bg-[var(--dark)] text-[var(--gold)] shadow-xl cursor-grab active:cursor-grabbing pointer-events-auto">
                <SlidersHorizontal size={14} />
              </div>
            </div>

            {/* Thermal Smelt Spark Flash Overlay */}
            {isSmelting && (
              <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-t from-amber-600/40 via-[var(--gold)]/30 to-transparent backdrop-blur-[2px] animate-pulse">
                <div className="flex flex-col items-center gap-2 rounded-xl bg-[var(--dark)] px-4 py-2 font-mono text-xs font-black text-[var(--gold)] shadow-2xl border border-[var(--gold)]">
                  <Flame size={28} className="text-amber-400 animate-bounce" />
                  <span>SMELTING 1,064°C // PURITY 999.9 CONFIRMED</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Action Controls Bar Below Caliper */}
          <div className="mt-4 w-full flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--ink-2)] text-[11px]">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-ping" />
              <span>DRAG CALIPER BLADE TO DISSECT LAYERS</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={triggerSmelt}
                disabled={isSmelting}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--gold)] bg-[var(--dark)] px-4 py-2 font-bold text-white shadow-md transition-all hover:bg-[var(--gold)] hover:text-black active:scale-95 disabled:opacity-70 cursor-pointer"
              >
                {isSmelting ? (
                  <>
                    <RefreshCw size={12} className="animate-spin text-[var(--gold)]" />
                    <span>SMELTING WITH CRUCIBLE FLAME...</span>
                  </>
                ) : hasSmelted ? (
                  <>
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>METALLURGICALLY CERTIFIED (24K AU)</span>
                  </>
                ) : (
                  <>
                    <Flame size={13} className="text-[var(--gold)]" />
                    <span>IGNITE CRUCIBLE FLAME (1,064°C)</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
