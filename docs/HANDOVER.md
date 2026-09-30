# Pixelcliq Media — Handover

Everything the site needs before it carries real information. Written after the
Phase 20 honesty audit, which removed all 174 visible placeholder tokens from
the rendered pages, and updated 2026-09-19 after the final QA passes. The tokens still exist in the content layer — that is
deliberate. Components now detect them and render an honest empty state instead
of printing them.

**Rule that governs this document:** replace a token with a real value, or leave
the token. Never replace one with a plausible-looking guess. Every empty state on
this site is load-bearing.

---

## 1. Placeholders, by file

### `src/content/site.ts` — 6 tokens · blocks the most
| Token | Needs |
|---|---|
| `[PHONE]` | The complete business number, in the format you want it dialled. Until then the footer and closing CTA omit the line entirely and the JSON-LD omits `telephone`. |
| `[EMAIL_PLACEHOLDER]` | A real mailbox on the registered domain. Same handling as above. |
| `[INSTAGRAM_URL]` `[LINKEDIN_URL]` `[X_URL]` `[YOUTUBE_URL]` | Full profile URLs. Any that stay unresolved are dropped from `sameAs`; if all four are unresolved the property is omitted, which is correct. |

### `src/content/cases.ts` — 121 tokens · 6 case studies
Per case: `[CLIENT_NAME]`, `[INDUSTRY]`, `[TIMEFRAME]`, `[PROBLEM]`,
`[STRATEGY_STEP_1..3]`, `[RESULT_HEADLINE]`, `[LABEL]` ×3, `[RESULT_METRIC]` ×3,
`[CAPTION]` ×3.

A case only becomes public when you also set `status: "published"`. Until then
the tile reads "Case study in progress", the page hides the At-a-glance,
Challenge and Approach sections, and the route is `noindex` and absent from the
sitemap.

### `src/content/creatives.ts` — 47 tokens · 23 creative items
Per item: `[CREATIVE_TITLE]`, `[CLIENT_NAME]`. Each item also has
`approved: false`. **Approval is the real gate** — `approvedCreatives` and
`creativesForPillar()` both filter on it, so the homepage showcase and the
service-page rails stay hidden until at least one item is approved.

### `src/content/testimonials.ts` — 24 tokens · 6 quotes
Per quote: `[TESTIMONIAL_TEXT]`, `[NAME]`, `[ROLE]`, `[BRAND]`, plus
`verified: false`. Never publish a quote you cannot attribute to a named person
who has agreed to it.

### `src/content/stats.ts` — 24 tokens · 8 stats
Per stat: `[VALUE]`, `[LABEL]`, `[CONTEXT]`. While every value is a token,
`/numbers` renders a single honest statement instead of eight empty rows.

### `src/content/legal.ts` — 9 `[TO_CONFIRM_WITH_LEGAL]`
Registered entity name and address, retention periods, the analytics tooling you
intend to use. These render on the page as a styled "to be confirmed" marker, not
as a raw token. **These pages need a qualified legal review before launch.**

### `src/content/faq.ts` — 1 `[TO_CONFIRM]` (a comment only)
The two answers that carried tokens were rewritten to be complete and true
without a figure. `faqSchema()` now refuses to publish any FAQ entry containing a
bracketed token, so this cannot regress into structured data.

---

## 2. Flags to flip — `src/content/site.ts`

```ts
export const HAS_CLIENT_LOGOS  = false;
export const HAS_PUBLISHED_CASES = false;
export const HAS_TESTIMONIALS  = false;
export const HAS_VERIFIED_STATS = false;
```

The content guard fails the build if a flag disagrees with the data, so flip each
one **after** the underlying content is real, not before.

| Flag | Flip when | What appears |
|---|---|---|
| `HAS_CLIENT_LOGOS` | Real logo files exist and you have permission to show them | The proof strip switches from category labels to the logo marquee, and its label can honestly become "Trusted by" |
| `HAS_PUBLISHED_CASES` | At least one case has `status: "published"` and no tokens | Case tiles show client, industry and metric; the page becomes indexable and enters the sitemap |
| `HAS_TESTIMONIALS` | At least one quote is `verified: true` with a real name | The testimonials section renders |
| `HAS_VERIFIED_STATS` | At least one stat has a real `value` | `/numbers` switches from the statement to the stat list |

Per-item gates, independent of the flags: `case.status`, `creative.approved`,
`testimonial.verified`, `insight.status`.

---

## 3. Structured data — once contact details are confirmed

`src/app/layout.tsx` builds the Organization node. It already reads
`site.phone`, `site.email` and `site.socials` and drops anything unresolved, so
**filling in `site.ts` is the only action** — no schema edit needed.

Then add, only when each is genuinely true:
- `logo` — an absolute URL to a real logo file (min 112×112, PNG or SVG). Omitted today because no logo exists. Do not point it at the favicon mark.
- `foundingDate` — only once you are willing to state it publicly.
- `aggregateRating` / `review` — **only** with real, attributable reviews. Inventing these is both dishonest and a manual-action risk.

Never add `numberOfEmployees` or `award` speculatively.

Also set **`NEXT_PUBLIC_SITE_URL`** to the live domain. Every canonical, Open
Graph URL and schema `@id` derives from it and currently reads `localhost:3000`.

---

## 4. Asset slots — exact ratios and dimensions

Source of truth: `src/lib/ratio.ts`.

