"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { CreativeMedia } from "@/components/work/CreativeMedia";
import type { ViewableMedia } from "@/types";
import { isPlaceholder } from "@/lib/placeholders";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useScrollLock } from "@/lib/useScrollLock";

/**
 * The single viewer for every piece of creative, on every surface.
 *
 * Keyboard — Escape closes, Left/Right move between items, Tab cycles inside.
 *   Focus moves to the dialog on open and returns to whatever opened it on
 *   close, so a keyboard user is never dropped at the top of the document.
 * Pointer — the scrim closes on click; the media does not.
 * Screen readers — role="dialog", aria-modal, labelled by the caption. Every
 *   other child of <body> is marked `inert` while this is open, so the page
 *   behind is genuinely unreachable rather than merely covered.
 *
 * The media renders at its native ratio with object-contain, sized against the
 * viewport — a lightbox that crops is worse than no lightbox.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: ViewableMedia[];
  /** Null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const open = index !== null;
  const item = open ? items[index] : undefined;

  useScrollLock(open);
  useFocusTrap(dialogRef, open);

  // Make the rest of the page inert, and hand focus back on the way out.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const opener = document.activeElement as HTMLElement | null;
    const siblings = dialog
      ? [...document.body.children].filter((child) => child !== dialog)
      : [];

    siblings.forEach((child) => child.setAttribute("inert", ""));
    dialog?.focus();

    return () => {
      siblings.forEach((child) => child.removeAttribute("inert"));
      opener?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open || index === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate((index + 1) % items.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate((index - 1 + items.length) % items.length);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, index, items.length, onClose, onNavigate]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && item && index !== null ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.label}: ${item.title}`}
          tabIndex={-1}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="fixed inset-0 z-[120] flex items-center justify-center"
        >
          {/* Scrim at 92%. Clicking it closes; clicking the media does not. */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-ink/92"
          />

          <div className="relative z-10 flex max-h-svh w-full max-w-[92vw] flex-col items-center gap-5 p-5">
            <div className="flex max-h-[68svh] items-center justify-center">
              <CreativeMedia
                item={item}
                autoplay={false}
                fit="contain"
                sizes="92vw"
                className="max-h-[68svh] w-auto border-line-strong"
              />
            </div>

            <figcaption className="max-w-measure text-center">
              <span className="type-label text-ink-muted">
                {item.label}
              </span>
              <span className="type-body-lg mt-1 block text-inverse-text">
                {item.title}
              </span>
              <span className="type-body-sm block text-ink-muted">{item.client}</span>
              {item.result && !isPlaceholder(item.result) ? (
                <span className="type-body-sm mt-1 block text-accent-lift">
                  {item.result}
                </span>
              ) : null}
            </figcaption>

            <div className="flex items-center gap-3">
              <LightboxButton
                label="Previous"
                onClick={() => onNavigate((index - 1 + items.length) % items.length)}
                icon={<ChevronLeft className="size-5" />}
              />
              <span className="type-caption tabular-nums text-ink-muted">
                {index + 1} / {items.length}
              </span>
              <LightboxButton
                label="Next"
                onClick={() => onNavigate((index + 1) % items.length)}
                icon={<ChevronRight className="size-5" />}
              />
            </div>
          </div>

          <div className="absolute top-5 right-5 z-10">
            <LightboxButton label="Close" onClick={onClose} icon={<X className="size-5" />} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function LightboxButton({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 cursor-pointer items-center justify-center rounded-pill border border-inverse-line-strong text-inverse-text transition-colors duration-150 hover:bg-inverse-line focus-visible:bg-inverse-line"
    >
      {icon}
    </button>
  );
}
