import type { CreativeRatio, PillarId } from "@/types";

export interface HeroFrame {
  id: string;
  src: string;
  ratio: CreativeRatio;
  /** Intrinsic dimensions, so the box is reserved before the file loads. */
  width: number;
  height: number;
  /**
   * Empty while these are neutral placeholders — an empty alt correctly removes
   * a decorative image from the accessibility tree. When real work replaces
   * them, the alt arrives with it and nothing else has to change.
   */
  alt: string;
}

export interface HeroContent {
  eyebrow: string;
  /**
   * The single Instrument Serif italic word inside the headline. One per hero.
   *
   * The headline and support copy are NOT repeated here — the hero renders
   * site.tagline and site.supportLine directly. Restating them produced two
   * copies of the same sentence in the content layer, which the content guard
   * correctly rejected: it is the precise failure mode where one competitor
   * shipped identical body copy under two different headings.
   */
  emphasis: string;
  /** Tells the right reader they are in the right place; lets the wrong one leave. */
  qualifier: string;
  /** Sits under the primary CTA and defines what clicking commits them to. */
  ctaNote: string;
  /** What we do, grouped so the system reads rather than the menu. */
  capabilityGroups: { title: string; items: string[] }[];
  metaRail: {
    location: string;
    scrollHint: string;
  };
  frames: HeroFrame[];
}

export const hero: HeroContent = {
  eyebrow: "D2C growth system · Indore / Global",

  emphasis: "Compound",

  /**
   * The qualifying line.
   *
   * Its job is to let the wrong reader leave. It describes a situation rather
   * than making a claim — no revenue threshold, no client tier, nothing we
   * would have to defend. A founder who has just watched one channel stop
   * scaling should recognise themselves in it; a pre-launch brand should read
   * it and know this is not for them yet.
   */
  qualifier:
    "For D2C and Shopify brands past the point where one channel carries growth.",

  /**
   * The friction reducer, directly under the primary CTA.
   *
   * Turns an open-ended commitment into a defined one: how long it takes, and
   * what comes back. Eleven words.
   */
  ctaNote: "30 minutes. You get a point of view, not a pitch deck.",

  /**
   * The capability strip, clustered rather than listed.
   *
   * Eight equal items read as a menu of services. Three clusters read as a
   * system with an order to it — which is the argument the Compound Loop makes
   * further down the page, made legible before the reader ever scrolls to it.
   */
  capabilityGroups: [
    {
      title: "Creative & media",
      items: ["Meta & Google Ads", "Performance creative", "Social"],
    },
    {
      title: "Commerce & conversion",
      items: ["Shopify", "CRO", "Landing pages"],
    },
    {
      title: "Data & automation",
      items: ["Analytics", "Retention", "Automation", "SEO"],
    },
  ],

  metaRail: {
    location: "Indore, India",
    scrollHint: "See the system",
  },

  /**
   * Native ad ratios, deliberately: two 9:16, one 4:5, one 1:1. Showing work in
   * the shape it actually runs in is part of the argument. No 16:9 here — that
   * is a presentation format, not a performance one.
   */
  frames: [
    { id: "frame-ugc", src: "/images/creative/frame-social-9x16.svg", ratio: "9:16", width: 720, height: 1280, alt: "" },
    { id: "frame-product", src: "/images/creative/frame-product-4x5.svg", ratio: "4:5", width: 1024, height: 1280, alt: "" },
    { id: "frame-reel", src: "/images/creative/frame-store-9x16.svg", ratio: "9:16", width: 720, height: 1280, alt: "" },
    { id: "frame-carousel", src: "/images/creative/frame-campaign-1x1.svg", ratio: "1:1", width: 1080, height: 1080, alt: "" },
  ],
};;

