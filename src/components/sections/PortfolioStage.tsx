import { AiVideoSection, ReferenceVideoSection } from "@/components/video/VideoSections";
import { CreativeGallery } from "./CreativeGallery";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import styles from "./PortfolioStage.module.css";

export { CrossedBands } from "./CrossedBands";
export function PortfolioStage({kind="both"}:{kind?:"both"|"graphic"|"video"}){return <>
{kind!=="video"&&<section id="graphic-portfolio" className={styles.section}><Container><div className={styles.heading} data-rise><div><p>Selected creative</p><h2>Brand worlds,<br/><em>built to connect.</em></h2></div><div><p>Original studio concepts.<br/>Brand worlds, built from a fresh perspective.</p><Link href="/creative-showcase">Creative showcase <ArrowUpRight size={18}/></Link></div></div><CreativeGallery compact/></Container></section>}
{kind!=="graphic"&&<><AiVideoSection/><ReferenceVideoSection/></>}
</>}
