// Components
export { HexGrid } from './components/HexGrid';
export type { HexGridProps } from './components/HexGrid';

// Theme
export { EvaThemeProvider } from './theme';
export type { EvaThemeProviderProps } from './theme';

// Utils (for advanced consumers)
export {
  hex, hexAdd, hexSubtract, hexScale, hexEqual,
  hexLength, hexDistance,
  hexDirection, hexNeighbor, hexNeighbors,
  hexToPixel, pixelToHex, hexRound, pixelToHexRounded,
  offsetToAxial, axialToOffset,
  hexCorners, hexPolygonPoints, hexClipPath,
  hexRange, hexRing, hexSpiral, hexLine, hexRectangle,
  POINTY, FLAT, SQRT3,
} from './utils/hexGeometry';

// Types
export type {
  Hex, FractionalHex, Point, HexLayout, Orientation,
} from './utils/hexTypes';
