'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Stamp, Sparkles, Coffee } from 'lucide-react';

interface AuditorCatProps {
  className?: string;
  /** Venues assayed in this edition - honest base for the counter. */
  baseCount?: number;
}

/**
 * The Bureaucrat Auditor Cat Mascot (Seamless Editorial Hero):
 * Large, borderless, and integrated directly into the background canvas.
 * Features:
 * - Grand scale: ~480px tall, zero card wrapping
 * - Real 2-frame physical stamping animation (arm winds up high and slams down)
 * - Impact shockwave & dynamic certificate stamp imprint reveal ("24K ASSAYED")
 * - Lazy tail swish loop
 * - Steaming espresso cup rising vapor particles
 * - On-chain ticker tape ribbon
 * - Interactive click-to-stamp & rapid assay mode
 * - 3D cursor perspective tilt tracking
 */
function formatNumber(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const STAMP_PHRASES = ['24K ASSAYED', 'CRUCIBLE PASS', 'HALLMARK 375+', 'PHYSICAL BACKED', '18K CLEARED'];

export default function AuditorCat({ className = '', baseCount = 0 }: AuditorCatProps) {
  const reduce = useReducedMotion();
  const [stampCount, setStampCount] = useState(baseCount);
  const [isArmUp, setIsArmUp] = useState(false);
  const [stampActive, setStampActive] = useState(false);
  const [stampText, setStampText] = useState('24K ASSAYED');
  const [isRapid, setIsRapid] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);

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

        const phrases = STAMP_PHRASES;
        setStampText(phrases[Math.floor(Math.random() * phrases.length)]);

        // 3. Keep stamp held down on certificate
        timer = setTimeout(() => {
          if (!isMounted) return;
          setStampActive(false);

          // 4. Brief pause before next stamp cycle
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
      className={`relative w-full select-none flex flex-col items-end ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleManualStamp}
      style={{ perspective: 1000 }}
      role="region"
      aria-label="The Bureaucrat Assayer Cat, real stamping mascot"
      title="Click cat to speed up assay stamping!"
    >
      {/* Floating Status Bar (Direct on background) */}
      <div className="w-full flex items-center justify-end gap-2 px-1 mb-1 font-mono text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--action)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--action)]" />
          </span>
          <span className="font-bold tracking-wider text-[var(--ink)]">
            CHIEF ASSAYER
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-[var(--rule)] bg-[var(--surface)]/90 backdrop-blur-xs px-2.5 py-0.5 shadow-xs text-[var(--gold)]">
          <Coffee className="h-3 w-3" />
          <span suppressHydrationWarning className="font-semibold tabular-nums">
            {formatNumber(stampCount)} ASSAYED
          </span>
        </div>
      </div>

      {/* 3D Cat Stage - Seamlessly Sitting on Background Canvas.
          Bottom fades into the page bg so the cut edge melts away. */}
      <div
        className="relative flex h-[400px] sm:h-[470px] md:h-[530px] w-full items-center justify-end overflow-visible"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, #000 12%, #000 76%, transparent 97%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, #000 12%, #000 76%, transparent 97%)',
        }}
      >
        {/* Parallax Container */}
        <motion.div
          className="relative z-10 flex h-full w-full items-center justify-end cursor-pointer"
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
              className="absolute right-[12%] bottom-[28%] z-0 h-20 w-10 rounded-full bg-[#1b1e22]"
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
            <div className="pointer-events-none absolute right-[54%] bottom-[40%] z-20" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute block h-3.5 w-1.5 rounded-full bg-[var(--ink-3)]/30 blur-[1px]"
                  animate={{
                    y: [0, -20, -32],
                    x: [0, (i - 1) * 4, (i - 1) * 8],
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

          {/* Grand Stamping Cat Character (Arm Up vs Arm Down Slam).
              Left edge fades so it melts into the bg instead of a hard cut. */}
          <div
            className="relative h-[380px] sm:h-[450px] md:h-[510px] w-[380px] sm:w-[450px] md:w-[510px]"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, #000 14%, #000 84%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, #000 14%, #000 84%, transparent 100%)',
            }}
          >
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
                alt="Assayer Cat arm raised high ready to stamp"
                fill
                priority
                sizes="(max-width: 640px) 380px, 510px"
                className="object-contain drop-shadow-[0_14px_28px_rgba(15,20,25,0.12)]"
              />
            </motion.div>

            {/* Frame 2: Arm Slammed Down Stamping Certificate */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isArmUp ? 0 : 1,
                y: isArmUp ? 0 : [-5, 3, 0],
                scale: isArmUp ? 1 : [1.025, 0.975, 1],
              }}
              transition={{ duration: 0.14 }}
            >
              <Image
                src="/cat-down.png"
                alt="Assayer Cat arm stamping certificate down"
                fill
                priority
                sizes="(max-width: 640px) 380px, 510px"
                className="object-contain drop-shadow-[0_14px_28px_rgba(15,20,25,0.12)]"
              />
            </motion.div>

            {/* Impact Shockwaves on the Desk Certificate (double ring) */}
            {!reduce && stampActive && (
              <>
                <motion.div
                  className="absolute left-[44%] bottom-[29%] z-20 pointer-events-none h-12 w-18 rounded-full border-2 border-[var(--band-high)]"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.38, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute left-[44%] bottom-[29%] z-20 pointer-events-none h-12 w-18 rounded-full border border-[var(--gold)]"
                  initial={{ scale: 0.4, opacity: 0.9 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
                />
              </>
            )}

            {/* Ink burst particles on every slam */}
            {!reduce && stampActive && (
              <div className="pointer-events-none absolute left-[46%] bottom-[31%] z-30" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  return (
                    <motion.span
                      key={`${stampCount}-${i}`}
                      className="absolute block h-1.5 w-1.5 rounded-full bg-[var(--band-high)]"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos(angle) * (22 + (i % 3) * 10),
                        y: Math.sin(angle) * (16 + (i % 2) * 8),
                        opacity: 0,
                        scale: 0.3,
                      }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    />
                  );
                })}
              </div>
            )}

            {/* Main Certified Stamp Imprint - big slam, double ring, grunge tilt */}
            <motion.div
              className="absolute left-[36%] bottom-[27%] z-30 pointer-events-none rotate-[-6deg] rounded-md border-[3px] border-[var(--band-high)] bg-[var(--surface)]/95 px-3 py-1.5 shadow-lg"
              style={{ boxShadow: 'inset 0 0 0 1px var(--surface), inset 0 0 0 2px var(--band-high), 0 6px 16px rgba(15,20,25,0.25)' }}
              animate={
                stampActive
                  ? { scale: [1.7, 0.94, 1], rotate: [-12, -4, -6], opacity: 1 }
                  : { scale: 1, rotate: -6, opacity: 0.95 }
              }
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-1.5 rounded-sm border border-dashed border-[var(--band-high)] px-1.5 py-0.5 font-mono text-[13px] font-bold tracking-widest text-[var(--band-high)]">
                <Stamp size={14} />
                <span>{stampText}</span>
          </div>
        </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Stamp Hint */}
      <div className="w-full flex items-center justify-end text-[9px] font-mono text-[var(--ink-3)] mt-1 px-1">
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-[var(--gold)]" />
          <span>CLICK CAT TO SPEED UP ASSAY</span>
          <span className="text-[var(--gold)] font-bold ml-1">
            {isRapid ? 'RAPID' : 'ACTIVE'}
          </span>
        </span>
      </div>
    </div>
  );
}
