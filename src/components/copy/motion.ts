"use client";

import { useRef } from "react";
import { useReArmedInView } from "@/lib/useReArmedInView";
import type { Variants } from "framer-motion";
import { DURATION, EASE, ENTER } from "@/lib/motion";

/**
 * The reveal shared by every copy pattern.
 *
 * One definition, four patterns: A, B, C and D differ in how the copy is cut
 * up, never in how it arrives. If the entrance changed between them the page
 * would read as four effects rather than one system.
 *
 * 20px and 500ms on the house expo curve. pointerEvents travels with opacity —
 * an element at opacity 0 is invisible but still swallows clicks aimed at
 * whatever is beneath it.
 */
export const copyItem: Variants = {
  hidden: { opacity: 0, y: 20, pointerEvents: "none" },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: DURATION.base, ease: EASE.expo },
  },
};

/**
 * A sequence marker — 01, 02 — arriving just behind the row it belongs to.
 *
 * 12px and a 120ms delay: the eye should land on the title first and pick up
 * the number as a second beat. A number that arrives with its row competes
 * with it, which is the opposite of what numbering is for.
 */
export const copyNumber: Variants = {
  hidden: { opacity: 0, y: ENTER.numberY },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.base,
      ease: EASE.expo,
      delay: ENTER.numberDelay,
    },
  },
};

/**
 * The accent rule beside a unit. scaleX from a pinned left origin, never width,
 * so it stays on the compositor and cannot reflow the row it sits in.
 * 400ms — slightly ahead of the 500ms text, so the rule leads the line in.
 */
export const copyRule: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.4, ease: EASE.expo } },
};

/** Container that hands its children a stagger. */
export const copyStack = (stagger: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

/** Every pattern triggers at 20% visibility, once, and never re-triggers. */
export const COPY_VIEWPORT = { once: true, amount: 0.2 } as const;

/**
 * Entrance state for a copy pattern, re-armed.
 *
 * The patterns used `whileInView` with `once: true`, which meant a reader who
 * came back to the page — or scrolled up and down again — saw a completely
 * static document. This is the same trigger the rest of the motion system uses,
 * so a pattern and the section around it arm and disarm together instead of
 * drifting apart.
 */
export function useCopyEntrance<T extends HTMLElement = HTMLDivElement>(
  reduce: boolean,
  amount = 0.18,
) {
  const ref = useRef<T>(null);
  const inView = useReArmedInView(ref, { enabled: !reduce, amount });
  return {
    ref,
    animate: reduce ? undefined : inView ? "visible" : "hidden",
  } as const;
}
