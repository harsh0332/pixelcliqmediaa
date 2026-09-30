import { cn } from "@/lib/utils";

/**
 * The stand-in for a case study cover.
 *
 * A CSS diagonal hairline pattern rather than an image: nothing here can be
 * mistaken for a screenshot, a dashboard or a client asset, and there is no file
 * to swap out incorrectly. It reads as "reserved" rather than as "broken", which
 * is the whole point of a dignified empty state.
 */
export function CasePlaceholderMedia({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        // Support tone, not sand: a reserved frame should not be a fourth cream.
        "size-full bg-support",
        // 1px diagonals at a wide interval — texture, not a screen.
        "bg-[repeating-linear-gradient(135deg,var(--line)_0px,var(--line)_1px,transparent_1px,transparent_14px)]",
        className,
      )}
    />
  );
}
