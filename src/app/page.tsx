import { QuoteBand } from "@/components/sections/QuoteBand";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, jsonLdScriptProps } from "@/lib/schema";
import { refinedHome } from "@/content/refinedHome";
import { PortfolioStage } from "@/components/sections/PortfolioStage";
import { ScrollTint } from "@/components/home/ScrollTint";
import { PremiumHero } from "@/components/home/PremiumHero";
import { ServiceExplorer } from "@/components/home/ServiceExplorer";
import { HomeFaq, StartSteps, Standard } from "@/components/home/HomeSections";

export const metadata: Metadata = buildMetadata({
  title: "Performance Marketing & Creative Agency for D2C Brands in India",
  description: "Pixelcliq runs Meta ads, creative, Shopify and WhatsApp automation as one team, helping D2C brands in India turn attention into repeat orders.",
  path: "/",
  absoluteTitle: true,
});

// Built from the same array the visible accordion renders.
const homeFaqSchema = faqSchema(refinedHome.faqs.map((f) => ({ question: f.question, answer: f.answer })));

export default function HomePage() {
  return (
    <>
      {homeFaqSchema ? <script {...jsonLdScriptProps(homeFaqSchema)} /> : null}
      <ScrollTint />
      <PremiumHero />
      <ServiceExplorer />
      <QuoteBand not="A vendor for every channel." is="One team for the whole journey." />
      {/* The work bands paint their own backgrounds; the light tint keeps the
          page colour behind them from flashing dark at their edges. */}
      <div id="work" data-tint="#f3f8fd">
        <PortfolioStage kind="both" />
      </div>
      <StartSteps />
      <Standard />
      <HomeFaq />

    </>
  );
}
