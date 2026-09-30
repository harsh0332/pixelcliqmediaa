/**
 * Shared motion constants.
 *
 * Every animation in the site pulls its timing, easing and stagger from here so
 * that motion reads as one system rather than a set of unrelated effects.
 * Intentionally free of framework imports — safe to read from Server Components.
 */

/** Cubic-bezier control points, in the tuple shape Framer Motion expects. */
type Bezier = [number, number, number, number];

export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
} as const;

export const EASE = {
  /** Fast out, long settle. The house easing for entrances and reveals. */
  expo: [0.22, 1, 0.36, 1],
  /** Symmetrical. For state changes that travel out and back. */
  inOut: [0.65, 0, 0.35, 1],
} satisfies Record<string, Bezier>;

export const STAGGER = {
  tight: 0.04,
  /** Individual list items — pillars, capability rows, comparison rows. */
  list: 0.05,
  base: 0.06,
  loose: 0.08,
} as const;

/**
 * Directional entrances.
 *
 * 600ms is longer than DURATION.base because these travel further: 40px
 * sideways reads as sluggish at 500ms and as a twitch at 300ms.
 */
export const ENTER = {
  duration: 0.6,
  stagger: STAGGER.loose,
  /** Lateral travel, px. */
  x: 40,
  /** Vertical travel for centred content, px. */
  y: 28,
  /** A number or label lands after the row it belongs to, never with it. */
  numberDelay: 0.12,
  numberY: 12,
} as const;

/** Entrance direction. `below` is the default for centred and full-width copy. */
export type EnterFrom = "left" | "right" | "below";

export type Duration = keyof typeof DURATION;
export type Ease = keyof typeof EASE;
export type Stagger = keyof typeof STAGGER;
