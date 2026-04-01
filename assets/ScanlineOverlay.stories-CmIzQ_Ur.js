import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";function l({lineHeight:o=2,opacity:c=.05,animated:d=!1,flicker:i=!1,fixed:p=!1,className:u}){const m=["eva-scanline-overlay",p&&"eva-scanline-overlay--fixed",d&&!i&&"eva-scanline-overlay--animated",i&&"eva-scanline-overlay--flicker",u].filter(Boolean).join(" ");return e.jsx("div",{"aria-hidden":"true",className:m,style:{"--scanline-height":`${o}px`,"--scanline-opacity":c}})}l.__docgenInfo={description:`CRT scanline effect rendered as a semi-transparent overlay.
Apply over the hex grid or individual panels for atmosphere.`,methods:[],displayName:"ScanlineOverlay",props:{lineHeight:{required:!1,tsType:{name:"number"},description:"Scanline height/spacing in px. @default 2",defaultValue:{value:"2",computed:!1}},opacity:{required:!1,tsType:{name:"number"},description:"Scanline opacity (0-1). @default 0.05",defaultValue:{value:"0.05",computed:!1}},animated:{required:!1,tsType:{name:"boolean"},description:"Animate scanlines (slow downward drift). @default false",defaultValue:{value:"false",computed:!1}},flicker:{required:!1,tsType:{name:"boolean"},description:"Enable subtle flicker effect. @default false",defaultValue:{value:"false",computed:!1}},fixed:{required:!1,tsType:{name:"boolean"},description:"Cover entire viewport (position: fixed) vs parent (position: absolute). @default false",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"CSS class."}}};const y={title:"Components/ScanlineOverlay",component:l,parameters:{backgrounds:{default:"eva-void"}},decorators:[o=>e.jsxs("div",{style:{position:"relative",width:400,height:300,background:"var(--eva-panel)",border:"1px solid var(--eva-border)"},children:[e.jsxs("div",{style:{padding:24,color:"var(--eva-text)",fontFamily:"var(--eva-font-mono)"},children:[e.jsx("p",{children:"NERV CENTRAL DOGMA"}),e.jsx("p",{style:{color:"var(--eva-text-gold)"},children:"MAGI SYSTEM ONLINE"}),e.jsx("p",{style:{color:"var(--eva-text-dim)",fontSize:"0.75rem"},children:"第壱中央指令所"})]}),e.jsx(o,{})]})]},a={},r={args:{animated:!0}},s={args:{flicker:!0}},t={args:{lineHeight:3,opacity:.12}},n={args:{lineHeight:1,opacity:.03}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    animated: true
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    flicker: true
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    lineHeight: 3,
    opacity: 0.12
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    lineHeight: 1,
    opacity: 0.03
  }
}`,...n.parameters?.docs?.source}}};const g=["Default","Animated","Flicker","Heavy","Subtle"];export{r as Animated,a as Default,s as Flicker,t as Heavy,n as Subtle,g as __namedExportsOrder,y as default};
