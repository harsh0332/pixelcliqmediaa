import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CreativeGallery } from "@/components/sections/CreativeGallery";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Brand & Campaign Design",
  description: "Explore original Pixelcliq studio concepts in brand identity, art direction and campaign design for D2C brands.",
  path: "/creative-showcase",
  eyebrow: "Creative Showcase",
});

export default function CreativeShowcasePage() {
  return <>
    <PageHero id="creative-showcase-heading" eyebrow="THE DESIGN COLLECTION"
      headlineLines={["A WORLD AROUND", "EVERY BRAND."]}
      support="Art direction. Brand identity. Campaign design. Original studio explorations, made to turn a passing glance into a lasting impression." />
    <section className="bg-white py-14 md:py-20" aria-label="Brand and campaign design gallery">
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-line pb-6">
          <p className="text-lg font-bold">Explore the visual side of Pixelcliq.</p>
          <Link href="/work" className="type-button">All portfolio collections ↗</Link>
        </div>
        <CreativeGallery />
      </Container>
    </section>
    <section className="bg-[#102343] py-14 text-white md:py-20">
      <Container><div className="flex flex-wrap items-center justify-between gap-8">
        <h2 className="max-w-2xl text-3xl md:text-5xl">Let’s give your brand a world of its own.</h2>
        <Button href="/contact">Build your next campaign</Button>
      </div></Container>
    </section>
  </>;
}
