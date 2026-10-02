"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Marks [data-rise] elements as they first enter the screen, so CSS can ease
 * them into place. One observer per page, disconnected on navigation; each
 * element is released after its first reveal and never hidden again.
 */
export function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-rise]:not([data-risen])"));
    root.setAttribute("data-reveal-ready", "");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-risen", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
