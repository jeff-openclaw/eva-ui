import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{useMDXComponents as i}from"./index-CVPgm74v.js";import"./index-yBjzXJbu.js";import"./index-Dp4yRKOo.js";import"./_commonjsHelpers-CqkleIqs.js";function s(r){const n={code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"eva-ui",children:"Eva-UI"}),`
`,e.jsxs(n.p,{children:["A React component library faithful to the ",e.jsx(n.strong,{children:"NERV/MAGI"})," computer system aesthetic from ",e.jsx(n.em,{children:"Neon Genesis Evangelion"}),"."]}),`
`,e.jsx(n.h2,{id:"design-language",children:"Design Language"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hexagonal grid"})," as the core layout primitive"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pointy-top"})," hex orientation (the Eva standard)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Crimson + Gold"})," on deep void backgrounds"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CRT scanlines"})," and ",e.jsx(n.strong,{children:"hazard stripes"})," for atmosphere"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"HUD depth layers"})," — chrome floats on a separate plane from the grid"]}),`
`]}),`
`,e.jsx(n.h2,{id:"theme-variants",children:"Theme Variants"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"NERV"})," (default) — crimson/red tactical display"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"SEELE"})," — cooler blue tones"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"WILLE"})," — resistance green"]}),`
`]}),`
`,e.jsx(n.h2,{id:"getting-started",children:"Getting Started"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { HexGrid, EvaThemeProvider } from 'eva-ui';
import 'eva-ui/styles.css';

function App() {
  return (
    <EvaThemeProvider>
      <HexGrid cellSize={44} gap={4} cols={8} rows={6} />
    </EvaThemeProvider>
  );
}
`})}),`
`,e.jsx(n.h2,{id:"color-tokens",children:"Color Tokens"}),`
`,e.jsxs(n.p,{children:["All colors are CSS Custom Properties prefixed with ",e.jsx(n.code,{children:"--eva-"}),":"]}),`
`,e.jsxs(n.p,{children:[`| Token | Value | Use |
|-------|-------|-----|
| `,e.jsx(n.code,{children:"--eva-void"})," | ",e.jsx(n.code,{children:"#080808"}),` | Background |
| `,e.jsx(n.code,{children:"--eva-crimson"})," | ",e.jsx(n.code,{children:"#cc1111"}),` | Primary accent |
| `,e.jsx(n.code,{children:"--eva-gold"})," | ",e.jsx(n.code,{children:"#cc8800"}),` | Secondary accent |
| `,e.jsx(n.code,{children:"--eva-text"})," | ",e.jsx(n.code,{children:"#ff3333"}),` | Primary text |
| `,e.jsx(n.code,{children:"--eva-border"})," | ",e.jsx(n.code,{children:"#330808"})," | Subtle borders |"]})]})}function a(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{a as default};
