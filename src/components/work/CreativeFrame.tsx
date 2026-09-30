"use client";

import type { CreativeItem } from "@/content/creatives";
import { creativeTypeLabels, toViewable } from "@/content/creatives";
import { CreativeMedia } from "@/components/work/CreativeMedia";
import { isPlaceholder } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

/**
 * One attributed piece of creative.
 *
 * The caption is not optional. Neither competitor labels a single piece, so
 * dozens of genuinely good reels read as stock footage — one captioned reel is
 * worth more than fifty anonymous ones. Format, title and client always render;
 * a result appears only when there is a verified one, never as a bracketed
 * token dressed up as a number.
 */
export function CreativeFrame({
  item,
  onOpen,
  priority = false,
  sizes,
  className,
}: {
  item: CreativeItem;
  onOpen?: () => void;
  /** Eager-load. The first three items only. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const label = creativeTypeLabels[item.type];
  const showResult = item.result && !isPlaceholder(item.result);

  return (
    <figure className={cn("group/frame", className)}>
      <CreativeMedia
        item={toViewable(item)}
        priority={priority}
        sizes={sizes}
        overlay={
          onOpen ? (
            <button
              type="button"
              onClick={onOpen}
              data-cursor="View"
              aria-label={`Open ${label}: ${item.title}`}
              className="absolute inset-0 z-10 cursor-pointer"
            />
          ) : null
        }
      />

      <figcaption className="mt-3">
        <span className="type-label text-ink-muted">{label}</span>
        <span className="type-body-sm mt-1 block text-ink">{item.title}</span>
        <span className="type-caption block">{item.client}</span>
        {showResult ? (
          <span className="type-caption mt-1 block text-accent-deep">{item.result}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
