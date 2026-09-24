'use client';

import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import {
  Flame,
  FileX,
  Award,
  Sparkles,
  Check,
  RefreshCw,
  XCircle,
  ShieldCheck,
  Lock,
  Eye,
  CheckCircle2,
} from 'lucide-react';

/**
 * CrucibleManifesto:
 * Touchstone X-Ray & Thermal Scorch stage with Framer Motion spring physics.
 * Features:
 * - Buttery smooth spring-lerped clip-path scrubbing (120fps).
 * - Hardware-accelerated 3D holographic tilt with momentum physics.
 * - Interactive Crucible Thermal Smelt button (1,064°C) with spark waves and live assay hallmark die-stamp.
 */
export default function CrucibleManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [isDragging, setIsDragging] = useState(false);
  const [isSmelting, setIsSmelting] = useState(false);
  const [hasSmelted, setHasSmelted] = useState(false);
  const [displaySliderPct, setDisplaySliderPct] = useState(50);

  // Motion values with spring damping for liquid smoothness
  const sliderMotion = useMotionValue(50);
  const smoothSlider = useSpring(sliderMotion, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  });

  // Tilt spring physics
  const mouseRotX = useMotionValue(0);
  const mouseRotY = useMotionValue(0);
  const smoothRotX = useSpring(mouseRotX, { stiffness: 180, damping: 22 });
  const smoothRotY = useSpring(mouseRotY, { stiffness: 180, damping: 22 });

  // Clip path transform
  const clipPathValue = useTransform(smoothSlider, (v) => `inset(0 0 0 ${100 - v}%)`);
  const caliperLeft = useTransform(smoothSlider, (v) => `${v}%`);

  // Update numerical label smoothly
  useEffect(() => {
    return smoothSlider.on('change', (v) => {
      setDisplaySliderPct(Math.round(v));
    });
  }, [smoothSlider]);

  // Scroll driven progression that automatically sweeps the caliper if not dragging
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isDragging) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScrollable = rect.height - vh;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      const targetPos = 20 + progress * 65;
      sliderMotion.set(targetPos);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging, sliderMotion]);

  // Drag handlers for the caliper slider
  function updateSliderFromClientX(clientX: number, target: HTMLElement) {
    const rect = target.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const pct = Math.round((x / rect.width) * 100);
    sliderMotion.set(pct);
  }

  useEffect(() => {
    function handleMouseUp() {
      setIsDragging(false);
    }
    function handleMouseMoveDoc(e: globalThis.MouseEvent) {
      if (!isDragging || !trackRef.current) return;
      updateSliderFromClientX(e.clientX, trackRef.current);
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
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 4.5;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 4.5;
    mouseRotX.set(rotX);
    mouseRotY.set(rotY);
  }

  function handleCardMouseLeave() {
    mouseRotX.set(0);
    mouseRotY.set(0);
  }

  function triggerSmelt() {
    setIsSmelting(true);
    setTimeout(() => {
      setIsSmelting(false);
      setHasSmelted(true);
      sliderMotion.set(95); // Reveal gold fully upon smelting
    }, 1000);
  }

  return (
    <section
      ref={containerRef}
      id="crucible-manifesto"
      aria-label="The Touchstone X-Ray Caliper Stage"
      className="relative w-full border-b border-[var(--rule)] bg-[var(--surface-alt)] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--rule)] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
              <p className="eyebrow text-[var(--gold)] font-mono text-xs tracking-widest">
                THE CRUCIBLE DISCLOSURE // TOUCHSTONE X-RAY CALIPER
              </p>
            </div>
            <h2 className="mt-2 font-[var(--font-inter)] text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[var(--ink)]">
              Peel the Wrapper. Inspect the Vault.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] max-w-2xl leading-relaxed">
              Drag the golden caliper or scroll to peer through the outer corporate contract into the physical crystalline bullion vault beneath.
            </p>
          </div>

          {/* Thermal Smelt Trigger Button */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={triggerSmelt}
              disabled={isSmelting}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md cursor-pointer ${
                hasSmelted
                  ? 'border border-[var(--gold)] bg-[var(--tint)] text-[var(--gold)]'
                  : 'bg-[var(--dark)] text-white hover:bg-[var(--gold)] hover:text-white'
              }`}
            >
              <Flame size={15} className={isSmelting ? 'animate-bounce text-amber-400' : 'text-[var(--gold)]'} />
              <span>
                {isSmelting
                  ? 'SMELTING AT 1,064°C...'
                  : hasSmelted
                    ? '24K CERTIFIED SMELTED'
                    : 'TRIGGER 1,064°C TEST'}
              </span>
            </button>
          </div>
        </div>

        {/* The Interactive Touchstone X-Ray Caliper Stage */}
        <div className="relative w-full">
          
          {/* Caliper Scrub Labels */}
          <div className="flex items-center justify-between mb-3 text-xs font-mono px-2">
            <span className="flex items-center gap-1.5 text-red-600 font-bold">
              <FileX size={14} />
              <span>SYNTHETIC PAPER IOU ({100 - displaySliderPct}%)</span>
            </span>

            <span className="text-[11px] text-[var(--ink-3)] hidden sm:inline">
              ← DRAG CALIPER OR SCROLL TO REVEAL ALLOCATION →
            </span>

            <span className="flex items-center gap-1.5 text-[var(--gold)] font-bold">
              <Award size={14} />
              <span>24K SOVEREIGN BULLION ({displaySliderPct}%)</span>
            </span>
          </div>

          {/* Unified Comparison Viewer with Clip-Path & Hardware-Accelerated 3D Tilt */}
          <motion.div
            ref={trackRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              perspective: 1000,
              rotateX: smoothRotX,
              rotateY: smoothRotY,
            }}
            className="caliper-track relative w-full h-[360px] sm:h-[380px] rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] shadow-2xl overflow-hidden select-none cursor-ew-resize will-change-transform"
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

            {/* Layer 2 (Clipped Overlay): The Pure 24K Sovereign Bullion - Spring Driven */}
            <motion.div
              className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[var(--surface)] via-[var(--tint)]/50 to-[var(--surface)] overflow-hidden will-change-transform"
              style={{
                clipPath: clipPathValue,
              }}
            >
              {/* Gold Bullion Edge Highlight */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)]" />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--gold)]/30">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--tint)] text-[var(--gold)] font-bold border border-[var(--gold)]/40 shadow-xs">
                      <Award size={15} />
                    </span>
                    <div>
                      <span className="mono text-xs font-black uppercase tracking-wider text-[var(--gold)]">
                        24 KARAT ALLOCATED BULLION
                      </span>
                      <div className="mono text-[9px] text-[var(--ink-3)]">SEGREGATED TITLE • LONDON GOOD DELIVERY</div>
                    </div>
                  </div>
                  <span className="mono text-[10px] font-black text-[var(--gold)] bg-[var(--tint)] border border-[var(--gold)]/40 px-2.5 py-0.5 rounded shadow-xs">
                    999.9 FINE GOLD PASS
                  </span>
                </div>

                <div className="mt-5 max-w-md">
                  <h3 className="font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)]">
                    Pure Sovereign Title in Allocated Vaults
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    Every token is legally paired to a specific serial-numbered 400 oz gold bar in Zurich or London. True bankruptcy-remote custody means the issuer can dissolve, and your gold remains untouched.
                  </p>

                  <div className="mt-4 space-y-1.5 font-mono text-[11px] text-[var(--ink)]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0" />
                      <span>Public bar-by-bar registry with real-time audit hashes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0" />
                      <span>Legal bailment agreement: holder holds direct property title</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0" />
                      <span>Unconditional physical redemption right to vaulted bars</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px]">
                <span className="text-[var(--ink-3)]">LEGAL STANDING:</span>
                <span className="font-bold text-[var(--gold)]">DIRECT PROPRIETARY OWNER</span>
              </div>
            </motion.div>

            {/* The Caliper Vertical Blade Needle - Spring Driven */}
            <motion.div
              style={{ left: caliperLeft }}
              className="absolute inset-y-0 w-1 bg-[var(--gold)] z-30 pointer-events-none -translate-x-1/2 shadow-[0_0_12px_var(--gold),0_0_0_1px_#fff] will-change-transform"
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 h-10 w-10 rounded-full border-2 border-white bg-[var(--dark)] flex items-center justify-center text-[var(--gold)] shadow-xl cursor-ew-resize">
                <span className="font-mono text-[10px] font-black">{displaySliderPct}%</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
