/**
 * WCAG 2.x relative luminance and contrast ratio.
 *
 * Used by /styleguide to label every colour pairing with its measured ratio,
 * so an accessibility regression shows up as a number on the page rather than
 * as a surprise in an audit.
 */

type Rgb = [number, number, number];

/**
 * Expand shorthand and lowercase, so `#FFFFFF` and `#fff` compare equal.
 * The CSS minifier shortens hex values, so any comparison against a stylesheet
 * has to normalise first.
 */
export function normalizeHex(hex: string): string {
  const clean = hex.replace("#", "").trim().toLowerCase();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  return `#${full}`;
}

function parseHex(hex: string): Rgb {
  const n = Number.parseInt(normalizeHex(hex).slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** sRGB channel to linear-light, per WCAG. */
function linearise(channel: number): number {
  const s = channel / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b);
}

export function contrastRatio(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  ) as [number, number];
  return (lighter + 0.05) / (darker + 0.05);
}

/** Rounded to two decimals, the way audit tools report it. */
export function formatRatio(a: string, b: string): string {
  return `${contrastRatio(a, b).toFixed(2)}:1`;
}

export type ContrastUse =
  /** Text below 18.66px bold / 24px regular. */
  | "body"
  /** Text at or above 18.66px bold / 24px regular. */
  | "large"
  /** Focus rings, control boundaries, meaningful graphics. */
  | "ui";

export const THRESHOLD: Record<ContrastUse, number> = {
  body: 4.5,
  large: 3,
  ui: 3,
};

export function passes(a: string, b: string, use: ContrastUse): boolean {
  return contrastRatio(a, b) >= THRESHOLD[use];
}
