import { useEffect, useCallback, type ReactNode } from 'react';
import '../../styles/hud-chrome.css';
import './HudAlert.css';

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
export function HudAlert({
  severity,
  title,
  titleJa,
  children,
  berserk = false,
  autoDismiss,
  onDismiss,
  position = 'top',
  className,
}: HudAlertProps): React.JSX.Element {
  // Auto-dismiss timer
  useEffect(() => {
    if (!autoDismiss || !onDismiss) return;
    const timer = setTimeout(onDismiss, autoDismiss);
    return () => clearTimeout(timer);
  }, [autoDismiss, onDismiss]);

  const handleDismiss = useCallback(() => {
    onDismiss?.();
  }, [onDismiss]);

  return (
    <div
      className={`eva-hud-chrome eva-hud-alert eva-hud-alert--${severity} eva-hud-alert--${position}${berserk ? ' eva-hud-chrome--berserk' : ''}${className ? ` ${className}` : ''}`}
      role="alert"
      data-animate
    >
      {berserk && <div className="eva-hud-chrome__berserk-watermark">暴走</div>}
      <div className="eva-hud-alert__content">
        <div className="eva-hud-alert__titles">
          <span className="eva-hud-alert__title">{title}</span>
          {titleJa && <span className="eva-hud-alert__title-ja">{titleJa}</span>}
        </div>
        {children && <div className="eva-hud-alert__body">{children}</div>}
      </div>
      {onDismiss && (
        <button
          className="eva-hud-alert__dismiss"
          onClick={handleDismiss}
          type="button"
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </div>
  );
}
