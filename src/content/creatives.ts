import type { CreativeRatio, PillarId, ViewableMedia } from "@/types";

export type CreativeType =
  | "meta-ad"
  | "ugc"
  | "reel"
  | "product"
  | "carousel"
  | "shopify"
  | "landing-page"
  | "campaign"
  | "motion";

export interface CreativeItem {
  id: string;
  type: CreativeType;
  ratio: CreativeRatio;
  src: string;
  /** Poster frame for video items. */
  poster?: string;
  title: string;
  client: string;
  /**
   * Describes what the frame actually shows. Never empty on a real piece —
   * both competitors ship empty alt on every portfolio image, and one uses
   * alt="Service 3".
   */
  alt: string;
  /**
   * Video source. Undefined means this item is a still, and the frame renders
   * the poster alone rather than an inert player.
   */
  video?: string;
  /**
   * An outcome, once there is a verified one to state. Null until then — a
   * filter or a caption that promises a result and shows none is the failure
   * we audited.
   */
  result: string | null;
  tags: string[];
  /**
   * True only when the piece is real work, cleared by the client for
   * publication. Everything below is scaffolding, so everything is false.
   */
  approved: boolean;
}

/** Labels for gallery filters. Order is the order the filters appear in. */
export const creativeTypeLabels: Record<CreativeType, string> = {
  "meta-ad": "Meta Ads",
  ugc: "UGC",
  reel: "Reels",
  product: "Product",
  carousel: "Carousel",
  shopify: "Shopify",
  "landing-page": "Landing Pages",
  campaign: "Campaigns",
  motion: "Motion",
};

const P = {
  "4:5": "/images/creative/placeholder-4x5.svg",
  "9:16": "/images/creative/placeholder-9x16.svg",
  "1:1": "/images/creative/placeholder-1x1.svg",
} as const satisfies Record<CreativeRatio, string>;

/**
 * The creative showcase.
 *
 * Ratios are weighted towards 4:5 and 9:16 on purpose — those are the native
 * paid formats, and showing the work in the shape it actually runs in is part
 * of the argument. Titles and clients stay bracketed until real work is cleared
 * for publication.
 */
