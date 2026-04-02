# HexDashboard Masonry Layout Spec

## Overview
Add `layout="masonry"` mode to HexDashboard. When enabled, HexCell children don't need `col`/`row` — they auto-flow into available grid positions based on size and priority.

## API Changes

### HexDashboard
```tsx
<HexDashboard layout="masonry" cellSize={72} gap={6} zones={...} atmosphere>
  <HexCell size="xl">Big content panel</HexCell>
  <HexCell size="lg">Chart</HexCell>
  <HexCell size="md">Metric</HexCell>
  <HexCell size="sm">Status</HexCell>
</HexDashboard>
```

New/changed props:
- `layout?: 'manual' | 'masonry'` — default `'manual'` (current behavior, col/row required)
- When `layout="masonry"`, col/row are IGNORED on children. Placement is automatic.

### HexCell — new optional props for masonry:
- `priority?: number` — lower = placed first (default: 0, then by DOM order)
- `order?: number` — explicit ordering (alternative to priority, same semantics)

## Masonry Layout Algorithm

### Size → Grid Footprint
Each size maps to a rectangular footprint in grid coordinates:
- `sm` (0.75x): 1 col × 1 row
- `md` (1x): 1 col × 1 row  
- `lg` (2x): 2 cols × 2 rows
- `xl` (3x): 3 cols × 3 rows
- numeric N: ceil(N) cols × ceil(N) rows

### Placement Algorithm (greedy bin-packing)
1. Compute available grid (cols × rows) from container dimensions (existing computeLayout)
2. Create occupancy grid: `boolean[rows][cols]` — all false initially
3. Collect all HexCell children, sort by: priority ASC, then DOM order
4. For each cell, determine its footprint (fw × fh from size)
5. Scan the occupancy grid top-to-bottom, left-to-right:
   - For each candidate position (c, r), check if ALL positions in the footprint are free
   - For odd rows, account for the hex offset (half-col shift)
   - First valid position wins → mark those positions as occupied
   - Store the placement: { childIndex, col, row, size }
6. If a cell doesn't fit anywhere, skip it (don't render — grid is full)
7. Return placements array

### Positioning
Once placements are computed, position cells exactly like manual mode:
- Use the computed (col, row) as offset coordinates
- Same pixel conversion: `cx = col * horizSpacing + offset + cellWidth/2`
- Same size multiplier scaling for the wrapper div

### Responsiveness
Already handled: ResizeObserver triggers recompute → new cols/rows → rerun placement algorithm → cells reflow. No additional work needed since masonry placements are recomputed from layout.

## Implementation Plan

### New file: `computeMasonry.ts`
```ts
interface MasonryPlacement {
  childIndex: number;
  col: number;
  row: number;
  footprintCols: number;
  footprintRows: number;
}

function computeMasonryPlacements(
  children: { size: HexCellSize | number; priority: number }[],
  gridCols: number,
  gridRows: number,
): MasonryPlacement[]
```

### Changes to `HexDashboard.tsx`
- Add `layout` prop
- When `layout="masonry"`:
  - Extract size/priority from each HexCell child
  - Call `computeMasonryPlacements()` with grid dimensions from layout
  - Use returned placements instead of reading col/row from props
  - Clone children with computed col/row injected (or position wrappers directly)
- Background hex suppression: use placement footprints instead of scanning child props

### Changes to `HexCell.tsx`
- Add `priority?: number` and `order?: number` to HexCellProps
- These are read by HexDashboard in masonry mode, not used by HexCell itself

## Edge Cases
- Container too small for any cell: render nothing (or just the zones)
- xl cell doesn't fit: try placing it, if no position works, skip
- All cells placed but grid has gaps: filled by background atmosphere hexes (existing)
- Resize shrinks grid: some cells may not fit anymore — they get dropped
- Empty children (null, fragments): skip in placement

## Backward Compatibility
- `layout="manual"` (default) = current behavior, zero changes
- Existing demos and stories work unchanged
- `layout="masonry"` is opt-in

## Testing
- Add Storybook stories:
  - `MasonryBasic` — 10 mixed-size cells
  - `MasonryResponsive` — resize browser to see reflow
  - `MasonryPriority` — priority ordering
  - `MasonryWithZones` — sidebar + header + masonry content
</content>
</invoke>