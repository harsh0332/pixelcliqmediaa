import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;

// The palette, restated as literals. This route renders outside the document,
// so there is no stylesheet and no CSS custom properties to read from.
const BONE = "#f7f5f0";
const INK = "#14151a";
const INK_MUTED = "#65666d";
const LINE = "#e2ddd3";
const ACCENT = "#2c4bff";

/**
 * Clash Display, if a satori-readable file exists.
 *
 * Satori reads TTF, OTF and WOFF — but not WOFF2, which is the only format
 * `public/fonts` currently ships, because woff2 stores a transformed `glyf`
 * table that needs a full decoder to reconstruct. Rather than add a
 * decompression dependency or silently ship a share card in the wrong
 * typeface, this looks for a TTF/OTF and reports honestly when there is none:
 * the card still renders, in the platform's default sans.
 *
 * To switch the card to brand type, drop `ClashDisplay-Semibold.otf` (or
 * `.ttf`) into `public/fonts` — the same Fontshare download the woff2 files
 * came from includes both.
 */
async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  const dir = path.join(process.cwd(), "public", "fonts");
  for (const name of [
    "ClashDisplay-Semibold.otf",
    "ClashDisplay-Semibold.ttf",
    "ClashDisplay-Medium.otf",
    "ClashDisplay-Medium.ttf",
  ]) {
    try {
      const buf = await readFile(path.join(dir, name));
      return Uint8Array.from(buf).buffer;
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? site.tagline).slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") ?? "").slice(0, 60);

  const display = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BONE,
          padding: "72px 80px",
          fontFamily: display ? "Clash Display" : "sans-serif",
        }}
      >
        {/* Wordmark, and the eyebrow that says which page this is. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            letterSpacing: "0.02em",
            color: INK,
          }}
        >
          <span>{site.name}</span>
          {eyebrow ? (
            <span
              style={{
                fontSize: 20,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: INK_MUTED,
              }}
            >
              {eyebrow}
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* The accent rule: short, heavy, and the only colour on the card. */}
          <div
            style={{
              width: 96,
              height: 4,
              background: ACCENT,
              marginBottom: 36,
            }}
          />
          <div
            style={{
              fontSize: title.length > 64 ? 60 : 76,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: INK,
              maxWidth: 940,
            }}
          >
            {title}
          </div>
        </div>

        {/* Hairline, then the location line. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: "100%", height: 1, background: LINE }} />
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 20,
              letterSpacing: "0.02em",
              color: INK_MUTED,
            }}
          >
            {site.location}
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      // Omitted entirely rather than passed empty: satori throws
      // "No fonts are loaded" on `[]`, but falls back to its own bundled
      // font when the key is absent.
      ...(display
        ? {
            fonts: [
              {
                name: "Clash Display",
                data: display,
                weight: 600 as const,
                style: "normal" as const,
              },
            ],
          }
        : {}),
    },
  );
}
