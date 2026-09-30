"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";
import { copyItem, copyStack, useCopyEntrance } from "./motion";

export interface SplitCopyProps {
  /** The short framing line. One clause — if it wraps twice it is not a frame. */
  frame: ReactNode;
  /** The explanatory copy. */
  children: ReactNode;
  className?: string;
}

/**
 * PATTERN C — two-column split.
 *
 * A framing line on the left, the explanation on the right, 0.15s apart so the
 * frame lands first and the reader has the shape before the detail.
 *
 * The columns collapse to a stack below lg, where the left column keeps its
 * weight and simply sits above — the pattern still reads, just vertically.
 * Source order is frame then copy in both cases, so the visual order and the
 * reading order never disagree.
 */
export function SplitCopy({ frame, children, className }: SplitCopyProps) {
  const reduce = useReducedMotionSafe();
  const { ref, animate } = useCopyEntrance(reduce);

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={cn("grid gap-5 lg:grid-cols-12 lg:gap-8", className)}
      variants={reduce ? undefined : copyStack(0.15)}
      initial={reduce ? false : "hidden"}
      animate={animate}
    >
      <motion.div
        data-reveal
        variants={reduce ? undefined : copyItem}
        className="type-h3 text-ink lg:col-span-4"
      >
        {frame}
      </motion.div>

      <motion.div
        data-reveal
        variants={reduce ? undefined : copyItem}
        className="type-body max-w-measure text-ink-soft lg:col-span-7 lg:col-start-6"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
