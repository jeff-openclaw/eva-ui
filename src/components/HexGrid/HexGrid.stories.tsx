import type { Meta, StoryObj } from '@storybook/react';
import { HexGrid } from './HexGrid';
import { EvaThemeProvider } from '../../theme';

const meta: Meta<typeof HexGrid> = {
  title: 'Components/HexGrid',
  component: HexGrid,
  decorators: [
    (Story) => (
      <EvaThemeProvider>
        <div style={{ width: '100vw', height: '100vh', padding: 24 }}>
          <Story />
        </div>
      </EvaThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HexGrid>;

export const Default: Story = {
  args: {
    cellSize: 44,
    gap: 4,
    cols: 8,
    rows: 6,
  },
};

export const Large: Story = {
  args: {
    cellSize: 64,
    gap: 6,
    cols: 6,
    rows: 4,
  },
};

export const Small: Story = {
  args: {
    cellSize: 24,
    gap: 2,
    cols: 12,
    rows: 10,
  },
};

export const WithActiveCells: Story = {
  args: {
    cellSize: 44,
    gap: 4,
    cols: 8,
    rows: 6,
    activeCells: new Set(['1,1', '2,1', '3,2']),
  },
};

export const WithScanlines: Story = {
  args: {
    cellSize: 44,
    gap: 4,
    cols: 8,
    rows: 6,
    scanlines: true,
  },
};

export const WithContent: Story = {
  args: {
    cellSize: 64,
    gap: 4,
    cols: 6,
    rows: 4,
    renderCell: (hex) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: 'var(--eva-text)',
          fontFamily: 'var(--eva-font-mono)',
          fontSize: 'var(--eva-text-xs)',
        }}
      >
        {hex.q},{hex.r}
      </div>
    ),
  },
};
