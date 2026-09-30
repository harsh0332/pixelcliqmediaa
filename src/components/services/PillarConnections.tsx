import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { loopStages } from "@/content/growthSystem";
import type { ServicePillar } from "@/content/services";
import { pillarsById } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * WHERE IT CONNECTS — the section that makes these pages different.
 *
 * Every competitor service page sells a silo. This one shows the pillar sitting
 * inside the seven-stage loop, marks the stages it owns, and links to the
 * pillars it feeds. A visitor who lands here from search sees the system rather
 * than a menu item, and has three routes deeper into it.
 *
 * Landing pages inherit their parent's stages: performance is the media half of
 * D2C Growth, so it lights the same stage its parent does.
 */
export function PillarConnections({ pillar }: { pillar: ServicePillar }) {
  const owner = pillar.primary ? pillar.id : (pillar.parent ?? pillar.id);
  const connected = pillar.connectsTo
    .map((id) => pillarsById.get(id))
    .filter((entry): entry is ServicePillar => Boolean(entry));

  return (
    <Section tone="inverse" aria-labelledby="connects-heading" id="connects">
      <Container>
        <Eyebrow as="p">Where it connects</Eyebrow>
        <h2 id="connects-heading" className="type-h2 mt-5 max-w-[20ch]">
          {pillar.title} does not work on its own.
        </h2>
        <p className="type-body-lg mt-5 max-w-measure text-ink-soft">
          {pillar.connectsNote}
        </p>

        {/* The seven stages, with this pillar's own marked. */}
        <ol className="mt-12 flex flex-wrap items-stretch gap-px overflow-hidden rounded-md border border-inverse-line-strong">
          {loopStages.map((stage) => {
            const owned = stage.pillar === owner;
            return (
              <li
                key={stage.id}
                className={cn(
                  "flex-1 basis-[40%] p-4 transition-colors sm:basis-0",
                  owned ? "bg-accent-lift/15" : "bg-transparent",
                )}
              >
                <span
                  className={cn(
                    "type-label block",
                    owned ? "text-accent-lift" : "text-ink-muted",
                  )}
                >
                  {stage.label}
                </span>
                <span className="type-caption mt-2 block">{stage.oneLiner}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-10">
          <Eyebrow as="p">Feeds into</Eyebrow>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {connected.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={entry.slug}
                  className="group/link type-body-lg inline-flex min-h-11 items-center gap-2 text-inverse-text underline decoration-inverse-line-strong underline-offset-4 hover:decoration-accent-lift focus-visible:decoration-accent-lift"
                >
                  {entry.title}
                  <span
                    aria-hidden="true"
                    className="text-accent-lift transition-transform duration-300 ease-expo group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
