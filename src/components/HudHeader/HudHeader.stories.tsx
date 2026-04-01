import type { Meta, StoryObj } from '@storybook/react';
import { HudHeader } from './HudHeader';

const meta: Meta<typeof HudHeader> = {
  title: 'Chrome/HudHeader',
  component: HudHeader,
  parameters: { backgrounds: { default: 'eva-void' } },
  decorators: [
    (Story) => (
      <div style={{ width: 700, height: 56 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HudHeader>;

export const Default: Story = {
  render: () => (
    <HudHeader>
      <HudHeader.Title subtitle="CENTRAL DOGMA">第壱中央指令所</HudHeader.Title>
      <HudHeader.Status>MAGI SYSTEM: NOMINAL</HudHeader.Status>
    </HudHeader>
  ),
};

export const EnglishTitle: Story = {
  render: () => (
    <HudHeader>
      <HudHeader.Title subtitle="第壱中央指令所">NERV COMMAND CENTER</HudHeader.Title>
      <HudHeader.Status>ALL SYSTEMS OPERATIONAL</HudHeader.Status>
    </HudHeader>
  ),
};

export const StatusOnly: Story = {
  render: () => (
    <HudHeader>
      <HudHeader.Status>PATTERN BLUE DETECTED — ALERT LEVEL 1</HudHeader.Status>
    </HudHeader>
  ),
};

export const WithScanlines: Story = {
  render: () => (
    <HudHeader scanlines>
      <HudHeader.Title subtitle="TERMINAL DOGMA">MAGI SYSTEM INTERFACE</HudHeader.Title>
      <HudHeader.Status>SCANLINE ACTIVE</HudHeader.Status>
    </HudHeader>
  ),
};
