import { makeIso } from "../kit";

/**
 * home2 iso helpers: kit.makeIso plus SVG matrices that lay a flat 2D drawing
 * (rects, circles, text) onto an isometric plane, so details stay simple.
 * Local units = world units. Use vectorEffect="non-scaling-stroke" on strokes.
 */
export function iso(ox: number, oy: number, k = 24, hz = 16) {
  const b = makeIso(ox, oy, k, hz);
  const f = (n: number) => n.toFixed(2);
  return {
    ...b,
    k,
    hz,
    /** ground / horizontal plane at height z: u = x, v = y */
    top: (z = 0) => {
      const [e, g] = b.proj(0, 0, z);
      return `matrix(${f(k)} ${f(k / 2)} ${f(-k)} ${f(k / 2)} ${f(e)} ${f(g)})`;
    },
    /** vertical plane y = y0 (faces front-left): u = x, v = down from ztop */
    front: (y0: number, ztop: number) => {
      const [e, g] = b.proj(0, y0, ztop);
      return `matrix(${f(k)} ${f(k / 2)} 0 ${f(hz)} ${f(e)} ${f(g)})`;
    },
  };
}

export type IsoKit = ReturnType<typeof iso>;
