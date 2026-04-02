import { useState, useEffect, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HexDashboard } from './HexDashboard';
import { HexCell } from '../HexCell';
import { MagiPanel } from '../MagiPanel';
import { MagiConsole } from '../MagiConsole';
import { HudHeader } from '../HudHeader';
import { HudSidebar } from '../HudSidebar';
import { HazardStripes } from '../HazardStripes';
import type { MagiVote } from '../MagiPanel';
import './TestSuiteDemo.css';
import './MetricDemo.css';
import './MagiVotingDemo.css';
import './ActivityFeedDemo.css';
import './FullDemo.css';

const fullscreen: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
};

const contained: React.CSSProperties = {
  width: 800,
  height: 500,
  border: '1px solid var(--eva-border)',
};

const meta: Meta<typeof HexDashboard> = {
  title: 'Layout/HexDashboard',
  component: HexDashboard,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'eva-void' },
  },
};
export default meta;

type Story = StoryObj<typeof HexDashboard>;

/** Basic dashboard with no zones — just the hex grid filling the container. */
export const Default: Story = {
  decorators: [(Story) => <div style={contained}><Story /></div>],
};

/** Fullscreen dashboard. */
export const Fullscreen: Story = {
  decorators: [(Story) => <div style={fullscreen}><Story /></div>],
};

/** Dashboard with HexCell children placed in the grid. */
export const WithCells: Story = {
  decorators: [(Story) => <div style={contained}><Story /></div>],
  render: (args) => (
    <HexDashboard {...args}>
      <HexCell col={0} row={0} state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem', textAlign: 'center' }}>
          <div>MELCHIOR</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>メルキオール</div>
        </div>
      </HexCell>
      <HexCell col={1} row={0} state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem', textAlign: 'center' }}>
          <div>BALTHASAR</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>バルタザール</div>
        </div>
      </HexCell>
      <HexCell col={2} row={0} state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem', textAlign: 'center' }}>
          <div>CASPAR</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>カスパー</div>
        </div>
      </HexCell>
      <HexCell col={4} row={2} state="warning" />
    </HexDashboard>
  ),
};

/** Dashboard with chrome in gap zones. */
export const WithZones: Story = {
  decorators: [(Story) => <div style={contained}><Story /></div>],
  args: {
    gapDistribution: 'left',
    minGapSize: 64,
    zones: {
      left: (
        <div style={{
          width: '100%',
          height: '100%',
          borderRight: '1px solid var(--eva-gold)',
          background: 'var(--eva-panel)',
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          fontFamily: 'var(--eva-font-mono)',
          color: 'var(--eva-text-gold)',
          fontSize: '0.625rem',
        }}>
          <div style={{ letterSpacing: '0.1em' }}>NERV</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ color: 'var(--eva-text-gold)', cursor: 'pointer' }}>▸ DASHBOARD</div>
            <div style={{ color: 'var(--eva-text-dim)' }}>  MAGI</div>
            <div style={{ color: 'var(--eva-text-dim)' }}>  PILOT SYNC</div>
            <div style={{ color: 'var(--eva-text-dim)' }}>  ALERTS</div>
          </div>
          <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.5rem' }}>v3.01</div>
        </div>
      ),
      top: (
        <div style={{
          width: '100%',
          height: '100%',
          borderBottom: '1px solid var(--eva-gold)',
          background: 'var(--eva-deep)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--eva-font-mono)',
        }}>
          <div>
            <div style={{ color: 'var(--eva-text-gold)', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
              第壱中央指令所
            </div>
          </div>
          <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.625rem' }}>
            MAGI SYSTEM: NOMINAL
          </div>
        </div>
      ),
    },
  },
};

