import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{M as n}from"./MagiPanel-BqVzbnKb.js";import"./index-yBjzXJbu.js";const c={width:100,height:115,clipPath:"polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",border:"1px solid var(--eva-border)"},m={title:"Eva/MagiPanel",component:n,parameters:{backgrounds:{default:"eva-void"}},decorators:[i=>e.jsx("div",{style:{padding:48,display:"flex",gap:16},children:e.jsx("div",{style:c,children:e.jsx(i,{})})})]},s={args:{system:"melchior",vote:"approve",syncRate:78.4}},a={args:{system:"balthasar",vote:"deny",syncRate:34.1}},r={args:{system:"caspar",vote:"pending",syncRate:50}},t={args:{system:"melchior",vote:"offline"}},o={decorators:[()=>e.jsxs("div",{style:{padding:48,display:"flex",gap:16},children:[e.jsx("div",{style:c,children:e.jsx(n,{system:"melchior",vote:"approve",syncRate:78.4})}),e.jsx("div",{style:c,children:e.jsx(n,{system:"balthasar",vote:"approve",syncRate:65.2})}),e.jsx("div",{style:c,children:e.jsx(n,{system:"caspar",vote:"deny",syncRate:42.8})})]})]};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    system: 'melchior',
    vote: 'approve',
    syncRate: 78.4
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    system: 'balthasar',
    vote: 'deny',
    syncRate: 34.1
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    system: 'caspar',
    vote: 'pending',
    syncRate: 50.0
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    system: 'melchior',
    vote: 'offline'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  decorators: [() => <div style={{
    padding: 48,
    display: 'flex',
    gap: 16
  }}>
        <div style={hexContainer}>
          <MagiPanel system="melchior" vote="approve" syncRate={78.4} />
        </div>
        <div style={hexContainer}>
          <MagiPanel system="balthasar" vote="approve" syncRate={65.2} />
        </div>
        <div style={hexContainer}>
          <MagiPanel system="caspar" vote="deny" syncRate={42.8} />
        </div>
      </div>]
}`,...o.parameters?.docs?.source}}};const y=["Approve","Deny","Pending","Offline","AllThree"];export{o as AllThree,s as Approve,a as Deny,t as Offline,r as Pending,y as __namedExportsOrder,m as default};
