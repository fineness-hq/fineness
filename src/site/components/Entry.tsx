'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUp, ChevronDown, Minus } from 'lucide-react';
import { CRITERIA } from '../../scoring/fineness';
import type { Band } from '../../scoring/fineness';
import type { Delta } from '../../build/deltas';
import type { Venue } from '../../types';
import { dash, usd } from '../lib/format';

interface EntryProps {
  venue: Venue;
  displayFineness: number;
  displayBand: Band;
  rank: number;
  delta?: Delta;
  expanded: boolean;
  onToggle: () => void;
}

export const BAND_COLOR: Record<Band, string> = {
  '22k': 'var(--band-high)',
  '18k': 'var(--band-high)',
  '14k': 'var(--band-mid)',
  '9k': 'var(--band-low)',
  'below-hallmark': 'var(--band-none)',
};

/** One-line venue profile from pairing and status. Published inputs only. */
function profileStrip(venue: Venue): string {
  const bits = [
    venue.pairing.assetType,
    venue.pairing.custodian ?? 'no custodian named',
    venue.pairing.redeemable ? 'redeemable' : 'non-redeemable',
    venue.pairing.verifiability,
    venue.status,
  ];
  return bits.join(' · ');
}

function DeltaMark({ delta }: { delta?: Delta }) {
  if (!delta) {
    return (
      <span className="mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">New</span>
    );
  }
  if (delta.fineness === 0 && delta.rank === 0) {
    return (
      <span className="mono flex items-center gap-1 text-xs tabular-nums text-[var(--ink-3)]">
        <Minus size={12} aria-hidden="true" />0
      </span>
    );
  }
  const up = delta.fineness > 0;
  return (
    <span
      className="mono flex items-center gap-1 text-xs tabular-nums"
      style={{ color: up ? 'var(--ok)' : 'var(--band-none)' }}
      aria-label={`Fineness delta ${delta.fineness}, rank delta ${delta.rank}`}
    >
      {up ? <ArrowUp size={12} aria-hidden="true" /> : <ArrowDown size={12} aria-hidden="true" />}
      {delta.fineness > 0 ? `+${delta.fineness}` : delta.fineness}
    </span>
  );
}

/** Ranked register entry with accordion detail. Expanded state lives in the parent. */
export default function Entry({
  venue,
  displayFineness,
  displayBand,
  rank,
  delta,
  expanded,
  onToggle,
}: EntryProps) {
  const reduce = useReducedMotion();
  const panelId = `entry-panel-${venue.id}`;
  const buttonId = `entry-button-${venue.id}`;
  const detail = (
    <div className="border-t border-[var(--rule)] px-4 py-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {CRITERIA.map((c) => (
          <div key={c} className="border border-[var(--rule)] bg-[var(--surface-2)] p-3">
            <p className="flex items-baseline justify-between">
              <span className="mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
                {c}
              </span>
              <span className="mono text-sm font-semibold tabular-nums text-[var(--ink)]">
                {venue.scores[c]}/10
              </span>
            </p>
            <p className="prose mt-1 text-sm leading-relaxed text-[var(--ink-2)]">
              {venue.rationale[c]}
            </p>
          </div>
        ))}
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-px border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-4">
        {(
          [
            ['Cumulative volume', usd(venue.metrics.cumulativeVolumeUsd)],
            ['Daily volume', usd(venue.metrics.dailyVolumeUsd)],
            ['Fees 24h', usd(venue.metrics.fees24hUsd)],
            ['TVL', dash(venue.metrics.tvlUsd)],
          ] as [string, string][]
        ).map(([label, value]) => (
          <div key={label} className="bg-[var(--surface)] px-3 py-2">
            <dt className="mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
              {label}
            </dt>
            <dd className="mono mt-0.5 text-sm tabular-nums text-[var(--ink)]">{value}</dd>
          </div>
        ))}
      </dl>
      <ul className="prose mt-3 text-sm text-[var(--ink-2)]">
        {venue.facts.map(([figure, note]) => (
          <li key={`${figure}-${note}`}>
            <strong className="mono tabular-nums">{figure}</strong> — {note}
          </li>
        ))}
      </ul>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="border border-[var(--rule)] bg-[var(--surface-2)] p-3">
          <p className="mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
            Contracts
          </p>
          <ul className="mt-1 space-y-1">
            {venue.contracts.length === 0 && (
              <li className="mono text-xs text-[var(--ink-3)]">not published</li>
            )}
            {venue.contracts.map((c) => (
              <li key={`${c.label}-${c.address}`} className="mono text-xs tabular-nums text-[var(--ink-2)]">
                {c.label} {c.address.slice(0, 10)}…{c.address.slice(-4)}{' '}
                {c.verified ? '(verified)' : '(unverified)'}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-[var(--rule)] bg-[var(--surface-2)] p-3">
          <p className="mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
            Links
          </p>
          <p className="mono mt-1 space-x-3 text-xs">
            {venue.links.site && (
              <a href={venue.links.site} className="underline-offset-4 hover:underline">
                Site ↗
              </a>
            )}
            {venue.links.docs && (
              <a href={venue.links.docs} className="underline-offset-4 hover:underline">
                Docs ↗
              </a>
            )}
            {!venue.links.site && !venue.links.docs && (
              <span className="text-[var(--ink-3)]">not published</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <article
      aria-labelledby={buttonId}
      className="border-b border-[var(--rule)] border-l-[3px] bg-[var(--surface)]"
      style={{ borderLeftColor: BAND_COLOR[displayBand] }}
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-[var(--surface-2)]"
      >
        <span className="mono w-9 shrink-0 text-base font-semibold tabular-nums text-[var(--ink-3)]">
          {String(rank).padStart(2, '0')}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-[var(--font-inter)] text-base font-bold text-[var(--ink)]">
              {venue.name}
            </span>
            <span className="mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
              {venue.chain}
            </span>
          </span>
          <span className="prose mt-0.5 block max-w-[66ch] text-sm text-[var(--ink-2)] line-clamp-2">
            {venue.thesis}
          </span>
          <span className="mono mt-1 block text-[11px] uppercase tracking-widest text-[var(--ink-3)]">
            {profileStrip(venue)}
          </span>
        </span>
        <span className="mono shrink-0 text-xl font-semibold tabular-nums text-[var(--ink)]">
          {displayFineness}
        </span>
        <span
          className="mono shrink-0 border border-l-[3px] px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest"
          style={{ borderColor: BAND_COLOR[displayBand], color: BAND_COLOR[displayBand] }}
        >
          {displayBand}
        </span>
        <DeltaMark delta={delta} />
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-[var(--ink-3)] transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {reduce ? (
        expanded ? (
          <div id={panelId}>{detail}</div>
        ) : null
      ) : (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              {detail}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </article>
  );
}
