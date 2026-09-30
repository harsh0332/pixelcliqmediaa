"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CollapsePanel } from "@/components/motion/CollapsePanel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { headerNav } from "@/content/navigation";
import { site } from "@/content/site";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useScrollLock } from "@/lib/useScrollLock";
import { isPlaceholder } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

/**
 * Keyboard — the trigger is a real button with aria-expanded and aria-controls.
 *   Escape closes and returns focus to it. Focus is trapped while open, which is
 *   correct here: the overlay covers the page, so Tab reaching the content
 *   behind it would strand the user somewhere they cannot see.
 * Pointer — closes on selecting a link or on route change.
 * Touch   — every target is at least 48px tall; body scroll is locked so the
 *   page behind cannot rubber-band under the overlay.
 * Reduced motion — the panel appears without sliding and links do not stagger.
 */
export function MobileMenu() {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close on route change — derived from a prop, so adjusted during render.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useScrollLock(open);
  useFocusTrap(panelRef, open);

  // A hidden mobile overlay must not keep the desktop page inert or locked.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  /*
   * Hide the rest of the page from assistive tech while the menu is open.
   *
   * `aria-modal` plus the focus trap already contain a keyboard user, but
   * aria-modal is advisory — older screen readers still let a virtual cursor
   * wander into the page behind the dialog. `inert` removes that content from
   * the accessibility tree outright.
   *
   * Scoped to <main> and <footer> rather than to every sibling of <body>: this
   * dialog renders inside <header>, so inerting all body children would
   * disable the menu itself along with its own close button.
   */
  useEffect(() => {
    if (!open) return;
    const regions = [
      document.getElementById("main-content"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el !== null);

    regions.forEach((el) => el.setAttribute("inert", ""));
    return () => regions.forEach((el) => el.removeAttribute("inert"));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Move focus into the panel once it exists.
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  const items = headerNav;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        // Only while the panel is mounted: an IDREF to nothing is an ARIA error.
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] -mr-2 inline-flex size-12 items-center justify-center lg:hidden"
      >
        {/* Two lines that rotate into an X — the same elements throughout, so
            the morph is a transform rather than an icon swap. */}
        <span className="relative block h-4 w-6">
          <span
            className="absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 ease-expo"
            style={{
              transform: open
                ? "translateY(7px) rotate(45deg)"
                : "translateY(2px)",
            }}
          />
          <span
            className="absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 ease-expo"
            style={{
              transform: open
                ? "translateY(7px) rotate(-45deg)"
                : "translateY(12px)",
            }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onClick={(event) => {
              // Pathname does not change for current-page and hash links.
              if ((event.target as HTMLElement).closest("a[href]")) {
                setOpen(false);
                triggerRef.current?.focus();
              }
            }}
            data-tone="bone"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{
              duration: reduce ? 0 : DURATION.base,
              ease: EASE.expo,
            }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain lg:hidden"
          >
            <Container className="flex min-h-full flex-col pt-28 pb-8">
              <nav aria-label="Site" className="flex-1">
                <ul className="border-t border-line">
                  {items.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? 0 : DURATION.base,
                        ease: EASE.expo,
                        delay: reduce ? 0 : 0.15 + index * STAGGER.base,
                      }}
                      className="border-b border-line"
                    >
                      {item.mega ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={servicesOpen}
                            onClick={() => setServicesOpen((v) => !v)}
                            className="flex w-full items-baseline gap-4 py-5 text-left"
                          >
                            <span className="type-label w-8 shrink-0 text-ink-muted tabular-nums">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="type-h2 flex-1">{item.label}</span>
                            <span
                              aria-hidden="true"
                              className={cn(
                                "type-h3 transition-transform duration-300 ease-expo",
                                servicesOpen && "rotate-45",
                              )}
                            >
                              +
                            </span>
                          </button>

                          <CollapsePanel open={servicesOpen}>
                            {/* The same `mega` data the desktop dropdown renders,
                                including its "View all services" link — one
                                source, so the two menus cannot list different
                                items, and /services is reachable on a phone. */}
                            <ul>
                              {item.mega.items.map((entry) => (
                                <li key={entry.href}>
                                  <Link
                                    href={entry.href}
                                    className="flex min-h-12 items-center gap-4 border-t border-line py-3 pl-12"
                                  >
                                    <span className="type-label text-ink-muted tabular-nums">
                                      {entry.number}
                                    </span>
                                    <span className="type-body-lg">{entry.label}</span>
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href={item.mega.footerLink.href}
                                  className="flex min-h-12 items-center gap-4 border-t border-line py-3 pl-12 text-link"
                                >
                                  <span className="type-body-lg">{item.mega.footerLink.label}</span>
                                </Link>
                              </li>
                            </ul>
                          </CollapsePanel>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex min-h-12 items-baseline gap-4 py-5"
                        >
                          <span className="type-label w-8 shrink-0 text-ink-muted tabular-nums">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="type-h2">{item.label}</span>
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-12 space-y-6">
                <div>
                  <Eyebrow as="p">Contact</Eyebrow>
                  <ContactDetails className="mt-3" />
                </div>

                <div>
                  <Eyebrow as="p">Follow</Eyebrow>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {site.socials.map((social) => (
                      <li key={social.platform}>
                        {isPlaceholder(social.href) ? (
                          <span className="type-body-sm text-ink-muted">
                            {social.label}
                          </span>
                        ) : (
                          <a
                            href={social.href}
                            className="type-body-sm inline-flex min-h-12 items-center text-ink-soft underline-offset-4 hover:underline focus-visible:underline"
                          >
                            {social.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <Button href={site.primaryCta.href} size="lg" className="w-full">
                  {site.primaryCta.label}
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
