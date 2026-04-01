import { ReactNode } from '../../../node_modules/react';
/** Drawer slide-in position. */
export type HudDrawerPosition = 'left' | 'right' | 'top' | 'bottom';
/** Props for the HudDrawer component. */
export interface HudDrawerProps {
    /** Controls visibility. */
    open: boolean;
    /** Called when the drawer requests close. */
    onClose?: () => void;
    /** Slide-in direction. @default 'right' */
    position?: HudDrawerPosition;
    /** Width (left/right) or height (top/bottom). @default 320 */
    size?: number | string;
    /** Show backdrop overlay. @default true */
    backdrop?: boolean;
    /** CSS class. */
    className?: string;
    children?: ReactNode;
}
/**
 * Slide-in panel from any edge. Overlays the grid (unlike HudSidebar which lives in a gap zone).
 */
export declare function HudDrawer({ open, onClose, position, size, backdrop, className, children, }: HudDrawerProps): React.JSX.Element | null;
//# sourceMappingURL=HudDrawer.d.ts.map