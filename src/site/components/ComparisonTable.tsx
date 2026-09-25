import Link from 'next/link';
import type { Venue } from '../../types';
import { band } from '../../scoring/fineness';
import { dash } from '../lib/format';
import { BAND_COLOR } from './Entry';
import Reveal from './Reveal';
import { StaggerBody, WordText } from './Stagger';

interface ComparisonTableProps {
  venues: Venue[];
}

const CRITERIA_COLS = [
  { key: 'asset', label: 'Asset', sub: 'Collateral' },
  { key: 'traction', label: 'Traction', sub: 'Liquidity' },
  { key: 'transparency', label: 'Transp.', sub: 'Reserves' },
  { key: 'compliance', label: 'Compl.', sub: 'Regulated' },
  { key: 'durability', label: 'Durab.', sub: 'Liveness' },
] as const;

function ScoreBadge({ score }: { score: number }) {
  let style = 'border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-2)]';
  if (score >= 8) {
    style = 'border-[var(--gold)]/50 bg-[var(--tint)] text-[var(--ink)] font-black';
  } else if (score >= 6) {
    style = 'border-[var(--rule)] bg-[var(--surface-2)] text-[var(--ink)] font-bold';
  } else if (score < 4) {
    style = 'border-[var(--band-none)]/30 bg-[var(--band-none)]/10 text-[var(--band-none)] font-bold';
  }

  return (
    <span
      className={`mono inline-flex h-7 w-8 items-center justify-center rounded border text-xs tabular-nums shadow-2xs ${style}`}
    >
      {score}
    </span>
  );
}

/** Side-by-side criterion comparison matrix with heat-map score indicators. */
export default function ComparisonTable({ venues }: ComparisonTableProps) {
  const max = Math.max(...venues.map((v) => v.fineness));
  return (
    <section aria-labelledby="compare-title" id="comparison" className="page-wrap py-12">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-b border-[var(--rule)] pb-4">
          <div>
            <p className="eyebrow">FINENESS BREAKDOWN // 5 SCORING CRITERIA</p>
            <h2
              id="compare-title"
              className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            >
              <WordText text="Comparative Purity Matrix" />
            </h2>
            <p className="prose mt-1 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
              Cross-venue evaluation across the 5 crucible criteria (0–10 scale). Scores 8–10 indicate institutional bullion standards; scores below 4 signify critical operational opacity.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--ink-3)]">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
              <span>≥8 PINNACLE</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[var(--band-none)]" />
              <span>&lt;4 DEFICIENT</span>
            </span>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto no-scrollbar rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--rule)] bg-[var(--surface-alt)] font-mono">
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[var(--ink)]"
                >
                  VENUE & PAIRING
                </th>
                {CRITERIA_COLS.map((c) => (
                  <th
                    key={c.key}
                    scope="col"
                    className="px-3 py-3 text-center text-xs uppercase tracking-wider text-[var(--ink-2)]"
                  >
                    <div className="font-extrabold text-[var(--ink)]">{c.label}</div>
                    <div className="text-[9px] font-medium text-[var(--ink-3)]">{c.sub}</div>
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-[var(--ink)]"
                >
                  FINENESS
                </th>
              </tr>
            </thead>
            <StaggerBody>
              {venues.map((v) => (
                <tr
                  key={v.id}
                  className="group border-b border-[var(--rule)] transition-colors last:border-0 hover:bg-[var(--tint)]/40"
                >
                  <th
                    scope="row"
                    className="sticky left-0 bg-[var(--surface)] px-4 py-3 text-sm font-bold text-[var(--ink)] shadow-[1px_0_0_var(--rule)] group-hover:bg-[var(--surface)] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Link href={`/venues/${v.id}`} className="site-link font-extrabold">
                        {v.name}
                      </Link>
                      <span className="mono rounded border border-[var(--rule)] bg-[var(--surface-alt)] px-1.5 py-0.2 text-[9px] uppercase text-[var(--ink-3)]">
                        {v.chain}
                      </span>
                      {v.fineness === max && (
                        <span className="mono rounded bg-[var(--gold)] px-1.5 py-px text-[9px] font-black uppercase tracking-wider text-white shadow-2xs">
                          ★ PEAK
                        </span>
                      )}
                    </div>
                    <div className="mono text-[10px] font-medium text-[var(--ink-3)] font-normal mt-0.5">
                      {v.pairing.assetType} • {v.pairing.verifiability}
                    </div>
                  </th>

                  <td className="px-3 py-3 text-center">
                    <ScoreBadge score={v.scores.asset} />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <ScoreBadge score={v.scores.traction} />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <ScoreBadge score={v.scores.transparency} />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <ScoreBadge score={v.scores.compliance} />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <ScoreBadge score={v.scores.durability} />
                  </td>

                  <td className="mono px-4 py-3 text-right text-sm font-bold tabular-nums text-[var(--ink)]">
                    {v.status === 'prelaunch' ? (
                      <span className="text-xs uppercase tracking-wider text-[var(--ink-3)]">n/a</span>
                    ) : (
                    <div className="inline-flex items-center gap-2">
                      <span className="text-base font-black">
                        {v.fineness}<span className="text-[10px] font-bold text-[var(--gold)] ml-0.5">/1000</span>
                      </span>
                      <span
                        className="rounded border px-1.5 py-0.5 text-[9px] font-extrabold uppercase"
                        style={{
                          borderColor: BAND_COLOR[band(v.fineness)],
                          color: BAND_COLOR[band(v.fineness)],
                        }}
                      >
                        {band(v.fineness)}
                      </span>
                    </div>
                    )}
                  </td>
                </tr>
              ))}
            </StaggerBody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs font-mono text-[var(--ink-3)]">
          <span>DAILY VOLUME LEADER: {dash(venues[0]?.metrics.dailyVolumeUsd ?? null)} ({venues[0]?.name ?? 'n/a'})</span>
          <span className="text-[var(--gold)] font-bold">CLICK VENUE FOR FULL BREAKDOWN ↗</span>
        </div>
      </Reveal>
    </section>
  );
}
