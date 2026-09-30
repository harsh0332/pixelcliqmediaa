import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * `/api` is disallowed with one deliberate exception: `/api/og`, which serves
 * the Open Graph card. Blocking it would stop crawlers fetching the preview
 * image they were just told to use, and the link would unfurl blank.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
        disallow: ["/styleguide", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
