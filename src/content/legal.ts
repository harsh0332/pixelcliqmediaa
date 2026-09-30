export interface LegalSection {
  id: string;
  heading: string;
  body: string[];
}

export interface LegalDocument {
  slug: "privacy" | "terms" | "cookies";
  title: string;
  intro: string;
  /** ISO date. Update whenever the text changes, not on every deploy. */
  updated: string;
  sections: LegalSection[];
}

/**
 * Draft policies, written plainly rather than copied from another company.
 *
 * They describe what this site actually does today: one contact form, no
 * analytics, no cookies of our own. That will change, and the places it will
 * change are marked [TO_CONFIRM_WITH_LEGAL] rather than filled with the usual
 * boilerplate — a policy describing tracking we have not implemented is as
 * inaccurate as one omitting tracking we have.
 *
 * These need review by someone qualified in Indian data protection law before
 * launch. They are a starting point, not advice.
 */
export const legalDocuments: LegalDocument[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "2026-08-26",
    intro:
      "This policy explains what personal information Pixelcliq Media collects through this website, why we collect it, and what you can ask us to do with it. It is written to be read rather than to be survived.",
    sections: [
      {
        id: "who-we-are",
        heading: "Who we are",
        body: [
          "Pixelcliq Media is a D2C growth agency based in Indore, Madhya Pradesh, India. For anything in this policy you can reach us at the email address on our contact page.",
          "Our registered legal entity name and registered address are [TO_CONFIRM_WITH_LEGAL].",
        ],
      },
      {
        id: "what-we-collect",
        heading: "What we collect",
        body: [
          "The contact form prepares a draft in your browser. Entering details or preparing the draft does not send them to us or store them on our server. If you choose to send the draft through your email app, we receive the information included in that email: your name, company, email address, message and any optional details you provide.",
          "We do not ask for and do not want payment details, identity documents, or any sensitive personal information through this site.",
          "Our hosting provider keeps standard server logs, which may include IP addresses and request information. These are used for security and reliability, not for profiling.",
        ],
      },
      {
        id: "why",
        heading: "Why we collect it",
        body: [
          "To reply to your enquiry, to understand whether we are a sensible fit for your brand, and to have the conversation you asked for. That is the only purpose.",
          "We do not sell personal information, and we do not share it with third parties for their own marketing.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies and analytics",
        body: [
          "This website currently sets no cookies of its own and runs no third-party analytics. If that changes, this policy and our cookie policy will be updated before the change goes live, and any non-essential cookies will require your consent first.",
          "The analytics tooling we intend to use is [TO_CONFIRM_WITH_LEGAL].",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep it",
        body: [
          "Enquiries are kept for as long as the conversation is live, and for a reasonable period afterwards in case you come back to us. Our specific retention period is [TO_CONFIRM_WITH_LEGAL].",
          "You can ask us to delete your enquiry at any time and we will, unless we are required to keep it.",
        ],
      },
      {
        id: "sharing",
        heading: "Who else sees it",
        body: [
          "Our hosting provider processes website request logs. When you choose to send an enquiry, your email provider delivers it to our email provider. The website does not currently submit your form details to a CRM.",
          "The specific processors we use are [TO_CONFIRM_WITH_LEGAL].",
        ],
      },
      {
        id: "rights",
        heading: "Your rights",
        body: [
          "You can ask us what personal information we hold about you, ask us to correct it, or ask us to delete it. Write to the email address on our contact page and we will respond.",
          "Rights under India's Digital Personal Data Protection Act, and how they apply to enquiries from outside India, are [TO_CONFIRM_WITH_LEGAL].",
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        body: [
          "If we change how we handle personal information, we will update this page and change the date at the top. Material changes will be explained rather than quietly edited in.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    updated: "2026-08-26",
    intro:
      "These terms cover the use of this website. They do not cover client engagements, which are governed by the separate agreement we sign with you.",
    sections: [
      {
        id: "using",
        heading: "Using this site",
        body: [
          "You are welcome to read, link to and share anything published here. Please do not attempt to disrupt the site, scrape it at a volume that affects other people, or use it to send unsolicited messages.",
        ],
      },
      {
        id: "content",
        heading: "Our content",
        body: [
          "The writing, design, code and diagrams on this site belong to Pixelcliq Media unless stated otherwise. You may quote from our articles with attribution and a link. Republishing them in full is not permitted without asking.",
          "Client work shown on this site is published with that client's permission and remains their property.",
        ],
      },
      {
        id: "no-advice",
        heading: "What this site is not",
        body: [
          "Everything here is general commentary on marketing and commerce. It is not legal, financial or tax advice, and it is not a recommendation tailored to your business.",
          "Nothing on this site is a guarantee of any result. Where we describe outcomes, they are outcomes for a specific brand in a specific period and are not a prediction for yours.",
        ],
      },
      {
        id: "enquiries",
        heading: "Enquiries and quotes",
        body: [
          "Submitting the contact form does not create a contract or oblige either of us to anything. Any engagement begins only when we both sign a written agreement setting out scope, fees and term.",
        ],
      },
      {
        id: "liability",
        heading: "Liability",
        body: [
          "We take reasonable care to keep this site accurate and available, but we do not promise it will be uninterrupted or error-free.",
          "The limits of our liability, and the extent to which they can be limited under Indian law, are [TO_CONFIRM_WITH_LEGAL].",
        ],
      },
      {
        id: "law",
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of India, with courts in [TO_CONFIRM_WITH_LEGAL] having jurisdiction.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    updated: "2026-08-26",
    intro:
      "This page explains what cookies this website uses. At the moment the honest answer is: none of our own.",
    sections: [
      {
        id: "what",
        heading: "What cookies are",
        body: [
          "Cookies are small files a website stores in your browser. Some are necessary for a site to work at all; others measure how a site is used or follow you between sites.",
        ],
      },
      {
        id: "what-we-use",
        heading: "What this site uses",
        body: [
          "This website currently sets no cookies of its own. It runs no advertising pixels and no third-party analytics.",
          "Our hosting provider may set a strictly necessary cookie for security or load balancing. Necessary cookies of that kind do not require consent, because the site cannot be delivered safely without them.",
        ],
      },
      {
        id: "future",
        heading: "If that changes",
        body: [
          "We expect to add analytics so we can see which pages are useful. When we do, this page will be updated first, non-essential cookies will be off until you consent, and declining will not degrade the site.",
          "The tooling and the consent mechanism we intend to use are [TO_CONFIRM_WITH_LEGAL].",
        ],
      },
      {
        id: "managing",
        heading: "Managing cookies",
        body: [
          "Every major browser lets you view, block and delete cookies from its settings. Blocking necessary cookies may stop parts of some websites working, though it will not affect this one today.",
        ],
      },
    ],
  },
];

export const legalBySlug = new Map(legalDocuments.map((doc) => [doc.slug, doc]));
