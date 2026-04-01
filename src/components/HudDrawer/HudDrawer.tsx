import { useCallback, useEffect, type ReactNode } from 'react';
import '../../styles/hud-chrome.css';
import './HudDrawer.css';

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

const animationMap: Record<HudDrawerPosition, string> = {
  left: 'hud-arrive-left',
  right: 'hud-arrive-right',
  top: 'hud-arrive-top',
  bottom: 'hud-arrive-bottom',
};

/**
 * Slide-in panel from any edge. Overlays the grid (unlike HudSidebar which lives in a gap zone).
 */
export function HudDrawer({
  open,
  onClose,
  position = 'right',
  size = 320,
  backdrop = true,
  className,
  children,
}: HudDrawerProps): React.JSX.Element | null {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleEscape);

    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = prev;
    };
  }, [open, handleEscape]);

  if (!open) return null;

  const isHorizontal = position === 'left' || position === 'right';
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <>
      {backdrop && (
        <div className="eva-hud-drawer__backdrop" onClick={onClose} />
      )}
      <div
        className={`eva-hud-chrome eva-hud-chrome--floating eva-hud-drawer eva-hud-drawer--${position}${className ? ` ${className}` : ''}`}
        role="dialog"
        aria-modal={backdrop}
        style={{
          [isHorizontal ? 'width' : 'height']: sizeValue,
          animationName: animationMap[position],
        }}
      >
        {children}
      </div>
    </>
  );
}
