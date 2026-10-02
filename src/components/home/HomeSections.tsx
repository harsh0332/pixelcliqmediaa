import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { comparisonRows } from "@/content/comparison";
import { homeContent, refinedHome } from "@/content/refinedHome";
import { whatsappHref } from "@/content/site";
import { HeroOffer } from "./HeroOffer";
import styles from "./Home.module.css";

/** How an engagement starts, on a full lime field. */
export function StartSteps() {
  const { start } = homeContent;
  return (
    <section id="how-we-start" data-tint="#f6f5f1" aria-labelledby="start-heading" className={`${styles.start} tinted`}>
      <div className={styles.shell}>
        <div className={styles.startHead} data-rise>
          <p className={styles.eyebrowInk}>{start.eyebrow}</p>
          <h2 id="start-heading" className={styles.display}>
            {start.titleA}
            <br />
            <em>{start.titleB}</em>
          </h2>
        </div>
        <ol className={styles.steps}>
          {start.steps.map((step, i) => (
            <li key={step.title} data-rise style={{ ["--rise" as string]: i + 1 }}>
              <span className={styles.bigNumber} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className={styles.stepTag}>{step.tag}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link href="/contact" className={styles.inkButton}>
          {start.cta} <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

/** The usual way against ours, as a spec sheet rather than two bullet lists. */
export function Standard() {
  const { standard } = homeContent;
  return (
    <section id="our-standard" data-tint="#ffffff" aria-labelledby="standard-heading" className={`${styles.standard} tinted`}>
      <div className={styles.shell}>
        <div className={styles.splitHead} data-rise>
          <div>
            <p className={styles.eyebrow}>{standard.eyebrow}</p>
            <h2 id="standard-heading" className={styles.display}>
              {standard.titleA}
              <br />
              <em>{standard.titleB}</em>
            </h2>
          </div>
          <p className={styles.lead}>{standard.intro}</p>
        </div>
        <div className={styles.sheet} role="table" aria-label={standard.intro}>
          <div className={styles.sheetHead} role="row">
            <span role="columnheader" />
            <span role="columnheader">{standard.typicalLabel}</span>
            <span role="columnheader">{standard.oursLabel}</span>
          </div>
          {comparisonRows.map((row, i) => (
            <div key={row.id} className={styles.sheetRow} role="row" data-rise style={{ ["--rise" as string]: i % 3 }}>
              <span role="rowheader" className={styles.dimension}>{row.dimension}</span>
              <span role="cell" className={styles.typical}>{row.typical}</span>
              <span role="cell" className={styles.ours}>
                <Check size={16} strokeWidth={3} aria-hidden="true" />
                {row.pixelcliq}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFaq() {
  const { faq } = homeContent;
  return (
    <section id="faq" data-tint="#f6f5f1" aria-labelledby="home-faq-heading" className={`${styles.faq} tinted`}>
      <div className={`${styles.shell} ${styles.faqGrid}`}>
        <div data-rise>
          <p className={styles.eyebrow}>{faq.eyebrow}</p>
          <h2 id="home-faq-heading" className={styles.display}>
            {faq.titleA}
            <br />
            <em>{faq.titleB}</em>
          </h2>
          <p className={styles.lead}>{faq.note}</p>
        </div>
        <Accordion items={refinedHome.faqs} />
      </div>
    </section>
  );
}

/** The closing offer: the hero's form again, for the reader who scrolled. */
export function ClosingOffer() {
  const { closing, hero } = homeContent;
  return (
    <section data-closing-cta aria-labelledby="closing-heading" className={styles.closing}>
      <span className={styles.closingGrid} aria-hidden="true" />
      <div className={`${styles.shell} ${styles.closingInner}`}>
        <h2 id="closing-heading" className={styles.closingTitle} data-rise>
          {closing.titleA}
          <br />
          <em>{closing.titleB}</em>
        </h2>
        <p className={styles.closingCopy}>{closing.copy}</p>
        <HeroOffer tone="closing" />
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={styles.closingWa}>
          <MessageCircle size={18} aria-hidden="true" /> {hero.whatsapp}
        </a>
      </div>
    </section>
  );
}
