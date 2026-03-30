/**
 * Pure hex geometry functions for pointy-top and flat-top hexagonal grids.
 * Uses axial coordinates (q, r). All functions are stateless and tree-shakeable.
 * Reference: https://www.redblobgames.com/grids/hexagons/
 */

import type { Hex, FractionalHex, Point, Orientation, HexLayout } from './hexTypes';

// ── Constants ──

/** Precomputed √3 */
export const SQRT3 = Math.sqrt(3);

/** Pointy-top orientation matrices */
export const POINTY: Orientation = {
  f0: SQRT3,     f1: SQRT3 / 2, f2: 0,    f3: 3 / 2,
  b0: SQRT3 / 3, b1: -1 / 3,    b2: 0,    b3: 2 / 3,
  startAngle: 0.5,
};

/** Flat-top orientation matrices */
export const FLAT: Orientation = {
  f0: 3 / 2,  f1: 0,    f2: SQRT3 / 2, f3: SQRT3,
  b0: 2 / 3,  b1: 0,    b2: -1 / 3,    b3: SQRT3 / 3,
  startAngle: 0,
};

// ── Direction vectors (pointy-top) ──

const HEX_DIRECTIONS: readonly Hex[] = [
  { q: 1, r: 0 },  { q: 1, r: -1 }, { q: 0, r: -1 },
  { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 },
];

// ── Construction & Arithmetic ──

/** Create a hex coordinate. */
export function hex(q: number, r: number): Hex {
  return { q, r };
}

/** Add two hex coordinates. */
export function hexAdd(a: Hex, b: Hex): Hex {
  return { q: a.q + b.q, r: a.r + b.r };
}

/** Subtract hex b from hex a. */
export function hexSubtract(a: Hex, b: Hex): Hex {
  return { q: a.q - b.q, r: a.r - b.r };
}

/** Scale a hex coordinate by factor k. */
export function hexScale(h: Hex, k: number): Hex {
  return { q: h.q * k, r: h.r * k };
}

/** Check if two hex coordinates are equal. */
export function hexEqual(a: Hex, b: Hex): boolean {
  return a.q === b.q && a.r === b.r;
}

// ── Measurement ──

/** Manhattan length of a hex coordinate (distance from origin). */
export function hexLength(h: Hex): number {
  return (Math.abs(h.q) + Math.abs(h.q + h.r) + Math.abs(h.r)) / 2;
}

/** Distance between two hex coordinates. */
export function hexDistance(a: Hex, b: Hex): number {
  return hexLength(hexSubtract(a, b));
}

// ── Neighbors & Directions ──

/** Get direction vector for direction 0–5. */
export function hexDirection(dir: number): Hex {
  const d = HEX_DIRECTIONS[((dir % 6) + 6) % 6];
  if (!d) throw new Error(`Invalid hex direction: ${dir}`);
  return d;
}

/** Get the neighbor of hex h in direction dir (0–5). */
export function hexNeighbor(h: Hex, dir: number): Hex {
  return hexAdd(h, hexDirection(dir));
}

/** Get all 6 neighbors of a hex. */
export function hexNeighbors(h: Hex): Hex[] {
  return HEX_DIRECTIONS.map(d => hexAdd(h, d));
}

// ── Coordinate Conversion ──

/** Convert axial hex coordinate to pixel position. */
export function hexToPixel(h: Hex, layout: HexLayout): Point {
  const o = layout.orientation;
  const x = (o.f0 * h.q + o.f1 * h.r) * layout.size + layout.origin.x;
  const y = (o.f2 * h.q + o.f3 * h.r) * layout.size + layout.origin.y;
  return { x, y };
}

/** Convert pixel position to fractional hex coordinate. */
export function pixelToHex(p: Point, layout: HexLayout): FractionalHex {
  const o = layout.orientation;
  const pt = {
    x: (p.x - layout.origin.x) / layout.size,
    y: (p.y - layout.origin.y) / layout.size,
  };
  const q = o.b0 * pt.x + o.b1 * pt.y;
  const r = o.b2 * pt.x + o.b3 * pt.y;
  return { q, r, s: -q - r };
}

