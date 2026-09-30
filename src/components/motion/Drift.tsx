"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** 20-30px. Past this it stops reading as depth and starts reading as movement. */
const TRAVEL = 26;

export interface DriftProps {
  children: ReactNode;
  /** Which way the heading travels as the page scrolls down. */
  direction?: "left" | "right";
  className?: string;
}

/**
 * Slow horizontal drift on an oversized heading, bound to scroll.
 *
 * Set it against whatever the section below does, so the two planes separate.
 * 26px across a full scroll range is deliberately below the threshold at which
 * it registers as animation — the heading should feel like it sits on a
 * different plane, not like it is sliding.
 *
 * Spring-smoothed because the raw scroll value on a heading this large shows
 * every wheel notch as a step. Off below 768px, where there is no lateral room
 * to spend, and off under reduced motion.
 */
export function Drift({ children, direction = "left", className }: DriftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const wide = useMediaQuery("(min-width: 768px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  const sign = direction === "left" ? -1 : 1;
  const x = useTransform(smoothed, [0, 1], [-sign * TRAVEL, sign * TRAVEL]);

  return (
    <div ref={ref} className={className}>
      {/* Explicit neutral value — see Parallax. */}
      <motion.div style={{ x: reduce || !wide ? 0 : x }}>{children}</motion.div>
    </div>
  );
}
