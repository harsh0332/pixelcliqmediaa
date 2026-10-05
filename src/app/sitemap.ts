import { HAS_VERIFIED_STATS } from "@/content/site";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { servicePillars } from "@/content/services";
import { publishedCaseStudies } from "@/content/cases";
import { publishedInsights } from "@/content/insights";

/**
 * The sitemap lists what we want indexed — which is not the same as every
 * route that resolves.
 *
 * Unpublished case studies and draft articles are excluded, matching the
 * `noindex` those pages already send. A sitemap that invites a crawler to
 * pages whose meta tags then refuse it is a contradiction Search Console
 * reports as an error, and stub pages submitted in bulk are how a new domain
 * acquires a thin-content reputation. Both lists fill in as content ships;
 * nothing here needs editing when they do.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/approach", priority: 0.8, changeFrequency: "monthly" },
    { path: "/studio-zero", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    { path: "/creative-showcase", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ai-video-creative", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
    ...(HAS_VERIFIED_STATS ? [{ path: "/numbers", priority: 0.5, changeFrequency: "monthly" as const }] : []),
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),

    // Service pages are the commercial core of the site: highest priority
    // after the home page, and the pages most worth recrawling.
    ...servicePillars.map((pillar) => ({
      url: `${SITE_URL}${pillar.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: pillar.primary ? 0.8 : 0.6,
    })),

    ...publishedCaseStudies.map((entry) => ({
      url: `${SITE_URL}/work/${entry.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    // `publishedAt` is the article's own date, so a recrawl is prompted by the
    // content changing rather than by the build running.
    ...publishedInsights.map((article) => ({
      url: `${SITE_URL}/insights/${article.slug}`,
      lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
