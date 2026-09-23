import Link from 'next/link';
import type { Venue } from '../../types';
import { dash } from '../lib/format';
import Reveal from './Reveal';
import { WordText } from './Stagger';

interface ComparisonTableProps {
  venues: Venue[];
}

/** Side-by-side criterion comparison. Scrolls inside its container. */
export default function ComparisonTable({ venues }: ComparisonTableProps) {
  return (
    <section aria-labelledby="compare-title" id="comparison" className="page-wrap py-10">
      <Reveal>
      <p className="eyebrow">03 / comparison</p>
      <h2
        id="compare-title"
        className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
      >
        <WordText text="Comparison" />
      </h2>
      <div className="mt-4 overflow-x-auto border border-[var(--rule)] bg-[var(--surface)]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--rule)]">
              {['Venue', 'Asset', 'Traction', 'Transp.', 'Compl.', 'Durab.', 'Fineness'].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="mono px-3 py-2 text-xs uppercase tracking-widest text-[var(--ink-3)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {venues.map((v) => (
              <tr
                key={v.id}
                className="border-b border-[var(--rule)] transition-colors last:border-0 hover:bg-[var(--surface-2)]"
              >
                <th scope="row" className="px-3 py-2 text-sm font-semibold text-[var(--ink)]">
                  <Link href={`/venues/${v.id}`} className="site-link">
                    {v.name}
                  </Link>
                </th>
                {(
                  [v.scores.asset, v.scores.traction, v.scores.transparency, v.scores.compliance, v.scores.durability] as number[]
                ).map((s, i) => (
                  <td key={i} className="mono px-3 py-2 text-sm tabular-nums text-[var(--ink-2)]">
                    {s}
                  </td>
                ))}
                <td className="mono px-3 py-2 text-sm font-semibold tabular-nums text-[var(--ink)]">
                  {v.fineness}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mono mt-2 text-xs text-[var(--ink-3)]">
        Daily volume sample: {dash(venues[0]?.metrics.dailyVolumeUsd ?? null)} ({venues[0]?.name ?? '—'})
      </p>
      </Reveal>
    </section>
  );
}
