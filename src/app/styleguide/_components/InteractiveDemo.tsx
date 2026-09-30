"use client";

import { useState } from "react";
import Image from "next/image";
import { Accordion } from "@/components/ui/Accordion";
import { Chip } from "@/components/ui/Chip";
import { Marquee } from "@/components/ui/Marquee";
import { MediaCard } from "@/components/ui/MediaCard";
import { Pill } from "@/components/ui/Pill";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { approvedClients } from "@/content/clients";
import { creativeTypeLabels, creatives } from "@/content/creatives";
import { siteFaqs } from "@/content/faq";
import type { CreativeType } from "@/content/creatives";

const FILTERS = Object.entries(creativeTypeLabels).slice(0, 6) as [
  CreativeType,
  string,
][];

export function ChipDemo() {
  const [active, setActive] = useState<CreativeType | null>("meta-ad");

  return (
    <div>
      <Eyebrow as="p" tone="ink">
        Chip — filters
      </Eyebrow>
      <p className="type-caption mt-2 max-w-measure">
        Toggles with aria-pressed. Tab between them, Space or Enter to toggle.
        Active state is an ink fill with bone text.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map(([id, label]) => (
          <Chip
            key={id}
            pressed={active === id}
            onClick={() => setActive((current) => (current === id ? null : id))}
          >
            {label}
          </Chip>
        ))}
        <Chip disabled>Disabled</Chip>
      </div>

      <Eyebrow as="p" tone="ink" className="mt-10 block">
        Pill — static
      </Eyebrow>
      <p className="type-caption mt-2 max-w-measure">
        Not interactive. Tags, categories, the current nav item.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Pill>Outline</Pill>
        <Pill tone="solid">Solid</Pill>
        <Pill tone="accent">Accent</Pill>
      </div>
    </div>
  );
}

export function MediaCardDemo() {
  const items = creatives.slice(0, 3);
  return (
    <div>
      <p className="type-caption mb-5 max-w-measure">
        Hover or tab to a card: the image scales to 1.04 inside a fixed frame and
        the caption slides up. The frame never moves, so neighbours cannot be
        nudged. The first two load eagerly; the rest are lazy.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <MediaCard
            key={item.id}
            src={item.src}
            alt={`${creativeTypeLabels[item.type]} placeholder`}
            ratio={item.ratio}
            priority={index < 2}
            cursorLabel="View"
            href="/styleguide#primitives"
            caption={
              <>
                <span className="type-label block">
                  {creativeTypeLabels[item.type]}
                </span>
                <span className="type-body-sm">{item.title}</span>
              </>
            }
          />
        ))}
      </div>
    </div>
  );
}

export function MarqueeDemo() {
  return (
    <div>
      <p className="type-caption mb-5 max-w-measure">
        Pauses on hover and on focus-within. Under reduced motion it stops and
        wraps onto multiple rows instead of scrolling.
      </p>
      <div className="border-y border-line py-6">
        <Marquee speed={30}>
          {["Creative", "Media", "Commerce", "Conversion", "Retention", "Data", "Automation"].map(
            (label) => (
              <span key={label} className="type-h3 px-8 text-ink-muted">
                {label}
              </span>
            ),
          )}
        </Marquee>
      </div>
      <div className="mt-10">
        <p className="type-caption mb-5 max-w-measure">
          The client rail, in its current state. There are no approved client
          logos yet, so it renders a plain line rather than a row of grey
          rectangles — tiling placeholders to imply volume is the exact pattern
          we audited a competitor for.
        </p>
        <div className="border-y border-line py-6">
          {approvedClients.length > 0 ? (
            <Marquee speed={45} direction="right">
              {approvedClients.map((client) => (
                <span key={client.id} className="mx-8 shrink-0">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </span>
              ))}
            </Marquee>
          ) : (
            <p className="type-body-sm text-ink-muted">
              Client work is under way. Named brands and results will appear here
              once they are live and cleared for publication.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function AccordionDemo() {
  return (
    <div>
      <p className="type-caption mb-5 max-w-measure">
        Real buttons with aria-expanded and aria-controls. Arrow Up and Arrow
        Down move between headers, Home and End jump to the ends.
      </p>
      <Accordion
        className="max-w-narrow"
        defaultOpenId={siteFaqs[0]?.id}
        items={siteFaqs.slice(0, 4).map((faq) => ({
          id: faq.id,
          question: faq.q,
          answer: faq.a,
        }))}
      />
    </div>
  );
}
