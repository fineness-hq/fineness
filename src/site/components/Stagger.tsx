'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0.001 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

/** Word-by-word emerge, like the reference split-text effect. */
export function WordText({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <motion.span variants={item} style={{ display: 'inline-block' }}>
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </motion.span>
  );
}

interface StaggerListProps {
  children: ReactNode;
  className?: string;
  /** Drive by boolean (menus) instead of scroll position. */
  open?: boolean;
}

/** Sequential fade for list children. Scroll-driven by default. */
export function StaggerList({ children, className, open }: StaggerListProps) {
  const reduce = useReducedMotion();
  if (reduce) return <ul className={className}>{children}</ul>;
  if (open !== undefined) {
    return (
      <motion.ul
        className={className}
        variants={list}
        initial="hidden"
        animate={open ? 'show' : 'hidden'}
      >
        {children}
      </motion.ul>
    );
  }
  return (
    <motion.ul
      className={className}
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {children}
    </motion.ul>
  );
}

/** Child wrapper for StaggerList items. Renders an li. */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <li className={className}>{children}</li>;
  return (
    <motion.li className={className} variants={item}>
      {children}
    </motion.li>
  );
}

interface XSlideProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  /** Scroll-driven when true, on-mount otherwise. */
  inView?: boolean;
}

/** Logo/lockup slide from the left. Bundle: x -392 spring 0.6s. */
export function XSlide({ children, className, distance = 64, inView = false }: XSlideProps) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  const anim = { x: 0, transition: { type: 'spring' as const, bounce: 0, duration: 0.6 } };
  if (inView) {
    return (
      <motion.span
        className={className}
        initial={{ x: -distance }}
        whileInView={anim}
        viewport={{ once: true }}
      >
        {children}
      </motion.span>
    );
  }
  return (
    <motion.span className={className} initial={{ x: -distance }} animate={anim}>
      {children}
    </motion.span>
  );
}
