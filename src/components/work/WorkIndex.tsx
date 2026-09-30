"use client";

import { useCallback, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CaseTile } from "@/components/work/CaseTile";
import { CreativeFrame } from "@/components/work/CreativeFrame";
import dynamic from "next/dynamic";
import { caseStudies } from "@/content/cases";
import {
  creativeTypeLabels,
  creativeTypes,
  creatives,
  type CreativeType, toViewable,
} from "@/content/creatives";
import { workPage } from "@/content/home";
import { primaryPillars } from "@/content/services";
import type { PillarId } from "@/types";

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
 * /work — two modes on one route.
 *
 * The active mode is reflected in the URL as ?view=creative so a link can be
 * shared, but switching is a state change rather than a navigation: the hero
 * stays put and only the grid crossfades. `router.replace` with scroll:false
 * keeps the history clean and the scroll position where the reader left it.
 *
 * Creative mode is a mixed-ratio masonry rather than the homepage's horizontal
 * track. Same assets, deliberately different presentation — repeating the track
 * here would make the site feel like it only knows one move.
 */
type View = "cases" | "creative";

export function WorkIndex() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const reduce = useReducedMotionSafe();

  const view: View = params.get("view") === "creative" ? "creative" : "cases";
  const [pillarFilter, setPillarFilter] = useState<PillarId | null>(null);
  const [typeFilter, setTypeFilter] = useState<CreativeType | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const setView = useCallback(
    (next: View) => {
      const search = new URLSearchParams(params.toString());
      if (next === "creative") search.set("view", "creative");
      else search.delete("view");
      const query = search.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [params, pathname, router],
  );

  const cases = pillarFilter
    ? caseStudies.filter((entry) => entry.services.includes(pillarFilter))
    : caseStudies;

  const gallery = typeFilter
    ? creatives.filter((item) => item.type === typeFilter)
    : creatives;

  const openIndex = openId ? gallery.findIndex((i) => i.id === openId) : -1;

  return (
    <>
      {/* The hero — eyebrow, h1, support — lives in the server page above
          this component. useSearchParams bails the whole subtree out to the
          client during static generation, and an h1 that only exists after
          hydration is an h1 crawlers never see. Only the view toggle needs
          client state, so only the toggle is here. */}
      <Section tone="bone" spacing="none" className="pb-10">
        <Container>
          <div
            role="group"
            aria-label="Choose a view"
            className="flex gap-2"
          >
            <Chip pressed={view === "cases"} onClick={() => setView("cases")}>
              {workPage.views.cases}
            </Chip>
            <Chip
              pressed={view === "creative"}
              onClick={() => setView("creative")}
            >
              {workPage.views.creative}
            </Chip>
          </div>
        </Container>
      </Section>

      <Section tone="bone" spacing="tight">
        <Container>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            >
              {view === "cases" ? (
                <CasesMode
                  cases={cases}
                  active={pillarFilter}
                  onFilter={setPillarFilter}
                />
              ) : (
                <CreativeMode
                  items={gallery}
                  active={typeFilter}
                  onFilter={setTypeFilter}
                  onOpen={setOpenId}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>

      <Lightbox
        items={gallery.map(toViewable)}
        index={openIndex >= 0 ? openIndex : null}
        onClose={() => setOpenId(null)}
        onNavigate={(next) => setOpenId(gallery[next]?.id ?? null)}
      />
    </>
  );
}

function CasesMode({
  cases,
  active,
  onFilter,
}: {
  cases: typeof caseStudies;
  active: PillarId | null;
  onFilter: (id: PillarId | null) => void;
}) {
  // The industry filter is deliberately absent while every industry is an
  // unresolved token: six chips all reading "[INDUSTRY]" would be interface for
  // its own sake. It gets added when the data is real, alongside the pillar
  // filter below.
  return (
    <div>
      {/* An editorial note, in a hairline box — not a warning banner. */}
      <p className="type-body-sm max-w-measure rounded-md border border-line p-5 text-ink-soft">
        {workPage.note}
      </p>

      <div
        role="group"
        aria-label="Filter case studies by service"
        className="mt-8 flex flex-wrap gap-2"
      >
        <Chip pressed={active === null} onClick={() => onFilter(null)}>
          {workPage.allFilter}
        </Chip>
        {primaryPillars.map((pillar) => (
          <Chip
            key={pillar.id}
            pressed={active === pillar.id}
            onClick={() => onFilter(active === pillar.id ? null : pillar.id)}
          >
            {pillar.title}
          </Chip>
        ))}
      </div>

      {cases.length === 0 ? (
        <p className="type-body mt-10 text-ink-muted">{workPage.emptyFilter}</p>
      ) : (
        // Asymmetric: every third tile runs taller, so the grid reads as a
        // composition rather than as equal boxes.
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((entry, index) => (
            <li key={entry.slug} className={index % 3 === 1 ? "lg:mt-14" : ""}>
              <CaseTile entry={entry} ratio={index % 3 === 1 ? "9:16" : "4:5"} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CreativeMode({
  items,
  active,
  onFilter,
  onOpen,
}: {
  items: typeof creatives;
  active: CreativeType | null;
  onFilter: (id: CreativeType | null) => void;
  onOpen: (id: string) => void;
}) {
  return (
    <div>
      <div
        role="group"
        aria-label="Filter creative by format"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <Chip
          pressed={active === null}
          onClick={() => onFilter(null)}
          className="shrink-0"
        >
          {workPage.allFilter}
        </Chip>
        {creativeTypes.map((type) => (
          <Chip
            key={type}
            pressed={active === type}
            onClick={() => onFilter(active === type ? null : type)}
            className="shrink-0"
          >
            {creativeTypeLabels[type]}
          </Chip>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="type-body mt-10 text-ink-muted">{workPage.emptyFilter}</p>
      ) : (
        // CSS columns give true masonry across mixed ratios with no JS and no
        // measurement pass — the frames keep their own heights.
        <div className="mt-10 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {/* No priority images in this grid: it sits below the hero and
              renders inside a Suspense boundary, so a preload would fire before
              the client has anywhere to paint it — the browser reports it as
              unused and it competes with the real LCP. */}
          {items.map((item) => (
            <CreativeFrame
              key={item.id}
              item={item}
              onOpen={() => onOpen(item.id)}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            />
          ))}
        </div>
      )}
    </div>
  );
}
