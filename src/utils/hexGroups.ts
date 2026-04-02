/**
 * Predefined hex group patterns — clusters of HexCells arranged in hexagonal macro-shapes.
 * Works in offset coordinates (col, row) using odd-r layout, consistent with HexCell/HexDashboard.
 */

import { offsetToAxial, axialToOffset, hexAdd, hexDirection } from './hexGeometry';

/** Available hex group patterns. */
export type HexGroupPattern =
  | 'hex-7'
  | 'hex-4'
  | 'hex-3-top'
  | 'hex-3-bottom'
  | 'strip-3'
  | 'strip-5'
  | 'strip-7';

/** Role of a cell within its group. */
export type CellRole = 'center' | 'ring' | 'outer';

/** A single cell position within a hex group. */
export interface GroupCell {
  /** Column in offset coordinates. */
  readonly col: number;
  /** Row in offset coordinates. */
  readonly row: number;
  /** Structural role within the group. */
  readonly role: CellRole;
  /** Positional index: 0 = center, 1–6 = ring (clockwise from top-right). */
  readonly index: number;
}

/**
 * Clockwise ring direction order starting from top-right.
 * Maps index 0–5 to hex direction indices for the ring walk.
 *
 * Pointy-top axial directions:
 *   0: E (+1,0)  1: NE (+1,-1)  2: NW (0,-1)
 *   3: W (-1,0)  4: SW (-1,+1)  5: SE (0,+1)
 *
 * Clockwise from top-right: NE(1), E(0), SE(5), SW(4), W(3), NW(2)
 */
/** Clockwise from top-right: NE, E, SE, SW, W, NW */
const RING_CW_DIRS = [1, 0, 5, 4, 3, 2] as const;

/**
 * Compute cell positions for a hex group pattern centered at the given offset coordinate.
 *
 * @param pattern - The group shape pattern
 * @param centerCol - Center cell column (offset coordinates)
 * @param centerRow - Center cell row (offset coordinates)
 * @returns Array of cell positions with role and index metadata
 */
export function hexGroupPositions(
  pattern: HexGroupPattern,
  centerCol: number,
  centerRow: number,
): GroupCell[] {
  switch (pattern) {
    case 'hex-7':
      return buildHex7(centerCol, centerRow);
    case 'hex-4':
      return buildHex4(centerCol, centerRow);
    case 'hex-3-top':
      return buildHex3Top(centerCol, centerRow);
    case 'hex-3-bottom':
      return buildHex3Bottom(centerCol, centerRow);
    case 'strip-3':
      return buildStrip(centerCol, centerRow, 3);
    case 'strip-5':
      return buildStrip(centerCol, centerRow, 5);
    case 'strip-7':
      return buildStrip(centerCol, centerRow, 7);
  }
}

/** hex-7: 1 center + 6 ring neighbors. */
function buildHex7(col: number, row: number): GroupCell[] {
  const center = offsetToAxial(col, row);
  const cells: GroupCell[] = [
    { ...axialToOffset(center), role: 'center', index: 0 },
  ];

  RING_CW_DIRS.forEach((dir, i) => {
    const neighbor = hexAdd(center, hexDirection(dir));
    cells.push({ ...axialToOffset(neighbor), role: 'ring', index: i + 1 });
  });

  return cells;
}

/** hex-4: Diamond — center + top-right + bottom-right + right (4 cells). */
function buildHex4(col: number, row: number): GroupCell[] {
  const center = offsetToAxial(col, row);
  // Diamond: center, NE, E, SE
  const dirs = [1, 0, 5] as const; // top-right, right, bottom-right
  const cells: GroupCell[] = [
    { ...axialToOffset(center), role: 'center', index: 0 },
  ];

  dirs.forEach((dir, i) => {
    const neighbor = hexAdd(center, hexDirection(dir));
    cells.push({ ...axialToOffset(neighbor), role: 'ring', index: i + 1 });
  });

  return cells;
}

/** hex-3-top: Upward triangle — center + top-right + top-left (3 cells). */
function buildHex3Top(col: number, row: number): GroupCell[] {
  const center = offsetToAxial(col, row);
  const dirs = [1, 2] as const; // NE, NW
  const cells: GroupCell[] = [
    { ...axialToOffset(center), role: 'center', index: 0 },
  ];

  dirs.forEach((dir, i) => {
    const neighbor = hexAdd(center, hexDirection(dir));
    cells.push({ ...axialToOffset(neighbor), role: 'ring', index: i + 1 });
  });

  return cells;
}

/** hex-3-bottom: Downward triangle — center + bottom-right + bottom-left (3 cells). */
function buildHex3Bottom(col: number, row: number): GroupCell[] {
  const center = offsetToAxial(col, row);
  const dirs = [5, 4] as const; // SE, SW
  const cells: GroupCell[] = [
    { ...axialToOffset(center), role: 'center', index: 0 },
  ];

  dirs.forEach((dir, i) => {
    const neighbor = hexAdd(center, hexDirection(dir));
    cells.push({ ...axialToOffset(neighbor), role: 'ring', index: i + 1 });
  });

  return cells;
}

/** Horizontal strip of `count` cells centered on the given position. */
function buildStrip(col: number, row: number, count: number): GroupCell[] {
  const half = Math.floor(count / 2);
  const cells: GroupCell[] = [];

  for (let i = 0; i < count; i++) {
    const offset = i - half;
    const role: CellRole = offset === 0 ? 'center' : 'ring';
    cells.push({ col: col + offset, row, role, index: i });
  }

  return cells;
}
