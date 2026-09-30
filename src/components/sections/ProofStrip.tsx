import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";
import { Section } from "@/components/ui/Section";
import { approvedClients } from "@/content/clients";
import { proofStrip } from "@/content/home";
import { HAS_CLIENT_LOGOS } from "@/content/site";

/**
 * The band under the hero. Not a stats bar.
 *
 * Until there are real client logos this runs the categories we build for —
 * true today, and true after the first client signs. The switch to a logo
 * marquee is a single boolean in site.ts, and the guard fails the build if that
 * flag disagrees with clients.ts, so the two cannot drift apart.
 *
 * There is deliberately no fallback that tiles placeholder marks: an agency
 * with three clients shows three logos, and an agency with none shows none.
 */
export function ProofStrip() {
  const showLogos = HAS_CLIENT_LOGOS && approvedClients.length > 0;

  return (
    <Section
      spacing="none"
      tone="sand"
      className="border-y border-line"
      aria-labelledby="proof-strip-heading"
    >
      {/* wide, not default: a marquee that stops short of the viewport edge
          reads as a widget. Gutters only, so it runs the full width. */}
      <Container
        variant="wide"
        className="flex flex-col justify-center gap-5 py-10 md:h-[120px] md:flex-row md:items-center md:gap-12 md:py-0"
      >
        <Eyebrow as="h2" id="proof-strip-heading" className="shrink-0">
          {proofStrip.label}
        </Eyebrow>

        <div className="min-w-0 flex-1">
          {showLogos ? (
            <Marquee speed={45}>
              {approvedClients.map((client) => (
                <span key={client.id} className="mx-10 flex shrink-0 items-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={128}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </span>
              ))}
            </Marquee>
          ) : (
            <Marquee speed={38}>
              {proofStrip.categories.map((category) => (
                <span
                  key={category}
                  className="type-h3 mx-6 shrink-0 text-ink-soft"
                >
                  {category}
                </span>
              ))}
            </Marquee>
          )}
        </div>
      </Container>
    </Section>
  );
}
