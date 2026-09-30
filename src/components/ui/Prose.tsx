import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const SIZES = {
  body: "type-body",
  lg: "type-body-lg",
  sm: "type-body-sm",
} as const;

export interface ProseProps extends ComponentPropsWithoutRef<"div"> {
  size?: keyof typeof SIZES;
}

/**
 * The body-copy wrapper. Caps the measure at 62ch — a paragraph running the
 * full width of a 1440px container is unreadable however good the type is — and
 * spaces stacked children without each one declaring its own margin.
 */
export function Prose({ size = "body", className, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        SIZES[size],
        "max-w-measure text-ink-soft [&>*+*]:mt-5",
        className,
      )}
      {...props}
    />
  );
}
