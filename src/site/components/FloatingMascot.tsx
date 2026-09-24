'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

const MASCOT_QUOTES = [
  'Weighing backing evidence, not promises...',
  'Zero listing bribes accepted.',
  'Calm, unhurried vigilance.',
  'Frozen edition published.',
  'Missing data? Null, never zero.',
  'Same inputs, same output. Always.',
];

export default function FloatingMascot() {
  const [isOpen, setIsOpen] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [stamped, setStamped] = useState(false);

  function nextQuote() {
    setQuoteIdx((cur) => (cur + 1) % MASCOT_QUOTES.length);
    setStamped(true);
    setTimeout(() => setStamped(false), 800);
  }

  return (
    <aside aria-label="Chief Assayer Mascot Widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Speech Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="mb-3 max-w-[240px] rounded-2xl border-2 border-[var(--gold)] bg-[var(--surface)] p-3.5 shadow-2xl font-mono text-xs text-[var(--ink)] relative"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-[var(--rule)] mb-1.5">
              <span className="text-[10px] font-bold text-[var(--gold)] flex items-center gap-1">
                <Sparkles size={11} className="text-[var(--gold)]" />
                <span>CHIEF ASSAYER CAT</span>
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[var(--ink-3)] hover:text-[var(--ink)] cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={12} />
              </button>
            </div>
            <p className="text-[11px] leading-relaxed text-[var(--ink-2)]">
              &ldquo;{MASCOT_QUOTES[quoteIdx]}&rdquo;
            </p>
            <button
              type="button"
              onClick={nextQuote}
              className="mt-2 w-full rounded-md border border-[var(--rule)] bg-[var(--surface-alt)] py-1 text-[10px] font-bold text-[var(--gold)] hover:border-[var(--gold)] transition-colors cursor-pointer"
            >
              {stamped ? '★ WEIGHED ★' : 'TAP FOR WISDOM ↗'}
            </button>
            {/* Bubble arrow */}
            <div className="absolute -bottom-2 right-6 h-3 w-3 rotate-45 border-b-2 border-r-2 border-[var(--gold)] bg-[var(--surface)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cat Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          if (!isOpen) setIsOpen(true);
          else nextQuote();
        }}
        className="relative group flex items-center gap-2 rounded-full border-2 border-[var(--gold)] bg-[#0C1014] p-1.5 pr-3 shadow-xl hover:shadow-[0_0_20px_rgba(196,139,15,0.4)] transition-all cursor-pointer"
        aria-label="Chief Assayer Mascot — Click for assay quote"
      >
        <div className="relative h-10 w-10 rounded-full overflow-hidden border border-[var(--gold)]/60 bg-black">
          <Image
            src="/images/cat-inspector-8bit.jpg"
            alt="Chief Assayer Cat Mascot"
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="hidden sm:flex flex-col items-start text-left font-mono">
          <span className="text-[10px] font-black text-[var(--gold)] leading-none">
            CHIEF ASSAYER
          </span>
          <span className="text-[9px] text-emerald-400 font-semibold leading-none mt-0.5">
            CALM VIGILANCE
          </span>
        </div>
      </motion.button>
    </aside>
  );
}
