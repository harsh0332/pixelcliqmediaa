import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * The site is a website, not an app: `display: "browser"` keeps it in a normal
 * tab rather than claiming a standalone window it has no offline behaviour to
 * justify. The manifest exists for the install prompt and the icon set.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Creative & Growth Studio`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#f7f5f0",
    theme_color: "#f7f5f0",
    lang: "en-IN",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
