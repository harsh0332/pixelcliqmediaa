import type { AspectRatio, ContentStatus, PillarId } from "@/types";

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  services: PillarId[];
  headline: string;
  problem: string;
  strategy: string[];
  results: { metric: string; label: string }[];
  timeframe: string;
  website?: string;
  quote?: { text: string; author: string; role: string };
  cover: string;
  gallery: { src: string; ratio: AspectRatio; caption: string }[];
  status: ContentStatus;
}

/**
 * Case studies.
 *
 * All three are placeholders until real, client-cleared work exists. Nothing
 * here is rendered as a result — see the empty states in SelectedWork.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "case-one",
    client: "[CLIENT_NAME]",
    industry: "[INDUSTRY]",
    services: ["d2c-growth", "creative-content"],
    headline: "[RESULT_HEADLINE]",
    problem: "[PROBLEM]",
    strategy: ["[STRATEGY_STEP_1]", "[STRATEGY_STEP_2]", "[STRATEGY_STEP_3]"],
    results: [
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
    ],
    timeframe: "[TIMEFRAME]",
    quote: { text: "[TESTIMONIAL_TEXT]", author: "[NAME]", role: "[ROLE]" },
    cover: "/images/work/placeholder-16x9.svg",
    gallery: [
      { src: "/images/work/placeholder-16x9.svg", ratio: "16:9", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-9x16.svg", ratio: "9:16", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-4x5.svg", ratio: "4:5", caption: "[CAPTION]" },
    ],
    status: "placeholder",
  },
  {
    slug: "case-two",
    client: "[CLIENT_NAME]",
    industry: "[INDUSTRY]",
    services: ["commerce-shopify", "data-optimisation"],
    headline: "[RESULT_HEADLINE]",
    problem: "[PROBLEM]",
    strategy: ["[STRATEGY_STEP_1]", "[STRATEGY_STEP_2]", "[STRATEGY_STEP_3]"],
    results: [
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
    ],
    timeframe: "[TIMEFRAME]",
    quote: { text: "[TESTIMONIAL_TEXT]", author: "[NAME]", role: "[ROLE]" },
    cover: "/images/work/placeholder-4x5.svg",
    gallery: [
      { src: "/images/work/placeholder-4x5.svg", ratio: "4:5", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-1x1.svg", ratio: "1:1", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-16x9.svg", ratio: "16:9", caption: "[CAPTION]" },
    ],
    status: "placeholder",
  },
  {
    slug: "case-three",
    client: "[CLIENT_NAME]",
    industry: "[INDUSTRY]",
    services: ["creative-content", "d2c-growth"],
    headline: "[RESULT_HEADLINE]",
    problem: "[PROBLEM]",
    strategy: ["[STRATEGY_STEP_1]", "[STRATEGY_STEP_2]", "[STRATEGY_STEP_3]"],
    results: [
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
    ],
    timeframe: "[TIMEFRAME]",
    quote: { text: "[TESTIMONIAL_TEXT]", author: "[NAME]", role: "[ROLE]" },
    cover: "/images/work/placeholder-9x16.svg",
    gallery: [
      { src: "/images/work/placeholder-9x16.svg", ratio: "9:16", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-4x5.svg", ratio: "4:5", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-4x5.svg", ratio: "4:5", caption: "[CAPTION]" },
    ],
    status: "placeholder",
  },
  {
    slug: "case-four",
    client: "[CLIENT_NAME]",
    industry: "[INDUSTRY]",
    services: ["seo-organic", "commerce-shopify"],
    headline: "[RESULT_HEADLINE]",
    problem: "[PROBLEM]",
    strategy: ["[STRATEGY_STEP_1]", "[STRATEGY_STEP_2]", "[STRATEGY_STEP_3]"],
    results: [
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
    ],
    timeframe: "[TIMEFRAME]",
    quote: { text: "[TESTIMONIAL_TEXT]", author: "[NAME]", role: "[ROLE]" },
    cover: "/images/work/placeholder-4x5.svg",
    gallery: [
      { src: "/images/work/placeholder-16x9.svg", ratio: "16:9", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-4x5.svg", ratio: "4:5", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-1x1.svg", ratio: "1:1", caption: "[CAPTION]" },
    ],
    status: "placeholder",
  },
  {
    slug: "case-five",
    client: "[CLIENT_NAME]",
    industry: "[INDUSTRY]",
    services: ["automation-ai", "commerce-shopify", "data-optimisation"],
    headline: "[RESULT_HEADLINE]",
    problem: "[PROBLEM]",
    strategy: ["[STRATEGY_STEP_1]", "[STRATEGY_STEP_2]", "[STRATEGY_STEP_3]"],
    results: [
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
    ],
    timeframe: "[TIMEFRAME]",
    quote: { text: "[TESTIMONIAL_TEXT]", author: "[NAME]", role: "[ROLE]" },
    cover: "/images/work/placeholder-4x5.svg",
    gallery: [
      { src: "/images/work/placeholder-4x5.svg", ratio: "4:5", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-9x16.svg", ratio: "9:16", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-16x9.svg", ratio: "16:9", caption: "[CAPTION]" },
    ],
    status: "placeholder",
  },
  {
    slug: "case-six",
    client: "[CLIENT_NAME]",
    industry: "[INDUSTRY]",
    services: ["d2c-growth", "creative-content", "commerce-shopify", "automation-ai"],
    headline: "[RESULT_HEADLINE]",
    problem: "[PROBLEM]",
    strategy: ["[STRATEGY_STEP_1]", "[STRATEGY_STEP_2]", "[STRATEGY_STEP_3]"],
    results: [
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
      { metric: "[RESULT_METRIC]", label: "[LABEL]" },
    ],
    timeframe: "[TIMEFRAME]",
    quote: { text: "[TESTIMONIAL_TEXT]", author: "[NAME]", role: "[ROLE]" },
    cover: "/images/work/placeholder-9x16.svg",
    gallery: [
      { src: "/images/work/placeholder-9x16.svg", ratio: "9:16", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-4x5.svg", ratio: "4:5", caption: "[CAPTION]" },
      { src: "/images/work/placeholder-1x1.svg", ratio: "1:1", caption: "[CAPTION]" },
    ],
    status: "placeholder",
  },
];

/** Only ever render these publicly. Currently empty, and that is correct. */
export const publishedCaseStudies = caseStudies.filter(
  (entry) => entry.status === "published",
);
