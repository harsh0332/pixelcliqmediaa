import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { RefinedHome } from "@/components/sections/RefinedHome";

export const metadata: Metadata = { alternates: { canonical: absoluteUrl("/") } };

export default function HomePage() {
  return <><Hero /><RefinedHome /></>;
}
