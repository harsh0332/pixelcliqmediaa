import type { NavLink } from "@/types";
import { homeContent } from "@/content/refinedHome";

export interface MegaMenuItem extends NavLink {
  /** Sequence marker, e.g. "01". Genuinely ordered, so genuinely numbered. */
  number: string;
  /** Which animated preview the dropdown shows for this service. */
  visual: string;
  /** The column this service sits in, by MegaMenuGroup id. */
  group: string;
}

export interface MegaMenuGroup {
  id: string;
  label: string;
}

export interface MegaMenu {
  label: string;
  href: string;
  groups: MegaMenuGroup[];
  items: MegaMenuItem[];
  /** The way out for a reader who does not know which service they need. */
  cta: NavLink;
  /** Label on the preview's link through to the hovered service. */
  explore: string;
  /** The link out of the dropdown, to the full services index. */
  footerLink: NavLink;
}

export interface HeaderNavItem {
  label: string;
  href: string;
  /** Present when this item opens the services mega-menu. */
  mega?: MegaMenu;
}

/**
 * The services dropdown is derived from servicePillars rather than restated,
 * so a pillar can never appear in the menu with a stale title or a dead slug.
 */
/** Which column each homepage service sits in, keyed by its explorer id. */
const SERVICE_GROUP: Record<string, string> = {
  ads: "grow",
  leads: "grow",
  seo: "grow",
  design: "create",
  social: "create",
  brand: "create",
  store: "build",
  automation: "build",
};

const servicesMega: MegaMenu = {
  label: "Services",
  href: "/services",
  groups: [
    { id: "grow", label: "Grow" },
    { id: "create", label: "Create" },
    { id: "build", label: "Build" },
  ],
  // The same services, in the same order, as the homepage explorer.
  items: homeContent.explorer.items.map((item, index) => ({
    label: item.title,
    href: item.href,
    description: item.line,
    number: String(index + 1).padStart(2, "0"),
    visual: item.visual,
    group: SERVICE_GROUP[item.id] ?? "grow",
  })).concat({
    // Studio Zero sits with the creative services; it is a product, not an explorer row.
    label: "Studio Zero: AI visuals",
    href: "/studio-zero",
    description: "Campaign images, model shots and A+ content made with art direction and AI. No studio required.",
    number: "09",
    visual: "design",
    group: "create",
  }),
  cta: homeContent.explorer.cta,
  explore: "Explore",
  footerLink: {
    label: "All services",
    href: "/services",
  },
};

export const headerNav: HeaderNavItem[] = [
  { label: "Services", href: "/services", mega: servicesMega },
  { label: "Approach", href: "/approach" },
  { label: "Portfolio", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerNav: FooterColumn[] = [
  {
    title: "Services",
    // All eight, not just the six nav pillars: the landing pages need a
    // crawlable link from somewhere, and the footer is where they live.
    links: [...homeContent.explorer.items.map((item) => ({ label: item.title, href: item.href })), { label: "Studio Zero: AI visuals", href: "/studio-zero" }],
  },
  {
    title: "Company",
    links: [
      { label: "Our approach", href: "/approach" },
      { label: "Portfolio", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Numbers", href: "/numbers" },
      { label: "FAQ", href: "/contact#contact-faq-heading" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** Kept separate from footerNav: legal links sit on the bottom bar. */
export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];
