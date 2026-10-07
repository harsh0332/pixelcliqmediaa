import type { PillarId } from "@/types";

export interface ServicePillar {
  id: PillarId;
  /** Display number, "01" through "06". */
  number: string;
  title: string;
  slug: string;
  /** One line. The outcome, not the activity. Used by the services index. */
  promise: string;
  /**
   * The argument for this pillar, as a headline for its deep-dive row.
   *
   * Separate from `promise` on purpose: both layers of the services section
   * appear on the same page, so reusing the promise as the deep-dive headline
   * would print the same sentence twice — the duplication failure we audit for.
   */
  headline: string;
  /** Two or three sentences, for the homepage card. */
  summary: string;
  /** Longer opening for the service page. */
  intro: string;
  /**
   * True for the six pillars that appear in navigation. False for landing
   * pages that render the same template and are linked from their parent
   * pillar and the footer, but do not appear as nav items.
   */
  primary: boolean;
  /** For non-primary entries, the pillar this page belongs to. */
  parent?: PillarId;
  /** The specific failure this pillar solves, for the service page. */
  problem: {
    intro: string;
    /** Three hairline-separated statements a founder will recognise. */
    pains: string[];
  };
  /** One sentence on how this pillar feeds the others. */
  connectsNote: string;
  /**
   * Who the engagement suits, and who it does not.
   *
   * Saying plainly when we are the wrong answer qualifies harder than any
   * amount of persuasion, and it is the same posture as the site-level "who we
   * do not work with" question.
   */
  fit: { intro: string; notFor: string };
  capabilities: string[];
  deliverables: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  /** Pillars this one feeds. Powers the Compound Loop cross-links. */
  connectsTo: PillarId[];
  faq: { q: string; a: string }[];
  /** Overrides the "{title}." H1 when the page wants its own headline. */
  heading?: string;
  /** Extra copy sections, rendered before the scope grid or after the process. */
  sections?: {
    placement: "before-scope" | "after-process";
    label: string;
    title: string;
    accent: string;
    intro: string;
    items: { title: string; body: string }[];
  }[];
  /**
   * Our own fee ranges. `min`/`max` (rupees) also feed the Service schema.
   * Pages that carry this set `quotesFees`, which exempts them from the
   * content guard's currency check: these are price quotes, not result claims.
   */
  pricing?: {
    label: string;
    title: string;
    accent: string;
    intro: string;
    items: { name: string; price: string; body: string; min?: number; max?: number }[];
    outro: string;
  };
  quotesFees?: boolean;
}

/**
 * The six pillars.
 *
 * `connectsTo` is typed as PillarId rather than string so a renamed pillar
 * breaks the build instead of silently producing a dead link in the loop.
 */
