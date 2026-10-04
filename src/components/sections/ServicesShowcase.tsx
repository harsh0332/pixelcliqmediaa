import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MotionFigure } from "@/components/animations/MotionFigure";
import { FadeUp } from "@/components/motion/FadeUp";
import styles from "./ServicesShowcase.module.css";

const services = [
  {
    id: "strategy", category: "Strategy & paid media", title: "A clear plan.\nA stronger next move.",
    description: "Find your audience, sharpen your offer and connect every campaign to a business goal. Strategy gives your creative and media a shared direction.",
    tags: ["Marketing strategy", "Meta & Google Ads", "Campaign planning"],
    href: "/services/strategic-marketing", link: "Explore strategic marketing",
    file: "pixelcliq-roas-gauge", visualTitle: "Paid-media signals inform campaign decisions", visualLabel: "The campaign control room", outcome: "Plan → Launch → Learn",
  },
  {
    id: "creative", category: "Creative & design", title: "Make people stop.\nGive them a reason.",
    description: "Brand identities, campaign graphics and video made around one compelling idea. Build a recognisable presence, then keep finding new ways to tell your story.",
    tags: ["Brand design", "Ad creatives", "Video & motion"],
    href: "/services/creative", link: "Explore creative & content",
    file: "pixelcliq-creative-testing", visualTitle: "Creative ideas move through testing and iteration", visualLabel: "The creative studio", outcome: "Concept → Create → Test",
  },
  {
    id: "social", category: "Social media management", title: "A presence people\ncome back to.",
    description: "Turn an occasional post into a consistent brand voice. Content planning, publishing and community management keep the conversation moving across your social channels.",
    tags: ["Content calendars", "Publishing", "Community management"],
    href: "/services/social-media", link: "Explore social media",
    file: "pixelcliq-customer-segments", visualTitle: "Different audience groups connect with different brand stories", visualLabel: "The community picture", outcome: "Listen → Publish → Connect",
  },
  {
    id: "automation", category: "Automation & AI", title: "Less chasing.\nMore moving forward.",
    description: "Connect enquiries, customer conversations and your everyday tools. Thoughtful workflows help your team follow up, stay organised and spend time where it matters.",
    tags: ["CRM workflows", "WhatsApp automation", "AI integrations"],
    href: "/services/automation", link: "Explore automation & AI",
    file: "pixelcliq-whatsapp-ai-agent", visualTitle: "Customer questions flow into useful responses and follow-up", visualLabel: "The connected workflow", outcome: "Capture → Respond → Follow up",
  },
  {
    id: "web", category: "Web & digital experiences", title: "From first click\nto the next step.",
    description: "Websites and landing pages that explain your offer beautifully and make action feel natural. Clear journeys, considered details and responsive development, from the ground up.",
    tags: ["Website development", "Landing pages", "Conversion design"],
    href: "/services/web-development", link: "Explore web development",
    file: "pixelcliq-cro-product-page", visualTitle: "A page brings product information, reassurance and a clear next action together", visualLabel: "The conversion experience", outcome: "Design → Build → Refine",
  },
  {
    id: "seo", category: "SEO & organic discovery", title: "Show up when\nit matters most.",
    description: "Help the right people find you through useful content and a technically sound website. Research, on-page improvements and ongoing optimisation give organic growth a direction.",
    tags: ["Technical SEO", "Search-led content", "On-page optimisation"],
    href: "/services/seo", link: "Explore SEO & organic",
    file: "loop-01-discover-clarity", visualTitle: "Audience research and market signals reveal opportunities for organic discovery", visualLabel: "The discovery desk", outcome: "Research → Optimise → Grow",
  },
];

/** Shared service storytelling, with a shorter three-chapter edit for the homepage. */
export function ServicesShowcase({ compact = false }: { compact?: boolean }) {
  const shown = compact ? services.filter(({ id }) => ["strategy", "creative", "web"].includes(id)) : services;
  const headingId = compact ? "home-capabilities-heading" : "capabilities-showcase-heading";
  return (
    <section id={compact ? "services" : "service-showcase"} className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div>
            <p className={styles.eyebrow}><span aria-hidden="true" /> D2C first. Full-service thinking.</p>
            <h2 id={headingId}>The right expertise.<br /><span>All working together.</span></h2>
          </div>
          <p className={styles.intro}>From the first idea to the next customer. Start with one service, or bring the whole journey together.</p>
        </header>
        <div className={styles.panels}>
          {shown.map((service, index) => (
            <FadeUp key={service.id} className={styles.reveal}>
              <article className={`${styles.panel} ${styles[service.id]} ${index % 2 ? styles.reversed : ""}`}>
                <div className={styles.visual}>
                  <div className={styles.visualTop}><span>{service.visualLabel}</span><ArrowUpRight size={20} aria-hidden="true" /></div>
                  <div className={styles.motionFrame}><MotionFigure file={service.file} title={service.visualTitle} dark={service.id === "seo"} /></div>
                  <div className={styles.visualBottom}><span aria-hidden="true" className={styles.signal} /><span>{service.outcome}</span></div>
                </div>
                <div className={styles.copy}>
                  <p className={styles.category}>{service.category}</p>
                  <h3>{service.title.split("\n").map((line, lineIndex) => <span key={line}>{lineIndex > 0 && <br />}{line}</span>)}</h3>
                  <p className={styles.description}>{service.description}</p>
                  <ul className={styles.tags} aria-label={`${service.category} capabilities`}>{service.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                  <Link href={service.href} className={styles.link}>{service.link}<ArrowUpRight size={21} aria-hidden="true" /></Link>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
        <div className={styles.bottom}>
          <p>{compact ? "More ways to move your brand forward." : "One service or a connected team. Let’s find your starting point."}</p>
          <Link href={compact ? "/services" : "/contact"}>{compact ? "Discover all our services" : "Book a free growth call"}{compact ? <ArrowDown size={20} aria-hidden="true" /> : <ArrowUpRight size={20} aria-hidden="true" />}</Link>
        </div>
      </div>
    </section>
  );
}
