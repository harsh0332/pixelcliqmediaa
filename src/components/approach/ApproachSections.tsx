import Link from "next/link";
import { ArrowUpRight, Check, X, Users, FileText, CalendarCheck, LineChart, KeyRound, Puzzle } from "lucide-react";
import { approach } from "@/content/approach";
import styles from "./Approach.module.css";

const ICONS = [Users, FileText, CalendarCheck, LineChart, KeyRound, Puzzle];

function Head({ eyebrow, title, accent, id }: { eyebrow: string; title: string; accent: string; id: string }) {
  return (
    <div className={styles.head} data-rise>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>{title} <em>{accent}</em></h2>
    </div>
  );
}

/** The weekly sprint as a loop: five days light up in turn, forever. */
export function ApproachWeek() {
  const { week } = approach;
  return (
    <section className={`${styles.section} ${styles.tint}`} aria-labelledby="week-heading">
      <div className={`${styles.inner} ${styles.weekGrid}`}>
        <Head id="week-heading" eyebrow={week.eyebrow} title={week.title} accent={week.accent} />
        <div className={styles.loop} aria-hidden="false">
          <span className={styles.loopRing} aria-hidden="true" />
          <span className={styles.loopSweep} aria-hidden="true" />
          <div className={styles.loopCenter}><b>Weekly</b><span>sprint</span></div>
          <ol className={styles.loopDays}>
            {week.days.map((d, i) => (
              <li key={d.day} style={{ ["--n" as string]: i }}>
                <span className={styles.loopDay}>{d.day}</span>
                <b>{d.title}</b>
                <small>{d.copy}</small>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function ApproachCommitments() {
  const { commitments } = approach;
  return (
    <section className={`${styles.section} ${styles.dark}`} aria-labelledby="commit-heading">
      <div className={styles.inner}>
        <Head id="commit-heading" eyebrow={commitments.eyebrow} title={commitments.title} accent={commitments.accent} />
        <ul className={styles.commit}>
          {commitments.items.map((c, i) => {
            const Icon = ICONS[i] ?? Check;
            return (
              <li key={c.title} data-rise style={{ ["--rise" as string]: (i % 3) + 1 }}>
                <span className={styles.icon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                <div><h3>{c.title}</h3><p>{c.body}</p></div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ApproachFit() {
  const { fit, cta } = approach;
  return (
    <section className={styles.section} aria-labelledby="fit-heading">
      <div className={styles.inner}>
        <Head id="fit-heading" eyebrow={fit.eyebrow} title={fit.title} accent={fit.accent} />
        <div className={styles.fit}>
          <div className={styles.fitGood} data-rise>
            <h3>{fit.good.title}</h3>
            <ul>{fit.good.items.map((t) => <li key={t}><Check size={16} aria-hidden="true" />{t}</li>)}</ul>
          </div>
          <div className={styles.fitBad} data-rise style={{ ["--rise" as string]: 1 }}>
            <h3>{fit.bad.title}</h3>
            <ul>{fit.bad.items.map((t) => <li key={t}><X size={16} aria-hidden="true" />{t}</li>)}</ul>
          </div>
        </div>
        <div className={styles.close} data-rise>
          <p className={styles.closeTitle}>{cta.title} <em>{cta.accent}</em></p>
          <p className={styles.lead}>{cta.copy}</p>
          <Link href="/contact" className={styles.cta}>
            {cta.label}
            <span aria-hidden="true"><ArrowUpRight size={18} /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
