import type { PillarId } from "@/types";
import type { SectionTone } from "@/components/ui/Section";

/**
 * Six configurations of one template.
 *
 * Every service page used the same order — eyebrow, heading, intro left,
 * capability rail right, serif statement, bullets, fit — so walking the six
 * read as one page repeating. What varies now is arrangement and emphasis;
 * what stays constant is the type scale, the spacing tokens, the CTA styling
 * and the four shared sections below the argument.
 *
 * Each layout is built around the one thing that pillar is actually about:
 *
 *   row          — the capabilities. A horizontal row under the heading, with
 *                  the serif statement leading the argument and the intro
 *                  following it, rather than the other way round.
 *   showcase     — the work. A strip of creative frames under the hero, before
 *                  any body copy. The least text of the six.
 *   flow         — the path. The ad → retention diagram carries the explanation
 *                  with a line under each node, not a paragraph beside it.
 *   typographic  — the words. No diagram at all: an oversized serif statement
 *                  and a two-column hairline index. The restrained one.
 *   schematic    — the infrastructure. The vertical rail with the accent pulse,
 *                  copy beside it rather than above it.
 *   index        — the data. Three columns: what is measured, how, and what is
 *                  done with it. The densest page.
 */
export type ServiceLayout =
  | "row"
  | "showcase"
  | "flow"
  | "typographic"
  | "schematic"
  | "index";

export interface ServiceLayoutConfig {
  layout: ServiceLayout;
  /** Hero and argument surface. Rotates bone → paper → sand so consecutive pages differ. */
  tone: SectionTone;
  /** Where the primary call to action sits. */
  cta: "mid" | "end";
}

const CONFIG: Record<PillarId, ServiceLayoutConfig> = {
  "d2c-growth": { layout: "row", tone: "bone", cta: "end" },
  "creative-content": { layout: "showcase", tone: "paper", cta: "mid" },
  "commerce-shopify": { layout: "flow", tone: "sand", cta: "end" },
  "seo-organic": { layout: "typographic", tone: "bone", cta: "mid" },
  "automation-ai": { layout: "schematic", tone: "paper", cta: "end" },
  "data-optimisation": { layout: "index", tone: "sand", cta: "mid" },
  // Landing pages take their parent's configuration.
  performance: { layout: "row", tone: "bone", cta: "end" },
  "social-media": { layout: "showcase", tone: "paper", cta: "mid" },
  "strategic-marketing": { layout: "flow", tone: "bone", cta: "mid" },
  "web-development": { layout: "showcase", tone: "paper", cta: "end" },
};

export function serviceLayout(id: PillarId): ServiceLayoutConfig {
  return CONFIG[id];
}
