import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CreativeGallery } from "@/components/sections/CreativeGallery";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = buildMetadata({
  title: "Brand & Campaign Design",
  description: "Explore original Pixelcliq studio concepts in brand identity, art direction and campaign design for D2C brands.",
  path: "/creative-showcase",
  eyebrow: "Creative Showcase",
});

export default function CreativeShowcasePage() {
  return <>
    <PageHero id="creative-showcase-heading" eyebrow="THE DESIGN COLLECTION"
      headlineLines={["A world around", "every brand."]}
      support="Art direction. Brand identity. Campaign design. Original studio explorations, made to turn a passing glance into a lasting impression." />
    <section className="bg-white py-14 md:py-20" aria-label="Brand and campaign design gallery">
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-line pb-6">
          <p className="font-[family-name:var(--font-sans-bold-stack)] text-2xl tracking-[-0.03em] text-[#082f57] md:text-3xl">Explore the visual side of Pixelcliq.</p>
          <Link href="/work" className="type-button">All portfolio collections ↗</Link>
        </div>
        <CreativeGallery />
      </Container>
    </section>
  </>;
}
