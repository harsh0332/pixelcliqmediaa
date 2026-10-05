"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./StartChooser.module.css";

const PROBLEMS = [
  {
    pain: "Ads spend more than they earn",
    why: "Fix structure, tracking and bidding first, so every rupee after that is judged on margin.",
    picks: [{ label: "Performance Marketing", href: "/services/performance" }, { label: "Creative & Ad Design", href: "/services/creative" }],
  },
  {
    pain: "Creative feels tired",
    why: "A weekly testing rhythm with new hooks and formats, so the account always has something fresh to learn from.",
    picks: [{ label: "Creative & Ad Design", href: "/services/creative" }, { label: "Studio Zero: AI visuals", href: "/studio-zero" }],
  },
  {
    pain: "Traffic comes, sales don't",
    why: "The page has to finish what the ad started: faster product pages, clearer proof and a simpler checkout.",
    picks: [{ label: "Shopify & Web Experiences", href: "/services/shopify" }],
  },
  {
    pain: "Leads go cold before we reply",
    why: "Instant WhatsApp replies, routing and follow-ups, so no enquiry waits overnight for a person.",
    picks: [{ label: "Automation & WhatsApp", href: "/services/automation" }, { label: "Lead Generation & Funnels", href: "/services/lead-generation" }],
  },
  {
    pain: "The brand looks different everywhere",
    why: "One identity system and template kit, so every ad, post and pack looks like the same company.",
    picks: [{ label: "Brand Identity & Design", href: "/services/branding" }, { label: "Social Media Management", href: "/services/social-media" }],
  },
  {
    pain: "Nobody finds us on search",
    why: "Technical fixes and pages written for real searches, so Google and AI assistants can quote you.",
    picks: [{ label: "SEO & AI Search", href: "/services/seo" }],
  },
];

/** Pick the problem that hurts most; get the one or two services to start with. */
export function StartChooser() {
  const [active, setActive] = useState(0);
  const current = PROBLEMS[active]!;
  return (
    <section className={styles.section} aria-labelledby="start-chooser-heading">
      <div className={styles.inner}>
        <div className={styles.head} data-rise>
          <p className={styles.eyebrow}>Where to start</p>
          <h2 id="start-chooser-heading" className={styles.title}>Pick what hurts most. <em>We&rsquo;ll point the way.</em></h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.pains} role="group" aria-label="Your biggest problem">
            {PROBLEMS.map((p, i) => (
              <button key={p.pain} type="button" aria-pressed={i === active} onClick={() => setActive(i)}>
                <span className={styles.dot} aria-hidden="true" />
                {p.pain}
              </button>
            ))}
          </div>
          <div key={active} className={styles.answer} aria-live="polite">
            <p className={styles.answerLabel}>Start with</p>
            <ul className={styles.picks}>
              {current.picks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}<ArrowUpRight size={20} aria-hidden="true" /></Link>
                </li>
              ))}
            </ul>
            <p className={styles.why}>{current.why}</p>
            <Link href="/contact" className={styles.call}>Or talk it through on a free call</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
