import { BalancedHeading } from "@/components/ui/BalancedHeading";
import { Button } from "@/components/ui/Button";
import { Drift } from "@/components/motion/Drift";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { closingCta } from "@/content/home";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholders";

/**
 * SECTION G — the closing statement.
 *
 * Deliberately compact. The large inverse CTA band is the footer's job and sits
 * directly below this; repeating it at full scale here would ask the same
 * question twice in one screen.
 *
 * Phone and email render as muted text rather than tel: and mailto: links while
 * they are unresolved — a dead link is worse than a visibly pending one.
 */
export function ClosingCta() {
  const phonePending = isPlaceholder(site.phone);
  const emailPending = isPlaceholder(site.email);

  return (
    <Section
      data-closing-cta tone="bone" spacing="default" aria-labelledby="closing-heading">
      <Container variant="narrow" className="flex min-h-[46vh] flex-col items-center justify-center text-center">
        <Drift direction="right">
        <BalancedHeading
          level={2}
          size="display-xl"
          emphasis={closingCta.emphasis}
          id="closing-heading"
          className="max-w-[12ch]"
        >
          {closingCta.headline}
        </BalancedHeading>
        </Drift>

        <div className="mt-10">
          <Button href={site.primaryCta.href} size="lg">
            {site.primaryCta.label}
          </Button>
        </div>

        {/* Only rendered once a channel is real. Printing "[PHONE]" beneath the
            primary call to action undermines the exact moment the page is
            asking for trust. */}
        {!phonePending || !emailPending ? (
          <p className="type-caption mt-8">
            {!phonePending ? (
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="underline-offset-4 hover:underline focus-visible:underline">
                {site.phone}
              </a>
            ) : null}
            {!phonePending && !emailPending ? (
              <span aria-hidden="true" className="mx-3 opacity-40">
                ·
              </span>
            ) : null}
            {!emailPending ? (
              <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline focus-visible:underline">
                {site.email}
              </a>
            ) : null}
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
