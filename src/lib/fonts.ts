import localFont from "next/font/local";

/**
 * Self-hosted typefaces.
 *
 * Clash Display and Satoshi are Fontshare (Indian Type Foundry) releases under
 * the ITF Free Font Licence — see public/fonts/Fontshare-FFL.txt. Instrument
 * Serif is SIL OFL 1.1 via Google Fonts. Only the weights the design system
 * actually uses are shipped; adding a weight means adding it to the type scale.
 *
 * `adjustFontFallback` is left at its default so Next derives fallback metrics
 * from the font files and holds Cumulative Layout Shift near zero during swap.
 */

// next/font requires literal values at every call site, so the fallback stack
// below is repeated rather than shared from a constant.

/**
 * Display face, split by weight — and the reason matters.
 *
 * `next/font` applies `preload` per *call*, not per face, so declaring both
 * Clash weights together preloads both whether or not the first screen needs
 * them. Splitting each weight into its own single-face family restores
 * per-weight control: only the 600 used by the H1 is preloaded, and the 500
 * loads normally. Weight matching stays exact because each family contains
 * exactly the weight its utility asks for — the browser never has to pick a
 * near match or synthesise one.
 *
 * Before: 111.7 KB of fonts preloaded. After: 42.7 KB.
 */

/** Clash Display 600. Used by every display size and the H1 — preloaded. */
export const clashDisplay = localFont({
  src: [
    { path: "../../public/fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/** Clash Display 500. Section headings only, always below the fold. */
export const clashDisplayMedium = localFont({
  src: [
    { path: "../../public/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-clash-medium",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/** Body face, 400. Every paragraph on the site — preloaded. */
export const satoshi = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/** Satoshi 500. Labels and buttons. */
export const satoshiMedium = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-satoshi-medium",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/** Satoshi 700. Headlines and sub-headings — preloaded for the hero. */
export const satoshiBold = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi-bold",
  display: "swap",
  // The home hero headline (the LCP element) is set in this face.
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/**
 * Editorial accent face. Pull quotes, and single emphasised words inside a
 * display headline — at most once per section. Not preloaded: it is never the
 * LCP element and always appears alongside already-loaded type.
 */
export const instrumentSerif = localFont({
  src: [
    { path: "../../public/fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/** Every font variable, for the <html> className. */
export const fontVariables = [
  clashDisplay.variable,
  clashDisplayMedium.variable,
  satoshi.variable,
  satoshiMedium.variable,
  satoshiBold.variable,
  instrumentSerif.variable,
].join(" ");
