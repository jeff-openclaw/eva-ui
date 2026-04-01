import { ReactNode } from '../../../node_modules/react';
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
export declare function HudModal({ open, onClose, title, titleJa, persistent, maxWidth, berserk, className, children, footer, }: HudModalProps): React.JSX.Element | null;
//# sourceMappingURL=HudModal.d.ts.map