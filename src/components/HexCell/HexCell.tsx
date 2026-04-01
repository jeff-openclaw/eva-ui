import { useCallback } from 'react';
import './HexCell.css';

/** Visual state of a hex cell. */
export type HexCellState = 'default' | 'active' | 'hover' | 'disabled' | 'warning';

/** Named size presets for HexCell. */
export type HexCellSize = 'sm' | 'md' | 'lg' | 'xl';

/** Size multiplier lookup. */
const SIZE_MULTIPLIERS: Record<HexCellSize, number> = {
  sm: 0.75,
  md: 1,
  lg: 2,
  xl: 3,
};

/** Resolve a size prop to a numeric multiplier. */
export function resolveHexCellSize(size: HexCellSize | number | undefined): number {
  if (size == null) return 1;
  if (typeof size === 'number') return size;
  return SIZE_MULTIPLIERS[size];
}

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
export function HexCell({
  col,
  row,
  colSpan = 1,
  rowSpan = 1,
  size,
  state = 'default',
  clipped = true,
  interactive = false,
  onClick,
  showBorder = true,
  className,
  children,
}: HexCellProps): React.JSX.Element {
  const isSpanning = colSpan > 1 || rowSpan > 1;
  const multiplier = resolveHexCellSize(size);
  const isSized = multiplier !== 1;

  const handleClick = useCallback(() => {
    if (interactive && onClick) onClick(col, row);
  }, [interactive, onClick, col, row]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick(col, row);
      }
    },
    [interactive, onClick, col, row],
  );

  const isDisabled = state === 'disabled';
  const isInteractive = interactive && !isDisabled;

  const sizeClass = typeof size === 'string'
    ? `eva-hex-cell--${size}`
    : isSized
      ? 'eva-hex-cell--custom-size'
      : undefined;

  const classes = [
    'eva-hex-cell',
    `eva-hex-cell--${state}`,
    sizeClass,
    clipped && !isSpanning && 'eva-hex-cell--clipped',
    !showBorder && 'eva-hex-cell--no-border',
    isInteractive && 'eva-hex-cell--interactive',
    className,
  ].filter(Boolean).join(' ');

  const cellStyle = isSized
    ? { '--hex-size-multiplier': multiplier } as React.CSSProperties
    : undefined;

  return (
    <div
      className={classes}
      data-col={col}
      data-row={row}
      data-col-span={colSpan > 1 ? colSpan : undefined}
      data-row-span={rowSpan > 1 ? rowSpan : undefined}
      data-size={isSized ? multiplier : undefined}
      style={cellStyle}
      role={interactive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      aria-disabled={isDisabled || undefined}
    >
      <div className="eva-hex-cell__content">
        {children}
      </div>
    </div>
  );
}
