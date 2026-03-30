import { useState, useEffect, useRef } from 'react';
import './CountdownTimer.css';

/** Props for the CountdownTimer component. */
export interface CountdownTimerProps {
  /** Time remaining in seconds. */
  seconds: number;
  /** Display format. @default 'mm:ss' */
  format?: 'mm:ss' | 'hh:mm:ss';
  /** Label above timer. @default '活動限界' */
  label?: string;
  /** Sublabel. @default 'ACTIVITY LIMIT' */
  labelSub?: string;
  /** Warning threshold in seconds. @default 60 */
  warningThreshold?: number;
  /** Critical threshold in seconds. @default 10 */
  criticalThreshold?: number;
  /** Called when timer reaches zero. */
  onExpire?: () => void;
  /** Auto-count down. @default false */
  autoStart?: boolean;
  /** Paused (only with autoStart). */
  paused?: boolean;
  /** CSS class. */
  className?: string;
}

function formatTime(s: number, fmt: 'mm:ss' | 'hh:mm:ss'): string {
  const totalSec = Math.max(0, Math.floor(s));
  if (fmt === 'hh:mm:ss') {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const sec = totalSec % 60;
    return `${String(h).padStart(2, '0')} : ${String(m).padStart(2, '0')} : ${String(sec).padStart(2, '0')}`;
  }
  const m = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${String(m).padStart(2, '0')} : ${String(sec).padStart(2, '0')}`;
}

/**
 * Eva-style countdown display with large segmented numerals,
 * Japanese labels, and urgency states.
 */
export function CountdownTimer({
  seconds: initialSeconds,
  format = 'mm:ss',
  label = '活動限界',
  labelSub = 'ACTIVITY LIMIT',
  warningThreshold = 60,
  criticalThreshold = 10,
  onExpire,
  autoStart = false,
  paused = false,
  className,
}: CountdownTimerProps): React.JSX.Element {
  const [remaining, setRemaining] = useState(initialSeconds);
  const expiredRef = useRef(false);

  // Sync with external seconds prop when not auto-starting
  useEffect(() => {
    if (!autoStart) setRemaining(initialSeconds);
  }, [initialSeconds, autoStart]);

  // Auto-decrement
  useEffect(() => {
    if (!autoStart || paused || remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [autoStart, paused, remaining]);

  // Expire callback
  useEffect(() => {
    if (remaining <= 0 && !expiredRef.current) {
      expiredRef.current = true;
      onExpire?.();
    }
    if (remaining > 0) expiredRef.current = false;
  }, [remaining, onExpire]);

  const state = remaining <= 0
    ? 'expired'
    : remaining <= criticalThreshold
      ? 'critical'
      : remaining <= warningThreshold
        ? 'warning'
        : 'normal';

  return (
    <div className={`eva-countdown eva-countdown--${state}${className ? ` ${className}` : ''}`}>
      <div className="eva-countdown__label">{label}</div>
      <div className="eva-countdown__label-sub">{labelSub}</div>
      <div className="eva-countdown__time">{formatTime(remaining, format)}</div>
      {state === 'expired' && (
        <div className="eva-countdown__expired-label">活動限界</div>
      )}
    </div>
  );
}
