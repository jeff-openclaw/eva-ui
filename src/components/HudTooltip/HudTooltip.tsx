import { useState, useRef, useCallback, useEffect, cloneElement, type ReactElement, type ReactNode } from 'react';
import './HudTooltip.css';

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
export function HudTooltip({
  content,
  placement = 'top',
  delay = 200,
  children,
  className,
}: HudTooltipProps): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const trigger = triggerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = trigger.top - tooltip.height - gap;
        left = trigger.left + trigger.width / 2 - tooltip.width / 2;
        break;
      case 'bottom':
        top = trigger.bottom + gap;
        left = trigger.left + trigger.width / 2 - tooltip.width / 2;
        break;
      case 'left':
        top = trigger.top + trigger.height / 2 - tooltip.height / 2;
        left = trigger.left - tooltip.width - gap;
        break;
      case 'right':
        top = trigger.top + trigger.height / 2 - tooltip.height / 2;
        left = trigger.right + gap;
        break;
    }

    setPosition({ top, left });
  }, [placement]);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(updatePosition);
    }, delay);
  }, [delay, updatePosition]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      {cloneElement(children, {
        ref: triggerRef,
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
      } as Record<string, unknown>)}
      {visible && (
        <div
          ref={tooltipRef}
          className={`eva-hud-tooltip eva-hud-tooltip--${placement}${className ? ` ${className}` : ''}`}
          role="tooltip"
          style={{ top: position.top, left: position.left }}
        >
          {content}
        </div>
      )}
    </>
  );
}
