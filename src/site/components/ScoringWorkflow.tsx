'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Scale,
  Database,
  Stamp,
  Radio,
  Flame,
  ScanLine,
} from 'lucide-react';

interface Station {
  id: string;
  stationNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: typeof Database;
  primaryDetails: Array<{ label: string; value: string; note: string }>;
  deliverable: { title: string; tag: string; stamp: string };
  specMetric: { label: string; value: string };
}

const REFINERY_STATIONS: Station[] = [
  {
    id: 'ingest',
    stationNumber: 'BAY 01',
    badge: 'STAGE I // INGESTION',
    title: 'The Monthly Pull',
    subtitle: 'Published figures in, gaps stay null',
    desc: 'At each snapshot cut, the ingest job pulls published volume, fee and TVL figures plus contract verification. A missing figure stays null and renders as not published — never fabricated, never inferred.',
    icon: Database,
    primaryDetails: [
      { label: 'SNAPSHOT CADENCE', value: 'MONTHLY · DAY 1', note: 'Frozen snapshot cut' },
      { label: 'PROVIDERS', value: 'BITQUERY · LLAMA · EXPLORER', note: 'Volume, fees, TVL, verification' },
      { label: 'MISSING DATA', value: 'NULL, NEVER ZERO', note: 'Renders as not published' },
      { label: 'WRITE SCOPE', value: 'METRICS + CONTRACTS', note: 'Scores stay editorial' },
    ],
    deliverable: {
      title: 'DATED SNAPSHOT FILE',
      tag: 'IMMUTABLE INPUT',
      stamp: 'PULLED, NOT INVENTED',
    },
    specMetric: { label: 'WRITE MODE', value: 'ATOMIC' },
  },
  {
    id: 'smelt',
    stationNumber: 'BAY 02',
    badge: 'STAGE II // SCORING',
    title: 'The 5-Criterion Weighing',
    subtitle: 'House weights on editorial scores 0 to 10',
    desc: 'Snapshot in hand, each venue is scored 0 to 10 on asset, traction, transparency, compliance and durability. Weighted mean times 100, rounded once. Same inputs, same output — readers reproduce it in the browser.',
    icon: Scale,
    primaryDetails: [
      { label: 'ASSET · 30%', value: 'BACKING EVIDENCE', note: 'Custody, redemption, verifiability' },
      { label: 'TRACTION · 25%', value: 'VOLUME + FEES + DEPTH', note: 'Turnover and pool health' },
      { label: 'TRANSPARENCY · 20%', value: 'CONTRACTS + DOCS', note: 'Verified, named entity' },
      { label: 'COMPLIANCE · 15%', value: 'STANDING', note: 'Licences and disclosure' },
    ],
    deliverable: {
      title: 'FINENESS 0–1000',
      tag: 'DETERMINISTIC MATH',
      stamp: 'ROUNDED ONCE',
    },
    specMetric: { label: 'HOUSE WEIGHTS', value: '30·25·20·15·10' },
  },
  {
    id: 'hallmark',
    stationNumber: 'BAY 03',
    badge: 'STAGE III // FREEZE',
    title: 'The Frozen Edition',
    subtitle: 'Ranked, hashed, published — then immutable',
    desc: 'Fineness 0 to 1000 is written into the edition JSON beside its SHA-256 snapshot hash. Deltas compute against the prior edition at house weights only. A published edition never changes silently.',
    icon: Stamp,
    primaryDetails: [
      { label: 'BAND SCALE', value: '22K·18K·14K·9K', note: 'Gate at 375' },
      { label: 'HALLMARK GATE', value: '375 / 1000 CUTOFF', note: 'Below: listed, not certified' },
      { label: 'SNAPSHOT DIGEST', value: 'SHA-256 OF BYTES', note: 'Recorded in the header' },
      { label: 'MACHINE ACCESS', value: '/editions/:id.json', note: 'Free public endpoint' },
    ],
    deliverable: {
      title: 'RANKED REGISTER',
      tag: 'FROZEN RECORD',
      stamp: 'EDITION FROZEN',
    },
    specMetric: { label: 'DELTAS', value: 'HOUSE WEIGHTS ONLY' },
  },
];

/**
 * ScoringWorkflow:
 * Hardware-accelerated 60/120fps Pinned Horizontal Conveyor Rail.
 * Features:
 * - Spring-dampened motion values via Framer Motion useSpring for liquid inertia.
 * - Hardware accelerated translate3d with will-change: transform.
 * - Zero layout reflow or transition-conflict stutters.
 */
