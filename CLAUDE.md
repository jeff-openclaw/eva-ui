# Eva-UI — Claude Code Context

## What This Is
A React component library faithful to the NERV/MAGI computer system aesthetic from Neon Genesis Evangelion. Hex grid is the core layout primitive.

## Tech Stack
- React 18 + TypeScript (strict, no `any`, no `@ts-ignore`)
- Vite for building
- Storybook 8 for component dev
- Plain CSS with `@layer eva-ui` (not CSS modules) + CSS custom properties
- JSDoc on every export

## Architecture
- `src/components/` — each component in its own directory (Component.tsx, Component.css, Component.stories.tsx, index.ts)
- `src/utils/` — hex geometry math (hexGeometry.ts, hexTypes.ts)
- `src/theme/` — EvaThemeProvider, tokens.css, reset.css
- `src/styles/` — shared styles (animations.css, layers.css, hud-chrome.css, scanlines.css, hazard.css, globals.css)
- `src/index.ts` — public API exports

## Design Specs
Design documents live in the project workspace at `../projects/eva-ui/design/specs/`:
- `hexdashboard.md` — HexDashboard layout engine (Approach C)
- `hud-chrome.md` — HUD chrome components (Header, Sidebar, Modal, Drawer, Tooltip, Alert)
- `components.md` — Eva-specific components (MagiPanel, WarningHex, CountdownTimer, etc.)
- `hexgrid.md` — HexGrid spec
- `theming.md` — Theme system spec

## CTO Decisions (must follow)
See `../projects/eva-ui/DECISIONS.md` for all approved decisions.

Key ones:
- Plain CSS + `@layer eva-ui`, NOT CSS Modules
- Pointy-top hex orientation, configurable right-offset default
- Per-element perspective for v1
- Focus trap ON by default in HudModal
- Alert stacking (limit 3)
- tabular-nums monospace for CountdownTimer (no custom segment font)
- Rectangular bounding box for hex span > 1 (no merged hex union)
- Ship MagiConsole aggregate component

## Build & Verify
```bash
npx tsc --noEmit          # type check
npx storybook build       # build storybook
```

## Storybook
- Base path: `/eva-ui/` (set in .storybook/main.ts viteFinal)
- Deployed to GitHub Pages: https://jeff-openclaw.github.io/eva-ui/

## CSS Conventions
- All styles wrapped in `@layer eva-ui { ... }`
- Class prefix: `eva-` (e.g., `eva-hex-cell`, `eva-hud-header`)
- Theme tokens in `src/theme/tokens.css` as CSS custom properties (`--eva-*`)
- `prefers-reduced-motion` media query for all animations
- Z-index layers: grid-bg(0), grid-content(10), chrome(20), floating(30), modal(40), tooltip(50)

## Current Components (Iter 1 + 2)
HexGrid, HexDashboard, HexCell, HudHeader, HudSidebar, HudModal, HudDrawer, HudTooltip, HudAlert, MagiPanel, MagiConsole, WarningHex, CountdownTimer, HazardStripes, ScanlineOverlay, EvaThemeProvider
