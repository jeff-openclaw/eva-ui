import { ReactNode } from '../../../node_modules/react';
/** Warning severity level. */
export type WarningLevel = 'caution' | 'warning' | 'critical' | 'berserk';
/** Props for the WarningHex component. */
export interface WarningHexProps {
    /** Warning severity. */
    level: WarningLevel;
    /** Warning label text. */
    label?: string;
    /** Japanese label. */
    labelJa?: string;
    /** Override pulse speed in ms. */
    pulseInterval?: number;
    /** Custom icon or content. */
    children?: ReactNode;
    /** CSS class. */
    className?: string;
}
/**
 * Alert-state hex cell with pulsing animation.
 * Used for attention-drawing cells — angel detection, system warnings, boundary alerts.
 */
export declare function WarningHex({ level, label, labelJa, pulseInterval, children, className, }: WarningHexProps): React.JSX.Element;
//# sourceMappingURL=WarningHex.d.ts.map