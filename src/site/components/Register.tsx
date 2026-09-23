'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HOUSE_WEIGHTS, band } from '../../scoring/fineness';
import type { Criterion, Weights } from '../../scoring/fineness';
import type { Delta } from '../../build/deltas';
import type { Venue } from '../../types';
import { applyWeights } from '../weight-url';
import CutLine from './CutLine';
import Entry from './Entry';
import { WordText } from './Stagger';
import WeightPanel from './WeightPanel';

interface RegisterProps {
  venues: Venue[];
  deltas?: Record<string, Delta>;
  initialWeights?: Weights;
  initialRaw?: Record<Criterion, number>;
}

/**
 * Ranked register with live reweighting.
 * Server passes initial weights parsed from the URL so shared links
 * render the sender ranking before first paint.
 * Expanded entries are tracked by venue id so resorting never closes them.
 */
export default function Register({
  venues,
  deltas = {},
  initialWeights,
  initialRaw,
}: RegisterProps) {
  const [weights, setWeights] = useState<Weights>(initialWeights ?? { ...HOUSE_WEIGHTS });
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const reduce = useReducedMotion();

  const displayed = useMemo(
    () => applyWeights(venues.filter((v) => v.status !== 'struck'), weights),
    [venues, weights],
  );
  const cutIndex = displayed.findIndex((v) => v.fineness < 375);

  function toggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section aria-labelledby="register-title" id="register" className="page-wrap py-10">
      <p className="eyebrow">02 / register</p>
      <h2
        id="register-title"
        className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
      >
        <WordText text="The register" />
      </h2>
      <div className="mt-6 overflow-hidden border border-[var(--rule)]">
        <WeightPanel initialRaw={initialRaw} onWeightsChange={setWeights} />
        <div role="list" aria-label="Ranked venues">
          {displayed.map((venue, i) =>
            reduce ? (
              <div key={venue.id} role="listitem">
                {i === cutIndex && <CutLine visible />}
                <Entry
                  venue={venue}
                  displayFineness={venue.fineness}
                  displayBand={band(venue.fineness)}
                  rank={venue.rank}
                  delta={deltas[venue.id]}
                  expanded={expandedIds.has(venue.id)}
                  onToggle={() => toggle(venue.id)}
                />
              </div>
            ) : (
              <motion.div
                key={venue.id}
                role="listitem"
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              >
                {i === cutIndex && <CutLine visible />}
                <Entry
                  venue={venue}
                  displayFineness={venue.fineness}
                  displayBand={band(venue.fineness)}
                  rank={venue.rank}
                  delta={deltas[venue.id]}
                  expanded={expandedIds.has(venue.id)}
                  onToggle={() => toggle(venue.id)}
                />
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
