"use client";

import { useEffect, useState } from "react";
import { aboutPage } from "@/content/home";
import styles from "./StudioCard.module.css";

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
const hourFmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false });

/** The studio's real local time, a working-hours status, and the facts that are true today. */
export function StudioCard() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const t = window.setInterval(tick, 15_000);
    return () => { window.clearTimeout(first); window.clearInterval(t); };
  }, []);

  const hour = now ? Number(hourFmt.format(now)) : 12;
  const open = hour >= 10 && hour < 19;
  const turn = now ? ((hour % 12) + Number(fmt.format(now).slice(3)) / 60) / 12 : 0.25;

  return (
    <div className={styles.card}>
      <div className={styles.clockRow}>
        <span className={styles.dial} aria-hidden="true" style={{ ["--turn" as string]: turn }}><i /></span>
        <div>
          <p className={styles.label}>Studio time · IST</p>
          <p className={styles.time} suppressHydrationWarning>{now ? fmt.format(now) : "--:--"}</p>
          <p className={styles.status}><span className={open ? styles.on : styles.off} />{open ? "In the studio now" : "Out of hours. We reply first thing."}</p>
        </div>
      </div>
      <dl className={styles.facts}>
        {aboutPage.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
