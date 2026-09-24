'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, Layers } from 'lucide-react';
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

type BandFilter = 'all' | 'certified' | 'below-hallmark';

/**
 * Ranked register with live reweighting and instant filter.
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
  const [search, setSearch] = useState('');
  const [bandFilter, setBandFilter] = useState<BandFilter>('all');
  const reduce = useReducedMotion();

  const reweighted = useMemo(
    () => applyWeights(venues.filter((v) => v.status !== 'struck'), weights),
    [venues, weights],
  );

  const displayed = useMemo(() => {
    let list = reweighted;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.chain.toLowerCase().includes(q) ||
          v.pairing.assetType.toLowerCase().includes(q),
      );
    }
    if (bandFilter === 'certified') {
      list = list.filter((v) => v.fineness >= 375);
    } else if (bandFilter === 'below-hallmark') {
      list = list.filter((v) => v.fineness < 375);
    }
    return list;
  }, [reweighted, search, bandFilter]);

  const cutIndex = displayed.findIndex((v) => v.fineness < 375);

  function toggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Chart rows dispatch this to jump straight into an entry.
  useEffect(() => {
    const onExpand = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (typeof id !== 'string' || id.length === 0) return;
      setExpandedIds((prev) => new Set(prev).add(id));
      requestAnimationFrame(() => {
        document
          .getElementById(`entry-button-${id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    };
    window.addEventListener('fineness:expand', onExpand);
    return () => window.removeEventListener('fineness:expand', onExpand);
  }, []);

  return (
    <section aria-labelledby="register-title" id="register" className="page-wrap py-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">02 / register</p>
          <h2
            id="register-title"
            className="mt-2 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
          >
            <WordText text="The Bullion Register" />
          </h2>
          <p className="mt-1 text-sm text-[var(--ink-2)]">
            Every score reproducible from public contracts and documented backing.
          </p>
        </div>

        {/* Quick search input */}
        <div className="relative mt-3 md:mt-0 w-full max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" />
          <input
            type="text"
            placeholder="Search venue or chain…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mono w-full rounded border border-[var(--rule)] bg-[var(--surface)] py-2 pl-9 pr-3 text-xs text-[var(--ink)] transition-all placeholder:text-[var(--ink-3)] focus:border-[var(--dark)] focus:outline-hidden"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-[var(--rule)] shadow-sm bg-[var(--surface)]">
        <WeightPanel initialRaw={initialRaw} onWeightsChange={setWeights} />

        {/* Table filter bar */}
        <div className="flex items-center justify-between border-b border-[var(--rule)] bg-[var(--surface-alt)]/60 px-5 py-2.5 text-xs">
          <div className="flex items-center gap-1.5">
            <Layers size={13} className="text-[var(--ink-3)]" />
            <span className="mono text-[11px] font-semibold text-[var(--ink)]">
              Showing {displayed.length} of {reweighted.length} venues
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setBandFilter('all')}
              className={`mono rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
                bandFilter === 'all'
                  ? 'bg-[var(--dark)] text-white'
                  : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setBandFilter('certified')}
              className={`mono rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
                bandFilter === 'certified'
                  ? 'bg-[var(--dark)] text-white'
                  : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
              }`}
            >
              Certified (≥375)
            </button>
            <button
              type="button"
              onClick={() => setBandFilter('below-hallmark')}
              className={`mono rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
                bandFilter === 'below-hallmark'
                  ? 'bg-[var(--dark)] text-white'
                  : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
              }`}
            >
              Below Hallmark
            </button>
          </div>
        </div>

        {/* Venue Entries List */}
        <div role="list" aria-label="Ranked venues">
          {displayed.length === 0 ? (
            <div className="py-12 text-center text-sm text-[var(--ink-3)] mono">
              No venues matching &ldquo;{search}&rdquo;
            </div>
          ) : (
            displayed.map((venue, i) =>
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
            )
          )}
        </div>
      </div>
    </section>
  );
}
