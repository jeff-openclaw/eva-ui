# Eva-UI Task Queue

Tasks are processed top-to-bottom. Mark as `[x]` when done.
The cron job picks the first unchecked `[ ]` task and runs Claude Code on it.

## Priority — User Feedback Fixes

- [x] PRIORITY: Fix HexDashboard clipping — the dashboard has overflow:hidden which clips content. Change to overflow:visible or overflow:auto as appropriate. The hex grid and zone content should not be clipped. Test that zones, cells, and overlays render correctly without clipping.
- [ ] PRIORITY: HexCell content adaptation — HexCells should be able to contain arbitrary React content and display it properly. Content should be centered within the hex shape, text should wrap or scale, and cells should gracefully handle overflow. Add a `size` prop or similar that lets cells be 'sm' | 'md' | 'lg' | 'xl' or accept a custom size multiplier. Larger cells should occupy more space in the grid. Update stories to demonstrate cells with real content (text, stats, charts placeholder).
- [ ] PRIORITY: Variable-size hex grid (masonry-like) — HexGrid should support hex cells of different sizes in the same grid, similar to a masonry layout. Some cells should be able to span 2x or 3x the base size. This builds on colSpan/rowSpan but needs to actually work visually — larger cells should seamlessly integrate with smaller neighbors. The hex grid should compute positions accounting for variable sizes. Update the HexGrid and HexDashboard components and add stories showing mixed-size grids (e.g., one large MAGI panel surrounded by smaller status cells).

## Quality Pass — Iter 2 Components

- [x] Review HexCell: check clip-path interaction with borders, state transitions, keyboard handling, edge cases with colSpan/rowSpan
- [x] Review HudHeader + HudSidebar: check compound component patterns, animation behavior, responsive sizing, accessibility (aria roles, keyboard nav)
- [x] Review HudModal + HudDrawer: focus trap correctness, escape key handling, backdrop behavior, scroll lock, animation cleanup on unmount
- [x] Review HudAlert + HudTooltip: alert stacking (limit 3 per CTO decision), auto-dismiss cleanup, tooltip positioning edge cases (viewport overflow), portal vs inline rendering
- [x] Review MagiPanel + MagiConsole + WarningHex: vote state transitions, pulse animations, sync rate bar, majority vote logic, berserk state rendering
- [x] Review CountdownTimer: auto-decrement accuracy (drift over time), state transitions at thresholds, expired callback, format switching
- [x] Review HazardStripes + ScanlineOverlay: animation performance, reduced-motion compliance, CSS custom property fallbacks
- [ ] Review shared styles (animations.css, hud-chrome.css, layers.css): check all keyframes referenced are defined, z-index consistency, berserk state completeness
- [ ] Final integration test: build Storybook, verify every story renders without console errors using browser tool
