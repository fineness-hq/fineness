import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Award, ArrowLeft, ArrowRight } from 'lucide-react';
import { CRITERIA, HOUSE_WEIGHTS } from '../../../src/scoring/fineness';
import Footer from '../../../src/site/components/Footer';
import Masthead from '../../../src/site/components/Masthead';
import { EDITIONS, LATEST_EDITION } from '../../../src/site/editions';

export function generateStaticParams() {
  // Union across every edition so later admissions get pages too.
  const ids = new Set(EDITIONS.flatMap((e) => e.venues.map((v) => v.id)));
  return [...ids].map((id) => ({ id }));
}

export const dynamicParams = false;

interface VenuePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: VenuePageProps): Promise<Metadata> {
  const { id } = await params;
  const venue = EDITIONS.flatMap((e) => e.venues).find((v) => v.id === id);
  return {
    title: venue ? `Fineness — ${venue.name} (${venue.fineness}/1000)` : 'Fineness — Venue Dossier',
    description: venue
      ? `${venue.name} fineness dossier across editions. ${venue.thesis}`
      : 'Venue history across Fineness editions.',
  };
}

const W = 680;
const H = 160;
const TOP = 24;
const BOTTOM = 125;

function y(fineness: number): number {
  return BOTTOM - (fineness / 1000) * (BOTTOM - TOP);
}

function x(index: number, count: number): number {
  if (count <= 1) return W / 2;
  return 40 + (index * (W - 80)) / (count - 1);
}

const CRITERION_META: Record<string, { label: string; weight: string; tag: string }> = {
  assetQuality: { label: 'Asset Quality & Backing', weight: '30%', tag: 'PHYSICAL ALLOCATION' },
  traction: { label: 'Secondary Market Traction', weight: '25%', tag: 'LIQUIDITY DEPTH' },
  transparency: { label: 'Reserve Transparency', weight: '20%', tag: 'ORACLES & REGISTRY' },
  compliance: { label: 'Custody & Legal Title', weight: '15%', tag: 'BANKRUPTCY REMOTENESS' },
  durability: { label: 'Durability & Resilience', weight: '10%', tag: 'CONTRACT IMMUTABILITY' },
};

/**
 * VenuePage:
 * Luxury Swiss Gold Assay Architectural Dossier for a specific tokenized venue.
 */
