"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Cycle Tab within a container while it is active.
 *
 * Only for genuinely modal surfaces — the mobile menu covers the page, so
 * escaping it with Tab would strand the user behind an overlay. It is
 * deliberately NOT used on the services dropdown: trapping focus inside a
 * navigation disclosure prevents a keyboard user reaching the rest of the
 * header, which is a defect rather than a feature.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    const node = ref.current;
    if (!active || !node) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const items = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0]!;
      const last = items[items.length - 1]!;
      const current = document.activeElement;

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [ref, active]);
}
