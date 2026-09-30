"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { copyItem, copyNumber, copyStack, useCopyEntrance } from "./motion";

export interface ProgressionStep {
  /** The printed ordinal — "01", "02". Presentational; the <ol> carries meaning. */
  step: string;
  title: string;
  description: string;
}

export interface NumberedProgressionProps {
  steps: readonly ProgressionStep[];
  /** Rendered under the last step — the loop-back arrow, a closing note. */
  footer?: ReactNode;
  className?: string;
}

/**
 * PATTERN D — progressive numbered rows with a hairline that draws downward.
 *
 * This replaces a five-across grid. On a 1440px page that grid gave each step a
 * ~250px column, which set a three-sentence description over seventeen lines —
 * a column of text roughly one word wide. Vertical rows give the same copy a
 * real measure, and the numbering carries the sequence that the horizontal
 * arrangement was there to imply.
 *
 * Two motions, deliberately separate:
 *   · the rail draws on scroll position, spring-smoothed, so it tracks the
 *     reader rather than firing once and finishing without them;
 *   · each row enters once on its own intersection.
 * Tying the rows to scroll as well would make them scrubbable — text that
 * fades back out when you scroll up is text you cannot finish reading.
 */
export function NumberedProgression({
  steps,
  footer,
  className,
}: NumberedProgressionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { ref: listRef, animate } = useCopyEntrance<HTMLOListElement>(reduce);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* The rail sits behind the markers, inset to their centre. */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-[calc(8.5rem+7px)]"
      >
        <motion.span
          // Explicit neutral value — see ScrollProgressLine.
          style={reduce ? { scaleY: 1 } : { scaleY: drawn }}
          className="block h-full w-px origin-top bg-accent"
        />
      </span>

      <motion.ol
        ref={listRef}
        data-reveal
        variants={reduce ? undefined : copyStack(STAGGER.loose)}
        initial={reduce ? false : "hidden"}
        animate={animate}
      >
        {steps.map((step) => (
          <motion.li
            key={step.step}
            data-reveal
            variants={reduce ? undefined : copyItem}
            className="relative grid grid-cols-1 gap-y-2 py-7 pl-10 first:pt-0 md:grid-cols-[6rem_1fr] md:gap-x-10 md:pl-0"
          >
            <motion.span
              variants={reduce ? undefined : copyNumber}
              className="type-label text-accent-deep tabular-nums md:pt-[0.55rem]"
            >
              {step.step}
            </motion.span>

            {/* The marker is anchored inside the content column rather than
                against the row box: the row's padding changes on the first item
                and at the md breakpoint, and a marker positioned against it
                drifted 100px off its own number. Anchored here it sits on the
                title's line box, which is the thing it is pointing at. */}
            <div className="relative md:pl-10">
              <span
                aria-hidden="true"
                className="absolute top-[0.6rem] -left-10 size-3.5 rounded-pill border border-accent bg-[var(--surface)] md:left-0"
              />
              <h3 className="type-h3">{step.title}</h3>
              <p className="type-body mt-3 max-w-measure text-ink-soft">
                {step.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      {footer ? <div className="pl-10 md:pl-[calc(8.5rem+2.5rem)]">{footer}</div> : null}
    </div>
  );
}
