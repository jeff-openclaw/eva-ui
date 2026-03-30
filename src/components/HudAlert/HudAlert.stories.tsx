import type { Meta, StoryObj } from '@storybook/react';
import { HudAlert } from './HudAlert';

const meta: Meta<typeof HudAlert> = {
  title: 'Chrome/HudAlert',
  component: HudAlert,
  parameters: { backgrounds: { default: 'eva-void' } },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HudAlert>;

export const Info: Story = {
  args: {
    severity: 'info',
    title: 'SYSTEM UPDATE',
    titleJa: 'システム更新',
    children: 'MAGI firmware update v3.14 available.',
    onDismiss: () => {},
  },
};

export const Caution: Story = {
  args: {
    severity: 'caution',
    title: 'SYNC WARNING',
    titleJa: 'シンクロ警告',
    children: 'Pilot sync rate below optimal threshold.',
    onDismiss: () => {},
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    title: 'PATTERN BLUE',
    titleJa: 'パターン青',
    children: 'Angel-class entity detected approaching Tokyo-3.',
    onDismiss: () => {},
  },
};

export const Critical: Story = {
  args: {
    severity: 'critical',
    title: 'AT FIELD BREACH',
    titleJa: 'ATフィールド突破',
    children: 'Immediate defensive measures required.',
    onDismiss: () => {},
  },
};

export const Berserk: Story = {
  args: {
    severity: 'critical',
    title: 'EVA UNIT-01 BERSERK',
    titleJa: '初号機暴走',
    children: 'Entry plug ejection failed. All hands brace.',
    berserk: true,
    onDismiss: () => {},
  },
};

export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <HudAlert severity="info" title="INFO" titleJa="情報">System nominal.</HudAlert>
      <HudAlert severity="caution" title="CAUTION" titleJa="注意">Elevated readings.</HudAlert>
      <HudAlert severity="warning" title="WARNING" titleJa="警報">Pattern detected.</HudAlert>
      <HudAlert severity="critical" title="CRITICAL" titleJa="緊急">Breach imminent.</HudAlert>
    </div>
  ),
};
