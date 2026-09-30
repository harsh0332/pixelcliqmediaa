import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CollapsePanelProps = {
  open: boolean;
  children: ReactNode;
  /** Applied to the inner (clipping) element, so padding does not leak into
   *  the collapsed state and leave a sliver of height behind. */
  className?: string;
  id?: string;
  role?: "region";
  "aria-labelledby"?: string;
};

/**
 * A disclosure panel that expands without animating `height`.
 *
 * A panel has to change layout height — that is what expanding means — so the
 * question is only how cheaply. Animating `height: auto` in JavaScript means a
 * measure-and-write on every frame. Transitioning `grid-template-rows` from
 * `0fr` to `1fr` hands the same visual result to the compositor's own style
 * pipeline: no JS runs per frame, and the content is never measured. The inner
 * element clips, so text is revealed rather than squashed.
 *
 * The panel stays mounted so the transition has something to animate, which
 * means a collapsed panel would otherwise keep its links in the tab order and
 * in the accessibility tree. `inert` removes both — it is the whole reason this
 * is safe to leave in the DOM.
 */
export function CollapsePanel({
  open,
  children,
  className,
  ...aria
}: CollapsePanelProps) {
  return (
    <div
      {...aria}
      inert={!open}
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-inout",
        "motion-reduce:transition-none",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div
        className={cn(
          "overflow-hidden transition-opacity duration-300 ease-inout",
          "motion-reduce:transition-none",
          open ? "opacity-100" : "opacity-0",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
