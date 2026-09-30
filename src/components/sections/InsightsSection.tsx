import { InsightCover } from "@/components/insights/InsightCover";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EyebrowSweep } from "@/components/motion/EyebrowSweep";
import { Section } from "@/components/ui/Section";
import { STAGGER } from "@/lib/motion";
import { Stagger } from "@/components/motion/Stagger";
import { insights } from "@/content/insights";
import { insightsSection } from "@/content/home";

/**
 * SECTION F — three article cards.
 *
 * Titles and excerpts are real: these are the pieces we intend to write, and
 * they define the editorial position. Everything implying an article already
 * exists — the date, the reading time, the link — is withheld until it does.
 * A card that links to an unwritten piece is a 404 with good typography.
 *
 * Published entries get a real link and a real reading time automatically.
 */
export function InsightsSection() {
  const cards = insights.slice(0, 3);

  return (
    <Section tone="paper" aria-labelledby="insights-heading" id="insights">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow as="p" rule>
          <EyebrowSweep>{insightsSection.eyebrow}</EyebrowSweep>
        </Eyebrow>
            <h2 id="insights-heading" className="type-h1 mt-5 max-w-[16ch]">
              {insightsSection.headline}
            </h2>
          </div>
          <Link
            href="/insights"
            className="group/link type-button inline-flex min-h-11 items-center gap-2 text-accent-deep"
          >
            {insightsSection.linkLabel}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-expo group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>

        <Stagger
          from="left"
          stagger={STAGGER.list}
          className="mt-12 grid gap-8 md:grid-cols-3"
          itemClassName="h-full"
        >
          {cards.map((article) => {
            const published = article.status === "published";

            const content = (
              <>
                <InsightCover slug={article.slug} />

                <Eyebrow as="p" className="mt-5 block">
                  {article.category}
                </Eyebrow>

                <h3 className="type-h3 mt-2">
                  <span className="relative inline">
                    {article.title}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-expo group-hover/card:scale-x-100 group-focus-visible/card:scale-x-100"
                    />
                  </span>
                </h3>

                <p className="type-body-sm mt-3 text-ink-soft">{article.excerpt}</p>

                <span className="type-caption mt-4 block">
                  {published && article.readingTime
                    ? article.readingTime
                    : insightsSection.pendingLabel}
                </span>
              </>
            );

            // A stub is not a link: pointing at an unwritten article is a 404
            // with good typography.
            return published ? (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group/card block cursor-pointer"
              >
                {content}
              </Link>
            ) : (
              <div key={article.slug} className="group/card block">
                {content}
              </div>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
