"use client";

import { Children, useRef, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useReArmedInView } from "@/lib/useReArmedInView";
import { ENTER, EASE, type EnterFrom } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

const OFFSET: Record<EnterFrom, { x: number; y: number }> = {
  left: { x: -ENTER.x, y: 0 },
  right: { x: ENTER.x, y: 0 },
  below: { x: 0, y: ENTER.y },
};

const container = (stagger: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

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

export interface EnterProps {
  children: ReactNode;
  /** Which side the content travels in from. Alternate this between sections. */
  from?: EnterFrom;
  /** Seconds between children. Lists should pass STAGGER.list. */
  stagger?: number;
  /** Wrap each direct child so they arrive in sequence. Off for a single block. */
  split?: boolean;
  className?: string;
  itemClassName?: string;
}

/**
 * The directional entrance, and the only one on the site that re-arms.
 *
 * Content travels in from the side of the layout it belongs to, so the page
 * reads left-right rather than as a column of identical fades. Direction is the
 * caller's decision because it has to alternate section to section — a rhythm
 * no component can see from inside itself.
 *
 * Re-arming is the point. Entrances that fire once per session leave every
 * repeat visit completely static, which is the state the page spends most of
 * its life in. useReArmedInView gives the two edges different thresholds so
 * replaying costs nothing at the boundary — see that hook for why a plain
 * `once: false` is not enough.
 *
 * Transform and opacity only. pointerEvents travels with opacity, because an
 * element at opacity 0 still swallows clicks aimed at whatever is beneath it.
 */
export function Enter({
  children,
  from = "below",
  stagger = ENTER.stagger,
  split = true,
  className,
  itemClassName,
}: EnterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const inView = useReArmedInView(ref, { enabled: !reduce });
  const travel = useTravel(from);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {split
          ? Children.map(children, (child) => <div className={itemClassName}>{child}</div>)
          : children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      variants={container(stagger)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {split ? (
        Children.map(children, (child) => (
          <motion.div data-reveal variants={item(travel)} className={itemClassName}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div data-reveal variants={item(travel)} className={cn(itemClassName)}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
