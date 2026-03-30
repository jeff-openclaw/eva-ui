import './MagiPanel.css';

/** MAGI system identifier. */
export type MagiSystem = 'melchior' | 'balthasar' | 'caspar';

/** MAGI vote state. */
export type MagiVote = 'approve' | 'deny' | 'pending' | 'offline';

/** System metadata. */
const SYSTEM_DATA: Record<MagiSystem, { label: string; japanese: string; role: string }> = {
  melchior: { label: 'MELCHIOR-1', japanese: 'メルキオール', role: 'Scientist' },
  balthasar: { label: 'BALTHASAR-2', japanese: 'バルタザール', role: 'Mother' },
  caspar: { label: 'CASPAR-3', japanese: 'カスパー', role: 'Woman' },
};

const VOTE_INDICATORS: Record<MagiVote, { symbol: string; text: string }> = {
  approve: { symbol: '●', text: 'APPROVE' },
  deny: { symbol: '✕', text: 'DENY' },
  pending: { symbol: '◌', text: 'PENDING' },
  offline: { symbol: '—', text: 'OFFLINE' },
};

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
export function MagiPanel({
  system,
  vote = 'pending',
  syncRate,
  pulse = true,
  label,
  showJapanese = true,
  className,
}: MagiPanelProps): React.JSX.Element {
  const data = SYSTEM_DATA[system];
  const indicator = VOTE_INDICATORS[vote];
  const showPulse = pulse && (vote === 'approve' || vote === 'deny');

  return (
    <div
      className={`eva-magi-panel eva-magi-panel--${vote}${showPulse ? ' eva-magi-panel--pulse' : ''}${className ? ` ${className}` : ''}`}
    >
      <div className="eva-magi-panel__header">
        <div className="eva-magi-panel__name">{label ?? data.label}</div>
        {showJapanese && <div className="eva-magi-panel__japanese">{data.japanese}</div>}
      </div>

      <div className="eva-magi-panel__vote">
        <span className="eva-magi-panel__vote-symbol">{indicator.symbol}</span>
        <span className="eva-magi-panel__vote-text">{indicator.text}</span>
      </div>

      {syncRate != null && (
        <div className="eva-magi-panel__sync">
          <div className="eva-magi-panel__sync-bar">
            <div
              className="eva-magi-panel__sync-fill"
              style={{ width: `${Math.min(100, Math.max(0, syncRate))}%` }}
            />
          </div>
          <div className="eva-magi-panel__sync-label">
            <span>{syncRate.toFixed(1)}%</span>
            <span className="eva-magi-panel__sync-ja">シンクロ率</span>
          </div>
        </div>
      )}
    </div>
  );
}
