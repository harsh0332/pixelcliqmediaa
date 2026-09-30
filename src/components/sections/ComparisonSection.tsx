import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EyebrowSweep } from "@/components/motion/EyebrowSweep";
import { Section } from "@/components/ui/Section";
import { Stagger } from "@/components/motion/Stagger";
import { STAGGER } from "@/lib/motion";
import { comparisonSection } from "@/content/home";
import { comparisonRows } from "@/content/comparison";

/**
 * SECTION C — the comparison.
 *
 * Written row by row, not column by column. Each row names one dimension, then
 * states the usual arrangement and our answer to that same thing. A competitor's
 * table sets "Mediocre methods" against "Ethical Approach" and "No prompt
 * answers" against "Precise Resolutions" — quality against ethics, speed
 * against accuracy — which is what happens when each column is written on its
 * own. The dimension label above each pair makes that mistake impossible here.
 *
 * The left column is de-emphasised by weight and by label, never by contrast:
 * it renders in --ink-soft at 10.25:1. A competitor sets its comparison column
 * at rgba(0,0,0,0.5), about 3.9:1, which fails AA outright.
 *
 * Nothing in the right column claims a result, a ranking or a guarantee. Every
 * cell is a factual difference in how the work is run.
 */
export function ComparisonSection() {
  return (
    <Section tone="sand" aria-labelledby="comparison-heading" id="difference">
      <Container>
        <Eyebrow as="p" rule>
          <EyebrowSweep>{comparisonSection.eyebrow}</EyebrowSweep>
        </Eyebrow>
        <h2 id="comparison-heading" className="type-h1 mt-5 max-w-[16ch]">
          {comparisonSection.headline}
        </h2>

        <div className="mt-14">
          {/* Column headings, shown once. */}
          <div className="hidden grid-cols-2 gap-8 border-b border-line-strong pb-4 md:grid">
            <Eyebrow as="p" tone="muted">{comparisonSection.leftLabel}</Eyebrow>
            <Eyebrow as="p" tone="accent">
              {comparisonSection.rightLabel}
            </Eyebrow>
          </div>

          {/* PATTERN A applied to paired rows. The structure stays a
              comparison — collapsing two columns into one stack would delete
              the argument — but each row now arrives on the loose 0.08s beat
              with an accent rule leading its right-hand side in. */}
          <Stagger from="right" stagger={STAGGER.list}>
            {comparisonRows.map((row) => (
              <div key={row.id} className="border-b border-line py-7">
                <p className="type-label text-ink-muted">{row.dimension}</p>
                <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-8">
                  <div>
                    <span className="type-label mb-2 block text-ink-muted md:hidden">
                      {comparisonSection.leftLabel}
                    </span>
                    <p className="type-body-sm text-ink-soft">{row.typical}</p>
                  </div>
                  <div>
                    <span className="type-label mb-2 block text-link md:hidden">
                      {comparisonSection.rightLabel}
                    </span>
                    <p className="type-body text-ink">{row.pixelcliq}</p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
