import './HazardStripes.css';

/** Props for the HazardStripes component. */
export interface HazardStripesProps {
  /** Stripe angle in degrees. @default 45 */
  angle?: number;
  /** Individual stripe width in px. @default 4 */
  stripeWidth?: number;
  /** Primary stripe color. @default var(--eva-crimson) */
  color?: string;
  /** Background stripe color. @default var(--eva-void) */
  bgColor?: string;
  /** Height of the stripe bar. @default 4 */
  height?: number | string;
  /** Animate stripes (scrolling motion). @default false */
  animated?: boolean;
  /** Animation speed — pixels per second for scroll. @default 20 */
  speed?: number;
  /** CSS class. */
  className?: string;
}

/**
 * Decorative diagonal stripe pattern used as accent borders,
 * dividers, and warning indicators throughout the Eva aesthetic.
 */
export function HazardStripes({
  angle = 45,
  stripeWidth = 4,
  color,
  bgColor,
  height = 4,
  animated = false,
  speed = 20,
  className,
}: HazardStripesProps): React.JSX.Element {
  const period = stripeWidth * 2 * 1.414;
  const duration = speed > 0 ? period / speed : 1e9;

  return (
    <div
      aria-hidden="true"
      className={`eva-hazard-stripes${animated ? ' eva-hazard-stripes--animated' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--stripe-angle': `${angle}deg`,
        '--stripe-width': `${stripeWidth}px`,
        '--stripe-color': color,
        '--stripe-bg': bgColor,
        '--stripe-height': typeof height === 'number' ? `${height}px` : height,
        '--stripe-duration': `${duration}s`,
        '--stripe-size': `${period}px`,
      } as React.CSSProperties}
    />
  );
}
