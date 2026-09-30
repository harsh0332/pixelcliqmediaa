import Link from "next/link";
import { AutomationSchematic } from "@/components/diagrams/AutomationSchematic";
import { CapabilityList } from "@/components/ui/CapabilityList";
import { FadeUp } from "@/components/motion/FadeUp";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { storyBlocks } from "@/content/home";
import { servicePillars } from "@/content/services";

/**
 * BLOCK 3 — a left-aligned infrastructure schematic, because this block is
 * about plumbing.
 *
 * Drawn as a technical diagram, not an illustration: 1px connectors with real
 * right-angle bends, small square junctions, tracked uppercase labels. On entry
 * an accent line draws down the path once and each junction lights as the
 * signal reaches it. Once — a looping pulse would be an ambient animation, and
 * this one is making a point about a signal arriving.
 *
 * Explicitly absent, and staying absent: robot mascots, brain graphics,
 * sparkles, glowing orbs, "powered by AI" badges, neon. The diagram is
 * hairlines and one accent, like everything else on the site.
 */

/** Fixed row height, so the SVG geometry and the HTML labels stay in register. */
export function AutomationBlock() {
  const copy = storyBlocks.automation;
  const pillar = servicePillars.find((p) => p.id === copy.pillar);

  return (
    <Section data-spine-node tone="inverse" spacing="default" aria-labelledby="story-automation">
      <Container variant="mid">
        {/* Diagram first, text beside it. Block 1 puts its flow beneath the
            copy and block 2 offsets its column to the right; leading with the
            rail keeps this one structurally its own. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <AutomationSchematic className="lg:col-span-5" />

          <div className="lg:col-span-7">
            <FadeUp from="left">
              <Eyebrow as="p" tone="muted" data-spine-eyebrow>{copy.eyebrow}</Eyebrow>
              <h2 id="story-automation" className="type-h2 mt-5 max-w-[18ch]">
                {copy.headline}
              </h2>
            </FadeUp>
            <p className="type-body-lg mt-5 max-w-measure text-ink-soft">
              {copy.body}
            </p>

            {pillar ? (
              <CapabilityList items={pillar.capabilities} className="mt-8" />
            ) : null}

            <Link
              href={pillar?.slug ?? "/services"}
              className="group/link type-button mt-6 inline-flex min-h-11 items-center gap-2 text-[var(--link-color)]"
            >
              {copy.linkLabel}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-expo group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
