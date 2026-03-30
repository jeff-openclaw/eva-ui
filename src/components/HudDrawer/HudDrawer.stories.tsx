import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HudDrawer } from './HudDrawer';

const meta: Meta<typeof HudDrawer> = {
  title: 'Chrome/HudDrawer',
  component: HudDrawer,
  parameters: { backgrounds: { default: 'eva-void' } },
};
export default meta;

type Story = StoryObj<typeof HudDrawer>;

const DrawerDemo = ({ position = 'right' }: { position?: 'left' | 'right' | 'top' | 'bottom' }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          background: 'var(--eva-panel)',
          color: 'var(--eva-text-gold)',
          border: '1px solid var(--eva-gold)',
          padding: '8px 16px',
          fontFamily: 'var(--eva-font-mono)',
          cursor: 'pointer',
          margin: 32,
        }}
      >
        OPEN DRAWER ({position.toUpperCase()})
      </button>
      <HudDrawer open={open} onClose={() => setOpen(false)} position={position}>
        <div style={{ padding: 24, fontFamily: 'var(--eva-font-mono)' }}>
          <div style={{ color: 'var(--eva-text-gold)', marginBottom: 16, letterSpacing: '0.1em' }}>
            SYSTEM DETAILS
          </div>
          <div style={{ color: 'var(--eva-text-dim)', fontSize: '0.75rem', lineHeight: 1.6 }}>
            <div>Eva Unit-01: STANDBY</div>
            <div>Sync Rate: 41.3%</div>
            <div>AT Field: NOMINAL</div>
            <div>Power: EXTERNAL</div>
            <div>Internal Battery: 04:59</div>
          </div>
        </div>
      </HudDrawer>
    </>
  );
};

export const Right: Story = {
  render: () => <DrawerDemo position="right" />,
};

export const Left: Story = {
  render: () => <DrawerDemo position="left" />,
};
