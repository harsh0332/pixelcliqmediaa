import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

const TONES = {
  /** A quiet outlined tag. */
  outline: "border border-line-strong text-ink-soft",
  /** Filled. For the current item in a nav or a highlighted tag. */
  solid: "border border-ink bg-ink text-bone",
  /** Accent tint. Use rarely — it spends the accent budget. */
  accent: "border border-transparent bg-accent-wash text-accent-deep",
} as const;

export type PillTone = keyof typeof TONES;

export interface PillProps extends ComponentPropsWithoutRef<"span"> {
  tone?: PillTone;
  as?: ElementType;
}

/**
 * A static label in the chip shape — tags, categories, the current nav item.
 * Not interactive: if it toggles something, use <Chip>; if it navigates, pass
 * `as={Link}` so it is a real link with real focus behaviour.
 */
export function Pill({ tone = "outline", as: Tag = "span", className, ...props }: PillProps) {
  return (
    <Tag
      className={cn(
        "type-button inline-flex h-8 items-center rounded-pill px-3",
        TONES[tone],
        className,
      )}
      {...props}
    />
  );
}
