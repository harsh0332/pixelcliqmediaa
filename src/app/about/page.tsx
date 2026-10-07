import { QuoteBand } from "@/components/sections/QuoteBand";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { GrowthProcess } from "@/components/sections/GrowthVisuals";
import { aboutPage } from "@/content/home";
import { BeliefStack } from "@/components/about/BeliefStack";
import { StudioCard } from "@/components/about/StudioCard";
import styles from "@/components/services/StudioPages.module.css";
export const metadata:Metadata=buildMetadata({title:"About Pixelcliq",description:"Pixelcliq Media is an independent creative and growth studio. One team for ads, creative, Shopify and WhatsApp automation, from first scroll to repeat order.",path:"/about",eyebrow:"About"});
export default function AboutPage(){return <><PageHero id="about-heading" eyebrow="THE THINKING BEHIND THE WORK" headlineLines={["One team.","The whole picture."]} support={aboutPage.support}/><QuoteBand tone="ice" not="An agency you brief and chase." is="A team that thinks with you."/><section className={styles.section}><Container><div className={styles.sectionHead}><div><p className={styles.label}>WHY PIXELCLIQ</p><h2>Great brands<br/><em>need connection.</em></h2></div><p className={styles.copy}>The idea, the ad, the store and the follow-up all shape the same customer journey. We bring them into one conversation, so your brand can move with a clear direction.</p></div><BeliefStack/></Container></section><section className={`${styles.section} ${styles.dark}`} data-tone="inverse"><Container><div className={styles.sectionHead}><div><p className={styles.label}>HOW WE WORK</p><h2>Think. Make.<br/><em>Learn. Repeat.</em></h2></div><p className={styles.copy}>Clear priorities. Connected execution. A practical rhythm for doing the work and improving it.</p></div><GrowthProcess/></Container></section><section className={styles.section}><Container className={styles.fitGrid}><div><p className={styles.label}>WHEREVER YOUR CUSTOMERS ARE.</p><h2>Remote by design.<br/><em>Close by habit.</em></h2><p className={styles.copy}>{aboutPage.whereBody}</p></div><StudioCard/></Container></section></>}
