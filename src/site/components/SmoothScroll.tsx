'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global smooth inertial scrolling via Lenis.
 * Provides frictionless, 120fps GPU-accelerated smooth scrolling
 * across the entire application while respecting prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