| Slot | File / field | Ratio | Recommended | Notes |
|---|---|---|---|---|
| Hero media cluster | `home.ts` → `hero.frames` | 9:16, 4:5, 9:16, 1:1 | 720×1280, 1024×1280, 720×1280, 1080×1080 | First frame is the only `priority` image |
| Creative items | `creatives.ts` → `src` | 4:5 / 9:16 / 1:1 | 1024×1280 / 720×1280 / 1080×1080 | Set `approved: true` to publish |
| Creative video | `creatives.ts` → `video` | matches its `ratio` | H.264 MP4, muted | `preload="none"`, max 6 per page |
| Case cover | `cases.ts` → `cover` | 4:5 | 1024×1280 | |
| Case gallery | `cases.ts` → `gallery[].src` | per-item `ratio` | as above | Each needs a real `[CAPTION]` |
| Insight cover | `insights.ts` → `cover` | 16:9 | 1280×720 | Also used as the Article schema `image` |
| Client logos | `clients.ts` | — | SVG preferred, height ~24px | Empty today; needs written permission |
| OG card | generated at `/api/og` | 1200×630 | — | Dynamic, no asset needed |

Put files under `public/images/{creative,work,insights}/`. Replace the
placeholder SVGs of the same name rather than adding new paths, so no content
edit is needed.

---

## 5. Remaining TODOs

1. **`/work` case grid is still client-rendered.** The hero (eyebrow, h1,
   support) now renders on the server — fixed 2026-09-19 — but the case list
   itself sits behind `Suspense` because `WorkIndex` reads `useSearchParams`.
   Harmless while all cases are placeholders; **before the first case
   publishes**, move the search-param read into a smaller child so the default
   grid is in the HTML.
2. **Contact form does not deliver anywhere.** `src/app/api/contact/route.ts`
   validates and returns 200 but only logs. Wire a real mailbox or CRM.
3. **Newsletter returns 503 and stores nothing** — deliberate, since there is no
   provider and no privacy notice covering it. Wire or remove.
4. **Share rail is copy-link only**, because the social URLs are placeholders.
5. **OG card renders in a fallback typeface.** Satori cannot read WOFF2. Drop
   `ClashDisplay-Semibold.otf` (or `.ttf`) into `public/fonts` — the same
   Fontshare download includes it — and the card picks it up automatically.
6. **Homepage first-load JS is 271 KB (encoded) across 23 files**, against a
   ~200 KB target. The largest chunk (70 KB) is React DOM itself; Framer Motion
   and Lenis are in every route because the header, hero and smooth-scroll
   provider use them. Getting under 200 KB means removing Framer from the
   layout-level components — a large refactor with regression risk across the
   motion system, deliberately not attempted during QA. Desktop Lighthouse is
   100 and TBT is 0 ms regardless; the cost is mobile LCP under simulation.
7. **No Safari or Firefox testing.** Chrome only. `-webkit-backdrop-filter` is
   emitted and video carries `muted` + `playsInline`, but the pinned Compound
   Loop deserves a manual pass in Safari.
8. **No screen-reader pass.** The accessibility tree was verified
   programmatically (axe: 0 violations across 13 routes), but nobody has listened
   to it. Worth ten minutes with VoiceOver on `/contact` and the Compound Loop.
9. **`/approach` and `/faq` do not exist.** Their nav entries now point at
   `/#compound-loop` and `/contact#contact-faq-heading`. If you build the real
   pages, change the two hrefs in `src/content/navigation.ts`.
10. **`/numbers` is unlinked and out of the sitemap** until `HAS_VERIFIED_STATS`
    is true — a nav link to a page whose content is "nothing yet" leaked trust.
    The route still builds; the flag brings it back into the footer and sitemap.
11. **`SITE_URL` is still a placeholder domain** in `src/lib/seo.ts`. Every
    canonical, OG URL and sitemap entry derives from it. Set it before launch.
12. **The lightbox has never been exercised** — no creative is `approved`, so it
    never mounts. Test keyboard trapping and Escape the first time one is.
13. **The environment.** This project lives in an iCloud-synced Desktop folder.
    `node_modules` is a symlink to `deps.nosync/node_modules` and the build
    writes to `.next.nosync` (`distDir` in `next.config.ts`) because iCloud was
    evicting `node_modules` files and indexing every build. Both `.nosync` dirs
    are gitignored. If you move the project out of iCloud, revert both: delete
    the symlink, `mv deps.nosync/node_modules node_modules`, remove `distDir`.

---

## 6. Deliberate exceptions (Phase 21 anti-pattern sweep)

Three items are knowingly left as they are. Each is a judgement, not an oversight.

1. **The proof-strip marquee runs three passes, then rests.** It was the one
   element still moving for the whole session; it is now finite (three cycles,
   ending on the seam so the stop is invisible), pauses while off-screen, pauses
   on hover and focus, and stops entirely under `prefers-reduced-motion`.

2. **`/styleguide` is an orphan route** — deliberately unlinked, `noindex,
   nofollow`, and useful as an internal design-system reference. It does ship in
   the production build. Delete the route if you would rather it did not.

3. **Contact details show as "Send an enquiry", not as email/phone rows.**
   `site.email` and `site.phone` are bracketed, and the site never renders a
   bracketed token to a visitor. Set the real values and the two rows appear on
   `/contact` and in the footer, and `telephone`/`email` enter the Organization
   schema, automatically.

4. **No FAQ answers "who will actually work on my account?"** — a real question
   for a founder spending seriously. It is missing because answering it honestly
   requires stating facts about the team that only you can confirm. Add it to
   `src/content/faq.ts` once you can answer it without a placeholder.
