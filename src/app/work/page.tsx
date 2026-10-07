import { QuoteBand } from "@/components/sections/QuoteBand";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { WorkDoors } from "@/components/work/WorkDoors";
import { WorkHeroDeck } from "@/components/work/WorkHeroDeck";
import { CrossedBands, PortfolioStage } from "@/components/sections/PortfolioStage";
export const metadata: Metadata = buildMetadata({title:"Our Work — D2C Campaigns & Brand Worlds",description:"D2C campaign work and brand worlds from the Pixelcliq studio, across fashion, food, beauty and tech, from static ads to AI films.",path:"/work",eyebrow:"Portfolio"});
export default function WorkPage(){return <><PageHero id="work-heading" kicker="D2C campaign work, ad creative and brand films" eyebrow="THE PIXELCLIQ CREATIVE SHOWCASE" headlineLines={["Made to be seen.","Built to be felt."]} support="Brand worlds and moving stories. Explore our studio concepts and AI video creative in one place." accent="side"><WorkHeroDeck/></PageHero><WorkDoors/><QuoteBand not="Work to look at." is="Work people act on."/><PortfolioStage kind="graphic"/><CrossedBands/><PortfolioStage kind="video"/></>}
