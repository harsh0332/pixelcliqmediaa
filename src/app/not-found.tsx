import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PixelFourOhFour } from "@/components/legal/PixelFourOhFour";
import { notFoundPage } from "@/content/home";

/**
 * 404.
 *
 * Editorial rather than apologetic, and dry rather than cute. The only graphic
 * is the loop failing to close — the site's signature element, not connecting.
 */
export default function NotFound() {
  return (
    <Section
      tone="bone"
      spacing="none"
      className="flex min-h-[80svh] items-center pt-[calc(var(--header-height)+4rem)] pb-20"
      data-page-hero
      data-dark-hero
    >
      <Container variant="narrow" className="text-center">
        <PixelFourOhFour />
        <h1 className="type-display mx-auto mt-10 max-w-[14ch]">
          {notFoundPage.headline}
        </h1>
        <p className="type-body-lg mx-auto mt-6 max-w-measure text-ink-soft">
          {notFoundPage.support}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            href="/"
            className="group/link type-button inline-flex min-h-11 items-center gap-2 text-accent-deep"
          >
            {notFoundPage.homeLabel}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-expo group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
          <Link
            href="/work"
            className="group/link type-button inline-flex min-h-11 items-center gap-2 text-ink"
          >
            {notFoundPage.workLabel}
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
