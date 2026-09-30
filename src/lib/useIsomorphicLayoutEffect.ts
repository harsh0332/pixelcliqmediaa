"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server.
 *
 * Needed wherever a measurement has to happen before paint. React warns if
 * useLayoutEffect runs during server rendering, and the warning is legitimate —
 * there is no layout to measure there.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
