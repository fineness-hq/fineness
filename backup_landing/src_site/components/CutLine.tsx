'use client';

import { motion } from 'framer-motion';

interface CutLineProps {
  visible: boolean;
}

/** Hallmark divider. Repositions with the list via layout spring. */
export default function CutLine({ visible }: CutLineProps) {
  if (!visible) return null;
  return (
    <motion.div
      layout
      role="separator"
      aria-label="Hallmark 375. Venues below this line are not certified."
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex items-center gap-3 border-y-2 border-dashed border-[var(--band-none)] bg-[var(--surface)] px-4 py-2"
    >
      <span className="mono text-xs font-semibold uppercase tracking-widest text-[var(--band-none)]">
        Hallmark 375
      </span>
      <span className="mono text-xs text-[var(--ink-3)]">Listed below this line, not certified</span>
    </motion.div>
  );
}
