import{j as n}from"./jsx-runtime-Cf8x2fCZ.js";import{r as y}from"./index-Dp4yRKOo.js";import{P as A,S as P,h as G,p as _,a as Q,b as Y,c as B}from"./hexGeometry-NISS-ESB.js";import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";function d(t){return`${t.q},${t.r}`}function H({cellSize:t,gap:s=0,cols:u,rows:p,orientation:o=A,className:g,style:W,renderCell:N,onCellClick:q,onCellHover:v,activeCells:I,showBackground:O=!0,scanlines:$=!1}){const i=t-s/2,l=y.useMemo(()=>({size:i,origin:{x:i*P,y:i},orientation:o}),[i,o]),c=y.useMemo(()=>G(u,p),[u,p]),f=P*i,x=2*i,E=f*u+f/2+s,k=x*.75*(p-1)+x+s,D=y.useCallback(e=>{if(!q)return;const a=e.currentTarget.getBoundingClientRect(),m={x:e.clientX-a.left,y:e.clientY-a.top},h=_(m,l),j=d(h);c.some(z=>d(z)===j)&&q(h,e)},[q,l,c]),V=y.useCallback(e=>{if(!v)return;const a=e.currentTarget.getBoundingClientRect(),m={x:e.clientX-a.left,y:e.clientY-a.top},h=_(m,l),j=d(h);c.some(z=>d(z)===j)?v(h,e):v(null,e)},[v,l,c]);return n.jsxs("div",{className:`eva-hex-grid${g?` ${g}`:""}`,style:{width:E,height:k,...W},children:[O&&n.jsx("svg",{className:"eva-hex-grid__svg",width:E,height:k,onClick:D,onMouseMove:V,style:{pointerEvents:"auto"},children:c.map(e=>{const r=d(e),a=I?.has(r)??!1;return n.jsx("polygon",{points:Q(e,l),fill:a?"var(--eva-hex-active)":"var(--eva-hex-fill)",stroke:"var(--eva-border)",strokeWidth:1,"data-q":e.q,"data-r":e.r},r)})}),N&&n.jsx("div",{className:"eva-hex-grid__content",children:c.map(e=>{const r=Y(e,l),a=N(e,r);if(a==null)return null;const m=d(e);return n.jsx("div",{className:"eva-hex-grid__cell",style:{width:f,height:x,transform:`translate(${r.x-f/2}px, ${r.y-x/2}px)`,clipPath:B()},children:a},m)})}),$&&n.jsx("div",{className:"eva-hex-grid__scanlines"})]})}H.__docgenInfo={description:`Renders an SVG hexagonal grid with optional content cells.
Uses pointy-top orientation by default with the Eva-UI color tokens.`,methods:[],displayName:"HexGrid",props:{cellSize:{required:!0,tsType:{name:"number"},description:"Hex circumradius in px (center to vertex)."},gap:{required:!1,tsType:{name:"number"},description:"Gap between hex cells in px. Default: 0.",defaultValue:{value:"0",computed:!1}},cols:{required:!0,tsType:{name:"number"},description:"Number of columns."},rows:{required:!0,tsType:{name:"number"},description:"Number of rows."},orientation:{required:!1,tsType:{name:"Orientation"},description:"Orientation. Default: POINTY.",defaultValue:{value:`{
  f0: SQRT3,     f1: SQRT3 / 2, f2: 0,    f3: 3 / 2,
  b0: SQRT3 / 3, b1: -1 / 3,    b2: 0,    b3: 2 / 3,
  startAngle: 0.5,
}`,computed:!1}},className:{required:!1,tsType:{name:"string"},description:"CSS class for the container."},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Inline styles for the container."},renderCell:{required:!1,tsType:{name:"signature",type:"function",raw:"(hex: Hex, pixelCenter: Point) => React.ReactNode | null",signature:{arguments:[{type:{name:"Hex"},name:"hex"},{type:{name:"Point"},name:"pixelCenter"}],return:{name:"union",raw:"React.ReactNode | null",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"null"}]}}},description:"Render function for each hex cell. Return null to skip."},onCellClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(hex: Hex, event: React.MouseEvent) => void",signature:{arguments:[{type:{name:"Hex"},name:"hex"},{type:{name:"ReactMouseEvent",raw:"React.MouseEvent"},name:"event"}],return:{name:"void"}}},description:"Called when a hex cell is clicked."},onCellHover:{required:!1,tsType:{name:"signature",type:"function",raw:"(hex: Hex | null, event: React.MouseEvent) => void",signature:{arguments:[{type:{name:"union",raw:"Hex | null",elements:[{name:"Hex"},{name:"null"}]},name:"hex"},{type:{name:"ReactMouseEvent",raw:"React.MouseEvent"},name:"event"}],return:{name:"void"}}},description:"Called when mouse enters a hex cell."},activeCells:{required:!1,tsType:{name:"ReadonlySet",elements:[{name:"string"}],raw:"ReadonlySet<string>"},description:'Set of hex keys ("q,r") to highlight as active.'},showBackground:{required:!1,tsType:{name:"boolean"},description:"Whether to render decorative background hexes. Default: true.",defaultValue:{value:"true",computed:!1}},scanlines:{required:!1,tsType:{name:"boolean"},description:"Enable CRT scanline overlay. Default: false.",defaultValue:{value:"false",computed:!1}}}};function M({tokens:t,variant:s="nerv",children:u}){const p=t?Object.fromEntries(Object.entries(t).map(([o,g])=>[o.startsWith("--")?o:`--eva-${o}`,g])):void 0;return n.jsx("div",{className:`eva-theme eva-theme--${s}`,style:p,"data-eva-theme":s,children:u})}M.__docgenInfo={description:"Wraps children in the Eva-UI theme context.\nApplies CSS custom property tokens via a scoped `.eva-theme` container.",methods:[],displayName:"EvaThemeProvider",props:{tokens:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:"Override specific tokens via CSS custom property map."},variant:{required:!1,tsType:{name:"union",raw:"'nerv' | 'seele' | 'wille'",elements:[{name:"literal",value:"'nerv'"},{name:"literal",value:"'seele'"},{name:"literal",value:"'wille'"}]},description:"Theme variant preset. Default: 'nerv'.",defaultValue:{value:"'nerv'",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:"Children."}}};const J={title:"Components/HexGrid",component:H,decorators:[t=>n.jsx(M,{children:n.jsx("div",{style:{width:"100vw",height:"100vh",padding:24},children:n.jsx(t,{})})})]},S={args:{cellSize:44,gap:4,cols:8,rows:6}},w={args:{cellSize:64,gap:6,cols:6,rows:4}},R={args:{cellSize:24,gap:2,cols:12,rows:10}},T={args:{cellSize:44,gap:4,cols:8,rows:6,activeCells:new Set(["1,1","2,1","3,2"])}},C={args:{cellSize:44,gap:4,cols:8,rows:6,scanlines:!0}},b={args:{cellSize:64,gap:4,cols:6,rows:4,renderCell:t=>n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",color:"var(--eva-text)",fontFamily:"var(--eva-font-mono)",fontSize:"var(--eva-text-xs)"},children:[t.q,",",t.r]})}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    cellSize: 44,
    gap: 4,
    cols: 8,
    rows: 6
  }
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    cellSize: 64,
    gap: 6,
    cols: 6,
    rows: 4
  }
}`,...w.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    cellSize: 24,
    gap: 2,
    cols: 12,
    rows: 10
  }
}`,...R.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    cellSize: 44,
    gap: 4,
    cols: 8,
    rows: 6,
    activeCells: new Set(['1,1', '2,1', '3,2'])
  }
}`,...T.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    cellSize: 44,
    gap: 4,
    cols: 8,
    rows: 6,
    scanlines: true
  }
}`,...C.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    cellSize: 64,
    gap: 4,
    cols: 6,
    rows: 4,
    renderCell: hex => <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color: 'var(--eva-text)',
      fontFamily: 'var(--eva-font-mono)',
      fontSize: 'var(--eva-text-xs)'
    }}>
        {hex.q},{hex.r}
      </div>
  }
}`,...b.parameters?.docs?.source}}};const Z=["Default","Large","Small","WithActiveCells","WithScanlines","WithContent"];export{S as Default,w as Large,R as Small,T as WithActiveCells,b as WithContent,C as WithScanlines,Z as __namedExportsOrder,J as default};
