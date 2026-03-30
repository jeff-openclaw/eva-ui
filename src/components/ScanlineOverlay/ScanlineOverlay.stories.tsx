import type { Meta, StoryObj } from '@storybook/react';
import { ScanlineOverlay } from './ScanlineOverlay';

const meta: Meta<typeof ScanlineOverlay> = {
  title: 'Components/ScanlineOverlay',
  component: ScanlineOverlay,
  parameters: { backgrounds: { default: 'eva-void' } },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 400, height: 300, background: 'var(--eva-panel)', border: '1px solid var(--eva-border)' }}>
        <div style={{ padding: 24, color: 'var(--eva-text)', fontFamily: 'var(--eva-font-mono)' }}>
          <p>NERV CENTRAL DOGMA</p>
          <p style={{ color: 'var(--eva-text-gold)' }}>MAGI SYSTEM ONLINE</p>
          <p style={{ color: 'var(--eva-text-dim)', fontSize: '0.75rem' }}>第壱中央指令所</p>
        </div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ScanlineOverlay>;

export const Default: Story = {};

export const Animated: Story = {
  args: { animated: true },
};

export const Flicker: Story = {
  args: { flicker: true },
};

export const Heavy: Story = {
  args: { lineHeight: 3, opacity: 0.12 },
};

export const Subtle: Story = {
  args: { lineHeight: 1, opacity: 0.03 },
};
