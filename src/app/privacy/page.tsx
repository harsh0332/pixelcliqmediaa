import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalBySlug } from "@/content/legal";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "What data this site collects, what it does not, and how any enquiry you send us is handled. Written in plain language rather than boilerplate.",
  path: "/privacy",
  eyebrow: "Legal",
});


export default function Page() {
  const doc = legalBySlug.get("privacy");
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}
