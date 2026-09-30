import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CrossedBands, PortfolioStage } from "@/components/sections/PortfolioStage";
export const metadata: Metadata = buildMetadata({title:"Creative Showcase",description:"Original Pixelcliq studio concepts across fashion, food, beauty, interiors and technology.",path:"/work",eyebrow:"Portfolio"});
export default function WorkPage(){return <><PageHero id="work-heading" eyebrow="THE PIXELCLIQ CREATIVE SHOWCASE" headlineLines={["MADE TO BE SEEN.","BUILT TO BE FELT."]} support="Brand worlds and moving stories. Explore our studio concepts and AI video creative in one place."/><nav aria-label="Portfolio collections" className="flex flex-wrap justify-center gap-4 border-b border-line bg-paper px-6 py-6"><Link href="/creative-showcase" className="type-button">Explore brand & campaign design ↗</Link><Link href="#ai-video-creative" className="type-button">AI video creative ↗</Link><Link href="/ai-video-creative" className="type-button">Explore the film collection ↗</Link></nav><PortfolioStage kind="graphic"/><CrossedBands/><PortfolioStage kind="video"/></>}
