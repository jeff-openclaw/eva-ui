import type { Meta, StoryObj } from '@storybook/react';
import { HudTooltip } from './HudTooltip';

const meta: Meta<typeof HudTooltip> = {
  title: 'Chrome/HudTooltip',
  component: HudTooltip,
  parameters: { backgrounds: { default: 'eva-void' } },
  decorators: [
    (Story) => (
      <div style={{ padding: 100, display: 'flex', gap: 32, justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HudTooltip>;

const TriggerButton = ({ label }: { label: string }) => (
  <button
    style={{
      background: 'var(--eva-panel)',
      color: 'var(--eva-text-gold)',
      border: '1px solid var(--eva-gold)',
      padding: '8px 16px',
      fontFamily: 'var(--eva-font-mono)',
      cursor: 'pointer',
      fontSize: '0.75rem',
    }}
  >
    {label}
  </button>
);

export const Top: Story = {
  render: () => (
    <HudTooltip content="Sync Rate: 78.4%" placement="top">
      <TriggerButton label="HOVER ME" />
    </HudTooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <HudTooltip content="Battery: 04:59 remaining" placement="bottom">
      <TriggerButton label="UNIT STATUS" />
    </HudTooltip>
  ),
};

export const Right: Story = {
  render: () => (
    <HudTooltip content="MAGI-01 MELCHIOR: APPROVE" placement="right">
      <TriggerButton label="MAGI" />
    </HudTooltip>
  ),
};
