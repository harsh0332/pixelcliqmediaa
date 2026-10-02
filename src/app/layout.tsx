import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Reveals } from "@/components/providers/Reveals";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { SITE_URL, absoluteUrl, ogImagePath } from "@/lib/seo";
import { isPlaceholder } from "@/lib/placeholders";
import {
  jsonLdScriptProps,
  organizationSchema,
  webSiteSchema,
} from "@/lib/schema";
import "./globals.css";
import "@/styles/agency-refresh.css";
import "@/styles/premium.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — D2C Growth Agency, Indore`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  // Kept to terms the site actually earns a page for. A longer list does
  // nothing for ranking and reads as spam to a human reviewing the source.
  keywords: [
    "D2C growth agency",
    "performance marketing Indore",
    "Shopify agency India",
    "ecommerce growth partner",
    "paid media and creative",
    "retention and lifecycle marketing",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: absoluteUrl("/"),
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: absoluteUrl("/images/og-image.png"),
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
        type: "image/png",
      },
      {
        url: ogImagePath({ title: site.tagline, eyebrow: site.name }),
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [absoluteUrl("/images/og-image.png")],
  },
  // No explicit `icons`: app/icon.svg and app/apple-icon.tsx are file
  // conventions, and Next emits the <link> tags for them itself. The explicit
  // block that was here pointed at /icon and /apple-icon.png, neither of which
  // exists, so every page shipped two 404s in its <head>.
  robots: { index: true, follow: true },
};

/**
 * Site-wide structured data.
 *
 * Emitted once, in the root layout, with stable @id anchors that every page's
 * schema references. Contact details and social profiles are still bracketed
 * placeholders, so `isPlaceholder` filters them out and `pruneEmpty` drops the
 * properties — a crawler sees no telephone rather than a fake one.
 */
const siteGraph = {
  // `@graph` is a JSON-LD keyword, not a type — it carries several top-level
  // entities under one @context so the organisation and the site are declared
  // once and referenced by @id from every page. It deliberately has no
  // "@type" of its own; giving it one would declare a phantom entity.
  "@graph": [
    organizationSchema({
      siteUrl: SITE_URL,
      name: site.name,
      description: site.description,
      locality: "Indore",
      region: "Madhya Pradesh",
      country: "IN",
      telephone: isPlaceholder(site.phone) ? undefined : site.phone,
      email: isPlaceholder(site.email) ? undefined : site.email,
      sameAs: site.socials
        .map((s) => s.href)
        .filter((href) => !isPlaceholder(href)),
    }),
    webSiteSchema({
      siteUrl: SITE_URL,
      name: site.name,
      description: site.description,
    }),
  ],
};

/*
 * `data-scroll-behavior="smooth"` is deliberately absent. Next 16 only overrides
 * scroll behaviour during navigation when that attribute is present, and scrolling
 * stays native, without an extra animation loop.
 *
 * <main> carries no top padding: the header floats transparently over the hero
 * by design. A page without a hero adds its own offset.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `no-js` is removed by the inline script in <head> before first paint. If
    // that script never runs — JavaScript disabled, blocked, or failed — the
    // class stays, and globals.css uses it to lift every entrance's opacity:0
    // so the page is readable without a single byte of the bundle.
    <html lang="en" className={`${fontVariables} no-js h-full antialiased`} suppressHydrationWarning>
      <head>
        {/*
          The logo entrance plays once per session.

          This runs synchronously before first paint and stamps
          `data-logo-fresh` on <html> only when the flag is unset, so the CSS
          animation is armed on a genuine first visit and simply absent
          afterwards — no flash, and no state React has to reconcile.

          Deliberately outside React: reading sessionStorage during render
          would make the server and client disagree and throw a hydration
          mismatch. Wrapped in try/catch because sessionStorage throws outright
          in some privacy modes, and a logo animation is never worth an
          exception.

          `?replay` clears the flag first, so the entrance can be reviewed
          without opening a new private window each time. Harmless in
          production: it only replays an animation the visitor would have seen
          on their first visit anyway.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js');try{var r=location.search.indexOf('replay')>-1;if(r)sessionStorage.removeItem('pc-logo');if(!sessionStorage.getItem('pc-logo')){document.documentElement.setAttribute('data-logo-fresh','');sessionStorage.setItem('pc-logo','1')}}catch(e){document.documentElement.setAttribute('data-logo-fresh','')}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {/*
          Entrance animations render their initial state server-side, which means
          opacity:0 is in the HTML before hydration. If JavaScript fails or is
          blocked, the hero would stay blank — the same failure as a competitor's
          1s animation delay leaving an empty first paint. Without JS, this
          reveals everything immediately.
        */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;translate:none!important}`}</style>
        </noscript>
        <script {...jsonLdScriptProps(siteGraph)} />
        <SkipLink />
        <Header />
        {/* tabIndex={-1} is what makes the skip link actually work. Following
            a hash to a non-focusable element moves the browser's sequential
            navigation point but leaves document.activeElement on <body>, so
            the next Tab returns to the header and the link silently does
            nothing for a keyboard user. -1 keeps <main> out of the tab order
            while letting it receive focus programmatically. The matching
            :focus outline is suppressed in globals.css — focusing a whole
            page region should not draw a box around the page. */}
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <MobileCta />
        <WhatsAppFab />
        <Reveals />
      </body>
    </html>
  );
}
