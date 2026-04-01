# Eva-UI Task Queue

Tasks are processed top-to-bottom. Mark as `[x]` when done.
The cron job picks the first unchecked `[ ]` task and runs Claude Code on it.

## Quality Pass — Iter 2 Components

- [x] Review HexCell: check clip-path interaction with borders, state transitions, keyboard handling, edge cases with colSpan/rowSpan
- [x] Review HudHeader + HudSidebar: check compound component patterns, animation behavior, responsive sizing, accessibility (aria roles, keyboard nav)
- [x] Review HudModal + HudDrawer: focus trap correctness, escape key handling, backdrop behavior, scroll lock, animation cleanup on unmount
- [x] Review HudAlert + HudTooltip: alert stacking (limit 3 per CTO decision), auto-dismiss cleanup, tooltip positioning edge cases (viewport overflow), portal vs inline rendering
- [x] Review MagiPanel + MagiConsole + WarningHex: vote state transitions, pulse animations, sync rate bar, majority vote logic, berserk state rendering
- [x] Review CountdownTimer: auto-decrement accuracy (drift over time), state transitions at thresholds, expired callback, format switching
- [ ] Review HazardStripes + ScanlineOverlay: animation performance, reduced-motion compliance, CSS custom property fallbacks
- [ ] Review shared styles (animations.css, hud-chrome.css, layers.css): check all keyframes referenced are defined, z-index consistency, berserk state completeness
- [ ] Final integration test: build Storybook, verify every story renders without console errors using browser tool
