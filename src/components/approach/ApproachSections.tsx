import Link from "next/link";
import { ArrowUpRight, Check, X, Users, FileText, CalendarCheck, LineChart, KeyRound, Puzzle } from "lucide-react";
import { approach } from "@/content/approach";
import styles from "./Approach.module.css";

const ICONS = [Users, FileText, CalendarCheck, LineChart, KeyRound, Puzzle];

function Head({ eyebrow, title, accent, intro, id }: { eyebrow: string; title: string; accent: string; intro?: string; id: string }) {
  return (
    <div className={styles.head} data-rise>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={id} className={styles.title}>{title} <em>{accent}</em></h2>
      </div>
      {intro && <p className={styles.lead}>{intro}</p>}
    </div>
  );
}

/** A sprint week as a board; a lime marker walks the days on a loop. */
export function ApproachWeek() {
  const { week } = approach;
  return (
    <section className={`${styles.section} ${styles.dark}`} aria-labelledby="week-heading">
      <div className={styles.inner}>
        <Head id="week-heading" eyebrow={week.eyebrow} title={week.title} accent={week.accent} intro={week.intro} />
        <div className={styles.weekWrap}>
        <span className={styles.today} aria-hidden="true" />
        <ol className={styles.week}>
          {week.days.map((d, i) => (
            <li key={d.day} data-rise style={{ ["--rise" as string]: i + 1, ["--d" as string]: i }}>
              <span className={styles.day}>{d.day}</span>
              <h3>{d.title}</h3>
              <p>{d.copy}</p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}

export function ApproachPrinciples() {
  const { principles } = approach;
  return (
    <section className={styles.section} aria-labelledby="principles-heading">
      <div className={styles.inner}>
        <Head id="principles-heading" eyebrow={principles.eyebrow} title={principles.title} accent={principles.accent} />
        <ol className={styles.rules}>
          {principles.items.map((p, i) => (
            <li key={p.title} data-rise style={{ ["--rise" as string]: (i % 2) + 1 }}>
              <span className={styles.ruleNo}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ApproachCommitments() {
  const { commitments } = approach;
  return (
    <section className={`${styles.section} ${styles.tint}`} aria-labelledby="commit-heading">
      <div className={styles.inner}>
        <Head id="commit-heading" eyebrow={commitments.eyebrow} title={commitments.title} accent={commitments.accent} />
        <ul className={styles.commit}>
          {commitments.items.map((c, i) => {
            const Icon = ICONS[i] ?? Check;
            return (
              <li key={c.title} data-rise style={{ ["--rise" as string]: (i % 3) + 1 }}>
                <span className={styles.icon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
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
