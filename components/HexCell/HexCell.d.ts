/** Visual state of a hex cell. */
export type HexCellState = 'default' | 'active' | 'hover' | 'disabled' | 'warning';
/** Named size presets for HexCell. */
export type HexCellSize = 'sm' | 'md' | 'lg' | 'xl';
/** Resolve a size prop to a numeric multiplier. */
export declare function resolveHexCellSize(size: HexCellSize | number | undefined): number;
/** Props for the HexCell component. */
export interface HexCellProps {
    /** Column position in offset coordinates (0-indexed). */
    col: number;
    /** Row position in offset coordinates (0-indexed). */
    row: number;
    /** Number of hex cells to span horizontally. @default 1 */
    colSpan?: number;
    /** Number of hex cells to span vertically. @default 1 */
    rowSpan?: number;
    /** Size multiplier — named preset or numeric. @default 'md' */
    size?: HexCellSize | number;
    /** Visual state. @default 'default' */
    state?: HexCellState;
    /** Clip content to hex shape. @default true */
    clipped?: boolean;
    /** Make cell interactive (clickable, focusable). @default false */
    interactive?: boolean;
    /** Click handler (only when interactive). */
    onClick?: (col: number, row: number) => void;
    /** Show hex border. @default true */
    showBorder?: boolean;
    /** CSS class. */
    className?: string;
    /** Cell content. */
    children?: React.ReactNode;
}
/**
 * Individual hex cell wrapper for placing content within the HexDashboard grid.
 * Handles hex-shaped clipping, state styling, and interactivity.
 *
 * Note: HexCell does NOT position itself. HexDashboard reads col/row props
 * and applies absolute positioning via the layout engine.
 */
export declare function HexCell({ col, row, colSpan, rowSpan, size, state, clipped, interactive, onClick, showBorder, className, children, }: HexCellProps): React.JSX.Element;
//# sourceMappingURL=HexCell.d.ts.map