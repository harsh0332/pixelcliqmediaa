"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { CreativeItem } from "@/content/creatives";
import { CreativeFrame } from "@/components/work/CreativeFrame";
import { creativeShowcase } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * The horizontal track.
 *
 * Native `overflow-x` with scroll-snap, not a scroll-linked translateX on a
 * pinned section. Two reasons: the page already pins the Compound Loop for
 * 300vh and the creative reveal for 250vh, and a third scroll-driven pin is
 * where interaction latency goes — native scrolling stays on the compositor and
 * gives momentum and touch drag for free.
 *
 * The cursor reads "Drag" on pointer devices, so dragging genuinely works:
 * advertising an affordance that does nothing is the same failure as a
 * clickable tile computing `cursor: auto`. A 5px threshold separates a drag
 * from a click, so dragging across a frame never opens the lightbox.
 *
 * Frames keep their true ratios at a common width, so heights vary and the row
 * reads as a composition rather than a filmstrip.
 */

/** Vertical offsets, so the row is art-directed rather than aligned. */
const OFFSETS = [0, 40, 12, 56, 24, 68, 8, 44] as const;

const DRAG_THRESHOLD = 5;

export function CreativeTrack({
  items,
  onOpen,
  year,
}: {
  items: CreativeItem[];
  onOpen: (item: CreativeItem) => void;
  year: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    progress.set(max > 0 ? el.scrollLeft / max : 0);
  }, [progress]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || event.pointerType === "touch") return; // touch scrolls natively
    drag.current = {
      active: true,
      startX: event.clientX,
      startLeft: el.scrollLeft,
      moved: 0,
    };
    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(delta));
    el.scrollLeft = drag.current.startLeft - delta;
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  /** Suppress the click that follows a drag, so dragging never opens an item. */
  const guardedOpen = (item: CreativeItem) => {
    if (drag.current.moved > DRAG_THRESHOLD) {
      drag.current.moved = 0;
      return;
    }
    onOpen(item);
  };

  return (
    <div className="relative">
      {/* Rotated edge label. Decorative: the section is already titled. */}
      <span
        aria-hidden="true"
        className="type-label absolute top-1/2 left-2 z-10 hidden -translate-y-1/2 [writing-mode:vertical-rl] text-ink-muted lg:block"
      >
        {creativeShowcase.trackLabel} — {year}
      </span>

      <div
        ref={trackRef}
        onScroll={updateProgress}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        data-cursor="Drag"
        className={cn(
          "flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pt-4 pb-20",
          // Gutters match the container so the first item lines up with the page.
          "px-5 md:px-8 lg:px-16",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          dragging ? "cursor-grabbing select-none" : "lg:cursor-grab",
        )}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            style={{ marginTop: OFFSETS[index % OFFSETS.length] }}
            className="w-[15rem] shrink-0 snap-start md:w-[17rem]"
          >
            {/* Never eager: the track is far below the fold, and the reveal
                above it already owns the three eager slots. */}
            <CreativeFrame
              item={item}
              onOpen={() => guardedOpen(item)}
              sizes="(min-width: 768px) 17rem, 15rem"
            />
          </div>
        ))}
      </div>

      {/* Progress under the track. scaleX only. */}
      <div aria-hidden="true" className="mx-5 h-px bg-line md:mx-8 lg:mx-16">
        <motion.div
          style={{ scaleX: progress }}
          className="h-px w-full origin-left bg-accent"
        />
      </div>
    </div>
  );
}
