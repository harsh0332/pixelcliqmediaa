"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./GalleryNudge.module.css";

/**
 * Wraps a long gallery. Once the reader is well into it, a small pill rises at
 * the bottom of the screen with one next step; it leaves again when the
 * gallery ends. Desktop only — phones already have the sticky CTA bar.
 */
export function GalleryNudge({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setShow(r.top < -vh * 0.5 && r.bottom > vh * 1.1);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div ref={ref}>
      {children}
      <div className={`${styles.nudge} ${show ? styles.on : ""}`} aria-hidden={!show} {...(show ? {} : { inert: true })}>
        <span>{label}</span>
        <Link href="/contact" className={styles.cta}>Book a free call <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
