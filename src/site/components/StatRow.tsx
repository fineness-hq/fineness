import { Activity, ShieldAlert, Award, Calendar } from 'lucide-react';
import type { Venue } from '../../types';
import CountUp from './CountUp';

interface StatRowProps {
  venues: Venue[];
  dataAsOf: string;
}

/**
 * Web3 Telemetry Bento Row:
 * Realtime cryptographic and financial statistics with animated count-up numbers,
 * status indicators, and sleek tabular figures.
 */
export default function StatRow({ venues, dataAsOf }: StatRowProps) {
  const sorted = [...venues].map((v) => v.fineness).sort((a, b) => a - b);
  const median =
    sorted.length === 0
      ? 0
      : sorted.length % 2 === 1
        ? sorted[(sorted.length - 1) / 2]
        : Math.round((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2);
  const below = venues.filter((v) => v.fineness < 375).length;

  const stats = [
    {
      label: 'Venues Listed',
      value: venues.length,
      unit: 'ADMITTED',
      icon: Activity,
      color: 'text-[var(--dark)]',
    },
    {
      label: 'Median Fineness',
      value: median,
      unit: '‰ PURITY',
      icon: Award,
      color: 'text-[var(--gold)]',
    },
    {
      label: 'Below Hallmark',
      value: below,
      unit: '< 375 CUT',
      icon: ShieldAlert,
      color: 'text-[var(--band-none)]',
    },
    {
      label: 'Data As Of',
      value: dataAsOf,
      unit: 'UTC FROZEN',
      icon: Calendar,
      color: 'text-[var(--action)]',
    },
  ];

  return (
    <section aria-label="Edition Telemetry" className="border-b border-[var(--rule)] bg-[var(--surface-alt)]">
      <div className="page-wrap py-4">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ label, value, unit, icon: Icon, color }) => (
            <div
              key={label}
              className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-xs transition-all hover:border-[var(--dark)] hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <dt className="mono text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-3)]">
                  {label}
                </dt>
                <Icon size={14} className={`${color} transition-transform group-hover:scale-110`} />
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <dd className="mono text-2xl font-bold tabular-nums tracking-tight text-[var(--ink)]">
                  {typeof value === 'number' ? <CountUp value={value} /> : value}
                </dd>
                <span className="mono text-[9px] font-semibold uppercase tracking-widest text-[var(--ink-3)]">
                  {unit}
                </span>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
