'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  className?: string;
}

/** Animated counter. Counts 0 to value on first view, instant when reduced motion. */
export default function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [display, setDisplay] = useState(reduced ? value : 0);
  const done = useRef(reduced);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const run = () => {
      if (done.current) return;
      done.current = true;
      const start = performance.now();
      const duration = 1000;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === 'undefined') {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, value]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString('en-US')}
    </span>
  );
}
