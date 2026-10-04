import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * The touch icon, drawn with the same geometry as icon.svg.
 *
 * iOS composites this onto the home screen without any padding of its own, so
 * the mark carries its own margin and a full-bleed background — a transparent
 * or tightly-cropped icon looks broken beside every other app.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <svg width="136" height="136" viewBox="0 0 48 48" fill="#0a6fd0"><rect x="4" y="4" width="18" height="18" rx="2"/><path d="M26 4h6a12 12 0 0 1 12 12v6H26Z"/><path d="M4 26h18v18h-6A12 12 0 0 1 4 32Z"/><rect x="26" y="26" width="18" height="18" rx="2" fill="#082f57"/></svg>
      </div>
    ),
    size,
  );
}
