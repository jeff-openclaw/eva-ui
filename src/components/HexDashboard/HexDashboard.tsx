import { useRef, useMemo, useEffect, Children, isValidElement, type ReactNode } from 'react';
import { useHexDashboardLayout } from './useHexDashboardLayout';
import {
  type GapDistribution,
  type GapDistributionVertical,
  type HexDashboardLayout,
} from './computeLayout';
import { SQRT3 } from '../../utils/hexGeometry';
import type { HexCellProps } from '../HexCell/HexCell';
import { resolveHexCellSize } from '../HexCell/HexCell';
import './HexDashboard.css';

/** Named gap zones where chrome components mount. */
export interface HexDashboardZones {
  /** Left gap strip. */
  left?: ReactNode;
  /** Right gap strip. */
  right?: ReactNode;
  /** Top gap strip. */
  top?: ReactNode;
  /** Bottom gap strip. */
  bottom?: ReactNode;
  /** Absolute overlay — alerts, berserk banners. Renders above everything. */
  overlay?: ReactNode;
}

/** Props for the HexDashboard component. */
export interface HexDashboardProps {
  /** Hex circumradius in px. @default 44 */
  cellSize?: number;
  /** Gap between hex cells in px. @default 4 */
  gap?: number;
  /** Minimum gap zone width in px. @default 48 */
  minGapSize?: number;
  /** Maximum gap zone width in px. @default undefined */
  maxGapSize?: number;
  /** Horizontal gap distribution. @default 'auto' */
  gapDistribution?: GapDistribution;
  /** Vertical gap distribution. @default 'auto' */
  gapDistributionVertical?: GapDistributionVertical;
  /** Named gap zones with React content. */
  zones?: HexDashboardZones;
  /** Enable corridor perspective on side zones. @default false */
  corridorEffect?: boolean;
  /** Corridor perspective depth in px. @default 1200 */
  corridorPerspective?: number;
  /** Corridor rotation angle in degrees. @default 4 */
  corridorAngle?: number;
  /**
   * Enable atmospheric background hex styling — faint inner glow, etched-glass
   * borders, and subtle random ambient flicker on background hexes.
   * @default false
   */
  atmosphere?: boolean;
  /** CSS class. */
  className?: string;
  /** HexCell children. */
  children?: ReactNode;
  /** Callback fired after layout recomputation. */
  onLayoutChange?: (layout: HexDashboardLayout) => void;
}

/**
 * HexDashboard implements Approach C: fixed interior hex grid + adaptive border strips.
 * The interior is a pixel-perfect hex grid. Remaining space forms gap zones
 * where chrome (navbars, headers, etc.) mounts as first-class layout regions.
 */
