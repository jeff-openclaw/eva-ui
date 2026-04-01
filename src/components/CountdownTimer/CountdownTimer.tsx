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

/** Returns time segments as an array of digit groups (e.g. ['05','30'] or ['01','05','30']). */
function getSegments(s: number, fmt: 'mm:ss' | 'hh:mm:ss'): string[] {
  const totalSec = Math.max(0, Math.floor(s));
  if (fmt === 'hh:mm:ss') {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const sec = totalSec % 60;
    return [String(h).padStart(2, '0'), String(m).padStart(2, '0'), String(sec).padStart(2, '0')];
  }
  const m = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return [String(m).padStart(2, '0'), String(sec).padStart(2, '0')];
}

/** Formats time as a flat string for aria-label. */
function formatTime(s: number, fmt: 'mm:ss' | 'hh:mm:ss'): string {
  return getSegments(s, fmt).join(' : ');
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

  // Sync with external seconds prop
  useEffect(() => {
    setRemaining(initialSeconds);
    if (initialSeconds > 0) expiredRef.current = false;
  }, [initialSeconds]);

  // Auto-decrement — interval stays alive until paused/stopped, avoiding
  // per-tick teardown that causes cumulative drift.
  useEffect(() => {
    if (!autoStart || paused) return;
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // initialSeconds restarts the interval after an external reset
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, paused, initialSeconds]);

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
    <div
      role="timer"
      aria-live={state === 'critical' || state === 'expired' ? 'assertive' : 'polite'}
      aria-label={`${labelSub}: ${formatTime(remaining, format)}`}
      className={`eva-countdown eva-countdown--${state}${className ? ` ${className}` : ''}`}
    >
      <div className="eva-countdown__label">{label}</div>
      <div className="eva-countdown__label-sub">{labelSub}</div>
      <div className="eva-countdown__time">
        {getSegments(remaining, format).map((seg, i) => (
          <span key={i}>
            {i > 0 && <span className="eva-countdown__colon" aria-hidden="true"> : </span>}
            <span className="eva-countdown__digits">{seg}</span>
          </span>
        ))}
      </div>
      {state === 'expired' && (
        <div className="eva-countdown__expired-label">活動限界</div>
      )}
    </div>
  );
}
