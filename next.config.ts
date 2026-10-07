import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Default to `.next` — hosting platforms (Hostinger, Vercel, ...) look for
  // that exact directory. For local iCloud-synced folders, set
  // NEXT_DIST_DIR=.next.nosync (iCloud skips directories ending in `.nosync`).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Don't advertise the framework in every response.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // HTTPS is already forced by the host (http → https 301); HSTS tells
          // browsers to stay on HTTPS. No includeSubDomains: www has no
          // certificate yet, and that flag would lock it out.
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // SAMEORIGIN, not DENY: the 3D scenes are same-origin iframes.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
      // OG scrapers hit the card route repeatedly; let them reuse it for a day.
      {
        source: "/api/og",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
      // Static media from /public: let browsers keep it for 30 days instead of
      // re-downloading every visit. Replaced files should get a new name.
      {
        source: "/:dir(images|videos|animations|fonts|logos|3d)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return [{ source: "/services/strategic-marketing", destination: "/services/performance", permanent: true }];
  },
  experimental: {
    // Put the (small) CSS straight into the HTML so it no longer blocks the
    // first paint behind three extra requests.
    inlineCss: true,
  },
  images: {
    // Serve modern formats first; the browser falls back automatically.
    formats: ["image/avif", "image/webp"],
    // Extra in-between widths so small cards on phones get a 480px file
    // instead of jumping straight to 640px.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 480],
  },
  turbopack: {
    // Pin the workspace root. A stray lockfile in a parent directory otherwise
    // makes Turbopack's root inference ambiguous.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
