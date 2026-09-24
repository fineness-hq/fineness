'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface CrucibleBullProps {
  className?: string;
}

/**
 * The Crucible Bull Mascot:
 * 3D-styled geometric marble & 24K gold bull mascot.
 * Features:
 * - Sinusoidal levitation & idle breathing loop
 * - Reactive cursor 3D parallax tilt with spring physics
 * - Dynamic ground shadow synced to levitation cycle
 * - Floating gold crystalline embers
 * - Luxury Web3 hallmark tags
 */
export default function CrucibleBull({ className = '' }: CrucibleBullProps) {
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

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
    setIsHovered(false);
  }

  return (
    <div
      className={`relative select-none overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-3 shadow-md transition-colors hover:border-[var(--gold)] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      {/* Top status bar */}
      <div className="flex items-center justify-between border-b border-[var(--rule)] pb-2 text-[10px] font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--gold)]" />
          </span>
          <span className="font-bold tracking-wider text-[var(--ink)]">
            CRUCIBLE BULL // GUARDIAN OF PURITY
          </span>
        </div>
        <div className="flex items-center gap-1 text-[var(--gold)]">
          <Sparkles className="h-3 w-3" />
          <span className="font-semibold">24K BACKING</span>
        </div>
      </div>

      {/* 3D Mascot Stage */}
      <div className="relative flex h-48 sm:h-52 w-full items-center justify-center overflow-hidden">
        {/* Floating background ambient gold embers */}
        {!reduce && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {[
              { left: '15%', top: '25%', size: 5, delay: 0 },
              { left: '80%', top: '20%', size: 4, delay: 1.2 },
              { left: '25%', top: '70%', size: 6, delay: 2.1 },
              { left: '72%', top: '65%', size: 4, delay: 0.8 },
              { left: '48%', top: '15%', size: 5, delay: 1.8 },
            ].map((p, idx) => (
              <motion.span
                key={idx}
                className="absolute block bg-[var(--gold)]"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                }}
                animate={{
                  y: [0, -14, 0],
                  opacity: [0.3, 0.9, 0.3],
                  rotate: [0, 90, 180],
                }}
                transition={{
                  duration: 3 + idx * 0.4,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}

        {/* 3D Interactive Mascot Container */}
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
          {/* Dynamic Ground Shadow */}
          <motion.div
            className="absolute bottom-2 h-5 w-48 rounded-full bg-[var(--dark)]/25 blur-md"
            animate={
              reduce
                ? undefined
                : {
                    scale: [1, 0.85, 1],
                    opacity: [0.35, 0.18, 0.35],
                  }
            }
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Floating Bull Mascot */}
          <motion.div
            className="relative h-44 sm:h-48 w-44 sm:w-48"
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -9, 0],
                    rotate: [0, 0.5, 0],
                  }
            }
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/mascot-bull.png"
              alt="The Crucible Bull Mascot"
              fill
              priority
              sizes="(max-width: 640px) 180px, 200px"
              className="object-contain drop-shadow-[0_12px_24px_rgba(15,20,25,0.14)]"
            />

            {/* Subtle specular sheen overlay */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-[var(--gold)]/15 to-transparent transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                clipPath: 'polygon(30% 0, 100% 0, 70% 100%, 0 100%)',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer hallmark banner */}
      <div className="mt-1 flex items-center justify-between border-t border-[var(--rule)] pt-2 text-[9px] font-mono text-[var(--ink-2)]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3 w-3 text-[var(--gold)]" />
          <span>NET WT 1000g • HALLMARK REGISTER</span>
        </div>
        <span className="text-[var(--gold)] font-bold">
          {isHovered ? 'PARALLAX ACTIVE' : 'ORBITAL 60FPS'}
        </span>
      </div>
    </div>
  );
}
