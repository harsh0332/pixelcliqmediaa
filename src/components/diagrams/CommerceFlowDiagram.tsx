"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { commerceFlow } from "@/content/home";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

export interface CommerceFlowDiagramProps {
  className?: string;
  /** Larger wireframes and captions — for a page built around the diagram. */
  size?: "default" | "large";
}

/**
 * The path a pound of media spend takes: ad → landing → PDP → cart → checkout
 * → retention, as six hairline wireframes joined by a line that draws through
 * them on entry, each label lighting as the line reaches it.
 *
 * Extracted from the homepage Commerce block so the Commerce & Shopify service
 * page can be built around the same drawing rather than a copy of it. Every
 * node carries the one word we optimise there — that is what makes it an
 * argument and not a row of boxes.
 *
 * The wireframes are CSS boxes, never screenshots: a fake store screen would
 * be a fabricated artefact, and a real one is a client asset we do not have.
 *
 * Vertical on mobile with the same draw. Reduced motion renders it complete.
 */
export function CommerceFlowDiagram({ className, size = "default" }: CommerceFlowDiagramProps) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!inView || reduce) return;
    let index = -1;
    const timer = window.setInterval(() => {
      index += 1;
      setStep(index);
      if (index >= commerceFlow.length - 1) window.clearInterval(timer);
      // 233ms per node, from the design spec: six nodes land in ~1.4s.
    }, 233);
    return () => window.clearInterval(timer);
  }, [inView, reduce]);

  const activeCount = reduce ? commerceFlow.length : step + 1;
  const large = size === "large";

  return (
    <ol
      ref={ref}
      className={cn("flex flex-col md:flex-row md:items-start", className)}
    >
      {commerceFlow.map((node, index) => {
        const lit = index < activeCount;
        return (
          <Fragment key={node.label}>
            <li className="flex shrink-0 flex-row items-center gap-4 md:w-auto md:flex-col md:items-start md:gap-0">
              <span
                aria-hidden="true"
                className={cn(
                  "flex shrink-0 flex-col gap-1 rounded-sm border p-2 transition-colors duration-300",
                  large ? "size-16 md:size-20 md:gap-1.5 md:p-2.5" : "size-14 md:size-16",
                  lit ? "border-accent" : "border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "h-1 w-full rounded-xs transition-colors duration-300",
                    lit ? "bg-accent" : "bg-line-strong",
                  )}
                />
                <span className="h-px w-3/4 bg-line-strong" />
                <span className="h-px w-1/2 bg-line-strong" />
              </span>

              <span className={cn("md:mt-4", large && "md:max-w-[9rem]")}>
                <span
                  className={cn(
                    "type-label block transition-colors duration-300",
                    lit ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {node.label}
                </span>
                <span className={cn("mt-1 block", large ? "type-body-sm text-ink-soft" : "type-caption")}>
                  {node.note}
                </span>
              </span>
            </li>

            {index < commerceFlow.length - 1 ? (
              <li aria-hidden="true" className="md:flex-1">
                {/* Vertical on mobile, horizontal from md. Two elements rather
                    than one: a single element cannot switch transform axis at
                    a breakpoint. */}
                <span className="my-2 ml-7 block h-8 w-px bg-line md:hidden">
                  <motion.span
                    initial={false}
                    animate={{ scaleY: activeCount > index + 1 ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                    className="block h-full w-px origin-top bg-accent"
                  />
                </span>
                <span className={cn("hidden h-px w-full bg-line md:block", large ? "mt-10" : "mt-8")}>
                  <motion.span
                    initial={false}
                    animate={{ scaleX: activeCount > index + 1 ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                    className="block h-px w-full origin-left bg-accent"
                  />
                </span>
              </li>
            ) : null}
          </Fragment>
        );
      })}
    </ol>
  );
}