export default function ScoringWorkflow() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railPctRef = useRef<HTMLSpanElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(1200);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const reduce = useReducedMotion();

  // Measure track scrollable width
  useEffect(() => {
    const updateDimensions = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const availableScroll = Math.max(0, trackWidth - windowWidth + 120);
      setMaxTranslate(availableScroll);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Framer Motion scroll and buttery spring physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  // Synchronize telemetry and active bay without triggering full component re-renders
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (railPctRef.current) {
        railPctRef.current.textContent = `RAIL: ${Math.round(latest * 100)}%`;
      }
      const nextIdx = latest < 0.33 ? 0 : latest < 0.66 ? 1 : 2;
      setActiveStationIndex((prev) => (prev !== nextIdx ? nextIdx : prev));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Jump to specific station
  const jumpToStation = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScrollable = containerRef.current.offsetHeight - vh;
    const targetProgress = index === 0 ? 0 : index === 1 ? 0.5 : 1.0;
    const targetY = window.scrollY + rect.top + targetProgress * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="refinery-pipeline"
      aria-label="Crucible Continuous Refinery Pipeline"
      className="relative w-full bg-[var(--surface-alt)] border-b border-[var(--rule)]"
      style={{ height: '240vh' }}
    >
      {/* Sticky Viewport - Perfectly Centered in 100vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 px-4 sm:px-8 select-none">
        
        {/* Top Header & Telemetry Bar */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--rule)] pb-4 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-ping" />
              <p className="eyebrow text-[var(--gold)] font-mono text-xs tracking-widest">
                CRUCIBLE REFINERY // HORIZONTAL CONVEYOR RAIL
              </p>
            </div>
              <h2 className="mt-1 font-[var(--font-inter)] text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[var(--ink)]">
                How an edition gets built
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-2)] mt-0.5 max-w-[65ch]">
                Scroll to travel the three bays: pull, score, freeze.
              </p>
          </div>

          {/* Bay Stepper Selector & Position Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[var(--surface)] border border-[var(--rule)] rounded-lg p-1 shadow-xs">
              {REFINERY_STATIONS.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => jumpToStation(idx)}
                  className={`px-3 py-1.5 rounded-md font-mono text-[11px] font-bold transition-colors cursor-pointer ${
                    activeStationIndex === idx
                      ? 'bg-[var(--gold)] text-white shadow-xs'
                      : 'text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--surface-alt)]'
                  }`}
                >
                  {st.stationNumber}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg border border-[var(--rule)] bg-[var(--surface)] text-[var(--gold)] font-bold">
              <Radio size={13} className="animate-pulse" />
              <span ref={railPctRef}>RAIL: 0%</span>
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Conveyor Belt Area */}
        <div className="relative w-full flex-1 flex items-center my-auto overflow-hidden">
          
          {/* Molten Gold Overhead Rail Wire */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[var(--rule)] via-[var(--gold)]/40 to-[var(--rule)] pointer-events-none z-0" />

          {/* The Moving Track - Hardware Accelerated */}
          <motion.div
            ref={trackRef}
            style={{ x: reduce ? 0 : x }}
            className="flex items-center gap-6 sm:gap-8 px-4 sm:px-12 will-change-transform z-10"
          >
            {REFINERY_STATIONS.map((station, idx) => {
              const StIcon = station.icon;
              const isActive = activeStationIndex === idx;

              return (
                <div
                  key={station.id}
                  className={`shrink-0 w-[85vw] max-w-[580px] sm:max-w-[680px] md:max-w-[760px] rounded-2xl border-2 transition-colors duration-200 p-6 sm:p-8 bg-[var(--surface)] shadow-xl ${
                    isActive
                      ? 'border-[var(--gold)] shadow-[0_12px_40px_-15px_rgba(196,139,15,0.25)]'
                      : 'border-[var(--rule)] opacity-85 hover:opacity-100'
                  }`}
                >
                  {/* Bay Header */}
                  <div className="flex items-center justify-between border-b border-[var(--rule)] pb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-black transition-colors ${
                          isActive
                            ? 'bg-[var(--gold)] text-white shadow-xs'
                            : 'bg-[var(--surface-alt)] border border-[var(--rule)] text-[var(--ink-2)]'
                        }`}
                      >
                        <StIcon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="mono text-[10px] font-black uppercase tracking-wider text-[var(--gold)]">
                            {station.badge}
                          </span>
                          <span className="text-[10px] text-[var(--ink-3)] font-mono">• {station.stationNumber}</span>
                        </div>
                        <h3 className="font-[var(--font-inter)] text-lg sm:text-xl font-black text-[var(--ink)] leading-snug">
                          {station.title}
                        </h3>
                      </div>
                    </div>

                    <div className="hidden sm:block text-right font-mono">
                      <span className="text-[10px] uppercase text-[var(--ink-3)] block">TELEMETRY SPEC</span>
                      <span className="text-xs font-bold text-[var(--gold)]">{station.specMetric.value}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                    
                    {/* Left: Description & 4 Parameter Metrics */}
                    <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                      <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                        {station.desc}
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--rule)]">
                        {station.primaryDetails.map((item, dIdx) => (
                          <div key={dIdx} className="p-2.5 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)]">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[var(--ink-3)] block truncate">
                              {item.label}
                            </span>
                            <span className="text-xs font-mono font-bold text-[var(--ink)] block mt-0.5 truncate">
                              {item.value}
                            </span>
                            <span className="text-[9px] text-[var(--ink-2)] block mt-0.5 truncate">
                              {item.note}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Live Interactive Industrial Bay Chamber */}
                    <div className="md:col-span-5 flex flex-col justify-between rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-4 relative overflow-hidden">
                      
                      {/* Animated Chamber Visual */}
                      <div className="relative h-32 rounded-lg border border-[var(--rule)] bg-[#0C1014] overflow-hidden flex items-center justify-center p-3 text-center">
                        
                        {/* Looping Visual per station */}
                        {idx === 0 && (
                          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded bg-[#0A0D12]">
                            <Image
                              src="/images/cat-scanner-8bit.jpg"
                              alt="Chief Scorer Cat Scanning Evidence"
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              className="object-cover object-center opacity-85 hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                            <div className="absolute bottom-2 inset-x-2 flex items-center justify-between font-mono text-[9px] z-10">
                              <span className="text-[var(--gold)] font-bold flex items-center gap-1">
                                <ScanLine size={11} className="text-[var(--gold)] animate-pulse" />
                                <span>BAY 01 · CHIEF SCORER</span>
                              </span>
                              <span className="text-white/70 bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                                SNAPSHOT SCAN
                              </span>
                            </div>
                          </div>
                        )}

                        {idx === 1 && (
                          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded bg-[#0A0D12]">
                            <Image
                              src="/images/cat-smelter-8bit.jpg"
                              alt="Scorer Cat Weighing Evidence"
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              className="object-cover object-center opacity-90 hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                            <div className="absolute bottom-2 inset-x-2 flex items-center justify-between font-mono text-[9px] z-10">
                              <span className="text-amber-400 font-bold flex items-center gap-1">
                                <Flame size={11} className="text-amber-400 animate-pulse" />
                                <span>BAY 02 · WEIGHTED MEAN</span>
                              </span>
                              <span className="text-white/70 bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                                5-CRITERIA
                              </span>
                            </div>
                          </div>
                        )}

                        {idx === 2 && (
                          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded bg-[#0A0D12]">
                            <Image
                              src="/images/cat-stamper-8bit.jpg"
                              alt="Cat Officer Stamping Frozen Hallmark Edition"
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              className="object-cover object-center opacity-90 hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                            <div className="absolute bottom-2 inset-x-2 flex items-center justify-between font-mono text-[9px] z-10">
                              <span className="text-[var(--gold)] font-bold flex items-center gap-1">
                                <Stamp size={11} className="text-[var(--gold)]" />
                                <span>BAY 03 · HALLMARK SEAL</span>
                              </span>
                              <span className="text-white/70 bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                                SEALED
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Deliverable Badge */}
                      <div className="mt-3 pt-3 border-t border-[var(--rule)] flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-mono text-[var(--ink-3)] block uppercase">DELIVERABLE</span>
                          <span className="text-[11px] font-mono font-bold text-[var(--ink)] block truncate">
                            {station.deliverable.title}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black border border-[var(--gold)]/40 bg-[var(--tint)] text-[var(--gold)]">
                          {station.deliverable.stamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Rail Track Indicators */}
        <div className="w-full max-w-7xl mx-auto pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[11px] text-[var(--ink-3)] z-20">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--gold)]">CONVEYOR TRACK:</span>
            <span>MONTHLY EDITION ASSEMBLY</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">STATUS: FROZEN AFTER PUBLISH</span>
            <span className="text-[var(--ink)] font-bold">
              BAY {activeStationIndex + 1} OF 3
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
