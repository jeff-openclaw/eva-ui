import type { Meta, StoryObj } from '@storybook/react';
import { CountdownTimer } from './CountdownTimer';

const hexContainer: React.CSSProperties = {
  width: 120,
  height: 138,
  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  background: 'var(--eva-hex-fill)',
  border: '1px solid var(--eva-border)',
};

const meta: Meta<typeof CountdownTimer> = {
  title: 'Eva/CountdownTimer',
  component: CountdownTimer,
  parameters: { backgrounds: { default: 'eva-void' } },
  decorators: [
    (Story) => (
      <div style={{ padding: 48, display: 'flex', gap: 24 }}>
        <div style={hexContainer}><Story /></div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CountdownTimer>;

export const Normal: Story = {
  args: { seconds: 300 },
};

export const Warning: Story = {
  args: { seconds: 45 },
};

export const Critical: Story = {
  args: { seconds: 8 },
};

export const Expired: Story = {
  args: { seconds: 0 },
};

export const AutoCounting: Story = {
  args: { seconds: 15, autoStart: true, criticalThreshold: 10 },
};

export const LongFormat: Story = {
  args: { seconds: 7259, format: 'hh:mm:ss' },
};

export const AllStates: Story = {
  decorators: [
    () => (
      <div style={{ padding: 48, display: 'flex', gap: 24 }}>
        {[300, 45, 8, 0].map((s) => (
          <div key={s} style={{ textAlign: 'center' }}>
            <div style={hexContainer}>
              <CountdownTimer seconds={s} />
            </div>
            <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.625rem', marginTop: 8, fontFamily: 'var(--eva-font-mono)' }}>
              {s > 60 ? 'normal' : s > 10 ? 'warning' : s > 0 ? 'critical' : 'expired'}
            </div>
          </div>
        ))}
      </div>
    ),
  ],
};