export const servicePillars: ServicePillar[] = [
  {
    id: "d2c-growth",
    primary: true,
    problem: {
      intro:
        "Most accounts are not underperforming because of the bidding. They are underperforming because budget competes with itself, creative runs out before the learning does, and the number everyone argues over is measured three different ways.",
      pains: [
        "Prospecting and retargeting bidding against each other for the same customer.",
        "A creative library that empties faster than it refills.",
        "Platform-reported return that no longer resembles what the bank sees.",
      ],
    },
    connectsNote:
      "Media buys the learning creative needs and the traffic commerce converts, and none of that learning is trustworthy without measurement underneath it.",
    fit: {
      intro:
        "This is the right engagement when there is real spend to work with, a product with repeat potential, and somebody internally who can answer questions about margin. It suits brands who want the account rebuilt rather than maintained.",
      notFor:
        "It is the wrong engagement if you need someone to press buttons on a plan that is already fixed, or if the unit economics cannot support paid acquisition at any efficiency. We will say so on the first call rather than after the first invoice.",
    },
    number: "01",
    title: "D2C Growth",
    slug: "/services/d2c-growth",
    promise: "Spend that scales without giving back the margin.",
    headline: "Scale is a structure problem before it is a budget problem.",
    summary:
      "Paid media judged on contribution margin, not on the number in Ads Manager. We rebuild the account structure, the creative testing programme and the measurement behind them, then scale what survives contact with the P&L.",
    intro:
      "Most accounts do not have a bidding problem. They have a structure problem, a creative supply problem, and a measurement problem that hides both. We rebuild the account around the decisions that actually move spend, then scale with the store and retention ready to receive the traffic.",
    capabilities: [
      "Meta Ads",
      "Google Ads",
      "Retargeting and audience architecture",
      "Full-funnel strategy",
      "Creative testing programmes",
      "Conversion rate optimisation",
    ],
    deliverables: [
      {
        title: "Account architecture",
        description:
          "A rebuilt campaign structure with clear prospecting, retargeting and retention boundaries, so budget stops competing with itself and the learning phase can actually complete.",
      },
      {
        title: "Creative testing programme",
        description:
          "A standing cadence of concepts, hooks and formats with defined win conditions, so creative decisions are settled by evidence rather than by the loudest opinion in the room.",
      },
      {
        title: "Full-funnel media plan",
        description:
          "Channel, budget and audience allocation mapped to where demand actually exists, with the split between capturing existing demand and creating new demand made explicit.",
      },
      {
        title: "Profitability model",
        description:
          "A contribution-margin view of the account: what an order is worth after COGS, shipping, discounts and returns, and what that makes a defensible cost per acquisition.",
      },
      {
        title: "Scaling and pull-back rules",
        description:
          "Written thresholds for increasing spend, holding and cutting, agreed in advance — so scaling is not a series of nervous daily decisions.",
      },
      {
        title: "Weekly operating cadence",
        description:
          "A standing review of what changed, what it cost, what we learned and what happens next week. No surprise months.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "We read the account, the store and the numbers together — structure, spend history, creative fatigue, tracking integrity and unit economics — before anything is switched on or off.",
      },
      {
        step: "02",
        title: "Thesis",
        description:
          "We write down what we believe is limiting growth and what we expect to change. A strategy you cannot disagree with is not a strategy.",
      },
      {
        step: "03",
        title: "Rebuild",
        description:
          "Structure, audiences, exclusions, naming and tracking are rebuilt to match the thesis, and creative production starts against a testing brief.",
      },
      {
        step: "04",
        title: "Test",
        description:
          "Concepts run against defined win conditions. Losers are cut on schedule, winners are given room, and results feed straight back into the creative brief.",
      },
      {
        step: "05",
        title: "Scale",
        description:
          "Budget moves to what survives, with agreed pull-back thresholds. Retention and the store carry the load that paid media hands them.",
      },
    ],
    connectsTo: ["creative-content", "commerce-shopify", "data-optimisation", "meta-ads"],
    faq: [
      {
        q: "How long before we can judge the account?",
        a: "Two to four weeks to rebuild and stabilise, then a full creative testing cycle before the numbers mean much. Anyone offering a verdict in week one is reading noise.",
      },
      {
        q: "Do you take over an existing account or start fresh?",
        a: "Usually we restructure in place. History has value — the pixel, the audiences, the conversion data — so we rebuild the structure around it rather than discarding it, unless the account is genuinely unrecoverable.",
      },
      {
        q: "Who makes the creative?",
        a: "We do, through the Creative & Content pillar. Paid media without creative supply stalls within a month, so the two run as one workflow rather than being briefed across a gap.",
      },
      {
        q: "What do you report on?",
        a: "Contribution margin, blended CAC, and the leading indicators that predict them — hook rate, cost per click, add-to-cart rate, repeat rate. Platform ROAS is a diagnostic, not the score.",
      },
      {
        q: "Do you run Google as well as Meta?",
        a: "Yes. Most D2C brands need both — Meta to create demand, Google to capture it. Running them as separate exercises is how brands end up paying twice for the same customer.",
      },
      {
        q: "Do you take a percentage of ad spend?",
        a: "No. That model pays us for spending more, which is exactly the wrong incentive when the job is profitable scale. We work on a flat monthly retainer agreed in advance.",
      },
    ],
  },

  {
    id: "creative-content",
    primary: true,
    problem: {
      intro:
        "Creative is the largest lever in a modern account and the one most often starved. Brands make three variations a quarter, watch performance decay, and conclude the platform changed.",
      pains: [
        "Assets designed for a portfolio, then cropped into a feed.",
        "Testing that produces winners nobody can explain.",
        "Organic and paid saying different things to the same person.",
      ],
    },
    connectsNote:
      "Creative supplies the media account and sets the promise the store has to keep, which is why it is briefed against the product page rather than against a moodboard.",
    fit: {
      intro:
        "This suits brands whose accounts are starved of creative, where the same three assets have run for months and performance is decaying on schedule. It works best with product access and somebody who can speak to what the product actually does.",
      notFor:
        "It is not the right fit if what you want is a brand film with no intention of testing it, or if creative approval passes through a committee on a monthly cycle. Testing cadence and approval cadence have to match.",
    },
    number: "02",
    title: "Creative & Content",
    slug: "/services/creative",
    promise: "Creative made to be tested, not to be admired.",
    headline: "The account stalls when the creative pipeline does.",
    summary:
      "Performance creative, organic content and campaign work built from one strategy. We make in the formats the platforms actually reward — 4:5 and 9:16, hook first — and produce at the volume that testing requires.",
    intro:
      "Creative is the largest lever in a modern ad account and the one most often starved. Brands under-produce, test three variations a quarter, then blame the algorithm. We work the other way: a defined strategy, a standing production line, and a testing brief that feeds the next round.",
    capabilities: [
      "Creative strategy",
      "Performance creatives",
      "Social media",
      "Content strategy",
      "Reels and short-form",
      "UGC",
      "Motion and animation",
      "Campaign concepts",
    ],
    deliverables: [
      {
        title: "Creative strategy",
        description:
          "The angles, audiences and objections the work has to address, written down before anything is designed. Production without this is decoration.",
      },
      {
        title: "Performance creative library",
        description:
          "Static, motion and UGC built natively for 4:5 and 9:16, with hooks and variants structured so a test result points at a specific decision.",
      },
      {
        title: "Content system",
        description:
          "An organic cadence sharing the same strategy as the paid work, so the feed and the ads reinforce each other instead of contradicting each other.",
      },
      {
        title: "UGC and creator pipeline",
        description:
          "Briefs, sourcing and direction for creator-led work, with usage rights settled properly before anything runs as an ad.",
      },
      {
        title: "Campaign concepts",
        description:
          "Larger ideas with a reason to exist — a launch, a season, a repositioning — built to run across media, store and lifecycle rather than as a one-off post.",
      },
      {
        title: "Creative reporting",
        description:
          "What won, what lost, and the hypothesis for the next round. Every asset carries a naming convention so performance reads back to a decision.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Strategy",
        description:
          "We define the angles: what the customer believes now, what they need to believe, and the objection standing between the two. Every asset is made against one of them.",
      },
      {
        step: "02",
        title: "Concept",
        description:
          "Ideas are written as hooks and scripts, not as moodboards. If the first three seconds do not work on paper, they will not work in the feed.",
      },
      {
        step: "03",
        title: "Produce",
        description:
          "Shot, designed, edited and versioned in native ratios, with volume planned so the testing programme never runs dry.",
      },
      {
        step: "04",
        title: "Test",
        description:
          "Assets go live against defined win conditions in the media account. Results are read at the concept level, not the asset level.",
      },
      {
        step: "05",
        title: "Iterate",
        description:
          "Winning angles are extended into new variants and losing ones retired with a note on why, so the library compounds instead of resetting.",
      },
    ],
    connectsTo: ["d2c-growth", "commerce-shopify", "seo-organic", "meta-ads"],
    faq: [
      {
        q: "How much creative do you produce each month?",
        a: "Enough to keep the testing programme fed, which depends on spend. A low-spend account drowns in fifty assets; a scaling one starves on five. We set volume against the number of tests the budget can actually resolve.",
      },
      {
        q: "Do you shoot, or only edit?",
        a: "Both — production, creator-led shoots and studio work, plus editing and versioning of footage you already own. Most brands have more usable material than they think.",
      },
      {
        q: "Will the ads still look like our brand?",
        a: "Yes. Performance creative that ignores the brand buys a customer once. The constraint is that it also has to earn attention in three seconds, which shapes the work — but it does not mean abandoning how you look and sound.",
      },
      {
        q: "Who owns the assets?",
        a: "You do, including creator usage where we have arranged it. Files, project files and rights are handed over as part of the engagement.",
      },
      {
        q: "Can you work alongside our in-house team?",
        a: "That often works well. We hold strategy and the testing brief, your team takes volume production, and the feedback loop runs through one shared system.",
      },
      {
        q: "How do you decide what to test next?",
        a: "From the previous round. Every result is read at the angle level rather than the asset level, so a win tells us which belief to push harder and a loss tells us which objection is not landing. The next brief is written from those two things.",
      },
    ],
  },

  {
    id: "commerce-shopify",
    primary: true,
    problem: {
      intro:
        "The store is where media spend becomes revenue or evaporates, and it is usually the part nobody owns. Traffic arrives carrying an expectation the ad created, and the page answers a different question. None of it is visible in the ad account, which is where everybody looks first and where none of the evidence lives.",
      pains: [
        "A product page that lists features and answers no objection.",
        "A checkout losing people the campaign has already paid for.",
        "A three-second load on the phone most of your traffic actually uses.",
      ],
    },
    connectsNote:
      "Commerce receives everything media buys and hands the buyer to retention, so a single point of conversion rate improves every channel upstream at once.",
    fit: {
      intro:
        "The right engagement when traffic arrives and does not convert, or when nobody can say where visits are being lost. It suits Shopify brands with enough traffic for a test to resolve. Most engagements begin with a diagnosis rather than a redesign.",
      notFor:
        "It is the wrong fit if the store has almost no traffic. Conversion work needs volume to learn from, and at low traffic the honest answer is to fix acquisition first. We would rather say that than bill for tests which can never reach significance.",
    },
    number: "03",
    title: "Shopify & Web Experiences",
    slug: "/services/shopify",
    promise: "A store that finishes what the ad started.",
    headline: "A point of conversion rate is worth more than a better bid.",
    summary:
      "Shopify stores, brand websites and landing pages built around a clear customer journey: fast pages, useful product detail, connected enquiry forms and an easier checkout.",
    intro:
      "The store is where media spend becomes revenue or evaporates. A point of conversion rate is worth more than most bidding changes, and it compounds across every channel at once. We treat the storefront as growth infrastructure — instrumented, and iterated rather than redesigned every two years.",
    capabilities: [
      "Shopify design",
      "Shopify development",
      "Brand websites",
      "Lead capture & forms",
      "PDP optimisation",
      "Conversion rate optimisation",
      "Landing pages",
      "Analytics implementation",
      "Third-party integrations",
    ],
    deliverables: [
      {
        title: "Brand websites & lead capture",
        description: "Responsive business websites with a clear story, focused landing pages and enquiry forms connected to your follow-up workflow.",
      },
      {
        title: "Storefront design and build",
        description:
          "Theme design and development on Shopify, built for speed on a mid-range Android over mobile data — which is where most of your traffic actually is.",
      },
      {
        title: "Product page system",
        description:
          "A PDP structure that answers the question the customer arrived with: what it is, why this one, and what happens if it is wrong. Built as a reusable system, not a one-off page.",
      },
      {
        title: "Landing pages",
        description:
          "Campaign and offer pages that match the ad that sent the visit, so message and page do not have to be reconciled by the customer.",
      },
      {
        title: "Conversion programme",
        description:
          "A prioritised backlog of tests aimed at the specific steps where the funnel leaks, with results held to a standard of evidence rather than a screenshot.",
      },
      {
        title: "Analytics and event tracking",
        description:
          "Correct, deduplicated events across the storefront, so every downstream decision rests on data that is actually right.",
      },
      {
        title: "Integrations",
        description:
          "Reviews, subscriptions, shipping, ERP and lifecycle tools connected properly, with the data they produce made available to the rest of the system.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Diagnose",
        description:
          "Session recordings, funnel data and a technical audit together. We find where visits die before proposing anything.",
      },
      {
        step: "02",
        title: "Structure",
        description:
          "Information architecture and page structure are settled before visual design. Most conversion problems are structure problems wearing a design costume.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Design and development run in parallel with tracking, so nothing ships that we cannot measure.",
      },
      {
        step: "04",
        title: "Instrument",
        description:
          "Events, funnels and dashboards are verified against real sessions before launch. Tracking is checked, not assumed.",
      },
      {
        step: "05",
        title: "Iterate",
        description:
          "A standing test cadence against the biggest remaining leak, so the store improves every month rather than every redesign.",
      },
    ],
    connectsTo: ["d2c-growth", "data-optimisation", "automation-ai", "speed-optimization"],
    faq: [
      {
        q: "Do you only work on Shopify?",
        a: "It is where we do our best work and where most D2C brands should be. If your requirements point somewhere else, we will say so plainly.",
      },
      {
        q: "Do we need a full redesign?",
        a: "Usually not. Most stores gain more from fixing the product page, the speed and the tracking than from a new look. We will tell you when a rebuild is genuinely the cheaper path.",
      },
      {
        q: "How do you decide what to test?",
        a: "By where the funnel actually leaks, sized by how much traffic passes through that step. A test on a page nobody reaches cannot pay for itself.",
      },
      {
        q: "Will the site be fast?",
        a: "Speed is a build constraint, not a later optimisation. We budget for it during development and measure on mid-range devices rather than on a laptop over office wifi.",
      },
      {
        q: "Can you work with our existing developer?",
        a: "Yes. We can own the build, or hold strategy and testing while your developer implements.",
      },
      {
        q: "Will this slow the site down?",
        a: "It should do the opposite. Most of the conversion work we do removes apps and scripts rather than adding them, and speed is treated as a build constraint rather than as something to fix afterwards.",
      },
    ],
  },

  {
    id: "seo-organic",
    primary: true,
    problem: {
      intro:
        "Organic is the only channel that keeps returning after the spend stops, which is why it is the first thing cut and the last thing measured. Most stores are technically capable of ranking and structurally prevented from it. The gap is rarely effort — it is that nobody has decided which pages are supposed to win, so every page competes weakly for everything.",
      pains: [
        "Collection pages competing with each other for the same term.",
        "Content written for a keyword rather than for a question.",
        "Being invisible inside the AI answers that now sit above the results.",
      ],
    },
    connectsNote:
      "Organic compounds what the other pillars produce: the same content that answers a buyer's question ranks, gets cited in AI answers, and gives paid campaigns a better destination.",
    fit: {
      intro:
        "This suits brands with a real catalogue, a timeline measured in quarters, and a willingness to publish. It works best alongside paid, where the search data from each informs the other. It also assumes you are willing to be told when a term is not worth chasing.",
      notFor:
        "It is not the right engagement if you need results this quarter, or if the plan depends on ranking for terms your product does not genuinely serve. Both are ways of spending money slowly. Neither is a judgement about the business — it is a judgement about the timing.",
    },
    number: "04",
    title: "SEO & Organic",
    slug: "/services/seo",
    promise: "Demand you do not have to rent.",
    headline: "Organic is the part of the system that appreciates.",
    summary:
      "Technical, eCommerce and content SEO built for how search actually works now, including AI answers and generative results. Organic is the part of the system that keeps returning after the spend stops.",
    intro:
      "Paid media rents attention; organic owns it. We build it on the same foundation as everything else — a sound store, pages that deserve to rank, and content that answers what customers ask before buying. Results are answered now rather than listed, so the work includes being citable.",
    capabilities: [
      "Technical SEO",
      "eCommerce SEO",
      "Content SEO",
      "AI SEO",
      "Generative engine optimisation (GEO)",
      "Answer engine optimisation (AEO)",
    ],
    deliverables: [
      {
        title: "Technical foundation",
        description:
          "Crawlability, indexation, site architecture, structured data and Core Web Vitals fixed at template level, so improvements apply across the whole catalogue.",
      },
      {
        title: "Category and product optimisation",
        description:
          "Collection and product pages structured around how people search for what you sell, rather than how your catalogue happens to be organised internally.",
      },
      {
        title: "Content plan",
        description:
          "Topics mapped to real purchase questions and search demand, prioritised by how close they sit to a decision.",
      },
      {
        title: "Structured data",
        description:
          "Product, review, FAQ and organisation markup implemented accurately — describing what is genuinely there, never inflating it.",
      },
      {
        title: "AI and answer visibility",
        description:
          "Content structured to be quoted by AI answers and answer engines: clear claims, clean structure, and sources a machine can attribute.",
      },
      {
        title: "Reporting",
        description:
          "Visibility, non-brand traffic and the revenue attached to it, separated from branded search so the number means something.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Crawl",
        description:
          "A full technical crawl alongside the current visibility picture, separating what is broken from what simply has not been built yet.",
      },
      {
        step: "02",
        title: "Repair",
        description:
          "Technical issues first. Content published on a broken foundation is expensive and slow to work.",
      },
      {
        step: "03",
        title: "Map",
        description:
          "Search demand mapped to your catalogue and to the questions customers ask before buying, clustered into pages worth owning.",
      },
      {
        step: "04",
        title: "Publish",
        description:
          "Content produced against that map and marked up so both search engines and AI systems can read it accurately.",
      },
      {
        step: "05",
        title: "Compound",
        description:
          "Existing pages are improved on a cadence. Organic rewards maintenance more than it rewards launches.",
      },
    ],
    connectsTo: ["creative-content", "commerce-shopify", "data-optimisation", "speed-optimization"],
    faq: [
      {
        q: "How long does SEO take?",
        a: "Technical fixes can show within weeks. Content and authority are measured in quarters. We will tell you before starting whether your timeline and your goal are compatible.",
      },
      {
        q: "Is SEO still worth it now that AI answers questions directly?",
        a: "The mechanics changed; the principle did not. Being the source an answer is built from still sends qualified people to you — it just requires clearer structure and genuine substance rather than keyword volume.",
      },
      {
        q: "Do you write the content?",
        a: "Yes, with your input on product truth and category expertise. Content about a product nobody at the agency has handled is obvious to a reader and to a search engine.",
      },
      {
        q: "Will you guarantee rankings?",
        a: "No. Anyone who does is either misleading you or targeting terms nobody searches for.",
      },
      {
        q: "How does this connect to paid?",
        a: "Directly. Search query data shows what demand looks like in customers' own language, and organic pages give paid campaigns better destinations. Run separately, the two duplicate each other's costs.",
      },
      {
        q: "How does this work with a Shopify theme we already have?",
        a: "Most technical work happens at the template level, so fixes apply across the whole catalogue rather than page by page. Where the theme itself is the constraint we will say so and scope that separately, rather than working around it indefinitely.",
      },
    ],
  },

  {
    id: "automation-ai",
    primary: true,
    problem: {
      intro:
        "Everything that works at fifty orders a day breaks at five hundred, and the team absorbs the difference by hand until it cannot. The failure is quiet — nothing errors, things simply take longer and start getting missed. By the time it is obvious it has already taken a standing quarter of somebody's week.",
      pains: [
        "A lead waiting overnight because the routing is a person.",
        "A follow-up that depends on someone remembering.",
        "A weekly report assembled by hand from four dashboards.",
      ],
    },
    connectsNote:
      "Automation is the connective tissue: it moves the data commerce generates into the tools media and retention run on, without anyone assembling it by hand.",
    fit: {
      intro:
        "The right engagement when the team is absorbing work that should not be manual: routing leads, chasing follow-ups, assembling reports by hand. The strongest candidates can already name the three tasks they most resent doing every week.",
      notFor:
        "It is the wrong fit if the underlying process is not agreed yet. Automating a workflow nobody has settled produces a faster version of the same disagreement.",
    },
    number: "05",
    title: "Automation & AI",
    slug: "/services/automation",
    promise: "The system keeps running when nobody is watching.",
    headline: "What breaks at five hundred orders a day was fine at fifty.",
    summary:
      "Lifecycle, operations and reporting automated with n8n, WhatsApp and CRM workflows — the work that quietly holds a growing brand together, built as infrastructure rather than as a stack of disconnected apps.",
    intro:
      "Every growing D2C brand hits the same wall: what worked at fifty orders a day breaks at five hundred. Automation is how the system keeps its shape while it scales. We build the flows that recover carts, bring buyers back, route questions and produce reporting without anyone assembling a spreadsheet.",
    capabilities: [
      "AI workflows",
      "n8n automation",
      "WhatsApp automation",
      "CRM automation",
      "AI agents",
      "Reporting automation",
    ],
    deliverables: [
      {
        title: "Lifecycle flows",
        description:
          "Abandoned cart, browse abandonment, post-purchase, replenishment and win-back, written to be worth receiving rather than merely sent.",
      },
      {
        title: "WhatsApp automation",
        description:
          "Conversational flows on the channel Indian D2C customers actually open, built inside the platform's policy rather than around it.",
      },
      {
        title: "CRM and data plumbing",
        description:
          "Customer, order and event data moving reliably between store, ads, support and analytics, so every tool sees the same customer.",
      },
      {
        title: "Internal operations",
        description:
          "Automations for the work that quietly consumes a team's week: order exceptions, stock alerts, brief routing, approval chains.",
      },
      {
        title: "Reporting automation",
        description:
          "Scheduled, verified reporting assembled from source data, so meetings start from one set of numbers instead of three versions of them.",
      },
      {
        title: "AI-assisted workflows",
        description:
          "Applied where it earns its place — drafting, classification, summarisation, triage — with a person accountable for anything customer-facing.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Map",
        description:
          "We document how work actually flows today, including the manual steps nobody wrote down. Automating a broken process only makes it fail faster.",
      },
      {
        step: "02",
        title: "Prioritise",
        description:
          "Flows are ranked by hours returned and revenue touched. Abandoned cart and post-purchase usually come first, because they are closest to money already in motion.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Workflows built in n8n and the platforms you already run, with error handling and alerting, so a silent failure cannot run for a month unnoticed.",
      },
      {
        step: "04",
        title: "Verify",
        description:
          "Every flow is tested against real records and edge cases before it touches a customer.",
      },
      {
        step: "05",
        title: "Maintain",
        description:
          "Flows are monitored and revised as the catalogue, the tools and the team change. Automation is infrastructure, and infrastructure needs an owner.",
      },
    ],
    connectsTo: ["commerce-shopify", "data-optimisation", "creative-content"],
    faq: [
      {
        q: "Is this just email marketing?",
        a: "Email is one channel inside it. The larger part is the data and operational plumbing that makes any channel work — and increasingly WhatsApp, which most Indian D2C brands under-use.",
      },
      {
        q: "Why n8n rather than an all-in-one marketing suite?",
        a: "Suites handle what they were designed for and stop. n8n connects anything with an API, so the automation matches your operation instead of your operation bending to fit a tool.",
      },
      {
        q: "Where does AI actually get used?",
        a: "Where the output is checkable: drafting variants, classifying tickets, summarising data, triaging inbound. We do not put an unattended model in front of a customer making promises on your behalf.",
      },
      {
        q: "Who maintains this afterwards?",
        a: "We do while we are engaged, and we hand over documented flows you own. Nothing is built inside an account only we can access.",
      },
      {
        q: "How much of our team's time does this take?",
        a: "Most of it sits at the mapping stage, where we need people who know how the work really happens. Build and maintenance are largely ours.",
      },
      {
        q: "What happens if a flow breaks?",
        a: "Every workflow ships with error handling and alerting, so a failure surfaces immediately instead of running silently for a month. While we are engaged we monitor and fix them, and the documentation is yours either way.",
      },
    ],
  },

  {
    id: "data-optimisation",
    primary: true,
    problem: {
      intro:
        "Measurement is the thing nobody wants to own and everybody relies on. When it is wrong the errors do not announce themselves — they surface months later, as a strategy built on a number that was never real. Everything downstream inherits the error, quietly and in the same direction.",
      pains: [
        "Events firing twice, so every conversion metric is inflated.",
        "Attribution windows nobody ever agreed on.",
        "An acquisition target with no relationship to margin.",
      ],
    },
    connectsNote:
      "Data is what makes every other pillar improvable: it decides which creative earned its budget, which store change worked, and what a customer is actually worth.",
    fit: {
      intro:
        "This suits brands where the numbers get argued about rather than acted on, or where a decision has been deferred because nobody trusts the reporting. It works best early, because everything downstream depends on it. It also suits teams willing to have a number they liked turn out to be wrong.",
      notFor:
        "It is not the right engagement if what is wanted is a prettier dashboard sitting on the same broken events. The fix is underneath, and it is far less visible than a dashboard.",
    },
    number: "06",
    title: "Data & Optimisation",
    slug: "/services/data",
    promise: "Decisions that rest on numbers you can defend.",
    headline: "Most growth arguments are really measurement arguments.",
    summary:
      "GA4, GTM, attribution and experimentation set up so the reporting is trustworthy and the arguments stop. Measurement is not a dashboard — it is what makes every other pillar improvable.",
    intro:
      "Most growth arguments are actually measurement arguments. The platform says one number, the store says another, and the decision gets made on whichever supports the preferred conclusion. We fix that first: correct event tracking, honest attribution, and what a customer is worth over time.",
    capabilities: [
      "GA4",
      "Google Tag Manager",
      "Attribution modelling",
      "Funnel analysis",
      "Experimentation programmes",
      "Lifetime value analysis",
      "Retention analysis",
    ],
    deliverables: [
      {
        title: "Tracking implementation",
        description:
          "GA4 and GTM implemented and validated, with server-side events and deduplication where the platforms require it — verified against real sessions, not assumed from a tag list.",
      },
      {
        title: "Attribution view",
        description:
          "A blended picture reconciling platform-reported numbers with what the business actually banked, stating plainly where attribution is estimate rather than fact.",
      },
      {
        title: "Funnel analysis",
        description:
          "Where visits die, quantified by step and segment, so conversion work is aimed at the largest leak rather than the most visible one.",
      },
      {
        title: "LTV and retention model",
        description:
          "What a customer is worth over time by cohort and product — which is what determines how much you can afford to pay to acquire one.",
      },
      {
        title: "Experiment programme",
        description:
          "A prioritised test backlog with success criteria agreed before the test runs, so results are read the same way whether or not they are flattering.",
      },
      {
        title: "Reporting layer",
        description:
          "One set of numbers everyone works from, with definitions written down so revenue means the same thing in every meeting.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "We check what is being tracked against what is actually happening, and document every gap and duplicate before touching a dashboard.",
      },
      {
        step: "02",
        title: "Rebuild",
        description:
          "Events, parameters and server-side collection implemented to a written specification and validated against live sessions.",
      },
      {
        step: "03",
        title: "Model",
        description:
          "Contribution margin, cohort LTV and payback period, so acquisition targets come from your business rather than from a benchmark article.",
      },
      {
        step: "04",
        title: "Instrument",
        description:
          "Reporting built around the decisions the team actually makes each week, not around every metric the tools can emit.",
      },
      {
        step: "05",
        title: "Experiment",
        description:
          "A running programme of tests with agreed criteria, feeding findings back into creative, media and the store.",
      },
    ],
    connectsTo: ["d2c-growth", "commerce-shopify", "automation-ai"],
    faq: [
      {
        q: "Why do the platform numbers never match Shopify?",
        a: "They count different things, over different attribution windows, and both are partly modelled. The fix is not forcing them to agree — it is knowing which to use for which decision, and keeping one blended view for the decisions that matter.",
      },
      {
        q: "Is attribution still reliable after the iOS changes?",
        a: "Deterministic attribution is weaker. The answer is a combination of server-side events, better first-party data and incrementality thinking — and being explicit about which numbers are measured and which are estimated.",
      },
      {
        q: "Do we need a data warehouse?",
        a: "Most brands at this stage do not. When order volume and tool count make reconciliation genuinely painful, we will say so — and not before.",
      },
      {
        q: "How do you decide a test won?",
        a: "Success criteria are written before the test runs. If a result is inconclusive we record it as inconclusive, rather than shipping it and calling it a win.",
      },
      {
        q: "What do we get each week?",
        a: "One report from one source, with the same definitions every time, focused on the decisions ahead rather than a recap of the past.",
      },
      {
        q: "How long before the reporting can be trusted?",
        a: "Tracking can usually be rebuilt and validated within a few weeks. Trusting it takes one full cycle of comparing what it reports against what the business actually banked — that comparison is the deliverable, not the dashboard.",
      },
    ],
  },
  {
    id: "performance",
    number: "01",
    title: "Performance Marketing",
    slug: "/services/performance",
    primary: false,
    parent: "d2c-growth",
    promise: "Paid channels that answer to the P&L.",
    headline: "Performance is a property of the system, not a skill with the buttons.",
    problem: {
      intro:
        "Almost every account we audit has the same three problems, and none of them is the bid. Spend is fragmented across campaigns that overlap, the creative that carried the account is months old, and the reporting cannot settle an argument.",
      pains: [
        "Budget split so thin that no campaign completes its learning.",
        "The same customer paid for twice, across two campaigns.",
        "A month of spend defended with a number nobody can reproduce.",
      ],
    },
    connectsNote:
      "Performance depends on creative to test and on commerce to convert, and hands data the raw material that shows which of the two is actually limiting growth.",
    fit: {
      intro:
        "The right engagement when meaningful spend is already running and the account has grown rather than been designed. Existing history is an advantage rather than an obstacle — the pixel, the audiences and the conversion data all carry forward.",
      notFor:
        "It is the wrong fit if creative and the store are out of scope entirely. Media can only be as good as what it points at, and we would rather say that upfront than take the retainer anyway.",
    },
    summary:
      "Meta and Google run against contribution margin rather than platform-reported return. Structure, creative supply and measurement are treated as one job, because a weakness in any of them surfaces as what looks like a bidding problem.",
    intro:
      "Performance marketing is usually sold as channel expertise — someone who knows where the buttons are. An account with clean structure, a creative pipeline that does not run dry, and measurement everyone trusts beats a better bidder without them. We run the channels and the conditions.",
    capabilities: [
      "Meta Ads",
      "Google Ads",
      "Campaign structure",
      "Bidding strategy",
      "Audience architecture",
      "Budget pacing",
      "Incrementality testing",
    ],
    deliverables: [
      { title: "Account restructure", description: "Campaigns consolidated so budget stops competing with itself and the learning phase can complete. Naming and exclusions rebuilt so the reporting means something afterwards." },
      { title: "Bidding and pacing plan", description: "A bid strategy matched to the objective and the conversion volume, with pacing rules that stop a weekend from spending a week of budget." },
      { title: "Testing calendar", description: "What is being tested, in what order, and what result would settle it. One variable at a time, so an outcome points at a decision rather than at a mood." },
      { title: "Profitability model", description: "Contribution margin per order after goods, shipping, discounts and returns, and the acquisition cost that model supports at each level of spend." },
      { title: "Weekly operating review", description: "One session against one set of numbers: what changed, what it cost, what we learned, and what happens next week." },
    ],
    process: [
      { step: "01", title: "Audit", description: "We read the account against the store and the margins together, documenting every place spend is duplicated, mistracked or unaccounted for." },
      { step: "02", title: "Rebuild", description: "Structure, audiences, exclusions and tracking are rebuilt to match how the business makes money rather than how the account happened to grow." },
      { step: "03", title: "Test", description: "Concepts and offers run against written win conditions, cut on schedule, with every result fed back into the creative brief." },
      { step: "04", title: "Scale", description: "Budget moves toward what survives contact with the P&L, against agreed pull-back thresholds rather than against nerve." },
    ],
    connectsTo: ["creative-content", "commerce-shopify", "data-optimisation", "meta-ads"],
    faq: [
      { q: "How is this different from the D2C Growth pillar?", a: "It is the media half of it, described on its own for people searching for performance marketing specifically. The work and the people are the same; D2C Growth is the wider engagement that also covers the store and the retention side." },
      { q: "Do you run Meta and Google, or just one?", a: "Both, and usually together. Meta creates demand and Google captures it. Run separately, brands routinely pay twice for the same customer and never find out." },
      { q: "What do you need from us to start?", a: "Access to the ad accounts, the store and the analytics, plus honest numbers on cost of goods, shipping and returns. Without the margin picture, any acquisition target is a guess." },
      { q: "How quickly can spend scale?", a: "As fast as creative supply and measurement allow, which is almost always the real constraint. Scaling faster than either produces a month that looks good and a quarter that does not." },
      {
        q: "Can you work with our existing creative team?",
        a: "Yes, and it often works well. We own the testing brief and the account, your team owns volume production, and results feed back through one shared document rather than through a monthly call.",
      },
      {
        q: "What reporting do we get?",
        a: "A weekly working session and one live view, with metric definitions written down so the same word means the same thing every week. Tests that failed are included, along with what they cost to learn.",
      },
    ],
  },
  {
    id: "social-media",
    number: "02",
    title: "Social Media",
    slug: "/services/social-media",
    primary: false,
    parent: "creative-content",
    promise: "A feed that earns attention between campaigns.",
    headline: "Organic social is where a brand proves it is a brand.",
    problem: {
      intro:
        "Most brand feeds are maintained rather than directed. Posting continues, the strategy behind it does not exist in writing, and nothing that works in the feed ever reaches the ad account. The account keeps moving and none of the effort compounds.",
      pains: [
        "A content calendar built around dates rather than around angles.",
        "Organic and paid briefed by different people from different documents.",
        "A format that performs organically and is never tested as an ad.",
      ],
    },
    connectsNote:
      "Social feeds the creative pipeline with angles already proven on a real audience, and gives paid media a brand that stands up when somebody checks.",
    fit: {
      intro:
        "This suits brands who want the feed to do something specific: support paid, prove the company is real, or generate angles worth testing. It works best with access to product, people and customers. It suits brands willing to hold a cadence for a quarter, because organic compounds slowly.",
      notFor:
        "It is not the right engagement if the goal is follower count on its own. Followers are not a business outcome, and we would be optimising for the wrong thing on purpose. The same budget spent on creative testing usually returns faster and teaches more, and we would rather say so than take it.",
    },
    summary:
      "Content strategy, production and publishing for the channels your customers already scroll. Built from the same creative strategy as the paid work, so the feed and the ads reinforce each other rather than argue.",
    intro:
      "Organic social is rarely the channel that closes the sale, and that is not what it is for. It is where somebody who saw an ad goes to decide whether the company behind it is real. Treated as part of the creative system it produces the angles that become ads.",
    capabilities: [
      "Content strategy",
      "Reels and short-form",
      "Community management",
      "Creator partnerships",
      "Publishing cadence",
      "Social reporting",
    ],
    deliverables: [
      { title: "Content strategy", description: "The angles, the audience and the reasons to follow, written down. Without it a calendar is scheduling rather than strategy." },
      { title: "Production cadence", description: "A repeatable weekly output the team can actually sustain, sized to the resources that exist rather than the ones a deck assumed." },
      { title: "Creator pipeline", description: "Sourcing, briefing and usage rights for creator-led work, arranged before anything runs rather than renegotiated after it performs." },
      { title: "Community handling", description: "Response guidelines and escalation paths, so comments and messages are answered consistently instead of whenever somebody notices." },
      { title: "Social reporting", description: "What earned attention and what did not, read at the angle level, feeding directly into the paid creative brief." },
    ],
    process: [
      { step: "01", title: "Strategy", description: "We define what the account is for, who it is talking to, and the handful of angles worth repeating. Everything produced afterwards is made against one of them." },
      { step: "02", title: "Produce", description: "Shooting and editing in native vertical formats on a cadence the team can hold, working from a backlog rather than from a scramble." },
      { step: "03", title: "Publish", description: "A consistent rhythm with community handling attached, so the account behaves like a channel rather than a noticeboard." },
      { step: "04", title: "Feed back", description: "Angles that earn attention organically are handed to the paid creative brief as tested hypotheses rather than as guesses." },
    ],
    connectsTo: ["creative-content", "d2c-growth", "seo-organic"],
    faq: [
      { q: "Is organic social worth it if we are mostly paid?", a: "Yes, for one specific reason: people check. Somebody who sees an ad and finds an abandoned feed hesitates. It also produces angles you can test in paid, which is usually where its return actually shows up." },
      { q: "How often will you post?", a: "A cadence the strategy and the resources can sustain indefinitely, agreed before we start. A month of daily posting followed by silence is worse than a steady twice a week." },
      { q: "Do you handle comments and messages?", a: "Community handling can be included, with response guidelines and escalation paths agreed with you. Anything that becomes a customer service issue routes to your team." },
      { q: "Who appears in the content?", a: "Founders, team, customers or creators, depending on what the strategy calls for. We will say plainly if an angle needs a face and there is not one available." },
      {
        q: "Do we need to appear on camera?",
        a: "Not necessarily, though founder-led content usually outperforms when the founder is willing. Where that is not an option we build around product, customers and creators instead, and we will be honest about the trade-off.",
      },
      {
        q: "Which platforms do you cover?",
        a: "Whichever ones your customers actually use, which for most D2C brands means Instagram first and short-form video everywhere. We would rather run two channels properly than five badly.",
      },
    ],
  },
  {
    id: "web-development",
    number: "03",
    title: "Websites & Landing Pages",
    slug: "/services/web-development",
    primary: false,
    parent: "commerce-shopify",
    promise: "A site that loads fast and knows what it wants the visitor to do.",
    headline: "A website is a sales conversation that has to work without you in the room.",
    problem: {
      intro:
        "Most business websites were built to exist rather than to convert. They look acceptable on a laptop, slow down on a phone, and leave a visitor from a paid ad hunting for the one button that matters.",
      pains: [
        "An ad that promises one thing and a page that opens on something else.",
        "A mobile layout that was checked once, on one phone, before launch.",
        "Enquiries that arrive in an inbox nobody is watching closely.",
      ],
    },
    connectsNote:
      "Landing pages give paid media somewhere worth sending traffic, and every form on them feeds the automation that follows up within minutes rather than days.",
    fit: {
      intro:
        "Right for service businesses, educators, clinics, consultants and brands who need a fast marketing site or campaign pages that match their ads. It works best when there is a clear offer and someone who can sign off copy quickly.",
      notFor:
        "If you need a complex web application with user accounts, payments logic and custom back-end systems, a product engineering team is the better partner. We will point you towards one rather than stretch the scope.",
    },
    summary:
      "Fast marketing websites and campaign landing pages built around one job each. Clear structure, honest copy, mobile-first layouts and forms wired to the follow-up, so the click you paid for has somewhere useful to land.",
    intro:
      "We design and build marketing websites and landing pages for businesses that run ads, take enquiries or sell online. Every page is planned around a single action, written to match the traffic it receives, and measured from launch.",
    capabilities: [
      "Website design",
      "Landing pages",
      "Next.js and WordPress builds",
      "Page speed",
      "Lead forms and tracking",
      "Copywriting",
    ],
    deliverables: [
      { title: "Site map and page plan", description: "What each page is for, who arrives on it and what we want them to do next, agreed before a single screen is designed." },
      { title: "Mobile-first design", description: "Layouts drawn for the phone first and the desktop second, because that is the order most of your visitors arrive in." },
      { title: "Campaign landing pages", description: "Pages matched to specific ads and offers, so the headline a visitor clicked is the headline they land on." },
      { title: "Speed and technical setup", description: "Image handling, caching, metadata and accessibility basics done properly, so the site stays quick as content is added." },
      { title: "Forms wired to follow-up", description: "Every enquiry routed to a sheet, a CRM or WhatsApp with tracking events attached, so no lead waits on someone checking an inbox." },
    ],
    process: [
      { step: "01", title: "Plan", description: "We agree the audience, the offer and the single most important action for every page before any design work begins." },
      { step: "02", title: "Design", description: "Wireframes first, then full visual design on mobile and desktop, reviewed together so feedback is specific rather than general." },
      { step: "03", title: "Build", description: "A clean build with speed, tracking and forms tested on real devices, then a staged launch with nothing left switched to placeholder." },
      { step: "04", title: "Improve", description: "We watch how visitors actually use the pages and adjust headlines, sections and forms against what the data shows." },
    ],
    connectsTo: ["commerce-shopify", "performance", "automation-ai", "speed-optimization"],
    faq: [
      { q: "Do you build on Shopify, WordPress or custom code?", a: "Whichever suits the job. Stores usually belong on Shopify, content-heavy marketing sites often suit WordPress, and fast campaign or brand sites are frequently built in Next.js. We recommend one and explain why." },
      { q: "Can you just build landing pages for our ads?", a: "Yes. Campaign pages are one of the most common starting points, and they are where the gap between an ad and a sale is easiest to close." },
      { q: "Will we be able to edit the site ourselves?", a: "Yes. We set up the editing your team needs for everyday changes and hand over a short guide, so routine updates never wait on us." },
      { q: "Who writes the copy?", a: "We can write it, or work from yours. Either way the copy is planned alongside the design rather than poured into boxes afterwards." },
    ],
  },
  {
    id: "lead-generation",
    number: "01",
    title: "Lead Generation & Funnels",
    slug: "/services/lead-generation",
    primary: false,
    parent: "d2c-growth",
    promise: "Enquiries that arrive qualified and get answered quickly.",
    headline: "A lead is only worth what happens in the first hour after it arrives.",
    problem: {
      intro:
        "Most lead generation is measured at the form. The cost per lead looks fine, the sales team says the leads are poor, and nobody can say which campaign produced the customers who actually paid.",
      pains: [
        "Cheap leads that never pick up the phone.",
        "Webinar and course registrations with no follow-up after the reminder.",
        "A spreadsheet of enquiries that is days old before anyone opens it.",
      ],
    },
    connectsNote:
      "Lead funnels depend on ads to bring the right people, on landing pages to qualify them and on automation to answer them while the interest is still warm.",
    fit: {
      intro:
        "Right for coaches, educators, course creators, clinics, real estate, B2B services and any business where a conversation comes before the sale. It works best when someone on your side can respond to leads on the same day.",
      notFor:
        "If there is nobody to call or message the leads, more volume will only create a longer list of people who were never contacted. We would rather fix the follow-up first.",
    },
    summary:
      "Meta and Google lead campaigns, course and webinar funnels, qualifying landing pages and instant follow-up on WhatsApp and email. Judged on booked calls and paying customers, not just on form fills.",
    intro:
      "We plan lead generation from the sale backwards. What makes a good lead, what they need to hear before they talk to you, and how quickly they hear from you. Then we build the ads, pages and follow-up around those answers.",
    capabilities: [
      "Lead ads",
      "Course and webinar funnels",
      "Qualifying forms",
      "WhatsApp follow-up",
      "CRM pipelines",
      "Call booking",
    ],
    deliverables: [
      { title: "Offer and audience plan", description: "Who the ideal lead is, what will make them raise their hand, and what we deliberately filter out with the form and the copy." },
      { title: "Lead campaigns", description: "Meta lead forms or website conversion campaigns with Google search where intent exists, structured so spend follows the leads that convert." },
      { title: "Funnel pages", description: "Registration, booking and thank-you pages for webinars, workshops, courses and consultations, each with a clear next step." },
      { title: "Instant follow-up", description: "WhatsApp, email and SMS sequences that confirm, remind and re-engage, so a registration does not quietly turn into a no-show." },
      { title: "Lead quality loop", description: "Outcomes from your sales team fed back into the ad platforms, so campaigns learn which leads became customers." },
    ],
    process: [
      { step: "01", title: "Define", description: "We agree what a qualified lead looks like and what a sale is worth, so every later decision has a target to aim at." },
      { step: "02", title: "Build", description: "Campaigns, pages, forms and follow-up are built together and tested end to end before any meaningful budget goes live." },
      { step: "03", title: "Launch", description: "Spend starts small, lead quality is checked daily with your team, and anything that brings the wrong people is cut early." },
      { step: "04", title: "Scale", description: "Budget moves towards the sources that produce booked calls and customers, not towards whichever form is cheapest to fill." },
    ],
    connectsTo: ["performance", "web-development", "automation-ai"],
    faq: [
      { q: "Do you work with non-D2C businesses?", a: "Yes. Lead generation is the main way we work with educators, consultants, clinics and service businesses. The thinking is the same: understand the customer, remove friction and measure what actually turns into revenue." },
      { q: "Can you run webinar and course launches?", a: "Yes. We build the registration pages, the ads, the reminder sequence and the replay or offer follow-up, and we plan the launch calendar with you." },
      { q: "How do you improve lead quality?", a: "Better qualifying questions, clearer copy about who the offer is for, and feeding sales outcomes back to the ad platforms so they optimise for customers rather than form fills." },
      { q: "Do we need a CRM?", a: "Not on day one. A well-organised sheet with WhatsApp follow-up works for many teams, and we can set up a proper CRM when the volume justifies it." },
    ],
  },
  {
    id: "brand-design",
    number: "02",
    title: "Brand Identity & Design",
    slug: "/services/branding",
    primary: false,
    parent: "creative-content",
    promise: "A brand people recognise before they read the name.",
    headline: "Consistency is what makes a small brand look established.",
    problem: {
      intro:
        "Many growing brands look like several different companies depending on where you meet them. The logo changes weight, the colours drift, and every new post or packaging run is designed from scratch.",
      pains: [
        "A logo that was made quickly and never quite fit.",
        "Ads, website and packaging that do not look related.",
        "Every designer reinventing the look because nothing is written down.",
      ],
    },
    connectsNote:
      "A clear identity makes every ad, post and page faster to produce and easier to recognise, which is where creative volume starts to pay off.",
    fit: {
      intro:
        "Right for new brands preparing to launch, and for growing brands whose look has drifted across channels. It works best when the founder is involved in the early direction and willing to commit to a system afterwards.",
      notFor:
        "If the goal is a logo by the end of the week with no wider system, a freelance designer will be quicker and cheaper. Our work is the identity and the rules that keep it consistent.",
    },
    summary:
      "Logo, colour, type, packaging and the visual system behind your ads, website and social feed. Designed to be recognisable at thumbnail size and simple for any designer to apply consistently.",
    intro:
      "We build brand identities for D2C and growing businesses that need to look credible fast and stay consistent as they scale. The output is not just a logo but a working kit your team and partners can use every day.",
    capabilities: [
      "Logo and identity",
      "Colour and typography",
      "Packaging design",
      "Brand guidelines",
      "Social templates",
      "Ad design system",
    ],
    deliverables: [
      { title: "Brand direction", description: "Positioning, personality and the visual references that set the tone, agreed before we design anything final." },
      { title: "Identity system", description: "Logo suite, colour palette, typography and graphic elements, tested at the sizes they will really be seen at." },
      { title: "Packaging and print", description: "Labels, boxes, inserts and print collateral designed to the same system and prepared for your printer." },
      { title: "Brand guidelines", description: "A practical guide showing what to do and what to avoid, written for the designers and agencies who come after us." },
      { title: "Template kit", description: "Editable social, ad and presentation templates, so day-to-day content stays on brand without starting from a blank canvas." },
    ],
    process: [
      { step: "01", title: "Discover", description: "We study your customers, competitors and category so the identity stands apart for a reason rather than by accident." },
      { step: "02", title: "Explore", description: "Two or three distinct directions are presented with real applications, so you are choosing a world rather than a logo in isolation." },
      { step: "03", title: "Refine", description: "The chosen direction is developed into a complete system and tested across ads, packaging, the website and the feed." },
      { step: "04", title: "Hand over", description: "Final files, guidelines and templates are delivered and walked through with your team, so the system is used rather than archived." },
    ],
    connectsTo: ["creative-content", "social-media", "web-development"],
    faq: [
      { q: "Can you refresh our existing brand instead of starting over?", a: "Yes. Often the right answer is to keep what customers already recognise and tighten everything around it. We will recommend a refresh or a rebuild after the discovery stage." },
      { q: "Do you design packaging?", a: "Yes, including labels, boxes and inserts, prepared to the specifications your printer needs." },
      { q: "How many logo options will we see?", a: "Two or three considered directions, each shown in use. More options usually means less thinking behind each one." },
      { q: "Do we own the final files?", a: "Yes. On final payment you receive all source files and full ownership of the identity we create for you." },
    ],
  },
  {
    "id": "meta-ads",
    "number": "06",
    "title": "Meta Ads",
    "heading": "Meta Ads, run like a P&L line.",
    "slug": "/services/meta-ads",
    "primary": false,
    "parent": "d2c-growth",
    "quotesFees": true,
    "promise": "Spend that answers to margin, not to the dashboard.",
    "headline": "One channel, treated as a business unit, not a traffic tap.",
    "summary": "Most Meta ad accounts are not underperforming. They are mismeasured, misstructured and starved of creative. We rebuild the account around your contribution margin, install a creative testing system that never runs dry, and manage spend in weekly sprints against numbers everyone trusts.",
    "intro": "Meta is the channel that creates demand for most D2C brands, which is exactly why it deserves its own owner. We run it as a business unit: a structure that matches how you make money, creative that is always in test, and reporting that agrees with the bank.",
    "problem": {
      "intro": "Almost every Meta ad account we audit in India fails in the same three places, and the bidding is never the real problem. The account grew by accident, with campaigns stacked on campaigns, audiences overlapping and exclusions missing. The creative that once carried it is six months old. And the ROAS number everyone argues about cannot be reconciled with what the business actually banked.",
      "pains": [
        "Budget split across eleven campaigns so thin that nothing ever exits learning. You are paying tuition forever and graduating never.",
        "The same buyer acquired three times, once by prospecting, once by retargeting and once by a lookalike, because nobody excluded anyone from anything.",
        "A strong-looking ROAS month that the bank statement does not recognise, once COD, returns, shipping and discounts are counted."
      ]
    },
    "connectsNote": "Meta Ads depends on creative to test and on the store to convert, and hands automation the WhatsApp and retention flows that close the loop.",
    "fit": {
      "intro": "You are a D2C or ecommerce brand already spending, or ready to spend, real money on Meta, and you suspect the account is leaving margin on the table. You want one team accountable to the P&L, not a dashboard. You are willing to feed the creative machine and to hear uncomfortable truths from the audit.",
      "notFor": "If your monthly ad budget is under roughly ₹1 lakh, a full management retainer is usually the wrong spend, so start with an audit. If you want someone to just run the ads while creative and the store stay frozen, we will decline politely: media can only be as good as what it points at. If Google Ads is your primary channel, our Performance Marketing page describes the combined engagement."
    },
    "capabilities": [
      "Meta Ads audit",
      "Facebook & Instagram management",
      "Creative testing",
      "Campaign structure",
      "Advantage+",
      "Click-to-WhatsApp ads",
      "Retargeting",
      "Scaling systems"
    ],
    "sections": [
      {
        "placement": "before-scope",
        "label": "META ADS IN INDIA",
        "title": "Same platform.",
        "accent": "Different game.",
        "intro": "Meta's auction works the same everywhere; the buyer does not. Running Meta ads for Indian D2C brands means building for realities most playbooks ignore.",
        "items": [
          {
            "title": "Cash on delivery changes the math",
            "body": "A purchase event is not revenue until the courier returns, or does not. We optimise toward confirmed, delivered orders where the data allows, and we treat COD-heavy categories with the scepticism they deserve: a 3% conversion rate means nothing if a third of it comes back."
          },
          {
            "title": "WhatsApp is a channel, not a chat bubble",
            "body": "For high-consideration products and Tier 2 and 3 audiences, the fastest path from ad to order often skips the website entirely. Click-to-WhatsApp campaigns, paired with a proper qualification flow, regularly outperform landing pages where trust is built in conversation. We build the ad-to-chat journey as one system, not as an afterthought."
          },
          {
            "title": "Festive season is its own economy",
            "body": "Diwali, wedding season and end-of-season sales create predictable demand spikes and CPM surges. Accounts that scale in October were built in July: creative banked early, audiences warmed, budgets planned against the surge rather than reacting to it. An agency that meets festive season for the first time in festive season is already late."
          },
          {
            "title": "Language and creative travel further than targeting",
            "body": "A reel that speaks the buyer's idiom, with Hinglish hooks, regional festivals and price framing in rupees with EMI and COD made explicit, will beat a better-targeted generic asset. We brief creative from your reviews and your customers' actual words, because the auction rewards resonance and resonance is local."
          }
        ]
      },
      {
        "placement": "after-process",
        "label": "WHAT THE FIRST 90 DAYS LOOK LIKE",
        "title": "No surprises.",
        "accent": "Just a sequence.",
        "intro": "Four phases, each with a written output you approve before the next begins.",
        "items": [
          {
            "title": "Days 1 to 7: the audit",
            "body": "We read the account, the store and the margins, and hand you a written findings report: what is leaking, what is working so we protect it, and what the rebuild will change. You approve the plan before anything moves."
          },
          {
            "title": "Days 8 to 21: the rebuild",
            "body": "Structure consolidated, audiences and exclusions rebuilt, tracking rewired, creative pipeline installed. Spend continues throughout, because we rebuild around live campaigns, not instead of them."
          },
          {
            "title": "Days 22 to 60: the testing window",
            "body": "Concepts run against written win conditions and are cut on schedule. This is the noisiest phase and the most valuable one: the account starts telling the truth about hooks, offers and audiences. Expect clarity before profit, and a true acquisition cost before you scale it."
          },
          {
            "title": "Days 61 to 90: the scaling decision",
            "body": "With a tested creative bank and trusted numbers, budget moves toward what earned it. Some brands scale here; some discover the constraint is the offer or the store, and we say so with the numbers to prove it. Either way, the 90 days end with an account you understand."
          }
        ]
      }
    ],
    "deliverables": [
      {
        "title": "Account audit & rebuild",
        "description": "We read your entire Meta ad account against your store and your margins before touching a single setting: every campaign's real job, every audience overlap, every broken exclusion, every tracking gap between the pixel, the Conversions API and what your Shopify actually recorded. Then we rebuild, with a consolidated structure, clean naming, exclusions that mean something and a measurement setup where platform numbers and banked numbers finally agree. Tracking is checked against your Shopify store as part of the audit."
      },
      {
        "title": "Creative strategy & testing",
        "description": "Creative is the targeting now: on Meta, the asset does more work than the audience setting. We build a testing system, not a pile of ads. Concepts are written from your reviews, unboxings and objections, hooks are tested in the first three seconds, and winners are picked by contribution margin per creative, not by CTR. For D2C brands this usually means a weekly rhythm of new statics, reels and UGC-style creatives, produced with our Creative & Content team."
      },
      {
        "title": "Campaign management",
        "description": "Day-to-day ownership of the account: budget pacing so a festival weekend does not eat a month of spend, bid strategy matched to your actual conversion volume, Advantage+ shopping campaigns structured correctly instead of thrown together, and retargeting that pulls its weight instead of taking credit for sales that were happening anyway. We watch the account like operators, not reporters."
      },
      {
        "title": "Scaling & retention",
        "description": "Scaling is a sequence, not a switch: budget follows what survives contact with the P&L, against agreed pull-back thresholds. Because Meta rarely closes the loop alone in India, we connect it to retention: click-to-WhatsApp ads that drop high-intent buyers into a conversation, customer lists fed back as exclusions and seed audiences, and post-purchase flows that turn a first order into a second. WhatsApp flows after the chat starts are built with our Automation & AI team."
      },
      {
        "title": "Measurement you can defend",
        "description": "Pixel, Conversions API, UTM discipline and a weekly numbers review where metric definitions are written down, so ROAS, CAC and margin mean the same thing every week. Tests that failed are reported with what they cost to learn. If the numbers cannot settle an argument, the setup is wrong, and fixing the setup is part of the job."
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Audit (week 1)",
        "description": "We read the account, the store and the margins together, documenting every place spend is duplicated, mistracked or unaccounted for. You get a written findings report before we change anything, including the things that are working, so we do not break them."
      },
      {
        "step": "02",
        "title": "Rebuild (weeks 2 to 3)",
        "description": "Structure, audiences, exclusions, creative pipeline and tracking are rebuilt to match how the business makes money rather than how the account happened to grow."
      },
      {
        "step": "03",
        "title": "Test (weeks 4 to 8)",
        "description": "Concepts and offers run against written win conditions and are cut on schedule. This is where the account starts telling the truth about what your customer actually responds to."
      },
      {
        "step": "04",
        "title": "Scale (week 8 onward)",
        "description": "Weekly sprints continue: what changed, what it cost, what we learned, what happens next week. Scaling never outruns creative supply or measurement, the two constraints that break most scale attempts, so we manage them explicitly."
      }
    ],
    "pricing": {
      "label": "PRICING GUIDANCE",
      "title": "Honest numbers,",
      "accent": "in rupees.",
      "intro": "Meta ads management in India typically prices in one of two ways, and we will tell you on the first call which one fits you.",
      "items": [
        {
          "name": "One-time account audit & rebuild",
          "price": "₹25,000 to ₹50,000",
          "min": 25000,
          "max": 50000,
          "body": "Depends on account size and history. You keep the findings report and the rebuilt structure either way."
        },
        {
          "name": "Monthly management",
          "price": "₹35,000 to ₹90,000 a month",
          "min": 35000,
          "max": 90000,
          "body": "Or 10 to 15% of ad spend with a minimum floor, whichever the account size justifies. The fee follows the workload, and a ₹2L a month account and a ₹20L a month account are different jobs."
        },
        {
          "name": "Minimum ad spend",
          "price": "About ₹1.5 to 2 lakh a month",
          "body": "Roughly ₹5,000 to 7,000 a day. Below that, Meta's learning systems cannot do their job and you are mostly paying for reporting. We will say so and suggest an audit instead of a retainer."
        },
        {
          "name": "Creative production",
          "price": "Scoped separately",
          "body": "A weekly testing rhythm needs a real creative pipeline, and we will price it plainly rather than bury it. We show you the maths before you commit."
        }
      ],
      "outro": "No lock-ins beyond a sensible initial term: the first 90 days are where the rebuild and the testing system get installed. After that, the weekly numbers should be the reason you stay. If you are comparing agencies, ask each one what happens to your account, your data and your creative if you leave in month four. The honest ones answer in one sentence."
    },
    "connectsTo": [
      "performance",
      "creative-content",
      "d2c-growth",
      "automation-ai",
      "commerce-shopify"
    ],
    "faq": [
      {
        "q": "How much do Meta ads cost in India?",
        "a": "Two costs matter: what you pay Meta and what you pay whoever runs it. Ad spend itself is flexible. Most D2C brands we work with spend between ₹1.5 lakh and ₹20+ lakh per month, and meaningful testing starts around ₹5,000 to 7,000 per day. Our management fee is typically ₹35,000 to ₹90,000 per month or 10 to 15% of spend with a floor, and a one-time audit runs ₹25,000 to ₹50,000. The honest answer for your brand depends on your margins and your average order value, which is exactly what the free growth call establishes before anyone quotes you a number."
      },
      {
        "q": "Facebook ads vs Google ads: which is better for my brand?",
        "a": "They do different jobs. Meta (Facebook and Instagram) creates demand, putting your product in front of people who were not searching for it, which is why it scales D2C brands. Google captures demand by converting people already looking. Most growing brands need both, run together; run separately, brands routinely pay twice for the same customer without ever finding out. If you can only fund one channel to start, Meta is usually the right first bet for D2C, and our Performance Marketing page describes the combined setup."
      },
      {
        "q": "How long before we see results from Meta ads?",
        "a": "The rebuild and tracking cleanup takes two to three weeks. The testing phase then needs four to eight weeks of real spend before the account starts telling the truth about what works, and anyone promising scale in week one is selling you their learning budget as your strategy. What you should expect early is clarity: within the first month you will know where the account was leaking and what your true acquisition cost is. Profitable scaling typically follows in months two to three, gated by creative supply."
      },
      {
        "q": "Who owns the ad account?",
        "a": "You do, always. We work inside your Business Manager and ad account, and you retain full ownership of the account, the pixel data, the audiences and the creative. If we ever part ways, everything stays with you and keeps running. Any agency that insists on running your spend through its own account is building leverage, not partnership."
      },
      {
        "q": "What is the minimum budget to work with you?",
        "a": "For full monthly management, roughly ₹1.5 to 2 lakh per month in ad spend. Below that, Meta's systems cannot exit learning properly and most of the fee goes to reporting rather than growth. We will tell you that on the first call and suggest an audit plus lighter-touch guidance instead. The audit itself has no spend minimum and is often the highest-return first step."
      },
      {
        "q": "Do you only work with D2C and ecommerce brands?",
        "a": "D2C is our home ground, because it is where contribution-margin thinking matters most. We also run Meta ads for lead generation, clinics, educators and local services, where the mechanics change (lead forms, click-to-WhatsApp, call tracking) but the discipline does not. If your business can state a target cost per acquired customer, we can probably run it."
      },
      {
        "q": "Can you work with our in-house creative team?",
        "a": "Yes, and it often works well. We own the testing brief, the hypotheses and the account; your team owns volume production. Results feed back through one shared document rather than a monthly call, so every test, won or lost, improves the next brief. What does not work is creative by committee with no testing discipline. The system needs a single owner."
      },
      {
        "q": "Do you run click-to-WhatsApp ads?",
        "a": "Yes. For many Indian D2C and service brands, click-to-WhatsApp outperforms website campaigns, especially for high-consideration products, COD-heavy categories and Tier 2 and 3 audiences who prefer chatting to checking out. We build the ad-to-chat journey as one system: the ad, the opening message, the qualification flow and the handoff to your team or automation. See also our Automation page for what happens after the chat starts."
      },
      {
        "q": "Do you guarantee ROAS?",
        "a": "No, and you should be suspicious of anyone who does. A guaranteed ROAS is either set so low it means nothing, or it is being bought with brand searches and existing customers relabelled as performance. What we guarantee is the system: clean structure, honest measurement, a testing cadence that never stops, and weekly reporting where failed tests are shown with what they cost to learn. That is what compounds into profitable scale; a guaranteed number is what gets faked."
      },
      {
        "q": "How is this different from your Performance Marketing page?",
        "a": "That page describes Meta and Google run together as one system, the right setup for most scaling brands. This page is the Meta-only deep dive: the audit, the creative testing machine, Advantage+ structure, click-to-WhatsApp and the scaling sequence, described in full for brands looking specifically for Meta ads help. Same team, same margin-first discipline, different depth on the one channel."
      }
    ]
  },
  {
    "id": "speed-optimization",
    "number": "07",
    "title": "Speed Optimization",
    "slug": "/services/speed-optimization",
    "primary": false,
    "parent": "commerce-shopify",
    "quotesFees": true,
    "promise": "A slow site taxes every rupee you spend on ads. We find exactly what is slowing yours down, and fix it without touching your design.",
    "headline": "A speed project with us is not install a caching plugin and hope. It is a measured engagement: we diagnose your site the way Google measures it, fix what moves the numbers, and prove it on real visitor data.",
    "summary": "Website speed optimization for Shopify stores, WordPress sites and custom builds. Core Web Vitals fixes, image and script cleanup, and ongoing monitoring, done by the same team that runs performance marketing, so speed improvements show up where it matters: conversion rate and ad returns.",
    "intro": "Speed work is usually sold as a score. We treat it as revenue: the page has to open fast for a real visitor on a real phone, because that is who your ads are paying for.",
    "problem": {
      "intro": "Most websites are not slow because of one big thing. They are slow because of twenty small things: a hero image nobody compressed, three tracking scripts loading before the content, a theme pulling in fonts the page never uses, a slider plugin from 2019 still running on every page. Each one costs a fraction of a second. Together, they cost you customers. On a phone, which is where most of your visitors arrive, every extra second of load time pushes more people to leave before they ever see your offer. If you run Meta or Google ads, you are paying full price to send traffic to pages that half your visitors never wait for. Speed is not a technical nicety. It is a leak in your revenue, running every day you ignore it.",
      "pains": [
        "Paid traffic landing on pages that take five or more seconds to open on a phone.",
        "A PageSpeed score in the 40s that two different freelancers promised to fix and did not.",
        "Google's page experience quietly ranking faster competitors above you for the same keywords."
      ]
    },
    "connectsNote": "Speed work multiplies whatever sends traffic to your site: faster pages mean cheaper conversions for paid media, and Core Web Vitals feed into rankings.",
    "fit": {
      "intro": "You run a Shopify store, a WordPress site or a custom marketing site; you spend on ads and suspect the landing experience is leaking conversions; your PageSpeed scores are poor and you want them fixed properly rather than patched; or your developers are strong on features but speed keeps slipping down the priority list. It works best when someone on your side can approve changes and give us access to the site, the theme and the hosting.",
      "notFor": "If your site needs a full rebuild, because the theme or platform is fundamentally wrong for what you are trying to do, we will say so plainly. Polishing a broken foundation wastes your money and our time, so we will scope the rebuild honestly (see Websites & Landing Pages) rather than sell you optimization on top of rot. We would also rather not take on sites where we cannot get proper access: guessing from the outside produces guesses, not fixes."
    },
    "capabilities": [
      "Speed audits",
      "Core Web Vitals fixes",
      "Shopify optimization",
      "WordPress optimization",
      "Image & script cleanup",
      "Ongoing monitoring"
    ],
    "sections": [
      {
        "placement": "after-process",
        "label": "WHY US, SPECIFICALLY",
        "title": "Speed, ads and SEO.",
        "accent": "One conversation.",
        "intro": "Most speed freelancers hand you a better lab score and disappear. We are a performance marketing agency: we optimize speed because we have watched slow pages eat ad budgets from the inside.",
        "items": [
          {
            "title": "The team that spends your ad budget",
            "body": "The same team that fixes your Core Web Vitals understands what your landing pages need to do for paid traffic, and what Google needs to see for rankings. Speed, ads and SEO stop being three separate conversations and become one system."
          }
        ]
      }
    ],
    "deliverables": [
      {
        "title": "Website speed audit",
        "description": "A complete diagnosis of your site as it exists today. We measure your Core Web Vitals on real-user data, profile what loads on your key pages, and hand you a prioritized findings report: what is slow, why it is slow, and what fixing each item is worth. You can take this report to your own developer, or have us implement it. Either way, you will know exactly where you stand."
      },
      {
        "title": "Core Web Vitals fixes",
        "description": "Google judges your site on three measurements, and we fix all three. Largest Contentful Paint (LCP) is how quickly the main content appears, usually an image problem and sometimes a server problem. Interaction to Next Paint (INP) is how fast the page responds to a tap or click, usually heavy JavaScript. Cumulative Layout Shift (CLS) is whether the page jumps around while loading, usually images or embeds with no reserved space. We explain each fix in plain language first, and nothing we do changes how your site looks. These measurements feed rankings, which is where our SEO & Organic work picks up."
      },
      {
        "title": "Shopify speed optimization",
        "description": "Shopify stores have their own classic slowdowns: app bloat (every installed app adds JavaScript, even the ones you stopped using), oversized theme code, uncompressed product images and third-party scripts firing on every page. We audit your apps and theme, remove dead weight, compress and properly size your imagery, defer what can wait, and get collection and product pages loading the way a store should. Most stores gain their biggest wins from app cleanup alone. This sits alongside our Shopify & Web Experiences work."
      },
      {
        "title": "WordPress speed optimization",
        "description": "WordPress sites slow down differently: plugin sprawl, page builders generating heavy markup, unoptimized databases and hosting chosen for price rather than performance. We trim the plugin list to what earns its place, set up proper caching, optimize images and the database, and fix the theme-level issues that page builders leave behind. If your hosting is the bottleneck, we will tell you honestly and help you move."
      },
      {
        "title": "Ongoing speed monitoring",
        "description": "A site is fastest the day it is optimized, then slowly gets slower as new apps, images, campaigns and tracking are added. Monitoring keeps a weekly eye on your Core Web Vitals and load times, flags regressions before they cost you, and keeps the site fast as it grows. For stores running continuous ad spend, this is the difference between a one-time fix and a durable advantage."
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Measure",
        "description": "We run your site through real-user data (Chrome UX Report) and lab diagnostics, and establish your baseline: LCP, INP, CLS, and full load profiles for your homepage, top landing pages and checkout or lead forms. No work starts without numbers."
      },
      {
        "step": "02",
        "title": "Prioritize",
        "description": "Not every fix is worth doing. We rank every finding by impact versus effort, so the work that moves revenue happens first and the nice-to-haves wait their turn. You approve the plan before we touch anything."
      },
      {
        "step": "03",
        "title": "Fix",
        "description": "We implement in order of priority: images, scripts, caching, theme and app cleanup, server-level improvements where needed. Changes go live in stages, and we check the numbers after each stage so we know what worked."
      },
      {
        "step": "04",
        "title": "Prove",
        "description": "We re-measure on the same real-user data, show you the before and after, and hand over a maintenance checklist so the gains stick. If you are on monitoring, this becomes a continuous loop."
      }
    ],
    "pricing": {
      "label": "PRICING",
      "title": "Honest numbers,",
      "accent": "in rupees.",
      "intro": "Speed work is priced by the size and platform of your site, not by the hour, so you always know what you are buying.",
      "items": [
        {
          "name": "Speed audit",
          "price": "₹15,000 to ₹25,000, one time",
          "min": 15000,
          "max": 25000,
          "body": "The full diagnosis: real-user Core Web Vitals, a page-by-page load profile and a prioritized fix list with expected impact. Yours to keep, whether we implement or your own team does."
        },
        {
          "name": "One-time optimization",
          "price": "₹35,000 to ₹80,000",
          "min": 35000,
          "max": 80000,
          "body": "The audit plus implementation, for a typical Shopify store or WordPress site. Larger catalogues, custom builds and multilingual sites sit at the higher end; we quote exactly after the audit, so there are no surprises."
        },
        {
          "name": "Ongoing monitoring",
          "price": "₹15,000 to ₹30,000 a month",
          "min": 15000,
          "max": 30000,
          "body": "Weekly Core Web Vitals tracking, regression alerts and continuous small improvements as your site changes. Built for stores and businesses running ads month after month, where a slow week directly costs revenue."
        }
      ],
      "outro": "Every engagement starts with the audit. If the audit shows your site is already in good shape, we will tell you, and you will have paid for certainty, not for work you did not need."
    },
    "connectsTo": [
      "performance",
      "seo-organic",
      "web-development",
      "commerce-shopify"
    ],
    "faq": [
      {
        "q": "What are Core Web Vitals?",
        "a": "Core Web Vitals are the three measurements Google uses to judge how a page feels to a real visitor. Largest Contentful Paint (LCP) is how fast the main content appears, and the target is under 2.5 seconds. Interaction to Next Paint (INP) is how quickly the page responds when someone taps or clicks, and the target is under 200 milliseconds. Cumulative Layout Shift (CLS) is how much the layout jumps around while loading, and the target is as close to zero as possible. Together they form Google's page experience signal, which influences rankings."
      },
      {
        "q": "How is website speed measured, and what is the difference between lab scores and field data?",
        "a": "There are two kinds of measurement. Lab scores come from tools like PageSpeed Insights running a simulated test, which is useful for diagnosis but tests one moment on one connection. Field data comes from real visitors' browsers (Google's Chrome UX Report), and this is what Google actually ranks you on. We optimize for field data first, because that is what your customers experience and what Google rewards. A perfect lab score with poor field data is a vanity metric."
      },
      {
        "q": "How long does speed optimization take?",
        "a": "A speed audit takes five to seven working days. Implementation usually takes two to four weeks after that, depending on the size of your site and how many fixes are needed. Shopify stores with app bloat are often transformed in the first two weeks; large WordPress sites with years of plugin accumulation can take longer. You will see staged improvements as we go, not one big reveal at the end."
      },
      {
        "q": "Will speed optimization change how my website looks?",
        "a": "No. Almost all speed work happens underneath the design: compressing images, deferring scripts, cleaning up code, fixing caching and removing dead weight. Your visitors see the same site, only faster. The one exception is if we find something in the design itself causing the slowness, like a 10MB background video. In that case we flag it, explain the trade-off, and only change it with your approval."
      },
      {
        "q": "My store is on Shopify. What is usually slowing it down?",
        "a": "In our experience, the top three Shopify slowdowns are app bloat (every installed app loads JavaScript, including apps you stopped using months ago), oversized theme code and uncompressed product images, and third-party scripts such as review widgets, popups and tracking pixels firing on every page instead of only where needed. An audit almost always finds quick wins in the first category alone. We never recommend deleting apps you actually use; we make them load smarter."
      },
      {
        "q": "Do you optimize WordPress websites too?",
        "a": "Yes. WordPress slowdowns are usually plugin sprawl, page builders producing heavy markup, unoptimized databases and images, and budget hosting. We trim plugins to what earns its place, configure proper caching, optimize the database and media, and fix theme-level issues. If your hosting plan is the real bottleneck, we will tell you honestly rather than optimize around it."
      },
      {
        "q": "Will a faster website improve my Google rankings?",
        "a": "It helps, with honest limits. Page experience, built on Core Web Vitals, is a confirmed Google ranking factor, so moving from poor to good removes a handicap, especially against faster competitors. But speed alone will not outrank a page with better content and stronger links. Speed optimization makes sure your site is never losing rankings it deserves, and it pairs best with our SEO work, which handles the content and authority side."
      },
      {
        "q": "What is the difference between your audit and a free online speed test?",
        "a": "A free test gives you a score and a generic list of warnings. Our audit gives you a diagnosis: which issues actually affect your revenue pages, what each fix is worth, what it will cost to implement, and in what order to do the work. It is the difference between a thermometer and a doctor, and it is measured against your real visitors' data, not a single simulated run."
      },
      {
        "q": "Is a one-time fix enough, or do I need ongoing monitoring?",
        "a": "A one-time fix is enough if your site rarely changes. But most growing businesses add new apps, images, campaigns and tracking every month, and each addition quietly slows the site back down. If you run ads continuously, monitoring pays for itself: it catches regressions in the same week they appear, before they eat into your conversion rate. We will tell you honestly which camp you are in after the audit."
      },
      {
        "q": "Can you work with our in-house developer or existing agency?",
        "a": "Yes, and it works well. Many clients take our audit to their own team for implementation, because the findings report is written to be actionable by any competent developer, with each item explained and prioritized. We stay available for questions during implementation, and we re-measure afterwards to confirm the gains. No turf wars; the goal is a fast site, whoever builds it."
      }
    ]
  }
];