export interface ProofStrip {
  /**
   * Deliberately not "Trusted by brands building in".
   *
   * We have no clients yet. "Trusted by" is a trust claim, and pairing it with a
   * list of categories implies brands in those categories are already with us —
   * the same move as a competitor's ₹160 Cr figure with zero named clients.
   * "Built for" says who the service is for, which is true today and stays true
   * after the first client signs.
   *
   * When real logos exist, flip HAS_CLIENT_LOGOS in site.ts; the strip switches
   * to the logo marquee and this label can honestly become "Trusted by".
   */
  label: string;
  /** Shown until there are real client logos. Categories, never fake marks. */
  categories: string[];
}

export const proofStrip: ProofStrip = {
  label: "Built for brands in",
  categories: [
    "Fashion",
    "Beauty",
    "Wellness",
    "Supplements",
    "Home",
    "F&B",
    "Accessories",
    "Footwear",
  ],
};

/* -------------------------------------------------------------------------- */

export interface Positioning {
  eyebrow: string;
  /** Two deliberate lines. The break is the point, so it is not left to wrap. */
  headline: [string, string];
  /**
   * Four things a D2C founder already believes. Stating them first earns the
   * right to the argument that follows — none of them is a claim about us.
   */
  statements: string[];
  closing: string;
}

export const positioning: Positioning = {
  eyebrow: 'The problem with "growth"',

  headline: ["Most agencies run your ads.", "We run your growth."],

  statements: [
    "Ads cannot compensate for a weak offer.",
    "Creative cannot fix a broken product page.",
    "Traffic cannot solve poor conversion.",
    "A beautiful store cannot compensate for zero retention.",
  ],

  closing:
    "Growth is not a channel. It is a system — and the system either compounds or it leaks.",
};

export interface LoopSection {
  eyebrow: string;
  headline: string;
  emphasis: string;
  intro: string;
  /** Shown in the centre once the ring closes. */
  closing: string;
  /** Mobile only: the label on the curve back to the first stage. */
  mobileLoopBack: string;
}

export const loopSection: LoopSection = {
  eyebrow: "The Compound Loop",
  headline: "Seven stages that feed each other.",
  emphasis: "feed",
  intro:
    "Every stage hands something to the next one. Run them separately and the handoffs leak; run them as one loop and each pass makes the next pass cheaper.",
  // Four words. It is the resolution of the diagram, not a headline for it —
  // the loop visibly closing is the climax; the text only confirms it.
  closing: "Seven stages. One system.",
  mobileLoopBack: "and it compounds",
};

/* -------------------------------------------------------------------------- */

export interface ServicesIndexContent {
  eyebrow: string;
  headline: string;
  support: string;
  loopLinkLabel: string;
}

/**
 * Header copy for the services section. The six rows themselves come straight
 * from servicePillars — both the index and the deep dives read the same
 * entries, so a pillar cannot say one thing in one layer and another in the
 * next.
 */
export const servicesIndex: ServicesIndexContent = {
  eyebrow: "What we run",
  headline: "The six pillars, and what each one owns.",
  support:
    "Each pillar hands something to the next, which is why we do not sell them as six separate retainers.",
  loopLinkLabel: "See how the system connects",
};

/* -------------------------------------------------------------------------- */

export interface CreativeShowcaseContent {
  eyebrow: string;
  headline: string;
  /** The single Instrument Serif italic word. */
  emphasis: string;
  support: string;
  linkLabel: string;
  linkHref: string;
  /** Three lines of oversized background type behind the pinned reveal. */
  revealLines: [string, string, string];
  /** The rotated label at the left edge of the horizontal track. */
  trackLabel: string;
  /** Shown beside the filters when a filter matches nothing. */
  emptyFilter: string;
  /** Rendered instead of the wall while nothing is cleared for publication. */
  emptyState: {
    line: string;
    body: string;
    linkLabel: string;
    linkHref: string;
  };
}

