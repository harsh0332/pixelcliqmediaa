import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build output outside iCloud's reach. The project lives in a synced Desktop
  // folder, and every rebuild writes thousands of files that fileproviderd
  // then indexes — it sat at 100% CPU for hours and slowed every file read.
  // iCloud skips any directory whose name ends in `.nosync`.
  distDir: ".next.nosync",
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
