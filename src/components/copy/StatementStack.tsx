"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { copyItem, copyRule, copyStack, useCopyEntrance } from "./motion";

export interface StatementStackProps {
  /** 3–4 short standalone lines. Longer than a line each and the pattern fails. */
  items: readonly string[];
  className?: string;
  /** Statements read at body-lg; a supporting stack sits one step down. */
  size?: "lead" | "support";
}

/**
 * PATTERN A — statement stack.
 *
 * Hairline-separated rows, each preceded by an accent rule that draws outward
 * as the row arrives. 0.08s apart: the loose stagger, because these are meant
 * to be read as separate assertions rather than scanned as a list.
 *
 * Semantics are a plain <ul>. The rules are aria-hidden, so a screen reader
 * gets four statements and no decoration.
 *
 * Reduced motion drops the variants entirely rather than rendering a second
 * markup path — one tree, at its natural state, nothing withheld.
 */
export function StatementStack({ items, className, size = "lead" }: StatementStackProps) {
  const reduce = useReducedMotionSafe();
  const { ref, animate } = useCopyEntrance<HTMLUListElement>(reduce);

  return (
    <motion.ul
      ref={ref}
      data-reveal
      className={cn("border-t border-line", className)}
      variants={reduce ? undefined : copyStack(STAGGER.loose)}
      initial={reduce ? false : "hidden"}
      animate={animate}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          data-reveal
          variants={reduce ? undefined : copyItem}
          className="flex items-start gap-6 border-b border-line py-7"
        >
          <motion.span
            data-reveal
            variants={reduce ? undefined : copyRule}
            aria-hidden="true"
            className="mt-[0.7em] h-px w-6 shrink-0 origin-left bg-accent"
          />
          <p
            className={cn(
              size === "lead" ? "type-body-lg text-ink-soft" : "type-body text-ink-soft",
            )}
          >
            {item}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
