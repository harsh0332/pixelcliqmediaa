import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { LegalDocument } from "@/content/legal";

/**
 * The shared legal template.
 *
 * Same long-form typography as the articles — a policy nobody can read is a
 * policy nobody has agreed to. The contents list is sticky on desktop so a
 * reader can jump to the section they came for.
 */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  const updated = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(doc.updated));

  return (
    <Section
      tone="bone"
      className="pt-[calc(var(--header-height)+4rem)]"
      aria-labelledby="legal-heading"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <nav
              aria-label="On this page"
              className="lg:sticky lg:top-[calc(var(--header-height)+3rem)]"
            >
              <Eyebrow as="h2">On this page</Eyebrow>
              <ul className="mt-4 border-t border-line">
                {doc.sections.map((section) => (
                  <li key={section.id} className="border-b border-line">
                    <a
                      href={`#${section.id}`}
                      className="type-body-sm flex min-h-11 items-center text-ink-soft transition-colors duration-150 hover:text-ink focus-visible:text-ink"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-12 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <div className="max-w-prose">
              <Eyebrow as="p">Legal</Eyebrow>
              <h1 id="legal-heading" className="type-h1 mt-5">
                {doc.title}
              </h1>
              <p className="type-caption mt-4">
                Last updated{" "}
                <time dateTime={doc.updated}>{updated}</time>
              </p>
              <p className="type-body-lg mt-8 leading-[1.7] text-ink-soft">
                {doc.intro}
              </p>

              {doc.sections.map((section) => (
                <section key={section.id} id={section.id} className="mt-14">
                  <h2 className="type-h2">{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="type-body-lg mt-5 leading-[1.7] text-ink-soft"
                    >
                      <PendingMarked text={paragraph} />
                    </p>
                  ))}
                </section>
              ))}

              <p className="type-caption mt-16 rounded-md border border-line p-5">
                This is a draft written in plain language, not legal advice.
                Anything marked &ldquo;to be confirmed&rdquo; needs a qualified
                review before launch.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** The bracketed marker used in legal.ts for clauses awaiting counsel. */
const PENDING = "[TO_CONFIRM_WITH_LEGAL]";

/**
 * Renders the pending marker as a deliberate editorial note.
 *
 * These clauses genuinely are unconfirmed, so the marker stays — publishing an
 * invented registered address or retention period would be far worse. But a
 * raw "[TO_CONFIRM_WITH_LEGAL]" mid-sentence reads as a template bug rather
 * than as an intentional gap, which undermines the whole document. Styling it
 * as an inline note keeps the honesty and removes the impression of breakage.
 */
function PendingMarked({ text }: { text: string }) {
  if (!text.includes(PENDING)) return <>{text}</>;

  const parts = text.split(PENDING);
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 ? (
            <span className="type-label rounded-sm bg-sand px-1.5 py-0.5 align-baseline text-ink-muted">
              to be confirmed
            </span>
          ) : null}
        </span>
      ))}
    </>
  );
}
