import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import styles from "./EditorialHero.module.css";

export function Hero() {
  return <section className={styles.hero} data-hero-section aria-labelledby="hero-heading">
    <Container>
      <div className={styles.top}><span><i /> INDEPENDENT THINKING. CONNECTED GROWTH.</span><span>D2C FIRST. FULL SERVICE.</span></div>
      <div className={styles.headline}>
        <p className={styles.kicker}>For brands with bigger plans.</p>
        <h1 id="hero-heading">MAKE YOUR<br /><span>NEXT BIG MOVE.</span></h1>
        <div className={styles.under}><p>Desire starts with creative. Growth takes a system.<br /> We bring your brand, media and commerce together.</p><Link className={styles.cta} href="/contact">Let’s build your next move <span>↗</span></Link></div>
      </div>
      <div className={styles.exhibition}>
        <Link href="/creative-showcase" className={styles.art}><Image src="/images/showcase/coffee.png" alt="Early Hours original coffee campaign concept" width={600} height={600} priority /><span>01 / BRAND WORLDS <b>↗</b></span></Link>
        <Link href="/work#ai-video-creative" className={styles.statement}><span>CREATIVE × COMMERCE</span><strong>Made to stop.<br />Built to move.</strong><div className={styles.orbit} aria-hidden="true"><i /><i /><i /><b>↗</b></div><span>EXPLORE THE STUDIO <b>↗</b></span></Link>
        <Link href="/creative-showcase" className={styles.art}><Image src="/images/showcase/sneakers.png" alt="Pace Club original footwear campaign concept" width={600} height={600} priority /><span>02 / CULTURE & CAMPAIGNS <b>↗</b></span></Link>
        <Link href="#services" className={styles.stamp} aria-label="Discover our D2C growth services"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="hero-stamp-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs><text><textPath href="#hero-stamp-ring" textLength="276">D2C FIRST • IDEAS INTO IMPACT • </textPath></text></svg><span>↘</span></Link>
      </div>
      <div className={styles.bottom}><span>CREATIVE THAT CONNECTS</span><span>MEDIA WITH INTENT</span><span>COMMERCE THAT CONVERTS</span></div>
    </Container>
  </section>;
}
