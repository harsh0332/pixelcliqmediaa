import type { ReactNode } from "react";
import { BalancedHeading } from "@/components/ui/BalancedHeading";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section, type SectionTone } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * The inner-page hero. One component, one motion chain, five variants.
 *
 * Deliberately quieter than the homepage hero: it carries a page, it does not
 * carry the brand. Light, editorial, hairline-driven.
 *
 * What is shared and what is a prop follows the design spec exactly. Shared:
 * the shell, the eyebrow, the masked headline, the support line, the CTA row,
 * the closing hairline and the whole motion chain. Variant: the accent slot
 * beside or below the text, which is passed in as children rather than
 * switched on internally — a variant this page does not render then costs
 * nothing, and PageHero never needs to know what a pillar rail or a contact
 * step actually is.
 *
 * `accent` controls the grid: "side" is the only value that turns on two
 * columns, and only from 1080px. "below" and "none" stay single-column at
 * every width, which is what keeps /about a single measure of type.
 *
 * Motion is CSS (see globals.css). It has to be: the headline lines animate
 * from translateY(120%) inside an overflow-hidden mask, and driving that from
 * JavaScript would ship the H1 off-screen in the server HTML — the same bug
 * the logo had. With CSS the from-state applies at paint and the sequence
 * completes whether or not the bundle ever arrives.
 */
export interface PageHeroProps {
  /** Small label above the headline. */
  eyebrow: string;
  /**
   * One entry per masked line. Line breaks are a design decision, not a
   * measurement — the spec is explicit that these are authored, never split at
   * runtime.
   */
  headlineLines: readonly string[];
  /** The <h1> id, so the section can be labelled by it. */
  id: string;
  /** Optional: a hero built around a diagram or a rail may carry no paragraph. */
  support?: string;
  /** Surface tone. Service pages rotate this so consecutive pages differ. */
  tone?: SectionTone;
  /** Optional call-to-action row, rendered under the support line. */
  ctas?: ReactNode;
  /** Where the variant's own block sits relative to the text. */
  accent?: "side" | "below" | "none";
  /** The variant block itself. Omitted entirely on /about. */
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  headlineLines,
  id,
  support,
  ctas,
  accent = "none",
  tone = "bone",
  children,
  className,
}: PageHeroProps) {
  return (
    <Section
      tone={tone}
      aria-labelledby={id}
      data-page-hero
      className={cn("pt-[calc(var(--header-height)+4rem)]", className)}
    >
      <Container>
        <div
          className={cn(
            accent === "side" &&
              "min-[1080px]:grid min-[1080px]:grid-cols-12 min-[1080px]:items-end min-[1080px]:gap-12",
          )}
        >
          <div className={cn(accent === "side" && "min-[1080px]:col-span-7")}>
            <p data-hero-eyebrow>
              <Eyebrow as="span">{eyebrow}</Eyebrow>
            </p>

            {/*
              One real <h1>. Each line is a masked wrapper with the animated
              span inside, and the wrappers carry vertical padding with a
              matching negative margin so ascenders and the italic serif tail
              are not clipped by overflow: hidden at rest.

              The lines stay a contiguous text run, so the accessible name is
              the whole sentence — nothing is duplicated or aria-label-replaced.
            */}
            <BalancedHeading
              level={1}
              size="display"
              id={id}
              className="mt-6 max-w-[16ch]"
            >
              {headlineLines.map((line, index) => (
                <span
                  key={line}
                  data-hero-line
                  className="block overflow-hidden py-[0.1em] -my-[0.1em]"
                  style={{ ["--hero-i" as string]: index }}
                >
                  <span className="block">{line}</span>
                </span>
              ))}
            </BalancedHeading>

            {support ? (
              <p
                data-hero-support
                className="type-body-lg mt-8 max-w-measure text-ink-soft"
              >
                {support}
              </p>
            ) : null}

            {ctas ? (
              <div data-hero-ctas className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                {ctas}
              </div>
            ) : null}

            <span
              data-hero-rule
              aria-hidden="true"
              className="mt-12 block h-px w-full origin-left bg-line"
            />
          </div>

          {children ? (
            <div
              data-hero-accent
              className={cn(
                accent === "side"
                  ? "mt-12 min-[1080px]:col-span-5 min-[1080px]:mt-0"
                  : "mt-12",
              )}
            >
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
