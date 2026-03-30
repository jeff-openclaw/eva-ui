import { SQRT3 } from '../../utils/hexGeometry';

/** Controls how remaining horizontal space is distributed. */
export type GapDistribution = 'split' | 'left' | 'right' | 'auto';

/** Controls how remaining vertical space is distributed. */
export type GapDistributionVertical = 'split' | 'top' | 'bottom' | 'auto';

/** Configuration for the layout computation. */
export interface HexDashboardLayoutConfig {
  cellSize: number;
  gap: number;
  minGapSize: number;
  maxGapSize?: number;
  gapDistribution: GapDistribution;
  gapDistributionVertical: GapDistributionVertical;
  hasLeftZone: boolean;
  hasRightZone: boolean;
  hasTopZone: boolean;
  hasBottomZone: boolean;
}

/** Computed layout result. */
export interface HexDashboardLayout {
  cols: number;
  rows: number;
  leftGap: number;
  rightGap: number;
  topGap: number;
  bottomGap: number;
  cellWidth: number;
  cellHeight: number;
  horizSpacing: number;
  vertSpacing: number;
  gridOrigin: { x: number; y: number };
  gridWidth: number;
  gridHeight: number;
  containerWidth: number;
  containerHeight: number;
}

/**
 * Distribute remainder space across two zones based on strategy.
 */
function distribute(
  remainder: number,
  strategy: GapDistribution | GapDistributionVertical,
  hasFirst: boolean,
  hasSecond: boolean,
): [number, number] {
  switch (strategy) {
    case 'left':
    case 'top':
      return [remainder, 0];
    case 'right':
    case 'bottom':
      return [0, remainder];
    case 'auto':
      if (hasFirst && !hasSecond) return [remainder, 0];
      if (hasSecond && !hasFirst) return [0, remainder];
      return [remainder / 2, remainder / 2];
    case 'split':
    default:
      return [remainder / 2, remainder / 2];
  }
}

/**
 * Pure function: computes HexDashboard layout from container dimensions.
 * No React dependency — fully testable.
 */
export function computeHexDashboardLayout(
  containerWidth: number,
  containerHeight: number,
  config: HexDashboardLayoutConfig,
): HexDashboardLayout {
  const { cellSize, gap, minGapSize, maxGapSize } = config;

  const cellWidth = SQRT3 * cellSize;
  const cellHeight = 2 * cellSize;
  const horizSpacing = cellWidth + gap;
  const vertSpacing = 1.5 * cellSize + gap;

  // ── Horizontal axis ──
  let availableWidth = containerWidth - 2 * minGapSize;
  let cols = Math.max(1, Math.floor((availableWidth - cellWidth) / horizSpacing) + 1);

  // Iteratively check maxGapSize constraint
  const computeHorizontal = (c: number) => {
    const gw = (c - 1) * horizSpacing + cellWidth;
    const rem = containerWidth - gw;
    return { gridWidth: gw, remainder: rem };
  };

  let { gridWidth, remainder: hRemainder } = computeHorizontal(cols);

  if (maxGapSize) {
    let iterations = 0;
    while (cols > 1 && iterations < 50) {
      const [left, right] = distribute(
        hRemainder, config.gapDistribution, config.hasLeftZone, config.hasRightZone,
      );
      if (left <= maxGapSize && right <= maxGapSize) break;
      cols--;
      ({ gridWidth, remainder: hRemainder } = computeHorizontal(cols));
      iterations++;
    }
  }

  // Ensure minimum gap sizes
  if (hRemainder < 2 * minGapSize && cols > 1) {
    cols--;
    ({ gridWidth, remainder: hRemainder } = computeHorizontal(cols));
  }

  const [leftGap, rightGap] = distribute(
    Math.max(hRemainder, 0), config.gapDistribution, config.hasLeftZone, config.hasRightZone,
  );

  // ── Vertical axis ──
  let availableHeight = containerHeight - 2 * minGapSize;
  let rows = Math.max(1, Math.floor((availableHeight - cellHeight) / vertSpacing) + 1);

  const computeVertical = (r: number) => {
    const gh = (r - 1) * vertSpacing + cellHeight;
    const rem = containerHeight - gh;
    return { gridHeight: gh, remainder: rem };
  };

  let vertResult = computeVertical(rows);

  if (vertResult.remainder < 2 * minGapSize && rows > 1) {
    rows--;
    vertResult = computeVertical(rows);
  }

  const [topGap, bottomGap] = distribute(
    Math.max(vertResult.remainder, 0),
    config.gapDistributionVertical,
    config.hasTopZone,
    config.hasBottomZone,
  );

  const gridOrigin = {
    x: leftGap + cellWidth / 2,
    y: topGap + cellSize,
  };

  return {
    cols,
    rows,
    leftGap,
    rightGap,
    topGap,
    bottomGap,
    cellWidth,
    cellHeight,
    horizSpacing,
    vertSpacing,
    gridOrigin,
    gridWidth,
    gridHeight: vertResult.gridHeight,
    containerWidth,
    containerHeight,
  };
}
