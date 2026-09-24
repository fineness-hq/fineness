'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Flame, ShieldAlert, ShieldCheck, FileX, Award, CheckCircle2, XCircle } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

/**
 * CrucibleManifesto:
 * Explains the foundational thesis: separating unallocated paper promises from sovereign physical bullion.
 * Zero generic 01/02 numbering; tactile contrast between degraded paper claim and gold bullion hallmark.
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

        {/* Tactile Split: Paper Derivative vs Certified Bullion */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          
          {/* Side A: The Paper Trap */}
          <motion.div
            className="relative rounded-xl border border-red-500/30 bg-[var(--surface)] p-6 sm:p-8 shadow-xs overflow-hidden"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 0.33, 0.3, 1] }}
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-red-500" />
            
            <div className="flex items-center justify-between pb-4 border-b border-[var(--rule)]">
              <div className="flex items-center gap-2">
                <FileX size={16} className="text-red-600" />
                <span className="mono text-xs font-bold uppercase tracking-wider text-red-600">
                  UNALLOCATED PAPER CLAIM
                </span>
              </div>
              <span className="mono inline-flex items-center gap-1 rounded bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-[10px] font-black text-red-600">
                <ShieldAlert size={11} />
                HIGH COUNTERPARTY RISK
              </span>
            </div>

            <h3 className="mt-5 font-[var(--font-inter)] text-xl font-bold text-[var(--ink)]">
              The Paper Commodity Trap
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
              Opaque protocols issue yield-bearing commodity tokens with zero verifiable vault receipts or audited custodian relationships.
            </p>

            <ul className="mt-6 space-y-3 font-mono text-xs text-[var(--ink-2)]">
              <li className="flex items-start gap-2.5">
                <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                <span>Self-reported spreadsheets without third-party proof-of-reserves</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                <span>Non-redeemable synthetic derivatives disguised as physical gold</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                <span>Unallocated pooled bullion commingled with corporate debt</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                <span>Zero contractual recourse if the issuer shuts down public interfaces</span>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-[var(--rule)] flex items-center justify-between mono text-[10px] text-red-600 font-bold">
              <span>SCORE THRESHOLD: &lt; 375 / 1000</span>
              <span className="uppercase tracking-wider">STRUCK FROM REGISTER</span>
            </div>
          </motion.div>

          {/* Side B: Sovereign Bullion Hallmark */}
          <motion.div
            className="relative rounded-xl border-2 border-[var(--gold)]/70 bg-[var(--surface)] p-6 sm:p-8 shadow-md overflow-hidden"
            initial={reduce ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 0.33, 0.3, 1] }}
          >
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[var(--gold)]" />

            <div className="flex items-center justify-between pb-4 border-b border-[var(--rule)]">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-[var(--gold)]" />
                <span className="mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  INDEPENDENT ASSAY STANDARD
                </span>
              </div>
              <span className="mono inline-flex items-center gap-1 rounded bg-[var(--tint)] border border-[var(--gold)]/40 px-2 py-0.5 text-[10px] font-black text-[var(--gold)]">
                <ShieldCheck size={11} />
                24K SOVEREIGN GRADE
              </span>
            </div>

            <h3 className="mt-5 font-[var(--font-inter)] text-xl font-bold text-[var(--ink)]">
              The Cryptographic Gold Standard
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
              Legitimate bullion tokens provide bar-by-bar serial number registries, regulated custodian trust accounts, and segregated physical redemption rights.
            </p>

            <ul className="mt-6 space-y-3 font-mono text-xs text-[var(--ink-2)]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <span>Individually numbered London Good Delivery 400oz gold bars</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <span>Monthly attestation letters from top-tier independent audit firms</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <span>Segregated bankruptcy-remote vaulting (Zurich, London, NY)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <span>On-chain physical redemption contractually guaranteed in law</span>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-[var(--rule)] flex items-center justify-between mono text-[10px] text-[var(--gold)] font-bold">
              <span>SCORE THRESHOLD: ≥ 750 / 1000</span>
              <span className="uppercase tracking-wider">HALLMARK STRUCK (18K - 24K)</span>
            </div>
          </motion.div>

        </div>
      </Reveal>
    </section>
  );
}
