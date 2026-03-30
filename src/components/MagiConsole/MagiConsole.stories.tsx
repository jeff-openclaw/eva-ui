import type { Meta, StoryObj } from '@storybook/react';
import { MagiConsole } from './MagiConsole';

const meta: Meta<typeof MagiConsole> = {
  title: 'Eva/MagiConsole',
  component: MagiConsole,
  parameters: { backgrounds: { default: 'eva-void' } },
  decorators: [(Story) => <div style={{ padding: 48 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof MagiConsole>;

export const Approved: Story = {
  args: {
    votes: { melchior: 'approve', balthasar: 'approve', caspar: 'deny' },
    syncRates: { melchior: 78.4, balthasar: 65.2, caspar: 42.8 },
  },
};

export const Denied: Story = {
  args: {
    votes: { melchior: 'deny', balthasar: 'deny', caspar: 'approve' },
    syncRates: { melchior: 55.0, balthasar: 60.1, caspar: 71.3 },
  },
};

export const Deliberating: Story = {
  args: {
    votes: { melchior: 'approve', balthasar: 'pending', caspar: 'pending' },
    syncRates: { melchior: 78.4, balthasar: 50.0, caspar: 50.0 },
  },
};

export const AllOffline: Story = {
  args: {
    votes: { melchior: 'offline', balthasar: 'offline', caspar: 'offline' },
  },
};
