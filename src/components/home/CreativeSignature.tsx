"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Pause, Play, ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./CreativeSignature.module.css";

const collections = [
  { title: "Everyday, made extraordinary.", label: "Lifestyle & product", images: [
    { src: "coffee", alt: "Early Hours coffee campaign: Make mornings yours." },
    { src: "skincare", alt: "Stillkind skincare campaign in warm coastal light." },
    { src: "soda", alt: "Good Fizz drinks campaign: A brighter kind of break." },
  ] },
  { title: "A different kind of presence.", label: "Fashion & culture", images: [
    { src: "sneakers", alt: "Pace Club footwear campaign: Find your pace." },
    { src: "forme", alt: "Forme burgundy handbag campaign on a sculptural pink backdrop." },
    { src: "morrow", alt: "Morrow headphones campaign: Less noise. More feeling." },
  ] },
  { title: "Small details. Lasting impressions.", label: "Brand worlds", images: [
    { src: "interval", alt: "Interval tea campaign with navy packaging and ceramic teacup." },
    { src: "soda", alt: "Good Fizz bright citrus drinks campaign." },
    { src: "forme", alt: "Forme campaign: Carry a little extraordinary." },
  ] },
 ] as const;

export function CreativeSignature() {
  const root = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const current = collections[active] ?? collections[0];
  const playing = !paused && !reduced && visible && !focused && !hovered;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { threshold: .15 });
    if (root.current) observer.observe(root.current);
    return () => { media.removeEventListener("change", update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % collections.length), 6500);
    return () => window.clearInterval(timer);
  }, [playing]);

  function select(index: number) { setActive((index + collections.length) % collections.length); setPaused(true); }

  return <div ref={root} className={styles.signature} data-playing={playing}>
    <div className={styles.headingRow}>
      <h1 id="hero-heading" className={styles.heading}>Make brands <em>mean more.</em></h1>
    </div>
    <div className={styles.stageHeader}>
      <span>THE PIXELCLIQ STUDIO</span>
      <span>Ideas into identities. Stories into desire.</span>
    </div>
    <div className={styles.gallery}
      aria-label="Studio creative showcase" aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onTouchStart={event => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={event => { const touch = event.changedTouches[0]; if (touchStart.current === null || !touch) return; const delta = touch.clientX - touchStart.current; if (Math.abs(delta) > 45) select(active + (delta < 0 ? 1 : -1)); touchStart.current = null; }}>
      {collections.map((collection, index) => <div key={collection.label} className={styles.collection} data-active={active === index} aria-hidden={active !== index}>
        {collection.images.map((art, column) => <div className={styles.panel} key={`${index}-${art.src}`} data-column={column}>
          <div className={styles.imageWrap}><Image src={`/images/showcase/${art.src}.webp`} alt={art.alt} fill sizes="(max-width:760px) 90vw, 33vw" priority={index === 0} /></div>
        </div>)}
      </div>)}
      <Link href="/creative-showcase" className={styles.viewWork} aria-label="Explore the graphic portfolio"><ArrowUpRight size={24} /><span>Explore the work</span></Link>
    </div>
    <div className={styles.stageFooter}>
      <div className={styles.caption}><span className={styles.counter}>0{active + 1} / 03</span><div><strong>{current.title}</strong><span>{current.label} · Studio concepts</span></div></div>
      <div className={styles.controls} aria-label="Showcase controls">
        <button onClick={() => select(active - 1)} aria-label="Previous creative collection"><ArrowLeft size={17} /></button>
        <button onClick={() => select(active + 1)} aria-label="Next creative collection"><ArrowRight size={17} /></button>
        {!reduced && <button onClick={() => setPaused(value => !value)} aria-label={paused ? "Play hero animation" : "Pause hero animation"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}
      </div>
    </div>
  </div>;
}
