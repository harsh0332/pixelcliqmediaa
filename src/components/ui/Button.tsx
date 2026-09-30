import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Keyboard — reachable in tab order as a native <button> or <a>; activates on
 *   Enter and, for <button>, Space. Focus ring comes from the global
 *   :focus-visible rule, so it is correct on dark bands automatically.
 * Pointer — hover moves the arrow 4px and fills the secondary variant.
 * Touch   — every standalone variant carries a 44px hit area via ::before, even
 *   at size="sm" where the visual height is 40px. The inline `link` variant is
 *   exempt under the WCAG 2.5.8 inline exception.
 * Disabled/loading — pointer events are removed from the whole control, so the
 *   icon cannot receive them either.
 */

const BASE = [
  "type-button relative inline-flex items-center justify-center gap-2",
  "whitespace-nowrap select-none",
  "transition-[background-color,color,border-color,opacity] duration-300 ease-inout",
  // 44px touch target without changing the visual box.
  "before:absolute before:left-0 before:top-1/2 before:h-11 before:w-full",
  "before:-translate-y-1/2 before:content-['']",
  "disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed",
  "aria-disabled:pointer-events-none aria-disabled:opacity-40 aria-disabled:cursor-not-allowed",
  "aria-busy:cursor-progress",
].join(" ");

const VARIANTS = {
  /** The primary CTA. White on cobalt — 5.90:1. */
  primary: "rounded-pill bg-accent text-white hover:bg-accent-deep focus-visible:bg-accent-deep active:bg-accent-deep",
  /** Outline that inverts rather than tinting. */
  secondary:
    "rounded-pill border border-ink text-ink hover:bg-ink focus-visible:bg-ink hover:text-bone focus-visible:text-bone active:bg-ink active:text-bone",
  /**
   * Text with an underline that draws in from the left. The rule lives on
   * ::after and animates transform only — never width.
   */
  ghost: [
    "rounded-pill text-ink",
    "after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-px",
    "after:origin-left after:scale-x-0 after:bg-accent after:content-['']",
    // ease-inout, not expo: the underline is a state change that reverses on
    // mouse-out, and expo's long tail makes the return read as a lag.
    "after:transition-transform after:duration-300 after:ease-inout",
    "hover:after:scale-x-100 focus-visible:after:scale-x-100",
    "active:text-accent-deep",
  ].join(" "),
  /** Inline, for use inside running text. No hit-area pseudo-element. */
  link: [
    "type-body inline text-accent-deep underline underline-offset-4",
    "decoration-accent-deep/40 hover:decoration-accent-deep focus-visible:decoration-accent-deep",
    "before:hidden",
  ].join(" "),
} as const;

const SIZES = {
  sm: "h-10 px-4",
  md: "h-12 px-6",
  lg: "h-14 px-8",
} as const;

/** The inline variant sets its own metrics. */
const INLINE_SIZE = "h-auto p-0";

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /**
   * Trailing icon. Defaults to an arrow on `primary`, nothing elsewhere.
   * Pass `false` to suppress it.
   */
  icon?: ReactNode | false;
  /** Swaps the icon for a spinner and sets aria-busy. Label text stays put. */
  loading?: boolean;
  children?: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function Adornment({
  variant,
  icon,
  loading,
}: Pick<CommonProps, "variant" | "icon" | "loading">) {
  if (loading) {
    return (
      <Loader2
        data-spinner
        aria-hidden="true"
        className="size-4 shrink-0 animate-spin"
      />
    );
  }
  if (icon === false) return null;
  if (icon) return <span aria-hidden="true">{icon}</span>;
  if (variant !== "primary") return null;
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-300 ease-expo group-hover/btn:translate-x-1 group-focus-visible/btn:translate-x-1"
    />
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    icon,
    loading = false,
    children,
  } = props;

  const classes = cn(
    "group/btn",
    BASE,
    VARIANTS[variant],
    variant === "link" ? INLINE_SIZE : SIZES[size],
    className,
  );

  const content = (
    <>
      {children}
      <Adornment variant={variant} icon={icon} loading={loading} />
    </>
  );

  // Destructure inside each narrowed branch: TypeScript cannot discriminate a
  // union that has already been spread into a rest element.
  if (props.href !== undefined) {
    const {
      variant: _v,
      size: _s,
      className: _c,
      icon: _i,
      loading: _l,
      children: _ch,
      ...linkProps
    } = props;
    return (
      <Link className={classes} aria-busy={loading || undefined} {...linkProps}>
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    icon: _i,
    loading: _l,
    children: _ch,
    ...buttonProps
  } = props;
  return (
    <button
      className={classes}
      aria-busy={loading || undefined}
      disabled={loading || buttonProps.disabled}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
