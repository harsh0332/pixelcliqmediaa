import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BalancedHeading } from "@/components/ui/BalancedHeading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import { closingCta, numbersPage } from "@/content/home";
import { HAS_VERIFIED_STATS, site } from "@/content/site";
import { stats } from "@/content/stats";
import { cn } from "@/lib/utils";
import { isPlaceholder } from "@/lib/placeholders";

export const metadata: Metadata = buildMetadata({
  title: "Numbers",
  description:
    "What we measure and how we report it. Results appear here only once they are real, verified and cleared by the client — never as illustrative placeholders.",
  path: "/numbers",
  noIndex: !HAS_VERIFIED_STATS,
  eyebrow: "Numbers",
});


/**
 * /numbers
 *
 * A stats page with no stats on it yet, and that is the point. Every value ships
 * as [VALUE]; CountUp renders any non-numeric value verbatim and never animates
 * it, so this page cannot accidentally tick up to a fabricated figure.
 *
 * The measurement stance at the foot is the actual content today. Stating what
 * we would count, over what window, and what we will not claim is a stronger
 * signal to a burned founder than a number they have no way to audit.
 */
export default function NumbersPage() {
  // A stat is publishable only once its value is a real figure. All eight are
  // still bracketed, so the list is replaced by a single honest statement.
  const hasNumbers = stats.some((stat) => !isPlaceholder(stat.value));

  return (
    <>
      <Section
        tone="bone"
        className="pt-[calc(var(--header-height)+4rem)]"
        aria-labelledby="numbers-heading"
      >
        <Container>
          <Eyebrow as="p">{numbersPage.eyebrow}</Eyebrow>
          <BalancedHeading
            level={1}
            size="display"
            id="numbers-heading"
            className="mt-6 max-w-[14ch]"
          >
            {numbersPage.headline}
          </BalancedHeading>
          <p className="type-body-lg mt-8 max-w-measure text-ink-soft">
            {numbersPage.support}
          </p>
        </Container>
      </Section>

      <Section tone="bone" spacing="tight" aria-label="Statistics">
        <Container>
          {hasNumbers ? (
          <ul className="border-t border-line">
            {stats.map((stat, index) => (
              <li
                key={stat.id}
                className={cn(
                  "grid gap-4 border-b border-line py-10 lg:grid-cols-12 lg:items-baseline lg:gap-10",
                  // Asymmetric rather than a neat grid: every third row is
                  // indented, so the column of huge type has a rhythm.
                  index % 3 === 1 && "lg:pl-[16%]",
                  index % 3 === 2 && "lg:pl-[8%]",
                )}
              >
                <span className="type-display text-ink lg:col-span-5">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="lg:col-span-6">
                  <span className="type-h3 block">{stat.label}</span>
                  <span className="type-caption mt-2 block max-w-measure">
                    {stat.context}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          ) : (
            <div className="border-t border-line pt-10">
              <p className="type-h2 max-w-[20ch]">
                {numbersPage.emptyState.line}
              </p>
              <p className="type-body-lg mt-6 max-w-measure text-ink-soft">
                {numbersPage.emptyState.body}
              </p>
              <Link
                href={numbersPage.emptyState.linkHref}
                className="group/link type-button mt-10 inline-flex min-h-11 items-center gap-2 text-accent-deep"
              >
                {numbersPage.emptyState.linkLabel}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-expo group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          )}
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="stance-heading">
        <Container variant="prose">
          <Eyebrow as="p">{numbersPage.stanceEyebrow}</Eyebrow>
          <h2 id="stance-heading" className="type-h1 mt-5 max-w-[16ch]">
            What a number here will mean.
          </h2>
          <div className="mt-8 space-y-6">
            {numbersPage.stance.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="type-body-lg text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="bone" spacing="tight" aria-labelledby="numbers-cta-heading">
        <Container variant="narrow" className="text-center">
          <h2 id="numbers-cta-heading" className="type-h1 mx-auto max-w-[14ch]">
            {closingCta.headline}
          </h2>
          <div className="mt-8">
            <Button href={site.primaryCta.href} size="lg">
              {site.primaryCta.label}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
