import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Vertical rhythm. Three options, deliberately — a one-off padding value is how
 * a layout starts drifting away from its own grid.
 */
const SPACING = {
  /** 80 / 112 / 160px. The default for every page section. */
  default: "py-20 md:py-28 lg:py-40",
  /** 200px at desktop. Reserved for the hero and the Compound Loop. */
  large: "py-20 md:py-28 lg:py-50",
  /** 48 / 64 / 80px. For bands that sit close to their neighbours. */
  tight: "py-12 md:py-16 lg:py-20",
  /** The section owns its own spacing. */
  none: "",
} as const;

export type SectionSpacing = keyof typeof SPACING;
export type SectionTone = "bone" | "paper" | "sand" | "inverse";

/**
 * Grain goes on the two cream tones and nowhere else.
 *
 * It is what makes bone read as paper stock rather than as flat #F7F5F0. Paper
 * is excluded on purpose — it earns its job by being the clean, bright surface
 * under the dense sections, and tooth would take that away. Ink is excluded
 * because noise over a dark field reads as compression artefacts.
 *
 * The utility itself caps at 0.025 and switches off below 768px.
 */
const GRAINED: ReadonlySet<SectionTone> = new Set(["bone", "sand"]);

export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  spacing?: SectionSpacing;
  tone?: SectionTone;
}

/**
 * A page band: vertical rhythm plus a background tone.
 *
 * Tone is applied as `data-tone`, not as a set of colour classes. The rules in
 * globals.css repoint --ink, --line and --focus-ring for that subtree, so a
 * child written as `text-ink-soft` is correct on bone and on the dark band with
 * no inverse variant of its own. Use tone="inverse" at most twice per page.
 *
 * scroll-margin-top comes from the base rule in globals.css and is restated
 * here so the anchor offset survives a change to that rule.
 */
export function Section({
  spacing = "default",
  tone = "bone",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn(
        SPACING[spacing],
        GRAINED.has(tone) && "grain",
        "scroll-mt-[var(--header-offset)]",
        className,
      )}
      {...props}
    />
  );
}
