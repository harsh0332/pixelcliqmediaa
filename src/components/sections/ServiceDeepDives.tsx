import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceRow } from "@/components/sections/ServiceRow";
import { ServiceVisual } from "@/components/sections/ServiceVisual";
import { storyBlocks } from "@/content/home";
import { primaryPillars } from "@/content/services";

/**
 * Deep-dive rows for the pillars the story blocks do not cover.
 *
 * The homepage has three layers that all describe services: the index above,
 * these rows, and the four story blocks below. Rendering all six pillars here
 * meant four of them appeared three times on one page — the same argument in
 * three formats, roughly two thousand pixels of repetition, and by the third
 * row the structure was doing the reading for you.
 *
 * So this layer now handles only what the story blocks leave out. Every pillar
 * still gets one substantial treatment on the homepage; none gets three. The
 * filter is derived from storyBlocks rather than hardcoded, so adding a story
 * block automatically removes its duplicate row.
 *
 * Driven by the same servicePillars entries as the index, so the layers cannot
 * drift. Spacing is `tight`: at default rhythm these rows add roughly a
 * thousand pixels of padding alone.
 */
export function ServiceDeepDives() {
  const covered = new Set(
    Object.values(storyBlocks).map((block) => block.pillar),
  );
  const pillars = primaryPillars.filter((pillar) => !covered.has(pillar.id));

  return (
    <>
      {pillars.map((pillar, index) => {
        const reversed = index % 2 === 1;
        return (
          <Section
            key={pillar.id}
            id={`service-${pillar.id}`}
            tone={reversed ? "paper" : "bone"}
            spacing="tight"
            aria-labelledby={`pillar-${pillar.id}`}
          >
            <Container>
              <ServiceRow pillar={pillar} reversed={reversed}>
                <ServiceVisual pillar={pillar.id} />
              </ServiceRow>
            </Container>
          </Section>
        );
      })}
    </>
  );
}
