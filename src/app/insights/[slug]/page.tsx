import type { Metadata } from "next";
import { buildMetadata, absoluteUrl, SITE_URL } from "@/lib/seo";
import {
  jsonLdScriptProps,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import { notFound } from "next/navigation";
import journalStyles from "@/components/insights/InsightsIndex.module.css";
import Link from "next/link";
import { BalancedHeading } from "@/components/ui/BalancedHeading";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { ShareRail } from "@/components/insights/ShareRail";
import { insights } from "@/content/insights";
import { insightsPage, insightsSection } from "@/content/home";


/**
 * The article template.
 *
 * Drafts render too: the outline is real editorial intent, so the page states
 * plainly that the piece is unfinished and shows what it will cover rather than
 * 404-ing on a slug the index links to.
 */
export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

/**
 * Draft articles are excluded from the index deliberately.
 *
 * The route still renders — a direct link works, and the page says plainly
 * that the piece is unpublished — but a draft is thin by definition, and
 * inviting a crawler to index it earns a thin-content signal for the whole
 * section. `follow` stays on so the outbound links are still discovered.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((entry) => entry.slug === slug);
  if (!article) return {};

  // Excerpts are written for the index card, where there is room for a longer
  // line. Search snippets cut at roughly 160 characters, so trim at the last
  // word boundary before that rather than letting Google clip mid-word.
  const description =
    article.excerpt.length <= 158
      ? article.excerpt
      : `${article.excerpt.slice(0, 155).replace(/\s+\S*$/, "")}…`;

  return buildMetadata({
    title: article.title,
    description,
    path: `/insights/${article.slug}`,
    eyebrow: "Insights",
    ogType: "article",
    noIndex: article.status !== "published",
  });
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = insights.find((entry) => entry.slug === slug);
  if (!article) notFound();

  const url = absoluteUrl(`/insights/${article.slug}`);

  // Article schema only for published pieces with a real date. A draft has no
  // publication date to state, and inventing one to satisfy a required field
  // would be fabricating the record of when we said something.
  const articleLd =
    article.status === "published" && article.publishedAt
      ? articleSchema({
          siteUrl: SITE_URL,
          headline: article.title,
          description: article.excerpt,
          url,
          datePublished: article.publishedAt,
          image: article.cover ? absoluteUrl(article.cover) : undefined,
        })
      : null;

  const published = article.status === "published" && article.body;
  const related = insights
    .filter((entry) => entry.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      {articleLd ? <script {...jsonLdScriptProps(articleLd)} /> : null}
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Insights", url: absoluteUrl("/insights") },
            { name: article.title, url },
          ]),
        )}
      />
      {published ? <ReadingProgress /> : null}

      <Section
        tone="bone"
        spacing="tight"
        className="pt-[calc(var(--header-height)+4rem)]"
        aria-labelledby="article-heading"
        data-page-hero
        data-dark-hero
      >
        <Container variant="prose">
          <Eyebrow as="p">{article.category}</Eyebrow>
          <BalancedHeading
            level={1}
            size="h1"
            id="article-heading"
            className="mt-6"
          >
            {article.title}
          </BalancedHeading>

          <div className="type-caption mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
            {article.publishedAt ? (
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            ) : null}
            {article.readingTime ? <span>{article.readingTime}</span> : null}
            <span>{article.author}</span>
          </div>
        </Container>

        <Container className="mt-10">
          <div className={journalStyles.cover} aria-hidden="true"><div className={journalStyles.coverMeta}>PIXELCLIQ FIELD NOTES <span>{article.category.toUpperCase()}</span></div><strong>IDEAS INTO<br/><em>ACTION.</em></strong><div className={journalStyles.coverBottom}><span>CREATIVE / COMMERCE / GROWTH</span><span>↗</span></div></div>
        </Container>
      </Section>

      <Section tone="bone" aria-label="Article">
        <Container>
          <div className="relative lg:grid lg:grid-cols-12 lg:gap-10">
            {/* Sticky on desktop, inline above the text on mobile. */}
            <div className="lg:col-span-2">
              <ShareRail title={article.title} slug={article.slug} />
            </div>

            <div className="lg:col-span-8 lg:col-start-4">
              <div className="mx-auto max-w-prose">
                {published && article.body ? (
                  <ArticleBody blocks={article.body} />
                ) : (
                  <div className="mt-8">
                    <p className="type-body-sm rounded-md border border-line p-5 text-ink-soft">
                      {insightsPage.draftNotice}
                    </p>
                    <p className="type-body-lg mt-8 leading-[1.7] text-ink-soft">
                      {article.excerpt}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="related-heading">
        <Container>
          <Eyebrow as="h2" id="related-heading">
            {insightsPage.relatedLabel}
          </Eyebrow>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((entry) => (
              <li key={entry.slug}>
                <Link href={`/insights/${entry.slug}`} className="group/rel block">
                  <span className="type-label text-ink-muted">
                    {entry.category}
                  </span>
                  <span className="type-h3 mt-2 block">
                    <span className="relative inline">
                      {entry.title}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-expo group-hover/rel:scale-x-100 group-focus-visible/rel:scale-x-100"
                      />
                    </span>
                  </span>
                  <span className="type-caption mt-3 block">
                    {entry.readingTime ?? insightsSection.pendingLabel}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

    </>
  );
}
