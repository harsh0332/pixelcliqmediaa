import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalBySlug } from "@/content/legal";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply to using this website, described plainly — what you can rely on, what you cannot, and where our responsibility begins and ends.",
  path: "/terms",
  eyebrow: "Legal",
});


export default function Page() {
  const doc = legalBySlug.get("terms");
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}
