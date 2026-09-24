'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

const FAQ_ITEMS = [
  {
    q: 'What is Fineness and why is it graded on a 0 to 1000 scale?',
    a: 'Fineness is the classical metallurgical standard for gold purity (1000/1000 is pure 24K bullion, and 750/1000 is 18K). We apply this rigorous physical framework to tokenized assets to evaluate whether a token represents true physical bullion or merely synthetic paper promises.',
  },
  {
    q: 'What does the 375 / 1000 Hallmark Gate signify?',
    a: '375 / 1000 represents 9 Karat gold — the universal legal minimum for metal to receive an official hallmark stamp. In the Crucible register, any token scoring below 375 fails assay and remains uncertified with elevated depeg risk.',
  },
  {
    q: 'How does Fineness verify physical vault reserves?',
    a: 'We evaluate three independent verification vectors: (1) on-chain proof-of-reserves smart contract oracles, (2) monthly legal attestations from accredited audit firms like Inspectorate or Bureau Veritas, and (3) provable 1:1 physical redemption mechanics for sovereign bars.',
  },
  {
    q: 'Can a protocol pay to improve its Karat hallmark?',
    a: 'Never. Fineness operates strictly as an independent editorial assay desk. We accept zero token sponsorships, listing fees, or marketing bribes. All math is deterministic, public, and open-source.',
  },
  {
    q: 'Why is The Bureaucrat Auditor Cat our chief mascot?',
    a: 'The Auditor Cat represents calm, unhurried institutional vigilance. Immune to crypto hype and memecoin euphoria, he sits at his desk with his espresso, physically slamming his brass stamp only when real-world bullion passes rigorous metallurgical assay.',
  },
];

export default function AssayFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const reduce = useReducedMotion();

  function toggle(idx: number) {
    setOpenIdx((cur) => (cur === idx ? null : idx));
  }

  return (
    <section aria-labelledby="faq-title" className="page-wrap py-14 border-b border-[var(--rule)]">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-4">
          <div>
            <p className="eyebrow">PRIMER // QUESTIONS & ANSWERS</p>
            <h2
              id="faq-title"
              className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            >
              <WordText text="Frequently Asked Questions" />
            </h2>
            <p className="prose mt-1 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
              Everything you need to know about the Fineness methodology, scoring mechanics, and hallmark standards.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--ink-3)]">
            <HelpCircle size={14} className="text-[var(--gold)]" />
            <span>THE PLAIN ENGLISH PRIMER</span>
          </div>
        </div>

        <div className="mt-8 divide-y divide-[var(--rule)] rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className="transition-colors hover:bg-[var(--tint)]/30">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-[var(--font-inter)] text-sm sm:text-base font-bold text-[var(--ink)]"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="mono text-xs font-black text-[var(--gold)]">
                      Q //
                    </span>
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-[var(--ink-3)] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[var(--gold)]' : ''
                    }`}
                  />
                </button>

                {reduce ? (
                  isOpen ? (
                    <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-[var(--ink-2)] pl-11">
                      {item.a}
                    </div>
                  ) : null
                ) : (
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-[var(--ink-2)] pl-11">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
