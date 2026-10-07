import { newInsights } from "@/content/insightPosts";
export type InsightCategory =
  | "Creative"
  | "Media"
  | "Commerce"
  | "Data"
  | "Retention"
  | "Automation";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  /** Breaks out of the measure, set in Instrument Serif. */
  | { type: "pull"; text: string }
  | { type: "code"; text: string };

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  /**
   * Null until the article is written — computed from the body, never guessed.
   * Publishing a reading time for an unwritten piece is a small fiction.
   */
  readingTime: string | null;
  /** Null until actually published. No backdating. */
  publishedAt: string | null;
  author: string;
  cover: string;
  /**
   * The article, as typed blocks rather than raw MDX.
   *
   * Structured content means no markdown parser in the bundle and no unsanitised
   * HTML, and every block maps to a component we control the typography of.
   * Swapping to MDX later is a change of renderer, not of schema.
   *
   * Null while the piece is still a stub.
   */
  body: ArticleBlock[] | null;
  status: "draft" | "published";
  /** Search-facing title (≤60 chars, no site suffix) when the H1 is too long or too poetic for a SERP. */
  metaTitle?: string;
  /** Use `title` as the whole <title> (no site suffix) when it already reads as a search title. */
  absoluteTitle?: boolean;
  /** Hand-written meta description (≤155 chars). Falls back to a trimmed excerpt. */
  metaDescription?: string;
  /** Questions answered on the page, rendered as an accordion and emitted as FAQPage JSON-LD. */
  faq?: { q: string; a: string }[];
}

/**
 * Article stubs.
 *
 * Titles and excerpts are real — these are the pieces we intend to write, and
 * they define the editorial position. Everything that would imply the article
 * already exists (date, reading time, body) is null until it does.
 */
