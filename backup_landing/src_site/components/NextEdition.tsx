interface NextEditionProps {
  currentEdition: string;
  nextDue?: string;
}

/** What ships next month. Static schedule copy. */
export default function NextEdition({ currentEdition, nextDue = 'October 2026' }: NextEditionProps) {
  return (
    <section aria-labelledby="next-title" id="next" className="page-wrap py-10">
      <p className="eyebrow">07 / next</p>
      <h2
        id="next-title"
        className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
      >
        Next edition
      </h2>
      <p className="prose mt-3 max-w-[66ch] text-base leading-relaxed text-[var(--ink-2)]">
        Edition {currentEdition} is frozen. The next edition ships {nextDue} with fresh
        snapshots, admission review, and fineness deltas against this edition.
      </p>
    </section>
  );
}
