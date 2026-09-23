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
    <section aria-labelledby="struck-title" id="struck" className="page-wrap py-10">
      <Reveal>
      <p className="eyebrow">05 / struck</p>
      <h2
        id="struck-title"
        className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
      >
        <WordText text="Struck from the register" />
      </h2>
      {struck.length === 0 ? (
        <p className="prose mt-3 text-base leading-relaxed text-[var(--ink-2)]">
          No venues struck this edition. A venue is struck after 60 days without a launch,
          a dark public interface, or loss of domain and key control.
        </p>
      ) : (
        <ul className="mt-4 border border-[var(--rule)] bg-[var(--surface)]">
          {struck.map((v) => (
            <li key={v.id} className="flex items-baseline justify-between gap-3 border-b border-[var(--rule)] px-4 py-3 last:border-0">
              <span className="font-[var(--font-inter)] text-base font-bold text-[var(--ink)]">
                {v.name}
              </span>
              <span className="mono text-sm tabular-nums text-[var(--ink-2)]">
                Final fineness {v.fineness}
              </span>
            </li>
          ))}
        </ul>
      )}
      </Reveal>
    </section>
  );
}
