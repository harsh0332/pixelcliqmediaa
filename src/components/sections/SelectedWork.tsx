"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EyebrowSweep } from "@/components/motion/EyebrowSweep";
import { Section } from "@/components/ui/Section";
import { CasePlaceholderMedia } from "@/components/work/CasePlaceholderMedia";
import { caseStudies } from "@/content/cases";
import { selectedWork } from "@/content/home";
import { isPlaceholder } from "@/lib/placeholders";
import { RATIO_CSS } from "@/lib/ratio";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * SECTION A — the sticky case scroll.
 *
 * A media column pins while result headlines scroll past it; each entry fades
 * from muted to full ink as it reaches the middle of the viewport, and the
 * pinned media crossfades to match. Native scroll throughout — nothing touches
 * scroll velocity.
 */
export function SelectedWork() {
  const entries = caseStudies.slice(0, 6);
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotionSafe();
  const [active, setActive] = useState(0);

  // Activate whichever entry is crossing the middle of the viewport.
  useEffect(() => {
    if (!isDesktop) return;
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (!record.isIntersecting) continue;
          const index = itemRefs.current.indexOf(record.target as HTMLLIElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    itemRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [isDesktop]);

  const activeCase = entries[active];

  return (
    <Section tone="paper" aria-labelledby="selected-work-heading" id="work">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow as="p" rule>
          <EyebrowSweep>{selectedWork.eyebrow}</EyebrowSweep>
        </Eyebrow>
            <h2 id="selected-work-heading" className="type-h1 mt-5 max-w-[18ch]">
              {selectedWork.headline}
            </h2>
          </div>
          <Link
            href={selectedWork.linkHref}
            className="group/link type-button inline-flex min-h-11 items-center gap-2 text-accent-deep"
          >
            {selectedWork.linkLabel}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-expo group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Pinned media. Crossfades only — opacity, never movement. */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-height)+3rem)]">
              <div
                style={{ aspectRatio: RATIO_CSS["4:5"] }}
                className="relative overflow-hidden rounded-md border border-line bg-sand"
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeCase?.slug ?? "none"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : DURATION.fast, ease: EASE.inOut }}
                    className="absolute inset-0"
                  >
                    {activeCase?.status === "published" && activeCase.cover ? (
                      <Image
                        src={activeCase.cover}
                        alt={activeCase.headline}
                        fill
                        sizes="40vw"
                        className="object-cover"
                      />
                    ) : (
                      <CasePlaceholderMedia />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* When every case is still pending, three identical "in progress"
              rows read as an unfinished site rather than as honesty. One row,
              one statement. The list returns the moment a case publishes. */}
          <ol ref={listRef} className="lg:col-span-7">
            {(entries.every((e) => e.status !== "published") ? entries.slice(0, 1) : entries).map((entry, index) => {
              const pending = entry.status !== "published";
              const rawMetric = entry.results[0]?.metric;
              const metric =
                rawMetric && !isPlaceholder(rawMetric) ? rawMetric : null;
              const lit = !isDesktop || index === active;

              return (
                <li
                  key={entry.slug}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className="border-t border-line py-10 last:border-b lg:py-16"
                >
                  {/* Mobile: the media travels with each entry. */}
                  <div
                    style={{ aspectRatio: RATIO_CSS["4:5"] }}
                    className="relative mb-6 overflow-hidden rounded-md border border-line lg:hidden bg-sand"
                  >
                    {entry.status === "published" && entry.cover ? (
                      <Image
                        src={entry.cover}
                        alt={entry.headline}
                        fill
                        sizes="90vw"
                        className="object-cover"
                      />
                    ) : (
                      <CasePlaceholderMedia />
                    )}
                  </div>

                  {metric ? (
                    <span
                      className={cn(
                        "type-label inline-flex items-center rounded-pill border px-3 py-1.5 transition-colors duration-300",
                        lit
                          ? "border-line-strong text-ink-soft"
                          : "border-line text-ink-muted",
                      )}
                    >
                      {metric}
                    </span>
                  ) : null}

                  <p
                    className={cn(
                      "type-h2 mt-5 max-w-[20ch] transition-colors duration-300",
                      lit ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {pending ? (
                      <>
                        {selectedWork.placeholderHeadline}
                        <span className="type-body-lg mt-3 block text-ink-muted">
                          {selectedWork.placeholderNote}
                        </span>
                      </>
                    ) : (
                      <Link
                        href={`/work/${entry.slug}`}
                        className="hover:text-accent transition-colors duration-200"
                      >
                        {entry.headline}
                      </Link>
                    )}
                  </p>

                  {!pending && !isPlaceholder(entry.timeframe) ? (
                    <div className="mt-4 flex items-center gap-3">
                      <span className="type-caption">{entry.timeframe}</span>
                      {entry.website ? (
                        <a
                          href={entry.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="type-caption font-semibold text-accent hover:underline inline-flex items-center gap-1"
                        >
                          <span>{new URL(entry.website).hostname}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        <p className="type-body-sm mt-10 max-w-measure text-ink-muted">
          {selectedWork.note}
        </p>
      </Container>
    </Section>
  );
}
