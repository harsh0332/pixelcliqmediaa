"use client";

import { useEffect, useRef, useState } from "react";
import { performanceDeep as d } from "@/content/serviceDeep";
import styles from "./PerformanceDeep.module.css";

const CURVE = "M0 430 C110 425 170 410 240 392 S380 352 470 318 S600 300 660 312 S760 250 830 196 S930 110 1000 70";

function Head({ eyebrow, title, accent, light = false }: { eyebrow: string; title: string; accent: string; light?: boolean }) {
  return (
    <div className={`${styles.head} ${light ? styles.headLight : ""}`} data-rise>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title} <em>{accent}</em></h2>
    </div>
  );
}

/** A growth curve that draws itself as you scroll, with the moves that bend it. */
function GrowthStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [p, setP] = useState(0);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const total = path.getTotalLength();
      // Find the curve's height at each milestone's x position.
      setPoints(d.story.milestones.map((m) => {
        let lo = 0, hi = total;
        for (let k = 0; k < 24; k++) { const mid = (lo + hi) / 2; if (path.getPointAtLength(mid).x < m.at * 1000) lo = mid; else hi = mid; }
        const pt = path.getPointAtLength(lo);
        return { x: pt.x, y: pt.y };
      }));
    }
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setP(1); return; }
    const pinned = window.matchMedia("(min-width: 1000px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const value = pinned.matches
        ? -r.top / Math.max(1, section.offsetHeight - vh)
        : (vh * 0.75 - r.top) / Math.max(1, r.height * 0.8);
      setP(Math.max(0, Math.min(1, value)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);

  const reached = d.story.milestones.filter((m) => p >= m.at - 0.02);
  const current = reached[reached.length - 1] ?? d.story.milestones[0]!;

  return (
    <section ref={sectionRef} className={styles.story}>
      <div className={styles.storyPin}>
        <div className={styles.inner}>
          <div className={styles.storyGrid}>
            <div>
              <Head eyebrow={d.story.eyebrow} title={d.story.title} accent={d.story.accent} light />
              <div key={current.title} className={styles.milestone}>
                <span>{current.week}</span>
                <h3>{current.title}</h3>
                <p>{current.copy}</p>
              </div>
              <ol className={styles.weekList} aria-label="Milestones">
                {d.story.milestones.map((m) => (
                  <li key={m.title} className={p >= m.at - 0.02 ? styles.weekOn : undefined}>{m.week}</li>
                ))}
              </ol>
            </div>
            <div className={styles.chart} aria-hidden="true">
              <svg viewBox="0 0 1000 500" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="perf-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1685e4" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#1685e4" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="perf-clip"><rect x="0" y="0" width={p * 1000} height="500" /></clipPath>
                </defs>
                {[100, 200, 300, 400].map((y) => <line key={y} x1="0" x2="1000" y1={y} y2={y} className={styles.gridLine} />)}
                <g clipPath="url(#perf-clip)">
                  <path d={`${CURVE} L1000 500 L0 500 Z`} fill="url(#perf-area)" />
                  <path ref={pathRef} d={CURVE} className={styles.curve} />
                </g>
              </svg>
              {points.map((pt, i) => {
                const m = d.story.milestones[i]!;
                return (
                  <span key={m.title} className={`${styles.pin} ${p >= m.at - 0.02 ? styles.pinOn : ""}`} style={{ left: `calc(6% + ${(pt.x / 1000) * 88}%)`, top: `calc(6% + ${(pt.y / 500) * 80}%)` }}>
                    <i /><b>{m.title}</b>
                  </span>
                );
              })}
              <p className={styles.note}>{d.story.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Pick a stage; the split animates and the channels follow. */
function BudgetAllocator() {
  const [mode, setMode] = useState(1);
  const current = d.allocator.modes[mode]!;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Head eyebrow={d.allocator.eyebrow} title={d.allocator.title} accent={d.allocator.accent} />
        <div className={styles.allocator} data-rise>
          <div className={styles.modes} role="group" aria-label="Brand stage">
            {d.allocator.modes.map((m, i) => (
              <button key={m.id} type="button" aria-pressed={i === mode} onClick={() => setMode(i)}>{m.label}</button>
            ))}
          </div>
          <p className={styles.modeCopy}>{current.copy}</p>
          <div className={styles.split} aria-hidden="true">
            {current.split.map((v, i) => (
              <span key={i} style={{ width: `${v}%`, background: d.allocator.stages[i]!.color }}><b>{v}%</b></span>
            ))}
          </div>
          <div className={styles.stages}>
            {d.allocator.stages.map((s, i) => (
              <article key={s.name}>
                <span className={styles.swatch} style={{ background: s.color }} />
                <strong>{current.split[i]}%</strong>
                <h3>{s.name}</h3>
                <ul>{s.channels.map((c) => <li key={c}>{c}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className={styles.note}>{d.allocator.note}</p>
        </div>
      </div>
    </section>
  );
}

/** Four numbers as cards that turn over to explain themselves. */
function MetricCards() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={`${styles.section} ${styles.white}`}>
      <div className={styles.inner}>
        <Head eyebrow={d.metrics.eyebrow} title={d.metrics.title} accent={d.metrics.accent} />
        <p className={styles.hint}>{d.metrics.hint}</p>
        <div className={styles.metrics}>
          {d.metrics.items.map((m, i) => (
            <button
              key={m.short}
              type="button"
              className={`${styles.metric} ${open === i ? styles.flipped : ""}`}
              aria-pressed={open === i}
              aria-label={`${m.name}: ${m.meaning} ${m.why}`}
              onClick={() => setOpen(open === i ? null : i)}
              data-rise
              style={{ ["--rise" as string]: i + 1 }}
            >
              <span className={styles.face}>
                <b>{m.short}</b>
                <small>{m.name}</small>
              </span>
              <span className={`${styles.face} ${styles.back}`}>
                <small>{m.name}</small>
                <span>{m.meaning}</span>
                <em>{m.why}</em>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PerformanceDeep() {
  return (
    <>
      <GrowthStory />
      <BudgetAllocator />
      <MetricCards />
    </>
  );
}
