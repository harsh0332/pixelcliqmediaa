"use client";

import Link from "next/link";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, type Variants } from "framer-motion";
import { CapabilityList } from "@/components/ui/CapabilityList";
import { LeadSupport } from "@/components/copy/LeadSupport";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { performanceEquation, storyBlocks } from "@/content/home";
import { servicePillars } from "@/content/services";
import { splitLead } from "@/lib/splitLead";
import { EASE } from "@/lib/motion";

/**
 * BLOCK 2 — an asymmetric split, because this block is about composition.
 *
 * The right column is an equation, set as type rather than drawn as a chart.
 * A chart here would have to plot something, and we have nothing to plot; a
 * list of terms adding up to a result states the argument exactly and states
 * nothing we cannot support.
 *
 * The note below is deliberate and stays. Telling a founder plainly that we do
 * not have numbers yet earns more than a screenshot they cannot verify —
 * unattributed ROAS proof is the single loudest tell on both competitor sites.
 */

const stack: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    // 340ms, from the spec — brisker than our 500ms base so six rows
    // resolve before the eye reaches the rule beneath them.
    transition: { duration: 0.34, ease: EASE.expo },
  },
};

const rule: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    // 340ms, from the spec — brisker than our 500ms base so six rows
    // resolve before the eye reaches the rule beneath them.
    transition: { duration: 0.34, ease: EASE.expo },
  },
};

export function PerformanceBlock() {
  const copy = storyBlocks.performance;
  const pillar = servicePillars.find((p) => p.id === copy.pillar);
  const reduce = useReducedMotionSafe();

  return (
    <Section data-spine-node tone="paper" spacing="tight" aria-labelledby="story-performance">
      <Container variant="mid">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <Eyebrow as="p" tone="muted" data-spine-eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 id="story-performance" className="type-h2 mt-5 max-w-[16ch]">
              {copy.headline}
            </h2>
            {/* PATTERN B — lead plus support. The body's own opening sentence
                is promoted to h3; the remainder follows 0.2s later at body size
                in ink-soft. Nothing is reordered. */}
            <LeadSupport className="mt-5" {...splitLead(copy.body)} />

            {pillar ? (
              <CapabilityList items={pillar.capabilities} className="mt-8" />
            ) : null}

            <Link
              href={pillar?.slug ?? "/services"}
              className="group/link type-button mt-6 inline-flex min-h-11 items-center gap-2 text-accent-deep"
            >
              {copy.linkLabel}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-expo group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>

          {/* Offset to the right, leaving a column of air between. */}
          <motion.div
            data-reveal
            variants={reduce ? undefined : stack}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <ul>
              {performanceEquation.terms.map((term, index) => (
                <motion.li
                  data-reveal
                  key={term}
                  variants={reduce ? undefined : row}
                  className="flex items-baseline justify-between border-b border-line py-3"
                >
                  <span className="type-body-lg text-ink">{term}</span>
                  <span aria-hidden="true" className="type-body-lg text-ink-muted">
                    {index < performanceEquation.terms.length - 1 ? "+" : ""}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.span
              data-reveal
              variants={reduce ? undefined : rule}
              aria-hidden="true"
              className="mt-1 block h-px w-full origin-left bg-ink"
            />

            <motion.p
              data-reveal
              variants={reduce ? undefined : row}
              className="type-h3 mt-4 text-accent-deep"
            >
              <span aria-hidden="true">= </span>
              {performanceEquation.result}
            </motion.p>

            <p className="type-caption mt-8 max-w-[38ch]">
              {performanceEquation.note}
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
