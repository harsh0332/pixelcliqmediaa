import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Keyboard — a native <button>, so it is in the tab order and toggles on Enter
 *   and Space. `aria-pressed` communicates the state; the label never changes,
 *   which is what screen reader users expect from a toggle.
 * Pointer — hover darkens the border on an inactive chip only. An active chip
 *   does not change on hover: it is already at its end state.
 * Touch   — 40px visual height with a 44px hit area from ::before.
 */

export interface ChipProps
  extends Omit<ComponentPropsWithoutRef<"button">, "className"> {
  /** Toggle state. Drives both the fill and aria-pressed. */
  pressed?: boolean;
  className?: string;
}

/** A filter toggle. Active state is an ink fill with bone text. */
/*
 * The unpressed border is --line-field, not --line-strong.
 *
 * A chip is a control whose pressed state is carried by its border and fill,
 * which makes that border "visual information required to identify a user
 * interface component and its state" under WCAG 1.4.11 — so it needs 3:1
 * against the surface behind it. Measured: --line-strong is 1.63:1 on bone and
 * 1.77:1 on paper, which fails; --line-field is 3.32:1 and 3.61:1, which is
 * why that token exists. --line-strong stays correct for dividers, where no
 * minimum applies.
 */
export function Chip({ pressed = false, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn(
        "type-button relative inline-flex h-10 items-center rounded-pill border px-4",
        "transition-colors duration-150 ease-inout select-none",
        "before:absolute before:left-0 before:top-1/2 before:h-11 before:w-full",
        "before:-translate-y-1/2 before:content-['']",
        "disabled:pointer-events-none disabled:opacity-40",
        pressed
          ? "border-ink bg-ink text-bone"
          : "border-line-field text-ink-soft hover:border-ink focus-visible:border-ink hover:text-ink focus-visible:text-ink",
        className,
      )}
      {...props}
    />
  );
}
