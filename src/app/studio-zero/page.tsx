import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { StudioZero } from "@/components/studio/StudioZero";

export const metadata: Metadata = buildMetadata({
  title: "Studio Zero: AI product & fashion visuals",
  description:
    "Campaign images, lifestyle scenes, model shots and A+ content made with art direction and AI production. No cameras, no studio bookings, no reshoot bills.",
  path: "/studio-zero",
  eyebrow: "Studio Zero",
});

export default function StudioZeroPage() {
  return <StudioZero />;
}