/** Round a fractional hex to the nearest integer hex coordinate. */
export function hexRound(frac: FractionalHex): Hex {
  let q = Math.round(frac.q);
  let r = Math.round(frac.r);
  const s = Math.round(frac.s);

  const qDiff = Math.abs(q - frac.q);
  const rDiff = Math.abs(r - frac.r);
  const sDiff = Math.abs(s - frac.s);

  if (qDiff > rDiff && qDiff > sDiff) {
    q = -r - s;
  } else if (rDiff > sDiff) {
    r = -q - s;
  }

  return { q, r };
}

/** Convert pixel to nearest hex (convenience combo). */
export function pixelToHexRounded(p: Point, layout: HexLayout): Hex {
  return hexRound(pixelToHex(p, layout));
}

/** Convert odd-r offset coordinates to axial. */
export function offsetToAxial(col: number, row: number): Hex {
  const q = col - Math.floor(row / 2);
  const r = row;
  return { q, r };
}

/** Convert axial to odd-r offset coordinates. */
export function axialToOffset(h: Hex): { col: number; row: number } {
  const col = h.q + Math.floor(h.r / 2);
  const row = h.r;
  return { col, row };
}

// ── Rendering Helpers ──

/** Get the 6 corner pixel positions of a hex. */
export function hexCorners(h: Hex, layout: HexLayout): Point[] {
  const center = hexToPixel(h, layout);
  const corners: Point[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (2 * Math.PI * (i + layout.orientation.startAngle)) / 6;
    corners.push({
      x: center.x + layout.size * Math.cos(angle),
      y: center.y + layout.size * Math.sin(angle),
    });
  }
  return corners;
}

/** Get SVG polygon points string for a hex. */
export function hexPolygonPoints(h: Hex, layout: HexLayout): string {
  return hexCorners(h, layout)
    .map(p => `${p.x},${p.y}`)
    .join(' ');
}

/** Get CSS clip-path polygon string for a pointy-top hex. */
export function hexClipPath(): string {
  return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
}

// ── Generation ──

/** All hexes within radius steps of center (filled hexagon). */
export function hexRange(center: Hex, radius: number): Hex[] {
  const results: Hex[] = [];
  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++) {
      results.push(hexAdd(center, { q, r }));
    }
  }
  return results;
}

/** Hexes on the ring at exactly radius distance from center. */
export function hexRing(center: Hex, radius: number): Hex[] {
  if (radius === 0) return [center];
  const results: Hex[] = [];
  let current = hexAdd(center, hexScale(hexDirection(4), radius));
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < radius; j++) {
      results.push(current);
      current = hexNeighbor(current, i);
    }
  }
  return results;
}

/** Spiral from center outward to radius. */
export function hexSpiral(center: Hex, radius: number): Hex[] {
  const results: Hex[] = [center];
  for (let k = 1; k <= radius; k++) {
    results.push(...hexRing(center, k));
  }
  return results;
}

/** Line of hexes from a to b. */
export function hexLine(a: Hex, b: Hex): Hex[] {
  const dist = hexDistance(a, b);
  if (dist === 0) return [a];

  const results: Hex[] = [];
  for (let i = 0; i <= dist; i++) {
    const t = i / dist;
    const frac: FractionalHex = {
      q: a.q + (b.q - a.q) * t,
      r: a.r + (b.r - a.r) * t,
      s: (-a.q - a.r) + ((-b.q - b.r) - (-a.q - a.r)) * t,
    };
    results.push(hexRound(frac));
  }
  return results;
}

/** Generate a rectangular grid of hexes using odd-r offset layout. */
export function hexRectangle(cols: number, rows: number): Hex[] {
  const results: Hex[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      results.push(offsetToAxial(col, row));
    }
  }
  return results;
}
