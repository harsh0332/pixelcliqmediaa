import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ServicesDirectory } from "@/components/services/ServicePageTemplate";



import { PageHero } from "@/components/sections/PageHero";




export const metadata: Metadata = buildMetadata({
  title: "D2C Growth Services",
  description:
    "Six connected pillars — growth, creative, commerce, SEO, automation and data — run as one system rather than six vendors briefing each other second-hand.",
  path: "/services",
  eyebrow: "Services",
});


/**
 * /services — the index.
 *
 * Deeper than the homepage rows on purpose: this page carries the SEO weight
 * for the category, so each pillar gets its summary, its full capability index
 * and its outgoing links rather than a one-line teaser.
 *
 * The "connects to" row on every block is what keeps the system argument alive
 * across the site — a visitor can enter on any pillar and see the other three
 * it feeds without going back to the homepage.
 */
export default function ServicesIndexPage() {
 return <><PageHero id="services-index-heading" eyebrow="D2C FIRST. FULL-SERVICE BY DESIGN." headlineLines={["BOLD THINKING.", "REAL EXECUTION."]} support="Creative, media, commerce and technology. Find the expertise your business needs now, with the room to connect more as you grow." /><ServicesDirectory /></>;
}
