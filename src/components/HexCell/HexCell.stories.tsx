import type { Meta, StoryObj } from '@storybook/react';
import { HexCell } from './HexCell';

const hexContainer: React.CSSProperties = {
  width: 76,
  height: 88,
  position: 'relative',
};

const meta: Meta<typeof HexCell> = {
  title: 'Components/HexCell',
  component: HexCell,
  parameters: { backgrounds: { default: 'eva-void' } },
  decorators: [
    (Story) => (
      <div style={{ padding: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={hexContainer}><Story /></div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HexCell>;

export const Default: Story = {
  args: { col: 0, row: 0 },
};

export const Active: Story = {
  args: { col: 0, row: 0, state: 'active' },
};

export const Warning: Story = {
  args: { col: 0, row: 0, state: 'warning' },
};

export const Disabled: Story = {
  args: { col: 0, row: 0, state: 'disabled' },
};

export const Interactive: Story = {
  args: { col: 0, row: 0, interactive: true },
};

export const WithContent: Story = {
  args: {
    col: 0,
    row: 0,
    state: 'active',
    children: (
      <div style={{ color: 'var(--eva-text)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem', textAlign: 'center' }}>
        <div style={{ color: 'var(--eva-text-gold)' }}>MAGI</div>
        <div>01</div>
      </div>
    ),
  },
};

export const AllStates: Story = {
  decorators: [
    () => (
      <div style={{ padding: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {(['default', 'active', 'hover', 'disabled', 'warning'] as const).map((state) => (
          <div key={state} style={{ textAlign: 'center' }}>
            <div style={hexContainer}>
              <HexCell col={0} row={0} state={state}>
                <span style={{ color: 'var(--eva-text-dim)', fontFamily: 'var(--eva-font-mono)', fontSize: '0.625rem' }}>
                  {state}
                </span>
              </HexCell>
            </div>
            <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.625rem', marginTop: 4, fontFamily: 'var(--eva-font-mono)' }}>
              {state}
            </div>
          </div>
        ))}
      </div>
    ),
  ],
};
