import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '../../src/site/components/Footer';
import Masthead from '../../src/site/components/Masthead';
import { LATEST_EDITION } from '../../src/site/editions';
import { BAND_COLOR } from '../../src/site/components/Entry';

export const metadata: Metadata = {
  title: 'Fineness : Venues',
  description: 'Every venue in the Fineness register with current fineness, band and status.',
};

/** Venue index: one row per venue in the latest edition, linking to dossiers. */
export default function VenuesPage() {
  const venues = [...LATEST_EDITION.venues].sort((a, b) => a.fineness - b.fineness || a.name.localeCompare(b.name)).reverse();
  return (
    <main>
      <Masthead edition={LATEST_EDITION.edition} latestEdition={LATEST_EDITION.edition} />
      <div className="mx-auto max-w-5xl px-4 pb-4 pt-12">
        <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">
          <Link href="/" className="underline-offset-4 hover:underline">
            Register
          </Link>
          {' / venues'}
        </p>
        <h1 className="mt-4 font-[var(--font-inter)] text-4xl font-extrabold tracking-tight text-[var(--ink)]">
          Venues
        </h1>
        <p className="prose mt-4 max-w-[66ch] text-lg leading-relaxed text-[var(--ink-2)]">
          Every venue in edition {LATEST_EDITION.edition}, ranked by fineness.
          Open a dossier for history, scores and backing evidence.
        </p>
      </div>
      <section aria-label="Venue index" className="mx-auto max-w-5xl px-4 py-10">
        <ul className="overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--surface)]">
          {venues.map((v) => (
            <li key={v.id} className="border-b border-[var(--rule)] last:border-0">
              <Link
                href={`/venues/${v.id}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[var(--tint)]/50"
              >
                <span className="mono flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[var(--surface-alt)] text-sm font-bold tabular-nums text-[var(--ink-2)]">
                  {v.rank === 0 ? 'n/a' : String(v.rank).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-[var(--font-inter)] text-base font-bold text-[var(--ink)]">
                    {v.name}
                  </span>
                  <span className="mono block text-[10px] uppercase tracking-wider text-[var(--ink-3)]">
                    {v.chain} · {v.status}
                  </span>
                </span>
                {v.status === 'prelaunch' ? (
                  <span className="mono shrink-0 rounded border border-[var(--rule-2)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">
                    Unscored
                  </span>
                ) : (
                  <>
                    <span className="mono shrink-0 text-xl font-bold tabular-nums text-[var(--ink)]">
                      {v.fineness}
                    </span>
                    <span
                      className="mono shrink-0 rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ borderColor: BAND_COLOR[v.band], color: BAND_COLOR[v.band] }}
                    >
                      {v.band}
                    </span>
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer edition={LATEST_EDITION.edition} />
    </main>
  );
}
