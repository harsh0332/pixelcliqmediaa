export interface ProcessStep {
  step: string;
  title: string;
  /** One line, used as the step's caption. */
  summary: string;
  /** Three or four sentences for the approach page. */
  description: string;
}

/**
 * The engagement process. This is how a Pixelcliq relationship actually runs,
 * written to be checked against — if we skip a step, a client can point at this.
 */
export const engagementProcess: ProcessStep[] = [
  {
    step: "01",
    title: "Audit",
    summary: "We map the whole funnel before touching spend.",
    description:
      "We read the account, the store and the tracking together before changing anything. Most of what looks like a media problem turns out to be somewhere else.",
  },
  {
    step: "02",
    title: "Strategy",
    summary: "The growth thesis, the channel plan, the creative direction.",
    description:
      "We write down what we believe is limiting growth, what we intend to do about it, and what we expect to see if we are right. It is written to be argued with.",
  },
  {
    step: "03",
    title: "Build",
    summary: "Creative, store, tracking and automations, in parallel.",
    description:
      "Creative, storefront and tracking are built in the same window, not in sequence. By the time media goes live, the traffic has somewhere good to land and we can see what happens to it.",
  },
  {
    step: "04",
    title: "Launch",
    summary: "Media live, structured tests, a weekly cadence.",
    description:
      "Campaigns go live against the structure and the win conditions agreed in strategy. Every week there is a standing review of what changed, what it cost and what happens next.",
  },
  {
    step: "05",
    title: "Compound",
    summary: "Retention, data and iteration — the loop closes.",
    description:
      "This is the part most engagements never reach. Retention raises what a customer is worth, which raises what you can afford to pay to acquire the next one.",
  },
];