/** Lookup by id, for cross-links and the Compound Loop. */
export const pillarsById = new Map(servicePillars.map((p) => [p.id, p]));

export function getPillar(id: PillarId): ServicePillar {
  const pillar = pillarsById.get(id);
  if (!pillar) throw new Error(`Unknown pillar: ${id}`);
  return pillar;
}

/** The six pillars that appear in navigation and in the six-pillar lists. */
export const primaryPillars = servicePillars.filter((pillar) => pillar.primary);

/**
 * The structural labels on a service page. Here rather than in the template so
 * the component holds no copy — a label change is a content edit, not a code
 * edit, and the six layouts cannot drift from one another.
 */
export const serviceLabels = {
  problemEyebrow: "The problem",
  flowEyebrow: "The path spend takes",
  indexEyebrow: "The index",
  indexColumns: ["What we measure", "How we measure it", "What we do with it"] as const,
  fitEyebrow: "Fit",
  fitHeadline: "Whether this is the right engagement.",
  fitFor: "Who it suits",
  fitNotFor: "When it is not",
  stripLabel: "Creative formats",
  stripCaption: "Formats we build in: 9:16, 4:5 and 1:1 — composed here, not a client’s assets.",
  ctaPrefix: "Let us talk about",
  nextPrefix: "Next:",
} as const;

