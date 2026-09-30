"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Has the user navigated at least once in this session?
 *
 * Module scope, so it survives the template remounting on every route change.
 * This is what keeps the first paint free of a transition — see below.
 */
let hasNavigated = false;

/**
 * Route transition.
 *
 * `template.tsx` remounts on every navigation, which is what gives the
 * incoming page something to animate from. It animates the entrance only: by
 * the time this mounts, the router has already unmounted the previous page, so
 * there is nothing left for AnimatePresence to fade out. Producing an exit
 * means snapshotting the old subtree and holding the new page behind it — the
 * content-delaying overlay this treatment exists to avoid. A 12px rise out of
 * transparent reads as a crossfade on its own.
 *
 * The first render deliberately skips the animation entirely, for two reasons:
 *
 * 1. Correctness. Whether to animate cannot depend on `useReducedMotionSafe()`
 *    during hydration — the server has no media query and the client does, so
 *    the two disagree and React throws a hydration mismatch, discarding and
 *    re-rendering the whole tree. Server and first client render both read
 *    `hasNavigated === false` and emit the same markup, so they always agree.
 *
 * 2. Speed. Fading the document in on first load pushes LCP back by the length
 *    of the animation for no benefit. Arriving at a page should be instant;
 *    only moving between pages needs the connective tissue.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotionSafe();
  const [animate] = useState(() => hasNavigated);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  // First load, or the user prefers reduced motion: render the page as-is.
  // Safe to branch on `reduce` here only because every path that reaches it is
  // a client-side navigation, which has no server HTML to match against.
  if (!animate || reduce) return <>{children}</>;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE.expo }}
      onAnimationComplete={() => {
        // Any transform other than `none` — `translateY(0px)` included — makes
        // this a containing block for `position: fixed` descendants, which
        // would anchor the lightbox and the reading-progress bar to this
        // wrapper instead of the viewport. Framer has stopped writing to the
        // node by now, so a direct style write is safe.
        const node = ref.current;
        if (!node) return;
        node.style.transform = "none";
        node.style.opacity = "";
        node.style.willChange = "";
      }}
    >
      {children}
    </motion.div>
  );
}
