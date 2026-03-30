import { MagiPanel, type MagiVote } from '../MagiPanel';
import './MagiConsole.css';

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

function computeResult(votes: MagiVotes): { text: string; state: 'approve' | 'deny' | 'pending' } {
  const v = [votes.melchior ?? 'pending', votes.balthasar ?? 'pending', votes.caspar ?? 'pending'];
  const approves = v.filter(x => x === 'approve').length;
  const denies = v.filter(x => x === 'deny').length;
  if (approves >= 2) return { text: 'APPROVED', state: 'approve' };
  if (denies >= 2) return { text: 'DENIED', state: 'deny' };
  return { text: 'DELIBERATING...', state: 'pending' };
}

/**
 * Aggregate component rendering all three MAGI panels in the iconic layout
 * with a majority-vote result indicator.
 */
export function MagiConsole({
  votes = {},
  syncRates = {},
  pulse = true,
  showJapanese = true,
  title = 'MAGI SYSTEM',
  titleJa = 'マギ・システム',
  showResult = true,
  className,
}: MagiConsoleProps): React.JSX.Element {
  const result = computeResult(votes);

  return (
    <div className={`eva-magi-console${className ? ` ${className}` : ''}`}>
      <div className="eva-magi-console__title">
        <span className="eva-magi-console__title-main">{title}</span>
        <span className="eva-magi-console__title-ja">{titleJa}</span>
      </div>

      <div className="eva-magi-console__panels">
        {(['melchior', 'balthasar', 'caspar'] as const).map((system) => (
          <div key={system} className="eva-magi-console__panel-wrapper">
            <MagiPanel
              system={system}
              vote={votes[system]}
              syncRate={syncRates[system]}
              pulse={pulse}
              showJapanese={showJapanese}
            />
          </div>
        ))}
      </div>

      {showResult && (
        <div className={`eva-magi-console__result eva-magi-console__result--${result.state}`}>
          {result.text}
        </div>
      )}
    </div>
  );
}
