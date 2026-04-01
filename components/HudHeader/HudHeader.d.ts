import { ReactNode } from '../../../node_modules/react';
/** Props for the HudHeader component. */
export interface HudHeaderProps {
    /** Fixed height in px. If omitted, fills the top gap zone. */
    height?: number | string;
    /** Show/hide with animation. @default true */
    visible?: boolean;
    /** CSS class. */
    className?: string;
    /** Header content. */
    children?: ReactNode;
}
/** Props for HudHeader.Title compound component. */
export interface HudHeaderTitleProps {
    /** Japanese subtitle beneath title. */
    subtitle?: string;
    children?: ReactNode;
}
/** Props for HudHeader.Status compound component. */
export interface HudHeaderStatusProps {
    children?: ReactNode;
}
/**
 * Horizontal bar for the top gap zone.
 * Displays titles, system status, breadcrumbs.
 */
export declare function HudHeader({ height, visible, className, children, }: HudHeaderProps): React.JSX.Element | null;
export declare namespace HudHeader {
    var Title: typeof HudHeaderTitle;
    var Status: typeof HudHeaderStatus;
}
/** Primary title area. */
declare function HudHeaderTitle({ subtitle, children }: HudHeaderTitleProps): React.JSX.Element;
/** Right-aligned status text. */
declare function HudHeaderStatus({ children }: HudHeaderStatusProps): React.JSX.Element;
export {};
//# sourceMappingURL=HudHeader.d.ts.map