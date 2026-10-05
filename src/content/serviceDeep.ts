/**
 * Deep-dive content for the two flagship service pages. Each page has its own
 * idiom: Performance reads like a media control room, Creative like a studio.
 * Every chart and split is illustrative and labelled as such.
 */

export const performanceDeep = {
  story: {
    eyebrow: "What the first weeks look like",
    title: "Growth is a sequence,",
    accent: "not a switch.",
    note: "Illustrative curve. Your audit sets the real starting point.",
    milestones: [
      { at: 0.12, week: "Week 1", title: "Tracking fixed", copy: "Pixel, server events and margins wired in, so every later decision is made on real numbers." },
      { at: 0.32, week: "Week 2", title: "New structure live", copy: "Fewer, cleaner campaigns. Spend stops competing with itself." },
      { at: 0.52, week: "Week 3", title: "Fresh creative in", copy: "The first new concepts go out against clear win conditions." },
      { at: 0.72, week: "Week 4", title: "Losers cut", copy: "Ads that cost more than they earn are switched off fast." },
      { at: 0.9, week: "Week 6+", title: "Budget to winners", copy: "Spend follows margin, and the weekly loop keeps compounding." },
    ],
  },
  allocator: {
    eyebrow: "Where the budget goes",
    title: "Split by stage.",
    accent: "Steered by margin.",
    note: "Illustrative starting splits. We set yours after the audit and move it every week.",
    modes: [
      { id: "launching", label: "Launching", copy: "Most budget finds new buyers; little to retarget yet.", split: [70, 22, 8] },
      { id: "scaling", label: "Scaling", copy: "Prospecting still leads, retargeting pulls its weight.", split: [55, 28, 17] },
      { id: "established", label: "Established", copy: "Repeat buyers earn a real share of the plan.", split: [42, 28, 30] },
    ],
    stages: [
      { name: "Find new buyers", channels: ["Meta Advantage+", "YouTube", "Demand Gen"], color: "#0a6fd0" },
      { name: "Bring them back", channels: ["Meta retargeting", "Search", "Performance Max"], color: "#74baf0" },
      { name: "Turn them into regulars", channels: ["WhatsApp flows", "Email", "Customer lists"], color: "#d6f06e" },
    ],
  },
  metrics: {
    eyebrow: "The numbers we steer by",
    title: "Four numbers.",
    accent: "No vanity metrics.",
    hint: "Hover or tap a card",
    items: [
      { short: "CM", name: "Contribution margin", meaning: "What is left from an order after product, shipping, fees and ad cost.", why: "The number that tells you if growth is actually profitable." },
      { short: "CAC", name: "Cost to acquire a customer", meaning: "Total spend divided by new customers won.", why: "We steer it against what a customer is worth, not a fixed target." },
      { short: "MER", name: "Marketing efficiency ratio", meaning: "All revenue divided by all marketing spend.", why: "One honest view across every channel, no platform double-counting." },
      { short: "ROAS", name: "Return on ad spend", meaning: "Revenue a platform credits to its ads, per rupee spent.", why: "Useful inside a platform, never trusted on its own." },
    ],
  },
};

export const creativeDeep = {
  anatomy: {
    eyebrow: "Anatomy of an ad that sells",
    title: "Five parts.",
    accent: "Each with a job.",
    hint: "Tap a part, or watch them cycle",
    parts: [
      { id: "hook", label: "Hook", x: 10, y: 7, copy: "The first second. A line or a visual that stops the thumb, written in the buyer's own words." },
      { id: "product", label: "Product", x: 73, y: 36, copy: "The product shown clearly, in use, in the world it belongs to. No guessing what is being sold." },
      { id: "proof", label: "Proof", x: 6, y: 64, copy: "A review, a result or a detail that makes the claim believable." },
      { id: "offer", label: "Offer", x: 91, y: 72, copy: "Why buy now: a bundle, a price, a guarantee. One offer, said once." },
      { id: "cta", label: "CTA", x: 10, y: 88, copy: "One clear next step that matches the page the click lands on." },
    ],
  },
  hooks: {
    eyebrow: "Hook lab",
    title: "We test the first second",
    accent: "before anything else.",
    note: "Example hooks for illustration.",
    items: [
      { type: "Problem first", line: "Your skincare has nine steps. Your mornings don't have time for them." },
      { type: "Curiosity", line: "We swapped one ingredient and the whole routine changed." },
      { type: "Social proof", line: "The serum our customers reorder before it runs out." },
      { type: "Before / after", line: "Same coffee beans. Different morning." },
      { type: "Founder story", line: "I started this brand because I couldn't find a bag that lasted." },
    ],
  },
  sprint: {
    eyebrow: "The weekly creative sprint",
    title: "Ideas in.",
    accent: "Winners out.",
    columns: ["Idea", "Brief", "Make", "Test", "Winner"],
    cards: ["skincare", "coffee", "sneakers", "fragrance"],
  },
  formats: {
    eyebrow: "One idea, every format",
    title: "Made for the feed.",
    accent: "Sized for every slot.",
    note: "Studio concepts for illustration.",
    items: [
      { kind: "image", src: "skincare", ratio: "9 / 16", label: "Reel · 9:16" },
      { kind: "image", src: "sneakers", ratio: "4 / 5", label: "Feed · 4:5" },
      { kind: "video", src: "film-22", ratio: "9 / 16", label: "AI product film" },
      { kind: "image", src: "soda", ratio: "1 / 1", label: "Static · 1:1" },
      { kind: "image", src: "forme", ratio: "4 / 5", label: "Carousel card" },
    ],
  },
};
