import styles from "./QuoteBand.module.css";

/**
 * A one-line manifesto. The first line is what we are not; it gets struck
 * through as the band scrolls in, and the line we stand by rises under it.
 */
export function QuoteBand({ not, is, tone = "navy" }: { not: string; is: string; tone?: "navy" | "ice" }) {
  return (
    <section className={`${styles.band} ${styles[tone]}`}>
      <div className={styles.inner} data-rise>
        <p className={styles.not}><span className="sr-only">Not: </span><span className={styles.strike}>{not}</span></p>
        <p className={styles.is}>{is}</p>
      </div>
    </section>
  );
}
