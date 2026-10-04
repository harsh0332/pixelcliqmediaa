import Image from "next/image";
import {
  BadgeCheck,
  Bookmark,
  CalendarCheck,
  FileSpreadsheet,
  Heart,
  MessageCircle,
  Search,
  Send,
  ShoppingCart,
  Sparkles,
  Star,
  UserPlus,
  Users,
} from "lucide-react";
import styles from "./Mockups.module.css";

/**
 * Product-style illustrations for the service cards.
 *
 * Built from HTML and SVG rather than exported screenshots: they stay sharp at
 * any size, cost a few kilobytes, and animate in CSS. Every figure shown is a
 * sample and is labelled as one — these show how the work looks, not a result.
 */
export function FeatureVisual({ kind, instance = "a" }: { kind: string; instance?: string }) {
  const Visual = VISUALS[kind] ?? AdsVisual;
  return (
    <div className={`${styles.frame} ${styles[`frame_${kind}`] ?? ""}`}>
      <span className={styles.band} aria-hidden="true" />
      <div className={styles.screen}>
        <Visual uid={`${kind}-${instance}`} />
      </div>
    </div>
  );
}

function Sample({ children = "Sample view · illustrative figures" }: { children?: string }) {
  return <p className={styles.sample}>{children}</p>;
}

function AdsVisual({ uid }: { uid: string }) {
  return (
    <figure className={styles.ads} aria-label="Illustrative ad performance dashboard">
      <div className={styles.adsTop}>
        <span className={styles.live}><i /> Live campaigns</span>
        <span className={styles.platforms} aria-hidden="true">
          <i className={styles.pMeta}>f</i>
          <i className={styles.pGoogle}>G</i>
          <i className={styles.pInsta} />
        </span>
      </div>
      <svg className={styles.chart} viewBox="0 0 320 150" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5badff" stopOpacity=".35" />
            <stop offset="1" stopColor="#5badff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#27c4f5" />
            <stop offset="1" stopColor="#0a6fd0" />
          </linearGradient>
        </defs>
        <g className={styles.grid}>
          <line x1="0" y1="30" x2="320" y2="30" />
          <line x1="0" y1="70" x2="320" y2="70" />
          <line x1="0" y1="110" x2="320" y2="110" />
        </g>
        <path className={styles.area} d="M0 128 C 30 120, 45 96, 70 102 S 110 72, 140 80 S 185 40, 210 52 S 260 22, 320 14 L320 150 L0 150Z" fill={`url(#${uid}-area)`} />
        <path className={styles.line} d="M0 128 C 30 120, 45 96, 70 102 S 110 72, 140 80 S 185 40, 210 52 S 260 22, 320 14" stroke={`url(#${uid}-line)`} />
        <circle className={styles.point} cx="320" cy="14" r="5" />
      </svg>
      <div className={styles.kpis}>
        <div><span className={styles.kDot} style={{ background: "#2ad19b" }} /><b>3.4x</b><small>Blended ROAS</small></div>
        <div><span className={styles.kDot} style={{ background: "#0a6fd0" }} /><b>₹412</b><small>Cost per order</small></div>
        <div><span className={styles.kDot} style={{ background: "#ff6b8a" }} /><b>1,284</b><small>Orders this month</small></div>
      </div>
      <Sample />
    </figure>
  );
}

function DesignVisual() {
  return (
    <figure className={styles.design} aria-label="Ad creative variations in three formats">
      <div className={`${styles.creative} ${styles.cTall}`}>
        <Image src="/images/showcase/thumbs/sneakers.webp" alt="" fill unoptimized />
        <span>9:16 · Reel</span>
      </div>
      <div className={`${styles.creative} ${styles.cMid}`}>
        <Image src="/images/showcase/thumbs/skincare.webp" alt="" fill unoptimized />
        <span>4:5 · Feed</span>
      </div>
      <div className={`${styles.creative} ${styles.cSquare}`}>
        <Image src="/images/showcase/thumbs/coffee.webp" alt="" fill unoptimized />
        <span>1:1 · Static</span>
      </div>
      <span className={`${styles.hook} ${styles.hookA}`}>Hook A · Problem first</span>
      <span className={`${styles.hook} ${styles.hookB}`}><BadgeCheck size={14} aria-hidden="true" /> Winner · keep scaling</span>
      <Sample>Original concept work by Pixelcliq</Sample>
    </figure>
  );
}

