import { MotionFigure } from "@/components/animations/MotionFigure";
import styles from "./ServiceCanvas.module.css";

const scenes: Record<string, { headline: string; subtitle: string; file: string; title: string; theme: string }> = {
  "d2c-growth": { headline: "Turn demand into momentum.", subtitle: "THE ACQUISITION ENGINE", file: "pixelcliq-cac-reduction", title: "How creative testing and conversion work together to improve acquisition", theme: "growth" },
  creative: { headline: "One idea. Many possibilities.", subtitle: "THE CREATIVE TESTING STUDIO", file: "pixelcliq-creative-testing", title: "Creative concepts move through testing, learning and iteration", theme: "creative" },
  shopify: { headline: "Make the next click count.", subtitle: "THE SHOPPING EXPERIENCE", file: "pixelcliq-cro-product-page", title: "The details that help a product page turn interest into a purchase", theme: "commerce" },
  seo: { headline: "Become the answer.", subtitle: "THE DISCOVERY PLAN", file: "loop-01-discover-clarity", title: "Research brings customer needs, market signals and opportunities into focus", theme: "search" },
  automation: { headline: "Good conversations. On repeat.", subtitle: "THE CONNECTED WORKFLOW", file: "pixelcliq-whatsapp-ai-agent", title: "A customer conversation moves from question to useful response and next step", theme: "automation" },
  data: { headline: "From signals to decisions.", subtitle: "THE MEASUREMENT DESK", file: "pixelcliq-profit-waterfall", title: "Revenue, costs and contribution brought into one measurement view", theme: "data" },
  performance: { headline: "Make every channel accountable.", subtitle: "THE MEDIA CONTROL ROOM", file: "pixelcliq-roas-gauge", title: "A live illustration of how paid-media signals are monitored", theme: "performance" },
  "social-media": { headline: "Give people a reason to stay.", subtitle: "THE COMMUNITY PICTURE", file: "pixelcliq-customer-segments", title: "Different customer groups need different stories and conversations", theme: "social" },
  "web-development": { headline: "Land the click.", subtitle: "THE PAGE THAT CONVERTS", file: "pixelcliq-cro-product-page", title: "The parts of a page that turn a visit into an enquiry or a sale", theme: "commerce" },
  "lead-generation": { headline: "Answer while it is warm.", subtitle: "THE LEAD ENGINE", file: "pixelcliq-whatsapp-ai-agent", title: "A new enquiry moves from ad to instant reply to booked call", theme: "automation" },
  branding: { headline: "Be recognised at a glance.", subtitle: "THE IDENTITY SYSTEM", file: "loop-03-create-connection", title: "One visual system carried across ads, pages and packaging", theme: "creative" },
};

export function ServiceCanvas({ service, title, capabilities }: { service: string; title: string; capabilities: string[] }) {
  const scene = scenes[service] ?? scenes["d2c-growth"]!;
  return <aside className={`${styles.canvas} ${styles[scene.theme]}`} aria-label={`${title} in motion`}>
    <div className={styles.top}><span>{scene.subtitle}</span><span aria-hidden="true">↗</span></div>
    <h2>{scene.headline}</h2>
    <div className={styles.motion}><MotionFigure file={scene.file} title={scene.title} dark={service === "seo"}/></div>
    <div className={styles.tags}>{capabilities.map(c => <span key={c}>{c}</span>)}</div>
    <p className={styles.note}>Illustrative workflow · example figures</p>
  </aside>;
}
