"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Animacja "fade-up" przy wejściu w viewport.
 * Respektuje prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  as: Comp = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  as?: "div" | "section" | "article" | "li";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const MotionComp = motion[Comp];

  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <MotionComp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionComp>
  );
}
