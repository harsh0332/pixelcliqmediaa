import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CasePlaceholderMedia } from "@/components/work/CasePlaceholderMedia";
import type { CaseStudy } from "@/content/cases";
import { selectedWork } from "@/content/home";
import { isPlaceholder } from "@/lib/placeholders";
import { RATIO_CSS } from "@/lib/ratio";

/**
 * RELATED WORK — cases tagged with this pillar.
 *
 * Every entry ships as a placeholder, so the tiles carry bracketed tokens and
 * the same honest note as the homepage. There is no invented result here and no
 * plausible-looking stand-in metric.
 */
export function PillarRelatedWork({ cases }: { cases: CaseStudy[] }) {
  if (cases.length === 0) return null;

  return (
    <Section tone="bone" aria-labelledby="related-work-heading">
      <Container>
        <Eyebrow as="h2" id="related-work-heading">
          Related work
        </Eyebrow>

        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {cases.slice(0, 3).map((entry) => (
            <li key={entry.slug}>
              <div
                style={{ aspectRatio: RATIO_CSS["4:5"] }}
                className="overflow-hidden rounded-md border border-line"
              >
                <CasePlaceholderMedia />
              </div>
              {/* No stand-in metric, client or industry: all three are still
                  bracketed tokens on a pending case. */}
              {entry.results[0] && !isPlaceholder(entry.results[0].metric) ? (
                <span className="type-label mt-4 inline-flex items-center rounded-pill border border-line px-3 py-1.5 text-ink-muted">
                  {entry.results[0].metric}
                </span>
              ) : null}
              <p className="type-h3 mt-3 max-w-[24ch]">
                {isPlaceholder(entry.client)
                  ? selectedWork.placeholderHeadline
                  : `${entry.client} · ${entry.industry}`}
              </p>
              <p className="type-caption mt-1 max-w-[34ch]">
                {selectedWork.placeholderNote}
              </p>
            </li>
          ))}
        </ul>

        <p className="type-body-sm mt-8 max-w-measure text-ink-muted">
          {selectedWork.note}
        </p>
      </Container>
    </Section>
  );
}
