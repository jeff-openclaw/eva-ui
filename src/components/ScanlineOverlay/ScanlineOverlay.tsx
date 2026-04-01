import './ScanlineOverlay.css';

/** Props for the ScanlineOverlay component. */
export interface ScanlineOverlayProps {
  /** Scanline height/spacing in px. @default 2 */
  lineHeight?: number;
  /** Scanline opacity (0-1). @default 0.05 */
  opacity?: number;
  /** Animate scanlines (slow downward drift). @default false */
  animated?: boolean;
  /** Enable subtle flicker effect. @default false */
  flicker?: boolean;
  /** Cover entire viewport (position: fixed) vs parent (position: absolute). @default false */
  fixed?: boolean;
  /** CSS class. */
  className?: string;
}

/**
 * CRT scanline effect rendered as a semi-transparent overlay.
 * Apply over the hex grid or individual panels for atmosphere.
 */
export function ScanlineOverlay({
  lineHeight = 2,
  opacity = 0.05,
  animated = false,
  flicker = false,
  fixed = false,
  className,
}: ScanlineOverlayProps): React.JSX.Element {
  const classes = [
    'eva-scanline-overlay',
    fixed && 'eva-scanline-overlay--fixed',
    animated && !flicker && 'eva-scanline-overlay--animated',
    flicker && 'eva-scanline-overlay--flicker',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      aria-hidden="true"
      className={classes}
      style={{
        '--scanline-height': `${lineHeight}px`,
        '--scanline-opacity': opacity,
      } as React.CSSProperties}
    />
  );
}
