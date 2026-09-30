"use client";

import { Children, useRef, type ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useReArmedInView } from "@/lib/useReArmedInView";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { motion, type Variants } from "framer-motion";
import { ENTER, EASE, STAGGER, type EnterFrom } from "@/lib/motion";

const OFFSET: Record<EnterFrom, { x: number; y: number }> = {
  left: { x: -ENTER.x, y: 0 },
  right: { x: ENTER.x, y: 0 },
  below: { x: 0, y: ENTER.y },
};

const container: Variants = {
  hidden: {},
  visible: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const item = (from: EnterFrom): Variants => ({
  hidden: { opacity: 0, ...OFFSET[from], pointerEvents: "none" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: ENTER.duration, ease: EASE.expo },
  },
});

/**
 * Lateral entrances need a column to travel across.
 *
 * Stacked below lg there is none, and worse: an element below the fold holds
 * its 40px offset until its reveal fires, which pushes it past the viewport and
 * gives the whole page a horizontal scrollbar. Narrow screens rise instead.
 */
function useTravel(from: EnterFrom): EnterFrom {
  const wide = useMediaQuery("(min-width: 1024px)");
  return wide ? from : "below";
}

export interface StaggerProps {
  children: ReactNode;
  /** Seconds between children. Defaults to the house 0.08s for entrances;
   *  pass STAGGER.list for a list of peers, where 0.05 reads better. */
  stagger?: number;
  amount?: number;
  /** Which side the children travel in from. */
  from?: EnterFrom;
  className?: string;
  /** Class applied to each generated child wrapper. */
  itemClassName?: string;
}

/**
 * Staggers the entrance of its direct children, and re-arms with them.
 *
 * Each child is wrapped rather than required to be a motion component, so this
 * works with any markup — cards, list items, a row of pillars. Wrapping is why
 * `itemClassName` exists: grid children need their own classes on the wrapper,
 * not on the element inside it.
 */
export function Stagger({
  children,
  stagger = STAGGER.loose,
  amount = 0.15,
  from = "below",
  className,
  itemClassName,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const inView = useReArmedInView(ref, { enabled: !reduce, amount });
  const travel = useTravel(from);

  if (reduce) {
    return (
      <div className={className}>
        {Children.map(children, (child) => (
          <div className={itemClassName}>{child}</div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {Children.map(children, (child) => (
        <motion.div data-reveal className={itemClassName} variants={item(travel)}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
