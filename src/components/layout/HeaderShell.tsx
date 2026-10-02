"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * The header stays fixed; only its surface changes. Over the top of a page it
 * can sit transparent on the hero, and once the reader scrolls it becomes a
 * glass bar. One passive listener, one boolean — no per-frame work.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className="site-header fixed inset-x-0 top-0 z-40 h-[var(--header-height)]"
    >
      {children}
    </header>
  );
}
