/** Axial hex coordinate. s = -q - r (computed on demand). */
export interface Hex {
    readonly q: number;
    readonly r: number;
}
/** Fractional hex coordinate (result of pixel-to-hex before rounding). */
export interface FractionalHex {
    readonly q: number;
    readonly r: number;
    readonly s: number;
}
/** 2D pixel/screen coordinate. */
export interface Point {
    readonly x: number;
    readonly y: number;
}
/** Orientation matrices for hex ↔ pixel conversion. */
export interface Orientation {
    readonly f0: number;
    readonly f1: number;
    readonly f2: number;
    readonly f3: number;
    readonly b0: number;
    readonly b1: number;
    readonly b2: number;
    readonly b3: number;
    readonly startAngle: number;
}
/** Layout config: size, origin, and orientation. */
export interface HexLayout {
    readonly size: number;
    readonly origin: Point;
    readonly orientation: Orientation;
}
//# sourceMappingURL=hexTypes.d.ts.map