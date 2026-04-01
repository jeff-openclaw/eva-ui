/** MAGI system identifier. */
export type MagiSystem = 'melchior' | 'balthasar' | 'caspar';
/** MAGI vote state. */
export type MagiVote = 'approve' | 'deny' | 'pending' | 'offline';
/** Props for the MagiPanel component. */
export interface MagiPanelProps {
    /** Which MAGI system. */
    system: MagiSystem;
    /** Current vote/status. @default 'pending' */
    vote?: MagiVote;
    /** Sync rate percentage (0-100). */
    syncRate?: number;
    /** Enable pulsing glow on active votes. @default true */
    pulse?: boolean;
    /** Custom label override. */
    label?: string;
    /** Show Japanese subtitle. @default true */
    showJapanese?: boolean;
    /** CSS class. */
    className?: string;
}
/**
 * Displays the status of one MAGI supercomputer.
 * Designed to be placed inside a HexCell.
 */
export declare function MagiPanel({ system, vote, syncRate, pulse, label, showJapanese, className, }: MagiPanelProps): React.JSX.Element;
//# sourceMappingURL=MagiPanel.d.ts.map