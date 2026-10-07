/** Concise homepage copy; detailed capabilities remain on service pages. */
export const refinedHome = {
  eyebrow: "Independent creative & growth studio",
  ctaNote: "Tell us about your brand. We’ll find the right place to start.",
  services: [
    { number: "01", title: "Performance marketing", description: "Meta and Google campaigns built around your offer, your audience and your margins.", tags: "Paid media · Acquisition · Retargeting", href: "/services/d2c-growth" },
    { number: "02", title: "Creative & content", description: "Fresh angles, strong hooks and content made for the way people actually watch, browse and buy.", tags: "UGC · Ad creative · Social media", href: "/services/creative" },
    { number: "03", title: "Commerce & conversion", description: "Shopify stores and landing pages that carry the promise of your ad all the way to checkout.", tags: "Shopify · Websites · CRO", href: "/services/shopify" },
    { number: "04", title: "SEO & organic growth", description: "Help the right people find your brand through useful content and a stronger search foundation.", tags: "Technical SEO · Ecommerce SEO · Content", href: "/services/seo" },
    { number: "05", title: "Retention & automation", description: "Stay connected after the first visit, with follow-ups and workflows that keep the journey moving.", tags: "Lifecycle · CRM · AI workflows", href: "/services/automation" },
    { number: "06", title: "Data & optimisation", description: "Connect the numbers to the next decision. Understand the journey, test a change and learn from it.", tags: "Analytics · Attribution · Experimentation", href: "/services/data" },
  ],
  approach: [
    { title: "Find the opportunity.", description: "We look at your offer, audience and customer journey together to find what needs attention first.", detail: "Audit & direction" },
    { title: "Build the connection.", description: "Creative, campaigns and the destination work from the same brief, with a clear job for every touchpoint.", detail: "Creative & execution" },
    { title: "Learn. Refine. Repeat.", description: "We review what people actually do, share what we learn and use it to shape the next round of work.", detail: "Measurement & iteration" },
  ],
  faqs: [
    { id: "d2c-focus", question: "Do you only work with D2C brands?", answer: "D2C is our main focus. We also work on lead generation, course and webinar funnels, websites, social media and automation for other businesses. The first conversation helps us understand whether our capabilities fit your goals." },
    { id: "single-service", question: "Can we start with one service?", answer: "Yes. We can start with a focused project or one area of growth, then connect other services as the scope develops. We agree on priorities and deliverables before work begins." },
    { id: "first-step", question: "What happens when we get in touch?", answer: "Tell us about your business and what you want to improve. We review your enquiry, arrange a conversation and discuss a suitable scope and next steps." },
    { id: "account-ownership", question: "Who owns the accounts and creative?", answer: "You retain ownership of your advertising accounts, store and data. Deliverables and creative handover are agreed as part of the project scope." },
  ],
};

/**
 * The homepage: hero offer, the service explorer, how an engagement starts,
 * the standard we hold ourselves to, and the closing offer. Every visible
 * string on those sections lives here so the content guard reads it.
 */
