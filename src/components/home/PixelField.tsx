"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { homeContent } from "@/content/refinedHome";
import styles from "./PixelField.module.css";

/**
 * The hero's living backdrop: the field is a grid of pixels.
 *
 * - The grid is barely there until a soft spotlight passes over it. The light
 *   follows the cursor; without one it drifts on its own.
 * - The cursor lights the pixels it passes; they cool off behind it. A click
 *   (or tap) sends a ring of pixels out from that point.
 * - On wide screens, campaign work floats in the grid at different depths.
 *   Each piece resolves from coarse pixels to sharp, then trades places with
 *   the next piece the same way, and drifts with the cursor and the scroll.
 *
 * Everything is drawn on one canvas, paused when the hero is off screen or
 * the tab is hidden. Reduced motion gets one still frame.
 */

type Tile = {
  slot: number; // index in LAYOUT, so state survives a re-layout
  c: number; // column; negative counts from the right edge
  r: number; // row from the top of the hero
  size: number; // in cells
  depth: number; // parallax weight
  img: number;
  phase: "wait" | "in" | "idle" | "out";
  t0: number;
  x: number;
  y: number;
  w: number;
  dx: number; // current drawn offset, for hit testing
  dy: number;
};

// Tiles flank the centred statement in an 18-column field.
const LAYOUT: Pick<Tile, "c" | "r" | "size" | "depth">[] = [
  { c: 1, r: 2, size: 2, depth: 1.2 },
  { c: 2, r: 5, size: 2, depth: 0.8 },
  { c: 1, r: 7, size: 1, depth: 1.5 },
  { c: -3, r: 2, size: 2, depth: 0.9 },
  { c: -4, r: 6, size: 2, depth: 1.3 },
  { c: -2, r: 5, size: 1, depth: 0.6 },
];
const LEVELS = [3, 6, 12, 24, 48];
const RESOLVE = 760; // ms for coarse → sharp
const DISSOLVE = 420; // ms for sharp → coarse
const SWAP_EVERY = 2600;

