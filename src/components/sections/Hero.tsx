"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import styles from "./EditorialHero.module.css";

const campaigns = [
  { image: "coffee", name: "Early Hours", category: "Brand worlds" },
  { image: "beauty", name: "Hue Theory", category: "Campaign creative" },
  { image: "sneakers", name: "Pace Club", category: "Culture & commerce" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backgroundColor = useTransform(scrollYProgress, [0, .8], ["#193edd", "#0b173c"]);
  return <motion.section ref={ref} style={{ backgroundColor: reduced ? "#193edd" : backgroundColor }} className={styles.hero} data-hero-section aria-labelledby="hero-heading">
    <div className={styles.halo} aria-hidden="true" />
    <Container>
      <div className={styles.top}><span><i /> INDEPENDENT THINKING. CONNECTED GROWTH.</span><span>PIXELCLIQ — CREATIVE & GROWTH</span></div>
      <div className={styles.headline}>
        <p className={styles.kicker}>THE NEXT CHAPTER OF YOUR BRAND STARTS HERE</p>
        <h1 id="hero-heading">Good brands.<br /><span>Impossible</span> to ignore.</h1>
        <p className={styles.description}>We turn attention into desire. And desire into growth.<br /> Creative, media and commerce. Working as one.</p>
        <div className={styles.actions}>
          <Link className={styles.cta} href="/contact">Let’s make your next move <span aria-hidden="true">↗</span></Link>
          <Link className={styles.secondaryCta} href="/work">Explore the work <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className={styles.exhibition}>
        <div className={styles.sideNote}><span>IDEAS WITH<br />A POINT OF VIEW.</span><span aria-hidden="true">↘</span></div>
        <div className={styles.campaigns}>
          {campaigns.map((campaign, index) => <Link href="/creative-showcase" className={styles.art} key={campaign.image} aria-label={`Explore ${campaign.name} campaign concept`}>
            <Image src={`/images/showcase/${campaign.image}.png`} alt={`${campaign.name} original campaign concept`} width={600} height={600} sizes="(max-width: 767px) 40vw, 26vw" priority={index === 1} />
            <span><b>{campaign.name}</b><span>{campaign.category} ↗</span></span>
          </Link>)}
        </div>
        <Link href="#services" className={styles.stamp} aria-label="Discover our D2C growth services"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="hero-stamp-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs><text><textPath href="#hero-stamp-ring" textLength="276">D2C FIRST • IDEAS INTO IMPACT • </textPath></text></svg><span>↘</span></Link>
      </div>
      <div className={styles.bottom}><span>01 / A DIFFERENT POINT OF VIEW</span><span>SCROLL TO SEE THE BIGGER PICTURE ↓</span></div>
    </Container>
  </motion.section>;
}
