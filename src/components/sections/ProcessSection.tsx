"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EyebrowSweep } from "@/components/motion/EyebrowSweep";
import { Section } from "@/components/ui/Section";
import { NumberedProgression } from "@/components/copy/NumberedProgression";
import { processSection } from "@/content/home";
import { engagementProcess } from "@/content/process";

/**
 * SECTION B — the five steps. PATTERN D, progressive numbered.
 *
 * This was five columns across. At 1440px that gave each step roughly 250px,
 * which set a three-sentence description over seventeen lines — a paragraph
 * about one word wide, five times over. The horizontal arrangement was there to
 * say "sequence"; the numbering says it better and costs no measure.
 *
 * The rail draws downward on scroll rather than firing once, so it tracks the
 * reader through the list. The rows enter once each on their own intersection —
 * text that fades back out on scroll-up is text you cannot finish reading.
 *
 * All five titles are single words in the same case — a competitor mixes Title
 * Case and sentence case across three steps of one list, which is the kind of
 * detail a careful reader registers without being able to name.
 *
 * The descriptions are the real ones from process.ts: what we do, what we need,
 * and what the client gets. A competitor's entire process reads "Dream big,
 * strategize with us, and turn plans into profits", which tells a buyer nothing.
 */
export function ProcessSection() {
  return (
    <Section tone="bone" aria-labelledby="process-heading" id="process">
      <Container>
        <Eyebrow as="p" rule>
          <EyebrowSweep>{processSection.eyebrow}</EyebrowSweep>
        </Eyebrow>
        <h2 id="process-heading" className="type-h1 mt-5 max-w-[16ch]">
          {processSection.headline}
        </h2>

        <NumberedProgression
          className="mt-14"
          steps={engagementProcess}
          footer={
            /* Step five turns back toward step one. */
            <svg
              aria-hidden="true"
              viewBox="0 0 60 40"
              className="mt-2 h-8 w-14"
            >
              <path
                d="M58 4 Q58 30 30 30 L6 30"
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M12 25 L6 30 L12 35"
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          }
        />
      </Container>
    </Section>
  );
}
