"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useReArmedInView } from "@/lib/useReArmedInView";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface EyebrowSweepProps {
  children: ReactNode;
  className?: string;
}

/**
 * The accent colour sweeps left to right across a label as its section enters.
 *
 * An accent copy sits exactly over the ink one and is revealed by a clip that
 * travels in from the left. The ink copy underneath is always fully painted, so
 * the label is legible from the first frame whether or not the sweep runs, and
 * nothing reflows — the two copies occupy the same box.
 *
 * clip-path rather than a width or a background-position: the constraint is
 * that nothing animates layout, and clip-path does not. It is the same
 * mechanism the footer wordmark uses, for the same reason.
 *
 * The accent copy is aria-hidden so the label is announced once.
 */
export function EyebrowSweep({ children, className }: EyebrowSweepProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotionSafe();
  const inView = useReArmedInView(ref, { enabled: !reduce, amount: 0.6 });

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 text-[var(--link-color)]"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: inView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
        transition={{ duration: 0.55, ease: EASE.expo }}
      >
        {children}
      </motion.span>
    </span>
  );
}
