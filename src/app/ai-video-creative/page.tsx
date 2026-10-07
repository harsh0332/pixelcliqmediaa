import { QuoteBand } from "@/components/sections/QuoteBand";
import { GalleryNudge } from "@/components/work/GalleryNudge";
import type {Metadata} from "next";
import {buildMetadata, absoluteUrl, SITE_URL} from "@/lib/seo";
import {jsonLdScriptProps, videoSchema} from "@/lib/schema";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/sections/PageHero";
import {VideoCollection} from "@/components/video/VideoCollection";
import {aiVideos,featuredAiVideos} from "@/content/videoCreatives";
export const metadata:Metadata=buildMetadata({title:"AI Video Creative",description:"AI video campaigns, product films, fashion stories and motion design by Pixelcliq Media. Short-form video made to stop the scroll and sell the product.",path:"/ai-video-creative",eyebrow:"AI Video Creative"});
const ordered=[...featuredAiVideos,...aiVideos.filter(v=>!featuredAiVideos.some(f=>f.id===v.id))];
// The films were added to the site on this date; individual render dates were not recorded.
const UPLOAD_DATE = "2026-09-30";
const videoLd = aiVideos.map((v) => videoSchema({
  siteUrl: SITE_URL,
  name: v.title,
  description: `${v.title}: an AI-made ${v.category.toLowerCase()} film from Pixelcliq Media.`,
  thumbnailUrl: absoluteUrl(v.poster.replace(/\.jpg$/, "-sm.webp")),
  uploadDate: UPLOAD_DATE,
  contentUrl: absoluteUrl(v.src),
  durationSeconds: v.duration,
}));
export default function AiVideoPage(){return <>{videoLd.map((ld, i) => <script key={i} {...jsonLdScriptProps(ld)} />)}<PageHero id="ai-video-heading" eyebrow="PIXELCLIQ / AI VIDEO CREATIVE" headlineLines={["Big ideas.","Moving pictures."]} support="From cinematic product reveals to fashion films and presenter-led stories. Explore our AI video creative collection."/><QuoteBand tone="ice" not="Videos people skip." is="Films people watch twice."/><section className="py-14 md:py-20"><Container><GalleryNudge label="Want films like these for your brand?"><VideoCollection items={ordered} filters/></GalleryNudge></Container></section></>}
