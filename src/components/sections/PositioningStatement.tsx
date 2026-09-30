import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EyebrowSweep } from "@/components/motion/EyebrowSweep";
import { Section } from "@/components/ui/Section";
import { Drift } from "@/components/motion/Drift";
import { FadeUp } from "@/components/motion/FadeUp";
import { StatementStack } from "@/components/copy/StatementStack";
import { positioning } from "@/content/home";

/**
 * Names the problem before selling anything.
 *
 * Narrow measure, left aligned, no cards and no icons — the four statements are
 * things the reader already believes, and dressing them in UI would make them
 * look like claims rather than common ground.
 *
 * The headline breaks on a fixed line: the contrast between the two sentences is
 * the argument, so it is not left to text-balance to decide.
 */
export function PositioningStatement() {
  return (
    <Section
      tone="bone"
      spacing="large"
      aria-labelledby="positioning-heading"
      id="positioning"
    >
      <Container variant="narrow">
        <FadeUp from="below">
          <Eyebrow as="p" rule>
          <EyebrowSweep>{positioning.eyebrow}</EyebrowSweep>
        </Eyebrow>
        </FadeUp>

        {/* Drifts right while the statement list below it holds still, so the
            two read as separate planes rather than one block. */}
        <FadeUp from="below" delay={0.05}>
          <Drift direction="right">
          <h2
            id="positioning-heading"
            className="type-display-xl mt-8 font-medium text-balance"
          >
            {/* text-balance on each line, not only the heading: the lines are
                block spans, so balancing has to happen inside each. Without
                it the second line broke "We run your / growth." at 1280+. */}
            <span className="block text-balance text-ink-muted">
              {positioning.headline[0]}
            </span>
            <span className="block text-balance">{positioning.headline[1]}</span>
          </h2>
          </Drift>
        </FadeUp>

        {/* PATTERN A — statement stack. Four assertions, hairline-separated,
            each with an accent rule that draws as the row arrives. */}
        <StatementStack items={positioning.statements} className="mt-14" />

        <FadeUp>
          <p className="type-h3 mt-14 max-w-measure">{positioning.closing}</p>
        </FadeUp>
      </Container>
    </Section>
  );
}
