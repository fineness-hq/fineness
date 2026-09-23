import Link from 'next/link';
import type { Venue } from '../../types';
import Reveal from './Reveal';

interface RegulatedTableProps {
  venues: Venue[];
}

/** Compliance standing view. Sorted by compliance desc, alphabetical tiebreak. */
export default function RegulatedTable({ venues }: RegulatedTableProps) {
  const rows = [...venues].sort(
    (a, b) => b.scores.compliance - a.scores.compliance || a.name.localeCompare(b.name),
  );
  return (
    <section aria-labelledby="regulated-title" id="regulated" className="page-wrap py-10">
      <Reveal>
      <p className="eyebrow">04 / regulated</p>
      <h2
        id="regulated-title"
        className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
      >
        Regulated standing
      </h2>
      <p className="prose mt-3 max-w-[66ch] text-base leading-relaxed text-[var(--ink-2)]">
        Compliance scores with the custodian behind each pairing. Claims below
        are editorial judgements on public documentation, not licenses.
      </p>
      <div className="mt-4 overflow-x-auto border border-[var(--rule)] bg-[var(--surface)]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--rule)]">
              {['Venue', 'Compl.', 'Custodian', 'Redeemable', 'Verifiability', 'Status'].map((h) => (
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
            {rows.map((v) => (
              <tr
                key={v.id}
                className="border-b border-[var(--rule)] transition-colors last:border-0 hover:bg-[var(--surface-2)]"
              >
                <th scope="row" className="px-3 py-2 text-sm font-semibold text-[var(--ink)]">
                  <Link href={`/venues/${v.id}`} className="site-link">
                    {v.name}
                  </Link>
                </th>
                <td className="mono px-3 py-2 text-sm font-semibold tabular-nums text-[var(--ink)]">
                  {v.scores.compliance}/10
                </td>
                <td className="mono px-3 py-2 text-sm tabular-nums text-[var(--ink-2)]">
                  {v.pairing.custodian ?? '—'}
                </td>
                <td className="mono px-3 py-2 text-sm tabular-nums text-[var(--ink-2)]">
                  {v.pairing.redeemable ? 'yes' : 'no'}
                </td>
                <td className="mono px-3 py-2 text-sm tabular-nums text-[var(--ink-2)]">
                  {v.pairing.verifiability}
                </td>
                <td className="mono px-3 py-2 text-sm tabular-nums text-[var(--ink-2)]">
                  {v.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Reveal>
    </section>
  );
}
