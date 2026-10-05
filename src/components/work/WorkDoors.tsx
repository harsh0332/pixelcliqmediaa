import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./WorkDoors.module.css";

const DOORS = [
  {
    href: "#graphic-portfolio",
    title: "Brand & campaign design",
    line: "Brand worlds, key visuals and feed-ready campaigns.",
    images: ["/images/showcase/thumbs/sneakers.webp", "/images/showcase/thumbs/skincare.webp", "/images/showcase/thumbs/fragrance.webp"],
  },
  {
    href: "#ai-video-creative",
    title: "AI video films",
    line: "Product films and impossible shots, made in the studio.",
    images: ["/videos/ai/film-22.jpg", "/videos/ai/film-04.jpg", "/videos/ai/film-07.jpg"],
  },
  {
    href: "#video-portfolio",
    title: "Short-form edits",
    line: "Creator stories and campaign motion for small screens.",
    images: ["/videos/ai/film-19.jpg", "/videos/ai/film-25.jpg", "/videos/ai/film-00.jpg"],
  },
];

/** Three doors into the collections below, each previewing what is behind it. */
export function WorkDoors() {
  return (
    <nav aria-label="Portfolio collections" className={styles.wrap}>
      <div className={styles.inner}>
        {DOORS.map((door, i) => (
          <Link key={door.href} href={door.href} className={styles.door} data-rise style={{ ["--rise" as string]: i + 1 }}>
            <span className={styles.fan} aria-hidden="true">
              {door.images.map((src) => (
                <span key={src} className={styles.thumb}><Image src={src} alt="" fill sizes="120px" /></span>
              ))}
            </span>
            <span className={styles.text}>
              <b>{door.title}</b>
              <small>{door.line}</small>
            </span>
            <ArrowUpRight className={styles.arrow} size={22} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
