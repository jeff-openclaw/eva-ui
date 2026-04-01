import { ReactNode } from '../../../node_modules/react';
/** Props for the HudSidebar component. */
export interface HudSidebarProps {
    /** Which gap zone this sidebar mounts in. @default 'left' */
    position?: 'left' | 'right';
    /** Optional width override. */
    width?: number | string;
    /** Show/hide with animation. @default true */
    visible?: boolean;
    /** Show hazard stripe accent at top. @default false */
    hazardAccent?: boolean;
    /** CSS class. */
    className?: string;
    children?: ReactNode;
}
export interface HudSidebarNavItemProps {
    /** Nav item label. */
    label: string;
    /** Whether this item is active. */
    active?: boolean;
    /** Click handler. */
    onClick?: () => void;
    children?: ReactNode;
}
export interface HudSidebarSectionProps {
    /** Section label. */
    label?: string;
    children?: ReactNode;
}
/**
 * Vertical navigation/status panel designed to mount in a HexDashboard gap zone.
 */
export declare function HudSidebar({ position, width, visible, hazardAccent, className, children, }: HudSidebarProps): React.JSX.Element | null;
export declare namespace HudSidebar {
    var Logo: typeof HudSidebarLogo;
    var Nav: typeof HudSidebarNav;
    var NavItem: typeof HudSidebarNavItem;
    var Section: typeof HudSidebarSection;
    var Footer: typeof HudSidebarFooter;
}
/** NERV-style logo area at top. */
declare function HudSidebarLogo({ children }: {
    children?: ReactNode;
}): React.JSX.Element;
/** Navigation container. */
declare function HudSidebarNav({ children }: {
    children?: ReactNode;
}): React.JSX.Element;
/** Individual nav entry. */
declare function HudSidebarNavItem({ label, active, onClick }: HudSidebarNavItemProps): React.JSX.Element;
/** Section divider with optional label. */
declare function HudSidebarSection({ label, children }: HudSidebarSectionProps): React.JSX.Element;
/** Bottom-pinned content. */
declare function HudSidebarFooter({ children }: {
    children?: ReactNode;
}): React.JSX.Element;
export {};
//# sourceMappingURL=HudSidebar.d.ts.map