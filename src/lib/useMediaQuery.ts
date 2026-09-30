"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to a media query.
 *
 * Uses useSyncExternalStore rather than an effect so the value is read during
 * render on the client and never causes a flash of the wrong branch. The server
 * snapshot is `false`: motion and pointer affordances stay off until the client
 * confirms the environment supports them.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
