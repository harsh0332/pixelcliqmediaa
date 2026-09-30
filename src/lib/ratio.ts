import type { AspectRatio } from "@/types";

/**
 * The single source of truth for aspect ratios.
 *
 * Every frame derives its box from the asset's own declared ratio, so a frame
 * can never disagree with what it holds. This exists because the most damaging
 * failure found in the competitor audit was a 9:16 reel rendered into a 2:3
 * frame with object-fit: cover — roughly 11% sheared off the top and bottom,
 * which is exactly where the hook, the captions and the call to action live.
 *
 * `object-fit: cover` is safe only when the frame ratio equals the asset ratio,
 * which is the only arrangement this map can produce.
 */
export const RATIO_CSS: Record<AspectRatio, string> = {
  "4:5": "4 / 5",
  "9:16": "9 / 16",
  "16:9": "16 / 9",
  "1:1": "1 / 1",
};

/** Intrinsic pixel dimensions per ratio, for reserving space before load. */
export const RATIO_SIZE: Record<AspectRatio, { width: number; height: number }> = {
  "4:5": { width: 1024, height: 1280 },
  "9:16": { width: 720, height: 1280 },
  "16:9": { width: 1280, height: 720 },
  "1:1": { width: 1080, height: 1080 },
};
