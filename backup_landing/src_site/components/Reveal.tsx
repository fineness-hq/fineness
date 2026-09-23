'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Scroll reveal wrapper. Tera tween: 1.1s [.16,.33,.3,1.01], delay .2s. Static when reduced motion. */
export default function Reveal({ children, className, delay = 0.2 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, ease: [0.16, 0.33, 0.3, 1.01], delay }}
    >
      {children}
    </motion.div>
  );
}
