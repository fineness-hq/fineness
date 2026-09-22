'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroDiagram from './HeroDiagram';

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
  const rootRef = useRef<HTMLElement>(null);
  const lines = ['Most venues', 'launch memecoins.', 'We score purity.'];

  // Parallax drift on the background hills. Scroll only, no layout shift.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to('.tera-bg-header', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, rootRef);
    return () => {
      ctx.revert();
    };
  }, []);

  // Hold headline reveal until preloader lifts. Full reload replays
  // because ready flips false -> true on mount every time.
  useEffect(() => {
    let done = false;
    try {
      const params = new URLSearchParams(window.location.search);
      const replay = params.get('intro') === '1';
      if (
        !replay &&
        (window.sessionStorage.getItem('fineness-preloader-v1') === '1' ||
          window.sessionStorage.getItem('tera-preloader-v1') === '1' ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      ) {
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
    <section aria-labelledby="hero-title" className="tera-hero" ref={rootRef}>
      <div className="page-wrap tera-hero-grid">
        <div className="tera-hero-left">
          <p className="tera-badge">
            <span className="tera-badge-num">01</span>
            <span className="tera-badge-label">EDITION {edition}</span>
          </p>
          <h1 id="hero-title" className="tera-h1" key={ready ? 'ready' : 'waiting'}>
            {lines.map((line, i) => (
              <span
                key={line}
                className="hero-line block"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  animationPlayState: ready ? 'running' : 'paused',
                  opacity: ready ? undefined : 0,
                }}
              >
                {line}
              </span>
            ))}
          </h1>
          <div className="tera-editionbar">
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
          </div>
        </div>
        <div className="tera-hero-right">
          <HeroDiagram peak={peak} band={peakBand} />
        </div>
      </div>
      <div className="page-wrap tera-hero-sub">
        <p className="tera-lede">
          A MONTHLY REGISTER SCORING TOKENIZED VENUES ON WHAT ACTUALLY BACKS
          THE TOKEN. THE HOUSE WEIGHS FIVE CRITERIA. YOU CAN REWEIGH AND SHARE
          YOUR OWN ORDER.
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
          EVERY FIGURE
          <br />
          CARRIES A SOURCE
        </p>
        <p>
          <span className="tera-trio-mark" aria-hidden="true" />
          FIVE WEIGHTED
          <br />
          CRITERIA
        </p>
        <p>
          <span className="tera-trio-mark" aria-hidden="true" />
          REWEIGH AND SHARE
          <br />
          YOUR OWN ORDER
        </p>
      </div>
    </section>
  );
}
