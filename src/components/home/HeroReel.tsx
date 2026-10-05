"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/refinedHome";
import styles from "./HeroReel.module.css";

/**
 * The hero's moving wall of work: studio campaign concepts and selected films
 * drifting past edge to edge. It is rendered twice so the loop is seamless;
 * the second copy is hidden from assistive tech and the tab order.
 *
 * The reel only drifts, and its films only play, while they are on screen.
 * Readers who ask for reduced motion get a still row they can scroll.
 */
export function HeroReel() {
  const { reel } = homeContent.hero;
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const videos = Array.from(el.querySelectorAll("video"));
    // The drift runs on the compositor, which per-element observers do not
    // reliably see, so while the reel is on screen a light poll measures the
    // films directly: those in view play, the rest stay paused.
    const sync = () => {
      const canPlay = !reduced && document.visibilityState === "visible";
      for (const video of videos) {
        const box = video.getBoundingClientRect();
        const inView = box.right > 0 && box.left < window.innerWidth;
        if (canPlay && inView) {
          if (video.paused) void video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      }
    };
    let timer = 0;
    const section = new IntersectionObserver(([entry]) => {
      const live = entry?.isIntersecting ?? false;
      el.dataset.live = String(live);
      window.clearInterval(timer);
      if (live) {
        sync();
        timer = window.setInterval(sync, 700);
      } else {
        videos.forEach((video) => video.pause());
      }
    });
    section.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      section.disconnect();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const copy = (pass: number) =>
    reel.map((item, index) => {
      const echo = pass > 0;
      const film = item.kind === "video";
      return (
        <Link
          key={`${pass}-${item.src}`}
          href={film ? "/ai-video-creative" : "/creative-showcase"}
          className={`${styles.card} ${film ? styles.film : ""}`}
          aria-label={echo ? undefined : `${item.brand}, ${item.tag}`}
          aria-hidden={echo || undefined}
          tabIndex={echo ? -1 : undefined}
        >
          {film ? (
            <video
              src={`/videos/ai/${item.src}-preview.mp4`}
              poster={`/videos/ai/${item.src}-sm.webp`}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
            />
          ) : (
            <Image
              src={`/images/showcase/${item.src}.webp`}
              alt=""
              fill
              sizes="(max-width: 760px) 220px, 400px"
              // Eager on purpose: a compositor-driven drift never wakes the
              // browser's lazy loader, and the echo copy reuses the same URLs.
              loading="eager"
              fetchPriority={!echo && index < 4 ? "high" : "low"}
            />
          )}
          {film && <span className={styles.badge} aria-hidden="true"><i />Film</span>}
          <span className={styles.label} aria-hidden="true"><b>{item.brand}</b>{item.tag}</span>
        </Link>
      );
    });

  return (
    <div ref={root} className={styles.reel} data-live="true">
      <div className={styles.track}>
        {copy(0)}
        {copy(1)}
      </div>
    </div>
  );
}
