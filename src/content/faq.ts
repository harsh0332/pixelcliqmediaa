export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

/**
 * Site-level FAQs.
 *
 * Answers are honest, including where they are unflattering. Anything not yet
 * decided is marked [TO_CONFIRM] rather than filled with a plausible number —
 * these are the questions a burned founder asks, and a confident invented
 * answer is exactly what they are testing for.
 */
export const siteFaqs: FaqItem[] = [
  {
    id: "engagement-model",
    q: "How do you work with brands?",
    a: "As a monthly retainer covering an agreed set of pillars, starting with an audit. Some brands take the full system; others start with one or two pillars and add the rest as it makes sense. We do not sell hours, and we do not take a percentage of ad spend — that pays us for spending more, which is the wrong incentive.",
  },
  {
    id: "pricing",
    q: "How do you charge?",
    a: "A flat monthly retainer, agreed in advance and scoped to the pillars you take. Not a percentage of ad spend — that model pays an agency for spending more, which is the wrong incentive when the job is profitable scale. The number depends on scope, so it is set on the call, in writing, before anything starts.",
  },
  {
    id: "minimum-spend",
    q: "Is there a minimum ad spend?",
    a: "There is a practical floor, because below a certain number of weekly conversions every result is noise and testing cannot resolve anything. Where that floor sits depends on your category and average order value, so we work it out against your numbers on the call. If you are under it, we will say so rather than take the retainer and hope.",
  },
  {
    id: "timelines",
    q: "How quickly will we see results?",
    a: "The audit takes two to three weeks. Rebuilding structure, tracking and the first creative round takes another few weeks after that, and a full testing cycle has to run before the numbers mean much. Store and SEO work compound over quarters, not weeks. Anyone promising a transformation inside thirty days is describing luck, not a process.",
  },
  {
    id: "what-we-need",
    q: "What do you need from us?",
    a: "Access to the ad accounts, store, analytics and lifecycle tools; someone who can answer questions about the product and the margins; and a decision-maker in the weekly call. The single biggest predictor of a good engagement is whether we can get honest numbers on cost of goods, shipping and returns early.",
  },
  {
    id: "ownership",
    q: "Who owns the ad accounts, the store and the data?",
    a: "You do, in every case. We work inside your Meta Business Manager, your Google Ads account, your Shopify store and your analytics properties — never inside ours. Automations are built in your tools on your credentials, and creative files are handed over as part of the engagement. If we stop working together, there is nothing to migrate and nothing withheld.",
  },
  {
    id: "reporting",
    q: "How do you report?",
    a: "A weekly working session and a live dashboard from one source, with metric definitions written down so the same word means the same thing every week. Reporting includes tests that failed and what they cost to learn. There is no monthly deck assembled to tell a story after the fact.",
  },
  {
    id: "contracts",
    q: "What are the contract terms?",
    a: "The audit is a standalone engagement, so you can see how we work before committing to anything longer. Retainers run on a short initial term and then continue month to month, with notice on both sides — we confirm the exact terms in writing before anything starts. We would rather you were able to leave easily than stay because of a clause.",
  },
  {
    id: "who-we-work-with",
    q: "Who do you work with?",
    a: "Our main focus is D2C and Shopify brands across fashion, beauty, wellness, lifestyle, food and beverage. We also take on lead generation, course and webinar funnels, websites and automation projects for other businesses when the scope fits our capabilities.",
  },
  {
    id: "who-we-dont",
    q: "Who do you not work with?",
    a: "Brands looking for someone to press buttons on an existing plan, businesses whose economics cannot support paid acquisition at any efficiency, dropshipping and arbitrage models, and anyone who needs guaranteed numbers in writing. We also will not take a brand on if we do not think we can move it — that conversation happens on the first call.",
  },
  {
    id: "location",
    q: "Do you work remotely?",
    a: "Yes. We work with brands wherever they sell, and the weekly cadence runs remotely: calls, shared dashboards and one team you can reach directly.",
  },
  {
    id: "how-to-start",
    q: "How do we start?",
    a: "Book a growth call. It is a working conversation, not a pitch — we will ask about your product, your margins, your current spend and what has already been tried. If an audit makes sense, we will scope it on that call. If we are not the right fit, we will tell you then and, where we can, point you somewhere better.",
  },
];
