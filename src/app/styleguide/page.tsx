import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Prose } from "@/components/ui/Prose";
import { Rule } from "@/components/ui/Rule";
import { Section } from "@/components/ui/Section";
import { BalancedHeading } from "@/components/ui/BalancedHeading";
import { contrastRatio, formatRatio, THRESHOLD } from "@/lib/contrast";
import {
  COLOR_GROUPS,
  CONTAINERS,
  CONTRAST_CHECKS,
  MOTION,
  RADII,
  SECTION_RHYTHM,
  SPACING_SCALE,
  TYPE_SCALE,
} from "@/lib/design-tokens";
import { ButtonMatrix } from "./_components/ButtonMatrix";
import { EaseDemo } from "./_components/EaseDemo";
import {
  AccordionDemo,
  ChipDemo,
  MarqueeDemo,
  MediaCardDemo,
} from "./_components/InteractiveDemo";
import { MotionShowcase } from "./_components/MotionShowcase";
import { TokenDrift } from "./_components/TokenDrift";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Internal design system reference. Not linked in navigation.",
  robots: { index: false, follow: false },
};

const NAV = [
  ["colour", "Colour"],
  ["contrast", "Contrast"],
  ["type", "Type"],
  ["measure", "Measure"],
  ["spacing", "Spacing"],
  ["grid", "Grid"],
  ["radius", "Radius"],
  ["elevation", "Elevation"],
  ["buttons", "Buttons"],
  ["primitives", "Primitives"],
  ["controls", "Controls"],
  ["inverse", "Inverse"],
  ["motion", "Motion"],
  ["motion-lib", "Motion components"],
] as const;

