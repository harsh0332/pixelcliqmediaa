"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CreativeFrame } from "@/components/work/CreativeFrame";
import dynamic from "next/dynamic";
import { toViewable, type CreativeItem } from "@/content/creatives";

/*
 * The lightbox is loaded on demand.
 *
 * Its markup only exists once a reader opens it, so shipping the dialog, its
 * focus trap and its animation code in the first-load bundle pays for a
 * component most visits never instantiate. `ssr: false` costs nothing here for
 * the same reason — there is no server-rendered markup to preserve.
 */
const Lightbox = dynamic(
  () => import("@/components/work/Lightbox").then((m) => m.Lightbox),
  { ssr: false },
);

/**
 * RELATED CREATIVE — a native horizontal strip of the formats this pillar
 * actually produces, reusing the Phase 09 frame and lightbox so the ratio,
 * caption and interaction rules hold here too.
 *
 * Renders nothing when a pillar has no matching formats. Padding the strip with
 * unrelated work would be filler dressed as a portfolio.
 */
export function PillarRelatedCreative({ items }: { items: CreativeItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  if (items.length === 0) return null;

  const openIndex = openId ? items.findIndex((i) => i.id === openId) : -1;

  return (
    <Section tone="sand" spacing="tight" aria-labelledby="related-creative-heading">
      <Container>
        <Eyebrow as="h2" id="related-creative-heading">
          Related creative
        </Eyebrow>
      </Container>

      <div className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 md:px-8 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <div key={item.id} className="w-[14rem] shrink-0 snap-start md:w-[16rem]">
            <CreativeFrame
              item={item}
              onOpen={() => setOpenId(item.id)}
              sizes="(min-width: 768px) 16rem, 14rem"
            />
          </div>
        ))}
      </div>

      <Lightbox
        items={items.map(toViewable)}
        index={openIndex >= 0 ? openIndex : null}
        onClose={() => setOpenId(null)}
        onNavigate={(next) => setOpenId(items[next]?.id ?? null)}
      />
    </Section>
  );
}
