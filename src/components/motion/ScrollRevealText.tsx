"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

/**
 * One masked line whose position is read from the shared progress value.
 *
 * A component, not a loop body: useTransform is a hook, and calling it inside
 * `lines.map()` would change the hook count whenever the text re-wraps to a
 * different number of lines.
 */
function MaskedLine({
  progress,
  start,
  end,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  children: React.ReactNode;
}) {
  const y = useTransform(progress, [start, end], ["110%", "0%"], { clamp: true });
  return (
    <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
      <motion.span style={{ y }} className="block will-change-transform">
        {children}
      </motion.span>
    </span>
  );
}

export interface ScrollRevealTextProps {
  children: string;
  className?: string;
}

/**
 * The big serif statements, assembled line by line as the reader scrolls
 * through them rather than played back on a timer.
 *
 * Progress comes from the statement's own scroll range, so the sentence
 * finishes arriving exactly when the reader arrives at it — a timer can only
 * guess, and guesses wrong on a fast scroll or a slow one.
 *
 * The value is latched to its own maximum: scrolling up a little does not
 * un-write the sentence, which would make it unreadable to anyone who scrolls
 * the way people actually read. The latch resets only when the statement has
 * left the viewport entirely, so it replays properly on a genuine return.
 *
 * Line splitting works the way RevealText's does — plain inline spans on the
 * first render so the server and client agree, then a layout effect measures
 * which words share a top offset and re-renders with one mask per line, before
 * the browser paints.
 *
 * Reduced motion renders the sentence plainly, unsplit and unmasked.
 */
export function ScrollRevealText({ children, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotionSafe();
  const words = children.split(/\s+/).filter(Boolean);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lines, setLines] = useState<number[][] | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // The statement's own range: starts as it clears the fold, completes well
    // before it leaves, so it is never still assembling as it exits.
    offset: ["start 88%", "end 55%"],
  });

  const latched = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value <= 0 || value >= 1) {
      // Fully outside the range in either direction. Above the fold it resets
      // so a genuine scroll-back replays; past the end it pins to complete.
      latched.set(value >= 1 ? 1 : 0);
      return;
    }
    if (value > latched.get()) latched.set(value);
  });

  useIsomorphicLayoutEffect(() => {
    if (reduce || lines !== null) return;
    const groups: number[][] = [];
    let lastTop: number | null = null;
    wordRefs.current.forEach((node, index) => {
      if (!node || words[index] === undefined) return;
      const top = node.offsetTop;
      if (lastTop === null || Math.abs(top - lastTop) > 2) {
        groups.push([]);
        lastTop = top;
      }
      groups[groups.length - 1]?.push(index);
    });
    if (groups.length > 0) setLines(groups);
  }, [lines, reduce, children]);

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
      <span ref={ref} className={cn("block", className)}>
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            ref={(node) => {
              wordRefs.current[index] = node;
            }}
            className="inline-block"
          >
            {word}
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    );
  }

  // Pass two: one mask per measured line, each finishing 15% of the range after
  // the one above it, so the sentence assembles top-down rather than at once.
  const step = lines.length > 1 ? 0.55 / (lines.length - 1) : 0;

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((group, index) => (
        <MaskedLine
          key={`line-${index}-${group[0] ?? 0}`}
          progress={latched}
          start={index * step}
          end={index * step + 0.45}
        >
          {group.map((wordIndex) => (
            <span key={wordIndex}>
              {words[wordIndex]}
              {wordIndex < words.length - 1 ? " " : ""}
            </span>
          ))}
        </MaskedLine>
      ))}
    </span>
  );
}
