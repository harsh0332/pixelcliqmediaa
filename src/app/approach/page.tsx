import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ApproachJourney } from "@/components/approach/ApproachJourney";
import { ApproachCommitments, ApproachFit, ApproachWeek } from "@/components/approach/ApproachSections";
import { ApproachPrinciples } from "@/components/approach/ApproachPrinciples";

export const metadata: Metadata = buildMetadata({ title: "Our approach", description: "How Pixelcliq works: one free call, an audit, a written plan, then weekly sprints that connect strategy, creative, media and your store.", path: "/approach", eyebrow: "Our approach" });

export default function ApproachPage() {
  return (
    <>
      <PageHero
        id="approach-heading"
        eyebrow="THE PIXELCLIQ APPROACH"
        headlineLines={["One direction.", "Every move connected."]}
        support="Six steps from the first call to compounding growth. Here is exactly how it works."
        ctas={<Button href="/contact" size="lg">Book a free growth call</Button>}
      />
      <ApproachJourney />
      <ApproachWeek />
      <ApproachPrinciples />
      <ApproachCommitments />
      <ApproachFit />
    </>
  );
}