function SocialVisual() {
  return (
    <figure className={styles.social} aria-label="Illustrative social media post on a phone">
      <div className={styles.profile}>
        <span className={styles.avatar} />
        <div><b>yourbrand</b><small>Skincare · India</small></div>
        <span className={styles.follow}>Follow</span>
      </div>
      <div className={styles.phone}>
        <div className={styles.postHead}><span className={styles.avatarSm} /> <b>yourbrand</b><span>•••</span></div>
        <div className={styles.postImg}>
          <Image src="/images/showcase/thumbs/beauty.webp" alt="" fill unoptimized />
        </div>
        <div className={styles.postBar} aria-hidden="true">
          <Heart size={17} className={styles.liked} /><MessageCircle size={17} /><Send size={17} /><Bookmark size={17} className={styles.save} />
        </div>
        <p className={styles.postText}><b>2,148 likes</b><span>Three ingredients, one routine…</span></p>
      </div>
      <span className={styles.float} aria-hidden="true">
        <i>❤</i><i>😍</i><i>🔥</i><i>❤</i>
      </span>
      <Sample />
    </figure>
  );
}

function AutomationVisual() {
  const steps = [
    { icon: Users, label: "New lead from Meta ad", time: "0s", tone: "lead" },
    { icon: FileSpreadsheet, label: "Saved to Google Sheet", time: "2s", tone: "sheet" },
    { icon: UserPlus, label: "Added to CRM", time: "4s", tone: "crm" },
    { icon: MessageCircle, label: "WhatsApp reply sent", time: "30s", tone: "wa" },
  ];
  return (
    <figure className={styles.flow} aria-label="An automated lead follow-up workflow">
      <span className={styles.rail} aria-hidden="true"><i /></span>
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className={`${styles.node} ${styles[`n_${s.tone}`]}`} style={{ animationDelay: `${i * 0.6}s` }}>
            <Icon size={17} aria-hidden="true" />
            <span>{s.label}</span>
            <small>{s.time}</small>
          </div>
        );
      })}
      <Sample>Example workflow</Sample>
    </figure>
  );
}

function WebVisual() {
  return (
    <figure className={styles.web} aria-label="Illustrative product page in a browser">
      <div className={styles.browser}>
        <div className={styles.chrome}><i /><i /><i /><span>yourbrand.com/products/tote</span></div>
        <div className={styles.page}>
          <div className={styles.pImg}>
            <Image src="/images/showcase/thumbs/bags.webp" alt="" fill unoptimized />
          </div>
          <div className={styles.pInfo}>
            <span className={styles.stars} aria-hidden="true">{[0, 1, 2, 3, 4].map((n) => <Star key={n} size={11} />)}</span>
            <b>The Everyday Tote</b>
            <span className={styles.bar} />
            <span className={`${styles.bar} ${styles.barShort}`} />
            <strong>₹2,490</strong>
            <span className={styles.atc}><ShoppingCart size={13} aria-hidden="true" /> Add to cart</span>
            <span className={styles.trust}>Free delivery · Easy returns</span>
          </div>
        </div>
      </div>
      <div className={styles.score} aria-hidden="true">
        <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" /><circle className={styles.scoreArc} cx="22" cy="22" r="18" /></svg>
        <b>96</b>
        <small>Mobile speed</small>
      </div>
      <Sample />
    </figure>
  );
}

function SeoVisual() {
  return (
    <figure className={styles.seo} aria-label="Illustrative search results with your brand ranking">
      <div className={styles.searchBox}>
        <Search size={15} aria-hidden="true" />
        <span className={styles.typed}>best cold brew coffee online</span>
      </div>
      <div className={styles.aiBox}>
        <span><Sparkles size={13} aria-hidden="true" /> AI overview</span>
        <p>Popular picks include small-batch brands with clear brewing guides, such as <b>yourbrand.com</b>.</p>
      </div>
      <div className={`${styles.result} ${styles.resultTop}`}>
        <small>yourbrand.com › cold-brew</small>
        <b>Cold Brew Coffee Concentrate | Your Brand</b>
        <span className={styles.rank}>#1</span>
      </div>
      <div className={styles.result}><small>marketplace.in › coffee</small><span className={styles.line} /></div>
      <div className={styles.result}><small>blog.example › guides</small><span className={styles.line} /></div>
      <Sample />
    </figure>
  );
}