/** Dashboard with mixed-size cells: a large center panel and smaller status cells. */
export const MixedSizes: Story = {
  decorators: [(Story) => <div style={contained}><Story /></div>],
  render: (args) => (
    <HexDashboard {...args}>
      {/* Large center panel */}
      <HexCell col={3} row={2} size="lg" state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em' }}>MAIN MONITOR</div>
          <div style={{ fontSize: '0.625rem', color: 'var(--eva-text-dim)', marginTop: 4 }}>Central Dogma</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 8 }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: 'var(--eva-text-gold)' }}>98.2%</div>
              <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>SYNC</div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: 'var(--eva-text-gold)' }}>NOMINAL</div>
              <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>STATUS</div>
            </div>
          </div>
        </div>
      </HexCell>
      {/* Small status cells around the center */}
      <HexCell col={0} row={0} size="sm" state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          <div>01</div>
        </div>
      </HexCell>
      <HexCell col={1} row={0} state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem', textAlign: 'center' }}>
          <div>MELCHIOR</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>メルキオール</div>
        </div>
      </HexCell>
      <HexCell col={2} row={0} state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem', textAlign: 'center' }}>
          <div>BALTHASAR</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>バルタザール</div>
        </div>
      </HexCell>
      <HexCell col={6} row={1} size="sm" state="warning" />
      <HexCell col={7} row={1} size="sm">
        <div style={{ color: 'var(--eva-text-dim)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          AUX
        </div>
      </HexCell>
      <HexCell col={0} row={3}>
        <div style={{ color: 'var(--eva-text-dim)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          LOG
        </div>
      </HexCell>
      <HexCell col={7} row={3} state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem', textAlign: 'center' }}>
          CASPAR
        </div>
      </HexCell>
    </HexDashboard>
  ),
};

/** Dashboard with atmospheric background — faint glow, etched borders, ambient flicker. */
export const Atmosphere: Story = {
  decorators: [(Story) => <div style={contained}><Story /></div>],
  args: {
    atmosphere: true,
  },
};

/** Atmosphere with cells — shows the living grid behind content cells. */
export const AtmosphereWithCells: Story = {
  decorators: [(Story) => <div style={contained}><Story /></div>],
  render: (args) => (
    <HexDashboard {...args} atmosphere>
      <HexCell col={1} row={1} state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem', textAlign: 'center' }}>
          <div>MELCHIOR</div>
        </div>
      </HexCell>
      <HexCell col={3} row={1} state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem', textAlign: 'center' }}>
          <div>BALTHASAR</div>
        </div>
      </HexCell>
      <HexCell col={5} row={1} state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem', textAlign: 'center' }}>
          <div>CASPAR</div>
        </div>
      </HexCell>
    </HexDashboard>
  ),
};

/** Dashboard with corridor effect on side zones. */
export const CorridorEffect: Story = {
  decorators: [(Story) => <div style={contained}><Story /></div>],
  args: {
    corridorEffect: true,
    minGapSize: 80,
    zones: {
      left: (
        <div style={{
          width: '100%',
          height: '100%',
          borderRight: '1px solid var(--eva-gold)',
          background: 'var(--eva-panel)',
        }} />
      ),
      right: (
        <div style={{
          width: '100%',
          height: '100%',
          borderLeft: '1px solid var(--eva-gold)',
          background: 'var(--eva-panel)',
        }} />
      ),
    },
  },
};

/* ── Test Suite Demo Data ── */

interface TestSuiteData {
  name: string;
  subtitle: string;
  pass: number;
  fail: number;
  skip: number;
  trend: 'up' | 'down' | 'flat';
  lastRun: string;
  history: Array<'pass' | 'fail' | 'skip'>;
}

const suites: TestSuiteData[] = [
  {
    name: 'AUTH',
    subtitle: '認証テスト',
    pass: 142, fail: 0, skip: 3,
    trend: 'up',
    lastRun: '14:32:07',
    history: ['pass', 'pass', 'fail', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass'],
  },
  {
    name: 'SYNC CORE',
    subtitle: '同期コア',
    pass: 87, fail: 4, skip: 1,
    trend: 'down',
    lastRun: '14:31:52',
    history: ['pass', 'pass', 'pass', 'fail', 'pass', 'pass', 'fail', 'pass', 'fail', 'fail'],
  },
  {
    name: 'MAGI I/O',
    subtitle: 'マギ入出力',
    pass: 201, fail: 0, skip: 0,
    trend: 'flat',
    lastRun: '14:30:11',
    history: ['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass'],
  },
  {
    name: 'AT FIELD',
    subtitle: 'ATフィールド',
    pass: 56, fail: 12, skip: 8,
    trend: 'down',
    lastRun: '14:29:44',
    history: ['fail', 'pass', 'fail', 'fail', 'pass', 'skip', 'fail', 'pass', 'fail', 'fail'],
  },
  {
    name: 'ENTRY PLUG',
    subtitle: 'エントリープラグ',
    pass: 34, fail: 1, skip: 0,
    trend: 'up',
    lastRun: '14:28:03',
    history: ['pass', 'fail', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass'],
  },
  {
    name: 'NERV NET',
    subtitle: 'ネルフネット',
    pass: 310, fail: 0, skip: 12,
    trend: 'flat',
    lastRun: '14:27:19',
    history: ['pass', 'pass', 'pass', 'skip', 'pass', 'pass', 'pass', 'pass', 'skip', 'pass'],
  },
];

function TestSuiteCell({ suite }: { suite: TestSuiteData }): React.JSX.Element {
  const total = suite.pass + suite.fail + suite.skip;
  const passRate = total > 0 ? (suite.pass / total) * 100 : 0;
  const rateClass = passRate >= 95 ? 'good' : passRate >= 80 ? 'warn' : 'bad';
  const trendSymbol = suite.trend === 'up' ? '▲' : suite.trend === 'down' ? '▼' : '─';

  return (
    <div className="eva-test-suite" role="group" aria-label={`${suite.name} test suite`}>
      <div className="eva-test-suite__name">{suite.name}</div>
      <div className="eva-test-suite__subtitle">{suite.subtitle}</div>

      {/* Stacked bar */}
      <div className="eva-test-suite__bar" role="img" aria-label={`${suite.pass} pass, ${suite.fail} fail, ${suite.skip} skip`}>
        <div className="eva-test-suite__bar-pass" style={{ width: `${(suite.pass / total) * 100}%` }} />
        <div className="eva-test-suite__bar-fail" style={{ width: `${(suite.fail / total) * 100}%` }} />
        <div className="eva-test-suite__bar-skip" style={{ width: `${(suite.skip / total) * 100}%` }} />
      </div>

      {/* Counts legend */}
      <div className="eva-test-suite__counts">
        <span className="eva-test-suite__count-pass">✓{suite.pass}</span>
        <span className="eva-test-suite__count-fail">✗{suite.fail}</span>
        <span className="eva-test-suite__count-skip">⊘{suite.skip}</span>
      </div>

      {/* Pass rate + trend */}
      <div className={`eva-test-suite__rate eva-test-suite__rate--${rateClass}`}>
        {passRate.toFixed(1)}%
        <span className={`eva-test-suite__trend-${suite.trend}`}> {trendSymbol}</span>
      </div>

      {/* Last run timestamp */}
      <div className="eva-test-suite__time">{suite.lastRun}</div>

      {/* Dot chart: last 10 runs */}
      <div className="eva-test-suite__dots" role="img" aria-label={`Recent runs: ${suite.history.join(', ')}`}>
        {suite.history.map((result, i) => (
          <div key={i} className={`eva-test-suite__dot eva-test-suite__dot--${result}`} />
        ))}
      </div>
    </div>
  );
}

/* ── Metric Readout Demo Data ── */

interface MetricData {
  label: string;
  subtitle: string;
  value: number;
  unit: string;
  target: number;
  /** Number of decimal places to display. @default 1 */
  decimals?: number;
}

const metrics: MetricData[] = [
  { label: 'SYNC RATE', subtitle: '同期率', value: 98.2, unit: '%', target: 100 },
  { label: 'AT FIELD', subtitle: 'ATフィールド', value: 142.7, unit: 'kPa', target: 200 },
  { label: 'PLUG DEPTH', subtitle: '深度', value: 67.3, unit: 'm', target: 80 },
  { label: 'CORE TEMP', subtitle: 'コア温度', value: 34.1, unit: '°C', target: 45 },
  { label: 'S² OUTPUT', subtitle: 'S²機関出力', value: 8840, unit: 'MW', target: 10000, decimals: 0 },
  { label: 'LCL PURITY', subtitle: 'LCL純度', value: 99.97, unit: '%', target: 100, decimals: 2 },
];

/**
 * Hook that animates a number from 0 to `target` over `duration` ms on mount.
 * Uses requestAnimationFrame for smooth interpolation.
 * Respects prefers-reduced-motion by resolving immediately.
 */
function useTickingNumber(target: number, decimals: number, duration = 900): string {
  const [display, setDisplay] = useState('0');

  const tick = useCallback(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(target.toFixed(decimals));
      return;
    }

    const start = performance.now();
    let raf: number;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = eased * target;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, decimals, duration]);

  useEffect(() => {
    const cleanup = tick();
    return cleanup;
  }, [tick]);

  return display;
}

function MetricCell({ metric }: { metric: MetricData }): React.JSX.Element {
  const decimals = metric.decimals ?? 1;
  const displayValue = useTickingNumber(metric.value, decimals);
  const ratio = Math.min(metric.value / metric.target, 1);
  const pct = ratio * 100;
  const rateClass = pct >= 90 ? 'good' : pct >= 60 ? 'warn' : 'bad';

  return (
    <div className="eva-metric" role="group" aria-label={`${metric.label}: ${metric.value} ${metric.unit}`}>
      <div className="eva-metric__label">{metric.label}</div>
      <div className="eva-metric__subtitle">{metric.subtitle}</div>
      <div className="eva-metric__value">
        {displayValue}
        <span className="eva-metric__unit">{metric.unit}</span>
      </div>
      <div className="eva-metric__bar-track" role="img" aria-label={`${pct.toFixed(0)}% of target`}>
        <div
          className={`eva-metric__bar-fill eva-metric__bar-fill--${rateClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="eva-metric__target">
        TARGET {metric.target}{metric.unit}
      </div>
    </div>
  );
}

/** Demo: Metric readout cells — large monospace numbers with ticking animation, progress bars, and Japanese labels. */
export const MetricDashboard: Story = {
  decorators: [(Story) => <div style={{ width: 960, height: 600, border: '1px solid var(--eva-border)' }}><Story /></div>],
  render: (args) => {
    const positions: Array<[number, number]> = [
      [0, 0], [2, 0], [4, 0],
      [1, 2], [3, 2], [5, 2],
    ];
    return (
      <HexDashboard {...args} atmosphere>
        {metrics.map((metric, i) => (
          <HexCell
            key={metric.label}
            col={positions[i]?.[0] ?? 0}
            row={positions[i]?.[1] ?? 0}
            size="lg"
            state="active"
          >
            <MetricCell metric={metric} />
          </HexCell>
        ))}
      </HexDashboard>
    );
  },
};

/** Demo: Test suite cells with rich data — stacked bars, pass rates, trend arrows, and dot-chart history. */
export const TestSuiteDashboard: Story = {
  decorators: [(Story) => <div style={{ width: 960, height: 600, border: '1px solid var(--eva-border)' }}><Story /></div>],
  render: (args) => {
    const positions: Array<[number, number]> = [
      [0, 0], [2, 0], [4, 0],
      [1, 2], [3, 2], [5, 2],
    ];
    return (
      <HexDashboard {...args} atmosphere>
        {suites.map((suite, i) => {
          const state = suite.fail > 5 ? 'warning' : suite.fail > 0 ? 'active' : 'active';
          return (
            <HexCell
              key={suite.name}
              col={positions[i]?.[0] ?? 0}
              row={positions[i]?.[1] ?? 0}
              size="lg"
              state={state}
            >
              <TestSuiteCell suite={suite} />
            </HexCell>
          );
        })}
      </HexDashboard>
    );
  },
};

/* ── MAGI Voting Demo ── */

interface MagiSuiteVote {
  suite: string;
  subtitle: string;
  system: 'melchior' | 'balthasar' | 'caspar';
  vote: MagiVote;
  syncRate: number;
  passRate: number;
  total: number;
}

const magiVotes: MagiSuiteVote[] = [
  {
    suite: 'AUTH + SYNC',
    subtitle: '認証＋同期',
    system: 'melchior',
    vote: 'approve',
    syncRate: 92.1,
    passRate: 97.8,
    total: 237,
  },
  {
    suite: 'MAGI I/O',
    subtitle: 'マギ入出力',
    system: 'balthasar',
    vote: 'approve',
    syncRate: 88.4,
    passRate: 100,
    total: 201,
  },
  {
    suite: 'AT FIELD',
    subtitle: 'ATフィールド',
    system: 'caspar',
    vote: 'deny',
    syncRate: 41.6,
    passRate: 73.7,
    total: 76,
  },
];

function MagiVoteCell({ data }: { data: MagiSuiteVote }): React.JSX.Element {
  const rateClass = data.passRate >= 95 ? 'good' : data.passRate >= 80 ? 'warn' : 'bad';

  return (
    <div className="eva-magi-vote-cell" role="group" aria-label={`${data.suite}: ${data.vote}`}>
      <MagiPanel
        system={data.system}
        vote={data.vote}
        syncRate={data.syncRate}
        pulse
      />
      <div className="eva-magi-vote-cell__suite">
        <div className="eva-magi-vote-cell__suite-name">{data.suite}</div>
        <div className="eva-magi-vote-cell__suite-sub">{data.subtitle}</div>
      </div>
      <div className={`eva-magi-vote-cell__rate eva-magi-vote-cell__rate--${rateClass}`}>
        {data.passRate.toFixed(1)}% <span className="eva-magi-vote-cell__total">({data.total})</span>
      </div>
    </div>
  );
}

/** Demo: MAGI voting — 3 panels with test suite approval, plus MagiConsole aggregate showing build verdict. */
export const MagiVoting: Story = {
  decorators: [(Story) => <div style={{ width: 960, height: 700, border: '1px solid var(--eva-border)' }}><Story /></div>],
  render: (args) => (
    <HexDashboard {...args} atmosphere>
      {/* Row 1: Three MAGI voting panels */}
      {magiVotes.map((data, i) => (
        <HexCell
          key={data.system}
          col={i * 2}
          row={0}
          size="lg"
          state={data.vote === 'deny' ? 'warning' : 'active'}
        >
          <MagiVoteCell data={data} />
        </HexCell>
      ))}

      {/* Row 2: MagiConsole aggregate showing build verdict */}
      <HexCell col={1} row={2} colSpan={3} size="lg" state="active">
        <div className="eva-magi-vote-console">
          <div className="eva-magi-vote-console__label">BUILD VERDICT</div>
          <div className="eva-magi-vote-console__label-ja">ビルド判定</div>
          <MagiConsole
            votes={{
              melchior: magiVotes[0]?.vote,
              balthasar: magiVotes[1]?.vote,
              caspar: magiVotes[2]?.vote,
            }}
            syncRates={{
              melchior: magiVotes[0]?.syncRate,
              balthasar: magiVotes[1]?.syncRate,
              caspar: magiVotes[2]?.syncRate,
            }}
            title="BUILD STATUS"
            titleJa="ビルド状態"
            showJapanese
            pulse
          />
        </div>
      </HexCell>
    </HexDashboard>
  ),
};

/* ── Activity Feed Demo ── */

type EventResult = 'pass' | 'fail' | 'skip' | 'info' | 'run';

interface ActivityEvent {
  time: string;
  result: EventResult;
  suite: string;
  message: string;
}

const activitySeed: ActivityEvent[] = [
  { time: '14:32:07', result: 'pass', suite: 'AUTH', message: 'login_flow — 142 assertions passed' },
  { time: '14:32:06', result: 'pass', suite: 'AUTH', message: 'token_refresh — JWT rotation OK' },
  { time: '14:32:04', result: 'fail', suite: 'SYNC', message: 'websocket_reconnect — timeout after 5000ms' },
  { time: '14:31:58', result: 'pass', suite: 'MAGI', message: 'consensus_vote — 3/3 systems nominal' },
  { time: '14:31:52', result: 'run', suite: 'SYNC', message: 'starting suite run (92 tests)' },
  { time: '14:31:50', result: 'skip', suite: 'AT FIELD', message: 'barrier_stress — skipped (flaky)' },
  { time: '14:31:47', result: 'fail', suite: 'AT FIELD', message: 'field_inversion — expected 142kPa got 0' },
  { time: '14:31:44', result: 'pass', suite: 'ENTRY', message: 'plug_eject — nominal in 230ms' },
  { time: '14:31:40', result: 'info', suite: 'SYSTEM', message: 'gc pause 12ms — heap 84MB' },
  { time: '14:31:38', result: 'pass', suite: 'NERV', message: 'network_handshake — 310 endpoints OK' },
  { time: '14:31:35', result: 'pass', suite: 'AUTH', message: 'oauth_callback — redirect chain valid' },
  { time: '14:31:33', result: 'fail', suite: 'SYNC', message: 'state_merge — conflict resolution failed' },
  { time: '14:31:30', result: 'pass', suite: 'MAGI', message: 'io_throughput — 2.4GB/s within budget' },
  { time: '14:31:27', result: 'info', suite: 'SYSTEM', message: 'worker pool scaled to 8 threads' },
  { time: '14:31:24', result: 'pass', suite: 'ENTRY', message: 'lcl_fill — purity 99.97%' },
  { time: '14:31:20', result: 'run', suite: 'AUTH', message: 'starting suite run (145 tests)' },
  { time: '14:31:18', result: 'pass', suite: 'NERV', message: 'cert_rotation — all nodes renewed' },
  { time: '14:31:15', result: 'skip', suite: 'SYNC', message: 'p2p_discovery — skipped (env missing)' },
  { time: '14:31:12', result: 'fail', suite: 'AT FIELD', message: 'resonance_cascade — amplitude overflow' },
  { time: '14:31:09', result: 'pass', suite: 'MAGI', message: 'voting_quorum — 2/3 majority confirmed' },
];

const newEventTemplates: Array<Omit<ActivityEvent, 'time'>> = [
  { result: 'pass', suite: 'AUTH', message: 'session_validate — cookie chain intact' },
  { result: 'pass', suite: 'SYNC', message: 'delta_merge — 14 records reconciled' },
  { result: 'fail', suite: 'AT FIELD', message: 'harmonics_test — frequency drift detected' },
  { result: 'pass', suite: 'MAGI', message: 'pattern_blue — classification confirmed' },
  { result: 'info', suite: 'SYSTEM', message: 'checkpoint saved — snapshot 0x4A2F' },
  { result: 'pass', suite: 'NERV', message: 'uplink_latency — 4ms avg (< 10ms SLA)' },
  { result: 'pass', suite: 'ENTRY', message: 'neural_link — sync rate 98.2%' },
  { result: 'skip', suite: 'SYNC', message: 'offline_queue — skipped (queue empty)' },
  { result: 'fail', suite: 'SYNC', message: 'raft_election — split brain detected' },
  { result: 'run', suite: 'AT FIELD', message: 'starting suite run (76 tests)' },
  { result: 'pass', suite: 'AUTH', message: 'mfa_verify — TOTP valid' },
  { result: 'pass', suite: 'MAGI', message: 'self_diagnostic — all cores nominal' },
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

const badgeLabels: Record<EventResult, string> = {
  pass: 'PASS',
  fail: 'FAIL',
  skip: 'SKIP',
  info: 'INFO',
  run: 'RUN',
};

/**
 * ActivityFeedCell — scrolling live feed of test events.
 * Adds a new random event every 2–4 seconds and auto-scrolls to the bottom.
 */
function ActivityFeedCell(): React.JSX.Element {
  const [events, setEvents] = useState<ActivityEvent[]>(activitySeed);

  const setLogRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const el = document.querySelector('.eva-activity-feed__log');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let templateIdx = 0;
    const interval = setInterval(() => {
      const template = newEventTemplates[templateIdx % newEventTemplates.length];
      if (!template) return;
      templateIdx++;
      const newEvent: ActivityEvent = {
        ...template,
        time: formatTime(new Date()),
      };
      setEvents(prev => [...prev, newEvent]);

      // Auto-scroll after state update
      requestAnimationFrame(() => {
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      });
    }, 2500 + Math.random() * 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="eva-activity-feed" role="log" aria-label="Activity feed" aria-live="polite">
      <div className="eva-activity-feed__header">
        <div>
          <div className="eva-activity-feed__title">EVENT LOG</div>
          <div className="eva-activity-feed__title-ja">イベントログ</div>
        </div>
        <div className="eva-activity-feed__live">
          <span className="eva-activity-feed__live-dot" />
          LIVE
        </div>
      </div>
      <div className="eva-activity-feed__log" ref={setLogRef}>
        {events.map((event, i) => (
          <div className="eva-activity-feed__entry" key={`${event.time}-${i}`}>
            <span className="eva-activity-feed__timestamp">{event.time}</span>
            <span className={`eva-activity-feed__badge eva-activity-feed__badge--${event.result}`}>
              {badgeLabels[event.result]}
            </span>
            <span className="eva-activity-feed__suite">{event.suite}</span>
            <span className="eva-activity-feed__message">{event.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Demo: Activity feed in a large hex cell — scrolling terminal-like log of test events with live data stream feel. */
export const ActivityFeed: Story = {
  decorators: [(Story) => <div style={{ width: 960, height: 700, border: '1px solid var(--eva-border)' }}><Story /></div>],
  render: (args) => (
    <HexDashboard {...args} atmosphere>
      {/* Large activity feed cell */}
      <HexCell col={1} row={0} colSpan={3} rowSpan={2} size="lg" state="active">
        <ActivityFeedCell />
      </HexCell>

      {/* Small status cells around the feed */}
      <HexCell col={0} row={0} size="sm" state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem' }}>830</div>
          <div style={{ color: 'var(--eva-text-dim)' }}>TOTAL</div>
        </div>
      </HexCell>
      <HexCell col={5} row={0} size="sm" state="active">
        <div style={{ color: '#22cc44', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem' }}>97.1%</div>
          <div style={{ color: 'var(--eva-text-dim)' }}>PASS</div>
        </div>
      </HexCell>
      <HexCell col={0} row={2} size="sm" state="warning">
        <div style={{ color: 'var(--eva-crimson)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem' }}>17</div>
          <div style={{ color: 'var(--eva-text-dim)' }}>FAIL</div>
        </div>
      </HexCell>
      <HexCell col={5} row={2} size="sm">
        <div style={{ color: 'var(--eva-text-dim)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem' }}>24</div>
          <div>SKIP</div>
        </div>
      </HexCell>
    </HexDashboard>
  ),
};

/* ── Full Demo: Polished Layout ── */

/**
 * LiveClock — displays current UTC time with blinking colon separator.
 * Updates every second. Respects prefers-reduced-motion.
 */
function LiveClock(): React.JSX.Element {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(now.getUTCHours()).padStart(2, '0');
  const m = String(now.getUTCMinutes()).padStart(2, '0');
  const s = String(now.getUTCSeconds()).padStart(2, '0');

  return (
    <span className="eva-full-demo-clock" aria-label={`${h}:${m}:${s} UTC`} role="timer">
      {h}<span className="eva-full-demo-clock__colon">:</span>{m}<span className="eva-full-demo-clock__colon">:</span>{s} UTC
    </span>
  );
}

/**
 * Full demo — polished layout with balanced hex grid, HazardStripes between zones,
 * sidebar with section dividers, and header with live clock.
 * Combines test suites, metrics, MAGI voting, and activity feed.
 */
export const FullDemo: Story = {
  decorators: [(Story) => <div style={fullscreen}><Story /></div>],
  render: (args) => (
    <HexDashboard
      {...args}
      atmosphere
      cellSize={48}
      gap={4}
      minGapSize={64}
      gapDistribution="left"
      gapDistributionVertical="top"
      zones={{
        top: (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <HudHeader scanlines>
              <HudHeader.Title subtitle="第壱中央指令所">NERV TEST COMMAND</HudHeader.Title>
              <HudHeader.Status>
                <LiveClock />
              </HudHeader.Status>
            </HudHeader>
            <HazardStripes height={3} animated speed={15} />
          </div>
        ),
        left: (
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: 1 }}>
              <HudSidebar hazardAccent scanlines>
                <HudSidebar.Logo>NERV</HudSidebar.Logo>
                <HudSidebar.Section label="MONITORING">
                  <HudSidebar.Nav>
                    <HudSidebar.NavItem label="DASHBOARD" active />
                    <HudSidebar.NavItem label="TEST SUITES" />
                    <HudSidebar.NavItem label="METRICS" />
                  </HudSidebar.Nav>
                </HudSidebar.Section>
                <HudSidebar.Section label="SYSTEMS">
                  <HudSidebar.Nav>
                    <HudSidebar.NavItem label="MAGI STATUS" />
                    <HudSidebar.NavItem label="ALERTS" />
                    <HudSidebar.NavItem label="EVENT LOG" />
                  </HudSidebar.Nav>
                </HudSidebar.Section>
                <HudSidebar.Section label="CONFIG">
                  <HudSidebar.Nav>
                    <HudSidebar.NavItem label="SETTINGS" />
                    <HudSidebar.NavItem label="PROFILES" />
                  </HudSidebar.Nav>
                </HudSidebar.Section>
                <HudSidebar.Footer>
                  <span style={{ fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>v3.01 — MAGI OS</span>
                </HudSidebar.Footer>
              </HudSidebar>
            </div>
            <HazardStripes angle={90} height="100%" stripeWidth={2} animated speed={10} />
          </div>
        ),
        bottom: (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <HazardStripes height={2} animated speed={12} />
            <div style={{
              height: '100%',
              background: 'var(--eva-deep)',
              borderTop: '1px solid var(--eva-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
              fontFamily: 'var(--eva-font-mono)',
              fontSize: '0.5rem',
              color: 'var(--eva-text-dim)',
            }}>
              <span>MAGI SYSTEM: <span style={{ color: 'var(--eva-text-gold)' }}>NOMINAL</span></span>
              <span>SYNC ACTIVE • 6 SUITES • 830 TESTS</span>
            </div>
          </div>
        ),
      }}
    >
      {/* Row 0: Key metrics — large prominent cells */}
      <HexCell col={0} row={0} size="lg" state="active">
        <MetricCell metric={metrics[0] as MetricData} />
      </HexCell>
      <HexCell col={2} row={0} size="lg" state="active">
        <MetricCell metric={metrics[1] as MetricData} />
      </HexCell>
      <HexCell col={4} row={0} size="lg" state="active">
        <MetricCell metric={metrics[4] as MetricData} />
      </HexCell>

      {/* Row 1: Small status indicators */}
      <HexCell col={7} row={1} size="sm" state="active">
        <div style={{ color: '#22cc44', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem' }}>97.1%</div>
          <div style={{ color: 'var(--eva-text-dim)' }}>PASS</div>
        </div>
      </HexCell>
      <HexCell col={8} row={1} size="sm" state="warning">
        <div style={{ color: 'var(--eva-crimson)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem' }}>17</div>
          <div style={{ color: 'var(--eva-text-dim)' }}>FAIL</div>
        </div>
      </HexCell>

      {/* Row 2: MAGI voting panels */}
      {magiVotes.map((data, i) => (
        <HexCell
          key={data.system}
          col={i * 2}
          row={2}
          size="lg"
          state={data.vote === 'deny' ? 'warning' : 'active'}
        >
          <MagiVoteCell data={data} />
        </HexCell>
      ))}

      {/* Row 2 right: compact test suite cells */}
      <HexCell col={6} row={2} state="active">
        <TestSuiteCell suite={suites[0] as TestSuiteData} />
      </HexCell>
      <HexCell col={8} row={2} state="active">
        <TestSuiteCell suite={suites[2] as TestSuiteData} />
      </HexCell>

      {/* Row 4: Build verdict + activity feed */}
      <HexCell col={0} row={4} colSpan={3} size="lg" state="active">
        <div className="eva-magi-vote-console">
          <div className="eva-magi-vote-console__label">BUILD VERDICT</div>
          <div className="eva-magi-vote-console__label-ja">ビルド判定</div>
          <MagiConsole
            votes={{
              melchior: magiVotes[0]?.vote,
              balthasar: magiVotes[1]?.vote,
              caspar: magiVotes[2]?.vote,
            }}
            syncRates={{
              melchior: magiVotes[0]?.syncRate,
              balthasar: magiVotes[1]?.syncRate,
              caspar: magiVotes[2]?.syncRate,
            }}
            title="BUILD STATUS"
            titleJa="ビルド状態"
            showJapanese
            pulse
          />
        </div>
      </HexCell>
      <HexCell col={4} row={4} colSpan={3} rowSpan={2} size="lg" state="active">
        <ActivityFeedCell />
      </HexCell>

      {/* Row 4-5 right: more small status */}
      <HexCell col={8} row={4} size="sm" state="active">
        <div style={{ color: 'var(--eva-text-gold)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem' }}>830</div>
          <div style={{ color: 'var(--eva-text-dim)' }}>TOTAL</div>
        </div>
      </HexCell>
      <HexCell col={8} row={5} size="sm">
        <div style={{ color: 'var(--eva-text-dim)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem' }}>24</div>
          <div>SKIP</div>
        </div>
      </HexCell>
    </HexDashboard>
  ),
};

/* ── Masonry Layout Stories ── */

const masonryCellStyle: React.CSSProperties = {
  color: 'var(--eva-text-gold)',
  fontFamily: 'var(--eva-font-mono)',
  fontSize: '0.625rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

/** Masonry layout — 10 mixed-size cells auto-placed without col/row. */
export const MasonryBasic: Story = {
  decorators: [(Story) => <div style={{ width: 960, height: 600, border: '1px solid var(--eva-border)' }}><Story /></div>],
  render: (args) => (
    <HexDashboard {...args} layout="masonry" atmosphere>
      <HexCell size="xl" state="active">
        <div style={masonryCellStyle}>
          <div style={{ fontSize: '1rem' }}>MAIN</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>メイン • XL</div>
        </div>
      </HexCell>
      <HexCell size="lg" state="active">
        <div style={masonryCellStyle}>
          <div>SYNC RATE</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>同期率 • LG</div>
        </div>
      </HexCell>
      <HexCell size="lg" state="warning">
        <div style={masonryCellStyle}>
          <div>AT FIELD</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>ATフィールド • LG</div>
        </div>
      </HexCell>
      <HexCell size="md" state="active">
        <div style={masonryCellStyle}>
          <div>TEMP</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>温度</div>
        </div>
      </HexCell>
      <HexCell size="md" state="active">
        <div style={masonryCellStyle}>
          <div>DEPTH</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>深度</div>
        </div>
      </HexCell>
      <HexCell size="md" state="active">
        <div style={masonryCellStyle}>
          <div>PURITY</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>純度</div>
        </div>
      </HexCell>
      <HexCell size="sm" state="active">
        <div style={masonryCellStyle}><div>OK</div></div>
      </HexCell>
      <HexCell size="sm" state="warning">
        <div style={masonryCellStyle}><div>!</div></div>
      </HexCell>
      <HexCell size="sm" state="active">
        <div style={masonryCellStyle}><div>OK</div></div>
      </HexCell>
      <HexCell size="sm">
        <div style={masonryCellStyle}><div>--</div></div>
      </HexCell>
    </HexDashboard>
  ),
};

/** Masonry responsive — resize the browser to see cells reflow into available space. */
export const MasonryResponsive: Story = {
  decorators: [(Story) => <div style={fullscreen}><Story /></div>],
  render: (args) => (
    <HexDashboard {...args} layout="masonry" atmosphere cellSize={52} gap={5}>
      <HexCell size="xl" state="active">
        <div style={masonryCellStyle}>
          <div style={{ fontSize: '1.2rem' }}>COMMAND</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>司令部 • RESIZE TO REFLOW</div>
        </div>
      </HexCell>
      <HexCell size="lg" state="active">
        <div style={masonryCellStyle}>
          <div>MELCHIOR</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>メルキオール</div>
        </div>
      </HexCell>
      <HexCell size="lg" state="active">
        <div style={masonryCellStyle}>
          <div>BALTHASAR</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>バルタザール</div>
        </div>
      </HexCell>
      <HexCell size="lg" state="warning">
        <div style={masonryCellStyle}>
          <div>CASPAR</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>カスパー</div>
        </div>
      </HexCell>
      <HexCell size="md" state="active">
        <div style={masonryCellStyle}><div>STATUS A</div></div>
      </HexCell>
      <HexCell size="md" state="active">
        <div style={masonryCellStyle}><div>STATUS B</div></div>
      </HexCell>
      <HexCell size="md" state="active">
        <div style={masonryCellStyle}><div>STATUS C</div></div>
      </HexCell>
      <HexCell size="sm" state="active">
        <div style={masonryCellStyle}><div>01</div></div>
      </HexCell>
      <HexCell size="sm" state="active">
        <div style={masonryCellStyle}><div>02</div></div>
      </HexCell>
      <HexCell size="sm" state="active">
        <div style={masonryCellStyle}><div>03</div></div>
      </HexCell>
      <HexCell size="sm" state="active">
        <div style={masonryCellStyle}><div>04</div></div>
      </HexCell>
      <HexCell size="sm">
        <div style={masonryCellStyle}><div>05</div></div>
      </HexCell>
    </HexDashboard>
  ),
};

/** Masonry with priority ordering — lower priority cells are placed first regardless of DOM order. */
export const MasonryPriority: Story = {
  decorators: [(Story) => <div style={{ width: 960, height: 600, border: '1px solid var(--eva-border)' }}><Story /></div>],
  render: (args) => (
    <HexDashboard {...args} layout="masonry" atmosphere>
      {/* DOM order: sm first, but priority puts lg/xl first */}
      <HexCell size="sm" state="active" priority={3}>
        <div style={masonryCellStyle}>
          <div>p=3</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>LOW PRI</div>
        </div>
      </HexCell>
      <HexCell size="sm" state="active" priority={3}>
        <div style={masonryCellStyle}>
          <div>p=3</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>LOW PRI</div>
        </div>
      </HexCell>
      <HexCell size="xl" state="active" priority={0}>
        <div style={masonryCellStyle}>
          <div style={{ fontSize: '1rem' }}>PRIORITY 0</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>最優先 • PLACED FIRST</div>
        </div>
      </HexCell>
      <HexCell size="lg" state="warning" priority={1}>
        <div style={masonryCellStyle}>
          <div>PRIORITY 1</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>高優先</div>
        </div>
      </HexCell>
      <HexCell size="lg" state="active" priority={1}>
        <div style={masonryCellStyle}>
          <div>PRIORITY 1</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>高優先</div>
        </div>
      </HexCell>
      <HexCell size="md" state="active" priority={2}>
        <div style={masonryCellStyle}>
          <div>p=2</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>MID PRI</div>
        </div>
      </HexCell>
      <HexCell size="md" state="active" priority={2}>
        <div style={masonryCellStyle}>
          <div>p=2</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>MID PRI</div>
        </div>
      </HexCell>
      <HexCell size="sm" state="active" priority={3}>
        <div style={masonryCellStyle}>
          <div>p=3</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>LOW PRI</div>
        </div>
      </HexCell>
    </HexDashboard>
  ),
};

/** Masonry with zones — sidebar + header chrome combined with auto-placed masonry content. */
export const MasonryWithZones: Story = {
  decorators: [(Story) => <div style={fullscreen}><Story /></div>],
  render: (args) => (
    <HexDashboard
      {...args}
      layout="masonry"
      atmosphere
      cellSize={48}
      gap={4}
      minGapSize={64}
      gapDistribution="left"
      gapDistributionVertical="top"
      zones={{
        top: (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <HudHeader scanlines>
              <HudHeader.Title subtitle="自動配置モード">MASONRY LAYOUT</HudHeader.Title>
              <HudHeader.Status>
                <LiveClock />
              </HudHeader.Status>
            </HudHeader>
            <HazardStripes height={3} animated speed={15} />
          </div>
        ),
        left: (
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: 1 }}>
              <HudSidebar hazardAccent scanlines>
                <HudSidebar.Logo>NERV</HudSidebar.Logo>
                <HudSidebar.Section label="LAYOUT">
                  <HudSidebar.Nav>
                    <HudSidebar.NavItem label="MASONRY" active />
                    <HudSidebar.NavItem label="MANUAL" />
                  </HudSidebar.Nav>
                </HudSidebar.Section>
                <HudSidebar.Footer>
                  <span style={{ fontFamily: 'var(--eva-font-mono)', fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>MASONRY v1.0</span>
                </HudSidebar.Footer>
              </HudSidebar>
            </div>
            <HazardStripes angle={90} height="100%" stripeWidth={2} animated speed={10} />
          </div>
        ),
      }}
    >
      <HexCell size="xl" state="active" priority={0}>
        <div style={masonryCellStyle}>
          <div style={{ fontSize: '1rem' }}>MAIN DISPLAY</div>
          <div style={{ fontSize: '0.5rem', color: 'var(--eva-text-dim)' }}>メインディスプレイ</div>
        </div>
      </HexCell>
      <HexCell size="lg" state="active" priority={1}>
        <MetricCell metric={metrics[0] as MetricData} />
      </HexCell>
      <HexCell size="lg" state="active" priority={1}>
        <MetricCell metric={metrics[1] as MetricData} />
      </HexCell>
      <HexCell size="lg" state="warning" priority={1}>
        <MetricCell metric={metrics[2] as MetricData} />
      </HexCell>
      <HexCell size="md" state="active" priority={2}>
        <div style={masonryCellStyle}><div>NODE A</div></div>
      </HexCell>
      <HexCell size="md" state="active" priority={2}>
        <div style={masonryCellStyle}><div>NODE B</div></div>
      </HexCell>
      <HexCell size="sm" state="active" priority={3}>
        <div style={masonryCellStyle}><div>OK</div></div>
      </HexCell>
      <HexCell size="sm" state="active" priority={3}>
        <div style={masonryCellStyle}><div>OK</div></div>
      </HexCell>
      <HexCell size="sm" state="warning" priority={3}>
        <div style={masonryCellStyle}><div>!</div></div>
      </HexCell>
    </HexDashboard>
  ),
};
