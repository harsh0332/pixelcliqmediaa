"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** Hard ceiling. Beyond this, parallax stops reading as depth and starts reading as a bug. */
const MAX_DISPLACEMENT = 60;

export interface ParallaxProps {
  children: ReactNode;
  /**
   * -1 to 1. Positive moves the element down as the page scrolls up, which
   * reads as "further away". Scaled against a 60px ceiling.
   */
  speed?: number;
  className?: string;
}

/**
 * Scroll-linked vertical drift. Transform only — never top or margin — so it
 * stays on the compositor and costs no layout.
 *
 * Disabled below 768px: on a phone the viewport is short, the effect is barely
 * perceptible, and it competes with the scroll performance that actually
 * matters. Disabled entirely under reduced motion.
 */
export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = Math.max(-1, Math.min(1, speed)) * MAX_DISPLACEMENT;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  const active = isDesktop && !reduce;

  return (
    <div ref={ref} className={className}>
      {/* Explicit neutral value, never `undefined`: reduced motion and the
          breakpoint are both known only after the first render, and Framer
          leaves the last value it wrote when it stops managing a property. */}
      <motion.div style={{ y: active ? y : 0 }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
