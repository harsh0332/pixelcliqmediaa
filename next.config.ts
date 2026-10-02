import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Default to `.next` — hosting platforms (Hostinger, Vercel, ...) look for
  // that exact directory. For local iCloud-synced folders, set
  // NEXT_DIST_DIR=.next.nosync (iCloud skips directories ending in `.nosync`).
  distDir: process.env.NEXT_DIST_DIR || ".next",
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
