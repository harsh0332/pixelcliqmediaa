import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { GrowthProcess } from "@/components/sections/GrowthVisuals";
import styles from "@/components/services/StudioPages.module.css";

export const metadata: Metadata = buildMetadata({ title: "Our approach", description: "How Pixelcliq works: one free call, a written plan of what to fix first, then weekly sprints that connect strategy, creative, media and your store.", path: "/approach", eyebrow: "Our approach" });

const principles = [
  { title: "Start with the real constraint.", body: "We look at the product, customer, creative, store and economics together. The first priority is the problem holding the next stage of growth back." },
  { title: "Make the work visible.", body: "A shared brief, agreed deliverables and a clear review rhythm keep decisions connected. You know what is being built, why it matters and what comes next." },
  { title: "Build a learning rhythm.", body: "Every launch creates questions to answer. We review creative and conversion signals, document the learning and use it to shape the next round of work." },
];

export default function ApproachPage() {
  return <>
    <PageHero id="approach-heading" eyebrow="THE PIXELCLIQ APPROACH" headlineLines={["One direction.", "Every move connected."]} support="From the first conversation to the next experiment. A practical way to bring your brand, creative, media and commerce into the same plan." ctas={<Button href="/contact" size="lg">Book a free growth call</Button>} />
    <section className={styles.section}><Container><div className={styles.sectionHead}><div><p className={styles.label}>01 / THE STARTING POINT</p><h2>Clarity first.<br/><em>Then momentum.</em></h2></div><p className={styles.copy}>Your stage shapes the scope. We can start with one capability or connect several, with priorities agreed before execution begins.</p></div><div className={styles.deliverables}>{principles.map((item, i) => <article className={styles.deliverable} key={item.title}><span className={styles.number}>0{i + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></Container></section>
    <section id="our-process" className={`${styles.section} ${styles.dark}`} data-tone="inverse"><Container><div className={styles.sectionHead}><div><p className={styles.label}>02 / FROM BRIEF TO BETTER</p><h2>Five stages.<br/><em>One continuous loop.</em></h2></div><p className={styles.copy}>Explore each stage to see how we move from discovery to a working plan, production, launch and improvement.</p></div><GrowthProcess/></Container></section>
    <section className={styles.section}><Container><div className={styles.fitGrid}><div><p className={styles.label}>03 / WORKING TOGETHER</p><h2>A shared plan.<br/><em>No guesswork.</em></h2></div><div className={styles.fitCard}><h3 className="text-2xl font-bold">What you can expect</h3><p>A defined scope and priorities. Clear ownership. Review points before launch. A record of what we learn and the decisions it informs.</p><p>In the first conversation, we discuss your brand, your current challenges and the next outcome you want to work towards.</p><div className="mt-6"><Button href="/contact">Book a free growth call</Button></div></div></div></Container></section>
  </>;
}
