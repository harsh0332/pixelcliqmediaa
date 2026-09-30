"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, type Variants } from "framer-motion";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

/**
 * A masked per-line reveal: each line rises out from behind its own edge.
 *
 * Why it renders twice
 * --------------------
 * Where the lines break depends on the font, the width and the text — none of
 * which the server knows. So the first render (server, and the first client
 * render, which keeps hydration identical) lays the words out as plain inline
 * spans. A layout effect then measures which words share a top offset, groups
 * them into lines, and re-renders with one mask per line. Because that happens
 * in a layout effect it completes before the browser paints, so there is no
 * flash of unmasked text.
 *
 * Accessibility
 * -------------
 * The split is document-order faithful: words stay in sequence, so a screen
 * reader reads the sentence normally and text remains selectable. There is
 * deliberately no aria-label/aria-hidden duplication — `aria-label` on a
 * generic span is ignored by several screen readers, and the duplicate copy it
 * requires would be selectable and copied along with the visible text.
 *
 * Reduced motion renders the text immediately, unsplit and unmasked.
 */

const container: Variants = {
  hidden: {},
  visible: ({ delay, stagger }: { delay: number; stagger: number }) => ({
    transition: { delayChildren: delay, staggerChildren: stagger },
  }),
};

const line: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.slow, ease: EASE.expo },
  },
};

export interface RevealTextProps {
  /** Plain text. Splitting requires a string, not arbitrary nodes. */
  children: string;
  amount?: number;
  /** Seconds before the first line starts. For orchestrated page loads. */
  delay?: number;
  /** Seconds between lines. Defaults to the house 0.06s. */
  stagger?: number;
  /**
   * A single word to set in Instrument Serif italic — the editorial signature.
   * Matched on the first occurrence, ignoring surrounding punctuation.
   *
   * Applied in BOTH passes on purpose: the serif is wider than the sans, so
   * measuring without it would group words into lines that break differently
   * once it is applied.
   */
  emphasis?: string;
  className?: string;
}

/** Compare words ignoring case and any punctuation hanging off the end. */
const normalise = (word: string) => word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();

export function RevealText({
  children,
  amount = 0.2,
  delay = 0,
  stagger = STAGGER.base,
  emphasis,
  className,
}: RevealTextProps) {
  const reduce = useReducedMotionSafe();
  const words = children.split(/\s+/).filter(Boolean);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  /** Word indices grouped by measured line, rather than the words themselves,
   *  so per-word styling survives the regrouping. */
  const [lines, setLines] = useState<number[][] | null>(null);

  const emphasisIndex = emphasis
    ? words.findIndex((word) => normalise(word) === normalise(emphasis))
    : -1;

  const renderWord = (index: number) => {
    const word = words[index] ?? "";
    const trailing = index < words.length - 1 ? " " : "";

    if (index !== emphasisIndex) {
      return (
        <span key={index}>
          {word}
          {trailing}
        </span>
      );
    }

    // Style only the word, never the punctuation hanging off it. A full stop
    // set in the serif reads as a typo rather than as emphasis.
    const parts = /^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u.exec(word);
    const [, prefix = "", core = word, suffix = ""] = parts ?? [];

    return (
      <span key={index}>
        {prefix}
        <span className="type-emphasis">{core}</span>
        {suffix}
        {trailing}
      </span>
    );
  };

  // Measure line groups before paint, but only while in the measuring pass.
  useIsomorphicLayoutEffect(() => {
    if (reduce || lines !== null) return;

    const groups: number[][] = [];
    let lastTop: number | null = null;

    wordRefs.current.forEach((node, index) => {
      if (!node || words[index] === undefined) return;
      const top = node.offsetTop;
      // A 2px tolerance absorbs sub-pixel differences within one line.
      if (lastTop === null || Math.abs(top - lastTop) > 2) {
        groups.push([]);
        lastTop = top;
      }
      groups[groups.length - 1]?.push(index);
    });

    if (groups.length > 0) setLines(groups);
  }, [lines, reduce, children]);

  // Re-measure after a resize by returning to the measuring pass.
  useEffect(() => {
    if (reduce) return;
    let timer: number;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setLines(null), 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  if (reduce) return <span className={className}>{children}</span>;

  // Pass one: measurable, fully visible, identical on server and client.
  if (lines === null) {
    return (
      <span className={cn("block", className)}>
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            ref={(node) => {
              wordRefs.current[index] = node;
            }}
            className="inline-block"
          >
            {word}
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    );
  }

  // Pass two: one mask per measured line.
  return (
    <motion.span
      className={cn("block", className)}
      variants={container}
      custom={{ delay, stagger }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {lines.map((group, index) => (
        <span
          key={`line-${index}-${group[0] ?? 0}`}
          // Descenders would be clipped by a tight mask, so the box is grown
          // and pulled back by the same amount.
          className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
        >
          <motion.span variants={line} className="block will-change-transform">
            {group.map(renderWord)}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
