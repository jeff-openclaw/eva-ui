import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HudModal } from './HudModal';

const meta: Meta<typeof HudModal> = {
  title: 'Chrome/HudModal',
  component: HudModal,
  parameters: { backgrounds: { default: 'eva-void' } },
};
export default meta;

type Story = StoryObj<typeof HudModal>;

const ModalDemo = ({ berserk = false, title = 'CONFIRM OPERATION', titleJa = '作戦確認' }) => {
  const [open, setOpen] = useState(true);
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
        }}
      >
        OPEN MODAL
      </button>
      <HudModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        titleJa={titleJa}
        berserk={berserk}
        footer={
          <>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                color: 'var(--eva-text-dim)',
                border: '1px solid var(--eva-border)',
                padding: '6px 16px',
                fontFamily: 'var(--eva-font-mono)',
                cursor: 'pointer',
              }}
            >
              CANCEL
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'var(--eva-deep)',
                color: 'var(--eva-text-gold)',
                border: '1px solid var(--eva-gold)',
                padding: '6px 16px',
                fontFamily: 'var(--eva-font-mono)',
                cursor: 'pointer',
              }}
            >
              CONFIRM
            </button>
          </>
        }
      >
        <p>Initiating EVA Unit-01 activation sequence.</p>
        <p style={{ color: 'var(--eva-text-dim)', marginTop: 8, fontSize: '0.75rem' }}>
          Pilot sync rate: 41.3% — Borderline acceptable.
        </p>
      </HudModal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Berserk: Story = {
  render: () => <ModalDemo berserk title="WARNING" titleJa="警告" />,
};
