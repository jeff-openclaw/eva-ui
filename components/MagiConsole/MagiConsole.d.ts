import { MagiVote } from '../MagiPanel';
/** Vote state for all three MAGI systems. */
export interface MagiVotes {
    melchior?: MagiVote;
    balthasar?: MagiVote;
    caspar?: MagiVote;
}
/** Sync rates for all three MAGI systems. */
export interface MagiSyncRates {
    melchior?: number;
    balthasar?: number;
    caspar?: number;
}
/** Props for the MagiConsole component. */
export interface MagiConsoleProps {
    /** Vote states for each system. */
    votes?: MagiVotes;
    /** Sync rates for each system. */
    syncRates?: MagiSyncRates;
    /** Enable pulse on active votes. @default true */
    pulse?: boolean;
    /** Show Japanese subtitles. @default true */
    showJapanese?: boolean;
    /** Title above panels. @default 'MAGI SYSTEM' */
    title?: string;
    /** Japanese title. @default 'マギ・システム' */
    titleJa?: string;
    /** Show aggregate result. @default true */
    showResult?: boolean;
    /** CSS class. */
    className?: string;
}
/**
 * Aggregate component rendering all three MAGI panels in the iconic layout
 * with a majority-vote result indicator.
 */
export declare function MagiConsole({ votes, syncRates, pulse, showJapanese, title, titleJa, showResult, className, }: MagiConsoleProps): React.JSX.Element;
//# sourceMappingURL=MagiConsole.d.ts.map