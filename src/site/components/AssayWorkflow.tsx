'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Database, Cpu, Stamp, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

const WORKFLOW_STEPS = [
  {
    step: '01',
    phase: 'INGESTION',
    title: 'On-Chain & Vault Ingestion',
    desc: 'Public RPC nodes and scraper workers ingest live smart contract bytecode, custodian attestations, oracle feeds, and DEX liquidity at an immutable monthly timestamp.',
    icon: Database,
    tag: 'FROZEN TIMESTAMP',
  },
  {
    step: '02',
    phase: 'SMELTING',
    title: '5-Pillar Metallurgical Smelt',
    desc: 'Raw metrics are fed into the Crucible scoring engine across Asset Backing, Volume Traction, Reserve Transparency, Custody Compliance, and Protocol Durability.',
    icon: Cpu,
    tag: 'WEIGHTED SCORING',
  },
  {
    step: '03',
    phase: 'HALLMARK',
    title: 'Cryptographic Assay Stamp',
    desc: 'The official Fineness Karat Hallmark (0 to 1000) is struck. A SHA-256 snapshot hash seals the edition permanently into public JSON and web registers.',
    icon: Stamp,
    tag: 'IMMUTABLE PROOF',
  },
];

/**
 * AssayWorkflow:
 * Explains the 3-step technical pipeline from raw blockchain data to certified Karat hallmark.
 */
export default function AssayWorkflow() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="workflow-title" className="page-wrap py-14 border-b border-[var(--rule)]">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-4">
          <div>
            <p className="eyebrow">CRUCIBLE ENGINE // WORKFLOW</p>
            <h2
              id="workflow-title"
              className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            >
              <WordText text="How the Crucible Machine Audits" />
            </h2>
            <p className="prose mt-1 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
              From raw contract bytecode to an immutable sovereign gold hallmark: a three-stage deterministic assay process.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-2)]">
            <span className="h-2 w-2 rounded-full bg-[var(--action)] animate-ping" />
            <span className="font-bold text-[var(--ink)]">ENGINE STATUS:</span>
            <span className="font-semibold text-[var(--gold)]">DETERMINISTIC 100%</span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {WORKFLOW_STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                className="group relative flex flex-col justify-between rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-xs transition-all hover:border-[var(--gold)] hover:shadow-md"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.12, ease: [0.16, 0.33, 0.3, 1] }}
              >
                <div>
                  {/* Top Bar with Step & Icon */}
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                    <span className="mono text-2xl font-black text-[var(--gold)]">
                      {s.step}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink)] group-hover:bg-[var(--dark)] group-hover:text-white transition-all">
                      <Icon size={16} />
                    </span>
                  </div>

                  <span className="mono mt-4 block text-[10px] font-bold uppercase tracking-widest text-[var(--ink-3)]">
                    STAGE // {s.phase}
                  </span>

                  <h3 className="mt-1 font-[var(--font-inter)] text-lg font-bold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                    {s.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[var(--ink-2)]">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[10px] text-[var(--ink-3)]">
                  <span className="font-bold text-[var(--ink-2)]">{s.tag}</span>
                  <span className="text-[var(--gold)] font-semibold">STAGE COMPLETE →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
