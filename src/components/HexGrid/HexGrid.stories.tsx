import type { Meta, StoryObj } from '@storybook/react';
import { HexGrid } from './HexGrid';
import type { HexGridCell } from './HexGrid';
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

/** Mixed-size grid: one large MAGI panel surrounded by smaller status cells. */
const mixedCells: HexGridCell[] = [
  // Large center panel (2x)
  { q: 1, r: 2, size: 2, active: true },
  // Normal cells around the perimeter
  { q: -1, r: 0, active: true },
  { q: 0, r: 0 },
  { q: 1, r: 0 },
  { q: 2, r: 0, active: true },
  { q: 3, r: 0 },
  { q: 4, r: 0, active: true },
  { q: -1, r: 4 },
  { q: 0, r: 4 },
  { q: 1, r: 4, active: true },
  { q: 2, r: 4 },
  { q: 3, r: 4, active: true },
  { q: 4, r: 4 },
];

export const MixedSizes: Story = {
  args: {
    cellSize: 44,
    gap: 4,
    cols: 8,
    rows: 6,
    cells: mixedCells,
    renderCell: (hex, _center, size) => {
      const key = `${hex.q},${hex.r}`;
      const cellDef = mixedCells.find(c => `${c.q},${c.r}` === key);
      if (!cellDef) return null;
      if (size && size > 1) {
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            color: 'var(--eva-text-gold, #c90)',
            fontFamily: 'var(--eva-font-mono)',
          }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em' }}>MAGI</div>
            <div style={{ fontSize: '0.625rem', opacity: 0.7, marginTop: 4 }}>マギ・システム</div>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: '0.75rem' }}>
              <span>98.2%</span>
              <span>NOMINAL</span>
            </div>
          </div>
        );
      }
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: cellDef.active ? 'var(--eva-text-gold, #c90)' : 'var(--eva-text, #ccc)',
          fontFamily: 'var(--eva-font-mono)',
          fontSize: '0.625rem',
        }}>
          {hex.q},{hex.r}
        </div>
      );
    },
  },
};

/** Triple-size cell with normal neighbors. */
const tripleCells: HexGridCell[] = [
  { q: 2, r: 3, size: 3, active: true },
  { q: -1, r: 0, active: true },
  { q: 0, r: 0, active: true },
  { q: 1, r: 0 },
  { q: 5, r: 0 },
  { q: 6, r: 0, active: true },
  { q: 5, r: 6 },
  { q: 6, r: 6, active: true },
];

export const TripleSize: Story = {
  args: {
    cellSize: 36,
    gap: 4,
    cols: 10,
    rows: 8,
    cells: tripleCells,
    renderCell: (hex, _center, size) => {
      const key = `${hex.q},${hex.r}`;
      const cellDef = tripleCells.find(c => `${c.q},${c.r}` === key);
      if (!cellDef) return null;
      if (size && size > 1) {
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            color: 'var(--eva-text-gold, #c90)',
            fontFamily: 'var(--eva-font-mono)',
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.15em' }}>CENTRAL DOGMA</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: 6 }}>第壱中央指令所</div>
          </div>
        );
      }
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: 'var(--eva-text, #ccc)',
          fontFamily: 'var(--eva-font-mono)',
          fontSize: '0.5rem',
        }}>
          {hex.q},{hex.r}
        </div>
      );
    },
  },
};
