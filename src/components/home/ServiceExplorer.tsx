"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeContent } from "@/content/refinedHome";
import { FeatureVisual } from "./Mockups";
import styles from "./Explorer.module.css";

/**
 * One pale tint per service. The section eases between them as the reader
 * moves down the list — enough to feel the room change, never enough to fight
 * the type. Every tint keeps ink text far above AA.
 */
const TINTS: Record<string, string> = {
  ads: "#eef1fd",
  design: "#fbf0f4",
  social: "#ecf6f1",
  brand: "#f6f1e8",
  web: "#f1effc",
  store: "#fbf2e8",
  seo: "#eff6e9",
  automation: "#eaf4fa",
  leads: "#fcf0eb",
};

/**
 * Services as an editorial index on a plain page.
 *
 * Desktop: the list scrolls while one large preview stays pinned beside it.
 * Each time a new service reaches the middle of the screen its preview is
 * re-mounted, so that service's own animation plays from the start — the
 * chart draws, the search types, the workflow runs. Phones get a swipeable
 * row of cards, each with its own preview.
 */
export function ServiceExplorer({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const { explorer } = homeContent;
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const Heading = headingLevel;

  useEffect(() => {
    const list = listRef.current;
    const rows = Array.from(list?.querySelectorAll<HTMLElement>("[data-row]") ?? []);
    const breakpoint = window.matchMedia("(max-width: 1023px)");
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.row));
          }
        },
        breakpoint.matches
          ? { root: list, rootMargin: "0px -45% 0px -45%" }
          : { rootMargin: "-48% 0px -48% 0px" },
      );
      rows.forEach((row) => observer.observe(row));
    };
    observe();
    breakpoint.addEventListener("change", observe);
    return () => {
      observer.disconnect();
      breakpoint.removeEventListener("change", observe);
    };
  }, []);

  const current = explorer.items[active] ?? explorer.items[0]!;
  const total = String(explorer.items.length).padStart(2, "0");

  return (
    <section
      id="services"
      aria-labelledby="explorer-heading"
      className={styles.explorer}
      style={{ ["--svc" as string]: TINTS[current.id] ?? TINTS.ads }}
    >
      <div className={styles.shell}>
        <header className={styles.head} data-rise>
          <div>
            <p className={styles.eyebrow}>{explorer.eyebrow}</p>
            <Heading id="explorer-heading" className={styles.title}>
              {explorer.title}
              <sup>({total})</sup>
            </Heading>
          </div>
          <div className={styles.headSide}>
            <p>{explorer.intro}</p>
            <Link href={explorer.cta.href} className={styles.headCta}>
              {explorer.cta.label} <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </header>

        <div className={styles.body}>
          <ol ref={listRef} className={styles.list}>
            {explorer.items.map((item, index) => {
              const number = String(index + 1).padStart(2, "0");
              return (
                <li
                  key={item.id}
                  data-row={index}
                  className={`${styles.row} ${index === active ? styles.rowActive : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <div className={styles.cardVisual}>
                    <FeatureVisual kind={item.visual} instance="card" />
                  </div>
                  <span className={styles.number}>{number}</span>
                  <div className={styles.rowBody}>
                    <h3>
                      <Link href={item.href}>
                        {item.title}
                        <ArrowUpRight size={26} aria-hidden="true" />
                      </Link>
                    </h3>
                    <p className={styles.line}>{item.line}</p>
                    <div className={styles.more}>
                      <p className={styles.copy}>{item.copy}</p>
                      <ul className={styles.links}>
                        {item.links.map((link) => (
                          <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className={styles.panel}>
            <div className={styles.panelInner}>
              <div className={styles.panelTop} aria-hidden="true">
                <span><b>{String(active + 1).padStart(2, "0")}</b> / {total}</span>
                <span>{current.title}</span>
              </div>
              <div className={styles.progress} aria-hidden="true">
                {explorer.items.map((item, index) => (
                  <i key={item.id} className={index <= active ? styles.on : undefined} />
                ))}
              </div>
              {/* Keyed by service: a new service re-mounts its preview, which
                  restarts that service's animation from the first frame. */}
              <div key={current.id} className={styles.stage} aria-hidden="true">
                <FeatureVisual kind={current.visual} instance="panel" />
              </div>
              <Link href={current.href} className={styles.panelCta}>
                {explorer.explore} {current.title} <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
