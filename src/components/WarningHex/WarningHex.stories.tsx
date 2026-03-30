import type { Meta, StoryObj } from '@storybook/react';
import { WarningHex } from './WarningHex';

const hexContainer: React.CSSProperties = {
  width: 76,
  height: 88,
  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
};

const meta: Meta<typeof WarningHex> = {
  title: 'Eva/WarningHex',
  component: WarningHex,
  parameters: { backgrounds: { default: 'eva-void' } },
  decorators: [
    (Story) => (
      <div style={{ padding: 48, display: 'flex', gap: 16 }}>
        <div style={hexContainer}><Story /></div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof WarningHex>;

export const Caution: Story = { args: { level: 'caution' } };
export const Warning: Story = { args: { level: 'warning' } };
export const Critical: Story = { args: { level: 'critical' } };
export const Berserk: Story = { args: { level: 'berserk' } };

export const PatternBlue: Story = {
  args: { level: 'warning', label: 'PATTERN BLUE', labelJa: 'パターン青' },
};

export const AllLevels: Story = {
  decorators: [
    () => (
      <div style={{ padding: 48, display: 'flex', gap: 16 }}>
        {(['caution', 'warning', 'critical', 'berserk'] as const).map((level) => (
          <div key={level} style={{ textAlign: 'center' }}>
            <div style={hexContainer}>
              <WarningHex level={level} />
            </div>
            <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.625rem', marginTop: 4, fontFamily: 'var(--eva-font-mono)' }}>
              {level}
            </div>
          </div>
        ))}
      </div>
    ),
  ],
};
