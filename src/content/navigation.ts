import type { NavLink } from "@/types";
import { homeContent } from "@/content/refinedHome";

export interface MegaMenuItem extends NavLink {
  /** Sequence marker, e.g. "01". Genuinely ordered, so genuinely numbered. */
  number: string;
}

export interface MegaMenu {
  label: string;
  href: string;
  /** The editorial line beside the pillar grid in the dropdown. */
  intro: string;
  items: MegaMenuItem[];
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
const servicesMega: MegaMenu = {
  label: "Services",
  href: "/services",
  intro: "D2C expertise. Full-service capabilities.",
  // The same nine services, in the same order, as the homepage explorer.
  items: homeContent.explorer.items.map((item, index) => ({
    label: item.title,
    href: item.href,
    description: item.line,
    number: String(index + 1).padStart(2, "0"),
  })),
  footerLink: {
    label: "View all services",
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
    links: homeContent.explorer.items.map((item) => ({ label: item.title, href: item.href })),
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
