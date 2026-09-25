import type { CorrectionNote } from '../../types';
import Reveal from './Reveal';
import { WordText } from './Stagger';

interface CorrectionsProps {
  corrections?: CorrectionNote[];
}

/**
 * Dated correction notes against a frozen edition. The original figure
 * stays in place; the note sits beside it. Renders nothing when empty.
 */
export default function Corrections({ corrections = [] }: CorrectionsProps) {
  if (corrections.length === 0) return null;
  return (
    <section aria-labelledby="corrections-title" id="corrections" className="page-wrap py-10">
      <Reveal>
        <p className="eyebrow">Errata // dated corrections</p>
        <h2
          id="corrections-title"
          className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
        >
          <WordText text="Corrections" />
        </h2>
        <ul className="mt-4 border border-[var(--rule)] bg-[var(--surface)]">
          {corrections.map((c, i) => (
            <li
              key={`${c.date}-${i}`}
              className="border-b border-[var(--rule)] px-4 py-3 last:border-0"
            >
              <p className="mono text-xs tabular-nums text-[var(--ink-3)]">
                {c.date} · signed {c.signedBy.join(', ')}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--ink-2)]">{c.note}</p>
              <p className="mono mt-1 text-xs text-[var(--ink)]">
                Original figure stands:{' '}
                <span className="line-through">{c.originalFigure}</span>
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
