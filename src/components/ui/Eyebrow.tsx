import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

const TONES = {
  muted: "text-ink-muted",
  ink: "text-ink",
  // --link-color, not accent-deep: repointed to accent-lift on the ink band,
  // so an eyebrow inside a dark section is correct without a variant.
  accent: "text-link",
} as const;

export type EyebrowTone = keyof typeof TONES;

export interface EyebrowProps extends ComponentPropsWithoutRef<"span"> {
  tone?: EyebrowTone;
  as?: ElementType;
  /**
   * A sequence marker such as "01".
   *
   * Only pass this where the content is genuinely ordered — process steps, loop
   * stages, the pillar ordering. Numbering an unordered set of cards is the
   * clearest tell of a template, so the prop is named for what it means rather
   * than for where it appears.
   */
  sequence?: string;
  /**
   * A short accent rule above the label — the hairline that marks a section's
   * start. One per section, on the section's own eyebrow, never on the rules
   * inside it.
   */
  rule?: boolean;
}

/**
 * The small uppercase tracked label. The only place uppercase is permitted.
 *
 * Accent by default. These were ink-muted, and switching them is the cheapest
 * visible life on the site: one label per section, every section, no layout
 * cost. Pass tone="muted" where the label is a column header rather than a
 * section marker, or where a spine lights it on arrival.
 */
export function Eyebrow({
  tone = "accent",
  as: Tag = "span",
  sequence,
  rule = false,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <Tag className={cn("type-label", TONES[tone], rule && "block", className)} {...props}>
      {rule ? (
        <span aria-hidden="true" className="mb-4 block h-px w-10 bg-accent" />
      ) : null}
      {sequence ? (
        <>
          <span className="text-link tabular-nums">{sequence}</span>
          <span aria-hidden="true" className="mx-2 opacity-40">
            /
          </span>
        </>
      ) : null}
      {children}
    </Tag>
  );
}
