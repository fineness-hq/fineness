interface NextEditionProps {
  currentEdition: string;
  nextDue?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Next month name after a YYYY-MM edition, e.g. 2026-11 -> December 2026. */
function nextMonth(currentEdition: string): string {
  const match = currentEdition.match(/^(\d{4})-(\d{2})$/);
  if (!match) return 'next month';
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]), 1));
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** What ships next month. Static schedule copy. */
export default function NextEdition({ currentEdition, nextDue }: NextEditionProps) {
  const due = nextDue ?? nextMonth(currentEdition);
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
        Edition {currentEdition} is frozen. The next edition ships {due} with fresh
        snapshots, admission review, and fineness deltas against this edition.
      </p>
    </section>
  );
}