function Block({
  id,
  title,
  blurb,
  children,
}: {
  id: string;
  title: string;
  blurb?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-10 pb-20">
      <div className="mb-10 max-w-measure">
        <Eyebrow as="p" tone="accent">
          {title}
        </Eyebrow>
        {blurb ? <p className="type-body-lg mt-3 text-ink-soft">{blurb}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="pt-[var(--header-height)] pb-24">
      {/* ---------------------------------------------------------------- */}
      <Section spacing="none" className="pt-20 pb-12">
        <Container>
          <Eyebrow as="p">Internal reference · not linked in navigation</Eyebrow>
          <BalancedHeading level={1} size="display" className="mt-6 max-w-[16ch]">
            The Pixelcliq design{" "}
            <span className="type-emphasis">system</span>
          </BalancedHeading>
          <p className="type-body-lg mt-8 max-w-measure text-ink-soft">
            Every value the site is allowed to use. If something is not on this
            page, it does not exist — no raw hex, no one-off font size, no
            unlisted easing. Contrast ratios below are computed from the tokens
            at build time, so they cannot drift from the stylesheet without this
            page saying so.
          </p>
          <div className="mt-8">
            <TokenDrift />
          </div>
          <nav aria-label="Styleguide sections" className="mt-10">
            <ul className="flex flex-wrap gap-x-2 gap-y-2">
              {NAV.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="type-button relative inline-flex h-10 items-center rounded-pill border border-line-strong px-4 text-ink-soft transition-colors duration-150 hover:border-ink hover:text-ink before:absolute before:left-0 before:top-1/2 before:h-11 before:w-full before:-translate-y-1/2 before:content-['']"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <Container>
        {/* -------------------------------------------------------------- */}
        <Block
          id="colour"
          title="Colour"
          blurb="A light, warm system with one accent. The accent should cover roughly 5% of any viewport — if a section looks colourful, it has been overused."
        >
          <div className="space-y-14">
            {COLOR_GROUPS.map((group) => (
              <div key={group.title}>
                <h2 className="type-h3">{group.title}</h2>
                <p className="type-body-sm mt-2 max-w-measure text-ink-soft">
                  {group.blurb}
                </p>
                <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                  {group.tokens.map((token) => (
                    <div key={token.cssVar} className="bg-bone p-5">
                      <div
                        className="h-20 w-full border border-line"
                        style={{ backgroundColor: `var(--${token.cssVar})` }}
                      />
                      <div className="mt-4 flex items-baseline justify-between gap-3">
                        <code className="type-body-sm font-medium">
                          --{token.cssVar}
                        </code>
                        <span className="type-caption tabular-nums">
                          {token.hex}
                        </span>
                      </div>
                      <p className="type-caption mt-2">{token.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* -------------------------------------------------------------- */}
        <Block
          id="contrast"
          title="Contrast"
          blurb="Measured, not assumed. Body text needs 4.5:1; large text and UI boundaries need 3:1. One row is expected to fail — it documents a pairing the system forbids."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse">
              <caption className="sr-only">
                WCAG 2.2 contrast ratios for every colour pairing in the system
              </caption>
              <thead>
                <tr className="border-b border-line-strong text-left">
                  <th scope="col" className="type-label pb-3">
                    Pairing
                  </th>
                  <th scope="col" className="type-label pb-3">
                    Sample
                  </th>
                  <th scope="col" className="type-label pb-3 text-right">
                    Ratio
                  </th>
                  <th scope="col" className="type-label pb-3 text-right">
                    Needs
                  </th>
                  <th scope="col" className="type-label pb-3 text-right">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {CONTRAST_CHECKS.map((check) => {
                  const ratio = contrastRatio(check.fg, check.bg);
                  const need = THRESHOLD[check.use];
                  const ok = ratio >= need;
                  return (
                    <tr key={check.label} className="border-b border-line align-top">
                      <td className="type-body-sm py-4 pr-6">
                        {check.label}
                        {check.note ? (
                          <span className="type-caption mt-1 block">{check.note}</span>
                        ) : null}
                      </td>
                      <td className="py-4 pr-6">
                        <span
                          className="type-body-sm inline-block px-3 py-1.5"
                          style={{ backgroundColor: check.bg, color: check.fg }}
                        >
                          Ag
                        </span>
                      </td>
                      <td className="type-body-sm py-4 text-right tabular-nums">
                        {formatRatio(check.fg, check.bg)}
                      </td>
                      <td className="type-body-sm py-4 text-right tabular-nums text-ink-muted">
                        {need.toFixed(1)}:1
                      </td>
                      <td className="type-body-sm py-4 text-right">
                        {ok ? (
                          <span className="text-accent-deep">Pass</span>
                        ) : check.expectFail ? (
                          <span className="text-ink-muted">Fails by design</span>
                        ) : (
                          <span className="font-bold">FAIL</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Block>

        {/* -------------------------------------------------------------- */}
        <Block
          id="type"
          title="Type scale"
          blurb="Clash Display for headlines, Satoshi for everything else, Instrument Serif for a single emphasised word. Use the type-* utility — it carries family, weight, size, leading and tracking together, so a headline can never land in the body face."
        >
          <div className="space-y-12">
            {TYPE_SCALE.map((t) => (
              <div key={t.utility}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-3">
                  <code className="type-body-sm font-medium">.{t.utility}</code>
                  <span className="type-caption">
                    {t.face} · {t.spec}
                  </span>
                </div>
                <p className={`${t.utility} mt-5 max-w-measure`}>{t.sample}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-line-strong pt-10">
            <h2 className="type-h3">The editorial signature</h2>
            <p className="type-body-sm mt-2 max-w-measure text-ink-soft">
              One Instrument Serif italic word inside a display headline. At most
              once per section. This is a deliberate signature, not decoration —
              use it a third time on a page and it stops meaning anything.
            </p>
            <BalancedHeading level={2} size="display" className="mt-8 max-w-[14ch]">
              Where D2C brands <span className="type-emphasis">compound</span>.
            </BalancedHeading>
          </div>
        </Block>

        {/* -------------------------------------------------------------- */}
        <Block
          id="measure"
          title="Measure"
          blurb="Body copy is capped at 62ch. A paragraph that runs the full width of a 1440px container is unreadable, however good the type is."
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow as="p" tone="ink">
                max-w-measure — correct
              </Eyebrow>
              <p className="type-body mt-4 max-w-measure text-ink-soft">
                Most brands do not have a media problem. They have a system
                problem. Creative is briefed by one team, media is bought by
                another, the store is built by a third, and retention is an
                afterthought nobody owns. Every handoff leaks a little growth,
                and the leak compounds in the wrong direction.
              </p>
            </div>
            <div>
              <Eyebrow as="p" tone="muted">
                Unconstrained — do not ship this
              </Eyebrow>
              <p className="type-body mt-4 text-ink-muted">
                Most brands do not have a media problem. They have a system
                problem. Creative is briefed by one team, media is bought by
                another, the store is built by a third, and retention is an
                afterthought nobody owns. Every handoff leaks a little growth,
                and the leak compounds in the wrong direction.
              </p>
            </div>
          </div>
        </Block>

        {/* -------------------------------------------------------------- */}
        <Block
          id="spacing"
          title="Spacing & rhythm"
          blurb="Fourteen permitted steps. Section padding comes from <Section>, never from a hand-written value."
        >
          <ul className="space-y-2">
            {SPACING_SCALE.map((s) => (
              <li key={s.step} className="flex items-center gap-5">
                <code className="type-body-sm w-16 shrink-0 text-ink-muted">
                  p-{s.step}
                </code>
                <span className="type-caption w-14 shrink-0 tabular-nums">
                  {s.px}px
                </span>
                <span
                  className="h-3 bg-accent"
                  style={{ width: `${s.px}px` }}
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <h2 className="type-h3">Section rhythm</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {SECTION_RHYTHM.map((r) => (
                <div
                  key={r.label}
                  className="flex flex-wrap items-baseline justify-between gap-3 py-4"
                >
                  <dt className="type-body-sm">{r.label}</dt>
                  <dd className="type-body-sm flex gap-6 tabular-nums text-ink-muted">
                    <code>{r.utility}</code>
                    <span className="w-16 text-right">{r.value}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Block>

        {/* -------------------------------------------------------------- */}
        <Block
          id="grid"
          title="Grid & containers"
          blurb="12 columns, a 1440px ceiling, and gutters of 20 / 32 / 48 / 64px as the viewport grows."
        >
          <dl className="divide-y divide-line border-y border-line">
            {CONTAINERS.map((c) => (
              <div
                key={c.variant}
                className="flex flex-wrap items-baseline justify-between gap-3 py-4"
              >
                <dt className="type-body-sm">
                  <code>variant=&quot;{c.variant}&quot;</code>
                </dt>
                <dd className="type-body-sm flex gap-6 text-ink-muted">
                  <span>{c.use}</span>
                  <span className="w-24 text-right tabular-nums">{c.width}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10" aria-hidden="true">
            <Eyebrow as="p">12 columns</Eyebrow>
            <div className="mt-3 grid grid-cols-12 gap-4">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="h-16 bg-accent-wash" />
              ))}
            </div>
          </div>
        </Block>

        {/* -------------------------------------------------------------- */}
        <Block
          id="radius"
          title="Radius"
          blurb="Used sparingly. Images and panels take --r-md; buttons and nav chips are pill. Never round a full-width section."
        >
          <div className="flex flex-wrap gap-6">
            {RADII.map((r) => (
              <div key={r.cssVar} className="w-40">
                <div
                  className="h-24 w-full border border-line-strong bg-sand"
                  style={{ borderRadius: `var(--${r.cssVar})` }}
                />
                <code className="type-body-sm mt-3 block">.{r.utility}</code>
                <span className="type-caption">{r.value}</span>
              </div>
            ))}
          </div>
        </Block>

        {/* -------------------------------------------------------------- */}
        <Block
          id="elevation"
          title="Elevation"
          blurb="This is a hairline site, not a shadow site. The default state of a panel is a 1px rule. --shadow-lift is for hover, and only on media cards."
        >
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-md border border-line bg-paper p-6">
              <Eyebrow as="p" tone="ink">
                Default
              </Eyebrow>
              <p className="type-body-sm mt-2 text-ink-soft">
                1px solid --line. Reach for this first.
              </p>
            </div>
            <div className="rounded-md bg-paper p-6 shadow-subtle">
              <Eyebrow as="p" tone="ink">
                --shadow-subtle
              </Eyebrow>
              <p className="type-body-sm mt-2 text-ink-soft">
                Barely there. Sparing use on floating UI.
              </p>
            </div>
            <div className="rounded-md bg-paper p-6 shadow-lift">
              <Eyebrow as="p" tone="ink">
                --shadow-lift
              </Eyebrow>
              <p className="type-body-sm mt-2 text-ink-soft">
                Hover only, media cards only.
              </p>
            </div>
          </div>
        </Block>

        {/* -------------------------------------------------------------- */}
        <Block
          id="buttons"
          title="Buttons"
          blurb="Four variants, three sizes, six states each. Hover and active are forced below so they can be checked without a pointer; tab through the rows to verify the real focus ring."
        >
          <ButtonMatrix />
        </Block>

        <Block
          id="primitives"
          title="Layout primitives"
          blurb="The pieces every section composes from. Nothing here is page-specific."
        >
          <div className="space-y-14">
            <div>
              <Eyebrow as="p" tone="ink">
                Eyebrow
              </Eyebrow>
              <p className="type-caption mt-2 max-w-measure">
                The sequence prefix is only for genuinely ordered content —
                process steps, loop stages, pillar order. Numbering an unordered
                set of cards is the clearest tell of a template.
              </p>
              <div className="mt-5 space-y-3">
                <Eyebrow as="p">Unordered — no number</Eyebrow>
                <Eyebrow as="p" sequence="01" tone="ink">
                  Ordered — sequence prefix
                </Eyebrow>
                <Eyebrow as="p" tone="accent">
                  Accent tone
                </Eyebrow>
              </div>
            </div>

            <div>
              <Eyebrow as="p" tone="ink">
                Prose
              </Eyebrow>
              <p className="type-caption mt-2 max-w-measure">
                Caps the measure at 62ch and spaces stacked children, so no
                paragraph declares its own margin.
              </p>
              <Prose className="mt-5">
                <p>
                  Most brands do not have a media problem. They have a system
                  problem — creative briefed by one team, media bought by
                  another, the store built by a third.
                </p>
                <p>
                  Every handoff leaks a little growth, and the leak compounds in
                  the wrong direction.
                </p>
              </Prose>
            </div>

            <div>
              <Eyebrow as="p" tone="ink">
                Rule
              </Eyebrow>
              <p className="type-caption mt-2 max-w-measure">
                Hairline for everything, strong for structural dividers.
              </p>
              <div className="mt-5 space-y-6">
                <div>
                  <Rule />
                  <span className="type-caption mt-2 block">hairline</span>
                </div>
                <div>
                  <Rule variant="strong" />
                  <span className="type-caption mt-2 block">strong</span>
                </div>
              </div>
            </div>

            <div>
              <Eyebrow as="p" tone="ink">
                Section tones
              </Eyebrow>
              <p className="type-caption mt-2 max-w-measure">
                Tone is a data attribute, not a set of colour classes. The tokens
                are repointed for the subtree, so the identical markup below is
                legible on all four surfaces without an inverse variant.
              </p>
              <div className="mt-5 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
                {(["bone", "paper", "sand", "inverse"] as const).map((tone) => (
                  <div key={tone} data-tone={tone} className="p-6">
                    <Eyebrow as="p" tone="ink">
                      tone=&quot;{tone}&quot;
                    </Eyebrow>
                    <p className="type-body-sm mt-2 text-ink-soft">
                      Identical markup on every surface.
                    </p>
                    <hr className="mt-4 border-0 border-t border-line" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Block>

        <Block
          id="controls"
          title="Chips, media and disclosure"
          blurb="The interactive primitives used by the work gallery, the filters and the FAQ."
        >
          <div className="space-y-16">
            <ChipDemo />
            <MediaCardDemo />
            <MarqueeDemo />
            <AccordionDemo />
          </div>
        </Block>
      </Container>

      {/* ------------------------------------------------------------------ */}
      <Section id="inverse" tone="inverse" className="grain scroll-mt-24">
        <Container>
          <Eyebrow as="p" tone="muted">
            Inverse band · maximum two per page
          </Eyebrow>
          <BalancedHeading level={2} size="h1" className="mt-6 max-w-[18ch]">
            On dark, the accent changes{" "}
            <span className="type-emphasis">weight</span>
          </BalancedHeading>
          <p className="type-body-lg mt-6 max-w-measure">
            The surface-inverse utility repoints --focus-ring, --link-color and
            the line tokens. Raw --accent sits at 3.09:1 here and fails as text,
            so anything inside a dark band gets --accent-lift automatically —
            no component has to know it went dark.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button>Book a Growth Call</Button>
            <a
              href="#inverse"
              className="type-body-lg underline underline-offset-4"
              style={{ color: "var(--link-color)" }}
            >
              A link on a dark band
            </a>
          </div>
          <Rule className="mt-10" />
          <p className="type-caption mt-6">
            This band also demonstrates the optional grain overlay — 0.03 opacity,
            disabled below 768px.
          </p>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Container>
        <Block
          id="motion"
          title="Motion"
          blurb="Four durations, two easings. Motion communicates hierarchy — it is not decoration. Everything here collapses to near-zero under prefers-reduced-motion."
        >
          <dl className="divide-y divide-line border-y border-line">
            {MOTION.map((m) => (
              <div
                key={m.cssVar}
                className="flex flex-wrap items-baseline justify-between gap-3 py-4"
              >
                <dt className="type-body-sm">
                  <code>--{m.cssVar}</code>
                </dt>
                <dd className="type-body-sm flex gap-6 text-ink-muted">
                  <span>{m.use}</span>
                  <span className="w-16 text-right tabular-nums">{m.value}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12">
            <EaseDemo />
          </div>
        </Block>

        <Block
          id="motion-lib"
          title="Motion components"
          blurb="Every one checks useReducedMotion and renders its final state instantly when motion is reduced. None of them animate width, height, top, left or margin — the Accordion is the single documented exception."
        >
          <MotionShowcase />
        </Block>
      </Container>
    </div>
  );
}
