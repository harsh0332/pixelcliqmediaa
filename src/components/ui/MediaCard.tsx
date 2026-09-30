import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AspectRatio } from "@/types";
import { cn } from "@/lib/utils";

const RATIO_CSS: Record<AspectRatio, string> = {
  "4:5": "4 / 5",
  "9:16": "9 / 16",
  "16:9": "16 / 9",
  "1:1": "1 / 1",
};

/**
 * Keyboard — when `href` is set the whole card is one link, stretched over the
 *   frame. Focusing it reproduces the hover state exactly, via
 *   group-has-[a:focus-visible], so keyboard users see the caption too.
 * Pointer — the image scales to 1.04 inside a fixed frame: the crop changes but
 *   the frame never moves, so neighbouring cards cannot be nudged.
 * Touch   — there is no hover, so the caption renders in its resting position
 *   at the foot of the frame rather than being hidden behind a hover.
 *
 * CLS — the figure carries the aspect ratio, so the space is reserved before the
 * image loads. Only transform and opacity are animated.
 */

export interface MediaCardProps {
  src: string;
  alt: string;
  ratio: AspectRatio;
  caption?: ReactNode;
  href?: string;
  /**
   * Load eagerly. Pass this for the first two cards of any gallery — they are
   * above the fold and lazy-loading them delays LCP.
   */
  priority?: boolean;
  /** Label shown by the custom cursor over this card. */
  cursorLabel?: string;
  sizes?: string;
  className?: string;
}

export function MediaCard({
  src,
  alt,
  ratio,
  caption,
  href,
  priority = false,
  cursorLabel,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  className,
}: MediaCardProps) {
  return (
    <figure
      data-cursor={cursorLabel}
      style={{ aspectRatio: RATIO_CSS[ratio] }}
      className={cn(
        "group relative isolate overflow-hidden rounded-md bg-support",
        // The scale alone reads as motion, not as a response. A hairline of
        // accent inside the frame says "this one".
        "ring-1 ring-inset ring-transparent transition-[box-shadow] duration-300 ease-expo",
        "hover:ring-accent has-[a:focus-visible]:ring-accent",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "object-cover transition-transform duration-600 ease-expo",
          "group-hover:scale-[1.05] group-focus-visible:scale-[1.05] group-has-[a:focus-visible]:scale-[1.05]",
        )}
      />

      {href ? (
        <Link href={href} className="absolute inset-0 z-20 rounded-md">
          <span className="sr-only">{alt}</span>
        </Link>
      ) : null}

      {caption ? (
        <figcaption
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/80 to-transparent",
            "px-4 pt-10 pb-4 text-bone",
            // No hover on touch: the caption simply rests in place there.
            "transition-transform duration-600 ease-expo",
            "md:translate-y-full md:group-hover:translate-y-0 md:group-focus-visible:translate-y-0",
            "md:group-has-[a:focus-visible]:translate-y-0",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
