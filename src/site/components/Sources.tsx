import { ExternalLink } from 'lucide-react';
import type { SourceRegistry } from '../../types';
import Reveal from './Reveal';
import { WordText } from './Stagger';

interface SourcesProps {
  sources: SourceRegistry;
  disclosures?: string[];
}

/** Provenance list. Every figure sourceId must resolve here. */
export default function Sources({ sources, disclosures = [] }: SourcesProps) {
  return (
    <section aria-labelledby="sources-title" id="sources" className="page-wrap py-10">
      <Reveal>
      <p className="eyebrow">PROVENANCE // PRIMARY EVIDENCE ARCHIVE</p>
      <h2
        id="sources-title"
        className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
      >
        <WordText text="Sources" />
      </h2>
      <ul className="mt-4 border border-[var(--rule)] bg-[var(--surface)]">
        {Object.entries(sources).map(([id, entry], i) => (
          <li
            key={id}
            className="flex items-center justify-between gap-3 border-b border-[var(--rule)] px-4 py-3 transition-colors last:border-0 hover:bg-[var(--surface-2)]"
          >
            <div className="flex items-baseline gap-3">
              <span className="mono text-xs tabular-nums text-[var(--gold)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">{entry.name}</p>
                <p className="mono text-xs text-[var(--ink-3)]">
                  {id}: {entry.type}
                </p>
              </div>
            </div>
            <a
              href={entry.url}
              className="mono flex min-h-[44px] items-center gap-1 px-2 text-xs text-[var(--maroon)] underline-offset-4 hover:underline"
            >
              Visit <ExternalLink size={12} aria-hidden="true" />
              <span className="sr-only">: {entry.name}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mono mt-3 text-xs text-[var(--ink-2)]">
        {disclosures.length === 0
          ? 'No team holdings disclosed for this edition.'
          : `Disclosures: ${disclosures.join(' · ')}`}
      </p>
      </Reveal>
    </section>
  );
}
