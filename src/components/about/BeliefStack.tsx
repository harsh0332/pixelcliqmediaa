import { aboutPage } from "@/content/home";
import styles from "./BeliefStack.module.css";

const TONES = ["navy", "sky", "paper", "lime"] as const;
const TAGS = ["Creative", "Commerce", "Measurement", "Automation"];

/** The four beliefs as large cards that stack on top of each other as you scroll. */
export function BeliefStack() {
  return (
    <ol className={styles.stack}>
      {aboutPage.principles.map((item, i) => (
        <li key={item.title} className={`${styles.card} ${styles[TONES[i % TONES.length]!]}`} style={{ ["--i" as string]: i }}>
          <div className={styles.top}>
            <span className={styles.tag}>{TAGS[i]}</span>
            <span className={styles.count} aria-hidden="true">{i + 1}/{aboutPage.principles.length}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <span className={styles.glyph} aria-hidden="true" data-glyph={i} />
        </li>
      ))}
    </ol>
  );
}
