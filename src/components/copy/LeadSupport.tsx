"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";
import { copyItem, copyStack, useCopyEntrance } from "./motion";

export interface LeadSupportProps {
  /** The paragraph's own first sentence. Never a sentence moved up from below. */
  lead: string;
  /** The remainder, verbatim and in order. */
  support?: string;
  className?: string;
  /** `h3` sets the lead at heading size; `strong` keeps it at body-lg in ink. */
  emphasis?: "h3" | "strong";
}

/**
 * PATTERN B — lead plus support.
 *
 * The lead is always the paragraph's existing opening sentence, never the
 * strongest sentence hoisted from the middle. Reading order has to survive the
 * split — a reader who ignores the typography must get the same prose in the
 * same sequence, and a screen reader reads two elements where there was one
 * paragraph, which changes nothing about what is said.
 *
 * Support arrives 0.2s after the lead. That is deliberately longer than the
 * 0.06–0.08s used inside a list: this is two ranks, not two items.
 */
export function LeadSupport({
  lead,
  support,
  className,
  emphasis = "h3",
}: LeadSupportProps) {
  const reduce = useReducedMotionSafe();
  const { ref, animate } = useCopyEntrance(reduce);

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      variants={reduce ? undefined : copyStack(0.2)}
      initial={reduce ? false : "hidden"}
      animate={animate}
    >
      <motion.p
        data-reveal
        variants={reduce ? undefined : copyItem}
        className={cn(
          emphasis === "h3" ? "type-h3 text-ink" : "type-body-lg text-ink",
        )}
      >
        {lead}
      </motion.p>

      {support ? (
        <motion.p
          data-reveal
          variants={reduce ? undefined : copyItem}
          className="type-body mt-4 max-w-measure text-ink-soft"
        >
          {support}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
