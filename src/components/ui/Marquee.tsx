"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Keyboard — pauses on focus-within, so a focused link inside cannot scroll
 *   away from the user mid-read. Handled in CSS; no JavaScript involved.
 * Pointer — pauses on hover when `pauseOnHover` is set.
 * Touch   — no hover state; the row scrolls continuously and is not swipeable,
 *   which is correct for decorative content.
 * Reduced motion — the animation stops entirely and the row wraps onto multiple
 *   lines. The duplicate copy is hidden so nothing appears twice.
 *
 * The duplicate track is aria-hidden: assistive technology reads the list once.
 */

export interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. Larger is slower. */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);

  // Pause while off-screen. The animation is finite (three passes), and those
  // passes should be spent while the strip is actually visible.
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) node.removeAttribute("data-marquee-idle");
      else node.setAttribute("data-marquee-idle", "");
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const style = {
    "--marquee-duration": `${speed}s`,
    "--marquee-direction": direction === "right" ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div
      ref={root}
      className={cn("marquee w-full overflow-hidden", className)}
      data-pause={pauseOnHover}
      style={style}
    >
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div
          className="marquee-duplicate flex shrink-0 items-center"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
