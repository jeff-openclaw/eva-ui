import { useCallback, useMemo } from 'react';
import type { Hex, Point, HexLayout } from '../../utils/hexTypes';
import {
  hexRectangle,
  hexToPixel,
  hexPolygonPoints,
  hexClipPath,
  pixelToHexRounded,
  POINTY,
  SQRT3,
} from '../../utils/hexGeometry';
import type { Orientation } from '../../utils/hexTypes';
import './HexGrid.css';

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

/** Hex key for set lookups. */
function hexKey(h: Hex): string {
  return `${h.q},${h.r}`;
}

/**
 * Renders an SVG hexagonal grid with optional content cells.
 * Uses pointy-top orientation by default with the Eva-UI color tokens.
 */
export function HexGrid({
  cellSize,
  gap = 0,
  cols,
  rows,
  orientation = POINTY,
  className,
  style,
  renderCell,
  onCellClick,
  onCellHover,
  activeCells,
  showBackground = true,
  scanlines = false,
}: HexGridProps): React.JSX.Element {
  const effectiveSize = cellSize - gap / 2;

  const layout: HexLayout = useMemo(
    () => ({
      size: effectiveSize,
      origin: { x: effectiveSize * SQRT3, y: effectiveSize },
      orientation,
    }),
    [effectiveSize, orientation],
  );

  const hexes = useMemo(() => hexRectangle(cols, rows), [cols, rows]);

  const cellWidth = SQRT3 * effectiveSize;
  const cellHeight = 2 * effectiveSize;
  const gridWidth = cellWidth * cols + cellWidth / 2 + gap;
  const gridHeight = cellHeight * 0.75 * (rows - 1) + cellHeight + gap;

  const handleSvgClick = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      if (!onCellClick) return;
      const svg = event.currentTarget;
      const rect = svg.getBoundingClientRect();
      const p = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      const h = pixelToHexRounded(p, layout);
      const key = hexKey(h);
      if (hexes.some(hex => hexKey(hex) === key)) {
        onCellClick(h, event);
      }
    },
    [onCellClick, layout, hexes],
  );

  const handleSvgMouseMove = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      if (!onCellHover) return;
      const svg = event.currentTarget;
      const rect = svg.getBoundingClientRect();
      const p = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      const h = pixelToHexRounded(p, layout);
      const key = hexKey(h);
      if (hexes.some(hex => hexKey(hex) === key)) {
        onCellHover(h, event);
      } else {
        onCellHover(null, event);
      }
    },
    [onCellHover, layout, hexes],
  );

  return (
    <div
      className={`eva-hex-grid${className ? ` ${className}` : ''}`}
      style={{ width: gridWidth, height: gridHeight, ...style }}
    >
      {/* SVG background layer */}
      {showBackground && (
        <svg
          className="eva-hex-grid__svg"
          width={gridWidth}
          height={gridHeight}
          onClick={handleSvgClick}
          onMouseMove={handleSvgMouseMove}
          style={{ pointerEvents: 'auto' }}
        >
          {hexes.map(h => {
            const key = hexKey(h);
            const isActive = activeCells?.has(key) ?? false;
            return (
              <polygon
                key={key}
                points={hexPolygonPoints(h, layout)}
                fill={isActive ? 'var(--eva-hex-active)' : 'var(--eva-hex-fill)'}
                stroke="var(--eva-border)"
                strokeWidth={1}
                data-q={h.q}
                data-r={h.r}
              />
            );
          })}
        </svg>
      )}

      {/* Content layer */}
      {renderCell && (
        <div className="eva-hex-grid__content">
          {hexes.map(h => {
            const center = hexToPixel(h, layout);
            const content = renderCell(h, center);
            if (content == null) return null;
            const key = hexKey(h);
            return (
              <div
                key={key}
                className="eva-hex-grid__cell"
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  transform: `translate(${center.x - cellWidth / 2}px, ${center.y - cellHeight / 2}px)`,
                  clipPath: hexClipPath(),
                }}
              >
                {content}
              </div>
            );
          })}
        </div>
      )}

      {/* Scanline overlay */}
      {scanlines && <div className="eva-hex-grid__scanlines" />}
    </div>
  );
}
