'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useSpring, useMotionValue } from 'framer-motion';
import { Fingerprint, Scale, Share2 } from 'lucide-react';
import AmbientCanvas from './AmbientCanvas';
import HeroChart from './HeroChart';
import { WordText } from './Stagger';
import type { Venue } from '../../types';

interface HeroProps {
  edition: string;
  dataAsOf: string;
  snapshotHash: string;
  peak: number;
  venues: Venue[];
}

/**
 * Redesigned hero. Locked to exactly one viewport on desktop:
 * badge + headline + lede + edition bar + CTAs left, live diagram
 * right, marquee hills behind. Trio ships as a separate strip below
 * so the viewport never overflows.
 */
export default function Hero({ edition, dataAsOf, snapshotHash, peak, venues }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 20 });
  const lines = ['Most venues', 'launch memecoins.', 'We score purity.'];

  // Hold the intro until the preloader lifts. Full reload replays
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

  function onTilt(e: React.MouseEvent<HTMLElement>) {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    tiltX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 10);
  }

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="tera-hero"
        onMouseMove={onTilt}
        onMouseLeave={resetTilt}
        style={{ perspective: 1000 }}
      >
        <AmbientCanvas />
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
        <div className="page-wrap tera-hero-grid">
          <div className="tera-hero-left">
            <p className="tera-badge">
              <span className="tera-badge-num">01</span>
              <span className="tera-badge-label">EDITION {edition}</span>
              <span className="tera-badge-asof">DATA AS OF {dataAsOf}</span>
            </p>
            <h1 id="hero-title" className="tera-h1" key={ready ? 'ready' : 'waiting'}>
              {lines.map((line, lineIdx) => {
                const content =
                  lineIdx === 0 ? (
                    <span className="h1-small">{line}</span>
                  ) : lineIdx === 1 ? (
                    <>launch <em>memecoins.</em></>
                  ) : (
                    <>We score <span className="h1-accent">purity.</span></>
                  );
                return ready && !reduce ? (
                  <motion.span
                    key={line}
                    className="hero-line block"
                    initial={{ y: 34, skewY: 3, opacity: 0, filter: 'blur(6px)' }}
                    animate={{ y: '0%', skewY: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.75, delay: lineIdx * 0.13, ease: [0.2, 0.7, 0.25, 1] }}
                  >
                    {content}
                  </motion.span>
                ) : (
                  <span
                    key={line}
                    className="hero-line block"
                    style={ready ? undefined : { opacity: 0 }}
                  >
                    {content}
                  </span>
                );
              })}
            </h1>
            <p className="tera-lede">
              <WordText text="A monthly register scoring tokenized venues on what actually backs the token." />
            </p>
            <motion.div
              className="tera-editionbar transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              initial={ready && !reduce ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="tera-editionbar-row">
                <span className="tera-editionbar-label">SNAPSHOT</span>
                <span className="tera-editionbar-hash">{snapshotHash.slice(0, 32)}…</span>
                <button type="button" onClick={copy} className="tera-editionbar-copy">
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <Link href={`/editions/${edition}.json`} className="tera-editionbar-link">
                  JSON ↗
                </Link>
              </div>
              <p className="tera-editionbar-progress">
                {peak >= 750 ? `PEAK ${peak} — A VENUE CLEARED 18 KARAT` : `PEAK ${peak} — NOTHING CLEARS 18 KARAT`}
              </p>
            </motion.div>
            <motion.div
              className="tera-cta-row"
              initial={ready && !reduce ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.5 }}
            >
              <Link
                href="#register"
                className="tera-cta tera-cta-light group relative overflow-hidden active:scale-[0.98]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-[var(--gold)] transition-transform duration-300 ease-out group-hover:translate-x-0"
                />
                <span className="relative">EXPLORE THE REGISTER</span>
                <span
                  aria-hidden="true"
                  className="relative inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  &nbsp;↗
                </span>
              </Link>
              <Link
                href="/method"
                className="tera-cta tera-cta-dark group active:scale-[0.98]"
              >
                <span className="relative">
                  HOW IT WORKS
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-full"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                >
                  &nbsp;↗
                </span>
              </Link>
            </motion.div>
          </div>
        <div className="tera-hero-right">
          {reduce ? (
            <HeroChart venues={venues} ready={ready} />
          ) : (
            <motion.div
              key={ready ? 'zoom-ready' : 'zoom-waiting'}
              initial={{ opacity: 0.001, scale: 1.2 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 0.33, 0.3, 1.01] }}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
              >
                <HeroChart venues={venues} ready={ready} />
              </motion.div>
            </motion.div>
          )}
        </div>
        </div>
      </section>
      <div
        className="relative overflow-hidden border-y border-[var(--rule)] bg-[var(--surface)]"
        aria-label="Register principles"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(var(--rule-soft) 1px, transparent 1px), linear-gradient(90deg, var(--rule-soft) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-[var(--gold)] opacity-10 blur-[100px]"
        />
        <div className="page-wrap relative grid gap-x-8 sm:grid-cols-3">
          {[
            {
              n: '01',
              icon: Fingerprint,
              title: 'EVERY FIGURE CARRIES A SOURCE',
              desc: 'Each metric resolves to a named provenance entry.',
            },
            {
              n: '02',
              icon: Scale,
              title: 'FIVE WEIGHTED CRITERIA',
              desc: 'House 30 / 25 / 20 / 15 / 10, reweighted live.',
            },
            {
              n: '03',
              icon: Share2,
              title: 'REWEIGH AND SHARE YOUR OWN ORDER',
              desc: 'Your weights encode into a shareable link.',
            },
          ].map((p, i) => (
            <motion.div
              key={p.n}
              className="group relative flex items-start gap-4 border-t border-[var(--rule)] py-6 transition-colors first:border-t-0 sm:border-l sm:border-t-0 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.2, 0.7, 0.25, 1] }}
            >
              <span
                aria-hidden="true"
                className="font-[var(--font-inter)] text-4xl font-extrabold tabular-nums text-[var(--rule-2)] transition-colors duration-300 group-hover:text-[var(--gold)]"
              >
                {p.n}
              </span>
              <div>
                <p.icon
                  size={16}
                  aria-hidden="true"
                  className="mb-2 text-[var(--gold)] transition-transform duration-300 group-hover:scale-125"
                />
                <p className="font-[var(--font-inter)] text-sm font-bold tracking-tight text-[var(--ink)]">
                  {p.title}
                </p>
                <p className="mono mt-1 text-[11px] leading-relaxed text-[var(--ink-2)]">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
