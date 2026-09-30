import Link from "next/link";
import { BalancedHeading } from "@/components/ui/BalancedHeading";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { STAGGER } from "@/lib/motion";
import { FadeUp } from "@/components/motion/FadeUp";
import { Stagger } from "@/components/motion/Stagger";
import { seoIndex, storyBlocks } from "@/content/home";
import { servicePillars } from "@/content/services";

/**
 * BLOCK 4 — type-led, with no diagram at all.
 *
 * This is the only block without a graphic, and that is the treatment. After a
 * flow, an equation and a schematic, a fourth diagram would read as a habit
 * rather than a decision — the restraint is what resets the rhythm before the
 * page closes. A compact index carries the substance instead.
 *
 * A Server Component: nothing here needs state, and the rows reveal through the
 * existing Stagger primitive.
 */
export function SeoBlock() {
  const copy = storyBlocks.seo;
  const pillar = servicePillars.find((p) => p.id === copy.pillar);

  return (
    <Section data-spine-node tone="sand" spacing="tight" aria-labelledby="story-seo">
      <Container variant="mid">
        <FadeUp from="right">
          <Eyebrow as="p" tone="muted" data-spine-eyebrow>{copy.eyebrow}</Eyebrow>
        </FadeUp>

        <FadeUp from="right" delay={0.05}>
          <BalancedHeading
            level={2}
            size="h1"
            emphasis={copy.emphasis}
            id="story-seo"
            className="mt-6 max-w-[15ch]"
          >
            {copy.headline}
          </BalancedHeading>
        </FadeUp>

        <FadeUp from="right" delay={0.1}>
          <p className="type-body-lg mt-6 max-w-measure text-ink-soft">
            {copy.body}
          </p>
        </FadeUp>

        <Stagger stagger={STAGGER.list} from="right" className="mt-12 grid border-t border-line md:grid-cols-2 md:gap-x-12">
          {seoIndex.map((entry) => (
            <div
              key={entry.title}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-5"
            >
              <span className="type-h3">{entry.title}</span>
              <span className="type-caption">{entry.clarifier}</span>
            </div>
          ))}
        </Stagger>

        <FadeUp>
          <Link
            href={pillar?.slug ?? "/services"}
            className="group/link type-button mt-10 inline-flex min-h-11 items-center gap-2 text-accent-deep"
          >
            {copy.linkLabel}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-expo group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </FadeUp>
      </Container>
    </Section>
  );
}
