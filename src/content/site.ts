import type { Cta } from "@/types";

export interface SocialLink {
  platform: "instagram" | "linkedin" | "x" | "youtube";
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  /** The H1 on the homepage. */
  tagline: string;
  /** The line that follows the tagline and explains it. */
  supportLine: string;
  /** Short line for social profiles, footers and share cards. */
  secondaryLine: string;
  /** One sentence for meta descriptions and structured data. */
  description: string;
  location: string;
  phone: string;
  email: string;
  /** WhatsApp number in international format, digits only. */
  whatsapp: string;
  /** The message a visitor's WhatsApp opens with. */
  whatsappMessage: string;
  socials: SocialLink[];
  primaryCta: Cta;
  secondaryCta: Cta;
}

/** Public contact details supplied by the agency. */
export const site: SiteConfig = {
  name: "Pixelcliq Media",

  tagline: "Where D2C brands find their momentum.",

  supportLine:
    "We connect creative, performance marketing and commerce to help D2C brands grow. One partner, from first impression to repeat purchase.",

  secondaryLine: "Built to Make Brands Move.",

  // Kept under ~160 characters: past that Google truncates the snippet
  // mid-sentence, and the clause that gets cut is always the last one.
  description:
    "An independent creative and growth studio. Creative, media, commerce, retention and automation run as one system, so growth compounds instead of leaking.",

  location: "Working with brands worldwide",

  phone: "+91 7024332332",
  email: "contact@pixelcliqmedia.com",
  whatsapp: "917024332332",
  whatsappMessage: "Hi Pixelcliq, I would like to talk about growing my brand.",

  socials: [
    { platform: "instagram", label: "Instagram", href: "[INSTAGRAM_URL]" },
    { platform: "linkedin", label: "LinkedIn", href: "[LINKEDIN_URL]" },
    { platform: "x", label: "X", href: "[X_URL]" },
    { platform: "youtube", label: "YouTube", href: "[YOUTUBE_URL]" },
  ],

  primaryCta: { label: "Book a free call", href: "/contact" },
  secondaryCta: { label: "Explore our services", href: "/services" },
};

/**
 * Content-availability flags.
 *
 * Components branch on these rather than on array lengths, so an empty rail can
 * never be rendered as though it were waiting for images to load. Each one stays
 * false until the underlying content is real and cleared for publication; the
 * content guard fails the build if a flag disagrees with the data.
 */
export const HAS_CLIENT_LOGOS = false;
export const HAS_PUBLISHED_CASES = false;
export const HAS_TESTIMONIALS = false;
export const HAS_VERIFIED_STATS = false;

/** A wa.me link with the default greeting filled in. */
export function whatsappHref(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
