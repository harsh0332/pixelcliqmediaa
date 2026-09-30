"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { EASE, type EnterFrom } from "@/lib/motion";

export interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  amount?: number;
  from?: EnterFrom;
  trigger?: "view" | "mount";
  className?: string;
}

/** One small entrance. Revisiting a section never hides its content again. */
export function FadeUp({ children, delay = 0, amount = 0.15, trigger = "view", className }: FadeUpProps) {
  const reduce = useReducedMotionSafe();
  if (reduce || trigger === "mount") return <div className={className}>{children}</div>;
  return (
    <motion.div data-reveal className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.45, ease: EASE.expo, delay: Math.min(delay, 0.15) }}
    >{children}</motion.div>
  );
}
