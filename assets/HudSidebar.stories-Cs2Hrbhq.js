import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";/* empty css                   */import"./index-yBjzXJbu.js";function a({position:r="left",width:t,visible:o=!0,hazardAccent:c=!1,className:l,children:u}){if(!o)return null;const m=r==="left"?"hud-arrive-left":"hud-arrive-right";return e.jsxs("aside",{className:`eva-hud-chrome eva-hud-sidebar eva-hud-sidebar--${r}${l?` ${l}`:""}`,"data-animate":!0,style:{width:t?typeof t=="number"?`${t}px`:t:void 0,animationName:m},children:[c&&e.jsx("div",{className:"eva-hud-sidebar__hazard-accent"}),u]})}function b({children:r}){return e.jsx("div",{className:"eva-hud-sidebar__logo",children:r??"NERV"})}function S({children:r}){return e.jsx("nav",{"aria-label":"Sidebar",className:"eva-hud-sidebar__nav",children:r})}function v({label:r,active:t,onClick:o}){return e.jsxs("button",{className:`eva-hud-sidebar__nav-item${t?" eva-hud-sidebar__nav-item--active":""}`,"aria-current":t?"page":void 0,onClick:o,type:"button",children:[t?"▸ ":"  ",r]})}function p({label:r,children:t}){return e.jsxs("div",{className:"eva-hud-sidebar__section",children:[r&&e.jsx("div",{className:"eva-hud-sidebar__section-label",children:r}),t]})}function h({children:r}){return e.jsx("div",{className:"eva-hud-sidebar__footer",children:r})}a.Logo=b;a.Nav=S;a.NavItem=v;a.Section=p;a.Footer=h;a.__docgenInfo={description:"Vertical navigation/status panel designed to mount in a HexDashboard gap zone.",methods:[{name:"Logo",docblock:null,modifiers:["static"],params:[{name:"{ children }: { children?: ReactNode }",optional:!1,type:{name:"signature",type:"object",raw:"{ children?: ReactNode }",signature:{properties:[{key:"children",value:{name:"ReactNode",required:!1}}]}}}],returns:{type:{name:"React.JSX.Element"}}},{name:"Nav",docblock:null,modifiers:["static"],params:[{name:"{ children }: { children?: ReactNode }",optional:!1,type:{name:"signature",type:"object",raw:"{ children?: ReactNode }",signature:{properties:[{key:"children",value:{name:"ReactNode",required:!1}}]}}}],returns:{type:{name:"React.JSX.Element"}}},{name:"NavItem",docblock:null,modifiers:["static"],params:[{name:"{ label, active, onClick }: HudSidebarNavItemProps",optional:!1,type:{name:"HudSidebarNavItemProps",alias:"HudSidebarNavItemProps"}}],returns:{type:{name:"React.JSX.Element"}}},{name:"Section",docblock:null,modifiers:["static"],params:[{name:"{ label, children }: HudSidebarSectionProps",optional:!1,type:{name:"HudSidebarSectionProps",alias:"HudSidebarSectionProps"}}],returns:{type:{name:"React.JSX.Element"}}},{name:"Footer",docblock:null,modifiers:["static"],params:[{name:"{ children }: { children?: ReactNode }",optional:!1,type:{name:"signature",type:"object",raw:"{ children?: ReactNode }",signature:{properties:[{key:"children",value:{name:"ReactNode",required:!1}}]}}}],returns:{type:{name:"React.JSX.Element"}}}],displayName:"HudSidebar",props:{position:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"Which gap zone this sidebar mounts in. @default 'left'",defaultValue:{value:"'left'",computed:!1}},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Optional width override."},visible:{required:!1,tsType:{name:"boolean"},description:"Show/hide with animation. @default true",defaultValue:{value:"true",computed:!1}},hazardAccent:{required:!1,tsType:{name:"boolean"},description:"Show hazard stripe accent at top. @default false",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"CSS class."},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};const x={title:"Chrome/HudSidebar",component:a,parameters:{backgrounds:{default:"eva-void"}},decorators:[r=>e.jsx("div",{style:{width:200,height:500},children:e.jsx(r,{})})]},i={render:()=>e.jsxs(a,{children:[e.jsx(a.Logo,{}),e.jsxs(a.Nav,{children:[e.jsx(a.NavItem,{label:"Dashboard",active:!0}),e.jsx(a.NavItem,{label:"MAGI Status"}),e.jsx(a.NavItem,{label:"Pilot Sync"}),e.jsx(a.NavItem,{label:"Alerts"})]}),e.jsx(a.Footer,{children:"NERV SYSTEM v3.01"})]})},d={render:()=>e.jsxs(a,{hazardAccent:!0,children:[e.jsx(a.Logo,{children:"SEELE"}),e.jsxs(a.Nav,{children:[e.jsx(a.NavItem,{label:"Monoliths",active:!0}),e.jsx(a.NavItem,{label:"Scenario"}),e.jsx(a.NavItem,{label:"Dead Sea"})]}),e.jsx(a.Footer,{children:"COUNCIL v7.0"})]})},n={render:()=>e.jsxs(a,{children:[e.jsx(a.Logo,{}),e.jsxs(a.Nav,{children:[e.jsxs(a.Section,{label:"Operations",children:[e.jsx(a.NavItem,{label:"Dashboard",active:!0}),e.jsx(a.NavItem,{label:"Alerts"})]}),e.jsxs(a.Section,{label:"Systems",children:[e.jsx(a.NavItem,{label:"MAGI"}),e.jsx(a.NavItem,{label:"Eva Units"}),e.jsx(a.NavItem,{label:"AT Field"})]})]}),e.jsx(a.Footer,{children:"NERV SYSTEM v3.01"})]})},s={render:()=>e.jsxs(a,{position:"right",children:[e.jsx(a.Logo,{children:"STATUS"}),e.jsxs(a.Nav,{children:[e.jsx(a.NavItem,{label:"Unit 01",active:!0}),e.jsx(a.NavItem,{label:"Unit 02"}),e.jsx(a.NavItem,{label:"Unit 00"})]})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <HudSidebar>
      <HudSidebar.Logo />
      <HudSidebar.Nav>
        <HudSidebar.NavItem label="Dashboard" active />
        <HudSidebar.NavItem label="MAGI Status" />
        <HudSidebar.NavItem label="Pilot Sync" />
        <HudSidebar.NavItem label="Alerts" />
      </HudSidebar.Nav>
      <HudSidebar.Footer>NERV SYSTEM v3.01</HudSidebar.Footer>
    </HudSidebar>
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <HudSidebar hazardAccent>
      <HudSidebar.Logo>SEELE</HudSidebar.Logo>
      <HudSidebar.Nav>
        <HudSidebar.NavItem label="Monoliths" active />
        <HudSidebar.NavItem label="Scenario" />
        <HudSidebar.NavItem label="Dead Sea" />
      </HudSidebar.Nav>
      <HudSidebar.Footer>COUNCIL v7.0</HudSidebar.Footer>
    </HudSidebar>
}`,...d.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <HudSidebar>
      <HudSidebar.Logo />
      <HudSidebar.Nav>
        <HudSidebar.Section label="Operations">
          <HudSidebar.NavItem label="Dashboard" active />
          <HudSidebar.NavItem label="Alerts" />
        </HudSidebar.Section>
        <HudSidebar.Section label="Systems">
          <HudSidebar.NavItem label="MAGI" />
          <HudSidebar.NavItem label="Eva Units" />
          <HudSidebar.NavItem label="AT Field" />
        </HudSidebar.Section>
      </HudSidebar.Nav>
      <HudSidebar.Footer>NERV SYSTEM v3.01</HudSidebar.Footer>
    </HudSidebar>
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <HudSidebar position="right">
      <HudSidebar.Logo>STATUS</HudSidebar.Logo>
      <HudSidebar.Nav>
        <HudSidebar.NavItem label="Unit 01" active />
        <HudSidebar.NavItem label="Unit 02" />
        <HudSidebar.NavItem label="Unit 00" />
      </HudSidebar.Nav>
    </HudSidebar>
}`,...s.parameters?.docs?.source}}};const j=["Default","WithHazardAccent","WithSections","RightPosition"];export{i as Default,s as RightPosition,d as WithHazardAccent,n as WithSections,j as __namedExportsOrder,x as default};
