"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RollLabel } from "@/components/layout/RollLabel";
import { cn } from "@/lib/utils";

/**
 * A top-level nav link.
 *
 * The current page is marked persistently, not on hover: aria-current for
 * assistive technology and an accent underline for everyone else. A hover-only
 * treatment means no inner page ever tells you where you are.
 *
 * Touch — 40px visual height with a 44px hit area from ::before.
 */
export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      // The roll duplicates the label in the subtree. The twin is aria-hidden,
      // so the computed name is correct by spec — but an explicit label removes
      // any dependence on how a given screen reader walks a duplicated subtree,
      // and it matches the visible text exactly (WCAG 2.5.3 Label in Name).
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "type-button group/roll relative block h-10 overflow-hidden rounded-sm",
        "before:absolute before:left-0 before:top-1/2 before:z-10 before:h-11 before:w-full",
        "before:-translate-y-1/2 before:content-['']",
        active ? "text-ink" : "text-ink-soft",
      )}
    >
      <RollLabel>{label}</RollLabel>
      {active ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-4 bottom-1.5 h-px bg-accent"
        />
      ) : null}
    </Link>
  );
}