export const creativeShowcase: CreativeShowcaseContent = {
  eyebrow: "Selected creative",
  headline: "Creative that performs — and looks the part.",
  emphasis: "performs",
  support:
    "We build in the formats the feed actually runs: 4:5 and 9:16, hook first, never letterboxed into a shape that suits a portfolio grid.",
  linkLabel: "View all work",
  linkHref: "/work",
  revealLines: ["In the", "formats the", "feed runs"],
  trackLabel: "Creative",
  emptyFilter: "Nothing in this format is public yet.",

  /**
   * Shown while no creative has been cleared for publication.
   *
   * The alternative was rendering the unapproved frames, which put empty boxes
   * and literal "[CREATIVE_TITLE]" tokens in front of visitors — a site that
   * looks unfinished rather than an agency that is early. Saying plainly why
   * the wall is empty is the stronger position, and it is the same posture the
   * work index and the client strip already take.
   */
  emptyState: {
    line: "No creative is public yet.",
    body: "We publish work once the engagement is complete and the client has cleared the assets — not mocked-up frames made to fill a page. Until then, the thinking behind the work is the honest thing to show.",
    linkLabel: "Read the thinking",
    linkHref: "/insights",
  },
};

/* -------------------------------------------------------------------------- */


export interface StoryBlockCopy {
  pillar: PillarId;
  eyebrow: string;
  headline: string;
  /** The single Instrument Serif italic phrase, where a block uses one. */
  emphasis?: string;
  body: string;
  linkLabel: string;
}

/**
 * The four story blocks. Each proves one part of the system, and each is given a
 * different structure — four variations of the same layout is what makes an
 * agency site feel long.
 *
 * Capability lines are not restated here; the blocks read them from
 * servicePillars, so a pillar cannot list one set of capabilities in the
 * services section and a different set further down the page.
 */
export const storyBlocks: Record<
  "commerce" | "performance" | "automation" | "seo",
  StoryBlockCopy
> = {
  commerce: {
    pillar: "commerce-shopify",
    eyebrow: "Commerce & Shopify",
    headline: "Your store is part of the media buy.",
    body:
      "Ads create demand; the store decides whether it converts. We build the store as part of the campaign, not after it.",
    linkLabel: "Explore Commerce & Shopify",
  },
  performance: {
    pillar: "d2c-growth",
    eyebrow: "Performance",
    headline: "Media is only as good as the system behind it.",
    body:
      "Anyone can launch a campaign. The difference is whether creative, offer, landing page, tracking and retention pull the same way.",
    linkLabel: "Explore D2C Growth",
  },
  automation: {
    pillar: "automation-ai",
    eyebrow: "Automation & AI",
    headline: "Automation should feel like infrastructure, not a gimmick.",
    body:
      "No robot mascots, no badges announcing that something is powered by AI. Just the plumbing that means a lead never waits and a report never gets built by hand.",
    linkLabel: "Explore Automation & AI",
  },
  seo: {
    pillar: "seo-organic",
    eyebrow: "SEO & Organic",
    headline: "Traffic you do not have to keep buying.",
    emphasis: "keep buying",
    body:
      "Rented attention stops when the spend does; owned attention keeps compounding. We build the foundation and the content that gets a brand found — in Google and in AI answers.",
    linkLabel: "Explore SEO & Organic",
  },
};

/** Block 1 — the path a pound of media spend actually takes. */
export const commerceFlow = [
  { label: "Ad", note: "hook" },
  { label: "Landing page", note: "message match" },
  { label: "PDP", note: "objection handling" },
  { label: "Cart", note: "friction" },
  { label: "Checkout", note: "trust" },
  { label: "Retention", note: "repeat rate" },
] as const;

/** Block 2 — typographic, not a chart. */
export const performanceEquation = {
  terms: ["Creative", "Media", "Landing page", "Offer", "Tracking", "Retention"],
  result: "Profitable scale",
  /**
   * Kept deliberately. Saying plainly that we have no numbers to show earns
   * more trust from a burned founder than a screenshot they cannot verify.
   */
  note: "We do not show ROAS screenshots we cannot attribute. Real numbers go here once campaigns run.",
} as const;

/** Block 3 — a signal moving through a system. */
export const automationSchematic = [
  "Lead",
  "Qualify",
  "Route",
  "Follow up",
  "CRM",
  "Report",
] as const;

