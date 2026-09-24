'use client';

import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';
import {
  Flame,
  FileX,
  Award,
  RefreshCw,
  XCircle,
  ShieldCheck,
  SlidersHorizontal,
  CheckCircle2,
} from 'lucide-react';

/**
 * CrucibleManifesto:
 * The Touchstone X-Ray Caliper Stage.
 * 
 * Scroll-Driven Pinned Behavior:
 * - 190svh container with sticky top-0 h-screen centered viewport.
 * - Scrolling down smoothly glides the golden caliper blade from left to right (20% to 85%),
 *   peeling the thin-backing layer to reveal the documented-backing layer beneath.
 * - Integrated with Framer Motion useSpring for 60-120fps liquid momentum.
 * - Interactive horizontal drag supported at any time.
 * - 3D holographic tilt with spring momentum.
 * - 1,064°C Thermal Smelt test with spark flash and permanent hallmark seal.
 */
export default function CrucibleManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [isDragging, setIsDragging] = useState(false);
  const [isSmelting, setIsSmelting] = useState(false);
  const [hasSmelted, setHasSmelted] = useState(false);
  const [displaySliderPct, setDisplaySliderPct] = useState(50);

  // Motion value for manual dragging and spring-driven scrolling
  const manualSliderPos = useMotionValue(50);

  // Scroll driven progression
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring dampening on scroll for liquid silk motion
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
    restDelta: 0.0005,
  });

  // Sync scroll to slider position if not manually dragging
  useEffect(() => {
    const unsubscribe = smoothScrollProgress.on('change', (latest) => {
      if (isDragging) return;
      // Map scroll progress (0.0 to 1.0) to reveal (20% to 88%)
      const target = 20 + latest * 68;
      manualSliderPos.set(target);
    });
    return () => unsubscribe();
  }, [smoothScrollProgress, isDragging, manualSliderPos]);

  // Spring-smoothed active slider value for clip-path and blade needle
  const activeSlider = useSpring(manualSliderPos, {
    stiffness: 160,
    damping: 25,
    mass: 0.35,
    restDelta: 0.001,
  });

  const clipPathValue = useTransform(activeSlider, (v) => `inset(0 0 0 ${100 - v}%)`);
  const caliperLeft = useTransform(activeSlider, (v) => `${100 - v}%`);

  // Update numerical percentage text smoothly
  useEffect(() => {
    return activeSlider.on('change', (v) => {
      setDisplaySliderPct(Math.round(v));
    });
  }, [activeSlider]);

  // 3D holographic tilt spring physics
  const mouseRotX = useMotionValue(0);
  const mouseRotY = useMotionValue(0);
  const smoothRotX = useSpring(mouseRotX, { stiffness: 180, damping: 22 });
  const smoothRotY = useSpring(mouseRotY, { stiffness: 180, damping: 22 });

  // Drag handlers for the caliper slider
  const updateSliderFromClientX = React.useCallback((clientX: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    // Invert because Layer 2 is clipped from right to left
    const pct = Math.round((1 - x / rect.width) * 100);
    manualSliderPos.set(Math.max(5, Math.min(95, pct)));
  }, [manualSliderPos]);

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
  }, [isDragging, updateSliderFromClientX]);

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
      manualSliderPos.set(95); // Reveal gold fully upon smelting
    }, 1000);
  }

  return (
    <section
      ref={containerRef}
      id="crucible-disclosure"
      aria-labelledby="manifesto-title"
      className="relative w-full border-b border-[var(--rule)] bg-[var(--surface-alt)] select-none"
      style={{ height: '190svh', minHeight: '1500px' }}
    >
      {/* Sticky Viewport - Perfectly Centered in 100vh with no cutoff */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 py-6">
        
        {/* Atmospheric Swiss Vault Backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-15 mix-blend-luminosity overflow-hidden"
        >
          <Image
            src="/images/swiss-vault-bg.jpg"
            alt="Swiss Gold Bullion Vault"
            fill
            sizes="100vw"
            className="object-cover object-center filter contrast-125"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-alt)] via-transparent to-[var(--surface-alt)]" />
        </div>

        {/* Subtle Ambient Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(196,139,15,0.08)_0%,transparent_60%)]"
        />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--tint)] px-3 py-1 font-mono text-[11px] font-bold text-[var(--gold)] mb-3 shadow-2xs">
            <Flame size={12} className="text-[var(--gold)] animate-pulse" />
            <span>THE BACKING GAP, ILLUSTRATED</span>
          </div>

          <h2
            id="manifesto-title"
            className="font-[var(--font-inter)] text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[var(--ink)] leading-tight"
          >
            From wrapper to backing.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed max-w-lg mx-auto">
            Drag the caliper from thin backing to documented backing — the gap the register scores. An illustration, not a venue.
          </p>
        </div>

        {/* Interactive Caliper Stage (Unified Dual-Layer Bullion Comparator) */}
        <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Caliper Control Header Bar */}
          <div className="w-full flex items-center justify-between pb-2 font-mono text-xs text-[var(--ink-3)]">
            <span className="flex items-center gap-1.5 text-red-600 font-bold">
              <FileX size={14} />
              <span>THIN BACKING ({100 - displaySliderPct}%)</span>
            </span>

            <span className="text-[11px] text-[var(--ink-3)] hidden sm:inline">
              ← SCROLL OR DRAG TO TRAVEL THE GAP →
            </span>

            <span className="flex items-center gap-1.5 text-[var(--gold)] font-bold">
              <Award size={14} />
              <span>DOCUMENTED BACKING ({displaySliderPct}%)</span>
            </span>
          </div>

          {/* Unified Comparison Viewer with Clip-Path & Hardware-Accelerated 3D Tilt */}
          <motion.div
            ref={trackRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              perspective: 1000,
              rotateX: reduce ? 0 : smoothRotX,
              rotateY: reduce ? 0 : smoothRotY,
            }}
            className="caliper-track relative w-full h-[360px] sm:h-[380px] rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] shadow-2xl overflow-hidden cursor-ew-resize will-change-transform"
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
                        THINLY BACKED VENUE
                      </span>
                      <div className="mono text-[9px] text-[var(--ink-3)]">WEAK EVIDENCE • THIN FLOW</div>
                    </div>
                  </div>
                  <span className="mono text-[10px] font-black text-red-600 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                    0 – 374 / 1000 · LISTED ONLY
                  </span>
                </div>

                <div className="mt-5 max-w-md">
                  <h3 className="font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)]">
                    When the backing file is empty
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    No named custodian, no verifiable inventory, no volume series. The score lands below the hallmark — listed, not certified.
                  </p>

                  <div className="mt-4 space-y-1.5 font-mono text-[11px] text-[var(--ink-2)]">
                    <div className="flex items-center gap-2">
                      <XCircle size={13} className="text-red-500 shrink-0" />
                      <span>No custodian named in the docs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle size={13} className="text-red-500 shrink-0" />
                      <span>No verifiable volume series</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle size={13} className="text-red-500 shrink-0" />
                      <span>Redemption terms undisclosed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px]">
                <span className="text-[var(--ink-3)]">EVIDENCE FILE:</span>
                <span className="font-bold text-red-600">EMPTY</span>
              </div>
            </div>

            {/* Layer 2 (Clipped Overlay): documented backing */}
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
                        DOCUMENTED BACKING
                      </span>
                      <div className="mono text-[9px] text-[var(--ink-3)]">NAMED CUSTODIAN • VERIFIABLE</div>
                    </div>
                  </div>
                  <span className="mono text-[10px] font-black text-[var(--gold)] bg-[var(--tint)] border border-[var(--gold)]/50 px-2.5 py-0.5 rounded shadow-2xs">
                    HIGH FINENESS · CERTIFIED
                  </span>
                </div>

                <div className="mt-5 max-w-md ml-auto text-right">
                  <h3 className="font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)]">
                    When the backing file is full
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    Named custodian, verifiable inventory, published volume. That evidence is what high fineness scores are made of.
                  </p>

                  <div className="mt-4 space-y-1.5 font-mono text-[11px] text-[var(--ink)] flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span>Custodian named in the docs</span>
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Inventory verifiable on-chain or by attestation</span>
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Volume series any reader can check</span>
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-3 border-t border-[var(--gold)]/30 flex items-center justify-between font-mono text-[10px]">
                <span className="text-[var(--ink-3)]">EVIDENCE FILE:</span>
                <span className="font-bold text-[var(--gold)]">DOCUMENTED</span>
              </div>
            </motion.div>

            {/* Draggable Brass Caliper Blade Divider - Spring Driven */}
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-[var(--gold)] shadow-[0_0_12px_var(--gold)] z-30 pointer-events-none will-change-transform"
              style={{ left: caliperLeft }}
            >
              {/* Center Caliper Thumb Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center h-10 w-10 rounded-full border-2 border-[var(--gold)] bg-[var(--dark)] text-[var(--gold)] shadow-xl cursor-grab active:cursor-grabbing pointer-events-auto">
                <SlidersHorizontal size={14} />
              </div>
            </motion.div>

            {/* Thermal Smelt Spark Flash Overlay */}
            {isSmelting && (
              <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-t from-amber-600/40 via-[var(--gold)]/30 to-transparent backdrop-blur-[2px] animate-pulse">
                <div className="flex flex-col items-center gap-2 rounded-xl bg-[var(--dark)] px-4 py-2 font-mono text-xs font-black text-[var(--gold)] shadow-2xl border border-[var(--gold)]">
                  <Flame size={28} className="text-amber-400 animate-bounce" />
                  <span>RECOMPUTING FINENESS</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Interactive Action Controls Bar Below Caliper */}
          <div className="mt-4 w-full flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--ink-2)] text-[11px]">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-ping" />
              <span>DRAG CALIPER BLADE OR SCROLL TO DISSECT LAYERS</span>
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
                    <span>WEIGHING THE EVIDENCE...</span>
                  </>
                ) : hasSmelted ? (
                  <>
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>WEIGHED AT HOUSE WEIGHTS</span>
                  </>
                ) : (
                  <>
                    <Flame size={13} className="text-[var(--gold)]" />
                    <span>RUN THE WEIGHING</span>
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
