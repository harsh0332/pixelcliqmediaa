"use client";

import { useRef, type PointerEvent } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Parallax } from "@/components/motion/Parallax";
import { hero } from "@/content/home";
import { EASE } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * The hero composition: a loose cluster of frames in native ad ratios.
 *
 * Deliberately not a hero photograph or a 3D render. Paper, hairlines and one
 * accent rule — the only colour in the cluster — hinting at the loop by
 * connecting two frames.
 *
 * Motion has three independent layers, each on its own element so they compose
 * without fighting: a mount entrance (rise + slight scale), a scroll parallax at
 * a different speed per frame so the cluster breathes, and a mouse parallax on
 * the whole group. All three are transform-only.
 *
 * Reduced motion — no entrance, no parallax, no mouse tracking. The cluster
 * renders in its final position immediately.
 *
 * Layout — absolute overlap on desktop; on mobile it collapses to a plain row of
 * the first two frames, never a squashed version of the desktop arrangement.
 */

/*
 * Per-frame motion, from the design spec.
 *
 * `speed` carries the spec's scroll *rate* translated into our Parallax model.
 * The spec expresses drift as `y = (1 - rate) x scrollY` clamped to 60px, where
 * rate 1.0 means the frame is pinned to the page and anything below 1.0 lags
 * behind it. Our Parallax works from element-relative progress rather than
 * absolute scrollY, so the rates are mapped to preserve direction and ratio,
 * with the fastest frame reaching the same 60px clamp:
 *
 *   spec rate   0.90    1.15    1.05    1.00
 *   (1 - rate) +0.10   -0.15   -0.05    0.00
 *   speed      +0.67   -1.00   -0.33    0.00
 *
 * The signs are what matter: A drifts with the page, C and B lead it, D is
 * pinned. That is the difference between a cluster that breathes and one that
 * slides as a slab.
 *
 * `depth` is the pointer-parallax amplitude in pixels, straight from the spec
 * (A 2.5, C 10, B 7, D 4). Applied per frame rather than to the group, which
 * is the point — a single transform on the wrapper would move everything
 * together and lose the parallax entirely.
 */
const FRAME_MOTION = [
  // A — social 9:16. Secondary. Overlaps the dominant frame's left edge.
  { speed: 0.75, depth: 2.5, rotate: -1.8, position: "lg:left-0 lg:top-[12%] lg:w-[36%] lg:z-20" },
  // C — product 4:5. The dominant frame; everything else reads against it.
  { speed: 0, depth: 10, rotate: 1.2, position: "lg:left-[29%] lg:top-0 lg:w-[52%] lg:z-10" },
  // B — store 9:16. Supporting, tucked under the dominant frame's lower edge.
  { speed: -0.375, depth: 7, rotate: -2, position: "lg:left-[23%] lg:top-[50%] lg:w-[26%] lg:z-30" },
  // D — campaign 1:1. Smallest, holding the lower right.
  { speed: -1, depth: 4, rotate: 1.6, position: "lg:left-[70%] lg:top-[47%] lg:w-[23%] lg:z-30" },
] as const;;

/*
 * Mobile shows the 4:5 and the 1:1 — not the first two.
 *
 * The spec's reasoning, which is worth keeping: at 390px a 9:16 frame is about
 * 300px tall, so a row of two would push the capability strip and the meta rail
 * far below the fold and the cluster would become the page instead of
 * supporting the headline. The 4:5 and 1:1 sit inside ~205px together and share
 * a near-square rhythm, so the row reads as one calm band.
 */
const MOBILE_FRAMES = new Set([1, 3]);

/** Pointer amplitude is per-frame `depth`; Y is damped to 60% of X. */
const POINTER_Y_RATIO = 0.6;

