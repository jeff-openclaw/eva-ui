import { ReactNode } from '../../../node_modules/react';
/** Alert severity levels. */
export type HudAlertSeverity = 'info' | 'caution' | 'warning' | 'critical';
/** Props for the HudAlert component. */
export interface HudAlertProps {
    /** Alert severity. */
    severity: HudAlertSeverity;
    /** Alert title (e.g., "PATTERN BLUE"). */
    title: string;
    /** Japanese equivalent. */
    titleJa?: string;
    /** Alert body content. */
    children?: ReactNode;
    /** Enable berserk mode. @default false */
    berserk?: boolean;
    /** Auto-dismiss after ms. @default undefined (persistent) */
    autoDismiss?: number;
    /** Called on dismiss. */
    onDismiss?: () => void;
    /** Position within overlay zone. @default 'top' */
    position?: 'top' | 'bottom' | 'center';
    /** CSS class. */
    className?: string;
}
/**
 * Notification banner for system alerts.
 * Stacks vertically up to 3 (CTO decision #10).
 */
export declare function HudAlert({ severity, title, titleJa, children, berserk, autoDismiss, onDismiss, position, className, }: HudAlertProps): React.JSX.Element;
//# sourceMappingURL=HudAlert.d.ts.map