import { ReactElement, ReactNode } from '../../../node_modules/react';
/** Props for the HudTooltip component. */
export interface HudTooltipProps {
    /** Content to display. */
    content: ReactNode;
    /** Preferred placement. @default 'top' */
    placement?: 'top' | 'bottom' | 'left' | 'right';
    /** Delay before showing (ms). @default 200 */
    delay?: number;
    /** The trigger element. */
    children: ReactElement;
    /** CSS class for the tooltip. */
    className?: string;
}
/**
 * Contextual readout that appears near a target element.
 * Styled as a HUD data readout — instant appear, no animation.
 */
export declare function HudTooltip({ content, placement, delay, children, className, }: HudTooltipProps): React.JSX.Element;
//# sourceMappingURL=HudTooltip.d.ts.map