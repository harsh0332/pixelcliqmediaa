import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/content/cases";
import { CasePlaceholderMedia } from "@/components/work/CasePlaceholderMedia";
import { selectedWork } from "@/content/home";
import type { AspectRatio } from "@/types";
import { isPlaceholder } from "@/lib/placeholders";
import { RATIO_CSS } from "@/lib/ratio";
import { cn } from "@/lib/utils";

/**
 * One case in a grid.
 *
 * Both states render from the same markup, branching once on `pending` rather
 * than threading conditionals through every line. A placeholder shows the
 * client and industry tokens with an honest status line; a published case renders
 * the real cover visual and direct link.
 */
export function CaseTile({
  entry,
  ratio = "4:5",
  className,
}: {
  entry: CaseStudy;
  ratio?: AspectRatio;
  className?: string;
}) {
  const pending = entry.status !== "published";
  const rawMetric = entry.results[0]?.metric;
  const metric = rawMetric && !isPlaceholder(rawMetric) ? rawMetric : null;

  return (
    <article className={cn("group/case", className)}>
      <Link href={`/work/${entry.slug}`} className="block">
        <div
          style={{ aspectRatio: RATIO_CSS[ratio] }}
          className="relative overflow-hidden rounded-md border border-line bg-sand"
        >
          <div className="size-full transition-transform duration-500 ease-expo group-hover/case:scale-[1.05] group-focus-visible/case:scale-[1.05]">
            {pending || !entry.cover ? (
              <CasePlaceholderMedia />
            ) : (
              <Image
                src={entry.cover}
                alt={entry.headline}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>

        {metric ? (
          <span className="type-label mt-4 inline-flex items-center rounded-pill border border-line px-3 py-1.5 text-ink-muted">
            {metric}
          </span>
        ) : null}

        {pending ? (
          <>
            <h2 className="type-h3 mt-3 max-w-[24ch]">
              {selectedWork.placeholderHeadline}
            </h2>
            <p className="type-caption mt-1 max-w-[34ch]">
              {selectedWork.placeholderNote}
            </p>
          </>
        ) : (
          <>
            <h2 className="type-h3 mt-3 max-w-[24ch]">{entry.headline}</h2>
            <p className="type-caption mt-1">
              {entry.client} · {entry.industry}
            </p>
          </>
        )}
      </Link>
    </article>
  );
}
