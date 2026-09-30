"use client";

import { useRef, useState, type PointerEvent } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { CapabilityList } from "@/components/ui/CapabilityList";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EyebrowSweep } from "@/components/motion/EyebrowSweep";
import { Section } from "@/components/ui/Section";
import { FadeUp } from "@/components/motion/FadeUp";
import { servicesIndex } from "@/content/home";
import { primaryPillars } from "@/content/services";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * LAYER 1 — the index. Breadth, at a glance.
 *
 * A contents page, not a card grid: six hairline-separated rows carrying number,
 * title, promise and capabilities. No icons, no boxes — structure and type do
 * the work. Numbering is legitimate here because the pillars are genuinely an
 * ordered index, which is the one case where numbers are not a template tell.
 *
 * Pointer — the row shifts 8px, the number turns accent, the rule above it draws
 *   in from the left, the arrow moves 6px, and a preview frame follows the
 *   cursor with heavy damping.
 * Touch   — no preview frame, and the entire row is one tap target well over
 *   140px tall.
 * Keyboard — each row is a single link; focus reproduces the hover treatment.
 *
 * The preview frame is decorative: it repeats no information and is aria-hidden.
 */

/** Heavy damping, so the frame trails the cursor rather than snapping to it. */
const FOLLOW_SPRING = { stiffness: 60, damping: 28, mass: 0.8 };

export function ServicesIndex() {
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotionSafe();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const previewEnabled = finePointer && !reduce;
  const [hovered, setHovered] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, FOLLOW_SPRING);
  const py = useSpring(y, FOLLOW_SPRING);

  const onPointerMove = (event: PointerEvent<HTMLUListElement>) => {
    if (!previewEnabled) return;
    x.set(event.clientX);
    y.set(event.clientY);
  };

  // sand, not bone: the Compound Loop above closes on inverse and the
  // deep-dive rows below open on bone, so this band sits between them.
  return (
    <Section tone="paper" aria-labelledby="services-heading" id="services">
      <Container>
        <FadeUp from="left">
          <Eyebrow as="p" rule>
          <EyebrowSweep>{servicesIndex.eyebrow}</EyebrowSweep>
        </Eyebrow>
        </FadeUp>
        <FadeUp from="left" delay={0.05}>
          <h2 id="services-heading" className="type-h1 mt-6 max-w-[16ch]">
            {servicesIndex.headline}
          </h2>
        </FadeUp>
        <FadeUp from="left" delay={0.1}>
          <p className="type-body-lg mt-6 max-w-measure text-ink-soft">
            {servicesIndex.support}{" "}
            <Link
              href="#compound-loop"
              className="inline-block py-0.5 -my-0.5 text-accent-deep underline decoration-accent-deep/40 underline-offset-4 hover:decoration-accent-deep focus-visible:decoration-accent-deep"
            >
              {servicesIndex.loopLinkLabel} &rarr;
            </Link>
          </p>
        </FadeUp>

        <ul
          ref={listRef}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHovered(null)}
          className="mt-16 border-b border-line"
        >
          {primaryPillars.map((pillar, index) => (
            <li key={pillar.id} className="relative border-t border-line">
              {/* The rule above the row, redrawn in accent from the left. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 -top-px h-px origin-left bg-accent transition-transform duration-400 ease-expo",
                  hovered === index ? "scale-x-100" : "scale-x-0",
                )}
              />
              <Link
                href={pillar.slug}
                onPointerEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                className="group/row block py-8 lg:min-h-[140px]"
              >
                <div className="transition-transform duration-400 ease-expo group-hover/row:translate-x-2 group-focus-visible/row:translate-x-2 lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
                  <span
                    className={cn(
                      "type-label tabular-nums transition-colors duration-300 lg:col-span-1",
                      hovered === index ? "text-accent-deep" : "text-ink-muted",
                    )}
                  >
                    {pillar.number}
                  </span>

                  <h3 className="type-h2 mt-3 lg:col-span-4 lg:mt-0">
                    {pillar.title}
                  </h3>

                  <div className="mt-3 lg:col-span-4 lg:mt-0">
                    {/* 16px minimum — this is body copy, not a label. */}
                    <p className="type-body text-ink-soft">{pillar.promise}</p>
                    <CapabilityList items={pillar.capabilities} className="mt-3" />
                  </div>

                  <span className="type-button mt-4 flex items-center gap-2 text-ink lg:col-span-3 lg:mt-0 lg:justify-end">
                    Explore
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-400 ease-expo group-hover/row:translate-x-1 group-focus-visible/row:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* Cursor-following preview. Pointer devices only. */}
      {previewEnabled ? (
        <motion.div
          aria-hidden="true"
          style={{ x: px, y: py }}
          className="pointer-events-none fixed top-0 left-0 z-30 hidden lg:block"
        >
          <AnimatePresence>
            {hovered !== null ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: reduce ? 0 : DURATION.fast, ease: EASE.inOut }}
                className="ml-8 -translate-y-1/2 overflow-hidden rounded-md border border-line bg-paper"
              >
                <Image
                  src="/images/creative/placeholder-4x5.svg"
                  alt=""
                  width={1024}
                  height={1280}
                  className="h-auto w-[13rem]"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </Section>
  );
}
