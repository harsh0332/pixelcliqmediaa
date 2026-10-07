import { QuoteBand } from "@/components/sections/QuoteBand";
import { GalleryNudge } from "@/components/work/GalleryNudge";
import type {Metadata} from "next";
import {buildMetadata} from "@/lib/seo";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/sections/PageHero";
import {VideoCollection} from "@/components/video/VideoCollection";
import {aiVideos,featuredAiVideos} from "@/content/videoCreatives";
export const metadata:Metadata=buildMetadata({title:"AI Video Creative",description:"AI video campaigns, product films, fashion stories and motion design by Pixelcliq Media. Short-form video made to stop the scroll and sell the product.",path:"/ai-video-creative",eyebrow:"AI Video Creative"});
const ordered=[...featuredAiVideos,...aiVideos.filter(v=>!featuredAiVideos.some(f=>f.id===v.id))];
export default function AiVideoPage(){return <><PageHero id="ai-video-heading" eyebrow="PIXELCLIQ / AI VIDEO CREATIVE" headlineLines={["Big ideas.","Moving pictures."]} support="From cinematic product reveals to fashion films and presenter-led stories. Explore our AI video creative collection."/><QuoteBand tone="ice" not="Videos people skip." is="Films people watch twice."/><section className="py-14 md:py-20"><Container><GalleryNudge label="Want films like these for your brand?"><VideoCollection items={ordered} filters/></GalleryNudge></Container></section></>}
