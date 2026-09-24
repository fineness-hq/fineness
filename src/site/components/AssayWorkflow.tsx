'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Database, Cpu, Stamp, CheckCircle2, Shield, Radio, Terminal } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

const PIPELINE_STATIONS = [
  {
    stationId: 'ingest',
    callsign: 'STAGE I: INGESTION',
    title: 'On-Chain & Vault Telemetry',
    desc: 'Public RPC nodes and scraper daemons query live contract bytecode, custodian attestations, and oracle feeds at a frozen monthly block height.',
    icon: Database,
    stamp: 'TELEMETRY PROOF',
    readouts: [
      { k: 'BLOCK SNAPSHOT', v: 'FROZEN TIMESTAMP' },
      { k: 'PROOFS SAMPLED', v: 'LBMA / ZURICH / NY' },
      { k: 'VERIFICATION', v: 'MERKLE LEAF VERIFIED' },
    ],
  },
  {
    stationId: 'smelt',
    callsign: 'STAGE II: SMELTING',
    title: '5-Pillar Metallurgical Smelt',
    desc: 'Raw metrics are fed into the Crucible engine. The five criteria are weighed mathematically, balancing asset backing against counterparty opacity.',
    icon: Cpu,
    stamp: 'WEIGHTED CALIPER',
    readouts: [
      { k: 'HOUSE WEIGHTS', v: '30 / 25 / 20 / 15 / 10' },
      { k: 'CALIBRATION', v: 'STRESS COEFF 1.0X' },
      { k: 'GATE CUTOFF', v: '375 / 1000 THRESHOLD' },
    ],
  },
  {
    stationId: 'hallmark',
    callsign: 'STAGE III: HALLMARK',
    title: 'Cryptographic Assay Stamp',
    desc: 'The official Karat Hallmark (0 to 1000) is struck. A SHA-256 snapshot hash seals the edition permanently into public JSON and web registers.',
    icon: Stamp,
    stamp: 'IMMUTABLE SEAL',
    readouts: [
      { k: 'STAMP RATING', v: '0 - 1000 MILLIS' },
      { k: 'SNAPSHOT INTEGRITY', v: 'SHA-256 SECURED' },
      { k: 'DISTRIBUTION', v: 'PUBLIC RAW JSON' },
    ],
  },
];

/**
 * AssayWorkflow:
 * Replaces generic AI card layout with an authentic metallurgical pipeline conduit.
 * Zero "01/02" numbering; bespoke technical assayer readouts and tactile conduits.
 */
export default function AssayWorkflow() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="workflow-title" className="page-wrap py-14 border-b border-[var(--rule)]">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-4">
          <div>
            <p className="eyebrow">CRUCIBLE ENGINE // TECHNICAL PIPELINE</p>
            <h2
              id="workflow-title"
              className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            >
              <WordText text="The Sovereign Assay Pipeline" />
            </h2>
            <p className="prose mt-1 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
              From raw contract bytecode to an immutable sovereign gold hallmark: a three-station deterministic forge.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-600 font-bold">
              <Radio size={11} className="animate-pulse" />
              ENGINE ACTIVE
            </span>
            <span className="text-[var(--ink-2)]">DETERMINISTIC 100%</span>
          </div>
        </div>

        {/* Conduit Pipeline Grid */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {PIPELINE_STATIONS.map((station, idx) => {
            const Icon = station.icon;
            return (
              <motion.div
                key={station.stationId}
                className="group relative flex flex-col justify-between rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-xs transition-all hover:border-[var(--gold)] hover:shadow-md"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 0.33, 0.3, 1] }}
              >
                <div>
                  {/* Station Header: Callsign & Emblem */}
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                    <span className="mono inline-flex items-center gap-1.5 text-xs font-black tracking-wider text-[var(--gold)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                      {station.callsign}
                    </span>
                    <span className="mono text-[10px] font-bold text-[var(--ink-3)] uppercase tracking-wider border border-[var(--rule)] px-2 py-0.5 rounded bg-[var(--surface-alt)]">
                      {station.stamp}
                    </span>
                  </div>

                  {/* Title & Icon Strip */}
                  <div className="mt-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink)] group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-white transition-all">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-[var(--font-inter)] text-base font-bold text-[var(--ink)] leading-snug group-hover:text-[var(--gold)] transition-colors">
                        {station.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--ink-2)]">
                        {station.desc}
                      </p>
                    </div>
                  </div>

                  {/* Technical Assay Telemetry Box */}
                  <div className="mt-5 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)]/70 p-3 font-mono text-[11px]">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--rule)]/60 text-[9px] font-bold uppercase tracking-wider text-[var(--ink-3)]">
                      <span className="inline-flex items-center gap-1">
                        <Terminal size={10} /> STATION TELEMETRY
                      </span>
                      <span className="text-emerald-600 font-bold">READY</span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {station.readouts.map((r) => (
                        <div key={r.k} className="flex items-center justify-between text-[10px]">
                          <span className="text-[var(--ink-3)]">{r.k}</span>
                          <span className="font-semibold text-[var(--ink)]">{r.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Verification Seal */}
                <div className="mt-5 flex items-center justify-between pt-3 border-t border-[var(--rule)]">
                  <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)] flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-[var(--gold)]" /> AUDIT STATUS
                  </span>
                  <span className="mono text-[10px] font-bold text-[var(--ink)]">
                    CRYPTOGRAPHIC PROOF
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
