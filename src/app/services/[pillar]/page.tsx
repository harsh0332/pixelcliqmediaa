import type { Metadata } from "next";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { SITE_URL } from "@/lib/seo";
import {
  jsonLdScriptProps,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/schema";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { caseStudies } from "@/content/cases";
import { creativesForPillar } from "@/content/creatives";
import { primaryPillars, servicePillars } from "@/content/services";

/**
 * One template, eight routes.
 *
 * Every string on the page comes from services.ts — there is no copy in this
 * file. Adding a service is a data change, and a page cannot drift from the
 * pillar it describes because there is one source for both.
 */
export function generateStaticParams() {
  return servicePillars.map((pillar) => ({
    pillar: pillar.slug.replace("/services/", ""),
  }));
}

/**
 * Title and description are pulled from services.ts, never written here — the
 * same rule the page body follows. `promise` is already a one-sentence summary
 * of the pillar, which is exactly what a search result needs.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = servicePillars.find(
    (entry) => entry.slug.replace("/services/", "") === slug,
  );
  if (!pillar) return {};

  // `promise` is a single short line — good on the page under a heading, but
  // roughly 45 characters, which wastes most of a search snippet. Pairing it
  // with the pillar's own summary fills the snippet without writing new copy
  // here, and truncation stays inside the second sentence where it costs least.
  const description = `${pillar.promise} ${pillar.summary}`
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 158);

  return buildMetadata({
    title: pillar.title,
    description,
    path: pillar.slug,
    eyebrow: "Services",
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  // Next 16: route params are async.
  const { pillar: slug } = await params;
  const pillar = servicePillars.find(
    (entry) => entry.slug === `/services/${slug}`,
  );
  if (!pillar) notFound();

  const related = creativesForPillar(pillar.id, pillar.parent);
  const owner = pillar.primary ? pillar.id : (pillar.parent ?? pillar.id);
  const cases = caseStudies.filter((entry) => entry.services.includes(owner));

  // Traversal: the next pillar, so a reader can walk the whole system.
  const currentIndex = primaryPillars.findIndex((entry) => entry.id === owner);
  // The tour: 01 → 02 → … → 06 → 01. Modulo, so the last page points home.
  const next = primaryPillars[(currentIndex + 1) % primaryPillars.length]!;

  const url = absoluteUrl(pillar.slug);

  // FAQPage is built from the same array the Accordion renders below, so the
  // schema can never describe a question the visitor cannot see on the page.
  const faq = faqSchema(
    pillar.faq.map((entry) => ({
      question: entry.q,
      answer: entry.a,
    })),
  );

  return (
    <>
      <script
        {...jsonLdScriptProps(
          serviceSchema({
            siteUrl: SITE_URL,
            name: pillar.title,
            description: pillar.promise,
            serviceType: pillar.title,
            url,
          }),
        )}
      />
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Services", url: absoluteUrl("/services") },
            { name: pillar.title, url },
          ]),
        )}
      />
      {faq ? <script {...jsonLdScriptProps(faq)} /> : null}

      <ServicePageTemplate pillar={pillar} next={next} related={related} cases={cases} />
    </>
  );
}
