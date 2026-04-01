import { Hex, FractionalHex, Point, Orientation, HexLayout } from './hexTypes';
/** Precomputed √3 */
export declare const SQRT3: number;
/** Pointy-top orientation matrices */
export declare const POINTY: Orientation;
/** Flat-top orientation matrices */
export declare const FLAT: Orientation;
/** Create a hex coordinate. */
export declare function hex(q: number, r: number): Hex;
/** Add two hex coordinates. */
export declare function hexAdd(a: Hex, b: Hex): Hex;
/** Subtract hex b from hex a. */
export declare function hexSubtract(a: Hex, b: Hex): Hex;
/** Scale a hex coordinate by factor k. */
export declare function hexScale(h: Hex, k: number): Hex;
/** Check if two hex coordinates are equal. */
export declare function hexEqual(a: Hex, b: Hex): boolean;
/** Manhattan length of a hex coordinate (distance from origin). */
export declare function hexLength(h: Hex): number;
/** Distance between two hex coordinates. */
export declare function hexDistance(a: Hex, b: Hex): number;
/** Get direction vector for direction 0–5. */
export declare function hexDirection(dir: number): Hex;
/** Get the neighbor of hex h in direction dir (0–5). */
export declare function hexNeighbor(h: Hex, dir: number): Hex;
/** Get all 6 neighbors of a hex. */
export declare function hexNeighbors(h: Hex): Hex[];
/** Convert axial hex coordinate to pixel position. */
export declare function hexToPixel(h: Hex, layout: HexLayout): Point;
/** Convert pixel position to fractional hex coordinate. */
export declare function pixelToHex(p: Point, layout: HexLayout): FractionalHex;
/** Round a fractional hex to the nearest integer hex coordinate. */
export declare function hexRound(frac: FractionalHex): Hex;
/** Convert pixel to nearest hex (convenience combo). */
export declare function pixelToHexRounded(p: Point, layout: HexLayout): Hex;
/** Convert odd-r offset coordinates to axial. */
export declare function offsetToAxial(col: number, row: number): Hex;
/** Convert axial to odd-r offset coordinates. */
export declare function axialToOffset(h: Hex): {
    col: number;
    row: number;
};
/** Get the 6 corner pixel positions of a hex. */
export declare function hexCorners(h: Hex, layout: HexLayout): Point[];
/** Get SVG polygon points string for a hex. */
export declare function hexPolygonPoints(h: Hex, layout: HexLayout): string;
/** Get CSS clip-path polygon string for a pointy-top hex. */
export declare function hexClipPath(): string;
/** All hexes within radius steps of center (filled hexagon). */
export declare function hexRange(center: Hex, radius: number): Hex[];
/** Hexes on the ring at exactly radius distance from center. */
export declare function hexRing(center: Hex, radius: number): Hex[];
/** Spiral from center outward to radius. */
export declare function hexSpiral(center: Hex, radius: number): Hex[];
/** Line of hexes from a to b. */
export declare function hexLine(a: Hex, b: Hex): Hex[];
/** Generate a rectangular grid of hexes using odd-r offset layout. */
export declare function hexRectangle(cols: number, rows: number): Hex[];
//# sourceMappingURL=hexGeometry.d.ts.map