function LeadsVisual() {
  const stages = [
    { label: "Saw the ad", w: 100 },
    { label: "Registered", w: 78 },
    { label: "Attended", w: 56 },
    { label: "Booked a call", w: 36 },
  ];
  return (
    <figure className={styles.leads} aria-label="Illustrative webinar funnel with WhatsApp reminders">
      <div className={styles.funnel}>
        {stages.map((s, i) => (
          <div key={s.label} className={styles.stage} style={{ width: `${s.w}%`, animationDelay: `${i * 0.15}s` }}>
            {s.label}
          </div>
        ))}
      </div>
      <div className={styles.reg}>
        <span className={styles.regTag}>Free masterclass</span>
        <b>Grow your clinic online</b>
        <small><CalendarCheck size={12} aria-hidden="true" /> Thursday · 7:00 PM</small>
        <span className={styles.regBtn}>Reserve my seat</span>
      </div>
      <div className={styles.bubble}>
        <MessageCircle size={13} aria-hidden="true" />
        <span>See you at 7 PM. Here is your joining link.</span>
      </div>
      <Sample />
    </figure>
  );
}

function BrandVisual() {
  const swatches = [
    { hex: "#0e3f70", name: "Ink" },
    { hex: "#E9DCC8", name: "Sand" },
    { hex: "#C8553D", name: "Clay" },
    { hex: "#F5F1EA", name: "Paper" },
  ];
  return (
    <figure className={styles.brand} aria-label="Illustrative brand identity board">
      <div className={styles.logoTile}>
        <span className={styles.logoMark} aria-hidden="true"><i /><i /></span>
        <b>morrow</b>
        <small>Slow living goods</small>
      </div>
      <div className={styles.typeTile}>
        <span>Aa</span>
        <small>Display · Bold</small>
      </div>
      <div className={styles.packTile}>
        <Image src="/images/showcase/thumbs/morrow.webp" alt="" fill unoptimized />
        <span>Packaging</span>
      </div>
      <div className={styles.swatches}>
        {swatches.map((s) => (
          <span key={s.hex} style={{ background: s.hex }} className={s.name === "Paper" || s.name === "Sand" ? styles.swLight : undefined}>
            <b>{s.name}</b>
            <small>{s.hex}</small>
          </span>
        ))}
      </div>
      <Sample>Example identity system</Sample>
    </figure>
  );
}

function LandingVisual() {
  return (
    <figure className={styles.landing} aria-label="Illustrative campaign landing page with a lead form">
      <div className={styles.browser}>
        <div className={styles.chrome}><i /><i /><i /><span>yourclinic.com/free-consultation</span></div>
        <div className={styles.lpHero}>
          <div className={styles.lpCopy}>
            <span className={styles.lpTag}>Free consultation</span>
            <b>Clearer skin in 8 weeks, with a plan made for you</b>
            <span className={styles.bar} />
            <span className={`${styles.bar} ${styles.barShort}`} />
          </div>
          <div className={styles.lpForm}>
            <span className={styles.field}>Your name</span>
            <span className={styles.field}>WhatsApp number</span>
            <span className={styles.atc}><CalendarCheck size={13} aria-hidden="true" /> Book my slot</span>
          </div>
        </div>
      </div>
      <div className={styles.toast}>
        <MessageCircle size={14} aria-hidden="true" />
        <span><b>New enquiry</b> sent to WhatsApp</span>
      </div>
      <Sample />
    </figure>
  );
}

const VISUALS: Record<string, (props: { uid: string }) => React.ReactElement> = {
  ads: AdsVisual,
  design: DesignVisual,
  social: SocialVisual,
  brand: BrandVisual,
  landing: LandingVisual,
  store: WebVisual,
  automation: AutomationVisual,
  seo: SeoVisual,
  leads: LeadsVisual,
};