export function HeroMedia({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const mouseActive = finePointer && !reduce;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Spec damping: heavy and slow to settle (its vanilla equivalent is
  // `current += (target - current) * 0.08` per frame). The cluster should
  // follow the cursor like weight on a spring, not snap to it.
  const springX = useSpring(mx, { stiffness: 120, damping: 20, mass: 1 });
  const springY = useSpring(my, { stiffness: 120, damping: 20, mass: 1 });

  /*
   * Pointer offsets, one pair per frame.
   *
   * Built here rather than inside the map below: these are hooks, and a hook
   * inside a loop body is only safe while the loop length never changes. The
   * array is a fixed four, but writing them out keeps that guarantee explicit
   * instead of load-bearing. `depth` is the spec's px amplitude; Y is damped to
   * 60% of X so the cluster drifts wider than it does tall.
   */
  const depth = (i: 0 | 1 | 2 | 3) => FRAME_MOTION[i].depth;
  const pointer = [
    { x: useTransform(springX, (v) => v * depth(0)), y: useTransform(springY, (v) => v * depth(0) * POINTER_Y_RATIO) },
    { x: useTransform(springX, (v) => v * depth(1)), y: useTransform(springY, (v) => v * depth(1) * POINTER_Y_RATIO) },
    { x: useTransform(springX, (v) => v * depth(2)), y: useTransform(springY, (v) => v * depth(2) * POINTER_Y_RATIO) },
    { x: useTransform(springX, (v) => v * depth(3)), y: useTransform(springY, (v) => v * depth(3) * POINTER_Y_RATIO) },
  ] as const satisfies readonly { x: MotionValue<number>; y: MotionValue<number> }[];


  /*
   * The connector pulse.
   *
   * Driven by the hero's own scroll progress rather than a timer, so it fires
   * when the reader is actually leaving the hero — around 40% through it — and
   * only then. `pathOffset` slides a short dash along the path; opacity opens
   * and closes around it so it arrives and leaves rather than parking at the
   * end. It cannot loop: the input is scroll position, not time.
   */
  const { scrollYProgress: heroProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const pulseOffset = useTransform(heroProgress, [0.34, 0.62], [0, 0.88], {
    clamp: true,
  });
  const pulseOpacity = useTransform(
    heroProgress,
    [0.32, 0.4, 0.56, 0.64],
    [0, 1, 1, 0],
  );

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!mouseActive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    // Normalised to -1..1; each frame multiplies by its own depth below.
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    mx.set(clamp(dx));
    my.set(clamp(dy));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn(
        // `relative` positions both the overlapping desktop frames and the
        // accent rule below.
        "relative flex gap-4 lg:block lg:h-[34rem]",
        className,
      )}
    >
      {hero.frames.map((frame, index) => {
        const motionSpec = FRAME_MOTION[index] ?? FRAME_MOTION[0];
        const offset = pointer[index as 0 | 1 | 2 | 3] ?? pointer[0];
        return (
          <Parallax
            key={frame.id}
            speed={motionSpec.speed}
            className={cn(
              "flex-1",
              !MOBILE_FRAMES.has(index) && "hidden lg:block",
              "lg:absolute",
              motionSpec.position,
            )}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                // 700ms is the spec's frame entrance. Not on our
                // 150/300/500/800 scale, and kept exact because the 90ms
                // stagger is timed against it — at 800ms the four frames
                // overlap enough to read as one block arriving.
                duration: reduce ? 0 : 0.7,
                ease: EASE.expo,
                delay: reduce ? 0 : 0.55 + index * 0.09,
              }}
              style={
                mouseActive
                  ? {
                      x: offset.x,
                      y: offset.y,
                      rotate: `${motionSpec.rotate}deg`,
                    }
                  : { rotate: `${motionSpec.rotate}deg` }
              }
              className="overflow-hidden rounded-md border border-line bg-paper"
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                // These frames are placeholders standing in for creative work,
                // so they carry no information to describe. An empty alt alone
                // still leaves the node in the accessibility tree as an unnamed
                // image; aria-hidden removes it, which is what "decorative"
                // actually means. Both are needed — one without the other is
                // the incomplete version of this fix.
                aria-hidden={frame.alt === "" ? true : undefined}
                width={frame.width}
                height={frame.height}
                // The first frame is the only image that could contend for LCP.
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="h-auto w-full"
              />
            </motion.div>
          </Parallax>
        );
      })}

      {/*
        The connector.

        The one accent in the cluster, and the only element hinting at the loop
        the rest of the site argues for. It runs out from behind the dominant
        frame and terminates against the smallest one, so it reads as a line
        between two things rather than a stray rule.

        An SVG stroke rather than a scaled div: stroke-dashoffset draws from one
        end to the other, where scaleX only stretches from an origin. It is
        paint-only either way, so nothing reflows.
      */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-[44%] top-[60%] z-20 hidden h-12 w-[38%] lg:block"
      >
        <motion.path
          d="M2 30 H44 C58 30 62 24 74 12 H98"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduce ? 0 : 0.8,
            ease: EASE.expo,
            delay: reduce ? 0 : 0.91,
          }}
        />
        {/*
          A single pulse travelling the line, fired once when the hero is about
          40% scrolled. One quiet signal that the cluster is connected — not a
          loop, and it never re-arms.
        */}
        {reduce ? null : (
          <motion.path
            d="M2 30 H44 C58 30 62 24 74 12 H98"
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: 0.12, opacity: pulseOpacity, pathOffset: pulseOffset }}
          />
        )}
      </svg>

    </motion.div>
  );
}
