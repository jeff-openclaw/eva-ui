import { ReactNode } from '../../../node_modules/react';
import { GapDistribution, GapDistributionVertical, HexDashboardLayout } from './computeLayout';
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
export declare function HexDashboard({ cellSize, gap, minGapSize, maxGapSize, gapDistribution, gapDistributionVertical, zones, corridorEffect, corridorPerspective, corridorAngle, className, children, onLayoutChange, }: HexDashboardProps): React.JSX.Element;
//# sourceMappingURL=HexDashboard.d.ts.map