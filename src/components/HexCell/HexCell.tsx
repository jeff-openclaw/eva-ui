import { useCallback } from 'react';
import './HexCell.css';

/** Visual state of a hex cell. */
export type HexCellState = 'default' | 'active' | 'hover' | 'disabled' | 'warning';

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
  state = 'default',
  clipped = true,
  interactive = false,
  onClick,
  showBorder = true,
  className,
  children,
}: HexCellProps): React.JSX.Element {
  const isSpanning = colSpan > 1 || rowSpan > 1;

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

  const classes = [
    'eva-hex-cell',
    `eva-hex-cell--${state}`,
    clipped && !isSpanning && 'eva-hex-cell--clipped',
    !showBorder && 'eva-hex-cell--no-border',
    interactive && 'eva-hex-cell--interactive',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-col={col}
      data-row={row}
      data-col-span={colSpan > 1 ? colSpan : undefined}
      data-row-span={rowSpan > 1 ? rowSpan : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      aria-disabled={state === 'disabled' ? true : undefined}
    >
      {children}
    </div>
  );
}
