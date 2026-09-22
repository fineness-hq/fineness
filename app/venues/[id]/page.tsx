import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CRITERIA } from '../../../src/scoring/fineness';
import Footer from '../../../src/site/components/Footer';
import Masthead from '../../../src/site/components/Masthead';
import { EDITIONS, LATEST_EDITION } from '../../../src/site/editions';

// Ordered oldest to newest. Append future editions in src/site/editions.ts.

export function generateStaticParams() {
  return EDITIONS[0].venues.map((v) => ({ id: v.id }));
}

export const dynamicParams = false;

interface VenuePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: VenuePageProps): Promise<Metadata> {
  const { id } = await params;
  const venue = EDITIONS.flatMap((e) => e.venues).find((v) => v.id === id);
  return {
    title: venue ? `Fineness — ${venue.name}` : 'Fineness — Venue',
    description: venue
      ? `${venue.name} fineness history across editions. ${venue.thesis}`
      : 'Venue history across Fineness editions.',
  };
}

const W = 600;
const H = 140;
const TOP = 20;
const BOTTOM = 120;

function y(fineness: number): number {
  return BOTTOM - (fineness / 1000) * (BOTTOM - TOP);
}

function x(index: number, count: number): number {
  if (count === 1) return W / 2;
  return 20 + (index * (W - 40)) / (count - 1);
}

/** Venue history across editions with a fineness sparkline. Unknown ids 404. */
export default async function VenuePage({ params }: VenuePageProps) {
  const { id } = await params;
  const records = EDITIONS.map((edition) => ({
    edition: edition.edition,
    venue: edition.venues.find((v) => v.id === id) ?? null,
  })).filter((r) => r.venue !== null) as { edition: string; venue: (typeof EDITIONS)[number]['venues'][number] }[];
  if (records.length === 0) notFound();
  const current = records[records.length - 1].venue;
  const points = records.map((r, i) => ({ x: x(i, records.length), y: y(r.venue.fineness) }));
  const line = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  return (
    <main>
      <Masthead edition={LATEST_EDITION.edition} />
      <div className="mx-auto max-w-5xl px-4 pb-4 pt-12">
        <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">
          <Link href="/" className="underline-offset-4 hover:underline">
            Register
          </Link>
          {' / venue'}
        </p>
        <h1 className="mt-4 font-[var(--font-inter)] text-4xl font-extrabold tracking-tight text-[var(--ink)]">
          {current.name}
        </h1>
        <p className="mono mt-2 text-xs text-[var(--ink-3)]">
          {current.chain} · admitted {current.admittedEdition} · status {current.status}
        </p>
        <p className="prose mt-4 max-w-[66ch] text-lg leading-relaxed text-[var(--ink-2)]">
          {current.thesis}
        </p>
      </div>

      <section aria-labelledby="history-title" className="mx-auto max-w-5xl px-4 py-10">
        <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">01 / history</p>
        <h2
          id="history-title"
          className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
        >
          Fineness over time
        </h2>
        <div className="mt-4 border border-[var(--rule)] bg-[var(--surface)] p-4">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`Fineness history for ${current.name}: ${records.map((r) => `${r.edition} ${r.venue.fineness}`).join(', ')}`}
            className="h-auto w-full"
          >
            <line
              x1={0}
              x2={W}
              y1={y(375)}
              y2={y(375)}
              stroke="var(--band-none)"
              strokeWidth={1}
              strokeDasharray="6 4"
            />
            <text x={W - 4} y={y(375) - 6} textAnchor="end" fontSize={11} fill="var(--band-none)">
              Hallmark 375
            </text>
            {points.length > 1 && (
              <polyline points={line} fill="none" stroke="var(--maroon)" strokeWidth={2} />
            )}
            {points.map((p, i) => (
              <g key={records[i].edition}>
                <circle cx={p.x} cy={p.y} r={5} fill="var(--maroon)" />
                <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize={12} fill="var(--ink)">
                  {records[i].venue.fineness}
                </text>
                <text x={p.x} y={H - 4} textAnchor="middle" fontSize={11} fill="var(--ink-3)">
                  {records[i].edition}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="mt-4 overflow-x-auto border border-[var(--rule)] bg-[var(--surface)]">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--rule)]">
                {['Edition', 'Fineness', 'Band', 'Rank'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="mono px-4 py-2 text-xs uppercase tracking-widest text-[var(--ink-3)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.edition} className="border-b border-[var(--rule)] last:border-0">
                  <th scope="row" className="mono px-4 py-2 text-sm tabular-nums text-[var(--ink)]">
                    {r.edition}
                  </th>
                  <td className="mono px-4 py-2 text-sm font-semibold tabular-nums text-[var(--ink)]">
                    {r.venue.fineness}
                  </td>
                  <td className="mono px-4 py-2 text-sm tabular-nums text-[var(--ink-2)]">{r.venue.band}</td>
                  <td className="mono px-4 py-2 text-sm tabular-nums text-[var(--ink-2)]">{r.venue.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="scores-title" className="mx-auto max-w-5xl px-4 py-10">
        <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">02 / scores</p>
        <h2
          id="scores-title"
          className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
        >
          Current scores
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {CRITERIA.map((c) => (
            <div key={c} className="border border-[var(--rule)] bg-[var(--surface)] p-3">
              <p className="flex items-baseline justify-between">
                <span className="mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">{c}</span>
                <span className="mono text-sm font-semibold tabular-nums text-[var(--ink)]">
                  {current.scores[c]}/10
                </span>
              </p>
              <p className="prose mt-1 text-sm leading-relaxed text-[var(--ink-2)]">
                {current.rationale[c]}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer edition={LATEST_EDITION.edition} />
    </main>
  );
}
