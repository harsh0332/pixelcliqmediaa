import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { insights } from "@/content/insights";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { NewsletterForm } from "@/components/insights/NewsletterForm";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Notes on D2C growth, creative testing, commerce and retention — written from the work itself, not assembled from other people’s conference talks.",
  path: "/insights",
  eyebrow: "Insights",
});


export default function InsightsPage() {
  return (
    <>
      <InsightsIndex insights={insights.map(({ body: _body, faq: _faq, ...card }) => card)} />

      <Section tone="sand" aria-labelledby="newsletter-heading">
        <Container variant="narrow">
          <Eyebrow as="h2" id="newsletter-heading">
            Notes by email
          </Eyebrow>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
