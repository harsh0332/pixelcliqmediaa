/**
 * A TypeScript mirror of the tokens in src/app/globals.css.
 *
 * This exists so /styleguide can print hex values and compute live contrast
 * ratios. globals.css remains the source of truth — the styleguide runs a
 * client-side drift check that flags any value here which no longer matches the
 * computed custom property in the browser.
 */

export interface ColorToken {
  /** The CSS custom property, without the leading `--`. */
  cssVar: string;
  hex: string;
  note: string;
}

export interface ColorGroup {
  title: string;
  blurb: string;
  tokens: ColorToken[];
}

export const COLOR_GROUPS: ColorGroup[] = [
  {
    title: "Ink",
    blurb: "Type. Body copy is always --ink; --ink-muted never carries body copy.",
    tokens: [
      { cssVar: "ink", hex: "#14151A", note: "Primary text. Near-black, slightly cool." },
      { cssVar: "ink-soft", hex: "#3A3B40", note: "Secondary text." },
      { cssVar: "ink-muted", hex: "#65666D", note: "Tertiary text, captions, meta." },
    ],
  },
  {
    title: "Surface",
    blurb: "Warm and light. --bone is the page; the others are raised or banded.",
    tokens: [
      { cssVar: "bone", hex: "#F7F5F0", note: "Primary page background." },
      { cssVar: "paper", hex: "#FFFFFF", note: "Raised surfaces: cards, form fields." },
      { cssVar: "sand", hex: "#EFEBE3", note: "Secondary surface, alternating bands." },
    ],
  },
  {
    title: "Line",
    blurb: "How this site separates things. Reach for a rule before a shadow.",
    tokens: [
      { cssVar: "line", hex: "#E2DDD3", note: "Hairline borders. The workhorse." },
      { cssVar: "line-strong", hex: "#C9C2B4", note: "Emphasised dividers." },
      {
        cssVar: "line-field",
        hex: "#8D8678",
        note: "Form control borders only. The lighter lines fail WCAG 1.4.11 as a UI boundary.",
      },
    ],
  },
  {
    title: "Accent",
    blurb:
      "One colour, rationed to roughly 5% of any viewport. If a section looks colourful, it is overused.",
    tokens: [
      { cssVar: "accent", hex: "#2C4BFF", note: "Electric cobalt. Buttons, rules, icons, the Compound Loop." },
      { cssVar: "accent-deep", hex: "#1E40AF", note: "Accent at body size. Links in running text." },
      { cssVar: "accent-lift", hex: "#6685FF", note: "Accent on dark bands, where raw --accent falls to 3.09:1." },
      { cssVar: "accent-wash", hex: "#EAEDFF", note: "Subtle fills only. Never behind body text at small sizes." },
    ],
  },
  {
    title: "Validation",
    blurb:
      "The only colour outside the accent family. Validation states only — never decoration, never a second brand colour.",
    tokens: [
      { cssVar: "error", hex: "#B42318", note: "Field errors. 6.03:1 on bone, 6.57:1 on paper." },
      { cssVar: "error-lift", hex: "#F97066", note: "The same role on a dark band — 6.54:1 on inverse-bg." },
    ],
  },
  {
    title: "Inverse",
    blurb: "Dark bands. Maximum two per page, or the site stops reading as light.",
    tokens: [
      { cssVar: "inverse-bg", hex: "#14151A", note: "Inversion background." },
      { cssVar: "inverse-text", hex: "#F7F5F0", note: "Type on inversion." },
      { cssVar: "inverse-ink-soft", hex: "#C9C6BF", note: "Secondary text on a dark band." },
      { cssVar: "inverse-ink-muted", hex: "#9D9A94", note: "Captions and meta on a dark band." },
      { cssVar: "inverse-line", hex: "#2C2D33", note: "Hairlines on a dark band." },
      { cssVar: "inverse-line-strong", hex: "#43444B", note: "Emphasised dividers on a dark band." },
    ],
  },
];

export const ALL_COLOR_TOKENS: ColorToken[] = COLOR_GROUPS.flatMap((g) => g.tokens);

/* -------------------------------------------------------------------------- */

import type { ContrastUse } from "@/lib/contrast";