export function PixelField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pool = homeContent.hero.pixels.map((name) => {
      const img = new Image();
      img.decoding = "async";
      img.src = `/images/showcase/thumbs/${name}.webp`;
      return img;
    });
    const make = () => {
      const c = document.createElement("canvas");
      return [c, c.getContext("2d")!] as const;
    };
    const [mosaic, mctx] = make();
    const [grid, gctx] = make(); // faint grid, always drawn
    const [bright, bctx] = make(); // bright grid, seen only under the light
    const [spot, sctx] = make(); // scratch for the masked spotlight
    const shadows = new Map<number, HTMLCanvasElement>();

    let W = 0, H = 0, dpr = 1, s = 64, cols = 0, rows = 0, bound = 0, R = 240;
    let heat = new Float32Array(0);
    // 0 = cursor trail, 1 = lime spark, 2 = ripple ring (cools fastest).
    let kind = new Uint8Array(0);
    let tiles: Tile[] = [];
    const ripples: { x: number; y: number; t0: number }[] = [];
    const pointer = { x: 0, y: 0, inside: false };
    const light = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 }; // eased pointer, -0.5..0.5
    let hovered = -1;
    let raf = 0, running = false, last = 0, lastSpark = 0, lastSwap = 0, lastExit = "";
    const start = performance.now();

    function drawGrid(target: CanvasRenderingContext2D, top: string, mid: string, bottom: string) {
      target.setTransform(dpr, 0, 0, dpr, 0, 0);
      target.clearRect(0, 0, W, H);
      const stroke = target.createLinearGradient(0, 0, 0, H);
      stroke.addColorStop(0, top);
      stroke.addColorStop(0.55, mid);
      stroke.addColorStop(1, bottom);
      target.strokeStyle = stroke;
      target.lineWidth = 1;
      target.beginPath();
      for (let i = 0; i <= cols; i++) { const x = Math.round(i * s) + 0.5; target.moveTo(x, 0); target.lineTo(x, H); }
      for (let j = 0; j <= rows; j++) { const y = Math.round(j * s) + 0.5; target.moveTo(0, y); target.lineTo(W, y); }
      target.stroke();
    }

    /** A soft drop shadow, blurred once per tile size rather than per frame. */
    function shadowFor(w: number) {
      const key = Math.round(w);
      const cached = shadows.get(key);
      if (cached) return cached;
      const pad = 60;
      const c = document.createElement("canvas");
      c.width = (key + pad * 2) * dpr;
      c.height = (key + pad * 2) * dpr;
      const x = c.getContext("2d")!;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      x.shadowColor = "rgba(8,47,87,0.38)";
      x.shadowBlur = 36;
      x.shadowOffsetY = 18;
      x.fillStyle = "rgba(8,47,87,0.5)";
      x.beginPath();
      x.roundRect(pad + 6, pad + 6, key - 12, key - 12, 14);
      x.fill();
      shadows.set(key, c);
      return c;
    }

    function layout() {
      const box = host!.getBoundingClientRect();
      W = box.width;
      H = box.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [canvas!, grid, bright]) {
        c.width = Math.round(W * dpr);
        c.height = Math.round(H * dpr);
      }
      s = W >= 1000 ? W / 18 : W >= 600 ? W / 12 : W / 8;
      R = Math.max(170, Math.min(320, W * 0.2));
      spot.width = spot.height = Math.ceil(R * 2 * dpr);
      cols = Math.ceil(W / s);
      rows = Math.ceil(H / s);
      heat = new Float32Array(cols * rows);
      kind = new Uint8Array(cols * rows);
      shadows.clear();
      const stage = host!.querySelector<HTMLElement>("[data-pixel-bound]");
      bound = stage ? stage.getBoundingClientRect().bottom - box.top : H * 0.7;
      if (!light.x) { light.x = W * 0.62; light.y = bound * 0.42; }

      drawGrid(gctx, "rgba(255,255,255,0.075)", "rgba(255,255,255,0.05)", "rgba(8,47,87,0.03)");
      drawGrid(bctx, "rgba(255,255,255,0.5)", "rgba(255,255,255,0.32)", "rgba(8,47,87,0.14)");

      const previous = tiles;
      tiles = W < 1000 ? [] : LAYOUT.flatMap((spec, index) => {
        const col = spec.c < 0 ? cols + spec.c : spec.c;
        const x = col * s, y = spec.r * s, w = spec.size * s;
        if (y + w > bound - s * 0.5) return [];
        const kept = previous.find((tile) => tile.slot === index);
        return [{
          ...spec, slot: index, x, y, w, dx: 0, dy: 0,
          img: kept?.img ?? index,
          phase: kept?.phase ?? (reduced ? "idle" : "wait"),
          t0: kept?.t0 ?? start + 500 + index * 220,
        }];
      });
    }

    const cellAt = (x: number, y: number) => {
      const c = Math.floor(x / s), r = Math.floor(y / s);
      return c < 0 || r < 0 || c >= cols || r >= rows ? -1 : r * cols + c;
    };
    const tileAt = (x: number, y: number) =>
      tiles.findIndex((t) => x >= t.x + t.dx && x < t.x + t.dx + t.w && y >= t.y + t.dy && y < t.y + t.dy + t.w);

    function warm(x: number, y: number, amount: number, radius: number) {
      const c0 = Math.floor(x / s), r0 = Math.floor(y / s);
      const reach = Math.ceil(radius);
      for (let dr = -reach; dr <= reach; dr++) {
        for (let dc = -reach; dc <= reach; dc++) {
          const c = c0 + dc, r = r0 + dr;
          if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
          const d = Math.hypot(dc, dr);
          if (d > radius) continue;
          const i = r * cols + c;
          heat[i] = Math.max(heat[i]!, amount * (1 - d / (radius + 1)));
          kind[i] = 0;
        }
      }
    }

    let cursor = 0;
    function nextImage() {
      const shown = new Set(tiles.map((t) => t.img % pool.length));
      for (let k = 0; k < pool.length; k++) {
        cursor = (cursor + 1) % pool.length;
        if (!shown.has(cursor)) return cursor;
      }
      return cursor;
    }

    function drawTile(t: Tile, index: number, now: number, scroll: number) {
      const img = pool[t.img % pool.length]!;
      if (!img.complete || !img.naturalWidth || t.phase === "wait") return;
      let res = 0; // 0 means sharp
      if (t.phase === "in") {
        const p = (now - t.t0) / RESOLVE;
        if (p >= 1) t.phase = "idle";
        else res = LEVELS[Math.min(LEVELS.length - 1, Math.floor(p * LEVELS.length))]!;
      } else if (t.phase === "out") {
        const p = (now - t.t0) / DISSOLVE;
        if (p >= 1) {
          t.img = nextImage();
          t.phase = "in";
          t.t0 = now;
          res = LEVELS[0]!;
        } else {
          res = LEVELS[Math.max(0, LEVELS.length - 1 - Math.floor(p * LEVELS.length))]!;
        }
      }
      // Depth: tiles lean away from the cursor and lift with the scroll.
      t.dx = -tilt.x * 22 * t.depth;
      t.dy = -tilt.y * 16 * t.depth - scroll * 110 * t.depth;
      const lift = index === hovered ? s * 0.05 : 0;
      const x = t.x + t.dx + 1 - lift, y = t.y + t.dy + 1 - lift, w = t.w - 1 + lift * 2;
      const radius = Math.min(16, s * 0.16);

      ctx!.drawImage(shadowFor(w), x - 60, y - 60, w + 120, w + 120);
      ctx!.save();
      ctx!.beginPath();
      ctx!.roundRect(x, y, w, w, radius);
      ctx!.clip();
      if (res) {
        mosaic.width = res;
        mosaic.height = res;
        mctx.imageSmoothingEnabled = true;
        mctx.drawImage(img, 0, 0, res, res);
        ctx!.imageSmoothingEnabled = false;
        ctx!.drawImage(mosaic, 0, 0, res, res, x, y, w, w);
      } else {
        ctx!.imageSmoothingEnabled = true;
        ctx!.drawImage(img, x, y, w, w);
      }
      ctx!.restore();
      ctx!.strokeStyle = index === hovered ? "rgba(214,240,110,0.95)" : "rgba(255,255,255,0.4)";
      ctx!.lineWidth = index === hovered ? 2 : 1;
      ctx!.beginPath();
      ctx!.roundRect(x + 0.5, y + 0.5, w - 1, w - 1, radius);
      ctx!.stroke();
    }

    function frame(now: number) {
      const dt = Math.min(64, now - (last || now));
      last = now;
      const step = dt / 16.7;
      const decays = [Math.pow(0.955, step), Math.pow(0.95, step), Math.pow(0.84, step)];
      const ease = 1 - Math.pow(0.9, step);
      const box = host!.getBoundingClientRect();
      const scroll = Math.max(0, Math.min(1, -box.top / Math.max(1, bound)));
      const exit = scroll.toFixed(3);
      if (exit !== lastExit) { lastExit = exit; host!.style.setProperty("--hero-exit", exit); }

      // The light follows the cursor, or drifts slowly on its own.
      const t = (now - start) / 1000;
      const goal = pointer.inside
        ? pointer
        : { x: W * (0.5 + 0.3 * Math.sin(t * 0.23)), y: bound * (0.45 + 0.22 * Math.sin(t * 0.31 + 1)) };
      const follow = pointer.inside ? ease * 1.6 : ease * 0.35;
      light.x += (goal.x - light.x) * follow;
      light.y += (goal.y - light.y) * follow;
      tilt.x += ((pointer.inside ? pointer.x / W - 0.5 : 0) - tilt.x) * ease * 0.6;
      tilt.y += ((pointer.inside ? pointer.y / H - 0.5 : 0) - tilt.y) * ease * 0.6;

      // Ambient sparks inside the statement area.
      if (!reduced && now - lastSpark > (W < 760 ? 240 : 170)) {
        lastSpark = now;
        const i = cellAt(Math.random() * W, Math.random() * bound);
        if (i >= 0 && heat[i]! < 0.2) { heat[i] = Math.random() < 0.3 ? 0.7 : 0.4; kind[i] = heat[i]! > 0.6 ? 1 : 0; }
      }
      // Ripples: a ring of pixels moving out from each click.
      for (let k = ripples.length - 1; k >= 0; k--) {
        const rp = ripples[k]!;
        const radius = ((now - rp.t0) / 1000) * s * 9;
        if (radius > Math.hypot(W, H)) { ripples.splice(k, 1); continue; }
        const band = s * 0.55;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const d = Math.hypot((c + 0.5) * s - rp.x, (r + 0.5) * s - rp.y);
            if (Math.abs(d - radius) < band) {
              const i = r * cols + c;
              const strength = 0.85 * Math.max(0, 1 - radius / (W * 0.75));
              if (strength > heat[i]!) { heat[i] = strength; kind[i] = 2; }
            }
          }
        }
      }
      // Tile swaps, one at a time.
      if (!reduced && tiles.length && now - lastSwap > SWAP_EVERY && now - start > 3000) {
        lastSwap = now;
        const idle = tiles.filter((tile, index) => tile.phase === "idle" && index !== hovered);
        const pick = idle[Math.floor(Math.random() * idle.length)];
        if (pick) { pick.phase = "out"; pick.t0 = now; }
      }
      for (const tile of tiles) if (tile.phase === "wait" && now >= tile.t0) tile.phase = "in";

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);

      // Soft light, then the bright grid revealed only inside it.
      const glow = ctx!.createRadialGradient(light.x, light.y, 0, light.x, light.y, R * 1.3);
      glow.addColorStop(0, "rgba(255,255,255,0.13)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(light.x - R * 1.3, light.y - R * 1.3, R * 2.6, R * 2.6);
      ctx!.drawImage(grid, 0, 0, W, H);
      sctx.setTransform(1, 0, 0, 1, 0, 0);
      sctx.globalCompositeOperation = "source-over";
      sctx.clearRect(0, 0, spot.width, spot.height);
      sctx.drawImage(bright, (light.x - R) * dpr, (light.y - R) * dpr, spot.width, spot.height, 0, 0, spot.width, spot.height);
      sctx.globalCompositeOperation = "destination-in";
      const mask = sctx.createRadialGradient(spot.width / 2, spot.height / 2, 0, spot.width / 2, spot.height / 2, spot.width / 2);
      mask.addColorStop(0, "rgba(0,0,0,1)");
      mask.addColorStop(0.55, "rgba(0,0,0,0.45)");
      mask.addColorStop(1, "rgba(0,0,0,0)");
      sctx.fillStyle = mask;
      sctx.fillRect(0, 0, spot.width, spot.height);
      ctx!.drawImage(spot, light.x - R, light.y - R, R * 2, R * 2);

      for (let i = 0; i < heat.length; i++) {
        const h = heat[i]!;
        if (h < 0.01) continue;
        const x = (i % cols) * s, y = Math.floor(i / cols) * s;
        const upper = y < H * 0.6;
        const k = kind[i]!;
        ctx!.fillStyle = k === 1
          ? `rgba(214,240,110,${h * 0.42})`
          : upper ? `rgba(255,255,255,${h * (k === 2 ? 0.18 : 0.22)})` : `rgba(8,47,87,${h * 0.06})`;
        ctx!.fillRect(Math.round(x) + 1, Math.round(y) + 1, Math.round(s) - 1, Math.round(s) - 1);
        if (h > 0.45 && k !== 1 && upper) {
          ctx!.strokeStyle = `rgba(255,255,255,${Math.min(0.7, (h - 0.45) * 1.3)})`;
          ctx!.strokeRect(Math.round(x) + 1.5, Math.round(y) + 1.5, Math.round(s) - 2, Math.round(s) - 2);
        }
        heat[i] = h * decays[k]!;
      }
      tiles.forEach((tile, index) => drawTile(tile, index, now, scroll));

      if (running) raf = requestAnimationFrame(frame);
    }

    function play() {
      if (running || reduced) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const local = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const onMove = (event: PointerEvent) => {
      const { x, y } = local(event);
      if (event.pointerType === "mouse") {
        pointer.x = x;
        pointer.y = y;
        pointer.inside = true;
        warm(x, y, 1, 1.4);
      }
      const over = tileAt(x, y);
      if (over !== hovered) {
        hovered = over;
        host.style.cursor = over >= 0 ? "pointer" : "";
      }
    };
    const onLeave = () => {
      pointer.inside = false;
      hovered = -1;
      host.style.cursor = "";
    };
    const onDown = (event: PointerEvent) => {
      if ((event.target as Element).closest("a, button, input, video")) return;
      const { x, y } = local(event);
      if (tileAt(x, y) >= 0) { router.push("/creative-showcase"); return; }
      if (!reduced) ripples.push({ x, y, t0: performance.now() });
    };

    layout();
    if (reduced) {
      // One still frame once the work has loaded.
      Promise.all(pool.slice(0, tiles.length).map((img) => img.decode().catch(() => {}))).then(() => frame(performance.now()));
    }
    const resize = new ResizeObserver(() => { layout(); if (reduced) frame(performance.now()); });
    resize.observe(host);
    const seen = new IntersectionObserver(([entry]) => (entry?.isIntersecting && !document.hidden ? play() : stop()));
    seen.observe(host);
    const onVisibility = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVisibility);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);

    return () => {
      stop();
      resize.disconnect();
      seen.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, [router]);

  return <canvas ref={canvasRef} className={styles.field} aria-hidden="true" />;
}
