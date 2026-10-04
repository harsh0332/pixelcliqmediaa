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
    ];
  },
  async redirects() {
    return [{ source: "/services/strategic-marketing", destination: "/services/performance", permanent: true }];
  },
  images: {
    // Serve modern formats first; the browser falls back automatically.
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    // Pin the workspace root. A stray lockfile in a parent directory otherwise
    // makes Turbopack's root inference ambiguous.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
