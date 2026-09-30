"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { copyItem, copyStack, useCopyEntrance } from "@/components/copy/motion";

/**
 * An inline, hairline-separated list of capabilities.
 *
 * Text with rules between it, not chips: a chip that is not a link but looks
 * like one is a false affordance, and a row of them turns a factual list into
 * decoration. Separators are aria-hidden, so a screen reader reads the items
 * rather than the punctuation between them.
 *
 * The items arrive individually, 0.05s apart — the list stagger, because these
 * are scanned rather than read. As one block the row landed as a single grey
 * bar; item by item the eye follows the sequence and actually registers what is
 * in it. Small detail, and the reason the tight step exists in the token set.
 */
export function CapabilityList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  const { ref, animate } = useCopyEntrance<HTMLUListElement>(reduce);

  return (
    <motion.ul
      ref={ref}
      data-reveal
      className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5", className)}
      variants={reduce ? undefined : copyStack(STAGGER.list)}
      initial={reduce ? false : "hidden"}
      animate={animate}
    >
      {items.map((item, index) => (
        <motion.li
          key={item}
          data-reveal
          variants={reduce ? undefined : copyItem}
          className="flex items-center gap-3"
        >
          {index > 0 ? (
            <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
          ) : null}
          <span className="type-caption">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
