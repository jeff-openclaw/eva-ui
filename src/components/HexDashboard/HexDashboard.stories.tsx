import type { Meta, StoryObj } from '@storybook/react';
import { HexDashboard } from './HexDashboard';
import { HexCell } from '../HexCell';
import './TestSuiteDemo.css';

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
