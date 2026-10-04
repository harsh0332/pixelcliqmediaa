import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { homeContent } from "@/content/refinedHome";
import { whatsappHref } from "@/content/site";
import { HeroReel } from "./HeroReel";
import { PixelField } from "./PixelField";
import styles from "./PremiumHero.module.css";

/**
 * The name is the idea: the hero is a field of pixels. The statement sits
 * centred in it, work resolves pixel by pixel around it, and the cursor (or a
 * tap) lights the grid. Below, the reel carries the work edge to edge.
 */
export function PremiumHero() {
  const { hero } = homeContent;
  const serif = hero.headline.b.replace(/\.$/, "");
  const period = hero.headline.b.endsWith(".");

  return (
    <section
      id="top"
      data-hero-section
      data-dark-hero
      aria-labelledby="hero-heading"
      className={styles.hero}
    >
      <PixelField />

      <div className={styles.inner}>
        <div className={styles.stage} data-pixel-bound>
          <div className={styles.statement}>
            <p className={styles.kicker}><span aria-hidden="true" />{hero.kicker}<span aria-hidden="true" /></p>

            <div className={styles.titleWrap}>
              <h1 id="hero-heading" className={styles.title}>
                <span className={styles.lineA}>{hero.headline.a}</span>{" "}
                <span className={styles.lineB}>
                  {serif}
                  {period && <span className={styles.dot}>.</span>}
                </span>
              </h1>
              <Link href="/creative-showcase" className={styles.stamp} aria-label={hero.explore}>
                <svg className={styles.ring} viewBox="0 0 120 120" aria-hidden="true">
                  <defs><path id="hero-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
                  <text><textPath href="#hero-ring" textLength="276">{hero.stamp.toUpperCase()}</textPath></text>
                </svg>
                <ArrowUpRight className={styles.stampArrow} aria-hidden="true" />
              </Link>
            </div>

            <p className={styles.support}>{hero.support}</p>

            <div className={styles.actions}>
              <MagneticButton className={styles.magnet}>
                <Link href="/contact" className={styles.cta}>
                  {hero.cta}
                  <span className={styles.ctaIcon} aria-hidden="true"><ArrowUpRight size={18} /></span>
                </Link>
              </MagneticButton>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={styles.ghost}>
                <i aria-hidden="true" />
                {hero.whatsapp}
              </a>
            </div>
            <p className={styles.trust}>{hero.trust}</p>
          </div>

          <div className={styles.meta}>
            <span><i aria-hidden="true" />{hero.topRight}</span>
            <a href="#work">{hero.scrollCue} <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>

      <HeroReel />

      <div className={styles.inner}>
        <div className={styles.foot}>
          <span className={styles.footLabel}>{hero.reelLabel}</span>
          <span className={styles.disciplines} aria-label="Our connected disciplines">
            {hero.disciplines.map((item, index) => (
              <span key={item}>
                {index > 0 && <i aria-hidden="true">✳</i>}
                {item}
              </span>
            ))}
          </span>
          <Link href="/creative-showcase" className={styles.footLink}>
            {hero.explore} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
