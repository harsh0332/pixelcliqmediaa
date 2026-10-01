"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import styles from "./GrowthStatement.module.css";

export function GrowthStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backgroundColor = useTransform(scrollYProgress, [0, .7], ["#bdd1ff", "#f1f5ff"]);
  return <motion.section ref={ref} className={styles.section} style={{ backgroundColor: reduced ? "#e3edff" : backgroundColor }} aria-labelledby="growth-statement">
    <Container>
      <div className={styles.intro}><span className={styles.label}>THE PIXELCLIQ POINT OF VIEW</span><span className={styles.marker} aria-hidden="true">↙</span></div>
      <h2 id="growth-statement">A brand people choose.<br /><span>A reason to come back.</span></h2>
      <div className={styles.bottom}><p>We connect the story, the sale and everything in between. D2C expertise, with the creative and technical team to put it into practice.</p><ol>{[
        ["Earn attention", "Strategy, campaigns & creative"],
        ["Make buying easier", "Websites, Shopify & conversion"],
        ["Build the next connection", "Social, search & automation"],
      ].map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div>
    </Container>
  </motion.section>;
}
