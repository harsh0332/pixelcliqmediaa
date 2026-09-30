/**
 * Build-time integrity checks on the content layer.
 *
 * Every rule here exists because a competitor audit found the failure in
 * production: the same client's result stated as two different numbers in two
 * places, one result credited to two different people, internal copywriting
 * notes shipped live, identical body copy under two headings, and invented
 * metrics presented as fact.
 *
 * This function is deliberately pure — it takes the content rather than
 * importing it — so it runs identically from a build script, a test, or a
 * future CMS import, with no module-alias resolution involved.
 *
 * Run it with `npm run guard`. It is wired to `prebuild`, so a violation fails
 * the build rather than shipping.
 */

export interface GuardCase {
  slug: string;
  client: string;
  status: string;
  results: { metric: string; label: string }[];
  quote?: { text: string; author: string; role: string };
}

export interface GuardTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  brand: string;
  verified: boolean;
}

export interface GuardStat {
  id: string;
  value: string;
  label: string;
  context: string;
}

export interface GuardClient {
  id: string;
  name: string;
  logo: string;
  approved: boolean;
}

export interface GuardInsight {
  slug: string;
  status: string;
  /** Only checked for presence, so the block shape does not belong here. */
  body: unknown;
  publishedAt: string | null;
}

export interface ContentBundle {
  cases: GuardCase[];
  testimonials: GuardTestimonial[];
  stats: GuardStat[];
  clients: GuardClient[];
  insights: GuardInsight[];
  flags: {
    HAS_CLIENT_LOGOS: boolean;
    HAS_PUBLISHED_CASES: boolean;
    HAS_TESTIMONIALS: boolean;
    HAS_VERIFIED_STATS: boolean;
  };
  /** Authored content. Subject to every check, including duplicate prose. */
  modules: Record<string, unknown>;
  /**
   * Modules that project authored content rather than restating it — the
   * navigation derives its labels and descriptions from servicePillars, which
   * is exactly why a pillar can never appear in the menu with stale copy.
   *
   * These are still checked for banned register and invented metrics, but they
   * are excluded from the duplicate-prose check: a derived string is *supposed*
   * to equal its source, and flagging that would train us to ignore the check
   * that catches genuine copy-paste.
   */
  derivedModules?: Record<string, unknown>;
  /**
   * Paths exempt from the invented-metric check, by dotted prefix.
   *
   * Kept as an explicit, named list rather than by loosening the pattern. The
   * only legitimate case so far is a form's budget dropdown: "₹5–20L" is an
   * option describing the visitor's own spend, not a claim about our results.
   * Every entry needs a reason, and the list should stay short.
   */
  claimExemptPaths?: string[];
}

const PLACEHOLDER = /^\[[A-Z0-9_]+\]$/;
const isPlaceholder = (v: unknown): boolean =>
  typeof v === "string" && PLACEHOLDER.test(v.trim());
const containsPlaceholder = (v: unknown): boolean =>
  typeof v === "string" && /\[[A-Z0-9_]+\]/.test(v);

