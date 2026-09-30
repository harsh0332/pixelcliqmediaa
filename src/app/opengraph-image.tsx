import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const alt = "Pixelcliq Media — Where D2C Brands Compound";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F7F5F0",
          backgroundImage: "radial-gradient(#E2DDD3 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                backgroundColor: "#14151A",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2C4BFF",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              P
            </div>
            <span
              style={{
                fontSize: "26px",
                fontWeight: "700",
                letterSpacing: "-0.02em",
                color: "#14151A",
              }}
            >
              {site.name}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "#EAEDFF",
              border: "1px solid #2C4BFF",
              color: "#2C4BFF",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#2C4BFF",
              }}
            />
            <span>D2C Growth Architecture</span>
          </div>
        </div>

        {/* Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              width: "72px",
              height: "4px",
              backgroundColor: "#2C4BFF",
              borderRadius: "2px",
            }}
          />
          {/* Satori requires an explicit display on any box with more than
              one child. Two spans in a wrapping flex row, spaced by a gap, so
              the italic word can still fall to a second line if it must. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "18px",
              fontSize: "64px",
              fontWeight: "800",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              color: "#14151A",
              maxWidth: "1000px",
            }}
          >
            <span>Where D2C Brands</span>
            <span style={{ color: "#2C4BFF", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
              Compound.
            </span>
          </div>
          <div
            style={{
              fontSize: "22px",
              lineHeight: "1.4",
              color: "#54555B",
              maxWidth: "920px",
            }}
          >
            {site.supportLine}
          </div>
        </div>

        {/* Bottom Footer Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid #E2DDD3",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px", color: "#54555B", fontSize: "16px", fontWeight: "500" }}>
            <span>Creative</span>
            <span>·</span>
            <span>Paid Media</span>
            <span>·</span>
            <span>Shopify</span>
            <span>·</span>
            <span>Retention</span>
            <span>·</span>
            <span>Automation</span>
          </div>
          <div style={{ fontSize: "15px", fontWeight: "600", color: "#14151A", letterSpacing: "0.02em" }}>
            {site.location}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
