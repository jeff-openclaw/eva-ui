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
    gridOrigin: {
        x: number;
        y: number;
    };
    gridWidth: number;
    gridHeight: number;
    containerWidth: number;
    containerHeight: number;
}
/**
 * Pure function: computes HexDashboard layout from container dimensions.
 * No React dependency — fully testable.
 */
export declare function computeHexDashboardLayout(containerWidth: number, containerHeight: number, config: HexDashboardLayoutConfig): HexDashboardLayout;
//# sourceMappingURL=computeLayout.d.ts.map