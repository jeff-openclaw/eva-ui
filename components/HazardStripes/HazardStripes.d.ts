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
export declare function HazardStripes({ angle, stripeWidth, color, bgColor, height, animated, speed, className, }: HazardStripesProps): React.JSX.Element;
//# sourceMappingURL=HazardStripes.d.ts.map