export interface ContrastCheck {
  label: string;
  fg: string;
  bg: string;
  use: ContrastUse;
  /** Why this pairing is checked, or why it is banned. */
  note?: string;
  /** True where failing is the documented point of the row. */
  expectFail?: boolean;
}

/** Every pairing the design system actually ships, plus the two it forbids. */
export const CONTRAST_CHECKS: ContrastCheck[] = [
  { label: "Body — ink on bone", fg: "#14151A", bg: "#F7F5F0", use: "body" },
  { label: "Body — ink on paper", fg: "#14151A", bg: "#FFFFFF", use: "body" },
  { label: "Body — ink on sand", fg: "#14151A", bg: "#EFEBE3", use: "body" },
  { label: "Secondary — ink-soft on bone", fg: "#3A3B40", bg: "#F7F5F0", use: "body" },
  { label: "Caption — ink-muted on bone", fg: "#65666D", bg: "#F7F5F0", use: "body" },
  {
    label: "Caption — ink-muted on sand",
    fg: "#65666D",
    bg: "#EFEBE3",
    use: "body",
    note: "The tightest pairing in the system. It set the value of --ink-muted.",
  },
  {
    label: "Button — white on accent",
    fg: "#FFFFFF",
    bg: "#2C4BFF",
    use: "body",
    note: "The primary CTA.",
  },
  {
    label: "Link at body size — accent-deep on bone",
    fg: "#1E40AF",
    bg: "#F7F5F0",
    use: "body",
    note: "Clears AAA. This is why body-size accent text uses --accent-deep.",
  },
  {
    label: "Large text — accent on bone (18px+)",
    fg: "#2C4BFF",
    bg: "#F7F5F0",
    use: "large",
  },
  { label: "Inverse — inverse-text on inverse-bg", fg: "#F7F5F0", bg: "#14151A", use: "body" },
  { label: "Inverse — inverse-ink-soft on inverse-bg", fg: "#C9C6BF", bg: "#14151A", use: "body" },
  { label: "Inverse — inverse-ink-muted on inverse-bg", fg: "#9D9A94", bg: "#14151A", use: "body" },
  {
    label: "Inverse — accent-lift on inverse-bg",
    fg: "#6685FF",
    bg: "#14151A",
    use: "body",
    note: "The reason --accent-lift exists.",
  },
  {
    label: "BANNED — accent on inverse-bg as text",
    fg: "#2C4BFF",
    bg: "#14151A",
    use: "body",
    note: "Fails. Use --accent-lift on dark bands.",
    expectFail: true,
  },
  { label: "Error text — error on bone", fg: "#B42318", bg: "#F7F5F0", use: "body" },
  { label: "Error text — error on paper", fg: "#B42318", bg: "#FFFFFF", use: "body" },
  { label: "Error field border — error on bone", fg: "#B42318", bg: "#F7F5F0", use: "ui" },
  { label: "Focus ring — accent on bone", fg: "#2C4BFF", bg: "#F7F5F0", use: "ui" },
  { label: "Focus ring — accent on paper", fg: "#2C4BFF", bg: "#FFFFFF", use: "ui" },
  { label: "Focus ring — accent on sand", fg: "#2C4BFF", bg: "#EFEBE3", use: "ui" },
  {
    label: "Focus ring — accent-lift on inverse-bg",
    fg: "#6685FF",
    bg: "#14151A",
    use: "ui",
  },
  {
    label: "Field border — line-field on bone",
    fg: "#8D8678",
    bg: "#F7F5F0",
    use: "ui",
    note: "WCAG 1.4.11 boundary for form controls.",
  },
];

/* -------------------------------------------------------------------------- */

export interface TypeSpecimen {
  /** The `type-*` utility. The only sanctioned way to size text. */
  utility: string;
  spec: string;
  face: string;
  sample: string;
}

