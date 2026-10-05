"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import styles from "./Journey.module.css";

export interface JourneyStep {
  name: string;
  line: string;
  get: string[];
  visual: string;
  /** Optional words for scenes that show labels (plan title, loop stages). */
  labels?: string[];
}
export interface JourneyContent {
  eyebrow: string;
  title: string;
  accent: string;
  hint: string;
  youGet: string;
  steps: JourneyStep[];
}

const thumb = (n: string) => `/images/showcase/thumbs/${n}.webp`;

/** A small animated scene per step. Animations run only on the active panel. */
function StepVisual({ kind, labels }: { kind: string; labels?: string[] }) {
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
          {(labels ?? ["Ad accounts", "Store", "Tracking", "Creative"]).map((row, i) => (
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
            <b>{labels?.[0] ?? "Growth plan"}</b>
            {[92, 70, 84, 58].map((w, i) => <span key={i} className={styles.docLine} style={{ ["--w" as string]: `${w}%`, ["--n" as string]: i }} />)}
            {(labels?.slice(1).length ? labels.slice(1) : ["Priority one", "Scope", "Signals"]).map((t, i) => <span key={t} className={styles.docCheck} style={{ ["--n" as string]: i }}><Check size={12} />{t}</span>)}
          </div>
        </div>
      );
    case "build":
      return (
        <div className={`${styles.vis} ${styles.vBuild}`}>
          {(labels ?? ["Creative", "Store", "Tracking"]).map((t, i) => (
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
          <span className={styles.live}><i />{labels?.[0] ?? "Live · weekly review"}</span>
        </div>
      );
    case "structure":
      return (
        <div className={`${styles.vis} ${styles.vTree}`}>
          <span className={styles.treeRoot}>{labels?.[0] ?? "Ad account"}</span>
          <span className={styles.treeStem} />
          <div className={styles.treeKids}>
            {(labels?.slice(1) ?? ["Prospecting", "Retargeting", "Retention"]).map((t, i) => (
              <span key={t} style={{ ["--n" as string]: i }}><i />{t}</span>
            ))}
          </div>
        </div>
      );
    case "creatives":
      return (
        <div className={`${styles.vis} ${styles.vCreatives}`}>
          {["skincare", "sneakers", "coffee"].map((n, i) => (
            <figure key={n} style={{ ["--n" as string]: i }}><Image src={thumb(n)} alt="" fill sizes="180px" /></figure>
          ))}
          <span className={styles.winner}>Winner · keep scaling</span>
        </div>
      );
    case "abtest":
      return (
        <div className={`${styles.vis} ${styles.vAB}`}>
          {[{ k: "A", hook: labels?.[0] ?? "Feature first", w: 46 }, { k: "B", hook: labels?.[1] ?? "Problem first", w: 88 }].map((v, i) => (
            <div key={v.k} className={styles.abCard} style={{ ["--w" as string]: `${v.w}%`, ["--n" as string]: i }}>
              <b>{v.k}</b><span>{v.hook}</span><i><em /></i>
            </div>
          ))}
          <span className={styles.abWin}>B wins · roll it out</span>
        </div>
      );
    case "budget":
      return (
        <div className={`${styles.vis} ${styles.vBudget}`}>
          {[{ t: "Ad set A", to: 82 }, { t: "Ad set B", to: 18 }, { t: "Ad set C", to: 64 }, { t: "Ad set D", to: 10 }].map((r, i) => (
            <div key={r.t} className={styles.budgetRow} style={{ ["--to" as string]: `${r.to}%`, ["--n" as string]: i }}>
              <span>{r.t}</span><i><b /></i>
            </div>
          ))}
          <p className={styles.parallel}>Budget follows margin</p>
        </div>
      );
    case "report":
      return (
        <div className={`${styles.vis} ${styles.vReport}`}>
          <div className={styles.reportCard}>
            <small>Weekly update · sample view</small>
            <div className={styles.kpis}>{["Spend", "CAC", "Profit"].map((k, i) => <span key={k} style={{ ["--n" as string]: i }}><em>{k}</em><b /></span>)}</div>
            <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 C30 46 40 30 70 34 S110 18 140 20 S180 6 200 4" /></svg>
          </div>
        </div>
      );
    case "angles":
      return (
        <div className={`${styles.vis} ${styles.vAngles}`}>
          {(labels ?? ["Problem first", "Social proof", "Before / after", "Founder story", "Price anchor"]).map((t, i) => (
            <span key={t} style={{ ["--n" as string]: i }}><Check size={13} />{t}</span>
          ))}
        </div>
      );
    case "formats":
      return (
        <div className={`${styles.vis} ${styles.vFormats}`}>
          {[{ r: "9 / 16", t: "9:16 Reel", n: "fragrance" }, { r: "4 / 5", t: "4:5 Feed", n: "fragrance" }, { r: "1 / 1", t: "1:1 Static", n: "fragrance" }].map((f, i) => (
            <figure key={f.t} style={{ aspectRatio: f.r, ["--n" as string]: i }}>
              <Image src={thumb(f.n)} alt="" fill sizes="160px" /><figcaption>{f.t}</figcaption>
            </figure>
          ))}
        </div>
      );
    default:
      return (
        <div className={`${styles.vis} ${styles.vLoop}`}>
          <div className={styles.ring}>
            {(labels ?? ["Acquire", "Convert", "Retain", "Repeat"]).map((t, i) => <span key={t} style={{ ["--n" as string]: i }}>{t}</span>)}
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
export function PinnedJourney({ journey, id = "journey-heading" }: { journey: JourneyContent; id?: string }) {
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
    <section ref={sectionRef} className={styles.journey} aria-labelledby={id} style={{ ["--steps" as string]: total }}>
      <div className={styles.pin}>
        <div className={styles.top}>
          <div>
            <p className={styles.eyebrow}>{journey.eyebrow}</p>
            <h2 id={id} className={styles.title}>{journey.title} <em>{journey.accent}</em></h2>
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
                <StepVisual kind={step.visual} labels={step.labels} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
