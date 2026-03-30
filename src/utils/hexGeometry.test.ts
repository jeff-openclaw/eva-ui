import { describe, it, expect } from 'vitest';
import {
  hex, hexAdd, hexSubtract, hexScale, hexEqual,
  hexLength, hexDistance,
  hexDirection, hexNeighbor, hexNeighbors,
  hexToPixel, pixelToHexRounded, offsetToAxial, axialToOffset,
  hexCorners, hexPolygonPoints,
  hexRange, hexRing, hexLine, hexRectangle,
  POINTY, SQRT3,
} from './hexGeometry';
import type { HexLayout } from './hexTypes';

const layout: HexLayout = { size: 10, origin: { x: 0, y: 0 }, orientation: POINTY };

describe('hex construction & arithmetic', () => {
  it('creates hex', () => {
    expect(hex(1, 2)).toEqual({ q: 1, r: 2 });
  });

  it('adds hexes', () => {
    expect(hexAdd(hex(1, 2), hex(3, 4))).toEqual({ q: 4, r: 6 });
  });

  it('subtracts hexes', () => {
    expect(hexSubtract(hex(3, 4), hex(1, 2))).toEqual({ q: 2, r: 2 });
  });

  it('scales hex', () => {
    expect(hexScale(hex(1, 2), 3)).toEqual({ q: 3, r: 6 });
  });

  it('checks equality', () => {
    expect(hexEqual(hex(1, 2), hex(1, 2))).toBe(true);
    expect(hexEqual(hex(1, 2), hex(2, 1))).toBe(false);
  });
});

describe('measurement', () => {
  it('computes length', () => {
    expect(hexLength(hex(0, 0))).toBe(0);
    expect(hexLength(hex(1, -1))).toBe(1);
    expect(hexLength(hex(2, -1))).toBe(2);
  });

  it('computes distance', () => {
    expect(hexDistance(hex(0, 0), hex(3, -3))).toBe(3);
    expect(hexDistance(hex(1, 1), hex(1, 1))).toBe(0);
  });
});

describe('neighbors', () => {
  it('returns 6 neighbors', () => {
    const n = hexNeighbors(hex(0, 0));
    expect(n).toHaveLength(6);
  });

  it('hexDirection returns correct vectors', () => {
    expect(hexDirection(0)).toEqual({ q: 1, r: 0 });
  });

  it('hexNeighbor returns adjacent hex', () => {
    expect(hexNeighbor(hex(0, 0), 0)).toEqual({ q: 1, r: 0 });
  });
});

describe('coordinate conversion', () => {
  it('hex(0,0) maps to origin', () => {
    const p = hexToPixel(hex(0, 0), layout);
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBeCloseTo(0);
  });

  it('round-trips pixel conversion', () => {
    const original = hex(2, -1);
    const pixel = hexToPixel(original, layout);
    const back = pixelToHexRounded(pixel, layout);
    expect(back).toEqual(original);
  });

  it('converts offset to axial and back', () => {
    const h = offsetToAxial(3, 2);
    const off = axialToOffset(h);
    expect(off).toEqual({ col: 3, row: 2 });
  });
});

describe('rendering helpers', () => {
  it('hexCorners returns 6 points', () => {
    const corners = hexCorners(hex(0, 0), layout);
    expect(corners).toHaveLength(6);
  });

  it('hexPolygonPoints returns comma-separated string', () => {
    const pts = hexPolygonPoints(hex(0, 0), layout);
    expect(pts.split(' ')).toHaveLength(6);
  });
});

describe('generation', () => {
  it('hexRange(0) returns just center', () => {
    expect(hexRange(hex(0, 0), 0)).toEqual([hex(0, 0)]);
  });

  it('hexRange(1) returns 7 hexes', () => {
    expect(hexRange(hex(0, 0), 1)).toHaveLength(7);
  });

  it('hexRing(1) returns 6 hexes', () => {
    expect(hexRing(hex(0, 0), 1)).toHaveLength(6);
  });

  it('hexRing(0) returns center', () => {
    expect(hexRing(hex(0, 0), 0)).toEqual([hex(0, 0)]);
  });

  it('hexLine returns correct length', () => {
    const line = hexLine(hex(0, 0), hex(3, 0));
    expect(line).toHaveLength(4);
  });

  it('hexRectangle generates correct count', () => {
    expect(hexRectangle(4, 3)).toHaveLength(12);
  });
});
