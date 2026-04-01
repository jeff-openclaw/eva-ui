/** Props for the ScanlineOverlay component. */
export interface ScanlineOverlayProps {
    /** Scanline height/spacing in px. @default 2 */
    lineHeight?: number;
    /** Scanline opacity (0-1). @default 0.05 */
    opacity?: number;
    /** Animate scanlines (slow downward drift). @default false */
    animated?: boolean;
    /** Enable subtle flicker effect. @default false */
    flicker?: boolean;
    /** Cover entire viewport (position: fixed) vs parent (position: absolute). @default false */
    fixed?: boolean;
    /** CSS class. */
    className?: string;
}
/**
 * CRT scanline effect rendered as a semi-transparent overlay.
 * Apply over the hex grid or individual panels for atmosphere.
 */
export declare function ScanlineOverlay({ lineHeight, opacity, animated, flicker, fixed, className, }: ScanlineOverlayProps): React.JSX.Element;
//# sourceMappingURL=ScanlineOverlay.d.ts.map