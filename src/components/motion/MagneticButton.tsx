"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** Small enough to feel like weight rather than like the button running away. */
const MAX_PULL = 8;

export interface MagneticButtonProps {
  children: ReactNode;
  /** Multiplier on the pull. 1 reaches the 8px ceiling at the element's edge. */
  strength?: number;
  className?: string;
}

/**
 * Keyboard — the wrapper is not focusable and adds no tab stop. The child keeps
 *   its own focus behaviour, and focus never triggers the magnet, so a keyboard
 *   user's target never moves under them.
 * Pointer — follows the cursor to a maximum of 8px and springs back on leave.
 * Touch   — inert. Gated on (hover: hover) and (pointer: fine), so a touch
 *   device never applies a transform that would offset the tap target.
 * Reduced motion — inert.
 *
 * The transform is on a wrapper, so the child's own hit area moves with it and
 * the click target and the visual stay in the same place.
 */
export function MagneticButton({
  children,
  strength = 1,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const active = finePointer && !reduce;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Offset from centre, normalised to -1..1, then scaled to the ceiling.
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    const clamp = (v: number) => Math.max(-1, Math.min(1, v)) * MAX_PULL * strength;
    x.set(clamp(dx));
    y.set(clamp(dy));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={active ? { x: springX, y: springY } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
