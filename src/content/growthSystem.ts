import type { PillarId, StageId } from "@/types";

export interface LoopStage {
  id: StageId;
  label: string;
  /** 45 characters at most — it sits in a 180px column beside the node. */
  oneLiner: string;
  /**
   * One sentence, 90 characters at most.
   *
   * This is the centre readout, and the centre readout has to fit inside the
   * ring's inner radius in three lines. Two-sentence versions rendered six
   * lines deep and sat on top of the node labels on both sides.
   */
  description: string;
  /** The pillar this stage links through to. */
  pillar: PillarId;
}

/**
 * The Compound Loop.
 *
 * Order is the loop order and the array is the source of truth for the diagram:
 * stage seven feeds back into stage one, which is the entire argument of the
 * positioning. Seven stages map onto six pillars, so two pillars carry two
 * stages each — see loopNote below.
 */
export const loopStages: LoopStage[] = [
  {
    id: "creative",
    label: "Creative",
    oneLiner: "Angles and assets built to be tested.",
    description:
      "Creative is briefed against real objections, not against a moodboard.",
    pillar: "creative-content",
  },
  {
    id: "media",
    label: "Media",
    oneLiner: "Budget aimed at demand that actually exists.",
    description:
      "Paid media buys the learning that says which angle deserves more.",
    pillar: "d2c-growth",
  },
  {
    id: "commerce",
    label: "Commerce",
    oneLiner: "A store built to receive paid traffic.",
    description:
      "The storefront meets the expectation the ad created, or the spend is wasted.",
    pillar: "commerce-shopify",
  },
  {
    id: "conversion",
    label: "Conversion",
    oneLiner: "Fewer visits lost between arrival and pay.",
    description:
      "A point of conversion rate improves every channel at once.",
    pillar: "commerce-shopify",
  },
  {
    id: "retention",
    label: "Retention",
    oneLiner: "The second order costs less than the first.",
    description:
      "Retention raises the price you can afford to pay for the first order.",
    pillar: "automation-ai",
  },
  {
    id: "data",
    label: "Data",
    oneLiner: "Measurement you can defend in a meeting.",
    description:
      "Tracking and cohort economics decide which part of the loop is working.",
    pillar: "data-optimisation",
  },
  {
    id: "automation",
    label: "Automation",
    oneLiner: "The loop runs without being pushed.",
    description:
      "What the data showed feeds straight back into the next round of creative.",
    pillar: "automation-ai",
  },
];

/**
 * Why the stage list and the pillar list are not one-to-one, in plain terms.
 * Surfaced on the approach page rather than hidden in a code comment.
 */
export const loopNote =
  "Seven stages, six pillars. Commerce and Conversion are the same team doing two different jobs, and Retention and Automation share the same infrastructure. SEO & Organic is not a stage because it is not a step in the loop — it is the compounding asset every stage feeds.";

export const stagesById = new Map(loopStages.map((stage) => [stage.id, stage]));

/** The stage after this one. Stage seven returns to stage one — that is the point. */
export function nextStage(id: StageId): LoopStage {
  const index = loopStages.findIndex((stage) => stage.id === id);
  if (index === -1) throw new Error(`Unknown loop stage: ${id}`);
  return loopStages[(index + 1) % loopStages.length]!;
}
