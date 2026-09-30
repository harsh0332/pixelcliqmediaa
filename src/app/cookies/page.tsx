import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalBySlug } from "@/content/legal";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "This site sets no tracking or analytics cookies today. This policy records that plainly, and states what would change if that ever stops being true.",
  path: "/cookies",
  eyebrow: "Legal",
});


export default function Page() {
  const doc = legalBySlug.get("cookies");
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}
