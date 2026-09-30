import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The nav hover: the label rolls up and a colour-inverted twin rolls in.
 *
 * The twin is a real span carrying real text, marked aria-hidden — not
 * `content: attr(data-hover)`, which several screen readers cannot reach and no
 * translation layer can rewrite.
 *
 * Keyboard — focus-visible on the parent produces the identical treatment, so
 *   the state is never pointer-only.
 * Reduced motion — the global rule collapses the transition, so the inverted
 *   fill appears instantly instead of rolling. That is the intended fallback:
 *   the state still reads, the movement does not happen.
 *
 * The parent must carry `group/roll` and clip overflow; height comes from the
 * parent so both copies stay in register.
 */
export function RollLabel({
  children,
  rolled = false,
  className,
}: {
  children: ReactNode;
  /** Pin to the inverted state — used while the dropdown it triggers is open. */
  rolled?: boolean;
  className?: string;
}) {
  const face = cn(
    "flex h-10 items-center justify-center gap-1.5 px-4 whitespace-nowrap",
    className,
  );

  return (
    <span
      className={cn(
        "relative block transition-transform duration-200 ease-inout",
        rolled
          ? "-translate-y-full"
          : "group-hover/roll:-translate-y-full group-focus-visible/roll:-translate-y-full",
      )}
    >
      <span className={face}>{children}</span>
      <span
        aria-hidden="true"
        // Accent, not inverted ink: the roll is the one hover in the header,
        // and an ink twin on a bone bar reads as a state, not as a response.
        // White on #2c4bff is 5.90:1.
        className={cn(face, "absolute inset-x-0 top-full rounded-sm bg-accent text-white")}
      >
        {children}
      </span>
    </span>
  );
}
