"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BrokenLoop } from "@/components/legal/BrokenLoop";
import { errorPage } from "@/content/home";

/**
 * The route error boundary. Same treatment as the 404 — a broken loop, a dry
 * line, and a way out — so an unexpected failure still looks like the site.
 *
 * Error boundaries must be Client Components; that is a framework requirement,
 * not a choice.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: forward to a real error reporter once one is configured.
    console.error(error);
  }, [error]);

  return (
    <Section
      tone="bone"
      spacing="none"
      className="flex min-h-[80svh] items-center pt-[calc(var(--header-height)+4rem)] pb-20"
    >
      <Container variant="narrow" className="text-center">
        <BrokenLoop />
        <h1 className="type-display mx-auto mt-10 max-w-[14ch]">
          {errorPage.headline}
        </h1>
        <p className="type-body-lg mx-auto mt-6 max-w-measure text-ink-soft">
          {errorPage.support}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Button onClick={reset}>{errorPage.retryLabel}</Button>
          <Link
            href="/"
            className="group/link type-button inline-flex min-h-11 items-center gap-2 text-ink"
          >
            {errorPage.homeLabel}
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
