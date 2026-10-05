"use client";

import { useEffect, useRef } from "react";
import { approach } from "@/content/approach";
import styles from "./Approach.module.css";

/**
 * Four rules set large. As the block scrolls through the screen, the words
 * fill from faint to ink, one after another, so the reader's eye is led
 * through them.
 */
export function ApproachPrinciples() {
  const { principles } = approach;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const block = ref.current;
    if (!block) return;
    const words = Array.from(block.querySelectorAll<HTMLElement>("[data-word]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.setAttribute("data-lit", ""));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = block.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.35;
      const p = Math.max(0, Math.min(1, (start - r.top) / Math.max(1, r.height + (start - end) - window.innerHeight * 0.3)));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => (i < lit ? w.setAttribute("data-lit", "") : w.removeAttribute("data-lit")));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="principles-heading">
      <div className={styles.inner}>
        <p id="principles-heading" className={styles.eyebrow}>{principles.eyebrow}</p>
        <div ref={ref} className={styles.rules}>
          {principles.items.map((item, i) => (
            <div key={item.line} className={styles.rule}>
              <span className={styles.ruleNo}>{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.ruleLine}>
                {item.line.split(" ").map((word, j) => <span key={j} data-word>{word} </span>)}
              </p>
              <p className={styles.ruleSub}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
