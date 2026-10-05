"use client";

import { useEffect, useRef, useState } from "react";
import { approach } from "@/content/approach";
import styles from "./Approach.module.css";

/**
 * The six steps of an engagement. The left column stays pinned with a rail
 * that fills as you read; the step crossing the middle of the screen lights
 * up and the counter follows it.
 */
export function ApproachJourney() {
  const { journey } = approach;
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => observer.observe(item));

    let frame = 0;
    const measure = () => {
      frame = 0;
      const box = list.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      setProgress(Math.max(0, Math.min(1, (mid - box.top) / Math.max(1, box.height))));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const total = journey.steps.length;

  return (
    <section className={styles.section} aria-labelledby="journey-heading">
      <div className={`${styles.inner} ${styles.journey}`}>
        <div className={styles.journeyAside}>
          <div className={styles.sticky}>
            <p className={styles.eyebrow}>{journey.eyebrow}</p>
            <h2 id="journey-heading" className={styles.title}>
              {journey.title} <em>{journey.accent}</em>
            </h2>
            <p className={styles.lead}>{journey.intro}</p>
            <div className={styles.meter} aria-hidden="true">
              <span className={styles.meterCount}>
                <b>{String(active + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
              </span>
              <span className={styles.meterName}>{journey.steps[active]?.name}</span>
              <span className={styles.meterTrack}><i style={{ transform: `scaleX(${progress})` }} /></span>
            </div>
          </div>
        </div>

        <div className={styles.stepsWrap}>
        <span className={styles.rail} aria-hidden="true"><i style={{ transform: `scaleY(${progress})` }} /></span>
        <ol ref={listRef} className={styles.steps}>
          {journey.steps.map((step, index) => (
            <li
              key={step.name}
              data-step={index}
              className={`${styles.step} ${index === active ? styles.stepActive : ""} ${index < active ? styles.stepDone : ""}`}
            >
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.stepHead}>
                <span className={styles.stepNo}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.name}</h3>
                  <p className={styles.when}>{step.when}</p>
                </div>
              </div>
              <dl className={styles.stepGrid}>
                <div><dt>{journey.labels.we}</dt><dd>{step.we}</dd></div>
                <div className={styles.youGet}><dt>{journey.labels.you}</dt><dd>{step.you}</dd></div>
                <div><dt>{journey.labels.need}</dt><dd>{step.need}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
