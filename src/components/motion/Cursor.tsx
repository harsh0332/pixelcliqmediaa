"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Keyboard — invisible to it. The cursor tracks the pointer only and adds no
 *   tab stop, no focus target and no announced content (aria-hidden).
 * Pointer — follows with a spring; grows and shows a label over any element
 *   carrying `data-cursor="…"`.
 * Touch   — never rendered. Gated on (hover: hover) and (pointer: fine).
 * Reduced motion — never rendered.
 *
 * `pointer-events: none` is non-negotiable here: the element sits above the
 * page at all times and would otherwise swallow every click.
 *
 * It appears only over an element carrying `data-cursor`. The native cursor is
 * never hidden — doing so trades a real affordance for decoration — so an idle
 * follower dot would sit next to the system pointer permanently and read as an
 * artifact rather than as a considered detail. Over labelled media it earns its
 * place; everywhere else it stays out of the way.
 *
 * Opting an element in is a one-attribute change anywhere in the tree:
 *   <figure data-cursor="View"> … </figure>
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const active = finePointer && !reduce;

  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 32, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (!active) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      const owner = target?.closest?.("[data-cursor]") ?? null;
      setLabel(owner?.getAttribute("data-cursor") || null);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible && label ? 1 : 0 }}
      transition={{ duration: DURATION.instant, ease: EASE.inOut }}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
    >
      <motion.div
        animate={{ scale: label ? 1 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-accent"
      >
        <AnimatePresence>
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="type-label text-white"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
