'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Stamp, Sparkles, Coffee } from 'lucide-react';

interface AuditorCatProps {
  className?: string;
}

/**
 * The Bureaucrat Auditor Cat Mascot:
 * An anti-mainstream character: grumpy banker cat passionately slamming
 * a heavy brass assay stamp onto cryptographic audit certificates.
 * Features:
 * - Real 2-frame physical stamping animation (arm raises high in the air & slams down)
 * - Impact shockwave & dynamic certificate stamp imprint reveal ("24K VERIFIED")
 * - Lazy tail swish loop
 * - Steaming espresso cup rising vapor particles
 * - Continuous ticker tape slide
 * - Interactive click-to-stamp & rapid audit mode
 * - 3D cursor perspective tilt tracking
 */
export default function AuditorCat({ className = '' }: AuditorCatProps) {
  const reduce = useReducedMotion();
  const [stampCount, setStampCount] = useState(1482);
  const [isArmUp, setIsArmUp] = useState(false);
  const [stampActive, setStampActive] = useState(false);
  const [stampText, setStampText] = useState('24K VERIFIED');
  const [isRapid, setIsRapid] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

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
      className={`relative select-none overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-3 shadow-md transition-colors hover:border-[var(--dark)] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleManualStamp}
      style={{ perspective: 1000 }}
      role="region"
      aria-label="The Bureaucrat Auditor Cat — Real Stamping Mascot"
      title="Click cat to speed up audit stamping!"
    >
      {/* Top status bar */}
      <div className="flex items-center justify-between border-b border-[var(--rule)] pb-2 text-[10px] font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--action)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--action)]" />
          </span>
          <span className="font-bold tracking-wider text-[var(--ink)]">
            CHIEF AUDITOR // THE BUREAUCRAT CAT
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--gold)]">
          <Coffee className="h-3 w-3" />
          <span className="font-semibold">{stampCount.toLocaleString()} AUDITED</span>
        </div>
      </div>

      {/* 3D Cat Stage */}
      <div className="relative flex h-52 sm:h-56 w-full items-center justify-center overflow-hidden">
        {/* Parallax Container */}
        <motion.div
          className="relative z-10 flex h-full w-full items-center justify-center"
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
              className="absolute right-[22%] bottom-[32%] z-0 h-16 w-8 rounded-full bg-[#1b1e22]"
              animate={{
                rotate: [-12, 14, -12],
                originX: 0.8,
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
            <div className="pointer-events-none absolute left-[26%] bottom-[42%] z-20" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute block h-3 w-1.5 rounded-full bg-[var(--ink-3)]/30 blur-[1px]"
                  animate={{
                    y: [0, -18, -28],
                    x: [0, (i - 1) * 4, (i - 1) * 8],
                    opacity: [0, 0.6, 0],
                    scale: [0.8, 1.2, 1.6],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: i * 0.6,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          )}

          {/* Stamping Cat Character (Arm Up vs Arm Down Slam) */}
          <div className="relative h-48 sm:h-52 w-48 sm:w-52">
            {/* Frame 1: Arm Raised High in the Air holding Stamp */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isArmUp ? 1 : 0,
                y: isArmUp ? -4 : 0,
                scale: isArmUp ? 1.01 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <Image
                src="/cat-up.png"
                alt="Auditor Cat arm raised high ready to stamp"
                fill
                priority
                sizes="(max-width: 640px) 210px, 240px"
                className="object-contain drop-shadow-[0_12px_24px_rgba(15,20,25,0.12)]"
              />
            </motion.div>

            {/* Frame 2: Arm Slammed Down Stamping Certificate */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isArmUp ? 0 : 1,
                y: isArmUp ? 0 : [ -4, 2, 0 ],
                scale: isArmUp ? 1 : [ 1.02, 0.98, 1 ],
              }}
              transition={{ duration: 0.14 }}
            >
              <Image
                src="/cat-down.png"
                alt="Auditor Cat arm stamping certificate down"
                fill
                priority
                sizes="(max-width: 640px) 210px, 240px"
                className="object-contain drop-shadow-[0_12px_24px_rgba(15,20,25,0.12)]"
              />
            </motion.div>

            {/* Impact Shockwave Ring on the Desk Certificate */}
            {!reduce && stampActive && (
              <motion.div
                className="absolute left-[44%] bottom-[24%] z-20 pointer-events-none h-10 w-14 rounded-full border-2 border-[var(--band-high)]"
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            )}

            {/* Live Certified Stamp Imprint */}
            <motion.div
              className="absolute left-[40%] bottom-[22%] z-30 pointer-events-none rotate-[-6deg] rounded border border-[var(--band-high)] bg-[var(--surface)]/90 px-1.5 py-0.5 shadow-sm"
              animate={
                stampActive
                  ? {
                      scale: [1.35, 1],
                      opacity: 1,
                    }
                  : {
                      scale: 1,
                      opacity: 0.95,
                    }
              }
              transition={{ duration: 0.18 }}
            >
              <div className="flex items-center gap-1 font-mono text-[8px] font-bold text-[var(--band-high)]">
                <Stamp size={9} />
                <span>{stampText}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Live On-chain Ticker Tape Ribbon */}
      <div className="relative mt-1 overflow-hidden rounded bg-[var(--surface-2)] py-1 px-2 font-mono text-[9px] text-[var(--ink-2)] border border-[var(--rule-soft)]">
        <motion.div
          className="flex whitespace-nowrap gap-4"
          animate={{ x: [0, -320] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          <span>PAXG • PURITY 712‰ • STAMPED [PASS]</span>
          <span>•</span>
          <span>XAUT • PURITY 512‰ • 24K BACKED</span>
          <span>•</span>
          <span>USDG • AUDITED • PHYSICAL GOLD VAULT</span>
          <span>•</span>
          <span>TETHER GOLD • 450‰ • CRUCIBLE VERIFIED</span>
          <span>•</span>
          <span>PAXG • PURITY 712‰ • STAMPED [PASS]</span>
          <span>•</span>
          <span>XAUT • PURITY 512‰ • 24K BACKED</span>
        </motion.div>
      </div>

      {/* Footer hallmark banner */}
      <div className="mt-2 flex items-center justify-between border-t border-[var(--rule)] pt-2 text-[9px] font-mono text-[var(--ink-3)]">
        <div className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-[var(--gold)]" />
          <span>CLICK CAT TO SPEED UP AUDIT</span>
        </div>
        <span className="text-[var(--gold)] font-bold">
          {isRapid ? '⚡ RAPID STAMPING' : 'REAL STAMPING LOOP'}
        </span>
      </div>
    </div>
  );
}
