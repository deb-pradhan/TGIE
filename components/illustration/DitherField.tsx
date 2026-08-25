"use client";

import { useEffect, useRef } from "react";

/**
 * Ordered-dither wave field, adapted to the TGIE green collage.
 * Dependency-free: a low-res canvas quantized with a 4×4 Bayer matrix and
 * upscaled with `image-rendering: pixelated` — the same chunky-pixel register
 * as PixelBackdrop. Sits behind the footer wordmark. Honors reduced motion.
 *
 * Palette is a tight green ramp (deep → mid, echoing the source waveColor
 * rgb(35,102,79)) so it reads as a subtle moving texture, not a distraction.
 */

const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const RAMP = ["#0b2c23", "#143a2e", "#1b4d3f", "#23664f"];

const PIXEL = 6; // chunky pixel size
const SPEED = 0.028;
const FREQ = 0.09;
const AMP = 0.9;

export function DitherField({
  className,
  interactive = true,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ramp = RAMP.map((hex) => [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ]);

    let cols = 0;
    let rows = 0;
    let t = 0;
    let raf = 0;

    // eased pointer in cell space (-1 = inactive)
    let mx = -1;
    let my = -1;
    let tmx = -1;
    let tmy = -1;

    function resize() {
      const rect = parent!.getBoundingClientRect();
      cols = Math.max(1, Math.ceil(rect.width / PIXEL));
      rows = Math.max(1, Math.ceil(rect.height / PIXEL));
      canvas!.width = cols;
      canvas!.height = rows;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
    }

    function draw() {
      const image = ctx!.createImageData(cols, rows);
      const d = image.data;

      // ease pointer
      if (mx < 0 && tmx >= 0) {
        mx = tmx;
        my = tmy;
      } else if (tmx < 0) {
        mx = -1;
      } else {
        mx += (tmx - mx) * 0.15;
        my += (tmy - my) * 0.15;
      }
      const radius = cols * 0.28;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let v =
            Math.sin(x * FREQ + t) * 0.5 +
            Math.sin(y * FREQ * 0.8 - t * 0.7) * 0.3 +
            Math.sin((x + y) * FREQ * 0.5 + t * 0.4) * 0.2;
          v = ((v + 1) / 2) * AMP;

          if (mx >= 0) {
            const dx = x - mx;
            const dy = y - my;
            const dist = Math.hypot(dx, dy);
            if (dist < radius) {
              const falloff = 1 - dist / radius;
              v += falloff * falloff * 0.35 * Math.sin(dist * 0.35 - t * 3);
            }
          }
          v = Math.max(0, Math.min(1, v));

          const thr = (BAYER4[y & 3][x & 3] + 0.5) / 16;
          const scaled = v * (ramp.length - 1);
          const base = Math.floor(scaled);
          const frac = scaled - base;
          let level = base + (frac > thr ? 1 : 0);
          if (level < 0) level = 0;
          if (level > ramp.length - 1) level = ramp.length - 1;

          const c = ramp[level];
          const idx = (y * cols + x) * 4;
          d[idx] = c[0];
          d[idx + 1] = c[1];
          d[idx + 2] = c[2];
          d[idx + 3] = 255;
        }
      }
      ctx!.putImageData(image, 0, 0);
    }

    let visible = true;

    function loop() {
      if (!visible) {
        raf = 0;
        return;
      }
      t += SPEED;
      draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    // The parent cell can still be 0×0 (or under-sized) at effect mount time
    // on a fresh first paint — re-run on the next frame once layout has settled
    // so the buffer catches up to the cell's real size before first draw.
    requestAnimationFrame(resize);
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // pause the animation while the cell is off-screen (many instances)
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduce && raf === 0) loop();
      },
      { threshold: 0 },
    );
    io.observe(parent);

    let onMove: ((e: PointerEvent) => void) | undefined;
    let onLeave: (() => void) | undefined;
    if (interactive && !reduce) {
      onMove = (e: PointerEvent) => {
        const rect = parent.getBoundingClientRect();
        tmx = (e.clientX - rect.left) / PIXEL;
        tmy = (e.clientY - rect.top) / PIXEL;
      };
      onLeave = () => {
        tmx = -1;
        tmy = -1;
      };
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
    }

    if (reduce) {
      draw();
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (onMove) parent.removeEventListener("pointermove", onMove);
      if (onLeave) parent.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
