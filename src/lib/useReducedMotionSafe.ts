"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * The server has no media query, so it reports "motion allowed" — and so does
 * the client on its first, hydrating render. See below for why that matters.
 */
function getServerSnapshot() {
  return false;
}

/**
 * `useReducedMotion`, made safe to branch markup on.
 *
 * Framer's hook reads a media query directly. The server has none, so it
 * renders as if motion were allowed; a client with "Reduce motion" enabled
 * renders the reduced variant on its very first pass. Any component that emits
 * *different markup* for the two — a plain `<div>` instead of a `motion.div`,
 * text instead of split lines — therefore fails hydration, and React responds
 * by discarding the whole server-rendered tree and rebuilding it on the client.
 * The users who pay that cost are precisely the ones who asked for less work.
 *
 * `useSyncExternalStore` is built for this: React uses `getServerSnapshot` for
 * the server render *and* the hydrating render, then switches to the live
 * value. Server and client therefore always agree on the first pass, reduced
 * motion still wins immediately afterwards, and the server HTML survives.
 *
 * This is also why it is not a `useState` + `useEffect` mount flag: that sets
 * state during an effect, which cascades an extra render and is what
 * `react-hooks/set-state-in-effect` warns about.
 *
 * Use this anywhere the preference changes what is rendered. Components that
 * only mount in response to a click (menus, dialogs, the lightbox) never
 * hydrate against server HTML and can use Framer's hook directly.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
