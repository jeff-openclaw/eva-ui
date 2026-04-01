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
/**
 * Eva-style countdown display with large segmented numerals,
 * Japanese labels, and urgency states.
 */
export declare function CountdownTimer({ seconds: initialSeconds, format, label, labelSub, warningThreshold, criticalThreshold, onExpire, autoStart, paused, className, }: CountdownTimerProps): React.JSX.Element;
//# sourceMappingURL=CountdownTimer.d.ts.map