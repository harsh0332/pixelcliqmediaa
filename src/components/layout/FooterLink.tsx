import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * A footer link with the house underline-draw hover: a hairline that scales in
 * from the left. Transform only, so it costs nothing to animate.
 */
export function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        // min-w-11 plus a negative margin: short labels like "FAQ" measured
        // 28px wide. The padding widens the target without shifting the text.
        "type-body-sm group/link relative inline-flex min-h-11 min-w-11 items-center text-ink-soft -mx-2 px-2",
        "transition-colors duration-300 hover:text-ink focus-visible:text-ink",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute bottom-2.5 left-2 right-2 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-expo group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
      />
    </Link>
  );
}
