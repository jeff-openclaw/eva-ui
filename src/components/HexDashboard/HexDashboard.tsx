import { useRef, useMemo, Children, isValidElement, type ReactNode } from 'react';
import { useHexDashboardLayout } from './useHexDashboardLayout';
import {
  type GapDistribution,
  type GapDistributionVertical,
  type HexDashboardLayout,
} from './computeLayout';
import { offsetToAxial, hexToPixel, hexRectangle, POINTY, SQRT3 } from '../../utils/hexGeometry';
import type { HexLayout } from '../../utils/hexTypes';
import type { HexCellProps } from '../HexCell/HexCell';
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
  corridorEffect = false,
  corridorPerspective = 1200,
  corridorAngle = 4,
  className,
  children,
  onLayoutChange,
}: HexDashboardProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const config = useMemo(() => ({
    cellSize,
    gap,
    minGapSize,
    maxGapSize,
    gapDistribution,
    gapDistributionVertical,
    hasLeftZone: !!zones?.left,
    hasRightZone: !!zones?.right,
    hasTopZone: !!zones?.top,
    hasBottomZone: !!zones?.bottom,
  }), [cellSize, gap, minGapSize, maxGapSize, gapDistribution, gapDistributionVertical, zones?.left, zones?.right, zones?.top, zones?.bottom]);

  const layout = useHexDashboardLayout(containerRef, config);

  // Fire callback on layout change
  useMemo(() => {
    if (layout && onLayoutChange) onLayoutChange(layout);
  }, [layout, onLayoutChange]);

  // Build hex layout for positioning cells
  const effectiveSize = cellSize - gap / 2;
  const hexLayout: HexLayout = useMemo(() => ({
    size: effectiveSize,
    origin: { x: 0, y: 0 }, // offset applied via gridOrigin
    orientation: POINTY,
  }), [effectiveSize]);

  // Background hex grid
  const bgHexes = useMemo(() => {
    if (!layout) return [];
    return hexRectangle(layout.cols, layout.rows);
  }, [layout]);

  // Position HexCell children
  const positionedChildren = useMemo(() => {
    if (!layout) return null;
    const cellWidth = SQRT3 * effectiveSize;
    const cellHeight = 2 * effectiveSize;

    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child;
      const props = child.props as HexCellProps;
      if (props.col == null || props.row == null) return child;

      const axial = offsetToAxial(props.col, props.row);
      const pixel = hexToPixel(axial, hexLayout);

      const spanW = (props.colSpan ?? 1) > 1
        ? cellWidth * (props.colSpan ?? 1) + gap * ((props.colSpan ?? 1) - 1)
        : cellWidth;
      const spanH = (props.rowSpan ?? 1) > 1
        ? cellHeight * (props.rowSpan ?? 1) + gap * ((props.rowSpan ?? 1) - 1)
        : cellHeight;

      return (
        <div
          key={`cell-${props.col}-${props.row}`}
          className="eva-hex-dashboard__cell-wrapper"
          style={{
            position: 'absolute',
            left: layout.gridOrigin.x + pixel.x - spanW / 2,
            top: layout.gridOrigin.y + pixel.y - spanH / 2,
            width: spanW,
            height: spanH,
          }}
        >
          {child}
        </div>
      );
    });
  }, [children, layout, hexLayout, effectiveSize, gap]);

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

  // Background SVG
  const svgWidth = layout ? layout.gridWidth : 0;
  const svgHeight = layout ? layout.gridHeight : 0;

  return (
    <div
      ref={containerRef}
      className={`eva-hex-dashboard${className ? ` ${className}` : ''}`}
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
              {bgHexes.map((h) => {
                const pixel = hexToPixel(h, {
                  ...hexLayout,
                  origin: { x: layout.cellWidth / 2, y: effectiveSize },
                });
                const corners = [];
                for (let i = 0; i < 6; i++) {
                  const angle = (2 * Math.PI * (i + 0.5)) / 6;
                  corners.push(
                    `${pixel.x + effectiveSize * Math.cos(angle)},${pixel.y + effectiveSize * Math.sin(angle)}`
                  );
                }
                return (
                  <polygon
                    key={`${h.q},${h.r}`}
                    points={corners.join(' ')}
                    fill="var(--eva-hex-fill)"
                    stroke="var(--eva-border)"
                    strokeWidth={1}
                  />
                );
              })}
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
