import { useEffect, useRef, useCallback, type ReactNode } from 'react';
import '../../styles/hud-chrome.css';
import './HudModal.css';

/** Props for the HudModal component. */
export interface HudModalProps {
  /** Controls visibility. */
  open: boolean;
  /** Called when the modal requests close. */
  onClose?: () => void;
  /** Modal title. */
  title?: string;
  /** Japanese subtitle beneath title. */
  titleJa?: string;
  /** Disable backdrop click to close. @default false */
  persistent?: boolean;
  /** Width constraint. @default 480 */
  maxWidth?: number | string;
  /** Enable berserk visual state. @default false */
  berserk?: boolean;
  /** CSS class. */
  className?: string;
  /** Modal content. */
  children?: ReactNode;
  /** Footer / action buttons area. */
  footer?: ReactNode;
}

/**
 * Centered overlay panel for critical information or confirmations.
 * Renders at z-index 40 with built-in focus trap.
 */
export function HudModal({
  open,
  onClose,
  title,
  titleJa,
  persistent = false,
  maxWidth = 480,
  berserk = false,
  className,
  children,
  footer,
}: HudModalProps): React.JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap + scroll lock
  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    const timer = setTimeout(() => modalRef.current?.focus(), 50);

    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prev;
      // Restore focus on close
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [open]);

  // Escape key
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !persistent && onClose) {
      onClose();
    }
    // Focus trap: tab cycling
    if (e.key === 'Tab' && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }, [persistent, onClose]);

  const handleBackdropClick = useCallback(() => {
    if (!persistent && onClose) onClose();
  }, [persistent, onClose]);

  if (!open) return null;

  return (
    <div className="eva-hud-modal__backdrop" onClick={handleBackdropClick}>
      <div
        ref={modalRef}
        className={`eva-hud-chrome eva-hud-modal${berserk ? ' eva-hud-chrome--berserk' : ''}${className ? ` ${className}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        style={{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {berserk && <div className="eva-hud-chrome__berserk-watermark">暴走</div>}
        {(title || titleJa) && (
          <div className="eva-hud-modal__header">
            {title && <div className="eva-hud-modal__title">{title}</div>}
            {titleJa && <div className="eva-hud-modal__title-ja">{titleJa}</div>}
          </div>
        )}
        <div className="eva-hud-modal__body">
          {children}
        </div>
        {footer && (
          <div className="eva-hud-modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
