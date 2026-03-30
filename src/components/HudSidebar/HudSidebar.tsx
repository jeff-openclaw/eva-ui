import { type ReactNode } from 'react';
import '../../styles/hud-chrome.css';
import './HudSidebar.css';

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
export function HudSidebar({
  position = 'left',
  width,
  visible = true,
  hazardAccent = false,
  className,
  children,
}: HudSidebarProps): React.JSX.Element | null {
  if (!visible) return null;

  const animation = position === 'left' ? 'hud-arrive-left' : 'hud-arrive-right';

  return (
    <div
      className={`eva-hud-chrome eva-hud-sidebar eva-hud-sidebar--${position}${className ? ` ${className}` : ''}`}
      data-animate
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        animationName: animation,
      }}
    >
      {hazardAccent && (
        <div className="eva-hud-sidebar__hazard-accent" />
      )}
      {children}
    </div>
  );
}

/** NERV-style logo area at top. */
function HudSidebarLogo({ children }: { children?: ReactNode }): React.JSX.Element {
  return <div className="eva-hud-sidebar__logo">{children ?? 'NERV'}</div>;
}

/** Navigation container. */
function HudSidebarNav({ children }: { children?: ReactNode }): React.JSX.Element {
  return <nav className="eva-hud-sidebar__nav">{children}</nav>;
}

/** Individual nav entry. */
function HudSidebarNavItem({ label, active, onClick }: HudSidebarNavItemProps): React.JSX.Element {
  return (
    <button
      className={`eva-hud-sidebar__nav-item${active ? ' eva-hud-sidebar__nav-item--active' : ''}`}
      onClick={onClick}
      type="button"
    >
      {active ? '▸ ' : '  '}{label}
    </button>
  );
}

/** Section divider with optional label. */
function HudSidebarSection({ label, children }: HudSidebarSectionProps): React.JSX.Element {
  return (
    <div className="eva-hud-sidebar__section">
      {label && <div className="eva-hud-sidebar__section-label">{label}</div>}
      {children}
    </div>
  );
}

/** Bottom-pinned content. */
function HudSidebarFooter({ children }: { children?: ReactNode }): React.JSX.Element {
  return <div className="eva-hud-sidebar__footer">{children}</div>;
}

HudSidebar.Logo = HudSidebarLogo;
HudSidebar.Nav = HudSidebarNav;
HudSidebar.NavItem = HudSidebarNavItem;
HudSidebar.Section = HudSidebarSection;
HudSidebar.Footer = HudSidebarFooter;
