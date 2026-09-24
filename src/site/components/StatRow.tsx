'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Activity, ShieldAlert, Award, Calendar } from 'lucide-react';
import type { Venue } from '../../types';
import CountUp from './CountUp';

interface StatRowProps {
  venues: Venue[];
  dataAsOf: string;
}

/**
 * Edition telemetry strip:
 * One ruled bar, four cells split by hairlines.
 * Enhanced with a scroll-driven laser hairline and staggered parallax entry.
 */
export default function StatRow({ venues, dataAsOf }: StatRowProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const sorted = [...venues].map((v) => v.fineness).sort((a, b) => a - b);
  const median =
    sorted.length === 0
      ? 0
      : sorted.length % 2 === 1
        ? sorted[(sorted.length - 1) / 2]
        : Math.round((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2);
  const below = venues.filter((v) => v.fineness < 375).length;

  const stats = [
    { label: 'Venues Listed', value: venues.length, unit: 'ADMITTED', icon: Activity },
    { label: 'Median Fineness', value: median, unit: '/ 1000 PURITY', icon: Award },
    { label: 'Below Hallmark', value: below, unit: '< 375 CUT', icon: ShieldAlert },
    { label: 'Data As Of', value: dataAsOf, unit: 'UTC FROZEN', icon: Calendar },
  ];

  // Scroll-driven top laser hairline sweep
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const laserScaleX = useTransform(scrollYProgress, [0, 0.4], reduce ? [1, 1] : [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="Edition Telemetry"
      className="relative border-b border-[var(--rule)] bg-[var(--surface-alt)]/80 backdrop-blur-xs overflow-hidden"
    >
      {/* Scroll-driven bullion gold accent laser */}
      <motion.div
        style={{ scaleX: laserScaleX, transformOrigin: 'left' }}
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)] shadow-[0_0_8px_var(--gold)] z-10"
      />

      <div className="page-wrap py-4">
        <dl className="grid grid-cols-2 divide-y divide-[var(--rule)] rounded-lg border border-[var(--rule)] bg-[var(--surface)] shadow-xs sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {stats.map(({ label, value, unit, icon: Icon }, idx) => (
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 0.33, 0.3, 1] }}
              className="group relative flex flex-col justify-between p-4 transition-colors hover:bg-[var(--tint)]/40"
            >
              <dt className="mono flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--ink-2)]">
                <span className="flex h-5 w-5 items-center justify-center rounded border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--gold)] shadow-2xs group-hover:border-[var(--gold)] group-hover:bg-[var(--dark)] group-hover:text-white transition-all">
                  <Icon size={11} />
                </span>
                <span>{label}</span>
              </dt>

              <dd className="mt-2.5 flex items-baseline gap-1.5 font-[var(--font-inter)] text-2xl sm:text-3xl font-black text-[var(--ink)]">
                {typeof value === 'number' ? (
                  <span className="tabular-nums">
                    <CountUp value={value} />
                  </span>
                ) : (
                  <span className="mono text-lg font-extrabold text-[var(--ink)]">{value}</span>
                )}
                <span className="mono text-[10px] font-bold text-[var(--gold)]">{unit}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