/**
 * Search-facing copy for each pillar, kept apart from `title` on purpose:
 * `title` is the display name (nav, breadcrumb, H1) and stays short, while
 * these lines carry the keyword. Titles are ≤60 characters, descriptions ≤155
 * and complete sentences, kickers sit directly under the H1.
 */
export const pillarSeo: Record<string, { title: string; description: string; kicker: string }> = {
  "d2c-growth": {
    title: "D2C Growth Marketing Services",
    description: "D2C growth marketing built around contribution margin: account structure, creative testing and measurement, scaled only where the numbers hold.",
    kicker: "D2C growth marketing services",
  },
  creative: {
    title: "Ad Creative & Content for D2C Brands",
    description: "Performance creative, UGC and reels made for 4:5 and 9:16 feeds, tested weekly so D2C brands always know which hook and format are winning.",
    kicker: "Ad creative and content production for D2C brands",
  },
  shopify: {
    title: "Shopify Development & CRO for D2C Brands",
    description: "Shopify stores, product pages and landing pages built for speed and conversion, so the traffic your ads buy actually turns into orders.",
    kicker: "Shopify development and conversion rate optimisation",
  },
  seo: {
    title: "SEO Services for D2C Brands in India",
    description: "Technical SEO, category and product page optimisation and content that search engines and AI assistants can quote, built for D2C brands in India.",
    kicker: "SEO and AI search optimisation for D2C brands in India",
  },
  automation: {
    title: "WhatsApp Automation & CRM for D2C Brands",
    description: "WhatsApp, email and CRM automation that replies in minutes, recovers abandoned carts and brings customers back without anyone doing it by hand.",
    kicker: "WhatsApp automation, CRM and AI workflows",
  },
  data: {
    title: "Marketing Analytics & Tracking for D2C",
    description: "Server-side tracking, clean dashboards and margin-based reporting, so every spend decision rests on numbers you can reproduce and trust.",
    kicker: "Marketing analytics, tracking and reporting",
  },
  performance: {
    title: "Performance Marketing Agency — Meta & Google Ads",
    description: "Facebook, Instagram and Google Ads managed against contribution margin, with clean structure, fresh creative and weekly decisions on real numbers.",
    kicker: "Facebook & Instagram ads management and Google Ads",
  },
  "social-media": {
    title: "Social Media Management for D2C Brands",
    description: "Instagram and Facebook content, community and a testing rhythm that gives every post a job and every week a lesson for the paid team.",
    kicker: "Instagram and Facebook social media management",
  },
  "web-development": {
    title: "Landing Page & Website Design for Lead Gen",
    description: "Fast websites and landing pages with one job per page, built for mobile first and connected to your follow-up so enquiries are never lost.",
    kicker: "Website and landing page design for lead generation",
  },
  "lead-generation": {
    title: "Lead Generation Funnels for Courses & Clinics",
    description: "Lead ads, webinar and course funnels, and instant follow-up measured on booked calls and sales rather than on the cost of a form fill.",
    kicker: "Lead generation, webinar and course funnels",
  },
  "meta-ads": {
    title: "Meta Ads Agency for D2C Brands in India",
    description: "Meta ads agency for D2C brands in India — Facebook & Instagram management rebuilt around contribution margin, with creative testing and weekly sprints.",
    kicker: "Facebook & Instagram ads management for D2C brands in India",
  },
  "speed-optimization": {
    title: "Website Speed Optimization Services India | Pixelcliq",
    description: "Slow website losing sales? Pixelcliq fixes Core Web Vitals for Shopify, WordPress and custom sites across India. Speed audits from ₹15,000.",
    kicker: "A faster website for D2C brands in India — measured in sales, not scores.",
  },
  branding: {
    title: "Brand Identity & Packaging Design for D2C",
    description: "Logo, colour, type, packaging and a template kit that keep every ad, page and pack recognisably one brand at thumbnail size and beyond.",
    kicker: "Brand identity and packaging design",
  },
};
