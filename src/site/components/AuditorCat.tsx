'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Stamp, Sparkles, Coffee, ArrowUpRight } from 'lucide-react';
import type { Venue } from '../../types';
import type { Band } from '../../scoring/fineness';
import { BAND_COLOR } from './Entry';

interface AuditorCatProps {
  className?: string;
  venues?: Venue[];
  onJump?: (id: string) => void;
  onSwitchToTable?: () => void;
}

/**
 * The Bureaucrat Auditor Cat Mascot (Seamless Editorial Hero):
 * Large, borderless, and integrated directly into the background canvas.
 * Features:
 * - Grand scale: ~480px tall, zero card wrapping
 * - Real 2-frame physical stamping animation (arm winds up high and slams down)
 * - Impact shockwave & dynamic certificate stamp imprint reveal ("24K VERIFIED")
 * - Lazy tail swish loop
 * - Steaming espresso cup rising vapor particles
 * - On-chain ticker tape ribbon
 * - Top-3 purity venue pills with live Karat scores
 * - Interactive click-to-stamp & rapid audit mode
 * - 3D cursor perspective tilt tracking
 */
export default function AuditorCat({
  className = '',
  venues = [],
  onJump,
  onSwitchToTable,
}: AuditorCatProps) {
  const reduce = useReducedMotion();
  const [stampCount, setStampCount] = useState(1482);
  const [isArmUp, setIsArmUp] = useState(false);
  const [stampActive, setStampActive] = useState(false);
  const [stampText, setStampText] = useState('24K VERIFIED');
  const [isRapid, setIsRapid] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);

  // Top 3 venues
  const top3 = venues.slice(0, 3);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsRapid(false);
  }

  // Real Stamping Arm Movement Loop
  useEffect(() => {
    if (reduce) return;

    let isMounted = true;
    let timer: NodeJS.Timeout;

    function runCycle() {
      if (!isMounted) return;

      // 1. Arm winds UP high in the air
      setIsArmUp(true);

      const upDuration = isRapid ? 350 : 700;
      const downHoldDuration = isRapid ? 300 : 600;
      const pauseDuration = isRapid ? 200 : 400;

      timer = setTimeout(() => {
        if (!isMounted) return;

        // 2. WHAM! Arm SLAMS down onto the desk certificate
        setIsArmUp(false);
        setStampActive(true);
        setStampCount((c) => c + 1);

        const phrases = ['24K VERIFIED', 'CRUCIBLE PASS', 'HALLMARK 999.9', 'PHYSICAL BACKED', '18K CLEARED'];
        setStampText(phrases[Math.floor(Math.random() * phrases.length)]);

        // 3. Keep stamp held down on certificate
        timer = setTimeout(() => {
          if (!isMounted) return;
          setStampActive(false);

          // 4. Brief pause before next audit cycle
          timer = setTimeout(runCycle, pauseDuration);
        }, downHoldDuration);
      }, upDuration);
    }

    runCycle();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [reduce, isRapid]);

  function handleManualStamp() {
    setIsRapid(true);
    setIsArmUp(false);
    setStampActive(true);
    setStampCount((c) => c + 1);
    setTimeout(() => {
      setStampActive(false);
    }, 300);
  }

  return (
    <div
      className={`relative w-full max-w-[540px] select-none flex flex-col items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleManualStamp}
      style={{ perspective: 1000 }}
      role="region"
      aria-label="The Bureaucrat Auditor Cat — Real Stamping Mascot"
      title="Click cat to speed up audit stamping!"
    >
      {/* Floating Status Bar (No Card Wrapper!) */}
      <div className="w-full flex items-center justify-between px-1 mb-2 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--action)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--action)]" />
          </span>
          <span className="font-bold tracking-wider text-[var(--ink)]">
            CHIEF AUDITOR // CRUCIBLE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-[var(--rule)] bg-[var(--surface)] px-2.5 py-0.5 shadow-xs text-[var(--gold)]">
            <Coffee className="h-3 w-3" />
            <span className="font-semibold tabular-nums">{stampCount.toLocaleString()} AUDITED</span>
          </div>

          {onSwitchToTable && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSwitchToTable();
              }}
              className="mono rounded border border-[var(--rule)] bg-[var(--surface)] px-2 py-0.5 text-[10px] font-semibold text-[var(--ink-2)] transition-colors hover:border-[var(--dark)] hover:text-[var(--ink)]"
            >
              TABLE VIEW →
            </button>
          )}
        </div>
      </div>

      {/* 3D Cat Stage — Seamlessly Sitting on the Background */}
      <div className="relative flex h-[340px] sm:h-[390px] md:h-[430px] w-full items-center justify-center overflow-visible">
        {/* Parallax Container */}
        <motion.div
          className="relative z-10 flex h-full w-full items-center justify-center cursor-pointer"
          style={
            reduce
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }
          }
        >
          {/* Lazy Tail Swish in Background */}
          {!reduce && (
            <motion.div
              className="absolute right-[22%] bottom-[28%] z-0 h-24 w-12 rounded-full bg-[#1b1e22]"
              animate={{
                rotate: [-14, 16, -14],
                originX: 0.85,
                originY: 1,
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}

          {/* Steaming Espresso Vapor Particles */}
          {!reduce && (
            <div className="pointer-events-none absolute left-[26%] bottom-[40%] z-20" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute block h-4 w-2 rounded-full bg-[var(--ink-3)]/30 blur-[1px]"
                  animate={{
                    y: [0, -22, -36],
                    x: [0, (i - 1) * 5, (i - 1) * 10],
                    opacity: [0, 0.7, 0],
                    scale: [0.8, 1.3, 1.8],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.65,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          )}

          {/* Grand Stamping Cat Character (Arm Up vs Arm Down Slam) */}
          <div className="relative h-[310px] sm:h-[360px] md:h-[400px] w-[310px] sm:w-[360px] md:w-[400px]">
            {/* Frame 1: Arm Raised High in the Air holding Stamp */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isArmUp ? 1 : 0,
                y: isArmUp ? -6 : 0,
                scale: isArmUp ? 1.015 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <Image
                src="/cat-up.png"
                alt="Auditor Cat arm raised high ready to stamp"
                fill
                priority
                sizes="(max-width: 640px) 320px, 420px"
                className="object-contain drop-shadow-[0_16px_32px_rgba(15,20,25,0.12)]"
              />
            </motion.div>

            {/* Frame 2: Arm Slammed Down Stamping Certificate */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isArmUp ? 0 : 1,
                y: isArmUp ? 0 : [ -5, 3, 0 ],
                scale: isArmUp ? 1 : [ 1.025, 0.975, 1 ],
              }}
              transition={{ duration: 0.14 }}
            >
              <Image
                src="/cat-down.png"
                alt="Auditor Cat arm stamping certificate down"
                fill
                priority
                sizes="(max-width: 640px) 320px, 420px"
                className="object-contain drop-shadow-[0_16px_32px_rgba(15,20,25,0.12)]"
              />
            </motion.div>

            {/* Impact Shockwave Ring on the Desk Certificate */}
            {!reduce && stampActive && (
              <motion.div
                className="absolute left-[44%] bottom-[23%] z-20 pointer-events-none h-14 w-20 rounded-full border-2 border-[var(--band-high)]"
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.38, ease: 'easeOut' }}
              />
            )}

            {/* Live Certified Stamp Imprint */}
            <motion.div
              className="absolute left-[40%] bottom-[21%] z-30 pointer-events-none rotate-[-6deg] rounded border border-[var(--band-high)] bg-[var(--surface)]/95 px-2 py-0.5 shadow-md"
              animate={
                stampActive
                  ? {
                      scale: [1.4, 1],
                      opacity: 1,
                    }
                  : {
                      scale: 1,
                      opacity: 0.95,
                    }
              }
              transition={{ duration: 0.18 }}
            >
              <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-[var(--band-high)]">
                <Stamp size={10} />
                <span>{stampText}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Ticker Tape Ribbon (Direct on Background) */}
      <div className="relative w-full overflow-hidden rounded border border-[var(--rule)] bg-[var(--surface)]/80 backdrop-blur-xs py-1.5 px-3 font-mono text-[10px] text-[var(--ink-2)] mt-1 shadow-xs">
        <motion.div
          className="flex whitespace-nowrap gap-5 font-medium"
          animate={{ x: [0, -380] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <span>PAXG • PURITY 712‰ • STAMPED [PASS]</span>
          <span className="text-[var(--gold)]">★</span>
          <span>XAUT • PURITY 512‰ • 24K BACKED</span>
          <span className="text-[var(--gold)]">★</span>
          <span>USDG • AUDITED • PHYSICAL GOLD VAULT</span>
          <span className="text-[var(--gold)]">★</span>
          <span>TETHER GOLD • 450‰ • CRUCIBLE VERIFIED</span>
          <span className="text-[var(--gold)]">★</span>
          <span>PAXG • PURITY 712‰ • STAMPED [PASS]</span>
          <span className="text-[var(--gold)]">★</span>
          <span>XAUT • PURITY 512‰ • 24K BACKED</span>
        </motion.div>
      </div>

      {/* Floating Top-3 Purity Pills (Seamless under desk) */}
      {top3.length > 0 && (
        <div className="w-full grid grid-cols-3 gap-2 mt-2">
          {top3.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onJump?.(v.id);
              }}
              className="group flex flex-col rounded border border-[var(--rule)] bg-[var(--surface)]/90 backdrop-blur-xs p-2 text-left transition-all hover:border-[var(--dark)] hover:shadow-xs hover:bg-[var(--surface)]"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold text-[var(--ink-3)]">0{i + 1}</span>
                <span
                  className="font-bold"
                  style={{ color: BAND_COLOR[v.band as Band] }}
                >
                  {v.fineness}‰
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="truncate text-xs font-semibold text-[var(--ink)] group-hover:text-[var(--action)]">
                  {v.name}
                </span>
                <ArrowUpRight size={11} className="text-[var(--ink-3)] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Hint row */}
      <div className="w-full flex items-center justify-between text-[9px] font-mono text-[var(--ink-3)] mt-2 px-1">
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-[var(--gold)]" />
          <span>CLICK CAT TO RAPID STAMP</span>
        </span>
        <span className="text-[var(--gold)] font-bold">
          {isRapid ? '⚡ RAPID STAMPING' : '60FPS ACTIVE LOOP'}
        </span>
      </div>
    </div>
  );
}
