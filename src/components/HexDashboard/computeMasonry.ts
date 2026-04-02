import type { HexCellSize } from '../HexCell/HexCell';
import { resolveHexCellSize } from '../HexCell/HexCell';

/** Placement result for a single cell in masonry layout. */
export interface MasonryPlacement {
  /** Index of the child in the original children array. */
  childIndex: number;
  /** Computed column position. */
  col: number;
  /** Computed row position. */
  row: number;
  /** Number of grid columns this cell occupies. */
  footprintCols: number;
  /** Number of grid rows this cell occupies. */
  footprintRows: number;
}

/** Input descriptor for a child cell in masonry layout. */
export interface MasonryChild {
  /** Size preset or numeric multiplier. */
  size: HexCellSize | number | undefined;
  /** Sort priority — lower values placed first. @default 0 */
  priority: number;
}

/**
 * Map a HexCell size to a rectangular grid footprint (cols × rows).
 */
function sizeToFootprint(size: HexCellSize | number | undefined): [cols: number, rows: number] {
  const multiplier = resolveHexCellSize(size);
  if (multiplier <= 1) return [1, 1];
  const span = Math.ceil(multiplier);
  return [span, span];
}

/**
 * Check if a cell with the given footprint fits at position (startCol, startRow)
 * in the occupancy grid.
 */
function canPlace(
  grid: boolean[][],
  startCol: number,
  startRow: number,
  footprintCols: number,
  footprintRows: number,
  gridCols: number,
  gridRows: number,
): boolean {
  if (startCol + footprintCols > gridCols) return false;
  if (startRow + footprintRows > gridRows) return false;
  for (let r = startRow; r < startRow + footprintRows; r++) {
    const row = grid[r];
    if (!row) return false;
    for (let c = startCol; c < startCol + footprintCols; c++) {
      if (row[c]) return false;
    }
  }
  return true;
}

/**
 * Mark positions in the occupancy grid as occupied.
 */
function markOccupied(
  grid: boolean[][],
  startCol: number,
  startRow: number,
  footprintCols: number,
  footprintRows: number,
): void {
  for (let r = startRow; r < startRow + footprintRows; r++) {
    const row = grid[r];
    if (!row) continue;
    for (let c = startCol; c < startCol + footprintCols; c++) {
      row[c] = true;
    }
  }
}

/**
 * Greedy bin-packing algorithm for masonry hex layout.
 *
 * Sorts children by priority (ascending), then DOM order.
 * Scans the occupancy grid top-to-bottom, left-to-right for
 * the first position where the cell's footprint fits entirely.
 * Cells that don't fit anywhere are skipped.
 */
export function computeMasonryPlacements(
  children: MasonryChild[],
  gridCols: number,
  gridRows: number,
): MasonryPlacement[] {
  if (gridCols <= 0 || gridRows <= 0) return [];

  // Build sorted index list: priority ASC, then original DOM order
  const indices = children.map((_, i) => i);
  indices.sort((a, b) => {
    const pa = children[a]?.priority ?? 0;
    const pb = children[b]?.priority ?? 0;
    if (pa !== pb) return pa - pb;
    return a - b;
  });

  // Create occupancy grid
  const grid: boolean[][] = Array.from({ length: gridRows }, () =>
    Array.from({ length: gridCols }, () => false),
  );

  const placements: MasonryPlacement[] = [];

  for (const childIndex of indices) {
    const child = children[childIndex];
    if (!child) continue;
    const [footprintCols, footprintRows] = sizeToFootprint(child.size);

    // Scan top-to-bottom, left-to-right
    let placed = false;
    for (let r = 0; r < gridRows && !placed; r++) {
      for (let c = 0; c < gridCols && !placed; c++) {
        if (canPlace(grid, c, r, footprintCols, footprintRows, gridCols, gridRows)) {
          markOccupied(grid, c, r, footprintCols, footprintRows);
          placements.push({ childIndex, col: c, row: r, footprintCols, footprintRows });
          placed = true;
        }
      }
    }
    // If not placed, skip this cell (grid is full for this size)
  }

  return placements;
}