/** Block 4 — no diagram. After three, restraint is the treatment. */
export const seoIndex = [
  { title: "Technical SEO", clarifier: "crawl, index, speed, structure" },
  { title: "eCommerce SEO", clarifier: "collections, PDPs, faceted navigation" },
  { title: "Content SEO", clarifier: "the questions buyers actually search" },
  {
    title: "AI SEO / GEO / AEO",
    clarifier: "being cited inside AI answers, not only ranked",
  },
] as const;

/* -------------------------------------------------------------------------- */

export const selectedWork = {
  eyebrow: "Selected work",
  headline: "The work, and the thinking behind it.",
  linkLabel: "View all work",
  linkHref: "/work",
  /** Shown in place of a result headline while a case is unpublished. */
  placeholderHeadline: "Case study in progress",
  /** Sits under the pending headline instead of a fabricated client line. */
  placeholderNote: "Publishes once the work is complete and the client has cleared the numbers.",
  /**
   * Stated plainly rather than hidden. A visitor who sees bracketed tokens and
   * an explanation trusts the site more than one who sees a confident number
   * they cannot check.
   */
  note: "We publish case studies only with client permission and verified numbers. The first studies land soon.",
} as const;

export const processSection = {
  eyebrow: "How we work",
  headline: "Five steps. Then it compounds.",
} as const;

export const comparisonSection = {
  eyebrow: "Why us",
  headline: "What changes when it is one system.",
  leftLabel: "The usual setup",
  rightLabel: "Pixelcliq Media",
} as const;

export const testimonialsSection = {
  eyebrow: "In their words",
  /** The empty state is confident, not apologetic. */
  emptyLine: "The first ones are being written.",
  emptySub:
    "We publish testimonials only from active clients, with their names on them.",
} as const;

export const insightsSection = {
  eyebrow: "Insights",
  headline: "Thinking we would want to read.",
  linkLabel: "All insights",
  /** Replaces reading time while a piece is still a stub. */
  pendingLabel: "Writing in progress",
} as const;

export const closingCta = {
  headline: "Ready to compound?",
  emphasis: "compound",
} as const;

/* -------------------------------------------------------------------------- */

export const servicesPage = {
  eyebrow: "Services",
  headline: "Six pillars. One connected system.",
  /** Authored line breaks for the masked hero reveal — never split at runtime. */
  headlineLines: ["Six pillars.", "One connected system."],
  support:
    "Each pillar is a full engagement in its own right. Run together they stop being six retainers and start being one loop, which is the only reason the numbers compound.",
  loopLinkLabel: "See how the pillars connect",
} as const;

/* -------------------------------------------------------------------------- */

export const workPage = {
  eyebrow: "Work",
  headline: "Work built for the feed, not for a portfolio.",
  headlineLines: ["Work built for the feed,", "not for a portfolio."],
  support:
    "Two ways in: the case studies, which explain what changed and why, and the creative, which is the work itself in the ratios it actually ran in.",
  views: { cases: "Case studies", creative: "Creative" },
  /**
   * An editorial note, not a warning banner. Stating the publishing standard is
   * itself a claim about how we work — and it reads better than a grid of
   * confident numbers a visitor cannot check.
   */
  note:
    "We are publishing our first case studies as campaigns complete. Every study here will carry verified numbers and client permission.",
  resultsPending: "Results publishing once verified.",
  nextLabel: "Next case",
  emptyFilter: "Nothing in this filter yet.",
  allFilter: "All",
} as const;

/* -------------------------------------------------------------------------- */

