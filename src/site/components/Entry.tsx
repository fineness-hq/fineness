'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUp, ChevronDown, Minus, Check, Copy, ExternalLink, ShieldCheck, Link2 } from 'lucide-react';
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
  '18k': 'var(--gold)',
  '14k': 'var(--band-mid)',
  '9k': 'var(--band-low)',
  'below-hallmark': 'var(--band-none)',
};

/** One-line venue profile from pairing and status. Published inputs only. */
export function profileStrip(venue: Venue): string {
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
      <span className="mono rounded bg-[var(--surface-alt)] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[var(--ink-3)]">
        New
      </span>
    );
  }
  if (delta.fineness === 0 && delta.rank === 0) {
    return (
      <span className="mono flex items-center gap-0.5 text-xs tabular-nums text-[var(--ink-3)]">
        <Minus size={11} aria-hidden="true" /> 0
      </span>
    );
  }
  const up = delta.fineness > 0;
  return (
    <span
      className="mono flex items-center gap-0.5 text-xs font-semibold tabular-nums"
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
  const [copiedContract, setCopiedContract] = useState<string | null>(null);
  const panelId = `entry-panel-${venue.id}`;
  const buttonId = `entry-button-${venue.id}`;

  const copyAddress = async (addr: string) => {
    try {
      await navigator.clipboard.writeText(addr);
      setCopiedContract(addr);
      setTimeout(() => setCopiedContract(null), 1800);
    } catch {
      setCopiedContract(null);
    }
  };

  const detail = (
    <div className="border-t border-[var(--rule)] bg-[var(--surface-alt)]/40 px-5 py-6">
      {/* Official Venue Dossier Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--rule)] pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--gold)] text-white shadow-xs">
            <ShieldCheck size={14} />
          </span>
          <div>
            <h3 className="mono text-xs font-black uppercase tracking-wider text-[var(--ink)]">
              OFFICIAL VENUE DOSSIER // {venue.name}
            </h3>
            <p className="mono text-[10px] text-[var(--ink-3)]">
              FINENESS SCORING LEDGER
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span
            className="rounded border px-2.5 py-1 font-extrabold uppercase tracking-wider shadow-xs"
            style={{
              borderColor: BAND_COLOR[displayBand],
              backgroundColor: 'var(--surface)',
              color: BAND_COLOR[displayBand],
            }}
          >
            {displayBand} STANDING
          </span>
          <span className="rounded bg-[var(--dark)] px-2.5 py-1 font-bold text-white shadow-xs">
            {displayFineness} / 1000 PURITY
          </span>
        </div>
      </div>

      {/* 5 Criteria Grid */}
      <h3 className="mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
        Editorial Score Breakdown
      </h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CRITERIA.map((c) => {
          const score = venue.scores[c];
          return (
            <div key={c} className="flex flex-col justify-between rounded border border-[var(--rule)] bg-[var(--surface-2)] p-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-2)]">
                    {c}
                  </span>
                  <span className="mono text-xs font-bold tabular-nums text-[var(--ink)]">
                    {score}/10
                  </span>
                </div>
                {/* Score bar */}
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-alt)]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(score / 10) * 100}%`,
                      backgroundColor:
                        score >= 8
                          ? 'var(--ok)'
                          : score >= 6
                          ? 'var(--gold)'
                          : score >= 4
                          ? 'var(--band-low)'
                          : 'var(--band-none)',
                    }}
                  />
                </div>
                <p className="prose mt-2 text-xs leading-relaxed text-[var(--ink-2)]">
                  {venue.rationale[c]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Financial Metrics Bento */}
      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-4">
        {(
          [
            ['Cumulative volume', usd(venue.metrics.cumulativeVolumeUsd)],
            ['Daily volume', usd(venue.metrics.dailyVolumeUsd)],
            ['Fees 24h', usd(venue.metrics.fees24hUsd)],
            ['TVL', dash(venue.metrics.tvlUsd)],
          ] as [string, string][]
        ).map(([label, value]) => (
          <div key={label} className="bg-[var(--surface)] px-4 py-3">
            <dt className="mono text-[10px] uppercase tracking-wider text-[var(--ink-3)]">
              {label}
            </dt>
            <dd className="mono mt-1 text-sm font-semibold tabular-nums text-[var(--ink)]">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Editorial Facts & Quotes */}
      {venue.facts.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-l-2 border-[var(--gold)] pl-3 text-xs text-[var(--ink-2)]">
          {venue.facts.map(([figure, note]) => (
            <li key={`${figure}-${note}`} className="flex items-baseline gap-2">
              <span className="mono font-bold tabular-nums text-[var(--ink)]">{figure}</span>
              <span>— {note}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Contracts & Links Inspectors */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* Contracts Box */}
        <div className="rounded border border-[var(--rule)] bg-[var(--surface-2)] p-3.5">
          <div className="flex items-center justify-between">
            <p className="mono text-[11px] font-bold uppercase tracking-wider text-[var(--ink)]">
              Contracts
            </p>
            <span className="mono text-[10px] text-[var(--ink-3)]">ON-CHAIN VERIFIED</span>
          </div>
          <ul className="mt-2 space-y-2">
            {venue.contracts.length === 0 && (
              <li className="mono text-xs text-[var(--ink-3)]">not published</li>
            )}
            {venue.contracts.map((c) => (
              <li
                key={`${c.label}-${c.address}`}
                className="mono flex items-center justify-between gap-2 rounded bg-[var(--surface)] p-2 text-xs border border-[var(--rule)]"
              >
                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                  <ShieldCheck
                    size={13}
                    className={c.verified ? 'text-[var(--ok)] shrink-0' : 'text-[var(--ink-3)] shrink-0'}
                  />
                  <span className="font-semibold text-[var(--ink)] shrink-0">{c.label}:</span>
                  <span
                    className="mono no-scrollbar min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-[11px] tracking-wider text-[var(--ink-2)]"
                    title={c.address}
                  >
                    {c.address}
                  </span>
                  <span className="shrink-0 text-[10px] text-[var(--ink-3)]">
                    {c.verified ? '(verified)' : '(unverified)'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyAddress(c.address)}
                  className="shrink-0 self-start rounded border border-transparent p-1.5 text-[var(--ink-3)] transition-all hover:border-[var(--gold)] hover:text-[var(--ink)]"
                  title="Copy full address"
                >
                  {copiedContract === c.address ? (
                    <Check size={12} className="text-[var(--ok)]" />
                  ) : (
                    <Copy size={12} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Box */}
        <div className="rounded border border-[var(--rule)] bg-[var(--surface-2)] p-3.5">
          <div className="flex items-center justify-between">
            <p className="mono text-[11px] font-bold uppercase tracking-wider text-[var(--ink)]">
              Links
            </p>
            <span className="mono text-[10px] text-[var(--ink-3)]">OFFICIAL DOMAINS</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {venue.links.site && (
              <a
                href={venue.links.site}
                target="_blank"
                rel="noopener noreferrer"
                className="mono inline-flex items-center gap-1 rounded border border-[var(--rule)] bg-[var(--surface)] px-2.5 py-1 text-[var(--ink)] transition-all hover:border-[var(--dark)]"
              >
                <ExternalLink size={12} /> Site ↗
              </a>
            )}
            {venue.links.docs && (
              <a
                href={venue.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="mono inline-flex items-center gap-1 rounded border border-[var(--rule)] bg-[var(--surface)] px-2.5 py-1 text-[var(--ink)] transition-all hover:border-[var(--dark)]"
              >
                <Link2 size={12} /> Docs ↗
              </a>
            )}
            {!venue.links.site && !venue.links.docs && (
              <span className="mono text-xs text-[var(--ink-3)]">not published</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <article
      aria-labelledby={buttonId}
      className="group relative border-b border-[var(--rule)] bg-[var(--surface)] transition-all hover:bg-[var(--tint)]/40"
      style={{ borderLeft: `4px solid ${BAND_COLOR[displayBand]}` }}
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors"
      >
        {/* Rank Number */}
        <span className="mono flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--rule)] bg-[var(--surface-alt)] text-xs font-black tabular-nums text-[var(--ink)] shadow-2xs group-hover:border-[var(--dark)] group-hover:bg-[var(--dark)] group-hover:text-white transition-all">
          {String(rank).padStart(2, '0')}
        </span>

        {/* Venue Info */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-[var(--font-inter)] text-base font-extrabold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
              {venue.name}
            </span>
            <span className="mono rounded border border-[var(--rule)] bg-[var(--surface-alt)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--ink-2)]">
              {venue.chain}
            </span>
            <span className="mono rounded bg-[var(--surface-2)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--ink-3)]">
              {venue.pairing.assetType}
            </span>
            {venue.resident && (
              <span className="mono rounded border border-[var(--gold)]/40 bg-[var(--tint)] px-1.5 py-0.5 text-[9px] uppercase font-bold text-[var(--gold)]">
                ★ RESIDENT
              </span>
            )}
          </div>

          <p className="prose mt-1 block max-w-[70ch] text-xs leading-relaxed text-[var(--ink-2)] line-clamp-1">
            {venue.thesis}
          </p>

          <span className="mono mt-1 block text-[10px] uppercase tracking-wider text-[var(--ink-3)]">
            {profileStrip(venue)}
          </span>
        </div>

        {/* Precision Purity Gauge in Row */}
        <div className="hidden md:flex flex-col items-end gap-1 shrink-0 w-36">
          <div className="flex items-center justify-between w-full text-[10px] font-mono">
            <span className="text-[var(--ink-3)] font-semibold">PURITY GAUGE</span>
            <span className="font-extrabold" style={{ color: BAND_COLOR[displayBand] }}>
              {displayFineness} <span className="text-[9px] font-normal opacity-75">/ 1000</span>
            </span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-[var(--surface-alt)] overflow-hidden border border-[var(--rule)]/60">
            {/* Hallmark 375 line */}
            <div className="absolute inset-y-0 left-[37.5%] w-[1px] bg-white z-10 opacity-70" title="375 Cutoff" />
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(displayFineness / 1000) * 100}%`,
                backgroundColor: BAND_COLOR[displayBand],
              }}
            />
          </div>
        </div>

        {/* Score & Band Stamp */}
        <div className="flex items-center gap-2.5 shrink-0 font-mono">
          <div className="flex flex-col items-end">
            <span className="text-lg font-black tabular-nums text-[var(--ink)] leading-none">
              {displayFineness}<span className="text-[10px] font-bold text-[var(--gold)] ml-0.5">/1000</span>
            </span>
            <DeltaMark delta={delta} />
          </div>
          <span
            className="flex items-center justify-center rounded border px-2 py-1 text-[10px] font-black uppercase tracking-wider shadow-2xs"
            style={{
              borderColor: BAND_COLOR[displayBand],
              color: BAND_COLOR[displayBand],
              backgroundColor: 'var(--surface)',
            }}
          >
            {displayBand}
          </span>
        </div>

        {/* Accordion Chevron */}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-[var(--ink-3)] transition-transform duration-200 ${
            expanded ? 'rotate-180 text-[var(--action)]' : ''
          }`}
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
