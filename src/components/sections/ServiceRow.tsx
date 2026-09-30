"use client";

import type { ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import Link from "next/link";
import { motion } from "framer-motion";
import { CapabilityList } from "@/components/ui/CapabilityList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Parallax } from "@/components/motion/Parallax";
import { Stagger } from "@/components/motion/Stagger";
import type { ServicePillar } from "@/content/services";
import { DURATION, EASE } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * LAYER 2 — one deep-dive row per pillar. Depth, for the founder who scrolled
 * past the index.
 *
 * The visual arrives as `children` so it stays a Server Component: the SVGs are
 * static and have no business in the client bundle.
 *
 * Motion — the media slides in from its own side and the text rises in sequence,
 * both triggered at 20% visibility. That threshold is the point: a competitor's
 * reveals fire so late that sections sit blank halfway up the screen. Firing at
 * 20% means a row is already resolving as it enters, never mid-viewport and
 * empty. Once only; it never replays on scroll-back.
 *
 * The headline is solid ink, never gradient-clipped text — that is a 2021 tell
 * and it takes contrast out of the token system's hands.
 */
export function ServiceRow({
  pillar,
  reversed,
  children,
}: {
  pillar: ServicePillar;
  /** Puts the media on the left, alternating down the page. */
  reversed: boolean;
  children: ReactNode;
}) {
  const reduce = useReducedMotionSafe();
  const sideBySide = useMediaQuery("(min-width: 1024px)");

  /**
   * The lateral slide only makes sense where the columns sit side by side.
   * Stacked on mobile it means nothing — and worse, a row below the fold holds
   * its 40px offset until its reveal fires, which pushes it past the viewport
   * and gives the page a horizontal scrollbar. Mobile rises instead.
   */
  const offset = sideBySide
    ? { x: reversed ? -40 : 40, y: 0 }
    : { x: 0, y: 24 };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={reduce ? false : { opacity: 0, ...offset }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduce ? 0 : DURATION.slow, ease: EASE.expo }}
        className={cn(reversed && "lg:order-2")}
      >
        {/* ~42px of drift against the text column. Desktop and tablet only —
            Parallax gates itself below 768px, where a short viewport makes the
            effect imperceptible and the scroll cost is the thing that matters. */}
        <Parallax speed={0.35}>
          <div className="aspect-[4/3] w-full max-w-[32rem] overflow-hidden rounded-md border border-line bg-paper">
            {children}
          </div>
        </Parallax>
      </motion.div>

      {/* space-y-5 rather than 6: six rows compound, and 4px per gap across
          six rows is most of a viewport. */}
      <Stagger from={reversed ? "right" : "left"} className={cn("space-y-5", reversed && "lg:order-1")}>
        <Eyebrow as="p">{pillar.title}</Eyebrow>

        <h2 id={`pillar-${pillar.id}`} className="type-h2 max-w-[18ch] text-ink">
          {pillar.headline}
        </h2>

        {/* 18px, capped at 52ch. Never the 12px a competitor sets here. */}
        <p className="type-body-lg max-w-[52ch] text-ink-soft">{pillar.summary}</p>

        <CapabilityList items={pillar.capabilities} />

        <Link
          href={pillar.slug}
          className="group/explore type-button inline-flex min-h-11 items-center gap-2 text-accent-deep"
        >
          Explore {pillar.title}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-expo group-hover/explore:translate-x-1 group-focus-visible/explore:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </Stagger>
    </div>
  );
}
