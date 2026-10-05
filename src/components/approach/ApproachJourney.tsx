"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { approach } from "@/content/approach";
import styles from "./Journey.module.css";

/** A small animated scene per step. Animations run only on the active panel. */
function StepVisual({ kind }: { kind: string }) {
  switch (kind) {
    case "call":
      return (
        <div className={`${styles.vis} ${styles.vCall}`}>
          <span className={styles.avatar}>You</span>
          <span className={styles.waves}><i /><i /><i /><i /><i /><i /><i /></span>
          <span className={`${styles.avatar} ${styles.avatarUs}`}>Us</span>
          <svg className={styles.timer} viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19" /><circle className={styles.timerFill} cx="22" cy="22" r="19" /></svg>
          <span className={styles.timerLabel}>30 min</span>
        </div>
      );
    case "audit":
      return (
        <div className={`${styles.vis} ${styles.vAudit}`}>
          {["Ad accounts", "Store", "Tracking", "Creative"].map((row, i) => (
            <div key={row} className={styles.auditRow} style={{ ["--n" as string]: i }}>
              <span>{row}</span><b /><em className={i % 2 ? styles.flagBad : styles.flagGood}>{i % 2 ? "Leak" : "OK"}</em>
            </div>
          ))}
          <span className={styles.scan} />
        </div>
      );
    case "plan":
      return (
        <div className={`${styles.vis} ${styles.vPlan}`}>
          <div className={styles.doc}>
            <b>Growth plan</b>
            {[92, 70, 84, 58].map((w, i) => <span key={i} className={styles.docLine} style={{ ["--w" as string]: `${w}%`, ["--n" as string]: i }} />)}
            {["Priority one", "Scope", "Signals"].map((t, i) => <span key={t} className={styles.docCheck} style={{ ["--n" as string]: i }}><Check size={12} />{t}</span>)}
          </div>
        </div>
      );
    case "build":
      return (
        <div className={`${styles.vis} ${styles.vBuild}`}>
          {["Creative", "Store", "Tracking"].map((t, i) => (
            <div key={t} className={styles.track} style={{ ["--n" as string]: i }}>
              <span>{t}</span><i><b /></i>
            </div>
          ))}
          <p className={styles.parallel}>Built in parallel</p>
        </div>
      );
    case "launch":
      return (
        <div className={`${styles.vis} ${styles.vLaunch}`}>
          <div className={styles.bars}>{[30, 42, 38, 56, 64, 78, 90].map((h, i) => <i key={i} style={{ ["--h" as string]: `${h}%`, ["--n" as string]: i }} />)}</div>
          <span className={styles.live}><i />Live · weekly review</span>
        </div>
      );
    default:
      return (
        <div className={`${styles.vis} ${styles.vLoop}`}>
          <div className={styles.ring}>
            {["Acquire", "Convert", "Retain", "Repeat"].map((t, i) => <span key={t} style={{ ["--n" as string]: i }}>{t}</span>)}
            <i className={styles.orbit} />
          </div>
        </div>
      );
  }
}

/**
 * Desktop: the section pins and the six panels travel sideways as you scroll.
 * Phones and reduced motion: the same panels stack vertically.
 */
export function ApproachJourney() {
  const { journey } = approach;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const total = journey.steps.length;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const wide = window.matchMedia("(min-width: 1000px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let current = -1;

    const update = () => {
      frame = 0;
      if (!wide.matches) {
        track.style.transform = "";
        // Vertical mode: the panel nearest the middle of the screen is active.
        const panels = Array.from(track.children) as HTMLElement[];
        const mid = window.innerHeight / 2;
        let best = 0, dist = Infinity;
        panels.forEach((p, i) => { const r = p.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - mid); if (d < dist) { dist = d; best = i; } });
        if (best !== current) { current = best; setActive(best); }
        return;
      }
      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, travel)));
      // Keep the step being read centred: interpolate between panel centres.
      const panels = Array.from(track.children) as HTMLElement[];
      const x = p * (total - 1);
      const i = Math.min(total - 2, Math.floor(x));
      const f = x - i;
      const centre = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2;
      const c = centre(panels[i]!) * (1 - f) + centre(panels[i + 1]!) * f;
      track.style.transform = `translate3d(${track.parentElement!.clientWidth / 2 - c}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      const index = Math.min(total - 1, Math.round(p * (total - 1)));
      if (index !== current) { current = index; setActive(index); }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    wide.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wide.removeEventListener("change", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [total]);

  return (
    <section ref={sectionRef} className={styles.journey} aria-labelledby="journey-heading" style={{ ["--steps" as string]: total }}>
      <div className={styles.pin}>
        <div className={styles.top}>
          <div>
            <p className={styles.eyebrow}>{journey.eyebrow}</p>
            <h2 id="journey-heading" className={styles.title}>{journey.title} <em>{journey.accent}</em></h2>
          </div>
          <div className={styles.progress} aria-hidden="true">
            <div className={styles.dots}>
              {journey.steps.map((s, i) => (
                <span key={s.name} className={i <= active ? styles.dotOn : undefined}>
                  <i />{String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
            <span className={styles.bar}><i ref={barRef} /></span>
            <span className={styles.hint}>{journey.hint}</span>
          </div>
        </div>

        <div className={styles.viewport}>
          <div ref={trackRef} className={styles.trackRow}>
            {journey.steps.map((step, i) => (
              <article key={step.name} className={`${styles.panel} ${i === active ? styles.on : ""}`} data-on={i === active || undefined}>
                <div className={styles.copy}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{step.name}</h3>
                  <p>{step.line}</p>
                  <div className={styles.get}>
                    <small>{journey.youGet}</small>
                    <ul>{step.get.map((g) => <li key={g}><Check size={14} aria-hidden="true" />{g}</li>)}</ul>
                  </div>
                </div>
                <StepVisual kind={step.visual} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
