import type { Metadata } from "next";

/**
 * Canonical origin for the site.
 *
 * The production domain is not registered yet, so this is environment-driven
 * rather than hardcoded — set NEXT_PUBLIC_SITE_URL once the domain is live and
 * every canonical, Open Graph and JSON-LD URL follows automatically.
 */
export const SITE_NAME = "Pixelcliq Media";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://pixelcliqmedia.com")
).replace(/\/$/, "");

/** Resolve a root-relative path against the canonical origin. */
export function absoluteUrl(path = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * URL for the Open Graph share image (always returns absolute HTTPS URL).
 */
export function ogImagePath(input: { title: string; eyebrow?: string }): string {
  const params = new URLSearchParams({ title: input.title });
  if (input.eyebrow) params.set("eyebrow", input.eyebrow);
  return absoluteUrl(`/api/og?${params.toString()}`);
}

export interface PageSeoInput {
  title: string;
  description: string;
  /** Root-relative path, used for the canonical and Open Graph URLs. */
  path?: string;
  /** Root-relative path to the social share image. */
  image?: string;
  /** Keep the page out of the index (thank-you pages, drafts, staging). */
  noIndex?: boolean;
  /** Overrides for anything not covered above. */
  extra?: Metadata;
  /** Small label above the title on the share card. */
  eyebrow?: string;
  /** Share-card headline, when the meta title is too long to set large. */
  ogTitle?: string;
  /** "article" for insight pages, "website" everywhere else. */
  ogType?: "website" | "article";
}

/**
 * Build a page's Metadata object with canonical, Open Graph and Twitter tags
 * derived from a single source. Copy is always passed in by the caller, never
 * baked in here.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
  extra,
  eyebrow,
  ogTitle,
  ogType = "website",
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? ogImagePath({ title: ogTitle ?? title, eyebrow });

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      locale: "en_IN",
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    // noindex, but still follow: a page we do not want ranked is usually a
    // draft or a utility page, and its outbound links are still worth
    // discovering. "nofollow" would strand everything it links to.
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    ...extra,
  };
}
