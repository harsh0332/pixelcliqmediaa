import { cn } from "@/lib/utils";

const VARIANTS = {
  hairline: "border-line",
  strong: "border-line-strong",
} as const;

export type RuleVariant = keyof typeof VARIANTS;

export interface RuleProps {
  variant?: RuleVariant;
  className?: string;
}

/**
 * A horizontal rule. This site separates with lines, not with drop shadows, so
 * expect to reach for it constantly. Inherits the correct colour on dark bands
 * because --line is repointed by data-tone.
 */
export function Rule({ variant = "hairline", className }: RuleProps) {
  return <hr className={cn("border-0 border-t", VARIANTS[variant], className)} />;
}
