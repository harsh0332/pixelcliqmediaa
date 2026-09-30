"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";

export interface SpineLineProps {
  children: ReactNode;
  className?: string;
}

/**
 * One accent thread running down the left margin of a group of sections.
 *
 * The line's height is bound to scroll progress through the whole group, so it
 * grows as you read down and retracts as you scroll back — the same value in
 * both directions, never an animation that fires and finishes. A dot marks each
 * section boundary, and a section's eyebrow takes the accent colour as the line
 * reaches it, so the thread visibly hands off from one section to the next.
 *
 * Applied to a group, never to a single section: a vertical rule beside one
 * band is a border, and the point of this is that it crosses boundaries.
 *
 * How it stays cheap
 * ------------------
 * One scroll subscriber for the group, not one per section. Progress drives a
 * single scaleY on the compositor; the per-section lit state is written as a
 * data attribute and the colour change is left to CSS, so a section lighting up
 * costs one attribute write rather than a React render.
 *
 * Reduced motion draws the line at full height with every node lit, so it still
 * reads as the structural thread it is.
 */
export function SpineLine({ children, className }: SpineLineProps) {
  const group = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const [nodes, setNodes] = useState<number[]>([]);

  const { scrollYProgress } = useScroll({
    target: group,
    offset: ["start 72%", "end 60%"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  // Measure each marked section's midpoint as a fraction of the group's height.
  useEffect(() => {
    const root = group.current;
    if (!root) return;

    const measure = () => {
      const top = root.getBoundingClientRect().top;
      const height = root.offsetHeight || 1;
      const marks = [...root.querySelectorAll<HTMLElement>("[data-spine-node]")];
      setNodes(
        marks.map((mark) => (mark.getBoundingClientRect().top - top) / height),
      );
    };

    measure();
    // Under reduced motion the line is already at full height, so every
    // section is behind it from the first paint.
    if (reduce) {
      root
        .querySelectorAll("[data-spine-node]")
        .forEach((mark) => mark.setAttribute("data-spine-lit", ""));
    }
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [children, reduce]);

  // Light each section as the line passes it. Attribute writes, not state.
  useMotionValueEvent(drawn, "change", (value) => {
    const root = group.current;
    if (!root || reduce) return;
    const marks = root.querySelectorAll<HTMLElement>("[data-spine-node]");
    marks.forEach((mark, index) => {
      const at = nodes[index];
      if (at === undefined) return;
      const lit = value >= at;
      if (lit) mark.setAttribute("data-spine-lit", "");
      else mark.removeAttribute("data-spine-lit");
    });
  });

  return (
    <div ref={group} className={cn("relative", className)}>
      {/* The rail sits in the gutter, aligned to the content column's left
          edge and pulled into the margin beside it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full"
      >
        <div className="mx-auto h-full w-full max-w-content px-5 md:px-8 lg:px-12 wide:px-16">
          <div className="relative h-full w-px -translate-x-3 bg-line md:-translate-x-5 lg:-translate-x-6">
            <motion.div
              // scaleY: 1, not `undefined`.
              //
              // useReducedMotionSafe is false on the first client render — it
              // has to be, or the markup would not match the server's. So
              // Framer applies the scroll value once, writes scaleY(0) inline,
              // and when `reduce` flips true it stops managing the property and
              // leaves that 0 behind. The line then renders at zero height for
              // exactly the users who were promised a static full-height one.
              // An explicit neutral value is the only thing that clears it.
              style={reduce ? { scaleY: 1 } : { scaleY: drawn }}
              className="h-full w-px origin-top bg-accent"
            />
            {nodes.map((at, index) => (
              <span
                key={index}
                style={{ top: `${at * 100}%` }}
                data-spine-dot
                className="absolute left-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-pill bg-accent"
              />
            ))}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
