/**
 * Cross-cutting types.
 *
 * Anything referenced by more than one content file lives here so the data
 * layer type-checks against itself: a pillar id that does not exist, or a stage
 * pointing at a pillar that was renamed, becomes a build error rather than a
 * silently broken link.
 */

/** The six service pillars. Order is the order they are presented in. */
export const PILLAR_IDS = [
  "d2c-growth",
  "creative-content",
  "commerce-shopify",
  "seo-organic",
  "automation-ai",
  "data-optimisation",
  // Not nav items. These are landing pages that map into pillars 01 and 02 and
  // get the full service template — see `primary` on ServicePillar.
  "performance",
  "social-media",
  "strategic-marketing",
  "web-development",
] as const;

export type PillarId = (typeof PILLAR_IDS)[number];

/** The seven Compound Loop stages, in loop order. */
export const STAGE_IDS = [
  "creative",
  "media",
  "commerce",
  "conversion",
  "retention",
  "data",
  "automation",
] as const;

export type StageId = (typeof STAGE_IDS)[number];

/**
 * Native ad and editorial crops. 4:5 and 9:16 are the formats the work is
 * actually made in; 16:9 is for wide editorial stills only.
 */
export type AspectRatio = "4:5" | "9:16" | "16:9" | "1:1";

/** Ratios a paid creative can be. Deliberately excludes 16:9. */
export type CreativeRatio = Extract<AspectRatio, "4:5" | "9:16" | "1:1">;

/**
 * Whether an entry holds real, verified content or is still scaffolding.
 * Components must render a dignified empty state for `placeholder` — never
 * dress a bracketed token up as a fact.
 */
export type ContentStatus = "published" | "placeholder";

export interface Cta {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  /** One line, used in the services mega-menu. */
  description?: string;
}

/**
 * Anything the media viewer can display.
 *
 * Paid creative is constrained to 4:5, 9:16 and 1:1 (CreativeRatio), but a case
 * study gallery legitimately carries 16:9 editorial stills. Rather than fork the
 * viewer, both feed it this shape — the frame still derives its box from the
 * asset's own ratio, so nothing can be cropped either way.
 */
export interface ViewableMedia {
  id: string;
  ratio: AspectRatio;
  src: string;
  poster?: string;
  video?: string;
  alt: string;
  title: string;
  client: string;
  result?: string | null;
  /** Format label shown in the caption. */
  label: string;
}