export const creatives: CreativeItem[] = [
  // Meta Ads — the workhorse format.
  { id: "meta-ad-01", type: "meta-ad", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 Meta ad — static, prospecting.", result: null, approved: false, tags: ["static", "prospecting"] },
  { id: "meta-ad-02", type: "meta-ad", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 Meta ad — static, offer.", result: null, approved: false, tags: ["static", "offer"] },
  { id: "meta-ad-03", type: "meta-ad", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 Meta ad — social proof, retargeting.", result: null, approved: false, tags: ["social proof", "retargeting"] },
  { id: "meta-ad-04", type: "meta-ad", ratio: "1:1", src: P["1:1"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 1:1 Meta ad — static, comparison.", result: null, approved: false, tags: ["static", "comparison"] },

  // UGC — creator-led, shot vertical.
  { id: "ugc-01", type: "ugc", ratio: "9:16", src: P["9:16"], poster: P["9:16"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 9:16 creator-led UGC — creator, testimonial.", result: null, approved: false, tags: ["creator", "testimonial"] },
  { id: "ugc-02", type: "ugc", ratio: "9:16", src: P["9:16"], poster: P["9:16"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 9:16 creator-led UGC — creator, unboxing.", result: null, approved: false, tags: ["creator", "unboxing"] },
  { id: "ugc-03", type: "ugc", ratio: "4:5", src: P["4:5"], poster: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 creator-led UGC — creator, problem-solution.", result: null, approved: false, tags: ["creator", "problem-solution"] },

  // Reels — organic short-form.
  { id: "reel-01", type: "reel", ratio: "9:16", src: P["9:16"], poster: P["9:16"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 9:16 short-form reel — organic, hook test.", result: null, approved: false, tags: ["organic", "hook test"] },
  { id: "reel-02", type: "reel", ratio: "9:16", src: P["9:16"], poster: P["9:16"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 9:16 short-form reel — organic, founder.", result: null, approved: false, tags: ["organic", "founder"] },
  { id: "reel-03", type: "reel", ratio: "9:16", src: P["9:16"], poster: P["9:16"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 9:16 short-form reel — organic, education.", result: null, approved: false, tags: ["organic", "education"] },

  // Product — studio and styled.
  { id: "product-01", type: "product", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 product still — studio, catalogue.", result: null, approved: false, tags: ["studio", "catalogue"] },
  { id: "product-02", type: "product", ratio: "1:1", src: P["1:1"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 1:1 product still — studio, packshot.", result: null, approved: false, tags: ["studio", "packshot"] },
  { id: "product-03", type: "product", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 product still — lifestyle, in-use.", result: null, approved: false, tags: ["lifestyle", "in-use"] },

  // Carousel — sequential formats.
  { id: "carousel-01", type: "carousel", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 carousel frame — sequence, education.", result: null, approved: false, tags: ["sequence", "education"] },
  { id: "carousel-02", type: "carousel", ratio: "1:1", src: P["1:1"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 1:1 carousel frame — sequence, range.", result: null, approved: false, tags: ["sequence", "range"] },

  // Shopify — storefront work.
  { id: "shopify-01", type: "shopify", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 Shopify storefront — storefront, pdp.", result: null, approved: false, tags: ["storefront", "pdp"] },
  { id: "shopify-02", type: "shopify", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 Shopify storefront — storefront, collection.", result: null, approved: false, tags: ["storefront", "collection"] },

  // Landing pages — campaign destinations.
  { id: "landing-page-01", type: "landing-page", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 landing page — campaign, offer.", result: null, approved: false, tags: ["campaign", "offer"] },
  { id: "landing-page-02", type: "landing-page", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 landing page — launch, pre-order.", result: null, approved: false, tags: ["launch", "pre-order"] },

  // Campaigns — the larger ideas.
  { id: "campaign-01", type: "campaign", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 campaign — launch, brand.", result: null, approved: false, tags: ["launch", "brand"] },
  { id: "campaign-02", type: "campaign", ratio: "4:5", src: P["4:5"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 4:5 campaign — seasonal, brand.", result: null, approved: false, tags: ["seasonal", "brand"] },

  // Motion — animation and edits.
  { id: "motion-01", type: "motion", ratio: "9:16", src: P["9:16"], poster: P["9:16"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 9:16 motion piece — animation, explainer.", result: null, approved: false, tags: ["animation", "explainer"] },
  { id: "motion-02", type: "motion", ratio: "1:1", src: P["1:1"], poster: P["1:1"], title: "[CREATIVE_TITLE]", client: "[CLIENT_NAME]", alt: "Placeholder frame for a 1:1 motion piece — animation, loop.", result: null, approved: false, tags: ["animation", "loop"] },
];

export const creativeTypes = Object.keys(creativeTypeLabels) as CreativeType[];

/**
 * The only list a public gallery may render. Empty by design.
 *
 * The 23 entries above map the shape of the gallery — the ratio mix, the spread
 * across types — so the components can be built and reviewed. They must never
 * reach a visitor: 23 tiles drawn from three placeholder files is manufactured
 * volume, which is the exact failure we audited in a competitor.
 */
export const approvedCreatives = creatives.filter((item) => item.approved);

/**
 * Which creative formats belong to which pillar.
 *
 * A pillar with no matching formats renders no creative strip rather than a
 * padded one — showing a Shopify screen under Data & Optimisation would be
 * filler pretending to be a portfolio.
 */
export const creativeTypesByPillar: Partial<Record<PillarId, CreativeType[]>> = {
  "d2c-growth": ["meta-ad", "carousel", "campaign"],
  performance: ["meta-ad", "carousel"],
  "creative-content": ["ugc", "reel", "motion", "campaign", "product"],
  "social-media": ["reel", "ugc", "motion"],
  "commerce-shopify": ["shopify", "landing-page", "product"],
  "seo-organic": ["landing-page"],
};

/** Creative for a pillar, falling back to its parent for landing pages. */
export function creativesForPillar(
  pillarId: PillarId,
  parentId?: PillarId,
): CreativeItem[] {
  const types =
    creativeTypesByPillar[pillarId] ??
    (parentId ? creativeTypesByPillar[parentId] : undefined);
  if (!types) return [];
  // Approved only. The selector previously returned every matching item,
  // including the unapproved placeholder frames, which rendered as blank boxes
  // labelled "[CREATIVE_TITLE]" on each service page. A pillar with nothing
  // cleared returns an empty list, and the section removes itself.
  return creatives.filter(
    (item) => item.approved && types.includes(item.type),
  );
}

/**
 * Adapt a creative item for the media viewer.
 *
 * Keeps CreativeItem's stricter ratio union intact — a paid creative still
 * cannot declare 16:9 — while letting the shared viewer take both this and a
 * case study gallery entry.
 */
export function toViewable(item: CreativeItem): ViewableMedia {
  return {
    id: item.id,
    ratio: item.ratio,
    src: item.src,
    poster: item.poster,
    video: item.video,
    alt: item.alt,
    title: item.title,
    client: item.client,
    result: item.result,
    label: creativeTypeLabels[item.type],
  };
}
