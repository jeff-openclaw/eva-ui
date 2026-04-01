import { HexDashboardLayout, HexDashboardLayoutConfig } from './computeLayout';
/**
 * React hook that observes a container ref and returns live HexDashboard layout.
 * Uses ResizeObserver with rAF debounce to avoid layout thrashing.
 */
export declare function useHexDashboardLayout(containerRef: React.RefObject<HTMLElement | null>, config: HexDashboardLayoutConfig): HexDashboardLayout | null;
//# sourceMappingURL=useHexDashboardLayout.d.ts.map