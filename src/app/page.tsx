import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { PortfolioStage } from "@/components/sections/PortfolioStage";
import { ScrollTint } from "@/components/home/ScrollTint";
import { PremiumHero } from "@/components/home/PremiumHero";
import { ServiceExplorer } from "@/components/home/ServiceExplorer";
import { HomeFaq, StartSteps, Standard } from "@/components/home/HomeSections";

export const metadata: Metadata = { alternates: { canonical: absoluteUrl("/") } };

export default function HomePage() {
  return (
    <>
      <ScrollTint />
      <PremiumHero />
      <ServiceExplorer />
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
