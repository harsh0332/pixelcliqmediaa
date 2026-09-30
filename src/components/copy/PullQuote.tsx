"use client";

import { motion } from "framer-motion";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";
import { copyRule, copyStack, useCopyEntrance } from "./motion";

export interface PullQuoteProps {
  /** A line that already exists in this section's copy, lifted in place. */
  children: string;
  /** `xl` for a page where the statement carries the top on its own. */
  size?: "default" | "xl";
  className?: string;
}

/**
 * A line from the surrounding copy, set large and given room.
 *
 * Not a quotation: nobody said it, so it takes no quote marks and no <blockquote>.
 * It is a <p> that has been given display treatment — attributing it to a
 * speaker, real or implied, would be an invented testimonial.
 *
 * It breaks out of the measure on the left rather than centring, so the text
 * column's left edge still runs true and the break reads as deliberate.
 */
export function PullQuote({ children, size = "default", className }: PullQuoteProps) {
  const reduce = useReducedMotionSafe();
  const { ref, animate } = useCopyEntrance(reduce);

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={cn("my-16 md:my-20 lg:-ml-16 xl:-ml-24", className)}
      variants={reduce ? undefined : copyStack(0.15)}
      initial={reduce ? false : "hidden"}
      animate={animate}
    >
      <motion.span
        data-reveal
        variants={reduce ? undefined : copyRule}
        aria-hidden="true"
        className="mb-8 block h-px w-16 origin-left bg-accent"
      />
      {/* Scroll-linked, not timed. This is the strongest line in its section,
          so it assembles as the reader travels through it rather than replaying
          a 500ms animation they may already have scrolled past. The rule above
          it still arrives on the container's stagger. */}
      <ScrollRevealText className={cn(size === "xl" ? "type-pull-xl" : "type-pull", "text-balance")}>
        {children}
      </ScrollRevealText>
    </motion.div>
  );
}
