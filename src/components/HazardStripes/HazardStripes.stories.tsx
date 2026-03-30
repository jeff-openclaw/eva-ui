import type { Meta, StoryObj } from '@storybook/react';
import { HazardStripes } from './HazardStripes';

const meta: Meta<typeof HazardStripes> = {
  title: 'Components/HazardStripes',
  component: HazardStripes,
  parameters: { backgrounds: { default: 'eva-void' } },
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof HazardStripes>;

export const Default: Story = {};

export const Thick: Story = {
  args: { stripeWidth: 8, height: 8 },
};

export const Animated: Story = {
  args: { animated: true, height: 6 },
};

export const GoldStripes: Story = {
  args: { color: 'var(--eva-gold)', height: 4 },
};

export const WarningBar: Story = {
  args: { color: 'var(--eva-warning)', animated: true, height: 8, stripeWidth: 6 },
};
