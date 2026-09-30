import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

const SIZES = {
  "display-xl": "type-display-xl",
  display: "type-display",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
} as const;

export type HeadingSize = keyof typeof SIZES;
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Sensible default size per level; override when hierarchy and looks differ. */
const DEFAULT_SIZE: Record<HeadingLevel, HeadingSize> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h3",
  5: "h3",
  6: "h3",
};

export interface BalancedHeadingProps
  extends Omit<ComponentPropsWithoutRef<"h2">, "children"> {
  /** Document outline level. Choose for semantics, not for looks. */
  level?: HeadingLevel;
  /** Visual size. Defaults from `level`. */
  size?: HeadingSize;
  /**
   * A single word inside `children` to set in Instrument Serif italic.
   *
   * The editorial signature: at most once per section, and never more than one
   * word. Requires `children` to be a string. Matched on a word boundary, first
   * occurrence only — passing a word that appears twice emphasises the first.
   */
  emphasis?: string;
  children: ReactNode;
}

/** Split a string once around `word`, keeping surrounding punctuation intact. */
function withEmphasis(text: string, word: string): ReactNode {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`\\b${escaped}\\b`, "i").exec(text);
  if (!match) return text;

  const start = match.index;
  const end = start + match[0].length;
  return (
    <>
      {text.slice(0, start)}
      <span className="type-emphasis">{match[0]}</span>
      {text.slice(end)}
    </>
  );
}

/**
 * The canonical headline.
 *
 * `text-wrap: balance` distributes words evenly so a display headline never
 * strands one word on the last line. Level and size are separate on purpose: a
 * section often needs an <h2> that reads at display scale.
 */
export function BalancedHeading({
  level = 2,
  size,
  emphasis,
  className,
  children,
  ...props
}: BalancedHeadingProps) {
  const Tag = `h${level}` as const;
  const content =
    emphasis && typeof children === "string"
      ? withEmphasis(children, emphasis)
      : children;

  return (
    <Tag
      className={cn(SIZES[size ?? DEFAULT_SIZE[level]], "text-balance", className)}
      {...props}
    >
      {content}
    </Tag>
  );
}
