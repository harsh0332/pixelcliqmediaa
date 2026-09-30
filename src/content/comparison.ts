export interface ComparisonRow {
  id: string;
  /** What is being compared. */
  dimension: string;
  /** How the typical arrangement works. Described fairly, not as a straw man. */
  typical: string;
  /** How we work. */
  pixelcliq: string;
}

/**
 * The Pixelcliq difference.
 *
 * Comparative but honest: the left column describes a real and often reasonable
 * way to run things, not a caricature. No claim to being the best, the biggest
 * or the only. If a row could not survive a founder asking "prove it", it does
 * not belong here.
 */
export const comparisonRows: ComparisonRow[] = [
  {
    id: "structure",
    dimension: "How the work is structured",
    typical:
      "Four vendors, and nobody owns what happens between them.",
    pixelcliq:
      "One team across creative, media, commerce, data and retention.",
  },
  {
    id: "creative",
    dimension: "What creative is judged on",
    typical:
      "Creative judged on the feed alone.",
    pixelcliq:
      "Creative built for the feed and the product page it points at.",
  },
  {
    id: "measurement",
    dimension: "Where the numbers come from",
    typical:
      "Platform numbers taken at face value.",
    pixelcliq:
      "Tracking we implement and verify, with estimates labelled as estimates.",
  },
  {
    id: "automation",
    dimension: "How the system holds together",
    typical:
      "Apps bolted on as problems appear, the joins done by hand.",
    pixelcliq:
      "Automation built as infrastructure, so the operation holds its shape.",
  },
  {
    id: "people",
    dimension: "Who is actually on the account",
    typical:
      "Senior people pitch, junior people run it.",
    pixelcliq:
      "The people who audit your account are the people who run it.",
  },
  {
    id: "reporting",
    dimension: "How often you hear the truth",
    typical:
      "A monthly deck, assembled to fit the narrative.",
    pixelcliq:
      "A weekly review from one source, including the tests that failed.",
  },
];
