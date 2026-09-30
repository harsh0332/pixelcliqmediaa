import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Gutters: 20px mobile, 32px tablet, 48px desktop, 64px above the 1440px
 * content ceiling. Every container carries them — nothing sits against the
 * viewport edge.
 */
const GUTTERS = "px-5 md:px-8 lg:px-12 wide:px-16";

const VARIANTS = {
  /** 1440px ceiling. The default for page sections. */
  default: "mx-auto w-full max-w-content",
  /** 1100px. The story blocks — a diagram plus its argument, nothing else. */
  mid: "mx-auto w-full max-w-mid",
  /** 880px. Focused editorial blocks and forms. */
  narrow: "mx-auto w-full max-w-narrow",
  /** 720px. Long-form reading. */
  prose: "mx-auto w-full max-w-prose",
  /** Full-bleed, gutters only. For galleries and edge-to-edge media. */
  wide: "w-full",
} as const;

export type ContainerVariant = keyof typeof VARIANTS;

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  variant?: ContainerVariant;
  as?: ElementType;
}

export function Container({
  variant = "default",
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return <Tag className={cn(VARIANTS[variant], GUTTERS, className)} {...props} />;
}
