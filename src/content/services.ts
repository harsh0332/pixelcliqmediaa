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
    connectsTo: ["creative-content", "commerce-shopify", "data-optimisation"],
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
    connectsTo: ["d2c-growth", "commerce-shopify", "seo-organic"],
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
    title: "Commerce & Shopify",
    slug: "/services/shopify",
    promise: "A store that finishes what the ad started.",
    headline: "A point of conversion rate is worth more than a better bid.",
    summary:
      "Shopify design, development and conversion work built around what paid traffic actually needs: fast pages, honest product detail, and a checkout that does not lose people you have already paid for.",
    intro:
      "The store is where media spend becomes revenue or evaporates. A point of conversion rate is worth more than most bidding changes, and it compounds across every channel at once. We treat the storefront as growth infrastructure — instrumented, and iterated rather than redesigned every two years.",
    capabilities: [
      "Shopify design",
      "Shopify development",
      "PDP optimisation",
      "Conversion rate optimisation",
      "Landing pages",
      "Analytics implementation",
      "Third-party integrations",
    ],
    deliverables: [
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
    connectsTo: ["d2c-growth", "data-optimisation", "automation-ai"],
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
    connectsTo: ["creative-content", "commerce-shopify", "data-optimisation"],
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
    connectsTo: ["creative-content", "commerce-shopify", "data-optimisation"],
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
    id: "strategic-marketing",
    number: "09",
    title: "Strategic Marketing",
    slug: "/services/strategic-marketing",
    primary: false,
    parent: "d2c-growth",
    promise: "A clear direction for every channel, campaign and launch.",
    headline: "Decide what matters before you decide where to spend.",
    summary: "Positioning, audience research, offers and channel planning brought into one practical marketing roadmap. Built for D2C brands, and for businesses that need a clearer route from attention to enquiry.",
    intro: "Your ads, content and website should be working toward the same decision. We connect customer research, a distinctive proposition and a realistic channel plan, so the team knows what to say, where to show up and what to measure next.",
    problem: {
      intro: "A busy marketing calendar can hide an unclear strategy. When each channel has its own message, the customer has to work out what the business stands for. We give the activity a shared direction.",
      pains: ["Campaigns launch without a clear audience or offer.", "Teams produce more content without knowing which message matters.", "Budget follows habit instead of customer demand and business priorities."],
    },
    connectsNote: "The strategy becomes the brief for creative, the priorities for paid media and the story the website needs to tell.",
    fit: {
      intro: "For D2C launches, established brands entering a new category, and service businesses that need a joined-up marketing plan. Useful before committing to a new campaign, website or ongoing media budget.",
      notFor: "A roadmap cannot replace product demand or a viable offer. If those are still uncertain, we start with a focused discovery and testing brief rather than a large rollout.",
    },
    capabilities: ["Audience research", "Brand positioning", "Offer strategy", "Launch planning", "Channel planning", "Marketing roadmap"],
    deliverables: [
      { title: "Customer and category review", description: "A focused review of customer needs, buying objections and competing alternatives, with the opportunities translated into decisions." },
      { title: "Positioning and message framework", description: "A clear proposition, reasons to believe and messaging hierarchy that the team can use across ads, content and landing pages." },
      { title: "Offer and campaign brief", description: "The audience, promise, creative angles and destination for your next launch or campaign, with a defined conversion goal." },
      { title: "Channel and budget plan", description: "A prioritised mix of paid, organic, owned and website activity, matched to the available resources and sales journey." },
      { title: "Actionable marketing roadmap", description: "A sequenced plan with owners, dependencies and review points, so strategy moves into production without another round of interpretation." },
      { title: "Measurement framework", description: "Agreed definitions for enquiries, qualified leads, orders and repeat customers, choosing the measures relevant to your business." },
    ],
    process: [
      { step: "01", title: "Listen", description: "Understand your customer, offer, economics and existing activity before proposing channels." },
      { step: "02", title: "Find the angle", description: "Identify the customer tension and the part of your proposition worth building the campaign around." },
      { step: "03", title: "Build the plan", description: "Translate the angle into creative briefs, channel priorities and a realistic production schedule." },
      { step: "04", title: "Test and refine", description: "Use customer response and campaign evidence to improve the plan as it runs." },
    ],
    connectsTo: ["creative-content", "performance", "web-development"],
    faq: [
      { q: "Is this only for D2C brands?", a: "D2C is our focus, but strategy engagements can also support service businesses and lead-generation campaigns. The audience, conversion goal and measurement plan are adapted to the business." },
      { q: "Can we start with strategy and use our own team?", a: "Yes. The roadmap and briefs can be handed to your internal team, or we can support execution through our creative, media, web and automation services." },
      { q: "How is this different from performance marketing?", a: "Strategy defines the audience, offer, positioning and channel priorities. Performance marketing executes and improves paid campaigns against those decisions. They can be scoped together or separately." },
      { q: "What do you need from us?", a: "Your business goals, product or service details, customer feedback, existing marketing assets and any useful sales or campaign data. We agree access and scope before starting." },
      { q: "Do we receive a presentation or an execution plan?", a: "The output includes a practical roadmap and briefs, with priorities, responsibilities and review points. The format supports the people who will actually execute the work." },
    ],
  },
  {
    id: "web-development",
    number: "10",
    title: "Web & Landing Pages",
    slug: "/services/web-development",
    primary: false,
    parent: "commerce-shopify",
    promise: "A better destination for every campaign and conversation.",
    headline: "Give every click a clear next step.",
    summary: "Business websites, campaign landing pages and lead-generation experiences designed and developed around the customer journey. Clear messaging, responsive layouts and useful integrations from the start.",
    intro: "A website should explain the offer, answer the questions that hold someone back and make the next step easy. We bring strategy, design and development together for business sites and landing pages, with the same attention to mobile usability that we bring to a D2C store.",
    problem: {
      intro: "Sending good traffic to an unclear page wastes the opportunity. Slow mobile experiences, disconnected messaging and awkward forms can lose the people your campaign worked hard to reach.",
      pains: ["The landing page makes a different promise from the ad.", "Visitors scroll through information without finding a clear action.", "Enquiries get lost between forms, inboxes and follow-up tools."],
    },
    connectsNote: "The page carries the creative promise through to conversion, while tracking and automation help the team understand and follow up on customer interest.",
    fit: {
      intro: "For businesses launching a site, rebuilding an outdated one, or creating a focused destination for a campaign. Suitable for lead generation and service websites alongside our dedicated Shopify offering for commerce.",
      notFor: "If the brief is a complex software product or a large custom platform, we first establish the technical scope and dependencies. A campaign website engagement should not hide an application build inside it.",
    },
    capabilities: ["Business websites", "Campaign landing pages", "Responsive development", "Conversion copy", "Forms and integrations", "Technical SEO foundations"],
    deliverables: [
      { title: "Page and content architecture", description: "A clear sitemap, conversion journey and content hierarchy, so every section earns its place and visitors know where to go next." },
      { title: "Responsive interface design", description: "Layouts designed for phone and desktop, with readable type, considered motion and consistent components across the site." },
      { title: "Website development", description: "The agreed pages built on a platform suited to the brief, with attention to accessibility, responsive behaviour and loading performance." },
      { title: "Campaign landing pages", description: "Focused pages that match the campaign message and organise the offer, objections and call to action around one primary goal." },
      { title: "Lead capture and integrations", description: "Forms connected to the agreed inbox, CRM or workflow, with validation and delivery checked before launch." },
      { title: "Launch and handover", description: "Device checks, page metadata, redirects where needed, analytics events and an editing handover for your team." },
    ],
    process: [
      { step: "01", title: "Map", description: "Agree the audience, conversion goal, content needs and technical scope before designing pages." },
      { step: "02", title: "Design", description: "Develop the message hierarchy and visual direction, then resolve mobile and desktop layouts together." },
      { step: "03", title: "Build", description: "Develop the approved experience, connect the agreed integrations and prepare the content for launch." },
      { step: "04", title: "Check and launch", description: "Test key journeys across devices, verify enquiries and analytics, then hand over the live site." },
    ],
    connectsTo: ["strategic-marketing", "seo-organic", "automation-ai"],
    faq: [
      { q: "Do you build websites beyond Shopify?", a: "Yes. This service covers business websites and landing pages. We recommend the platform after understanding your content, integrations and editing needs. Shopify stores have a dedicated commerce service." },
      { q: "Can you build a single landing page?", a: "Yes. A focused campaign page can be scoped on its own, with a clear offer, conversion action and the tracking needed to evaluate it." },
      { q: "Do you help with website copy?", a: "Messaging and page structure can be included in the scope. We work from your actual offer, customer questions and supporting evidence rather than filling the page with generic claims." },
      { q: "Will the site work on mobile?", a: "Mobile layouts are part of design and development from the beginning. Navigation, typography, media and forms are checked at practical screen sizes before launch." },
      { q: "Can the site connect to our CRM or WhatsApp workflow?", a: "Where the tools support it, yes. We agree the integration, required access, any provider costs and how delivery will be verified before building it." },
      { q: "Can our team update the site afterwards?", a: "We establish your editing needs when choosing the platform and provide a handover for the agreed content. Ongoing support and further development can be scoped separately." },
    ],
  },
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
