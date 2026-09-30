import { MotionExplainer } from "@/components/animations/MotionExplainer";
import Link from "next/link";
import { ArrowUpRight, Check, Crosshair } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { ServiceArt } from "@/components/sections/GrowthVisuals";
import { ServiceCanvas } from "./ServiceCanvas";
import { servicePillars, type ServicePillar } from "@/content/services";
import type { CaseStudy } from "@/content/cases";
import type { CreativeItem } from "@/content/creatives";
import styles from "./StudioPages.module.css";

export interface ServicePageTemplateProps { pillar: ServicePillar; next: ServicePillar; related: CreativeItem[]; cases: CaseStudy[]; }
export function ServicePageTemplate({ pillar, next }: ServicePageTemplateProps) {
  return <>
    <section className={styles.hero} aria-labelledby="pillar-heading"><Container>
      <Link href="/services" className={styles.breadcrumb}>Services / {pillar.title}</Link>
      <div className={styles.heroGrid}><div><p className={styles.label}>PIXELCLIQ CAPABILITIES / {pillar.number}</p><h1 id="pillar-heading">{pillar.title}<span>.</span></h1><p className={styles.promise}>{pillar.promise}</p><p className={styles.copy}>{pillar.summary}</p><div className={styles.actions}><Button href="/contact" size="lg">Let’s talk {pillar.title === "D2C Growth" ? "growth" : "about your project"}</Button><a href="#deliverables">Explore the scope ↓</a></div></div><ServiceCanvas service={pillar.slug.split("/").pop() ?? pillar.id} title={pillar.title} capabilities={pillar.capabilities.slice(0,3)} /></div>
      <div className={styles.capabilityRail}>{pillar.capabilities.map(c => <span key={c}><Check size={13}/>{c}</span>)}</div>
    </Container></section>
    <section className={styles.section}><Container><div className={styles.sectionHead}><div><p className={styles.label}>01 / THE OPPORTUNITY</p><h2>Find the friction.<br/><em>Move things forward.</em></h2></div><p className={styles.copy}>{pillar.problem.intro}</p></div><div className={styles.painGrid}>{pillar.problem.pains.map((pain,i)=><FadeUp key={pain} delay={i*.06}><div className={styles.pain}><Crosshair size={20}/><span>0{i+1}</span><p>{pain}</p></div></FadeUp>)}</div></Container></section>
    <MotionExplainer service={pillar.slug.split("/").pop()} />
    <section id="deliverables" className={`${styles.section} ${styles.soft}`}><Container><div className={styles.sectionHead}><div><p className={styles.label}>02 / WHAT WE BUILD</p><h2>A clear scope.<br/><em>A connected system.</em></h2></div><p className={styles.copy}>{pillar.headline}</p></div><div className={styles.deliverables}>{pillar.deliverables.map((item,i)=><FadeUp key={item.title} delay={(i%3)*.05}><article className={styles.deliverable}><span className={styles.number}>{String(i+1).padStart(2,"0")}</span><h3>{item.title}</h3><p>{item.description}</p><span className={styles.deliverableMark} aria-hidden="true">↗</span></article></FadeUp>)}</div></Container></section>
    <section className={`${styles.section} ${styles.dark}`}><Container><div className={styles.sectionHead}><div><p className={styles.label}>03 / FROM PLAN TO PRACTICE</p><h2>Good work has<br/><em>a rhythm.</em></h2></div><p className={styles.copy}>A shared direction, clear deliverables and room to learn. Here is how we approach {pillar.title.toLowerCase()}.</p></div><ol className={styles.process}>{pillar.process.map((step,i)=><li key={step.step}><FadeUp delay={i*.05}><span className={styles.processNumber}>{step.step}</span><h3>{step.title}</h3><p>{step.description}</p></FadeUp></li>)}</ol></Container></section>
    <section className={styles.section}><Container><div className={styles.fitGrid}><div><p className={styles.label}>04 / THE RIGHT PARTNERSHIP</p><h2>Built around<br/><em>your next move.</em></h2></div><div className={styles.fitCard}><span className={styles.label}>A GOOD FIT WHEN</span><p>{pillar.fit.intro}</p><details><summary>When another approach may be better</summary><p>{pillar.fit.notFor}</p></details></div></div><div className={styles.connections}><p className={styles.label}>CONNECTED CAPABILITIES</p><p>{pillar.connectsNote}</p><div>{pillar.connectsTo.map(id=>{const p=servicePillars.find(x=>x.id===id);return p?<Link href={p.slug} key={id}>{p.title}<ArrowUpRight size={16}/></Link>:null;})}</div></div></Container></section>
    <section className={`${styles.section} ${styles.soft}`}><Container className={styles.fitGrid}><div><p className={styles.label}>05 / YOUR QUESTIONS</p><h2>Clarity before<br/><em>we begin.</em></h2></div><Accordion items={pillar.faq.map((entry,i)=>({id:`${pillar.id}-${i}`,question:entry.q,answer:entry.a}))}/></Container></section>
    <Container><Link href={next.slug} className={styles.next}><span>EXPLORE THE NEXT CAPABILITY</span><strong>{next.title}</strong><ArrowUpRight size={36}/></Link></Container>
  </>;
}

export function ServicesDirectory() {
  return <section className={styles.section}><Container><div className={styles.directory}>{servicePillars.map((p,i)=><Link key={p.id} href={p.slug} className={styles.directoryCard}><ServiceArt index={i%6}/><div><span className={styles.label}>CAPABILITY {p.number}</span><h2>{p.title}<ArrowUpRight size={24}/></h2><p>{p.promise}</p><div className={styles.directoryTags}>{p.capabilities.slice(0,3).map(c=><span key={c}>{c}</span>)}</div></div></Link>)}</div></Container></section>;
}
