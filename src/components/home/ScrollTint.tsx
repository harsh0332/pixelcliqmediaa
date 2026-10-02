"use client";

import { useEffect } from "react";

/**
 * Morphs the page background as the reader scrolls.
 *
 * Any element with `data-tint="#hex"` claims the page colour while it crosses
 * the middle of the viewport. The colour is written to one custom property on
 * <html>, and body's background transitions to it in CSS — so the effect is a
 * single paint per section change, with no scroll listener and no per-frame
 * work. Nested tints win over their parents, because the innermost element is
 * the more specific claim (a feature card inside the services band).
 */
export function ScrollTint() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-tint]"));
    if (targets.length === 0) return;

    // From here on, `.tinted` sections drop their own background and let the
    // page colour show through. Until then they paint it themselves, so the
    // page reads correctly before (and without) JavaScript.
    root.setAttribute("data-tint-ready", "");
    const active = new Set<HTMLElement>();
    const apply = () => {
      // Document order: the last intersecting element is the deepest one.
      let pick: HTMLElement | undefined;
      for (const el of targets) if (active.has(el)) pick = el;
      if (pick?.dataset.tint) root.style.setProperty("--page-tint", pick.dataset.tint);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) active.add(el);
          else active.delete(el);
        }
        apply();
      },
      // A thin band across the middle of the screen decides the colour.
      { rootMargin: "-45% 0px -45% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      root.removeAttribute("data-tint-ready");
      root.style.removeProperty("--page-tint");
    };
  }, []);

  return null;
}
