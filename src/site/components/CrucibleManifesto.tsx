'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Flame, ShieldAlert, ShieldCheck, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

/**
 * CrucibleManifesto:
 * Explains the foundational reason why Fineness exists.
 * Contrasts opaque paper promises against independent cryptographic assay.
 */
export default function CrucibleManifesto() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="manifesto-title" className="page-wrap py-14 border-b border-[var(--rule)]">
      <Reveal>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--tint)] px-3 py-1 font-mono text-xs font-bold text-[var(--gold)] shadow-2xs">
            <Flame size={13} className="text-[var(--gold)]" />
            <span>THE CRUCIBLE DISCLOSURE</span>
          </div>

          <h2
            id="manifesto-title"
            className="mt-4 font-[var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] leading-tight"
          >
            <WordText text="Separating Sovereign Bullion from Paper Illusions." />
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--ink-2)] leading-relaxed">
            The tokenized real-world asset market is flooded with promises. Anyone can deploy an ERC-20 contract and claim it is backed by physical gold. Fineness acts as the independent assay office of decentralized finance — stress-testing claims against immutable proof.
          </p>
        </div>

        {/* Contrast Comparison Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Card 1: The Opaque Reality */}
          <motion.div
            className="relative rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs overflow-hidden"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 0.33, 0.3, 1] }}
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-[var(--band-none)]" />
            
            <div className="flex items-center justify-between pb-4 border-b border-[var(--rule)]">
              <span className="mono text-xs font-bold uppercase tracking-wider text-[var(--band-none)]">
                THE STATUS QUO // 0 - 374 / 1000
              </span>
              <span className="mono inline-flex items-center gap-1 rounded bg-red-500/10 px-2 py-0.5 text-[10px] font-black text-[var(--band-none)]">
                <ShieldAlert size={11} />
                UNVERIFIED
              </span>
            </div>

            <h3 className="mt-4 font-[var(--font-inter)] text-xl font-bold text-[var(--ink)]">
              The Paper Commodity Trap
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
              Opaque protocols issue yield-bearing commodity tokens with zero verifiable vault receipts or audited custodian relationships.
            </p>

            <ul className="mt-6 space-y-3 font-mono text-xs text-[var(--ink-2)]">
              <li className="flex items-start gap-2.5">
                <span className="text-[var(--band-none)] font-bold">✕</span>
                <span>Self-reported spreadsheets without third-party proof-of-reserves</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[var(--band-none)] font-bold">✕</span>
                <span>Non-redeemable synthetic derivatives disguised as physical gold</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[var(--band-none)] font-bold">✕</span>
                <span>Unallocated pooled bullion commingled with corporate debt</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[var(--band-none)] font-bold">✕</span>
                <span>Zero contractual recourse if the issuer shuts down public interfaces</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 2: The Fineness Standard */}
          <motion.div
            className="relative rounded-2xl border-2 border-[var(--gold)]/60 bg-[var(--surface)] p-6 sm:p-8 shadow-md overflow-hidden"
            initial={reduce ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 0.33, 0.3, 1] }}
          >
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[var(--gold)]" />

            <div className="flex items-center justify-between pb-4 border-b border-[var(--rule)]">
              <span className="mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                THE FINENESS STANDARD // ≥ 750 / 1000
              </span>
              <span className="mono inline-flex items-center gap-1 rounded bg-[var(--tint)] border border-[var(--gold)]/40 px-2 py-0.5 text-[10px] font-black text-[var(--gold)]">
                <ShieldCheck size={11} />
                HALLMARK CERTIFIED
              </span>
            </div>

            <h3 className="mt-4 font-[var(--font-inter)] text-xl font-bold text-[var(--ink)]">
              The Cryptographic Gold Standard
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
              Every venue is audited under five weighted criteria with 100% reproducible math, public contracts, and verifiable custodian vaults.
            </p>

            <ul className="mt-6 space-y-3 font-mono text-xs text-[var(--ink)]">
              <li className="flex items-start gap-2.5">
                <span className="text-[var(--ok)] font-bold">✓</span>
                <span>Direct legal title to physical allocated bullion in insured vaults</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[var(--ok)] font-bold">✓</span>
                <span>Cryptographic proof-of-reserves audited by regulated assay offices</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[var(--ok)] font-bold">✓</span>
                <span>Guaranteed physical 1:1 delivery for sovereign bar redemption</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[var(--ok)] font-bold">✓</span>
                <span>Permanent immutable ledger snapshot signed with SHA-256 hash</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