/** Lifted from the competitor audit. Anything in this register is a defect. */
const BANNED_PATTERNS: { re: RegExp; why: string }[] = [
  { re: /\bautomagical/i, why: "banned register" },
  { re: /\bmagic(al|ally)?\b/i, why: "banned register" },
  { re: /digital hiccup/i, why: "banned register" },
  { re: /high-?five/i, why: "banned register" },
  { re: /online swagger/i, why: "banned register" },
  { re: /competitors jealous/i, why: "banned register" },
  { re: /cat videos/i, why: "banned register" },
  { re: /bull'?s-?eye/i, why: "banned register" },
  { re: /freshly buttered/i, why: "banned register" },
  { re: /\bsecret sauce\b/i, why: "banned register" },
  { re: /\b(ninja|rockstar|guru|wizard)\b/i, why: "banned register" },
  { re: /\b(supercharge|unleash|skyrocket|turbocharge)\b/i, why: "hype verb" },
  { re: /\bgame-?changer/i, why: "hype noun" },
  { re: /\b(world-?class|best-in-class|cutting-edge|industry-leading)\b/i, why: "unprovable superlative" },
  { re: /\b(#1|number one|the best)\b/i, why: "unprovable superlative" },
  { re: /!/, why: "exclamation mark" },
  { re: /\bTone:/i, why: "leftover writing note" },
  { re: /\b(Bold &|Advisory Tone|Casual but)/i, why: "leftover writing note" },
  { re: /\b(TODO|FIXME|lorem ipsum)\b/i, why: "leftover working marker" },
];

/**
 * A business-result claim: a percentage lift, a multiple, an Indian-format
 * figure, or a count of brands served.
 *
 * Note there is no \b before the currency symbol — ₹ is not a word character,
 * so a word boundary can never match between a space and ₹, and the check
 * silently passed everything until a negative test caught it.
 */
const NUMERIC_CLAIM =
  /(?:\+\s?\d+\s?%|\b\d+\s?%\s?(?:lift|increase|growth|uplift|more)|\b\d+(?:\.\d+)?\s?x\s?(?:roas|return|growth)|(?:₹|\brs\.?\s?)\s?\d|\b\d+(?:\.\d+)?\s?(?:cr|crore|lakhs?|lacs?)\b|\b\d{2,}\s?\+\s?(?:brands|clients|stores|customers))/i;

/** Walk any nested structure and yield every string with its path. */
function* walkStrings(
  value: unknown,
  path = "",
): Generator<{ path: string; value: string }> {
  if (typeof value === "string") {
    yield { path, value };
  } else if (Array.isArray(value)) {
    for (const [i, item] of value.entries()) yield* walkStrings(item, `${path}[${i}]`);
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      yield* walkStrings(v, path ? `${path}.${k}` : k);
    }
  }
}

/** Prose, as opposed to a slug, an asset path or a CSS-ish token. */
function isProse(value: string): boolean {
  return (
    value.length > 40 &&
    value.includes(" ") &&
    !value.startsWith("/") &&
    !value.startsWith("http")
  );
}

export function collectContentViolations(bundle: ContentBundle): string[] {
  const violations: string[] = [];

  const authored = {
    ...bundle.modules,
    cases: bundle.cases,
    testimonials: bundle.testimonials,
    stats: bundle.stats,
    clients: bundle.clients,
    insights: bundle.insights,
  };
  const everything = { ...authored, ...(bundle.derivedModules ?? {}) };

  // 1. Banned register and leftover notes, anywhere in the content layer.
  for (const { path, value } of walkStrings(everything)) {
    for (const { re, why } of BANNED_PATTERNS) {
      if (re.test(value)) {
        violations.push(
          `[${why}] ${path} matches ${re}: "${value.slice(0, 90)}"`,
        );
      }
    }
    const exempt = (bundle.claimExemptPaths ?? []).some((prefix) =>
      path.startsWith(prefix),
    );
    if (!exempt && NUMERIC_CLAIM.test(value) && !containsPlaceholder(value)) {
      violations.push(
        `[unverified metric] ${path} reads as a business-result claim: "${value.slice(0, 90)}"`,
      );
    }
  }

  // 2. The same prose sentence appearing in two places.
  const sentences = new Map<string, string[]>();
  for (const { path, value } of walkStrings(authored)) {
    if (!isProse(value)) continue;
    for (const raw of value.split(/(?<=[.?])\s+/)) {
      const key = raw.trim().toLowerCase();
      if (key.length < 40) continue;
      sentences.set(key, [...(sentences.get(key) ?? []), path]);
    }
  }
  for (const [sentence, paths] of sentences) {
    if (paths.length > 1) {
      violations.push(
        `[duplicate copy] the same sentence appears at ${paths.join(" and ")}: "${sentence.slice(0, 70)}…"`,
      );
    }
  }

  // 3. A published case may not still contain a bracketed placeholder.
  for (const entry of bundle.cases) {
    if (entry.status !== "published") continue;
    for (const { path, value } of walkStrings(entry)) {
      if (containsPlaceholder(value)) {
        violations.push(
          `[published with placeholder] case "${entry.slug}" is published but ${path} is still "${value}"`,
        );
      }
    }
  }

  // 4. A verified testimonial needs an attributable person.
  for (const t of bundle.testimonials) {
    if (!t.verified) continue;
    for (const field of ["quote", "name", "role", "brand"] as const) {
      if (!t[field] || isPlaceholder(t[field])) {
        violations.push(
          `[unattributed testimonial] "${t.id}" is verified but ${field} is "${t[field]}"`,
        );
      }
    }
  }

  // 5. One client, one value per metric label. This is the "10,000+ in one
  //    section, 15,000+ in another" failure, made structurally impossible.
  const byClientLabel = new Map<string, Set<string>>();
  for (const entry of bundle.cases) {
    if (isPlaceholder(entry.client)) continue;
    for (const result of entry.results) {
      if (isPlaceholder(result.metric) || isPlaceholder(result.label)) continue;
      const key = `${entry.client.trim().toLowerCase()} :: ${result.label.trim().toLowerCase()}`;
      const set = byClientLabel.get(key) ?? new Set<string>();
      set.add(result.metric.trim());
      byClientLabel.set(key, set);
    }
  }
  for (const [key, values] of byClientLabel) {
    if (values.size > 1) {
      violations.push(
        `[conflicting result] ${key} is stated as ${[...values].map((v) => `"${v}"`).join(" and ")}`,
      );
    }
  }

  // 6. One result value belongs to one client. This is the "same 4CR+ credited
  //    to two different people" failure.
  const byMetric = new Map<string, Set<string>>();
  for (const entry of bundle.cases) {
    if (isPlaceholder(entry.client)) continue;
    for (const result of entry.results) {
      if (isPlaceholder(result.metric)) continue;
      const key = result.metric.trim().toLowerCase();
      const set = byMetric.get(key) ?? new Set<string>();
      set.add(entry.client.trim());
      byMetric.set(key, set);
    }
  }
  for (const [metric, owners] of byMetric) {
    if (owners.size > 1) {
      violations.push(
        `[reused result] "${metric}" is credited to ${[...owners].join(" and ")}`,
      );
    }
  }

  // 6b. The same claim, stated differently, across cases, testimonials and
  //     stats. A competitor says one client sold to "10,000+" in its case
  //     section and "15,000+" on a video poster; a careful buyer notices.
  //
  //     Values are grouped per client by their *shape* — the unit that trails
  //     the number — so "10,000+" and "15,000+" collide while "4CR+" and "12%"
  //     legitimately coexist as different measures of the same account.
  const NUMBER_TOKEN = /\b\d[\d,.]*\s?(?:cr\+?|crore|lakh|k\+?|%|x|\+)?/gi;
  const shapeOf = (token: string) =>
    token.replace(/[\d,.]+/g, "#").replace(/\s+/g, "").toLowerCase();

  const knownClients = [
    ...bundle.cases.map((c) => c.client),
    ...bundle.testimonials.map((t) => t.brand),
  ]
    .filter((name) => name && !isPlaceholder(name))
    .map((name) => name.trim());

  /** client :: value-shape -> the distinct values claimed, and where. */
  const claims = new Map<string, Map<string, Set<string>>>();
  const record = (client: string, raw: string, where: string) => {
    for (const match of raw.match(NUMBER_TOKEN) ?? []) {
      const token = match.trim();
      if (!/\d/.test(token)) continue;
      const key = client.trim().toLowerCase();
      const byShape = claims.get(key) ?? new Map<string, Set<string>>();
      const shape = shapeOf(token);
      const values = byShape.get(shape) ?? new Set<string>();
      values.add(`${token} (${where})`);
      byShape.set(shape, values);
      claims.set(key, byShape);
    }
  };

  for (const entry of bundle.cases) {
    if (isPlaceholder(entry.client)) continue;
    for (const result of entry.results) {
      if (isPlaceholder(result.metric)) continue;
      record(entry.client, result.metric, `case ${entry.slug}`);
    }
  }
  for (const t of bundle.testimonials) {
    if (isPlaceholder(t.brand) || isPlaceholder(t.quote)) continue;
    record(t.brand, t.quote, `testimonial ${t.id}`);
  }
  for (const stat of bundle.stats) {
    if (isPlaceholder(stat.value)) continue;
    const named = knownClients.find((client) =>
      `${stat.label} ${stat.context}`.toLowerCase().includes(client.toLowerCase()),
    );
    if (named) record(named, stat.value, `stat ${stat.id}`);
  }

  for (const [client, byShape] of claims) {
    for (const [, values] of byShape) {
      const distinct = new Set([...values].map((v) => v.split(" (")[0]));
      if (distinct.size > 1) {
        violations.push(
          `[contradictory claim] ${client} is given as ${[...values].join(" and ")}`,
        );
      }
    }
  }

  // 7. An approved client logo must be a real name and a real file.
  for (const client of bundle.clients) {
    if (!client.approved) continue;
    if (isPlaceholder(client.name)) {
      violations.push(`[placeholder logo] client "${client.id}" is approved but unnamed`);
    }
    if (client.logo.includes("placeholder")) {
      violations.push(
        `[placeholder logo] client "${client.id}" is approved but still points at ${client.logo}`,
      );
    }
    if (/pixelcliq/i.test(client.name)) {
      violations.push(
        `[own logo in client wall] "${client.name}" is us — never pad the count with our own mark`,
      );
    }
  }

  // 8. A published article must actually exist.
  for (const insight of bundle.insights) {
    if (insight.status !== "published") continue;
    if (!insight.body) {
      violations.push(`[empty article] insight "${insight.slug}" is published with no body`);
    }
    if (!insight.publishedAt) {
      violations.push(`[missing date] insight "${insight.slug}" is published with no date`);
    }
  }

  // 9. Availability flags must agree with the data they describe.
  const expected = {
    HAS_CLIENT_LOGOS: bundle.clients.some((c) => c.approved),
    HAS_PUBLISHED_CASES: bundle.cases.some((c) => c.status === "published"),
    HAS_TESTIMONIALS: bundle.testimonials.some((t) => t.verified),
    HAS_VERIFIED_STATS: bundle.stats.some((s) => !isPlaceholder(s.value)),
  };
  for (const [flag, actual] of Object.entries(expected)) {
    const declared = bundle.flags[flag as keyof typeof bundle.flags];
    if (declared !== actual) {
      violations.push(
        `[stale flag] site.ts declares ${flag}=${declared} but the data says ${actual}`,
      );
    }
  }

  return violations;
}

/** Throws on the first run that finds anything. Used by the build. */
export function assertContentIntegrity(bundle: ContentBundle): void {
  const violations = collectContentViolations(bundle);
  if (violations.length > 0) {
    throw new Error(
      `Content guard failed with ${violations.length} violation(s):\n` +
        violations.map((v) => `  • ${v}`).join("\n"),
    );
  }
}
