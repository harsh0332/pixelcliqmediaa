"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { cancelFrame, frame, useReducedMotion } from "framer-motion";

/**
 * Smooth scrolling, owned in one place.
 *
 * Two decisions worth stating, because both are easy to get wrong:
 *
 * 1. Lenis is driven from Framer Motion's frame loop rather than its own
 *    `requestAnimationFrame`. Two independent rAF loops read and write scroll
 *    in whatever order the browser happens to schedule them, and scroll-linked
 *    animations (the Compound Loop, the parallax cluster, the progress bars)
 *    then lag the page by a frame and visibly shear. Sharing one loop means
 *    `useScroll` always samples a position Lenis has already committed.
 *
 * 2. Touch is left alone. `syncTouch` (Lenis v1's rename of `smoothTouch`)
 *    hijacks native touch scrolling, which costs the platform's own momentum
 *    and rubber-banding and reads as a broken page on a phone. Wheel and
 *    keyboard get the easing; fingers get the OS.
 *
 * Under `prefers-reduced-motion` Lenis is never constructed at all — not
 * merely configured with a zero duration — so scrolling stays entirely native.
 */
export function SmoothScroll() {
  const reduce = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Gentle exponential: quick to pick up, long tail to rest. Matches the
      // shape of EASE.expo so scrolling and entrances share a feel.
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      // Anchor jumps stay native. Lenis can animate to a hash target, but only
      // by preventing the default — and the default is what moves keyboard
      // focus to the target. Skip-to-content has to land focus in <main>, so
      // the browser keeps that job and Lenis resynchronises afterwards.
      anchors: false,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    const update = (data: { timestamp: number }) => lenis.raf(data.timestamp);
    frame.update(update, true);

    // Browser history restores a scroll position by writing scrollTop directly.
    // Lenis holds its own animated position, so without this it would treat the
    // restored offset as a target and glide back to where the user just was.
    const snap = () => lenis.scrollTo(window.scrollY, { immediate: true });
    const scrollHome = () => lenis.scrollTo(0, { immediate: true });
    window.addEventListener("pixelcliq:scroll-top", scrollHome);
    window.addEventListener("popstate", snap);
    window.addEventListener("hashchange", snap);

    return () => {
      cancelFrame(update);
      window.removeEventListener("pixelcliq:scroll-top", scrollHome);
      window.removeEventListener("popstate", snap);
      window.removeEventListener("hashchange", snap);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  // Next resets scroll on navigation by writing to the window. Lenis has to be
  // told, or it keeps the previous page's offset as its animated position and
  // scrolls the new page back down to it on the first wheel event.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
