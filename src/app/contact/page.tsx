import type { Metadata } from "next";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { jsonLdScriptProps, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { Accordion } from "@/components/ui/Accordion";
import { BalancedHeading } from "@/components/ui/BalancedHeading";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { ContactForm } from "@/components/forms/ContactForm";
import { contactPage } from "@/content/home";
import { siteFaqs } from "@/content/faq";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholders";

export const metadata: Metadata = buildMetadata({
  title: "Book a Growth Call",
  description:
    "Tell us about the brand and what needs to move. We read every enquiry ourselves and reply with a point of view, not an automated sequence.",
  path: "/contact",
  eyebrow: "Contact",
});


/**
 * /contact
 *
 * A two-column split with no hero image. The left column stays put while the
 * form scrolls, so the contact details and the "what happens next" block are
 * visible for the whole time someone is deciding whether to fill it in.
 *
 * The expectations block is there because it converts: naming the reply window,
 * the call length and what arrives afterwards removes the uncertainty that stops
 * people writing in the first place.
 */
export default function ContactPage() {
  const contactFaq = faqSchema(
    siteFaqs.map((entry) => ({
      question: entry.q,
      answer: entry.a,
    })),
  );

  return (
    <>
      {/* Built from siteFaqs — the same array the Accordion below renders — so
          the schema and the visible page can never diverge. */}
      {contactFaq ? <script {...jsonLdScriptProps(contactFaq)} /> : null}
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Contact", url: absoluteUrl("/contact") },
          ]),
        )}
      />
      <Section
        tone="bone"
        className="contact-refresh pt-[calc(var(--header-height)+4rem)]"
        data-dark-hero
        aria-labelledby="contact-heading"
      >
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
                <Eyebrow as="p">{contactPage.eyebrow}</Eyebrow>
                <BalancedHeading
                  level={1}
                  size="h1"

                  id="contact-heading"
                  className="mt-6 max-w-[14ch]"
                >
                  Let’s make your next move <em>count.</em>
                </BalancedHeading>
                <p className="type-body-lg mt-6 max-w-measure text-ink-soft">
                  {contactPage.support}
                </p>

                <dl className="mt-10 border-t border-line">
                  <div className="border-b border-line py-4">
                    <dt className="type-caption">Details</dt>
                    <dd className="mt-2">
                      <ContactDetails />
                    </dd>
                  </div>
                  {site.socials.some((social) => !isPlaceholder(social.href)) && (
                    <div className="border-b border-line py-4">
                      <dt className="type-caption">Social</dt>
                      <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                        {site.socials.filter((social) => !isPlaceholder(social.href)).map((social) => (
                          <a key={social.platform} href={social.href} className="type-body-sm text-ink-soft underline-offset-4 hover:underline focus-visible:underline">{social.label}</a>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-10">
                  <Eyebrow as="h2">{contactPage.expectationsTitle}</Eyebrow>
                  <ol className="mt-4 border-t border-line">
                    {contactPage.expectations.map((item) => (
                      <li
                        key={item.step}
                        className="flex gap-4 border-b border-line py-3"
                      >
                        <span className="type-label shrink-0 text-link tabular-nums">
                          {item.step}
                        </span>
                        <span className="type-body-sm text-ink-soft">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="contact-form-panel lg:col-span-6 lg:col-start-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="contact-faq-heading">
        <Container variant="narrow">
          <Eyebrow as="p">{contactPage.faqEyebrow}</Eyebrow>
          <h2 id="contact-faq-heading" className="type-h1 mt-5 max-w-[16ch]">
            {contactPage.faqHeadline}
          </h2>
          <Accordion
            className="mt-12"
            items={siteFaqs.map((faq) => ({
              id: faq.id,
              question: faq.q,
              answer: faq.a,
            }))}
          />
        </Container>
      </Section>
    </>
  );
}
