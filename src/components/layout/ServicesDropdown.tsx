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
import { ChevronDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { FeatureVisual } from "@/components/home/Mockups";
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
  /** The service whose preview is showing; follows hover and focus. */
  const [active, setActive] = useState(0);
  // Display order: column by column, so arrow keys walk the menu as it reads.
  const ordered = mega.groups.flatMap((group) => mega.items.filter((item) => item.group === group.id));
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
    const last = ordered.length - 1;
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
      End: ordered.length - 1,
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
            initial={reduce ? false : { opacity: 0, y: -10, clipPath: "inset(0% 0% 100% 0% round 20px)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 20px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, clipPath: "inset(0% 0% 92% 0% round 20px)" }}
            transition={{ duration: reduce ? 0 : DURATION.base, ease: EASE.expo }}
            onKeyDown={(event) => {
              // Panel-level, so Escape works from every control inside.
              if (event.key === "Escape") {
                event.preventDefault();
                close(true);
              }
            }}
            // Padding, not margin: the gap under the trigger stays part of the
            // hover area, so the pointer can travel into the panel.
            className="absolute inset-x-0 top-full z-50 pt-3"
          >
            <div className={styles.panel}>
            <div className={styles.body}>
              <div className={styles.index}>
                <div className={styles.groups}>
                  {mega.groups.map((group) => (
                    <div key={group.id} className={styles.group}>
                      <p className={styles.groupLabel}>{group.label}</p>
                      <ul>
                        {ordered.map((item, index) => {
                          if (item.group !== group.id) return null;
                          const current = pathname === item.href;
                          return (
                            <motion.li
                              key={item.href}
                              initial={reduce ? false : { opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: reduce ? 0 : DURATION.base,
                                ease: EASE.expo,
                                delay: reduce ? 0 : 0.08 + index * STAGGER.tight,
                              }}
                            >
                              <Link
                                ref={(node) => {
                                  itemRefs.current[index] = node;
                                }}
                                href={item.href}
                                aria-current={current ? "page" : undefined}
                                onKeyDown={(event) => onItemKeyDown(event, index)}
                                onMouseEnter={() => setActive(index)}
                                onFocus={() => setActive(index)}
                                className={cn(styles.item, index === active && styles.itemActive)}
                              >
                                <span className={styles.pixel} aria-hidden="true" />
                                <span className={styles.itemLabel}>{item.label}</span>
                                <ArrowUpRight className={styles.itemArrow} size={16} aria-hidden="true" />
                              </Link>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className={styles.foot}>
                  <Link href={mega.cta.href} className={styles.footCta}>
                    {mega.cta.label}
                    <span aria-hidden="true"><ArrowRight size={16} /></span>
                  </Link>
                  <Link href={mega.footerLink.href} className={styles.footAll}>
                    {mega.footerLink.label} <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Keyed by service: a new hover re-mounts the preview, which
                  replays that service's animation from the first frame. */}
              <div className={styles.preview}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={ordered[active]?.href}
                    className={styles.previewInner}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: reduce ? 0 : 0.28, ease: EASE.expo }}
                  >
                    <div className={styles.visual} aria-hidden="true">
                      <FeatureVisual kind={ordered[active]?.visual ?? "ads"} instance="menu" />
                    </div>
                    <Link href={ordered[active]?.href ?? mega.href} className={styles.previewLink} tabIndex={-1}>
                      <span>{mega.explore} {ordered[active]?.label}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