export const TYPE_SCALE: TypeSpecimen[] = [
  { utility: "type-display-xl", spec: "clamp(3rem, 7vw, 6.5rem) · 0.95 · -0.03em · 600", face: "Clash Display", sample: "Where D2C Brands Compound." },
  { utility: "type-display", spec: "clamp(2.75rem, 6vw, 5.5rem) · 1.02 · -0.03em · 600", face: "Clash Display", sample: "Built to Make Brands Move." },
  { utility: "type-h1", spec: "clamp(2.25rem, 4.5vw, 3.75rem) · 1.06 · -0.02em · 600", face: "Clash Display", sample: "The growth system, run as one." },
  { utility: "type-h2", spec: "clamp(1.875rem, 3.2vw, 2.75rem) · 1.1 · -0.02em · 500", face: "Clash Display", sample: "Creative, media, commerce, retention." },
  { utility: "type-h3", spec: "clamp(1.25rem, 2vw, 1.625rem) · 1.25 · -0.01em · 700", face: "Satoshi", sample: "Growth compounds when the parts connect." },
  { utility: "type-body-lg", spec: "1.125rem · 1.65 · 400", face: "Satoshi", sample: "Most brands do not have a media problem. They have a system problem — creative, media and retention run by people who never speak to each other." },
  { utility: "type-body", spec: "1rem · 1.65 · 400", face: "Satoshi", sample: "Most brands do not have a media problem. They have a system problem — creative, media and retention run by people who never speak to each other." },
  { utility: "type-body-sm", spec: "0.9375rem · 1.6 · 400", face: "Satoshi", sample: "Most brands do not have a media problem. They have a system problem." },
  { utility: "type-caption", spec: "0.8125rem · 1.5 · 400 · --ink-muted", face: "Satoshi", sample: "Figure 01 — the compound loop, stage four of seven." },
  { utility: "type-label", spec: "0.75rem · 1.2 · 500 · uppercase · 0.12em", face: "Satoshi", sample: "Selected work" },
  { utility: "type-button", spec: "0.9375rem · 1 · 500 · -0.01em", face: "Satoshi", sample: "Book a Growth Call" },
];

/* -------------------------------------------------------------------------- */

/** The permitted spacing steps, in px. Anything else is a one-off. */
export const SPACING_SCALE = [
  { step: "1", px: 4 },
  { step: "2", px: 8 },
  { step: "3", px: 12 },
  { step: "4", px: 16 },
  { step: "6", px: 24 },
  { step: "8", px: 32 },
  { step: "10", px: 40 },
  { step: "12", px: 48 },
  { step: "16", px: 64 },
  { step: "20", px: 80 },
  { step: "24", px: 96 },
  { step: "32", px: 128 },
  { step: "40", px: 160 },
  { step: "50", px: 200 },
] as const;

export const SECTION_RHYTHM = [
  { label: "Mobile", value: "80px", utility: "py-20" },
  { label: "Tablet — 768px+", value: "112px", utility: "md:py-28" },
  { label: "Desktop — 1024px+", value: "160px", utility: "lg:py-40" },
  { label: "Hero & Compound Loop", value: "200px", utility: "lg:py-50" },
] as const;

export const RADII = [
  { cssVar: "r-xs", value: "4px", utility: "rounded-xs" },
  { cssVar: "r-sm", value: "8px", utility: "rounded-sm" },
  { cssVar: "r-md", value: "12px", utility: "rounded-md" },
  { cssVar: "r-lg", value: "20px", utility: "rounded-lg" },
  { cssVar: "r-pill", value: "999px", utility: "rounded-pill" },
] as const;

export const CONTAINERS = [
  { variant: "default", width: "1440px", use: "Page sections." },
  { variant: "narrow", width: "880px", use: "Focused editorial blocks and forms." },
  { variant: "prose", width: "720px", use: "Long-form reading." },
  { variant: "wide", width: "full bleed", use: "Galleries and edge-to-edge media." },
] as const;

export const MOTION = [
  { cssVar: "dur-instant", value: "150ms", use: "Hover tints, tooltips." },
  { cssVar: "dur-fast", value: "300ms", use: "Button and link state changes." },
  { cssVar: "dur-base", value: "500ms", use: "Reveals, section entrances." },
  { cssVar: "dur-slow", value: "800ms", use: "Large display type, the Compound Loop." },
] as const;

export const EASING = [
  {
    cssVar: "ease-expo",
    value: "cubic-bezier(0.22, 1, 0.36, 1)",
    use: "Entrances and reveals. Fast out, long settle.",
  },
  {
    cssVar: "ease-inout",
    value: "cubic-bezier(0.65, 0, 0.35, 1)",
    use: "State changes that travel out and back.",
  },
] as const;
