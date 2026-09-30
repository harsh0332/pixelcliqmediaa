/**
 * JSON-LD helpers.
 *
 * Structured data is only ever built from verified facts. Nothing here invents
 * ratings, review counts, awards or client relationships — schema that claims
 * more than the business can prove is a liability, not an SEO win.
 */

export interface JsonLdNode {
  "@context"?: string;
  /**
   * Optional: a `@graph` container declares several entities at once and
   * carries no type of its own.
   */
  "@type"?: string;
  [key: string]: unknown;
}

const SCHEMA_CONTEXT = "https://schema.org";

/** Bracketed tokens such as [TO_CONFIRM] or [CLIENT_NAME]. */
const PLACEHOLDER_TOKEN = /\[[A-Z0-9_]+\]/;

/** Attach the schema.org context to a node if it does not already carry one. */
export function withContext<T extends JsonLdNode>(node: T): T {
  return node["@context"] ? node : { ...node, "@context": SCHEMA_CONTEXT };
}

/**
 * Strip keys whose value is undefined, null or an empty string, recursively.
 *
 * Lets callers pass unresolved placeholders (an unpurchased email domain, an
 * unannounced social profile) without emitting empty properties to crawlers.
 */
export function pruneEmpty<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map(pruneEmpty)
      .filter((item) => item !== undefined && item !== null) as T;
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, val]) => [key, pruneEmpty(val)] as const)
      .filter(
        ([, val]) => val !== undefined && val !== null && val !== "",
      );
    return Object.fromEntries(entries) as T;
  }

  return value;
}

/**
 * Props for a JSON-LD <script> tag.
 *
 * `<` is escaped so a stray string value can never close the script element.
 *
 * @example <script {...jsonLdScriptProps(organizationSchema)} />
 */
export function jsonLdScriptProps(node: JsonLdNode) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(pruneEmpty(withContext(node))).replace(
        /</g,
        "\\u003c",
      ),
    },
  } as const;
}

/* ------------------------------------------------------------------ *
 * Builders
 *
 * Every builder below takes only verified facts. Anything unresolved is
 * passed through `pruneEmpty`, which drops the property rather than
 * emitting a bracketed placeholder to a crawler.
 * ------------------------------------------------------------------ */

/**
 * Stable @id anchors.
 *
 * Nodes reference the organisation and site by @id instead of repeating them,
 * so a crawler resolves one entity across every page rather than treating each
 * page's copy as a separate business.
 */
export const ORG_ID = (siteUrl: string) => `${siteUrl}/#organization`;
export const SITE_ID = (siteUrl: string) => `${siteUrl}/#website`;

export interface OrganizationInput {
  siteUrl: string;
  name: string;
  description: string;
  locality: string;
  region: string;
  country: string;
  /** Omitted unless a complete, real number. */
  telephone?: string;
  /** Omitted unless the domain is registered. */
  email?: string;
  /** Omitted entirely when no real profile URLs exist. */
  sameAs?: string[];
  /** Omitted unless a real logo asset exists — never a placeholder. */
  logo?: string;
}

/**
 * Organization.
 *
 * Deliberately absent, and not by oversight: `foundingDate`,
 * `numberOfEmployees`, `aggregateRating`, `award` and `review`. None of them
 * can be substantiated for a new agency with no completed client work, and
 * each is a claim a crawler will treat as fact. Omission is accurate;
 * invention would be a lie that also risks a manual action.
 */
export function organizationSchema(input: OrganizationInput): JsonLdNode {
  return pruneEmpty({
    "@type": "Organization",
    "@id": ORG_ID(input.siteUrl),
    name: input.name,
    url: `${input.siteUrl}/`,
    description: input.description,
    logo: input.logo,
    address: {
      "@type": "PostalAddress",
      addressLocality: input.locality,
      addressRegion: input.region,
      addressCountry: input.country,
    },
    telephone: input.telephone,
    email: input.email,
    sameAs: input.sameAs?.length ? input.sameAs : undefined,
  });
}

export function webSiteSchema(input: {
  siteUrl: string;
  name: string;
  description: string;
}): JsonLdNode {
  return pruneEmpty({
    "@type": "WebSite",
    "@id": SITE_ID(input.siteUrl),
    url: `${input.siteUrl}/`,
    name: input.name,
    description: input.description,
    publisher: { "@id": ORG_ID(input.siteUrl) },
    inLanguage: "en-IN",
  });
}

/**
 * Service.
 *
 * No `offers` node: the agency does not publish pricing, and an `offers` block
 * without a real price is either empty or invented.
 */
export function serviceSchema(input: {
  siteUrl: string;
  name: string;
  description: string;
  serviceType: string;
  url: string;
}): JsonLdNode {
  return pruneEmpty({
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: input.url,
    provider: { "@id": ORG_ID(input.siteUrl) },
    areaServed: { "@type": "Country", name: "India" },
  });
}

/**
 * Article.
 *
 * `author` is the organisation, not a person: the site does not attribute
 * articles to named individuals, and inventing a byline would be fabrication.
 */
export function articleSchema(input: {
  siteUrl: string;
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}): JsonLdNode {
  return pruneEmpty({
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: input.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: input.image,
    author: { "@id": ORG_ID(input.siteUrl) },
    publisher: { "@id": ORG_ID(input.siteUrl) },
  });
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQPage.
 *
 * Only ever built from questions rendered on the same page. Google requires
 * the answer to be visible to the user, and schema that describes content the
 * visitor cannot see is cloaking.
 */
export function faqSchema(
  items: { question: string; answer: string }[],
): JsonLdNode | null {
  // Never publish an unresolved placeholder as an answer. A visible "[TO_CONFIRM]"
  // is an obvious editing slip a human will catch; the same token inside JSON-LD
  // is invisible on the page and goes straight into a search engine's index as
  // though it were our stated policy. Dropping the entry is the safe failure.
  const publishable = items.filter(
    (item) => !PLACEHOLDER_TOKEN.test(item.question) && !PLACEHOLDER_TOKEN.test(item.answer),
  );
  if (!publishable.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: publishable.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
