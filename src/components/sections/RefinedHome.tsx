import { MotionExplainer } from "@/components/animations/MotionExplainer";
import Link from "next/link";
import { CrossedBands, PortfolioStage } from "./PortfolioStage";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { refinedHome } from "@/content/refinedHome";
import { GrowthProcess, ServiceArt } from "./GrowthVisuals";
import styles from "./RefinedHome.module.css";

export function RefinedHome() {
  return (
    <>
      <section id="services" aria-labelledby="capabilities-heading" className={styles.section}>
        <Container>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>01 / What we do</p><h2 id="capabilities-heading" className={styles.heading}>BIG IDEAS.<br /><em>BUILT TO DELIVER.</em></h2></div>
            <div className={styles.journeyIntro}><span className={styles.eyebrow}>ONE PARTNER. EVERY TOUCHPOINT.</span><div><span>Attract</span><i>→</i><span>Convert</span><i>→</i><span>Retain</span></div><p>Start with what your brand needs.<br />Connect the rest as you grow.</p></div>
          </div>
          <div className={styles.serviceGrid}>
            {refinedHome.services.map((service, index) => (
              <Link key={service.number} href={service.href} className={styles.service}>
                <div className={styles.serviceTop}><span>{service.number}</span><ArrowUpRight size={21} aria-hidden="true" /></div>
                <ServiceArt index={index} /><h3>{service.title}</h3><p>{service.description}</p><span className={styles.tags}>{service.tags}</span>
              </Link>
            ))}
          </div>

        </Container>
      </section>
      <MotionExplainer />
      <CrossedBands />
      <PortfolioStage kind="both" />
      <section className={styles.beyond} aria-labelledby="beyond-heading">
        <Container className={styles.beyondGrid}>
          <div><p className={styles.eyebrow}>03 / Beyond D2C</p><h2 id="beyond-heading" className={styles.heading}>Different business.<br /><em>Same growth mindset.</em></h2><p className={styles.intro}>D2C is our speciality. Our capabilities go further. We help service businesses, educators and growing brands turn interest into their next customer.</p><Link href="/contact" className={styles.textLink}>Build your growth plan <ArrowUpRight size={19} /></Link></div>
          <div className={styles.beyondList}>{[
            ["01", "Ads & lead generation", "Meta and Google campaigns, lead capture and CRM follow-ups."],
            ["02", "Course & webinar funnels", "Launch journeys, registration pages and nurture sequences."],
            ["03", "Social, websites & SEO", "A stronger brand presence, from the feed to the search result."],
            ["04", "AI & business automation", "Connected workflows that keep enquiries and follow-ups moving."],
          ].map(([number, title, copy]) => <Link href="/contact" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight aria-hidden="true" size={22}/></Link>)}</div>
        </Container>
      </section>
      <section id="compound-loop" data-tone="inverse" aria-labelledby="approach-heading" className={styles.approach}>
        <Container>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>04 / How we work</p><h2 id="approach-heading" className={styles.heading}>One direction.<br /><em>Every detail connected.</em></h2></div>
            <p className={styles.intro}>The ad earns attention. The page builds confidence. The follow-up brings people back. We plan for the whole journey.</p>
          </div>
          <GrowthProcess />
          <div className={styles.approachBottom}><span>Built around your business. Improved with every iteration.</span><Link href="/about">Meet Pixelcliq <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </Container>
      </section>
      <section aria-labelledby="home-faq-heading" className={styles.faq}>
        <Container className={styles.faqGrid}>
          <div><p className={styles.eyebrow}>05 / A little clarity</p><h2 id="home-faq-heading" className={styles.heading}>Before we<br /><em>get started.</em></h2><p className={styles.faqNote}>A few things you might be wondering.</p></div>
          <Accordion items={refinedHome.faqs} />
        </Container>
      </section>
    </>
  );
}
