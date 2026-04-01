import { useEffect, useState } from 'react';
import {
  computeHexDashboardLayout,
  type HexDashboardLayout,
  type HexDashboardLayoutConfig,
} from './computeLayout';

/**
 * React hook that observes a container ref and returns live HexDashboard layout.
 * Uses ResizeObserver with rAF debounce to avoid layout thrashing.
 */
export function useHexDashboardLayout(
  containerRef: React.RefObject<HTMLElement | null>,
  config: HexDashboardLayoutConfig,
): HexDashboardLayout | null {
  const [layout, setLayout] = useState<HexDashboardLayout | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number | null = null;

    const recompute = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setLayout(computeHexDashboardLayout(width, height, config));
      }
    };

    const observer = new ResizeObserver(() => {
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(recompute);
    });

    observer.observe(el);
    recompute();

    return () => {
      observer.disconnect();
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [containerRef, config]);

  return layout;
}
