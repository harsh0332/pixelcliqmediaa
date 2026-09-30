"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * In-view state that re-arms, without flickering at the threshold.
 *
 * `whileInView` with `once: false` toggles on a single IntersectionObserver
 * threshold, so an element parked at that exact boundary — which is where a
 * reader stops when they finish a paragraph — flips between states on a few
 * pixels of scroll. This gives the two edges different thresholds instead:
 *
 *   arm    when 18% of the element is inside a viewport inset by 12%
 *   disarm only when it has left that inset box completely
 *
 * The gap between those is most of a viewport, so no amount of jitter can
 * toggle it, and the element only replays when the reader has genuinely
 * scrolled away and come back.
 *
 * Returns true once and stays true for the life of the element under reduced
 * motion — callers pass `enabled: false` there and get a permanent true.
 */
export function useReArmedInView(
  ref: RefObject<Element | null>,
  { enabled = true, amount = 0.18 }: { enabled?: boolean; amount?: number } = {},
): boolean {
  const [inView, setInView] = useState(false);
  // Start armed on the server-matching first paint; the observer corrects it
  // synchronously enough that nothing is seen in the wrong state.
  const armed = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= amount) {
            if (!armed.current) {
              armed.current = true;
              setInView(true);
            }
          } else if (!entry.isIntersecting) {
            // Fully outside the inset box — safe to re-arm.
            if (armed.current) {
              armed.current = false;
              setInView(false);
            }
          }
        }
      },
      { threshold: [0, amount, 1], rootMargin: "-12% 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, enabled, amount]);

  return enabled ? inView : true;
}
