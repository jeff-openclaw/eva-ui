import type { Meta, StoryObj } from '@storybook/react';
import { MagiPanel } from './MagiPanel';

const hexContainer: React.CSSProperties = {
  width: 100,
  height: 115,
  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  border: '1px solid var(--eva-border)',
};

const meta: Meta<typeof MagiPanel> = {
  title: 'Eva/MagiPanel',
  component: MagiPanel,
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

type Story = StoryObj<typeof MagiPanel>;

export const Approve: Story = {
  args: { system: 'melchior', vote: 'approve', syncRate: 78.4 },
};

export const Deny: Story = {
  args: { system: 'balthasar', vote: 'deny', syncRate: 34.1 },
};

export const Pending: Story = {
  args: { system: 'caspar', vote: 'pending', syncRate: 50.0 },
};

export const Offline: Story = {
  args: { system: 'melchior', vote: 'offline' },
};

export const AllThree: Story = {
  decorators: [
    () => (
      <div style={{ padding: 48, display: 'flex', gap: 16 }}>
        <div style={hexContainer}>
          <MagiPanel system="melchior" vote="approve" syncRate={78.4} />
        </div>
        <div style={hexContainer}>
          <MagiPanel system="balthasar" vote="approve" syncRate={65.2} />
        </div>
        <div style={hexContainer}>
          <MagiPanel system="caspar" vote="deny" syncRate={42.8} />
        </div>
      </div>
    ),
  ],
};
