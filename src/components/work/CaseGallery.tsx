"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { CaseStudy } from "@/content/cases";
import { CasePlaceholderMedia } from "@/components/work/CasePlaceholderMedia";
import { RATIO_CSS, RATIO_SIZE } from "@/lib/ratio";
import { isPlaceholder } from "@/lib/placeholders";
import type { ViewableMedia } from "@/types";
import { cn } from "@/lib/utils";

/*
 * The lightbox is loaded on demand.
 *
 * Its markup only exists once a reader opens it, so shipping the dialog, its
 * focus trap and its animation code in the first-load bundle pays for a
 * component most visits never instantiate. `ssr: false` costs nothing here for
 * the same reason — there is no server-rendered markup to preserve.
 */
const Lightbox = dynamic(
  () => import("@/components/work/Lightbox").then((m) => m.Lightbox),
  { ssr: false },
);

/**
 * THE WORK — the case gallery.
 *
 * Frames keep their own ratios and are laid out asymmetrically rather than on a
 * uniform grid, so a mixed set reads as art direction. Opens the same lightbox
 * every other surface uses.
 *
 * While a case is unpublished the frames render the hairline placeholder rather
 * than a missing image, and the lightbox is disabled — there is nothing to
 * enlarge, and a viewer that opens on an empty frame is worse than no viewer.
 */
export function CaseGallery({ entry }: { entry: CaseStudy }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pending = entry.status !== "published";

  const items: ViewableMedia[] = entry.gallery.map((frame, index) => ({
    id: `${entry.slug}-${index}`,
    ratio: frame.ratio,
    src: frame.src,
    alt: isPlaceholder(frame.caption)
      ? `Placeholder frame for ${entry.client}`
      : frame.caption,
    title: frame.caption,
    client: entry.client,
    result: null,
    label: "Case frame",
  }));

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2">
        {entry.gallery.map((frame, index) => (
          <li
            key={`${frame.src}-${index}`}
            // Every third frame runs full width, breaking the two-column rhythm.
            className={cn(index % 3 === 2 && "md:col-span-2")}
          >
            <figure>
              <div
                style={{ aspectRatio: RATIO_CSS[frame.ratio] }}
                className="overflow-hidden rounded-md border border-line bg-sand"
              >
                {pending ? (
                  <CasePlaceholderMedia />
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    data-cursor="View"
                    aria-label={`Open frame ${index + 1}`}
                    className="block size-full cursor-pointer"
                  >
                    <Image
                      src={frame.src}
                      alt={frame.caption}
                      width={RATIO_SIZE[frame.ratio].width}
                      height={RATIO_SIZE[frame.ratio].height}
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className="size-full object-cover"
                    />
                  </button>
                )}
              </div>
              {!isPlaceholder(frame.caption) ? (
                <figcaption className="type-caption mt-3">
                  {frame.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>

      {pending ? null : (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
