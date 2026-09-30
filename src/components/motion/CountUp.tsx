"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useInView } from "framer-motion";
import { DURATION } from "@/lib/motion";

/** Digits with optional thousands separators and one decimal group. */
const NUMERIC = /^-?\d{1,3}(,\d{3})*(\.\d+)?$|^-?\d+(\.\d+)?$/;

export interface CountUpProps {
  /**
   * The value to render. May be a bracketed placeholder such as "[VALUE]" or
   * any other non-numeric string.
   */
  value: string;
  /** Rendered immediately after the number, never animated. */
  suffix?: string;
  className?: string;
}

/**
 * Animates a number when it scrolls into view.
 *
 * Non-numeric values — "[VALUE]", "Coming soon", "—" — are rendered verbatim
 * and never animated. That rule is the point of this component: the numbers
 * page is full of unresolved placeholders, and a counter that ticked up to a
 * fabricated figure would be the single most damaging thing on the site.
 *
 * Reduced motion renders the final value immediately.
 */
export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotionSafe();

  const isNumeric = NUMERIC.test(value.trim());
  const target = isNumeric ? Number(value.replace(/,/g, "")) : 0;
  const decimals = isNumeric ? (value.split(".")[1]?.length ?? 0) : 0;

  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    // Reduced motion needs no effect at all: the final value is derived during
    // render below, so nothing is ever set from inside here for that case.
    if (!isNumeric || !inView || reduce) return;

    const duration = DURATION.slow * 1000;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // Matches --ease-expo closely enough for a counter.
      const eased = 1 - Math.pow(1 - progress, 4);
      setAnimated(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, isNumeric, reduce, target]);

  /** Derived, not stored: reduced motion jumps straight to the final value. */
  const display = reduce ? target : animated;

  if (!isNumeric) {
    return (
      <span ref={ref} className={className}>
        {value}
        {suffix}
      </span>
    );
  }

  const rendered = display.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {/* The live region would otherwise announce every frame. */}
      <span aria-hidden="true" className="tabular-nums">
        {rendered}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}
