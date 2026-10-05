"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HeroVideo } from "@/components/home/HeroVideo";
import styles from "./WorkHeroDeck.module.css";

const CARDS = [
  { kind: "image", src: "/images/showcase/sneakers.webp", label: "Pace Club" },
  { kind: "video", src: "film-22", label: "AI product film" },
  { kind: "image", src: "/images/showcase/skincare.webp", label: "Still Kind" },
  { kind: "image", src: "/images/showcase/fragrance.webp", label: "Nuit Atelier" },
  { kind: "image", src: "/images/showcase/coffee.webp", label: "Early Hours" },
] as const;

/**
 * A fanned deck of real work that deals itself on load, then shuffles the top
 * card to the back every few seconds. The pointer tilts the whole deck.
 */
export function WorkHeroDeck() {
  const [order, setOrder] = useState<number[]>(() => CARDS.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setOrder((o) => [...o.slice(1), o[0]!]), 3200);
    return () => window.clearInterval(t);
  }, [paused]);

  const onMove = (e: React.PointerEvent) => {
    const el = deckRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -8}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
  };
  const onLeave = () => {
    deckRef.current?.style.setProperty("--rx", "0deg");
    deckRef.current?.style.setProperty("--ry", "0deg");
    setPaused(false);
  };

  return (
    <div className={styles.stage} onPointerMove={onMove} onPointerEnter={() => setPaused(true)} onPointerLeave={onLeave} aria-hidden="true">
      <div ref={deckRef} className={styles.deck}>
        {CARDS.map((card, i) => {
          const slot = order.indexOf(i);
          return (
            <figure key={card.label} className={styles.card} data-slot={slot} style={{ ["--deal" as string]: i }}>
              {card.kind === "video"
                ? <HeroVideo className={styles.media} src={`/videos/ai/${card.src}-preview.mp4`} poster={`/videos/ai/${card.src}-sm.webp`} />
                : <Image className={styles.media} src={card.src} alt="" fill sizes="280px" priority={i === 0} />}
              <figcaption>{card.label}</figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
