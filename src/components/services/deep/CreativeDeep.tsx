"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { HeroVideo } from "@/components/home/HeroVideo";
import { creativeDeep as d } from "@/content/serviceDeep";
import styles from "./CreativeDeep.module.css";

const img = (n: string) => `/images/showcase/${n}.webp`;

function Head({ eyebrow, title, accent, light = false }: { eyebrow: string; title: string; accent: string; light?: boolean }) {
  return (
    <div className={`${styles.head} ${light ? styles.headLight : ""}`} data-rise>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title} <em>{accent}</em></h2>
    </div>
  );
}

const REDUCED = "(prefers-reduced-motion: reduce)";
function useReduced() {
  return useSyncExternalStore(
    (cb) => { const mq = window.matchMedia(REDUCED); mq.addEventListener("change", cb); return () => mq.removeEventListener("change", cb); },
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

/** A phone-sized ad with five markers that take turns explaining themselves. */
function AdAnatomy() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReduced();
  const parts = d.anatomy.parts;

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % parts.length), 2800);
    return () => window.clearInterval(t);
  }, [paused, reduced, parts.length]);

  const part = parts[active]!;
  return (
    <section className={styles.section}>
      <div className={`${styles.inner} ${styles.anatomy}`}>
        <div className={styles.anatomyHead}>
          <Head eyebrow={d.anatomy.eyebrow} title={d.anatomy.title} accent={d.anatomy.accent} />
          <p className={styles.hint}>{d.anatomy.hint}</p>
        </div>
        <div className={styles.anatomyList}>
          <ol className={styles.parts} onMouseLeave={() => setPaused(false)}>
            {parts.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  onMouseEnter={() => { setActive(i); setPaused(true); }}
                  onFocus={() => { setActive(i); setPaused(true); }}
                  onClick={() => { setActive(i); setPaused(true); }}
                >
                  <span className={styles.partNo}>{i + 1}</span>
                  <span className={styles.partBody}>
                    <b>{p.label}</b>
                    {i === active && <small key={p.id}>{p.copy}</small>}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.phone} aria-hidden="true">
          <div className={styles.screen}>
            <Image src={img("skincare")} alt="" fill sizes="360px" />
            <div className={`${styles.layer} ${styles.lHook} ${part.id === "hook" ? styles.lit : ""}`}>A softer start to every morning.</div>
            <div className={`${styles.layer} ${styles.lProof} ${part.id === "proof" ? styles.lit : ""}`}>★★★★★ &ldquo;Finally, one step.&rdquo;</div>
            <div className={`${styles.layer} ${styles.lOffer} ${part.id === "offer" ? styles.lit : ""}`}>Starter kit</div>
            <div className={`${styles.layer} ${styles.lCta} ${part.id === "cta" ? styles.lit : ""}`}>Shop the serum →</div>
            <div className={`${styles.ring} ${part.id === "product" ? styles.lit : ""}`} />
            {parts.map((p, i) => (
              <span key={p.id} className={`${styles.marker} ${i === active ? styles.markerOn : ""}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>{i + 1}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Big type, typed out one hook at a time. */
function HookLab() {
  const reduced = useReduced();
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const hook = d.hooks.items[index]!;

  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(() => setIndex((i) => (i + 1) % d.hooks.items.length), 4000);
      return () => window.clearTimeout(t);
    }
    if (shown < hook.line.length) {
      const t = window.setTimeout(() => setShown((s) => s + 1), 34);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => { setShown(0); setIndex((i) => (i + 1) % d.hooks.items.length); }, 2200);
    return () => window.clearTimeout(t);
  }, [shown, hook.line.length, reduced]);

  return (
    <section className={`${styles.section} ${styles.dark}`}>
      <div className={styles.inner}>
        <Head eyebrow={d.hooks.eyebrow} title={d.hooks.title} accent={d.hooks.accent} light />
        <div className={styles.lab}>
          <div className={styles.types} aria-hidden="true">
            {d.hooks.items.map((h, i) => <span key={h.type} className={i === index ? styles.typeOn : undefined}>{h.type}</span>)}
          </div>
          <p className={styles.typed} aria-live="off">
            <span className="sr-only">{hook.line}</span>
            <span aria-hidden="true">{reduced ? hook.line : hook.line.slice(0, shown)}<i className={styles.caret} /></span>
          </p>
          <p className={styles.labNote}>{d.hooks.note}</p>
        </div>
      </div>
    </section>
  );
}

/** Cards travel Idea → Winner on a loop, staggered so the board is always busy. */
function SprintBoard() {
  return (
    <section className={`${styles.section} ${styles.white}`}>
      <div className={styles.inner}>
        <Head eyebrow={d.sprint.eyebrow} title={d.sprint.title} accent={d.sprint.accent} />
        <div className={styles.board} data-rise>
          <div className={styles.cols}>
            {d.sprint.columns.map((c) => <span key={c}>{c}</span>)}
          </div>
          <div className={styles.lane} aria-hidden="true">
            {d.sprint.cards.map((c, i) => (
              <div key={c} className={styles.card} style={{ ["--n" as string]: i }}>
                <div className={styles.cardImg}><Image src={`/images/showcase/thumbs/${c}.webp`} alt="" fill sizes="160px" /></div>
                <i className={styles.cardBar}><b /></i>
                <span className={styles.cardWin}>Winner</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormatWall() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Head eyebrow={d.formats.eyebrow} title={d.formats.title} accent={d.formats.accent} />
        <div className={styles.formats}>
          {d.formats.items.map((item, i) => (
            <figure key={item.label} className={styles.format} style={{ aspectRatio: item.ratio, ["--rise" as string]: (i % 3) + 1 }} data-rise>
              {item.kind === "video"
                ? <HeroVideo className={styles.media} src={`/videos/ai/${item.src}-preview.mp4`} poster={`/videos/ai/${item.src}-sm.webp`} />
                : <Image className={styles.media} src={img(item.src)} alt="" fill sizes="(max-width: 700px) 50vw, 22vw" />}
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.note}>{d.formats.note}</p>
      </div>
    </section>
  );
}

export function CreativeDeep() {
  return (
    <>
      <AdAnatomy />
      <HookLab />
      <SprintBoard />
      <FormatWall />
    </>
  );
}
