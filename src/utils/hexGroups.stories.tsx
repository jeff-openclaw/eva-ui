import type { Meta, StoryObj } from '@storybook/react';
import { HexDashboard } from '../components/HexDashboard';
import { HexCell } from '../components/HexCell';
import { hexGroupPositions } from './hexGroups';
import type { HexGroupPattern } from './hexGroups';

const contained: React.CSSProperties = {
  width: 800,
  height: 500,
  border: '1px solid var(--eva-border)',
};

const cellLabel: React.CSSProperties = {
  color: 'var(--eva-text)',
  fontFamily: 'var(--eva-font-mono)',
  fontSize: '0.5rem',
  textAlign: 'center',
};

const meta: Meta = {
  title: 'Utils/HexGroup',
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'eva-void' },
  },
};
export default meta;

type Story = StoryObj;

/** Classic hex-7 pattern: 1 center + 6 ring cells. */
export const Hex7Basic: Story = {
  render: () => {
    const cells = hexGroupPositions('hex-7', 3, 2);
    return (
      <div style={contained}>
        <HexDashboard>
          {cells.map((c) => (
            <HexCell
              key={`${c.col}-${c.row}`}
              col={c.col}
              row={c.row}
              state={c.role === 'center' ? 'active' : 'default'}
            >
              <div style={cellLabel}>
                <div style={{ color: 'var(--eva-text-gold)' }}>
                  {c.role === 'center' ? 'CTR' : `R${c.index}`}
                </div>
                <div style={{ fontSize: '0.4375rem', color: 'var(--eva-text-dim)' }}>
                  {c.col},{c.row}
                </div>
              </div>
            </HexCell>
          ))}
        </HexDashboard>
      </div>
    );
  },
};

/** Multiple hex-7 groups forming an EVA operations dashboard. */
export const HexGroupDashboard: Story = {
  render: () => {
    const groups: Array<{ pattern: HexGroupPattern; col: number; row: number; label: string; state: 'active' | 'warning' | 'default' }> = [
      { pattern: 'hex-7', col: 3, row: 2, label: 'MAGI-01', state: 'active' },
      { pattern: 'hex-7', col: 7, row: 2, label: 'MAGI-02', state: 'active' },
      { pattern: 'hex-7', col: 5, row: 5, label: 'ALERT', state: 'warning' },
    ];

    return (
      <div style={{ width: 900, height: 600, border: '1px solid var(--eva-border)' }}>
        <HexDashboard>
          {groups.flatMap((g) => {
            const cells = hexGroupPositions(g.pattern, g.col, g.row);
            return cells.map((c) => (
              <HexCell
                key={`${g.label}-${c.col}-${c.row}`}
                col={c.col}
                row={c.row}
                state={c.role === 'center' ? g.state : 'default'}
              >
                {c.role === 'center' ? (
                  <div style={cellLabel}>
                    <div style={{ color: 'var(--eva-text-gold)', fontSize: '0.5625rem' }}>{g.label}</div>
                  </div>
                ) : null}
              </HexCell>
            ));
          })}
        </HexDashboard>
      </div>
    );
  },
};

/** Strip patterns for metric bars. */
export const Strips: Story = {
  render: () => {
    const strip3 = hexGroupPositions('strip-3', 2, 1);
    const strip5 = hexGroupPositions('strip-5', 4, 3);
    const strip7 = hexGroupPositions('strip-7', 5, 5);
    const metrics = ['CPU', 'MEM', 'NET', 'I/O', 'THR', 'SYS', 'PWR'];

    return (
      <div style={{ width: 900, height: 500, border: '1px solid var(--eva-border)' }}>
        <HexDashboard>
          {strip3.map((c) => (
            <HexCell key={`s3-${c.col}-${c.row}`} col={c.col} row={c.row} state="active">
              <div style={cellLabel}>{metrics[c.index]}</div>
            </HexCell>
          ))}
          {strip5.map((c) => (
            <HexCell key={`s5-${c.col}-${c.row}`} col={c.col} row={c.row} state="active">
              <div style={cellLabel}>{metrics[c.index]}</div>
            </HexCell>
          ))}
          {strip7.map((c) => (
            <HexCell key={`s7-${c.col}-${c.row}`} col={c.col} row={c.row} state="active">
              <div style={cellLabel}>{metrics[c.index]}</div>
            </HexCell>
          ))}
        </HexDashboard>
      </div>
    );
  },
};

/** All small patterns: hex-3-top, hex-3-bottom, hex-4. */
export const SmallPatterns: Story = {
  render: () => {
    const patterns: Array<{ pattern: HexGroupPattern; col: number; row: number; label: string }> = [
      { pattern: 'hex-3-top', col: 2, row: 3, label: '▲ hex-3-top' },
      { pattern: 'hex-3-bottom', col: 5, row: 2, label: '▼ hex-3-bottom' },
      { pattern: 'hex-4', col: 8, row: 2, label: '◆ hex-4' },
    ];

    return (
      <div style={{ width: 900, height: 500, border: '1px solid var(--eva-border)' }}>
        <HexDashboard>
          {patterns.flatMap((g) => {
            const cells = hexGroupPositions(g.pattern, g.col, g.row);
            return cells.map((c) => (
              <HexCell
                key={`${g.label}-${c.col}-${c.row}`}
                col={c.col}
                row={c.row}
                state={c.role === 'center' ? 'active' : 'default'}
              >
                {c.role === 'center' ? (
                  <div style={{ ...cellLabel, fontSize: '0.4375rem' }}>{g.label}</div>
                ) : (
                  <div style={cellLabel}>{c.index}</div>
                )}
              </HexCell>
            ));
          })}
        </HexDashboard>
      </div>
    );
  },
};
