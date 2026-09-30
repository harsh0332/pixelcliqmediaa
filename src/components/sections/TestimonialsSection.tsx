"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/content/testimonials";
import { testimonialsSection } from "@/content/home";

/**
 * SECTION D — testimonials, with both paths built.
 *
 * Every entry in testimonials.ts carries verified:false, so the empty state is
 * what ships. It is written to be confident rather than apologetic: saying the
 * first ones are being written, and that we only publish quotes from active
 * clients with their names attached, is itself a claim about how we work.
 *
 * The real path activates the moment any entry flips to verified:true, with no
 * change here. Attribution is mandatory in that path — name, role AND company.
 * A competitor ships two video testimonials with no caption block at all, which
 * makes a real endorsement indistinguishable from stock footage.
 */
export function TestimonialsSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const verified = testimonials.filter((entry) => entry.verified);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  // No band at all until a testimonial is verified. The empty state this used
  // to render — "The first ones are being written" — was honest, but a section
  // whose entire content is an absence tells the reader to doubt, right before
  // the closing call to action. The section returns with the first real quote.
  if (verified.length === 0) return null;

  return (
    <Section tone="bone" aria-labelledby="testimonials-heading" id="testimonials">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow as="p">{testimonialsSection.eyebrow}</Eyebrow>
            <h2 id="testimonials-heading" className="type-h1 mt-5">
              {testimonialsSection.eyebrow}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scrollBy(-1)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-pill border border-line-strong text-ink hover:border-ink focus-visible:border-ink"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scrollBy(1)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-pill border border-line-strong text-ink hover:border-ink focus-visible:border-ink"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {verified.map((entry) => (
            <li
              key={entry.id}
              className="w-[85%] shrink-0 snap-start md:w-[46%]"
            >
              <blockquote>
                <p className="type-emphasis text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.25] text-ink">
                  {entry.quote}
                </p>
                {/* Name, role and company. All three, always. */}
                <footer className="type-caption mt-6">
                  {entry.name} · {entry.role} · {entry.brand}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
