// ── Styles (import order matters) ──
import './styles/layers.css';
import './styles/animations.css';
import './styles/hud-chrome.css';

// ── Layout ──
export { HexGrid } from './components/HexGrid';
export type { HexGridProps } from './components/HexGrid';

export { HexDashboard } from './components/HexDashboard';
export type { HexDashboardProps, HexDashboardZones, HexDashboardLayoutMode } from './components/HexDashboard';
export { computeHexDashboardLayout, computeMasonryPlacements, useHexDashboardLayout } from './components/HexDashboard';
export type { HexDashboardLayout, HexDashboardLayoutConfig, GapDistribution, GapDistributionVertical, MasonryPlacement, MasonryChild } from './components/HexDashboard';

export { HexCell, resolveHexCellSize } from './components/HexCell';
export type { HexCellProps, HexCellState, HexCellSize } from './components/HexCell';

// ── Chrome ──
export { HudHeader } from './components/HudHeader';
export type { HudHeaderProps } from './components/HudHeader';

export { HudSidebar } from './components/HudSidebar';
export type { HudSidebarProps } from './components/HudSidebar';

export { HudModal } from './components/HudModal';
export type { HudModalProps } from './components/HudModal';

export { HudDrawer } from './components/HudDrawer';
export type { HudDrawerProps, HudDrawerPosition } from './components/HudDrawer';

export { HudTooltip } from './components/HudTooltip';
export type { HudTooltipProps } from './components/HudTooltip';

export { HudAlert } from './components/HudAlert';
export type { HudAlertProps, HudAlertSeverity } from './components/HudAlert';

// ── Eva Components ──
export { MagiPanel } from './components/MagiPanel';
export type { MagiPanelProps, MagiSystem, MagiVote } from './components/MagiPanel';

export { MagiConsole } from './components/MagiConsole';
export type { MagiConsoleProps, MagiVotes, MagiSyncRates } from './components/MagiConsole';

export { WarningHex } from './components/WarningHex';
export type { WarningHexProps, WarningLevel } from './components/WarningHex';

export { CountdownTimer } from './components/CountdownTimer';
export type { CountdownTimerProps } from './components/CountdownTimer';

// ── Decorative ──
export { HazardStripes } from './components/HazardStripes';
export type { HazardStripesProps } from './components/HazardStripes';

export { ScanlineOverlay } from './components/ScanlineOverlay';
export type { ScanlineOverlayProps } from './components/ScanlineOverlay';

// ── Theme ──
export { EvaThemeProvider } from './theme';
export type { EvaThemeProviderProps } from './theme';

// ── Utils ──
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

export type {
  Hex, FractionalHex, Point, HexLayout, Orientation,
} from './utils/hexTypes';
