"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { roundedPolygonPath } from "@/lib/compoundLoop";
import { DURATION, EASE } from "@/lib/motion";

/**
 * The one graphic on the error pages: the Compound Loop, not closing.
 *
 * It draws to roughly seven-eighths and stops, leaving a visible gap. The
 * signature element of the site is a circle that completes; here it does not,
 * which is the whole joke and the whole message. Nothing else on the page moves.
 */
export function BrokenLoop() {
  const reduce = useReducedMotionSafe();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="mx-auto size-40 md:size-56"
    >
      <motion.path
        // The same rounded heptagon as the Compound Loop, so the mark on a 404
        // is recognisably the site's own shape — just not closing.
        d={roundedPolygonPath(7, 38, 5.4)}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? { pathLength: 0.87 } : { pathLength: 0 }}
        animate={{ pathLength: 0.87 }}
        transition={{ duration: reduce ? 0 : DURATION.slow, ease: EASE.expo }}
      />
    </svg>
  );
}
