'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

const FAQ_ITEMS = [
  {
    q: 'What is Fineness and why is it graded on a 0 to 1000 scale?',
    a: 'Fineness borrows the gold purity scale (1000 is fine, 750 is 18 karat) to score one gap: venues marketed as real-world-asset platforms whose real asset shows up only as the pairing.',
  },
  {
    q: 'What does the 375 / 1000 Hallmark Gate signify?',
    a: '375 / 1000 is the 9-karat line: the minimum for a venue to count as certified. Below it a venue stays listed but uncertified. The gate moves with reweighting, but the published standing never does.',
  },
  {
    q: 'How is backing evidence checked?',
    a: 'Analysts read public material only: verified contracts and docs, published volume series, and the pairing record: who custodies it, whether it redeems, how it verifies. A missing figure stays null and renders as not published, never as zero.',
  },
  {
    q: 'Can a protocol pay to improve its Karat hallmark?',
    a: 'Never. Fineness operates strictly as an independent editorial scoring desk. We accept zero token sponsorships, listing fees, or marketing bribes. All math is deterministic, public, and open-source.',
  },
  {
    q: 'Why is the Fineness Cat our chief mascot?',
    a: 'The Fineness Cat is calm, unhurried vigilance: immune to hype, parked at his desk with an espresso, stamping every frozen edition as it publishes.',
  },
];

export default function FinenessFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const reduce = useReducedMotion();

  function toggle(idx: number) {
    setOpenIdx((cur) => (cur === idx ? null : idx));
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="page-wrap py-14 border-b border-[var(--rule)]">
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

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* FAQ Accordion List (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-[var(--rule)] rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs overflow-hidden flex flex-col justify-between">
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

          {/* Chief Scorer Mascot Card (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(196,139,15,0.12),transparent_70%)] pointer-events-none" />
            
            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] font-mono text-[11px]">
                <span className="font-bold text-[var(--gold)] flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-ping" />
                  CHIEF MASCOT
                </span>
                <span className="text-[10px] text-[var(--ink-3)] uppercase tracking-wider font-semibold">
                  SWISS SCORING DESK
                </span>
              </div>

              {/* Inspector Banner Image */}
              <div className="relative mt-3.5 h-44 sm:h-48 w-full rounded-lg overflow-hidden border border-[var(--rule)] bg-[#0C1014] shadow-inner group">
                <Image
                  src="/images/cat-inspector-8bit.jpg"
                    alt="Chief Fineness Cat Inspecting Evidence with Loupe"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between font-mono text-xs z-10">
                  <span className="font-bold text-amber-300 flex items-center gap-1 text-[11px]">
                    <Sparkles size={11} className="text-amber-400" />
                    <span>WEIGHED & FROZEN</span>
                  </span>
                  <span className="text-[9px] text-white/80 bg-black/60 px-1.5 py-0.5 rounded border border-white/20">
                    CALM VIGILANCE
                  </span>
                </div>
              </div>

              <h3 className="mt-3.5 font-[var(--font-inter)] text-base font-black text-[var(--ink)] leading-snug">
                Calm, Unhurried Vigilance
              </h3>
              <p className="mt-1 text-xs text-[var(--ink-2)] leading-relaxed">
                    Immune to crypto hype and narrative churn. Parked at his scoring desk with an espresso, inspecting every figure and stamping frozen editions.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--rule)] flex items-center justify-between font-mono text-[11px]">
              <span className="text-[var(--ink-3)]">STATUS</span>
              <span className="font-bold text-emerald-500 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                DUTY AT THE CRUCIBLE
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
