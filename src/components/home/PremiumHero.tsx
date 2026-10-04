import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { homeContent } from "@/content/refinedHome";
import { whatsappHref } from "@/content/site";
import { CreativeSignature } from "./CreativeSignature";
import styles from "./PremiumHero.module.css";

export function PremiumHero() {
  const { hero } = homeContent;

  return (
    <section
      id="top"
      data-hero-section
      data-dark-hero
      aria-labelledby="hero-heading"
      className={styles.hero}
    >
      <span className={styles.light} aria-hidden="true" />


      <div className={styles.inner}>
        <div className={styles.top}>
          <span><i aria-hidden="true" /> {hero.kicker}</span>
          <span>{hero.topRight}</span>
        </div>

        <div className={styles.showcase}>
          <CreativeSignature />
          <span className={styles.stamp} aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs><path id="hero-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
              <text><textPath href="#hero-ring" textLength="276">D2C FIRST • IDEAS INTO IMPACT • </textPath></text>
            </svg>
            <b>↘</b>
          </span>
        </div>

        <div className={styles.under}>
          <p className={styles.support}>{hero.support}</p>
          <div className={styles.actions}>
            <MagneticButton className={styles.magnet}>
              <Link href="/contact" className={styles.cta}>
                <span className={styles.shine} aria-hidden="true" />
                {hero.cta} <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </MagneticButton>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
              {hero.whatsapp}
            </a>
            <p className={styles.trust}>{hero.trust}</p>
          </div>
        </div>

        <div className={styles.disciplines} aria-label="Our connected disciplines"><span>Creative direction</span><i aria-hidden="true">✳</i><span>Digital experiences</span><i aria-hidden="true">✳</i><span>Performance & growth</span></div>

      </div>
    </section>
  );
}
