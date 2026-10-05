/**
 * The approach page. Every step here is how an engagement actually runs and
 * matches the promises made elsewhere on the site: a free call, an audit
 * before spend changes, a written plan, weekly sprints and reviews.
 */
export const approach = {
  journey: {
    eyebrow: "How an engagement runs",
    title: "From first call",
    accent: "to compounding growth.",
    intro:
      "Six steps, in order, with nothing skipped. Each one has a clear output, so you always know what has been done, what you are getting and what we need from you.",
    labels: { we: "What we do", you: "What you get", need: "What we need from you" },
    steps: [
      {
        name: "The free call",
        when: "Day one",
        we: "Thirty minutes on your business, your numbers and the next outcome you want. Questions first, no pitch deck.",
        you: "An honest first read on where growth is stuck, and whether we are the right team for it.",
        need: "A rough picture of revenue, spend and the channels you use today.",
      },
      {
        name: "Audit",
        when: "Before anything changes",
        we: "We read the ad accounts, the store and the tracking together before touching spend. Most of what looks like a media problem turns out to be somewhere else.",
        you: "Audit notes: what is working, what is leaking and where the numbers cannot be trusted yet.",
        need: "View access to ad accounts, analytics and your store.",
      },
      {
        name: "Written plan",
        when: "Agreed before we build",
        we: "We write down what we believe is limiting growth, what we will do about it and what we expect to see if we are right.",
        you: "A plan written to be argued with: priorities, scope, owners and the signals that will tell us it is working.",
        need: "One working session to challenge it and agree the priorities.",
      },
      {
        name: "Build",
        when: "In parallel, not in sequence",
        we: "Creative, store fixes, tracking and automations are built in the same window, so traffic has somewhere good to land on day one.",
        you: "New creative, landing or product-page changes, clean tracking and the first automations, reviewed before launch.",
        need: "Quick approvals on creative and brand decisions.",
      },
      {
        name: "Launch",
        when: "Live, then reviewed every week",
        we: "Campaigns go live against the structure and win conditions agreed in the plan. Tests are set up so each one teaches us something.",
        you: "A weekly update: what changed, what it cost and what happens next.",
        need: "Twenty minutes a week for the review.",
      },
      {
        name: "Compound",
        when: "Where most engagements never get to",
        we: "Retention, data and iteration close the loop. A customer worth more lets you pay more to win the next one.",
        you: "Repeat-purchase flows, a cleaner view of profit and a backlog of tested ideas for the next round.",
        need: "Your input on offers, launches and what the business needs next.",
      },
    ],
  },

  week: {
    eyebrow: "The weekly sprint",
    title: "What a week",
    accent: "looks like.",
    intro: "Once we are live, every week runs on the same rhythm, so nothing waits for a monthly meeting.",
    days: [
      { day: "Mon", title: "Review", copy: "Read last week's numbers and decide what deserves more budget, a fix or a stop." },
      { day: "Tue", title: "Brief", copy: "Turn what we learned into the next creative and page briefs." },
      { day: "Wed", title: "Make", copy: "Produce creative, landing changes and automations against those briefs." },
      { day: "Thu", title: "Launch", copy: "Ship the new tests with clear win conditions set in advance." },
      { day: "Fri", title: "Report", copy: "Send the weekly update: what moved, what it cost, what happens next." },
    ],
  },

  principles: {
    eyebrow: "How we think",
    title: "Four rules",
    accent: "we work by.",
    items: [
      { title: "Start with the real constraint.", body: "We look at the product, the customer, the creative, the store and the economics together. The first priority is whatever is holding the next stage back." },
      { title: "Make the work visible.", body: "A shared brief, agreed deliverables and a fixed review rhythm. You always know what is being built, why it matters and what comes next." },
      { title: "Learn on purpose.", body: "Every launch is set up to answer a question. We write the answer down and use it to shape the next round." },
      { title: "Build systems, not one-offs.", body: "Creative, store, tracking and automation are designed to plug into each other, so nothing you build now has to be rebuilt later." },
    ],
  },

  commitments: {
    eyebrow: "What you can count on",
    title: "The same standard,",
    accent: "every engagement.",
    items: [
      { title: "One team", body: "Strategy, creative, media and your store run by people who talk to each other daily." },
      { title: "A written plan", body: "Priorities and scope agreed in writing before work starts." },
      { title: "A weekly update", body: "What changed, what it cost and what happens next, every week." },
      { title: "Numbers you can check", body: "Tracking we set up and verify, with estimates labelled as estimates." },
      { title: "Your accounts stay yours", body: "Ad accounts, store and data remain in your name and under your control." },
      { title: "Start with one thing", body: "Begin with one service and connect more only when it makes sense." },
    ],
  },

  fit: {
    eyebrow: "Is this a fit?",
    title: "Honest about",
    accent: "who we suit.",
    good: {
      title: "A strong fit if you",
      items: [
        "sell a product you are proud of and want it to grow profitably",
        "want one team across ads, creative, store and follow-up",
        "are happy to share numbers and make decisions weekly",
        "value a written plan over a vague promise",
      ],
    },
    bad: {
      title: "Probably not a fit if you",
      items: [
        "need someone to press buttons on an existing plan",
        "want guaranteed numbers in writing",
        "run dropshipping or arbitrage models",
        "cannot support paid acquisition at any efficiency yet",
      ],
    },
  },

  cta: { title: "Start with", accent: "one conversation.", copy: "Thirty minutes, free. You leave with an honest read on what to fix first, whether or not we work together.", label: "Book a free growth call" },
};
