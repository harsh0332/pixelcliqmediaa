import styles from "./PixelFourOhFour.module.css";

// 3×5 bitmaps for each glyph, read row by row.
const GLYPHS: Record<string, string> = {
  "4": "101101111001001",
  "0": "111101101101111",
};

/**
 * "404" assembled from the logo's own square pixels. They drift in from
 * scattered positions and settle; one pixel never arrives and keeps blinking
 * where it should be.
 */
export function PixelFourOhFour() {
  let n = 0;
  return (
    <div className={styles.word} aria-hidden="true">
      {"404".split("").map((ch, g) => (
        <div key={g} className={styles.glyph}>
          {GLYPHS[ch]!.split("").map((bit, i) => {
            if (bit === "0") return <i key={i} className={styles.empty} />;
            const k = n++;
            // Deterministic scatter, so server and client render the same thing.
            const dx = ((k * 73) % 17) - 8;
            const dy = ((k * 41) % 13) - 6;
            const missing = g === 1 && i === 8;
            return (
              <i
                key={i}
                className={missing ? styles.missing : styles.cell}
                style={{ ["--dx" as string]: dx, ["--dy" as string]: dy, ["--k" as string]: k }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
