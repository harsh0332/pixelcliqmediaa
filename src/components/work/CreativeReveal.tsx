"use client";

import { useRef } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CreativeItem } from "@/content/creatives";
import { CreativeFrame } from "@/components/work/CreativeFrame";
import { creativeShowcase } from "@/content/home";
import { DURATION, EASE } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * The pinned reveal: oversized type drifting behind a composition of creative.
 *
 * The idea is a competitor's; the restraint is not. Theirs drifts ±200–300px at
 * 130px type, which reads as an effect. Ours moves less because the accent, the
 * hairlines and the ratios are already doing the work — the type is a backdrop,
 * not the trick.
 *
 * Native scroll only. The section pins, which is fine; nothing touches scroll
 * velocity, which is not.
 *
 * Desktop pins for 250vh, tablet for 180vh with less drift and fewer frames.
 * Below 768px there is no pin at all: the headline sets normally and the work
 * becomes a vertical stack at true ratios, because a cropped 9:16 defeats the
 * entire point of the section.
 *
 * Reduced motion removes the pin in CSS and the drift here, leaving a static,
 * readable composition.
 */

/** Per-line horizontal drift at desktop. Halved at tablet. */
const DRIFT = [120, -120, 180] as const;

/** Placement of each frame over the type. Rotation never exceeds 2 degrees. */
const PLACEMENT = [
  { position: "lg:left-[2%] lg:top-[6%] lg:w-[15%]", rotate: -1.5 },
  { position: "lg:left-[21%] lg:top-[38%] lg:w-[13%]", rotate: 1 },
  { position: "lg:left-[37%] lg:top-[2%] lg:w-[17%]", rotate: -2 },
  { position: "lg:left-[57%] lg:top-[30%] lg:w-[14%]", rotate: 1.5 },
  { position: "lg:left-[74%] lg:top-[4%] lg:w-[16%]", rotate: -1 },
  { position: "lg:left-[13%] lg:top-[68%] lg:w-[12%]", rotate: 2 },
  { position: "lg:left-[64%] lg:top-[66%] lg:w-[13%]", rotate: -1.5 },
] as const;

/** Frames beyond this are desktop-only; mobile stacks the first three. */
const TABLET_FRAMES = 5;
const MOBILE_FRAMES = 3;

export function CreativeReveal({
  items,
  onOpen,
}: {
  items: CreativeItem[];
  onOpen: (item: CreativeItem) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: scroller,
    offset: ["start start", "end end"],
  });

  const scale = isDesktop ? 1 : 0.5;
  const line1 = useTransform(scrollYProgress, [0, 1], [0, DRIFT[0] * scale]);
  const line2 = useTransform(scrollYProgress, [0, 1], [0, DRIFT[1] * scale]);
  const line3 = useTransform(scrollYProgress, [0, 1], [0, DRIFT[2] * scale]);
  const drifts = [line1, line2, line3];

  const frames = items.slice(0, PLACEMENT.length);

  return (
    <section
      ref={scroller}
      data-pin-scroller
      aria-label="Selected creative"
      className="relative md:h-[180vh] lg:h-[250vh]"
    >
      <div
        data-pin-target
        className="md:sticky md:top-0 md:flex md:h-svh md:items-center md:overflow-hidden"
      >
        <div className="relative w-full py-16 md:py-0">
          {/* Oversized type, deliberately quiet so the work reads on top. */}
          <div aria-hidden="true" className="select-none">
            {creativeShowcase.revealLines.map((lineText, index) => (
              <motion.p
                key={lineText}
                data-reveal
                // Explicit neutral value — see ScrollProgressLine.
                style={reduce ? { x: 0 } : { x: drifts[index] }}
                className={cn(
                  "type-display-xl whitespace-nowrap text-line-strong",
                  index === 1 && "md:pl-[12%]",
                  index === 2 && "md:pl-[4%]",
                )}
              >
                {lineText}
              </motion.p>
            ))}
          </div>

          {/* The work, over the type. */}
          <div className="mt-10 grid gap-8 md:mt-0 lg:absolute lg:inset-0 lg:mt-0 lg:block">
            {frames.map((item, index) => {
              const placement = PLACEMENT[index] ?? PLACEMENT[0];
              return (
                <motion.div
                  key={item.id}
                  data-reveal
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduce ? 0 : DURATION.slow,
                    ease: EASE.expo,
                    delay: reduce ? 0 : index * 0.08,
                  }}
                  style={{ rotate: `${placement.rotate}deg` }}
                  className={cn(
                    "mx-auto w-full max-w-[18rem] md:max-w-[13rem] lg:mx-0 lg:max-w-none",
                    index >= MOBILE_FRAMES && "hidden md:block",
                    index >= TABLET_FRAMES && "md:hidden lg:block",
                    "lg:absolute",
                    placement.position,
                  )}
                >
                  <CreativeFrame
                    item={item}
                    onOpen={() => onOpen(item)}
                    priority={index < 3}
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 22vw, 80vw"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