export function HexDashboard({
  cellSize = 44,
  gap = 4,
  minGapSize = 48,
  maxGapSize,
  gapDistribution = 'auto',
  gapDistributionVertical = 'auto',
  zones,
  atmosphere = false,
  corridorEffect = false,
  corridorPerspective = 1200,
  corridorAngle = 4,
  className,
  children,
  onLayoutChange,
}: HexDashboardProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const hasLeftZone = !!zones?.left;
  const hasRightZone = !!zones?.right;
  const hasTopZone = !!zones?.top;
  const hasBottomZone = !!zones?.bottom;

  const config = useMemo(() => ({
    cellSize,
    gap,
    minGapSize,
    maxGapSize,
    gapDistribution,
    gapDistributionVertical,
    hasLeftZone,
    hasRightZone,
    hasTopZone,
    hasBottomZone,
  }), [cellSize, gap, minGapSize, maxGapSize, gapDistribution, gapDistributionVertical, hasLeftZone, hasRightZone, hasTopZone, hasBottomZone]);

  const layout = useHexDashboardLayout(containerRef, config);

  // Fire callback on layout change
  useEffect(() => {
    if (layout && onLayoutChange) onLayoutChange(layout);
  }, [layout, onLayoutChange]);

  const effectiveSize = cellSize - gap / 2;

  // Position HexCell children using layout spacing directly
  const positionedChildren = useMemo(() => {
    if (!layout) return null;
    const visualW = SQRT3 * effectiveSize;
    const visualH = 2 * effectiveSize;

    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child;
      const props = child.props as HexCellProps;
      if (props.col == null || props.row == null) return child;

      // Offset-coordinate → pixel center within the grid container
      const cx = props.col * layout.horizSpacing
        + (props.row % 2 === 1 ? layout.horizSpacing / 2 : 0)
        + layout.cellWidth / 2;
      const cy = props.row * layout.vertSpacing + cellSize;

      const sizeMultiplier = resolveHexCellSize(props.size);
      const colSpan = props.colSpan ?? 1;
      const rowSpan = props.rowSpan ?? 1;

      // Base span from colSpan/rowSpan, then scale by size multiplier
      const baseW = colSpan > 1
        ? (colSpan - 1) * layout.horizSpacing + visualW
        : visualW;
      const baseH = rowSpan > 1
        ? (rowSpan - 1) * layout.vertSpacing + visualH
        : visualH;
      const spanW = baseW * sizeMultiplier;
      const spanH = baseH * sizeMultiplier;

      return (
        <div
          key={`cell-${props.col}-${props.row}`}
          className="eva-hex-dashboard__cell-wrapper"
          style={{
            position: 'absolute',
            left: cx - spanW / 2,
            top: cy - spanH / 2,
            width: spanW,
            height: spanH,
          }}
        >
          {child}
        </div>
      );
    });
  }, [children, layout, effectiveSize, cellSize]);

  // CSS custom properties for zone dimensions
  const dashboardStyle = layout ? {
    '--left-gap': `${layout.leftGap}px`,
    '--right-gap': `${layout.rightGap}px`,
    '--top-gap': `${layout.topGap}px`,
    '--bottom-gap': `${layout.bottomGap}px`,
    '--grid-width': `${layout.gridWidth}px`,
    '--grid-height': `${layout.gridHeight}px`,
    '--hex-cols': layout.cols,
    '--hex-rows': layout.rows,
    '--cell-size': cellSize,
    '--cell-width': `${layout.cellWidth}px`,
    '--cell-height': `${layout.cellHeight}px`,
    '--corridor-perspective': `${corridorPerspective}px`,
    '--corridor-angle': `${corridorAngle}deg`,
  } as React.CSSProperties : {};

  // Compute set of background hex keys to suppress (covered by large cells)
  const suppressedBgKeys = useMemo(() => {
    if (!layout) return new Set<string>();
    const suppressed = new Set<string>();
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      const props = child.props as HexCellProps;
      if (props.col == null || props.row == null) return;
      const sizeMultiplier = resolveHexCellSize(props.size);
      const colSpan = props.colSpan ?? 1;
      if (sizeMultiplier <= 1 && colSpan <= 1 && (props.rowSpan ?? 1) <= 1) return;
      // Compute pixel center of this cell
      const cx = props.col * layout.horizSpacing
        + (props.row % 2 === 1 ? layout.horizSpacing / 2 : 0)
        + layout.cellWidth / 2;
      const cy = props.row * layout.vertSpacing + (layout.cellHeight / 2);
      const radius = effectiveSize * Math.max(sizeMultiplier, colSpan) * 0.9;
      // Scan nearby grid cells and suppress those within radius
      const scanRange = Math.ceil(Math.max(sizeMultiplier, colSpan)) + 1;
      for (let dr = -scanRange; dr <= scanRange; dr++) {
        for (let dc = -scanRange; dc <= scanRange; dc++) {
          const r = props.row + dr;
          const c = props.col + dc;
          if (r < 0 || r >= layout.rows || c < 0 || c >= layout.cols) continue;
          const hx = c * layout.horizSpacing
            + (r % 2 === 1 ? layout.horizSpacing / 2 : 0)
            + layout.cellWidth / 2;
          const hy = r * layout.vertSpacing + (layout.cellHeight / 2);
          const dx = hx - cx;
          const dy = hy - cy;
          if (Math.sqrt(dx * dx + dy * dy) < radius) {
            suppressed.add(`${c},${r}`);
          }
        }
      }
    });
    return suppressed;
  }, [children, layout, effectiveSize]);

  // Atmosphere: stable random delays per hex (seeded by col,row)
  const atmosphereDelays = useMemo(() => {
    if (!atmosphere || !layout) return null;
    const delays = new Map<string, number>();
    for (let row = 0; row < layout.rows; row++) {
      for (let col = 0; col < layout.cols; col++) {
        // Simple hash for stable pseudo-random delay
        delays.set(`${col},${row}`, ((col * 7 + row * 13) % 17) * 0.6);
      }
    }
    return delays;
  }, [atmosphere, layout]);

  // Background SVG
  const svgWidth = layout ? layout.gridWidth : 0;
  const svgHeight = layout ? layout.gridHeight : 0;

  return (
    <div
      ref={containerRef}
      className={`eva-hex-dashboard${atmosphere ? ' eva-hex-dashboard--atmosphere' : ''}${className ? ` ${className}` : ''}`}
      style={dashboardStyle}
    >
      {layout && (
        <>
          {/* Grid interior */}
          <div className="eva-hex-dashboard__grid">
            {/* Background hex pattern */}
            <svg
              className="eva-hex-dashboard__bg-svg"
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            >
              {atmosphere && (
                <defs>
                  <filter id="eva-atmosphere-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feComposite in="blur" in2="SourceGraphic" operator="atop" />
                  </filter>
                </defs>
              )}
              {Array.from({ length: layout.rows }, (_, row) =>
                Array.from({ length: layout.cols }, (_, col) => {
                  // Skip background hexes covered by large cells
                  if (suppressedBgKeys.has(`${col},${row}`)) return null;
                  const cx = col * layout.horizSpacing
                    + (row % 2 === 1 ? layout.horizSpacing / 2 : 0)
                    + layout.cellWidth / 2;
                  const cy = row * layout.vertSpacing + cellSize;
                  const corners = [];
                  for (let i = 0; i < 6; i++) {
                    const angle = (2 * Math.PI * (i + 0.5)) / 6;
                    corners.push(
                      `${cx + effectiveSize * Math.cos(angle)},${cy + effectiveSize * Math.sin(angle)}`
                    );
                  }
                  return (
                    <polygon
                      key={`${col},${row}`}
                      className={atmosphere ? 'eva-hex-dashboard__bg-hex--atmosphere' : undefined}
                      points={corners.join(' ')}
                      fill="var(--eva-hex-fill)"
                      stroke={atmosphere ? 'var(--eva-hex-atmosphere-border)' : 'var(--eva-border)'}
                      strokeWidth={atmosphere ? 0.5 : 1}
                      style={atmosphere && atmosphereDelays ? {
                        animationDelay: `${atmosphereDelays.get(`${col},${row}`) ?? 0}s`,
                      } : undefined}
                    />
                  );
                })
              )}
            </svg>

            {/* Positioned HexCell children */}
            {positionedChildren}
          </div>

          {/* Gap zones — always render (CTO decision #5: fill with void) */}
          <div className="eva-hex-dashboard__zone eva-hex-dashboard__zone--top">
            {zones?.top}
          </div>
          <div className="eva-hex-dashboard__zone eva-hex-dashboard__zone--bottom">
            {zones?.bottom}
          </div>
          <div
            className={`eva-hex-dashboard__zone eva-hex-dashboard__zone--left${corridorEffect ? ' eva-hex-dashboard__zone--corridor-left' : ''}`}
          >
            {zones?.left}
          </div>
          <div
            className={`eva-hex-dashboard__zone eva-hex-dashboard__zone--right${corridorEffect ? ' eva-hex-dashboard__zone--corridor-right' : ''}`}
          >
            {zones?.right}
          </div>

          {/* Overlay zone */}
          {zones?.overlay && (
            <div className="eva-hex-dashboard__zone eva-hex-dashboard__zone--overlay">
              {zones.overlay}
            </div>
          )}
        </>
      )}
    </div>
  );
}
