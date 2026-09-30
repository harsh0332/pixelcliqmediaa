"use client";

import { useRef, type RefObject } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollProgressLineProps {
  /**
   * The element whose scroll drives the line. Omit to use the line's own
   * parent, which is the usual case.
   */
  target?: RefObject<HTMLElement | null>;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

/**
 * A 1px accent line that draws itself as a section passes through the viewport.
 * Used by the Compound Loop and the process section to make progress legible.
 *
 * Animates scaleX/scaleY only, from a pinned origin — never width or height.
 * Under reduced motion the line renders complete and static, so it still reads
 * as a structural rule rather than disappearing.
 */
export function ScrollProgressLine({
  target,
  orientation = "vertical",
  className,
}: ScrollProgressLineProps) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: target ?? fallbackRef,
    offset: ["start 80%", "end 60%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const isVertical = orientation === "vertical";

  return (
    <div
      ref={target ? undefined : fallbackRef}
      aria-hidden="true"
      className={cn(
        "bg-line",
        isVertical ? "w-px" : "h-px w-full",
        className,
      )}
    >
      <motion.div
        // An explicit neutral value, never `undefined`: reduced motion is
        // detected after the first render, and Framer leaves whatever it last
        // wrote when it stops managing a property.
        style={{ [isVertical ? "scaleY" : "scaleX"]: reduce ? 1 : progress }}
        className={cn(
          "bg-accent",
          isVertical ? "h-full w-px origin-top" : "h-px w-full origin-left",
        )}
      />
    </div>
  );
}