export const aboutPage = {
  eyebrow: "About",
  headline: "We connect the creative, the funnel, the technology and the numbers.",
  headlineLines: [
    "We connect the creative,",
    "the funnel, the technology",
    "and the numbers.",
  ],
  support:
    "Pixelcliq Media is a D2C-first growth partner working from Indore with brands in India and internationally. We take responsibility for the whole system rather than one channel inside it.",

  whyEyebrow: "Why we exist",
  whyHeadline: "Most brands do not have a media problem.",
  /** Four real paragraphs. No origin-story clichés, no "in a world where". */
  why: [
    "A brand hires a media agency, a creative studio, a Shopify developer and a retention tool. Each of them is competent. Each reports on the part they can see. Nobody is accountable for what happens between them, and that is exactly where the money goes.",
    "The pattern is consistent enough to predict. Creative is briefed without seeing the product page it sends people to. The store is built before the campaigns that will point at it. Tracking is inherited rather than designed, so the numbers everyone argues over are measured three different ways. Retention is somebody's fourth priority. None of these is a failure of effort; they are failures of ownership.",
    "We built Pixelcliq to hold the whole loop instead. Creative is briefed against the objection the product page has to answer. Media is judged on contribution margin rather than on the number the platform reports. The store is treated as part of the media buy, because a point of conversion rate improves every channel at once. Data sits underneath all of it, deciding what is true, and automation moves the results between the parts without anyone assembling a spreadsheet on a Monday.",
    "That is a harder thing to sell than a single channel, and it is a harder thing to run. It is also the only arrangement where each pass makes the next one cheaper — which is what compounding actually means, and why it is the word the whole company is named around.",
  ],

  principlesEyebrow: "How we think",
  principlesHeadline: "Four things we believe, and work to.",
  principles: [
    {
      title: "Creative is the targeting.",
      body: "The algorithm decides who sees an ad, and it decides using the creative. Which means the concept, the hook and the format are the audience strategy now, and briefing them as decoration wastes the largest lever in the account.",
    },
    {
      title: "The store is part of the media buy.",
      body: "Every visit arrives carrying an expectation the ad created. If the page answers a different question, the spend that produced the visit is already gone. We do not treat the storefront as somebody else's brief.",
    },
    {
      title: "If you cannot measure it, you cannot compound it.",
      body: "Improvement requires knowing which change caused what. Most growth arguments are measurement arguments in disguise, so we fix the measurement before we start defending decisions with it.",
    },
    {
      title: "Automation is infrastructure, not a feature.",
      body: "The things that work at fifty orders a day break at five hundred, quietly, while a team absorbs the difference by hand. Building the plumbing deliberately is what lets an operation keep its shape while it grows.",
    },
  ],

  systemEyebrow: "The system",
  systemHeadline: "Seven stages, one loop.",
  systemLinkLabel: "See the six pillars",

  whereEyebrow: "Where we are",
  whereHeadline: "Indore, Madhya Pradesh, India.",
  whereBody:
    "We work with brands across India and internationally. The weekly cadence runs remotely, and if you are in Indore we are happy to meet in person.",
  whereDetail: "IST · GMT+5:30 · working globally",

  factsEyebrow: "Facts",
  /**
   * Only what is true today.
   *
   * Founding year, team size, client count and awards are deliberately absent
   * rather than filled with plausible values — three true rows are worth more
   * than eight invented ones, and every competitor failure we audited started
   * with a number nobody could check. Add rows here as they become verifiable.
   */
  facts: [
    { label: "Based in", value: "Indore, Madhya Pradesh, India" },
    { label: "Working with", value: "D2C and Shopify brands, India and global" },
    { label: "Hours", value: "IST, GMT+5:30" },
    { label: "Engagement", value: "Monthly retainer, starting with an audit" },
  ],
} as const;

export const insightsPage = {
  eyebrow: "Insights",
  headline: "Thinking, not thought leadership.",
  support:
    "Notes on what actually moves D2C growth, written for people running it rather than for a feed. We publish when we have something worth the read.",
  featuredLabel: "Featured",
  allFilter: "All",
  emptyFilter: "Nothing in this category yet.",
  newsletterLabel: "Occasional notes on D2C growth. No spam, no daily newsletter.",
  newsletterCta: "Subscribe",
  newsletterPlaceholder: "you@brand.com",
  relatedLabel: "Related insights",
  draftNotice:
    "This piece is still being written. The outline below is what it will cover.",
} as const;

