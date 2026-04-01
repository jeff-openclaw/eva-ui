import { type ReactNode } from 'react';
import '../../styles/hud-chrome.css';
import './HudHeader.css';

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
export function HudHeader({
  height,
  visible = true,
  className,
  children,
}: HudHeaderProps): React.JSX.Element | null {
  if (!visible) return null;

  return (
    <header
      role="banner"
      className={`eva-hud-chrome eva-hud-header${className ? ` ${className}` : ''}`}
      data-animate
      style={height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined}
    >
      {children}
    </header>
  );
}

/** Primary title area. */
function HudHeaderTitle({ subtitle, children }: HudHeaderTitleProps): React.JSX.Element {
  return (
    <div className="eva-hud-header__title">
      <div className="eva-hud-header__title-main">{children}</div>
      {subtitle && <div className="eva-hud-header__title-sub">{subtitle}</div>}
    </div>
  );
}

/** Right-aligned status text. */
function HudHeaderStatus({ children }: HudHeaderStatusProps): React.JSX.Element {
  return <div className="eva-hud-header__status">{children}</div>;
}

HudHeader.Title = HudHeaderTitle;
HudHeader.Status = HudHeaderStatus;
