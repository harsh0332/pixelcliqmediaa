"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import styles from "./ServicesDropdown.module.css";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ArrowUpRight, Target, Layers3, ShoppingBag, Search, Workflow, ChartNoAxesCombined } from "lucide-react";

const serviceIcons = [Target, Layers3, ShoppingBag, Search, Workflow, ChartNoAxesCombined];
import { RollLabel } from "@/components/layout/RollLabel";
import type { MegaMenu } from "@/content/navigation";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A disclosure navigation menu, per the ARIA Authoring Practices pattern for a
 * dropdown containing links.
 *
 * Keyboard — Enter or Space toggles. Arrow Down opens and lands on the first
 *   pillar. Arrow Up/Down move between pillars, Home/End jump to the ends.
 *   Escape closes and restores focus to the trigger. Tab moves through the
 *   panel and, on leaving it, closes the panel behind you.
 * Pointer — opens on hover, closes on outside click or on scroll.
 * Touch   — rendered only at >=1024px; below that the mobile menu presents the
 *   same six pillars as an inline accordion.
 *
 * Why focus is not trapped here: this is navigation, not a modal. A trap would
 * stop a keyboard user reaching Work, Insights, About or the primary CTA
 * without first pressing Escape — the APG pattern is explicit that Tab should
 * leave a disclosure menu. The mobile menu *is* modal and does trap focus.
 *
 * The panel is mounted and unmounted rather than hidden with opacity, so there
 * is never an invisible-but-clickable link floating over the page.
 *
 * All copy and every destination comes from navigation.ts, which derives from
 * servicePillars — a pillar cannot appear here with a stale title or a dead
 * slug, and cannot appear here without also being in the footer and the mobile
 * menu.
 */
export function ServicesDropdown({ mega }: { mega: MegaMenu }) {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  /** Set when the panel is opened by keyboard, so focus follows it in. */
  const focusFirstOnOpen = useRef(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close on route change. Adjusted during render rather than in an effect:
  // this is state derived from a prop, so it should settle before paint.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const sectionActive =
    pathname === mega.href ||
    pathname.startsWith(`${mega.href}/`) ||
    mega.items.some((item) => pathname === item.href);

  const close = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  // Move focus into the panel once it has actually mounted. A single
  // requestAnimationFrame fires before React commits the panel, so the item
  // refs are still null at that point and focus silently stays on the trigger.
  useEffect(() => {
    if (!open || !focusFirstOnOpen.current) return;
    focusFirstOnOpen.current = false;
    itemRefs.current[0]?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onScroll = () => setOpen(false);

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  const focusItem = (index: number) => {
    const last = mega.items.length - 1;
    const wrapped = index < 0 ? last : index > last ? 0 : index;
    itemRefs.current[wrapped]?.focus();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusFirstOnOpen.current = true;
      setOpen(true);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      close(true);
    }
  };

  const onItemKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const targets: Record<string, number | undefined> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: mega.items.length - 1,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    focusItem(next);
  };

  /** Tab past the last item closes the panel rather than leaving it hanging. */
  const onBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={onBlurCapture}
    >
      <button
        ref={triggerRef}
        type="button"
        // See NavLink: the roll duplicates the label, so name it explicitly.
        aria-label={mega.label}
        aria-expanded={open}
        // Only while open: the panel is unmounted when closed, and an
        // aria-controls pointing at a missing id is an unresolved IDREF that
        // some screen readers report as a broken relationship.
        aria-controls={open ? panelId : undefined}
        aria-current={sectionActive ? "page" : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "type-button group/roll relative block h-10 overflow-hidden rounded-sm",
          "before:absolute before:left-0 before:top-1/2 before:z-10 before:h-11 before:w-full",
          "before:-translate-y-1/2 before:content-['']",
          sectionActive ? "text-ink" : "text-ink-soft",
        )}
      >
        <RollLabel rolled={open}>
          {mega.label}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-3.5 transition-transform duration-300 ease-expo",
              open && "rotate-180",
            )}
          />
        </RollLabel>
        {sectionActive && !open ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-4 bottom-1.5 h-px bg-accent"
          />
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : DURATION.fast, ease: EASE.expo }}
            onKeyDown={(event) => {
              // Panel-level, so Escape works from every control inside.
              if (event.key === "Escape") {
                event.preventDefault();
                close(true);
              }
            }}
            className={`absolute inset-x-0 top-full z-50 mt-3 rounded-lg border border-line bg-paper p-6 ${styles.panel}`}
          >
            <div className="grid grid-cols-12 gap-6">
              <div className={`col-span-3 ${styles.intro}`}>
                <span className={styles.introLabel}>THE CONNECTED CAPABILITIES</span>
                <p className="type-h3 max-w-[16ch]">{mega.intro}</p>
                <div className={styles.introOrbit} aria-hidden="true"><span/><span/><ArrowUpRight size={48}/></div>
                <Link
                  href={mega.footerLink.href}
                  className="type-button group/all mt-6 inline-flex min-h-12 items-center gap-2 text-accent-deep"
                >
                  {mega.footerLink.label}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-expo group-hover/all:translate-x-1 group-focus-visible/all:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>

              <ul className="col-span-9 grid grid-cols-3 gap-3">
                {mega.items.map((item, index) => {
                  const current = pathname === item.href;
                  const Icon = serviceIcons[index % serviceIcons.length]!;
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? 0 : DURATION.fast,
                        ease: EASE.expo,
                        delay: reduce ? 0 : index * STAGGER.tight * 0.75,
                      }}
                    >
                      <Link
                        ref={(node) => {
                          itemRefs.current[index] = node;
                        }}
                        href={item.href}
                        aria-current={current ? "page" : undefined}
                        onKeyDown={(event) => onItemKeyDown(event, index)}
                        className={`group/item block min-h-12 ${styles.card}`}
                      >
                        <div className={styles.cardTop}><Icon size={22} strokeWidth={1.5} aria-hidden="true"/><ArrowUpRight size={16} aria-hidden="true"/></div>
                        <span
                          className={cn(
                            "type-label transition-colors duration-300",
                            current
                              ? "text-accent-deep"
                              : "text-ink-muted group-hover/item:text-accent-deep group-focus-visible/item:text-accent-deep",
                          )}
                        >
                          {item.number}
                        </span>
                        <span className={styles.cardTitle}>
                          {item.label}
                          <span
                            aria-hidden="true"
                            className={cn(
                              "mt-1 block h-px origin-left bg-accent transition-transform duration-300 ease-expo",
                              current
                                ? "scale-x-100"
                                : "scale-x-0 group-hover/item:scale-x-100 group-focus-visible/item:scale-x-100",
                            )}
                          />
                        </span>
                        <span className={styles.cardDescription}>
                          {item.description}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
