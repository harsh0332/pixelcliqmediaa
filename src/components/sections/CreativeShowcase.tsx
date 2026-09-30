"use client";

import { useState } from "react";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EyebrowSweep } from "@/components/motion/EyebrowSweep";
import { Section } from "@/components/ui/Section";
import { BalancedHeading } from "@/components/ui/BalancedHeading";
import { Drift } from "@/components/motion/Drift";
import { FadeUp } from "@/components/motion/FadeUp";
import { CreativeReveal } from "@/components/work/CreativeReveal";
import { CreativeTrack } from "@/components/work/CreativeTrack";
import dynamic from "next/dynamic";
import {
  approvedCreatives,
  creativeTypeLabels,
  creativeTypes,
  type CreativeItem,
  type CreativeType,
  toViewable,
} from "@/content/creatives";
import { creativeShowcase } from "@/content/home";

/*
 * The lightbox is loaded on demand.
 *
 * Its markup only exists once a reader opens it, so shipping the dialog, its
 * focus trap and its animation code in the first-load bundle pays for a
 * component most visits never instantiate. `ssr: false` costs nothing here for
 * the same reason — there is no server-rendered markup to preserve.
 */
const Lightbox = dynamic(
  () => import("@/components/work/Lightbox").then((m) => m.Lightbox),
  { ssr: false },
);

/**
 * The creative showcase: header and filters, a pinned reveal, then a horizontal
 * track.
 *
 * The lightbox always navigates the complete body of work, whichever surface
 * opened it, so prev/next never depends on which filter happened to be active.
 * Filters narrow the track — the browsable set — while the reveal stays the
 * fixed composition it was art-directed as, rather than reshuffling under a
 * 250vh pin every time a chip is tapped.
 *
 * Filter labels come from creativeTypeLabels, so a chip cannot name a format
 * that does not exist. None of them names an outcome: a competitor labels a tab
 * "SALES" and then shows no sales figures under it, which is a promise the page
 * cannot keep.
 */
export function CreativeShowcase({ year }: { year: number }) {
  const [filter, setFilter] = useState<CreativeType | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  /** A track is a composition, not a catalogue; past this it becomes a list. */
  const TRACK_LIMIT = 16;

  /*
   * Only cleared work is public.
   *
   * `approvedCreatives` is the gate the content layer already provides; this
   * section previously read the raw array and rendered every unapproved frame,
   * which put blank boxes and literal "[CREATIVE_TITLE]" tokens on the page.
   */
  const publishable = approvedCreatives;
  const hasWork = publishable.length > 0;

  const filtered = filter
    ? publishable.filter((item) => item.type === filter)
    : publishable;
  const tracked = filtered.slice(0, TRACK_LIMIT);

  const openIndex = openId
    ? publishable.findIndex((item) => item.id === openId)
    : -1;

  const open = (item: CreativeItem) => setOpenId(item.id);

  return (
    <>
      <Section tone="sand" id="creative" aria-labelledby="creative-heading">
        <Container>
          <FadeUp from="right">
            <Eyebrow as="p" rule>
          <EyebrowSweep>{creativeShowcase.eyebrow}</EyebrowSweep>
        </Eyebrow>
          </FadeUp>

          <FadeUp from="right" delay={0.05}>
            <Drift direction="left">
            <BalancedHeading
              level={2}
              size="display-xl"
              emphasis={creativeShowcase.emphasis}
              id="creative-heading"
              className="mt-6 max-w-[14ch]"
            >
              {creativeShowcase.headline}
            </BalancedHeading>
            </Drift>
          </FadeUp>

          <FadeUp from="right" delay={0.1}>
            <p className="type-body-lg mt-6 max-w-measure text-ink-soft">
              {creativeShowcase.support}{" "}
              <Link
                href={creativeShowcase.linkHref}
                className="inline-block py-0.5 -my-0.5 text-accent-deep underline decoration-accent-deep/40 underline-offset-4 hover:decoration-accent-deep focus-visible:decoration-accent-deep"
              >
                {creativeShowcase.linkLabel} &rarr;
              </Link>
            </p>
          </FadeUp>

          {hasWork ? (
          <FadeUp delay={0.15}>
            <div
              role="group"
              aria-label="Filter creative by format"
              className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <Chip
                pressed={filter === null}
                onClick={() => setFilter(null)}
                className="shrink-0"
              >
                All
              </Chip>
              {creativeTypes.map((type) => (
                <Chip
                  key={type}
                  pressed={filter === type}
                  onClick={() => setFilter(filter === type ? null : type)}
                  className="shrink-0"
                >
                  {creativeTypeLabels[type]}
                </Chip>
              ))}
            </div>
            <p className="type-caption mt-3" aria-live="polite">
              {filtered.length === 0
                ? creativeShowcase.emptyFilter
                : tracked.length < filtered.length
                  ? `Showing ${tracked.length} of ${filtered.length} pieces`
                  : `${filtered.length} ${filtered.length === 1 ? "piece" : "pieces"}`}
            </p>
          </FadeUp>
          ) : (
            /* The dignified empty state. No frames, no counter, no filters —
               a filter bar over nothing to filter is worse than no bar. */
            <FadeUp delay={0.15}>
              <div className="mt-12 border-t border-line pt-8">
                <p className="type-h3 max-w-[24ch]">
                  {creativeShowcase.emptyState.line}
                </p>
                <p className="type-body mt-4 max-w-measure text-ink-soft">
                  {creativeShowcase.emptyState.body}
                </p>
                <Link
                  href={creativeShowcase.emptyState.linkHref}
                  className="group/link type-button mt-8 inline-flex min-h-11 items-center gap-2 text-accent-deep"
                >
                  {creativeShowcase.emptyState.linkLabel}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-expo group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </FadeUp>
          )}
        </Container>
      </Section>

      {hasWork ? <CreativeReveal items={publishable} onOpen={open} /> : null}

      {/* paper: its own band between the sand header above and the bone
          story block below, so the track reads as a separate surface. */}
      {hasWork ? (
        <Section tone="paper" spacing="tight" className="overflow-hidden">
          <CreativeTrack items={tracked} onOpen={open} year={year} />
        </Section>
      ) : null}

      <Lightbox
        items={publishable.map(toViewable)}
        index={openIndex >= 0 ? openIndex : null}
        onClose={() => setOpenId(null)}
        onNavigate={(next) => setOpenId(publishable[next]?.id ?? null)}
      />
    </>
  );
}
