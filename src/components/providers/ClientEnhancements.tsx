"use client";

import dynamic from "next/dynamic";

/**
 * Progressive enhancements, kept out of the initial bundle.
 *
 * Both of these are genuinely optional: the cursor is decoration that never
 * renders on touch or under reduced motion, and the smooth-scroll provider
 * renders `null` and only eases wheel input. Neither carries content, neither
 * affects layout, and the page is complete and usable before either arrives —
 * so paying for them in the first-load bundle on every route buys nothing.
 *
 * `ssr: false` is correct here for the same reason: there is no markup to
 * server-render. It would be the wrong call for anything a reader needs to
 * see, which is why the Compound Loop, the galleries and the case content are
 * all still server-rendered as normal.
 *
 * This wrapper exists because `ssr: false` is not allowed in a Server
 * Component, and the root layout is one.
 */
const Cursor = dynamic(
  () => import("@/components/motion/Cursor").then((m) => m.Cursor),
  { ssr: false },
);

const SmoothScroll = dynamic(
  () => import("@/components/providers/SmoothScroll").then((m) => m.SmoothScroll),
  { ssr: false },
);

export function ClientEnhancements() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
    </>
  );
}
