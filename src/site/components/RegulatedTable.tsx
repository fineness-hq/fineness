import Link from 'next/link';
import type { Venue } from '../../types';
import Reveal from './Reveal';
import { StaggerBody, WordText } from './Stagger';

interface RegulatedTableProps {
  venues: Venue[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: 'LIVE TRADING', color: 'var(--ok)', bg: 'rgba(46,125,50,0.1)' },
  prelaunch: { label: 'PRE-LAUNCH', color: 'var(--warn)', bg: 'rgba(230,81,0,0.1)' },
  paused: { label: 'HALTED', color: 'var(--warn)', bg: 'rgba(230,81,0,0.1)' },
  struck: { label: 'DELISTED', color: 'var(--band-none)', bg: 'rgba(211,47,47,0.1)' },
};

/** Institutional custody and regulatory standing audit ledger. */
export default function RegulatedTable({ venues }: RegulatedTableProps) {
  const rows = [...venues].sort(
    (a, b) => b.scores.compliance - a.scores.compliance || a.name.localeCompare(b.name),
  );
  return (
    <section aria-labelledby="regulated-title" id="regulated" className="page-wrap py-12">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-b border-[var(--rule)] pb-4">
          <div>
            <p className="eyebrow">04 / CUSTODY & REGULATORY</p>
            <h2
              id="regulated-title"
              className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            >
              <WordText text="Institutional Custody & Standing" />
            </h2>
            <p className="prose mt-1 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
              Auditor assessment of custodian legal jurisdiction, physical gold redeemability, and reserve verification methodology.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded border border-[var(--rule)] bg-[var(--surface-alt)] px-2.5 py-1 text-[var(--ink)]">
              SORTED BY COMPLIANCE SCORE ↓
            </span>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--rule)] bg-[var(--surface-alt)] font-mono text-xs uppercase tracking-wider text-[var(--ink-2)]">
                <th scope="col" className="px-4 py-3 font-bold text-[var(--ink)]">
                  VENUE IDENTITY
                </th>
                <th scope="col" className="px-3 py-3 font-bold text-center">
                  COMPLIANCE
                </th>
                <th scope="col" className="px-3 py-3 font-bold">
                  DESIGNATED CUSTODIAN
                </th>
                <th scope="col" className="px-3 py-3 font-bold">
                  REDEEMABILITY
                </th>
                <th scope="col" className="px-3 py-3 font-bold">
                  VERIFICATION MODEL
                </th>
                <th scope="col" className="px-4 py-3 font-bold text-right">
                  STATUS
                </th>
              </tr>
            </thead>
            <StaggerBody>
              {rows.map((v) => {
                const statusCfg = STATUS_CONFIG[v.status] ?? STATUS_CONFIG.active;
                return (
                  <tr
                    key={v.id}
                    className="group border-b border-[var(--rule)] transition-colors last:border-0 hover:bg-[var(--tint)]/40"
                  >
                    <th
                      scope="row"
                      className="sticky left-0 bg-[var(--surface)] px-4 py-3 text-sm font-bold text-[var(--ink)] shadow-[1px_0_0_var(--rule)] group-hover:bg-[var(--surface)] transition-colors"
                    >
                      <Link href={`/venues/${v.id}`} className="site-link font-extrabold">
                        {v.name}
                      </Link>
                      <div className="mono text-[10px] text-[var(--ink-3)] font-normal mt-0.5">
                        {v.chain} • {v.pairing.assetType}
                      </div>
                    </th>

                    <td className="px-3 py-3 text-center">
                      <span className="mono inline-flex items-center justify-center rounded-md border border-[var(--gold)]/40 bg-[var(--tint)] px-2.5 py-1 text-xs font-black text-[var(--ink)] shadow-2xs">
                        {v.scores.compliance}/10
                      </span>
                    </td>

                    <td className="mono px-3 py-3 text-xs font-semibold text-[var(--ink-2)]">
                      {v.pairing.custodian ? (
                        <span className="text-[var(--ink)] font-bold">{v.pairing.custodian}</span>
                      ) : (
                        <span className="text-[var(--ink-3)]">No Named Custodian</span>
                      )}
                    </td>

                    <td className="mono px-3 py-3 text-xs">
                      {v.pairing.redeemable ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ok)]/30 bg-[var(--ok)]/10 px-2.5 py-0.5 text-[10px] font-bold text-[var(--ok)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" />
                          PHYSICAL DELIVERY
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--rule)] bg-[var(--surface-alt)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--ink-3)]">
                          NON-REDEEMABLE
                        </span>
                      )}
                    </td>

                    <td className="mono px-3 py-3 text-xs font-medium text-[var(--ink-2)]">
                      <span className="rounded bg-[var(--surface-alt)] border border-[var(--rule)] px-2 py-0.5 text-[10px] uppercase">
                        {v.pairing.verifiability}
                      </span>
                    </td>

                    <td className="mono px-4 py-3 text-right text-xs">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider"
                        style={{
                          borderColor: statusCfg.color,
                          color: statusCfg.color,
                          backgroundColor: statusCfg.bg,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: statusCfg.color }}
                        />
                        {statusCfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </StaggerBody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
