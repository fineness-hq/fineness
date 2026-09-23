'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HeroDiagram from './HeroDiagram';
import { WordText } from './Stagger';

interface HeroProps {
  edition: string;
  dataAsOf: string;
  snapshotHash: string;
  peak: number;
  peakBand: string;
}

/** Reference hero, Fineness content: badge, giant headline, edition bar, diagram, CTAs, trio. */
export default function Hero({ edition, dataAsOf, snapshotHash, peak, peakBand }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const lines = ['Most venues', 'launch memecoins.', 'We score purity.'];

  // Hold headline reveal until preloader lifts. Full reload replays
  // because ready flips false -> true on mount every time.
  useEffect(() => {
    let done = false;
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setReady(true);
        return;
      }
    } catch {
      setReady(true);
      return;
    }
    const onReady = () => {
      if (!done) {
        done = true;
        setReady(true);
      }
    };
    window.addEventListener('fineness:ready', onReady, { once: true });
    const fallback = window.setTimeout(onReady, 6500);
    return () => {
      done = true;
      window.removeEventListener('fineness:ready', onReady);
      window.clearTimeout(fallback);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snapshotHash);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section aria-labelledby="hero-title" className="tera-hero">
      <div className="page-wrap tera-hero-grid">
        <div className="tera-hero-left">
          <p className="tera-badge">
            <span className="tera-badge-num">01</span>
            <span className="tera-badge-label">EDITION {edition}</span>
          </p>
          <h1 id="hero-title" className="tera-h1" key={ready ? 'ready' : 'waiting'}>
            {lines.map((line, lineIdx) =>
              ready && !reduce ? (
                <motion.span
                  key={line}
                  className="hero-line block"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.7, delay: lineIdx * 0.15, ease: [0.2, 0.7, 0.25, 1] }}
                >
                  {line}
                </motion.span>
              ) : (
                <span
                  key={line}
                  className="hero-line block"
                  style={ready ? undefined : { opacity: 0 }}
                >
                  {line}
                </span>
              ),
            )}
          </h1>
          <motion.div
            className="tera-editionbar"
            initial={ready && !reduce ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="tera-editionbar-row">
              <span className="tera-editionbar-label">SNAPSHOT</span>
              <span className="tera-editionbar-hash">{snapshotHash.slice(0, 44)}…</span>
              <button type="button" onClick={copy} className="tera-editionbar-copy">
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="tera-editionbar-row">
              <Link href={`/editions/${edition}.json`} className="tera-editionbar-link">
                Edition JSON ↗
              </Link>
              <span className="tera-editionbar-asof">DATA AS OF {dataAsOf}</span>
            </div>
            <p className="tera-editionbar-progress">
              {peak >= 750 ? `PEAK ${peak} — A VENUE CLEARED 18 KARAT` : `PEAK ${peak} — NOTHING CLEARS 18 KARAT`}
            </p>
          </motion.div>
        </div>
        <div className="tera-hero-right">
          {reduce ? (
            <HeroDiagram peak={peak} band={peakBand} />
          ) : (
            <motion.div
              key={ready ? 'zoom-ready' : 'zoom-waiting'}
              initial={{ opacity: 0.001, scale: 1.2 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 0.33, 0.3, 1.01] }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
              >
                <HeroDiagram peak={peak} band={peakBand} />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      <div className="page-wrap tera-hero-sub">
        <p className="tera-lede">
          <WordText text="A MONTHLY REGISTER SCORING TOKENIZED VENUES ON WHAT ACTUALLY BACKS THE TOKEN. THE HOUSE WEIGHS FIVE CRITERIA. YOU CAN REWEIGH AND SHARE YOUR OWN ORDER." />
        </p>
      </div>
      <div aria-hidden="true" className="tera-bg-header">
        <div role="img" aria-label="background header" className="tera-bg-frame">
          <div className="tera-bg-track">
            {[0, 1, 2, 3].map((i) => (
              // eslint-disable-next-line @next/next/no-img-element -- raw img matches reference marquee markup
              <img
                key={i}
                src="/tera/bg-strip.png"
                srcSet="/tera/bg-strip-2048.png 2048w, /tera/bg-strip.png 2880w"
                alt=""
                draggable="false"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="page-wrap tera-cta-row">
        <Link href="#register" className="tera-cta tera-cta-light">
          EXPLORE THE REGISTER
        </Link>
        <Link href="/method" className="tera-cta tera-cta-dark">
          HOW IT WORKS
        </Link>
      </div>
      <div className="page-wrap tera-trio">
        <p>
          <span className="tera-trio-mark" aria-hidden="true" />
          <WordText text="EVERY FIGURE CARRIES A SOURCE" />
        </p>
        <p>
          <span className="tera-trio-mark" aria-hidden="true" />
          <WordText text="FIVE WEIGHTED CRITERIA" />
        </p>
        <p>
          <span className="tera-trio-mark" aria-hidden="true" />
          <WordText text="REWEIGH AND SHARE YOUR OWN ORDER" />
        </p>
      </div>
    </section>
  );
}
