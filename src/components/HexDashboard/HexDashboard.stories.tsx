import type { Meta, StoryObj } from '@storybook/react';
import { HexDashboard } from './HexDashboard';
import { HexCell } from '../HexCell';

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
