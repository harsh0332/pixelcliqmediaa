import type {Metadata} from "next";
import {buildMetadata} from "@/lib/seo";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/sections/PageHero";
import {VideoCollection} from "@/components/video/VideoCollection";
import {aiVideos,featuredAiVideos} from "@/content/videoCreatives";
import {Button} from "@/components/ui/Button";
export const metadata:Metadata=buildMetadata({title:"AI Video Creative",description:"AI video campaigns, product films, fashion stories and motion design by Pixelcliq Media. Short-form video made to stop the scroll and sell the product.",path:"/ai-video-creative",eyebrow:"AI Video Creative"});
const ordered=[...featuredAiVideos,...aiVideos.filter(v=>!featuredAiVideos.some(f=>f.id===v.id))];
export default function AiVideoPage(){return <><PageHero id="ai-video-heading" eyebrow="PIXELCLIQ / AI VIDEO CREATIVE" headlineLines={["BIG IDEAS.","MOVING PICTURES."]} support="From cinematic product reveals to fashion films and presenter-led stories. Explore our AI video creative collection."/><section className="py-14 md:py-20"><Container><VideoCollection items={ordered} filters/></Container></section><section className="bg-sand py-14"><Container><div className="flex flex-wrap items-center justify-between gap-8"><h2 className="text-3xl md:text-5xl max-w-xl">Your next story deserves a bigger idea.</h2><Button href="/contact">Let’s make it move</Button></div></Container></section></>}
