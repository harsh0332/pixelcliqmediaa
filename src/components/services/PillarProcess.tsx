"use client";

import { useRef } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { ServicePillar } from "@/content/services";

/**
 * HOW IT WORKS — the pillar's own process, as a vertical sequence with the
 * accent line drawing down it as the section scrolls.
 *
 * Vertical rather than the homepage's horizontal five: a service page reader is
 * further down the funnel and reading rather than scanning, and each step here
 * carries a full paragraph.
 */
export function PillarProcess({ pillar }: { pillar: ServicePillar }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 70%"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section tone="bone" aria-labelledby="process-heading">
      <Container variant="narrow">
        <Eyebrow as="p">How it works</Eyebrow>
        <h2 id="process-heading" className="type-h1 mt-5 max-w-[16ch]">
          The sequence we run.
        </h2>

        <ol ref={ref} className="relative mt-14">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[5px] w-px bg-line"
          >
            <motion.span
              // Explicit neutral value — see ScrollProgressLine.
              style={reduce ? { scaleY: 1 } : { scaleY: drawn }}
              className="block h-full w-px origin-top bg-accent"
            />
          </span>

          {pillar.process.map((step) => (
            <li key={step.step} className="relative pb-12 pl-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 size-2.5 rounded-pill border border-accent bg-bone"
              />
              <span className="type-label text-accent-deep tabular-nums">
                {step.step}
              </span>
              <h3 className="type-h3 mt-2">{step.title}</h3>
              <p className="type-body mt-3 max-w-measure text-ink-soft">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
