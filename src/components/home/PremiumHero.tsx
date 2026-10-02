import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { homeContent } from "@/content/refinedHome";
import { whatsappHref } from "@/content/site";
import { HeroVideo } from "./HeroVideo";
import styles from "./PremiumHero.module.css";

/** Each image card slowly cycles through three pieces of studio work. */
const CARD_A = ["coffee", "skincare", "fragrance"];

function Cycle({ ids }: { ids: string[] }) {
  return (
    <span className={styles.cycle}>
      {ids.map((id, i) => (
        <Image
          key={id}
          src={`/images/showcase/${id}.webp`}
          alt=""
          fill
          sizes="(max-width: 1023px) 50vw, 32vw"
          priority={i === 0}
          style={{ animationDelay: `${i * 4}s` }}
        />
      ))}
    </span>
  );
}

/**
 * The homepage hero: one statement, one action, three pieces of work.
 *
 * Deliberately sparse. The colour field does the brand work, the type does the
 * talking, and the only movement is slow: light drifting behind the headline,
 * the work cross-fading inside its frames, the orbit and the stamp turning.
 */
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

        <h1 id="hero-heading" className={styles.title}>
          <span className={styles.line}><span>{hero.titleLines[0]}</span></span>
          <span className={`${styles.line} ${styles.accent}`}><span>{hero.titleLines[1]}</span></span>
        </h1>

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

        <div className={styles.exhibition}>
          <Link href="/creative-showcase" className={styles.art}>
            <Cycle ids={CARD_A} />
            <span className={styles.caption}>{hero.cards.a} <b aria-hidden="true">↗</b></span>
          </Link>

          <Link href="/work" className={styles.statement}>
            <span className={styles.statementTop}>{hero.cards.statementTop}</span>
            <strong>
              {hero.cards.statementA}
              <br />
              {hero.cards.statementB}
            </strong>
            <span className={styles.orbit} aria-hidden="true"><i /><i /><i /></span>
            <span className={styles.caption}>{hero.cards.statementLink} <b aria-hidden="true">↗</b></span>
          </Link>

          <Link href="/ai-video-creative" className={`${styles.art} ${styles.artLast}`}>
            <HeroVideo className={styles.video} src="/videos/ai/film-22-preview.mp4" poster="/videos/ai/film-22.jpg" />
            <span className={styles.caption}>{hero.cards.c} <b aria-hidden="true">↗</b></span>
          </Link>

          <span className={styles.stamp} aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs><path id="hero-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
              <text><textPath href="#hero-ring" textLength="276">D2C FIRST • IDEAS INTO IMPACT • </textPath></text>
            </svg>
            <b>↘</b>
          </span>
        </div>
      </div>
    </section>
  );
}
