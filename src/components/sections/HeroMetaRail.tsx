"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { hero } from "@/content/home";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The vertical meta rail at the right edge of the hero.
 *
 * Set in `writing-mode: vertical-rl` rather than a rotate transform, so the text
 * still wraps, selects and reads as text rather than as a rotated block.
 *
 * The accent segment travelling down the rule is the one looping animation on
 * the site — a scroll hint, so it has a job. It stops completely under reduced
 * motion, leaving a plain hairline, and it is aria-hidden either way: the hint
 * is already stated in words beside it.
 */
export function HeroMetaRail({ className }: { className?: string }) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduce ? 0 : DURATION.base,
        ease: EASE.expo,
        delay: reduce ? 0 : 0.95,
      }}
      className={cn("flex flex-col items-center gap-6", className)}
    >
      <p className="type-caption [writing-mode:vertical-rl] text-ink-muted">
        {hero.metaRail.location}
      </p>

      {/*
        A real button, not a decorative rule.

        It says what is below and takes you there, so the hint earns its place
        instead of only describing one. Native smooth scrolling — Lenis is
        driven from the same frame loop, so `scrollIntoView` eases rather than
        jumping, and a keyboard user gets the same behaviour as a mouse user.
      */}
      <button
        type="button"
        onClick={() => {
          document
            .getElementById("compound-loop")
            ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        }}
        aria-label={`${hero.metaRail.scrollHint} — scroll to the Compound Loop`}
        // -mx-3 px-3: the rotated label is 20px wide; the padding makes the
        // target 44 without moving the glyphs.
        className="group/cue -mx-4 flex flex-col items-center gap-6 rounded-sm px-4"
      >
        <span
          aria-hidden="true"
          className="relative block h-24 w-px overflow-hidden bg-line"
        >
          {reduce ? null : (
            <motion.span
              className="absolute inset-x-0 top-0 block h-8 bg-accent"
              animate={{ y: ["-100%", "300%"] }}
              transition={{
                duration: 2.4,
                ease: "easeInOut",
                // Three passes, then it stops. A scroll hint has one job; an
                // accent bar sliding forever is a decorative loop competing
                // with the hero and holding a frame open all session.
                repeat: 2,
                repeatDelay: 0.4,
              }}
            />
          )}
        </span>

        <span className="type-caption [writing-mode:vertical-rl] text-ink-muted transition-colors duration-300 ease-inout group-hover/cue:text-ink group-focus-visible/cue:text-ink">
          {hero.metaRail.scrollHint}
        </span>

        <span
          aria-hidden="true"
          className="type-caption text-ink-muted transition-transform duration-300 ease-expo group-hover/cue:translate-y-1 group-focus-visible/cue:translate-y-1"
        >
          &darr;
        </span>
      </button>

    </motion.div>
  );
}
