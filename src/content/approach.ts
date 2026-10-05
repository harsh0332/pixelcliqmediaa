/**
 * The approach page. Short on words, long on showing: every step matches the
 * promises made elsewhere on the site (free call, audit before spend changes,
 * a written plan, weekly sprints and reviews).
 */
export const approach = {
  journey: {
    eyebrow: "How we work",
    title: "Six steps.",
    accent: "Nothing skipped.",
    hint: "Scroll to move through the journey",
    youGet: "You get",
    steps: [
      { name: "The free call", line: "Thirty minutes on your numbers and your goal. No pitch deck.", get: ["An honest first read", "A clear yes or no on fit"], visual: "call" },
      { name: "Audit", line: "Ads, store and tracking read together, before spend changes.", get: ["What works", "What leaks", "What to trust"], visual: "audit" },
      { name: "The plan", line: "What holds you back, what we will do, how we will know.", get: ["Priorities", "Scope and owners", "Success signals"], visual: "plan" },
      { name: "Build", line: "Creative, store and tracking built side by side.", get: ["New creative", "Page fixes", "Clean tracking"], visual: "build" },
      { name: "Launch", line: "Live with clear win conditions. Reviewed every week.", get: ["Structured tests", "A weekly update"], visual: "launch" },
      { name: "Compound", line: "Retention and iteration close the loop.", get: ["Repeat-purchase flows", "A profit view", "The next ideas"], visual: "compound" },
    ],
  },

  week: {
    eyebrow: "Every week, once live",
    title: "One rhythm.",
    accent: "On repeat.",
    days: [
      { day: "Mon", title: "Review", copy: "What moved" },
      { day: "Tue", title: "Brief", copy: "What to make" },
      { day: "Wed", title: "Make", copy: "Creative and pages" },
      { day: "Thu", title: "Launch", copy: "New tests live" },
      { day: "Fri", title: "Report", copy: "Your weekly update" },
    ],
  },

  principles: {
    eyebrow: "How we think",
    items: [
      { line: "Fix the real constraint first.", sub: "Product, customer, creative, store and economics, read together." },
      { line: "Keep the work visible.", sub: "A shared brief, agreed deliverables, a fixed review rhythm." },
      { line: "Learn on purpose.", sub: "Every launch answers a question we wrote down first." },
      { line: "Build systems, not one-offs.", sub: "Everything plugs into everything else." },
    ],
  },

  commitments: {
    eyebrow: "What you can count on",
    title: "Every engagement.",
    accent: "Same standard.",
    items: [
      { title: "One team", body: "Strategy to store, talking daily" },
      { title: "A written plan", body: "Agreed before work starts" },
      { title: "A weekly update", body: "What changed, what it cost" },
      { title: "Numbers you can check", body: "Estimates labelled as estimates" },
      { title: "Your accounts stay yours", body: "Ads, store and data in your name" },
      { title: "Start with one thing", body: "Add more only when it makes sense" },
    ],
  },

  fit: {
    eyebrow: "Is this a fit?",
    title: "Honest about",
    accent: "who we suit.",
    good: { title: "A great fit if you", items: ["sell a product you are proud of", "want one team across ads, creative and store", "share numbers and decide weekly"] },
    bad: { title: "Not a fit if you", items: ["want guaranteed numbers in writing", "run dropshipping or arbitrage", "need someone to just press buttons"] },
  },

  cta: { title: "Start with", accent: "one conversation.", copy: "Thirty minutes, free. An honest read on what to fix first.", label: "Book a free growth call" },
};
