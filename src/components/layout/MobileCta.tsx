"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The mobile sticky call to action.
 *
 * Appears below 768px once the reader has left the hero, and disappears again
 * when the closing CTA band comes into view — two calls to action on screen at
 * once is worse than one, and the footer's is the better placed of the two.
 *
 * Off entirely on /contact: the page is a form, the CTA points at that form,
 * and a fixed bar over a keyboard-raised input is the single most irritating
 * thing a phone layout can do.
 *
 * Visibility is driven by two IntersectionObservers rather than a scroll
 * handler — no listener firing on every frame, and no layout reads during
 * scroll. The bar is `fixed`, so it never shifts the document; the page gets
 * matching bottom padding while it is showing so it cannot cover the last of
 * the content.
 */
export function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const pastHero = useRef(false);
  const atFooter = useRef(false);

  const disabled = pathname === "/contact";

  useEffect(() => {
    if (disabled) return;

    const hero = document.querySelector("[data-hero-section]");
    // Both the closing band and the footer carry a "Book a Growth Call" of
    // their own, so the bar stands down for either. Two calls to action on one
    // screen is worse than one, and these are the better-placed ones.
    const rivals = [
      document.querySelector("[data-closing-cta]"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el !== null);
    if (!hero) return;

    const sync = () => setVisible(pastHero.current && !atFooter.current);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // Past the hero once it has left the viewport entirely.
        pastHero.current = !entry?.isIntersecting;
        sync();
      },
      { rootMargin: "0px" },
    );
    heroObserver.observe(hero);

    const seen = new Set<Element>();
    const rivalObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target);
          else seen.delete(entry.target);
        }
        atFooter.current = seen.size > 0;
        sync();
      },
      { rootMargin: "0px" },
    );
    rivals.forEach((el) => rivalObserver.observe(el));

    return () => {
      heroObserver.disconnect();
      rivalObserver.disconnect();
    };
  }, [disabled, pathname]);

  // Reserve the space only while the bar is up, so nothing is ever covered.
  useEffect(() => {
    const body = document.body;
    if (visible && !disabled) {
      body.style.setProperty("--mobile-cta-height", "calc(56px + env(safe-area-inset-bottom))");
    } else {
      body.style.removeProperty("--mobile-cta-height");
    }
    return () => {
      body.style.removeProperty("--mobile-cta-height");
    };
  }, [visible, disabled]);

  if (disabled) return null;

  return (
    <div
      // aria-hidden while down: the same action is already in the header and
      // the page, and a screen-reader user should not meet a third copy of it
      // that sighted users cannot see.
      aria-hidden={!visible}
      {...(visible ? {} : { inert: true })}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bone md:hidden",
        "pb-[env(safe-area-inset-bottom)]",
        // transform and opacity only; the bar is out of flow, so nothing moves
        // on the page when it arrives.
        // Reduced motion: it still appears, just without the slide.
        "transition-transform duration-300 ease-inout motion-reduce:transition-none",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex h-14 items-center px-5">
        <Button href={site.primaryCta.href} size="lg" className="w-full justify-center">
          {site.primaryCta.label}
        </Button>
      </div>
    </div>
  );
}
