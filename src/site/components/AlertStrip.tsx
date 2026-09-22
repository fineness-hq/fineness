import { TriangleAlert } from 'lucide-react';

interface AlertStripProps {
  message?: string;
}

/** Announcement strip below the masthead. */
export default function AlertStrip({
  message = 'Nothing in this category clears 18 karat.',
}: AlertStripProps) {
  return (
    <div
      role="note"
      aria-label="Edition highlight"
      className="border-b border-[var(--rule)] bg-[var(--tint)]"
    >
      <div className="page-wrap flex items-center gap-2 py-2">
        <TriangleAlert size={14} aria-hidden="true" className="shrink-0 text-[var(--maroon)]" />
        <p className="mono text-xs text-[var(--ink-2)]">{message}</p>
      </div>
    </div>
  );
}
