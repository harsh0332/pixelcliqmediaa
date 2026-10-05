import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { WorkDoors } from "@/components/work/WorkDoors";
import { WorkHeroDeck } from "@/components/work/WorkHeroDeck";
import { CrossedBands, PortfolioStage } from "@/components/sections/PortfolioStage";
export const metadata: Metadata = buildMetadata({title:"Creative Showcase",description:"Campaign concepts and brand worlds from the Pixelcliq studio, across fashion, food, beauty, interiors and tech. See how we make a product hard to scroll past.",path:"/work",eyebrow:"Portfolio"});
export default function WorkPage(){return <><PageHero id="work-heading" eyebrow="THE PIXELCLIQ CREATIVE SHOWCASE" headlineLines={["Made to be seen.","Built to be felt."]} support="Brand worlds and moving stories. Explore our studio concepts and AI video creative in one place." accent="side"><WorkHeroDeck/></PageHero><WorkDoors/><PortfolioStage kind="graphic"/><CrossedBands/><PortfolioStage kind="video"/></>}
