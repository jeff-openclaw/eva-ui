import { Hex, Point, Orientation } from '../../utils/hexTypes';
/** Props for the HexGrid component. */
export interface HexGridProps {
    /** Hex circumradius in px (center to vertex). */
    cellSize: number;
    /** Gap between hex cells in px. Default: 0. */
    gap?: number;
    /** Number of columns. */
    cols: number;
    /** Number of rows. */
    rows: number;
    /** Orientation. Default: POINTY. */
    orientation?: Orientation;
    /** CSS class for the container. */
    className?: string;
    /** Inline styles for the container. */
    style?: React.CSSProperties;
    /** Render function for each hex cell. Return null to skip. */
    renderCell?: (hex: Hex, pixelCenter: Point) => React.ReactNode | null;
    /** Called when a hex cell is clicked. */
    onCellClick?: (hex: Hex, event: React.MouseEvent) => void;
    /** Called when mouse enters a hex cell. */
    onCellHover?: (hex: Hex | null, event: React.MouseEvent) => void;
    /** Set of hex keys ("q,r") to highlight as active. */
    activeCells?: ReadonlySet<string>;
    /** Whether to render decorative background hexes. Default: true. */
    showBackground?: boolean;
    /** Enable CRT scanline overlay. Default: false. */
    scanlines?: boolean;
}
/**
 * Renders an SVG hexagonal grid with optional content cells.
 * Uses pointy-top orientation by default with the Eva-UI color tokens.
 */
export declare function HexGrid({ cellSize, gap, cols, rows, orientation, className, style, renderCell, onCellClick, onCellHover, activeCells, showBackground, scanlines, }: HexGridProps): React.JSX.Element;
//# sourceMappingURL=HexGrid.d.ts.map