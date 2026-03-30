import type { ReactNode } from 'react';
import './WarningHex.css';

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

const DEFAULTS: Record<WarningLevel, { interval: number; label: string; labelJa: string }> = {
  caution: { interval: 2000, label: 'CAUTION', labelJa: '注意' },
  warning: { interval: 1200, label: 'WARNING', labelJa: '警報' },
  critical: { interval: 800, label: 'CRITICAL', labelJa: '緊急' },
  berserk: { interval: 400, label: '暴走', labelJa: 'BERSERK' },
};

/**
 * Alert-state hex cell with pulsing animation.
 * Used for attention-drawing cells — angel detection, system warnings, boundary alerts.
 */
export function WarningHex({
  level,
  label,
  labelJa,
  pulseInterval,
  children,
  className,
}: WarningHexProps): React.JSX.Element {
  const defaults = DEFAULTS[level];
  const interval = pulseInterval ?? defaults.interval;

  return (
    <div
      className={`eva-warning-hex eva-warning-hex--${level}${className ? ` ${className}` : ''}`}
      style={{ '--pulse-interval': `${interval}ms` } as React.CSSProperties}
    >
      {children ?? (
        <div className="eva-warning-hex__content">
          <div className="eva-warning-hex__label">{label ?? defaults.label}</div>
          <div className="eva-warning-hex__label-ja">{labelJa ?? defaults.labelJa}</div>
        </div>
      )}
    </div>
  );
}
