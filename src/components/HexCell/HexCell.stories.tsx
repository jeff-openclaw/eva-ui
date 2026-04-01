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

/** Side-by-side comparison of sm, md, lg, xl sizes. */
export const Sizes: Story = {
  decorators: [
    () => {
      const sizes = [
        { name: 'sm', w: 57, h: 66 },
        { name: 'md', w: 76, h: 88 },
        { name: 'lg', w: 152, h: 176 },
        { name: 'xl', w: 228, h: 264 },
      ] as const;
      return (
        <div style={{ padding: 48, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {sizes.map(({ name, w, h }) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div style={{ width: w, height: h, position: 'relative' }}>
                <HexCell col={0} row={0} size={name} state="active">
                  <div style={{ color: 'var(--eva-text-gold)' }}>{name.toUpperCase()}</div>
                  <div style={{ color: 'var(--eva-text-dim)' }}>{w}×{h}</div>
                </HexCell>
              </div>
              <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.625rem', marginTop: 8, fontFamily: 'var(--eva-font-mono)' }}>
                size="{name}"
              </div>
            </div>
          ))}
        </div>
      );
    },
  ],
};

/** Cell with rich structured content: title, body text, and stats. */
export const WithRichContent: Story = {
  decorators: [
    () => (
      <div style={{ padding: 48, display: 'flex', gap: 24 }}>
        <div style={{ width: 152, height: 176, position: 'relative' }}>
          <HexCell col={0} row={0} size="lg" state="active">
            <div style={{ color: 'var(--eva-text-gold)', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em' }}>
              MELCHIOR
            </div>
            <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.625rem', marginTop: 4 }}>
              Personality transplant OS
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--eva-text-gold)', fontSize: '0.875rem' }}>98%</div>
                <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.5rem' }}>SYNC</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--eva-text-gold)', fontSize: '0.875rem' }}>OK</div>
                <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.5rem' }}>STATUS</div>
              </div>
            </div>
          </HexCell>
        </div>
        <div style={{ width: 228, height: 264, position: 'relative' }}>
          <HexCell col={0} row={0} size="xl" state="active">
            <div style={{ color: 'var(--eva-text-gold)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.05em' }}>
              SYSTEM MONITOR
            </div>
            <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.75rem', marginTop: 6 }}>
              Central Dogma — Level 3
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--eva-crimson, #cc1111)', fontSize: '1.25rem', fontFamily: 'var(--eva-font-mono)' }}>03</div>
                <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.5rem' }}>ALERTS</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--eva-text-gold)', fontSize: '1.25rem', fontFamily: 'var(--eva-font-mono)' }}>7.2s</div>
                <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.5rem' }}>UPTIME</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--eva-text-gold)', fontSize: '1.25rem', fontFamily: 'var(--eva-font-mono)' }}>42%</div>
                <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.5rem' }}>LOAD</div>
              </div>
            </div>
          </HexCell>
        </div>
      </div>
    ),
  ],
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