export const numbersPage = {
  eyebrow: "Numbers",
  headline: "The numbers, when they are real.",
  support:
    "This page fills in as campaigns complete. We publish verified numbers only.",

  /**
   * Rendered while no stat has a real value.
   *
   * Eight rows of "[VALUE]" at display size was the loudest thing on the page
   * and read as an unfinished build rather than a deliberate position. The
   * argument — that we publish numbers only when they are ours to publish — is
   * stronger stated once, plainly, than illustrated with empty rows.
   */
  emptyState: {
    line: "There are no numbers here yet.",
    body: "We have not run an engagement long enough to have results that are ours to publish. When we do, this page will carry the figure, what it is measured against, and the period it covers — with the client's permission first.",
    linkLabel: "See how we work",
    linkHref: "/services",
  },

  /**
   * The measurement stance. On a page with no numbers on it, this is the page —
   * saying precisely what we would count, over what window, and what we will
   * not claim, is a stronger signal than any figure a visitor cannot audit.
   */
  stanceEyebrow: "How we will count",
  stance: [
    "Revenue and orders come from the store, not from a platform's reported conversions. Where the two disagree — and they always do — the store is the number we publish.",
    "Every figure will carry its window and its denominator. A percentage without a period and a base is not evidence, it is decoration.",
    "We will not publish a client's numbers without their written permission, and we will not publish an aggregate that hides which account it came from.",
    "We will not claim causation we cannot separate from seasonality, a price change or a launch that happened in the same month. Where a result is partly attributable, it will say so.",
  ],
} as const;

/* -------------------------------------------------------------------------- */

export const contactPage = {
  eyebrow: "Contact",
  headline: "Let us build something worth scaling.",
  headlineLines: ["Let us build something", "worth scaling."],
  emphasis: "scaling",
  support:
    "Tell us about the brand, where growth is stuck, and what you have already tried. We will come back with a point of view rather than a generic deck.",

  expectationsTitle: "What happens next",
  /** What visitors can expect after sending their brief. */
  expectations: [
    { step: "01", text: "We review your brief and get in touch about the next step." },
    { step: "02", text: "A 30-minute call to understand the brand and the numbers." },
    { step: "03", text: "A short written point of view — not a pitch deck." },
  ],

  form: {
    legend: "Tell us about the brand",
    name: "Name",
    company: "Company or brand",
    email: "Email",
    phone: "Phone",
    website: "Website",
    help: "What do you need help with?",
    helpHint: "Choose as many as apply.",
    notSure: "Not sure yet",
    spend: "Monthly ad spend or stage",
    message: "Message",
    submit: "Start the conversation",
    required: "Required",
  },

  spendOptions: [
    "Pre-launch",
    "Under ₹1L",
    "₹1–5L",
    "₹5–20L",
    "₹20L+",
    "Prefer not to say",
  ],

  errors: {
    name: "Enter your name so we know who we are replying to.",
    company: "Enter the brand or company name.",
    email: "Enter a valid email address, like you@brand.com.",
    website: "Enter a web address, like brand.com.",
    phone: "Enter a reachable number, or leave it blank.",
    help: "Choose at least one area, or pick “Not sure yet”.",
    message: "Tell us a little about the brand.",
    server: "That did not send. Try again, or email us.",
  },

  success: {
    headline: "Thanks — that came through.",
    body: "We review your enquiry and, if an audit makes sense, scope it together on a call.",
    linkLabel: "See the work while you wait",
  },

  faqEyebrow: "Before you write",
  faqHeadline: "The questions we get asked most.",
} as const;

export const notFoundPage = {
  headline: "This page did not convert.",
  support: "The link is broken, or the page moved.",
  homeLabel: "Back to home",
  workLabel: "See the work",
} as const;

export const errorPage = {
  headline: "That did not load.",
  support: "Something broke on our side. It has been logged.",
  retryLabel: "Try again",
  homeLabel: "Back to home",
} as const;
