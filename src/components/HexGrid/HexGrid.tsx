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

/** Describes a variable-size cell in the hex grid. */
export interface HexGridCell {
  /** Axial q coordinate. */
  q: number;
  /** Axial r coordinate. */
  r: number;
  /** Size multiplier (1 = normal, 2 = double, 3 = triple). Default: 1. */
  size?: number;
  /** Custom CSS class for this cell's background polygon. */
  className?: string;
  /** Whether this cell is active. */
  active?: boolean;
}

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
  renderCell?: (hex: Hex, pixelCenter: Point, size?: number) => React.ReactNode | null;
  /** Called when a hex cell is clicked. */
  onCellClick?: (hex: Hex, event: React.MouseEvent) => void;
  /** Called when mouse enters a hex cell. */
  onCellHover?: (hex: Hex | null, event: React.MouseEvent) => void;
  /** Set of hex keys ("q,r") to highlight as active. */
  activeCells?: ReadonlySet<string>;
  /**
   * Variable-size cells. When provided, these cells render at their specified
   * size and background hexes they cover are suppressed. Cells not listed here
   * render at normal size.
   */
  cells?: HexGridCell[];
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
 * Build a set of hex keys that are covered by variable-size cells.
 * A cell with size=2 covers roughly the center + its 6 neighbors.
 * A cell with size=3 covers center + ring-1 + ring-2.
 */
function computeCoveredHexes(
  cells: HexGridCell[],
  layout: HexLayout,
  effectiveSize: number,
): { coveredKeys: Set<string>; largeCells: HexGridCell[] } {
  const coveredKeys = new Set<string>();
  const largeCells: HexGridCell[] = [];
  for (const cell of cells) {
    const s = cell.size ?? 1;
    if (s <= 1) continue;
    largeCells.push(cell);
    const center = hexToPixel({ q: cell.q, r: cell.r }, layout);
    const radius = s * effectiveSize;
    // Mark all grid hexes whose center falls within the large cell's radius
    // We'll check at render time which background hexes to suppress
    coveredKeys.add(hexKey({ q: cell.q, r: cell.r }));
    // Use geometric coverage: any hex whose pixel center is within radius
    // Store center+radius for later; for now, pre-compute with a generous scan
    const scanRange = Math.ceil(s) + 1;
    for (let dq = -scanRange; dq <= scanRange; dq++) {
      for (let dr = -scanRange; dr <= scanRange; dr++) {
        const h = { q: cell.q + dq, r: cell.r + dr };
        const hp = hexToPixel(h, layout);
        const dx = hp.x - center.x;
        const dy = hp.y - center.y;
        if (Math.sqrt(dx * dx + dy * dy) < radius * 0.9) {
          coveredKeys.add(hexKey(h));
        }
      }
    }
  }
  return { coveredKeys, largeCells };
}

/**
 * Generate SVG polygon points for a scaled hex at a given center.
 */
function scaledHexPoints(center: Point, size: number, startAngle: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (2 * Math.PI * (i + startAngle)) / 6;
    pts.push(`${center.x + size * Math.cos(angle)},${center.y + size * Math.sin(angle)}`);
  }
  return pts.join(' ');
}

/**
 * Renders an SVG hexagonal grid with optional content cells.
 * Uses pointy-top orientation by default with the Eva-UI color tokens.
 *
 * Supports variable-size cells via the `cells` prop. Large cells render as
 * scaled hexagons and suppress background hexes they cover, creating a
 * seamless masonry-like layout.
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
  cells,
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

  // Build lookup maps for variable-size cells
  const { coveredKeys, largeCells, cellSizeMap } = useMemo(() => {
    if (!cells || cells.length === 0) {
      return { coveredKeys: new Set<string>(), largeCells: [] as HexGridCell[], cellSizeMap: new Map<string, HexGridCell>() };
    }
    const { coveredKeys: ck, largeCells: lc } = computeCoveredHexes(cells, layout, effectiveSize);
    const csm = new Map<string, HexGridCell>();
    for (const c of cells) csm.set(`${c.q},${c.r}`, c);
    return { coveredKeys: ck, largeCells: lc, cellSizeMap: csm };
  }, [cells, layout, effectiveSize]);

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
          {/* Regular-size background hexes (skip those covered by large cells) */}
          {hexes.map(h => {
            const key = hexKey(h);
            if (coveredKeys.has(key)) return null;
            const isActive = (activeCells?.has(key) ?? false)
              || (cellSizeMap.get(key)?.active ?? false);
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
          {/* Large-size hexes rendered on top */}
          {largeCells.map(cell => {
            const center = hexToPixel({ q: cell.q, r: cell.r }, layout);
            const s = cell.size ?? 1;
            const scaledSize = effectiveSize * s;
            return (
              <polygon
                key={`large-${cell.q},${cell.r}`}
                points={scaledHexPoints(center, scaledSize, orientation.startAngle)}
                fill={cell.active ? 'var(--eva-hex-active)' : 'var(--eva-hex-fill)'}
                stroke="var(--eva-border)"
                strokeWidth={1.5}
                data-q={cell.q}
                data-r={cell.r}
                data-size={s}
              />
            );
          })}
        </svg>
      )}

      {/* Content layer */}
      {renderCell && (
        <div className="eva-hex-grid__content">
          {hexes.map(h => {
            const key = hexKey(h);
            // Skip hexes covered by large cells (except the large cell center itself)
            const cellDef = cellSizeMap.get(key);
            const s = cellDef?.size ?? 1;
            if (coveredKeys.has(key) && s <= 1) return null;

            const center = hexToPixel(h, layout);
            const content = renderCell(h, center, s > 1 ? s : undefined);
            if (content == null) return null;
            const scaledW = cellWidth * s;
            const scaledH = cellHeight * s;
            return (
              <div
                key={key}
                className={`eva-hex-grid__cell${s > 1 ? ' eva-hex-grid__cell--large' : ''}`}
                style={{
                  width: scaledW,
                  height: scaledH,
                  transform: `translate(${center.x - scaledW / 2}px, ${center.y - scaledH / 2}px)`,
                  clipPath: hexClipPath(),
                  zIndex: s > 1 ? 2 : undefined,
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