export const insights: Insight[] = [
  {
    slug: "creative-testing-structure",
    title: "How to structure a creative testing programme that compounds",
    excerpt:
      "Most brands test creative in a way that produces winners they cannot explain. Structuring tests around concepts rather than assets turns each round into an input for the next one.",
    category: "Creative",
    readingTime: "6 min read",
    publishedAt: "2026-08-18",
    author: "Pixelcliq Media",
    cover: "/images/work/placeholder-16x9.svg",
    body: [
      { type: "p", text: "Most brands test creative the way they test a subject line: change something, look at the result, keep the winner. It feels rigorous and it produces almost nothing you can reuse, because the thing that won is an asset rather than an idea." },
      { type: "p", text: "A testing programme compounds only when each round tells you something the next round can act on. That requires structuring tests around concepts, not around files." },

      { type: "h2", text: "The difference between an asset and a concept" },
      { type: "p", text: "An asset is a specific file: this video, this static, this hook. A concept is the argument the asset is making — the reason a stranger should care. Two assets can share a concept and look nothing alike, and two near-identical assets can be arguing completely different things." },
      { type: "p", text: "When you test assets, a winner tells you that this file worked. When you test concepts, a winner tells you which belief your market responds to, and you can express that belief a dozen more ways." },
      { type: "pull", text: "A winning asset gives you one ad. A winning concept gives you a quarter of them." },

      { type: "h2", text: "Structuring a round" },
      { type: "p", text: "A round of testing should be able to answer one question. Before anything is produced, write down what you are trying to learn and what result would settle it. If you cannot state the question in a sentence, the round will produce a number nobody can interpret." },
      { type: "ol", items: [
        "Name the objection. What does this customer believe that stops them buying?",
        "Write the concept. What is the single argument that addresses it?",
        "Produce three to five expressions of that one concept, in the formats the placement actually runs.",
        "Define the win condition before launch, including how long it runs and how much it spends.",
        "Read the result at the concept level, then decide whether to extend it or retire it.",
      ]},

      { type: "h3", text: "Why the expressions matter" },
      { type: "p", text: "Producing several expressions of one concept separates the idea from its execution. If all five underperform, the concept is wrong. If one of five carries, the concept is right and the execution was the variable — which is a much cheaper problem to fix." },
      { type: "p", text: "Testing one asset per concept collapses those two failures into a single ambiguous result, which is how accounts end up with a graveyard of tests and no accumulated knowledge." },

      { type: "h2", text: "Reading results without fooling yourself" },
      { type: "p", text: "The most common mistake is calling a round early. A concept that looks strong on day two frequently regresses by day six, because the platform has not finished finding the audience it thinks the creative is for." },
      { type: "ul", items: [
        "Agree the runtime before launch and hold it, unless spend efficiency collapses entirely.",
        "Compare concepts against each other, not against the account average.",
        "Record inconclusive results as inconclusive. They are the most common outcome and the most frequently overwritten.",
        "Keep a naming convention that lets you trace an asset back to its concept months later.",
      ]},
      { type: "quote", text: "A result nobody likes still counts. A programme that only records its wins is a marketing exercise, not a testing one.", attribution: "Our own operating rule" },

      { type: "h2", text: "What the programme accumulates" },
      { type: "p", text: "After a few rounds, the value is not the winning ads. It is a documented map of which arguments this market accepts and which it ignores, which formats carry which arguments, and which objections have not been addressed yet. That map is what makes the next quarter cheaper than the last." },
      { type: "p", text: "It is also, incidentally, the brief for everything else — the product page, the lifecycle emails, the organic content. A concept that survives paid testing has been validated on a cold audience, which is a harder test than any internal review." },

      { type: "h2", text: "Where most programmes stall" },
      { type: "p", text: "Volume. A testing cadence needs enough new creative to keep asking questions, and most brands produce at a rate that lets them ask about four questions a year. At that pace the account is not learning, it is waiting." },
      { type: "p", text: "Fixing the pipeline is usually more valuable than fixing the bidding, and it is almost always the less popular recommendation." },
    ],
    status: "published",
  },
  // Published 8 Oct 2026. Bodies live in insightPosts.ts to keep this file readable.
  ...newInsights,
  {
    slug: "creative-volume-and-cac",
    title: "Why CAC rises when creative volume drops",
    excerpt:
      "Acquisition cost is often treated as a bidding outcome. In practice it moves with how much new creative the account has to work with, and the lag makes the cause easy to miss.",
    category: "Media",
    readingTime: null,
    publishedAt: null,
    author: "Pixelcliq Media",
    cover: "/images/work/placeholder-16x9.svg",
    body: null,
    status: "draft",
  },
  {
    slug: "healthy-shopify-pdp",
    title: "What a healthy Shopify product page actually does",
    excerpt:
      "A good product page is not a longer product page. It answers what is this, why this one, and what if I am wrong — before the customer has to scroll for them.",
    category: "Commerce",
    readingTime: null,
    publishedAt: null,
    author: "Pixelcliq Media",
    cover: "/images/work/placeholder-16x9.svg",
    body: null,
    status: "draft",
  },
  {
    slug: "attribution-after-ios",
    title: "Attribution after iOS: what you can still trust",
    excerpt:
      "Deterministic attribution got weaker and it is not coming back. What replaces it is server-side events, first-party data, and knowing which numbers are modelled.",
    category: "Data",
    readingTime: null,
    publishedAt: null,
    author: "Pixelcliq Media",
    cover: "/images/work/placeholder-16x9.svg",
    body: null,
    status: "draft",
  },
  {
    slug: "retention-math",
    title: "Retention math: the number that decides what you can pay for a customer",
    excerpt:
      "Cohort value over time, not first-order revenue, sets the ceiling on acquisition cost. Brands that model it can outbid brands that do not, on exactly the same product.",
    category: "Retention",
    readingTime: null,
    publishedAt: null,
    author: "Pixelcliq Media",
    cover: "/images/work/placeholder-16x9.svg",
    body: null,
    status: "draft",
  },
  {
    slug: "reading-a-meta-account",
    title: "Five checks to run before you touch the budget",
    excerpt:
      "Before changing spend, confirm five things: structure, tracking integrity, creative age, audience overlap and unit economics. Most accounts fail at least two.",
    category: "Media",
    readingTime: null,
    publishedAt: null,
    author: "Pixelcliq Media",
    cover: "/images/work/placeholder-16x9.svg",
    body: null,
    status: "draft",
  },
];

/** The only list a public page should render. Empty until the writing is done. */
export const publishedInsights = insights.filter(
  (insight) => insight.status === "published",
);
