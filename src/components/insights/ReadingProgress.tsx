"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * A 1px accent line across the top of the viewport, tracking read position.
 *
 * scaleX from a pinned origin — never width — and aria-hidden, since it conveys
 * nothing a screen reader user cannot get from the scrollbar. Under reduced
 * motion the spring is dropped and the line tracks scroll directly rather than
 * easing toward it.
 */
export function ReadingProgress() {
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-px bg-transparent"
    >
      <motion.div
        style={{ scaleX: reduce ? scrollYProgress : smooth }}
        className="h-px w-full origin-left bg-accent"
      />
    </div>
  );
}