export const homeContent = {
  hero: {
    kicker: "Independent creative & growth studio",
    seoLine: "Meta ads, creative and Shopify growth for D2C brands in India",
    topRight: "Creative · Media · Commerce",
    titleLines: ["Make your", "next big move."],
    support:
      "We make the ads, run the media and build the store. One team, from the first scroll to the repeat order.",
    cta: "Book a free growth call",
    whatsapp: "Chat on WhatsApp",
    trust: "Free 30-minute call · We reply within one working day",
    scrollCue: "Selected work",
    headline: { a: "Make brands", b: "mean more." },
    stamp: "D2C first • Ideas into impact • ",
    reelLabel: "Studio concepts & selected films",
    pixels: ["coffee", "soda", "forme", "skincare", "sneakers", "morrow", "fragrance", "interval", "jewelry", "beauty", "chocolate", "eyewear", "saree", "tech"],
    explore: "Explore the work",
    disciplines: ["Creative direction", "Digital experiences", "Performance & growth"],
    reel: [
      { kind: "image", src: "coffee", brand: "Early Hours", tag: "Studio concept" },
      { kind: "video", src: "film-22", brand: "Nutra Wellness", tag: "Product film" },
      { kind: "image", src: "soda", brand: "Good Fizz", tag: "Studio concept" },
      { kind: "image", src: "forme", brand: "Forme", tag: "Studio concept" },
      { kind: "video", src: "film-07", brand: "M.D.", tag: "Spice in motion" },
      { kind: "image", src: "skincare", brand: "Still Kind", tag: "Studio concept" },
      { kind: "image", src: "sneakers", brand: "Pace Club", tag: "Studio concept" },
      { kind: "video", src: "film-04", brand: "Allwin", tag: "Travel in style" },
      { kind: "image", src: "morrow", brand: "Morrow", tag: "Studio concept" },
      { kind: "image", src: "fragrance", brand: "Nuit Atelier", tag: "Studio concept" },
      { kind: "video", src: "film-19", brand: "KT Jewellers", tag: "Crafted in gold" },
      { kind: "image", src: "interval", brand: "Interval", tag: "Studio concept" },
    ],
    cards: {
      a: "Brand worlds",
      statementTop: "Creative × Commerce",
      statementA: "Made to stop.",
      statementB: "Built to move.",
      statementLink: "Explore the studio",
      c: "AI video & campaigns",
    },
    form: {
      label: "Book a free growth call",
      placeholder: "Your website or Instagram handle",
      button: "Get my free call",
      note: "Free 30-minute call · No obligation",
      message: "Hi Pixelcliq, I would like to book a free growth call. My brand: ",
      empty: "Add your website or Instagram so we can take a look first.",
    },
  },
  explorer: {
    eyebrow: "Services",
    title: "How we grow",
    titleAccent: "brands",
    intro:
      "Start with the one thing holding you back today. Every service is planned to plug into the others, so nothing you build now has to be rebuilt later.",
    cta: { label: "Not sure where to start? Book a free growth call", href: "/contact" },
    explore: "Explore",
    items: [
      {
        id: "ads", visual: "ads", title: "Performance Marketing", href: "/services/performance",
        line: "Meta and Google campaigns planned around your margins, with creative testing built in.",
        copy: "Account structure, budgets and tracking rebuilt around contribution margin, so more spend does not quietly mean less profit.",
        links: [{ label: "Meta Ads", href: "/services/performance" }, { label: "Google Ads", href: "/services/performance" }, { label: "D2C growth", href: "/services/d2c-growth" }],
      },
      {
        id: "design", visual: "design", title: "Creative & Ad Design", href: "/services/creative",
        line: "Statics, reels and UGC produced every week and judged on what they actually sell.",
        copy: "Hooks, carousels and short-form video on a weekly rhythm. Every concept is tied to a test, and every test leaves a lesson for the next brief.",
        links: [{ label: "Ad creative", href: "/services/creative" }, { label: "UGC & reels", href: "/services/creative" }, { label: "AI video", href: "/ai-video-creative" }],
      },
      {
        id: "social", visual: "social", title: "Social Media Management", href: "/services/social-media",
        line: "A consistent, on-brand feed planned around the stories your audience saves and shares.",
        copy: "A feed that looks like a brand worth buying from. Angles that land organically are handed straight to the paid team as tested ideas.",
        links: [{ label: "Content calendar", href: "/services/social-media" }, { label: "Community", href: "/services/social-media" }],
      },
      {
        id: "brand", visual: "brand", title: "Brand Identity & Design", href: "/services/branding",
        line: "Logo, packaging and a visual system that keeps every touchpoint recognisably yours.",
        copy: "One identity carried from the logo to the label to the ad, with templates your team can use daily without drifting off brand.",
        links: [{ label: "Identity", href: "/services/branding" }, { label: "Packaging", href: "/services/branding" }],
      },
      {
        id: "store", visual: "store", title: "Shopify & Web Experiences", href: "/services/shopify",
        line: "Shopify stores, websites and landing pages that turn the first visit into the next step.",
        copy: "From a brand website to a Shopify store: fast mobile experiences, focused campaign pages and a clear path to purchase or enquiry.",
        links: [{ label: "Shopify stores", href: "/services/shopify" }, { label: "Websites & landing pages", href: "/services/shopify#deliverables" }, { label: "Conversion", href: "/services/shopify" }],
      },
      {
        id: "seo", visual: "seo", title: "SEO & AI Search", href: "/services/seo",
        line: "Technical fixes, category pages and content that help the right people find you.",
        copy: "A clean technical foundation and pages built for real searches, written to be quoted by Google and by AI assistants alike.",
        links: [{ label: "Technical SEO", href: "/services/seo" }, { label: "Content", href: "/insights" }],
      },
      {
        id: "automation", visual: "automation", title: "Automation & WhatsApp", href: "/services/automation",
        line: "CRM, WhatsApp and email flows that reply in minutes and bring customers back.",
        copy: "New leads saved, tagged and answered automatically. Abandoned carts, COD confirmations and reorders handled by flows instead of by hand.",
        links: [{ label: "WhatsApp flows", href: "/services/automation" }, { label: "CRM setup", href: "/services/automation" }],
      },
      {
        id: "leads", visual: "leads", title: "Lead Generation & Funnels", href: "/services/lead-generation",
        line: "Lead ads, webinar and course funnels measured on booked calls, not form fills.",
        copy: "For educators, clinics and service businesses: registration pages, reminders and instant follow-up, so interest becomes a conversation while it is warm.",
        links: [{ label: "Lead ads", href: "/services/lead-generation" }, { label: "Webinar funnels", href: "/services/lead-generation" }],
      },
    ],
  },
  start: {
    eyebrow: "How we start",
    titleA: "From first call",
    titleB: "to first launch.",
    steps: [
      { tag: "One call", title: "Tell us where you are", copy: "Thirty minutes on your business, your numbers and what you want to change. Questions first, no pitch deck." },
      { tag: "A written plan", title: "See what to fix first", copy: "We review what is running today, write down what is holding growth back and propose a scope in priority order." },
      { tag: "Weekly sprints", title: "Launch and keep improving", copy: "Work goes live in planned sprints, followed by a weekly review of what moved, what did not and what comes next." },
    ],
    cta: "Book a free growth call",
  },
  standard: {
    eyebrow: "Our standard",
    titleA: "What you can",
    titleB: "hold us to.",
    intro: "How most growth work is set up, and how we set it up instead.",
    typicalLabel: "The usual way",
    oursLabel: "The Pixelcliq way",
  },
  faq: {
    eyebrow: "Questions",
    titleA: "Before we",
    titleB: "get started.",
    note: "A few things founders usually ask on the first call.",
  },
  closing: {
    titleA: "Ready for your",
    titleB: "next big move?",
    copy: "Tell us where your brand is today and where you want it to be. We reply within one working day with honest next steps.",
  },
};
