import Link from "next/link";
import { CommerceFlowDiagram } from "@/components/diagrams/CommerceFlowDiagram";
import { CapabilityList } from "@/components/ui/CapabilityList";
import { SplitCopy } from "@/components/copy/SplitCopy";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { storyBlocks } from "@/content/home";
import { servicePillars } from "@/content/services";

/**
 * BLOCK 1 — a horizontal flow, because this block is about a path.
 *
 * The drawing itself lives in diagrams/CommerceFlowDiagram so the Commerce &
 * Shopify service page can be built around the same one.
 */
export function CommerceFlowBlock() {
  const copy = storyBlocks.commerce;
  const pillar = servicePillars.find((p) => p.id === copy.pillar);

  return (
    <Section data-spine-node tone="bone" spacing="tight" aria-labelledby="story-commerce">
      <Container variant="mid">
        <Eyebrow as="p" tone="muted" data-spine-eyebrow>{copy.eyebrow}</Eyebrow>

        {/* PATTERN C — two-column split. The headline frames on the left, the
            explanation sits right and lands 0.15s behind it, so the reader has
            the shape of the claim before the detail arrives. */}
        <SplitCopy
          className="mt-5"
          frame={
            <h2 id="story-commerce" className="type-h2 max-w-[16ch]">
              {copy.headline}
            </h2>
          }
        >
          {copy.body}
        </SplitCopy>

        <CommerceFlowDiagram className="mt-12 md:mt-14" />

        <div className="mt-12">
          {pillar ? <CapabilityList items={pillar.capabilities} /> : null}
          <Link
            href={pillar?.slug ?? "/services"}
            className="group/link type-button mt-5 inline-flex min-h-11 items-center gap-2 text-accent-deep"
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
      </Container>
    </Section>
  );
}