export default async function VenuePage({ params }: VenuePageProps) {
  const { id } = await params;
  const records = EDITIONS.map((edition) => ({
    edition: edition.edition,
    venue: edition.venues.find((v) => v.id === id) ?? null,
  })).filter((r) => r.venue !== null) as { edition: string; venue: (typeof EDITIONS)[number]['venues'][number] }[];

  if (records.length === 0) notFound();

  const current = records[records.length - 1].venue;
  const isHallmarked = current.fineness >= 375;

  // Chart coordinates
  const points = records.map((r, i) => ({ x: x(i, records.length), y: y(r.venue.fineness) }));
  const linePoints = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  
  // Area fill polygon
  const areaPolygon = points.length > 1
    ? `${points[0].x.toFixed(1)},${BOTTOM} ${linePoints} ${points[points.length - 1].x.toFixed(1)},${BOTTOM}`
    : '';

  // All venues for navigation
  const allVenues = records[0] ? EDITIONS[EDITIONS.length - 1].venues : [];
  const currentIdx = allVenues.findIndex((v) => v.id === id);
  const prevVenue = currentIdx > 0 ? allVenues[currentIdx - 1] : null;
  const nextVenue = currentIdx >= 0 && currentIdx < allVenues.length - 1 ? allVenues[currentIdx + 1] : null;

  return (
    <main className="min-h-screen bg-[var(--ground)] text-[var(--ink)]">
      <Masthead edition={LATEST_EDITION.edition} latestEdition={LATEST_EDITION.edition} />

      {/* Luxury Venue Header Dossier */}
      <div className="relative border-b border-[var(--rule)] bg-[var(--surface-alt)] py-14 md:py-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,139,15,0.09)_0%,transparent_65%)]"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-3)] mb-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors underline-offset-4 hover:underline"
            >
              <ArrowLeft size={13} />
              <span>THE REGISTER</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--gold)] font-bold">VENUE ASSAY DOSSIER</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-mono text-xs font-black uppercase tracking-wider border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)]">
                  {current.chain} CHAIN
                </span>
                <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink-2)]">
                  ADMITTED {current.admittedEdition}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold border ${
                    current.status === 'active'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600'
                      : current.status === 'struck'
                        ? 'border-red-500/30 bg-red-500/10 text-red-600'
                        : 'border-amber-500/30 bg-amber-500/10 text-amber-600'
                  }`}
                >
                  STATUS: {current.status.toUpperCase()}
                </span>
              </div>

              <h1 className="mt-4 font-[var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] leading-tight">
                {current.name}
              </h1>

              {/* Thesis Quote Callout */}
              <div className="mt-4 p-4 rounded-xl border-l-4 border-[var(--gold)] bg-[var(--surface)] shadow-2xs max-w-2xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink-3)] block mb-1">
                  EDITORIAL THESIS
                </span>
                <p className="text-sm md:text-base leading-relaxed text-[var(--ink-2)] italic">
                  &ldquo;{current.thesis}&rdquo;
                </p>
              </div>
            </div>

            {/* Prominent Swiss Hallmark Caliper Badge */}
            <div className="shrink-0 flex flex-col items-start md:items-end font-mono">
              <div
                className={`p-6 rounded-2xl border-2 flex flex-col items-start md:items-end shadow-xl ${
                  isHallmarked
                    ? 'border-[var(--gold)] bg-[var(--surface)] shadow-[0_12px_32px_-12px_rgba(196,139,15,0.25)]'
                    : 'border-red-500/30 bg-[var(--surface)]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold)] mb-1">
                  <Award size={16} />
                  <span>{current.band.toUpperCase()}</span>
                </div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--ink)]">
                  {current.fineness}
                  <span className="text-lg text-[var(--ink-3)] font-normal"> / 1000</span>
                </div>
                <span className="text-[10px] mt-1 text-[var(--ink-2)]">
                  {isHallmarked ? 'CERTIFIED INSTITUTIONAL HALLMARK' : 'BELOW 375 HALLMARK GATE'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 1: HISTORICAL TRAJECTORY */}
      <section aria-labelledby="history-title" className="mx-auto max-w-5xl px-4 sm:px-6 py-14 border-b border-[var(--rule)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--rule)]">
          <div>
            <p className="eyebrow text-[var(--gold)] font-mono text-xs tracking-widest">
              TEMPORAL ANALYSIS // FINENESS TRAJECTORY
            </p>
            <h2
              id="history-title"
              className="mt-1 font-[var(--font-inter)] text-2xl font-black tracking-tight text-[var(--ink)]"
            >
              Fineness History Across Editions
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--ink-3)]">
            RECORDED EDITIONS: <span className="font-bold text-[var(--ink)]">{records.length} EDITIONS</span>
          </div>
        </div>

        {/* High-End Vector Fineness Chart */}
        <div className="mt-6 rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-xs overflow-hidden">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`Fineness trajectory for ${current.name}`}
            className="h-auto w-full overflow-visible"
          >
            <defs>
              <linearGradient id="venueGoldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid line at 375 Hallmark cutoff */}
            <line
              x1={20}
              x2={W - 20}
              y1={y(375)}
              y2={y(375)}
              stroke="var(--band-none)"
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
            <text x={W - 24} y={y(375) - 6} textAnchor="end" fontSize={10} fontFamily="monospace" fill="var(--band-none)" fontWeight="bold">
              375 HALLMARK CUTOFF
            </text>

            {/* Gradient area fill */}
            {points.length > 1 && (
              <polygon points={areaPolygon} fill="url(#venueGoldGrad)" />
            )}

            {/* The Trajectory Line */}
            {points.length > 1 && (
              <polyline
                points={linePoints}
                fill="none"
                stroke="var(--gold)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Glowing Data Nodes */}
            {points.map((p, i) => (
              <g key={records[i].edition}>
                {/* Outer halo */}
                <circle cx={p.x} cy={p.y} r={7} fill="var(--gold)" opacity={0.2} />
                {/* Center dot */}
                <circle cx={p.x} cy={p.y} r={4} fill="var(--surface)" stroke="var(--gold)" strokeWidth={2} />
                {/* Score value */}
                <text
                  x={p.x}
                  y={p.y - 12}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="var(--ink)"
                >
                  {records[i].venue.fineness}
                </text>
                {/* Edition tag */}
                <text
                  x={p.x}
                  y={H - 8}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="monospace"
                  fill="var(--ink-3)"
                >
                  {records[i].edition}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Historical Ledger Table (Retaining overflow-x-auto) */}
        <div className="mt-6 overflow-x-auto no-scrollbar rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
          <table className="w-full min-w-[500px] border-collapse text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[var(--rule)] bg-[var(--surface-alt)]">
                {['Edition Snapshot', 'Fineness Score', 'Karat Band', 'Rank Standing'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-4 py-2.5 uppercase tracking-widest text-[var(--ink-3)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.edition} className="border-b border-[var(--rule)] last:border-0 hover:bg-[var(--surface-alt)]/50">
                  <th scope="row" className="px-4 py-3 font-semibold text-[var(--ink)]">
                    Edition {r.edition}
                  </th>
                  <td className="px-4 py-3 font-black text-[var(--gold)]">
                    {r.venue.fineness} / 1000
                  </td>
                  <td className="px-4 py-3 text-[var(--ink-2)]">{r.venue.band}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--ink)]">#{r.venue.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: 5-PILLAR METALLURGICAL SCORES */}
      <section aria-labelledby="scores-title" className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
        <div className="pb-4 border-b border-[var(--rule)]">
          <p className="eyebrow text-[var(--gold)] font-mono text-xs tracking-widest">
            METALLURGICAL BREAKDOWN // 5 CRITERIA CALIPERS
          </p>
          <h2
            id="scores-title"
            className="mt-1 font-[var(--font-inter)] text-2xl font-black tracking-tight text-[var(--ink)]"
          >
            Current Evaluation Breakdown
          </h2>
          <p className="prose mt-1 max-w-[68ch] text-xs sm:text-sm text-[var(--ink-2)]">
            Detailed criteria ratings out of 10 with verified editorial rationale and house weight contributions.
          </p>
        </div>

        {/* 5-Pillar Detailed Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {CRITERIA.map((c) => {
            const meta = CRITERION_META[c] ?? { label: c, weight: '20%', tag: 'METRIC' };
            const scoreVal = current.scores[c];
            const weightVal = HOUSE_WEIGHTS[c];
            const weightedPoints = (scoreVal * weightVal * 10).toFixed(1);

            return (
              <div
                key={c}
                className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-5 flex flex-col justify-between shadow-xs hover:border-[var(--gold)]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] font-mono">
                    <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider">
                      {meta.tag}
                    </span>
                    <span className="text-[11px] text-[var(--ink-3)]">
                      WEIGHT: {meta.weight}
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between">
                    <h3 className="font-[var(--font-inter)] text-base font-bold text-[var(--ink)]">
                      {meta.label}
                    </h3>
                    <div className="font-mono text-base font-black text-[var(--ink)]">
                      {scoreVal}
                      <span className="text-xs text-[var(--ink-3)] font-normal"> / 10</span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="mt-3 w-full h-2 rounded-full bg-[var(--surface-alt)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--gold)] rounded-full transition-all duration-300"
                      style={{ width: `${(scoreVal / 10) * 100}%` }}
                    />
                  </div>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--ink-2)]">
                    {current.rationale[c]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--rule)] font-mono text-[10px] text-[var(--ink-3)] flex items-center justify-between">
                  <span>WEIGHTED CONTRIBUTION:</span>
                  <span className="font-bold text-[var(--ink)]">+{weightedPoints} pts</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Adjacent Venue Navigation */}
        <div className="mt-12 pt-6 border-t border-[var(--rule)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          {prevVenue ? (
            <Link
              href={`/venues/${prevVenue.id}`}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-2)] hover:text-[var(--ink)] hover:border-[var(--gold)] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>PREV: {prevVenue.name}</span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/"
            className="font-bold text-[var(--gold)] hover:underline underline-offset-4"
          >
            ← BACK TO FULL REGISTER
          </Link>

          {nextVenue ? (
            <Link
              href={`/venues/${nextVenue.id}`}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-2)] hover:text-[var(--ink)] hover:border-[var(--gold)] transition-colors"
            >
              <span>NEXT: {nextVenue.name}</span>
              <ArrowRight size={13} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <Footer edition={LATEST_EDITION.edition} />
    </main>
  );
}
