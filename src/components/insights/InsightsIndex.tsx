"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { InsightCover } from "./InsightCover";
import { insights, type InsightCategory } from "@/content/insights";
import styles from "./InsightsIndex.module.css";
const categories=[...new Set(insights.map(i=>i.category))];
export function InsightsIndex(){
 const [category,setCategory]=useState<InsightCategory|null>(null);
 const featured=insights.find(i=>i.status==="published");
 const filtered=insights.filter(i=>!category||i.category===category);
 return <>
 <section className={styles.hero} data-dark-hero><Container><p className={styles.label}>THE PIXELCLIQ JOURNAL</p><div className={styles.intro}><h1>Fresh thinking.<br/><em>Forward motion.</em></h1><div><span className={styles.noteMark} aria-hidden="true">↗</span><p>Ideas, frameworks and practical notes on building brands that move. From the creative brief to the next purchase.</p></div></div></Container></section>
 {featured&&<section className={styles.feature}><Container><Link href={`/insights/${featured.slug}`} className={styles.featureGrid}><div className={styles.cover} aria-hidden="true"><div className={styles.coverMeta}>FIELD NOTES <span>01 / CREATIVE</span></div><strong>TEST.<br/>LEARN.<br/><em>REPEAT.</em></strong><div className={styles.coverBottom}><span>THE CREATIVE TESTING PLAYBOOK</span><span>↗</span></div></div><div className={styles.featureCopy}><p className={styles.label}>FEATURED READ / {featured.category.toUpperCase()}</p><h2>{featured.title}</h2><p>{featured.excerpt}</p><div className={styles.readMore}><span>Read the story <ArrowUpRight size={18}/></span><span>{featured.readingTime}</span></div></div></Link></Container></section>}
 <section className={styles.library}><Container><div className={styles.libraryHeading}><h2>The reading room.<em>Pick a topic, go deep.</em></h2><p>Explore a topic. Find your next idea.</p></div><div className={styles.filters} role="group" aria-label="Filter insights by category"><Chip pressed={category===null} onClick={()=>setCategory(null)}>All</Chip>{categories.map(c=><Chip key={c} pressed={category===c} onClick={()=>setCategory(c)}>{c}</Chip>)}</div><div className={styles.grid} aria-live="polite">{filtered.map(entry=><article key={entry.slug} className={styles.card}><InsightCover slug={entry.slug}/><div className={styles.cardCopy}><div className={styles.cardMeta}><span>{entry.category}</span><span>{entry.status==='published'?entry.readingTime:'Coming soon'}</span></div><h3>{entry.title}</h3><p>{entry.excerpt}</p>{entry.status==='published'?<Link href={`/insights/${entry.slug}`} className={styles.articleLink}>Read article <ArrowUpRight size={18}/></Link>:<span className={styles.pending}>On our editorial desk <span aria-hidden="true">○</span></span>}</div></article>)}</div></Container></section>
 </>;
}
