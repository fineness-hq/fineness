'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Activity, ShieldAlert, Award, Calendar } from 'lucide-react';
import type { Venue } from '../../types';
import CountUp from './CountUp';

interface StatRowProps {
  venues: Venue[];
  dataAsOf: string;
}

/**
 * Edition telemetry strip:
 * One ruled bar, four cells split by hairlines. Label over numeral,
 * unit inline. Compact by design — no dead space.
 */
export default function StatRow({ venues, dataAsOf }: StatRowProps) {
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

  return (
    <section aria-label="Edition Telemetry" className="relative border-b border-[var(--rule)] bg-[var(--surface-alt)]/80 backdrop-blur-xs">
      {/* Bullion gold accent hairline */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80" />

      <div className="page-wrap py-4">
        <motion.dl
          className="grid grid-cols-2 divide-y divide-[var(--rule)] rounded-lg border border-[var(--rule)] bg-[var(--surface)] shadow-xs sm:grid-cols-4 sm:divide-x sm:divide-y-0"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 0.33, 0.3, 1] }}
        >
          {stats.map(({ label, value, unit, icon: Icon }, idx) => (
            <div
              key={label}
              className="group relative flex flex-col justify-between p-4 transition-colors hover:bg-[var(--tint)]/40"
            >
              {/* Subtle index mark */}
              <span className="mono absolute right-3 top-3 text-[9px] font-semibold text-[var(--ink-3)] opacity-40 group-hover:opacity-100 transition-opacity">
                0{idx + 1}
              </span>

              <dt className="mono flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--ink-2)]">
                <span className="flex h-5 w-5 items-center justify-center rounded border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--gold)] shadow-2xs group-hover:border-[var(--gold)] group-hover:bg-[var(--dark)] group-hover:text-white transition-all">
                  <Icon size={11} aria-hidden="true" />
                </span>
                {label}
              </dt>

              <dd className="mono mt-3 flex items-baseline gap-2 text-[26px] font-extrabold tabular-nums leading-none tracking-tight text-[var(--ink)]">
                {typeof value === 'number' ? (
                  <CountUp value={value} />
                ) : (
                  <span className="whitespace-nowrap text-[20px]">{value}</span>
                )}
                <span className="mono rounded border border-[var(--rule)] bg-[var(--surface-alt)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--ink-2)]">
                  {unit}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
