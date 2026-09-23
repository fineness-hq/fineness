import type { Venue } from '../../types';
import CountUp from './CountUp';

interface StatRowProps {
  venues: Venue[];
  dataAsOf: string;
}

/** Headline numbers for the edition. All numerals use tabular figures. */
export default function StatRow({ venues, dataAsOf }: StatRowProps) {
  const sorted = [...venues].map((v) => v.fineness).sort((a, b) => a - b);
  const median =
    sorted.length === 0
      ? 0
      : sorted.length % 2 === 1
        ? sorted[(sorted.length - 1) / 2]
        : Math.round((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2);
  const below = venues.filter((v) => v.fineness < 375).length;
  const stats: [string, string | number][] = [
    ['Venues listed', venues.length],
    ['Median fineness', median],
    ['Below hallmark', below],
    ['Data as of', dataAsOf],
  ];
  return (
    <dl
      className="grid grid-cols-2 gap-px overflow-hidden border-b border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-4"
      style={{ boxShadow: 'inset 0 3px 0 var(--dark)' }}
    >
      {stats.map(([label, value]) => (
        <div key={label} className="bg-[var(--surface)] px-4 py-4">
          <dt className="mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">{label}</dt>
          <dd className="mono mt-1 text-2xl tabular-nums text-[var(--ink)]">
            {typeof value === 'number' ? <CountUp value={value} /> : value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
