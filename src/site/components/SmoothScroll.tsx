'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global smooth inertial scrolling via Lenis.
 * Provides feather-light, responsive 120fps GPU-accelerated smooth scrolling.
 * Never hijacks mobile touch gestures or causes rubber-band stutter.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
