import type { Metadata } from "next";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { jsonLdScriptProps, breadcrumbSchema } from "@/lib/schema";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BalancedHeading } from "@/components/ui/BalancedHeading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { CaseGallery } from "@/components/work/CaseGallery";
import { CasePlaceholderMedia } from "@/components/work/CasePlaceholderMedia";
import { caseStudies } from "@/content/cases";
import { selectedWork, workPage } from "@/content/home";
import { pillarsById } from "@/content/services";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholders";
import { RATIO_CSS } from "@/lib/ratio";

/**
 * The case study template.
 *
 * Both statuses render from one component. `pending` is decided once at the
 * top and each section branches on it exactly once, rather than threading
 * conditionals through every line — that is what keeps a template readable when
 * half its data is still tokens.
 *
 * Nothing is fabricated in either state. In placeholder mode the metrics stay
 * bracketed, the results block says what it is waiting for, and the quote is
 * removed entirely rather than shown with an empty attribution.
 */
export function generateStaticParams() {
  return caseStudies.map((entry) => ({ slug: entry.slug }));
}

/**
 * Placeholder cases are noindex, and there is no negotiating this one.
 *
 * Every case study is currently `placeholder`: the client name, the numbers
 * and the imagery are all bracketed tokens. The page is honest about that on
 * screen, but submitting six near-identical stub pages to a search engine is
 * how a young site earns a thin-content problem across its whole domain. They
 * become indexable the moment a real case is published — the flag flips with
 * the data, not by hand.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = caseStudies.find((item) => item.slug === slug);
  if (!entry) return {};

  const pending = entry.status !== "published";
  const client = isPlaceholder(entry.client) ? "Case study" : entry.client;

  return buildMetadata({
    title: pending ? `${client} — in progress` : `${client} — ${entry.industry}`,
    description: pending
      ? "This case study is being written up. It publishes once the work is complete and the client has cleared the numbers."
      : entry.headline,
    path: `/work/${entry.slug}`,
    eyebrow: "Work",
    noIndex: pending,
  });
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = caseStudies.find((item) => item.slug === slug);
  if (!entry) notFound();

  const pending = entry.status !== "published";
  const index = caseStudies.findIndex((item) => item.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const caseUrl = absoluteUrl(`/work/${entry.slug}`);
  // Each block renders only if its data is real. A pending case has bracketed
  // tokens in every one of these fields, and printing them turned the template
  // into a form full of "[CLIENT_NAME]" rather than a page that says, plainly,
  // that the write-up is not finished.
  const hasAttribution =
    !isPlaceholder(entry.client) && !isPlaceholder(entry.industry);
  const hasTimeframe = !isPlaceholder(entry.timeframe);
  const hasResults = entry.results.some(
    (r) => !isPlaceholder(r.metric) && !isPlaceholder(r.label),
  );
  const hasProblem = !isPlaceholder(entry.problem);
  const hasStrategy = entry.strategy.some((step) => !isPlaceholder(step));
  const caseLabel = isPlaceholder(entry.client) ? "Case study" : entry.client;

  const services = entry.services
    .map((id) => pillarsById.get(id))
    .filter((pillar) => pillar !== undefined);

  const quoteReady = Boolean(
    entry.quote &&
      !isPlaceholder(entry.quote.text) &&
      !isPlaceholder(entry.quote.author),
  );

  /**
   * The quote section is conditional, so everything after it has to take its
   * tone from whether it rendered. Hard-coding the tail leaves two sand bands
   * touching whenever a case has no publishable quote — which is every case
   * today.
   */
  const nextTone = quoteReady ? "sand" : "bone";
  const ctaTone = quoteReady ? "bone" : "sand";

  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Work", url: absoluteUrl("/work") },
            { name: caseLabel, url: caseUrl },
          ]),
        )}
      />
      {/* 1 — HERO */}
      <Section
        tone="bone"
        spacing="tight"
        className="pt-[calc(var(--header-height)+4rem)]"
        aria-labelledby="case-heading"
      >
        <Container>
          <Eyebrow as="p">
            {hasAttribution ? `${entry.client} · ${entry.industry}` : caseLabel}
          </Eyebrow>

          <BalancedHeading
            level={1}
            size="display"
            id="case-heading"
            className="mt-6 max-w-[18ch]"
          >
            {pending ? selectedWork.placeholderHeadline : entry.headline}
          </BalancedHeading>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {services.map((pillar) => (
                <li key={pillar.id}>
                  <Link
                    href={pillar.slug}
                    className="target-44 type-caption text-accent-deep underline decoration-accent-deep/40 underline-offset-4 hover:decoration-accent-deep focus-visible:decoration-accent-deep"
                  >
                    {pillar.title}
                  </Link>
                </li>
              ))}
            </ul>
            {hasTimeframe ? (
              <span className="type-caption">{entry.timeframe}</span>
            ) : null}
            {entry.website ? (
              <a
                href={entry.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-bone hover:bg-accent hover:text-white transition-colors duration-200"
              >
                <span>Live Project</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </Container>

        {/* Full-bleed cover, drifting on scroll. */}
        <div className="mt-12 overflow-hidden">
          <Parallax speed={0.2}>
            <div
              style={{ aspectRatio: RATIO_CSS["16:9"] }}
              className="relative w-full border-y border-line overflow-hidden bg-sand"
            >
              {pending ? (
                <CasePlaceholderMedia />
              ) : (
                <Image
                  src={entry.cover}
                  alt={entry.headline}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1920px"
                  className="object-cover"
                />
              )}
            </div>
          </Parallax>
        </div>
      </Section>

      {/* 2 — AT A GLANCE */}
      {hasResults ? (
      <Section tone="sand" spacing="tight" aria-labelledby="glance-heading">
        <Container>
          <Eyebrow as="h2" id="glance-heading">
            At a glance
          </Eyebrow>
          <dl className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {entry.results.map((result, position) => (
              <div
                key={`${result.label}-${position}`}
                className="min-w-0 border-b border-line py-6 sm:pr-8"
              >
                <dt className="type-caption">{result.label}</dt>
                {/* CountUp renders any non-numeric value verbatim and never
                    animates it, which is what keeps this row honest. */}
                {/* overflow-wrap:anywhere, not break-words. A metric is
                    arbitrary data rendered at display size, and a token like
                    "[RESULT_METRIC]" or "₹1,24,00,000" has no space to break
                    at. break-word wraps the text but does NOT reduce the
                    element's min-content width, so the grid track above still
                    sizes to the unbroken string and pushes the page wide;
                    anywhere affects intrinsic sizing too. */}
                <dd className="type-h1 mt-2 [overflow-wrap:anywhere] text-ink">
                  <CountUp value={result.metric} />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
      ) : null}

      {/* 3 — THE CHALLENGE */}
      {hasProblem ? (
      <Section tone="bone" aria-labelledby="challenge-heading">
        <Container variant="prose">
          <Eyebrow as="p">The challenge</Eyebrow>
          <h2 id="challenge-heading" className="type-h1 mt-5 max-w-[16ch]">
            What we were asked to fix.
          </h2>
          <p className="type-body-lg mt-8 text-ink-soft">{entry.problem}</p>
        </Container>
      </Section>
      ) : null}

      {/* 4 — THE APPROACH */}
      {hasStrategy ? (
      <Section tone="sand" aria-labelledby="approach-heading">
        <Container>
          <Eyebrow as="p">The approach</Eyebrow>
          <h2 id="approach-heading" className="type-h1 mt-5 max-w-[16ch]">
            What we actually did.
          </h2>

          <ol className="mt-12 border-t border-line">
            {entry.strategy.map((step, position) => (
              <li
                key={`${step}-${position}`}
                className="grid gap-6 border-b border-line py-8 lg:grid-cols-12 lg:gap-10"
              >
                <span className="type-label text-accent-deep tabular-nums lg:col-span-2">
                  {String(position + 1).padStart(2, "0")}
                </span>
                <p className="type-body-lg text-ink-soft lg:col-span-7">
                  {step}
                </p>
                {/* An inline frame breaks the column asymmetrically on the
                    middle step, rather than beside every one. */}
                {position === 1 ? (
                  <div className="lg:col-span-3">
                    <div
                      style={{ aspectRatio: RATIO_CSS["4:5"] }}
                      className="overflow-hidden rounded-md border border-line"
                    >
                      <CasePlaceholderMedia />
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      ) : null}

      {/* 5 — THE WORK */}
      <Section tone="bone" aria-labelledby="work-heading">
        <Container>
          <Eyebrow as="h2" id="work-heading">
            The work
          </Eyebrow>
          <div className="mt-8">
            <CaseGallery entry={entry} />
          </div>
        </Container>
      </Section>

      {/* 6 — THE RESULT */}
      <Section tone="sand" aria-labelledby="result-heading">
        <Container variant="narrow">
          <Eyebrow as="p">The result</Eyebrow>
          {pending ? (
            <>
              <h2 id="result-heading" className="type-h1 mt-5 max-w-[16ch]">
                {workPage.resultsPending}
              </h2>
              <p className="type-body-lg mt-6 max-w-measure text-ink-soft">
                {workPage.note}
              </p>
            </>
          ) : (
            <>
              <h2 id="result-heading" className="type-h1 mt-5 max-w-[16ch]">
                {entry.headline}
              </h2>
              <dl className="mt-10 grid border-t border-line sm:grid-cols-2">
                {entry.results.map((result, position) => (
                  <div
                    key={`${result.label}-${position}`}
                    className="min-w-0 border-b border-line py-6 sm:pr-8"
                  >
                    <dt className="type-caption">{result.label}</dt>
                    <dd className="type-h2 mt-2">{result.metric}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </Container>
      </Section>

      {/* 7 — QUOTE. Removed entirely unless it is real and attributable. */}
      {quoteReady && entry.quote ? (
        <Section tone="bone" aria-label="Client quote">
          <Container variant="narrow">
            <blockquote>
              <p className="type-emphasis text-[clamp(1.75rem,4vw,3rem)] leading-[1.2] text-ink">
                {entry.quote.text}
              </p>
              <footer className="type-caption mt-8">
                {entry.quote.author} · {entry.quote.role} · {entry.client}
              </footer>
            </blockquote>
          </Container>
        </Section>
      ) : null}

      {/* 8 — NEXT CASE */}
      {next ? (
        <Section tone={nextTone} spacing="tight" aria-label="Next case study">
          <Container>
            <Link href={`/work/${next.slug}`} className="group/next block">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div
                    style={{ aspectRatio: RATIO_CSS["16:9"] }}
                    className="overflow-hidden rounded-md border border-line"
                  >
                    <div className="size-full transition-transform duration-500 ease-expo group-hover/next:scale-[1.05] group-focus-visible/next:scale-[1.05]">
                      <CasePlaceholderMedia />
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <Eyebrow as="p">{workPage.nextLabel}</Eyebrow>
                  <p className="type-h1 mt-4 max-w-[18ch]">
                    {next.status === "published"
                      ? next.headline
                      : selectedWork.placeholderHeadline}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="type-display hidden text-accent transition-transform duration-500 ease-expo group-hover/next:translate-x-3 group-focus-visible/next:translate-x-3 lg:col-span-1 lg:block"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          </Container>
        </Section>
      ) : null}

      {/* 9 — CTA */}
      <Section tone={ctaTone} spacing="tight" aria-labelledby="case-cta-heading">
        <Container variant="narrow" className="text-center">
          <h2 id="case-cta-heading" className="type-h1 mx-auto max-w-[16ch]">
            Want this for your brand?
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
