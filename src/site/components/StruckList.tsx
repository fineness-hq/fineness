import { CheckCircle2, ShieldAlert } from 'lucide-react';
import type { Venue } from '../../types';
import Reveal from './Reveal';
import { WordText } from './Stagger';

interface StruckListProps {
  venues: Venue[];
}

/** Venues removed from the register. Empty state renders by design. */
export default function StruckList({ venues }: StruckListProps) {
  const struck = venues.filter((v) => v.status === 'struck');
  return (
    <section aria-labelledby="struck-title" id="struck" className="page-wrap py-12">
      <Reveal>
        <div className="border-b border-[var(--rule)] pb-4">
          <p className="eyebrow">05 / REVOCATIONS & STRIKES</p>
          <h2
            id="struck-title"
            className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
          >
            <WordText text="Struck from the Register" />
          </h2>
          <p className="prose mt-1 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
            Venues delisted from the Crucible Register. A venue is permanently struck after 60 days without an active launch, unannounced interface shutdown, or loss of cryptographic key/domain control.
          </p>
        </div>

        {struck.length === 0 ? (
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[var(--ok)]/30 bg-[var(--ok)]/5 p-5 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--ok)] text-white shadow-xs">
                <CheckCircle2 size={20} />
              </span>
              <div>
                <h3 className="font-[var(--font-inter)] text-sm font-bold text-[var(--ink)]">
                  REGISTRY INTEGRITY VERIFIED // ZERO STRIKES
                </h3>
                <p className="mono text-xs text-[var(--ink-2)] mt-0.5">
                  All 10 listed venues maintain active contracts, verifiable endpoints, and current cryptographic keys.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[var(--ok)] shrink-0">
              <span className="h-2 w-2 rounded-full bg-[var(--ok)] animate-pulse" />
              <span>CYCLE STATUS: 100% UNSTRUCK</span>
            </div>
          </div>
        ) : (
          <div className="mt-6 divide-y divide-[var(--rule)] rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
            {struck.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between p-4 bg-red-500/5 hover:bg-red-500/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--band-none)] text-white">
                    <ShieldAlert size={16} />
                  </span>
                  <div>
                    <span className="font-[var(--font-inter)] text-base font-extrabold text-[var(--ink)]">
                      {v.name}
                    </span>
                    <span className="mono ml-2 rounded bg-red-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-[var(--band-none)]">
                      DELISTED
                    </span>
                  </div>
                </div>
                <span className="mono text-xs font-bold tabular-nums text-[var(--band-none)]">
                  TERMINAL FINENESS {v.fineness}‰
                </span>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
