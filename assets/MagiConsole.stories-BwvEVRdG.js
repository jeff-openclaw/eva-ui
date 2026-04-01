import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{M as g}from"./MagiPanel-BqVzbnKb.js";import"./index-yBjzXJbu.js";function v(a){const r=[a.melchior??"pending",a.balthasar??"pending",a.caspar??"pending"],c=r.filter(s=>s==="approve").length,p=r.filter(s=>s==="deny").length;return c>=2?{text:"APPROVED",state:"approve"}:p>=2?{text:"DENIED",state:"deny"}:{text:"DELIBERATING...",state:"pending"}}function m({votes:a={},syncRates:r={},pulse:c=!0,showJapanese:p=!0,title:s="MAGI SYSTEM",titleJa:f="マギ・システム",showResult:h=!0,className:d}){const u=v(a);return e.jsxs("div",{className:`eva-magi-console${d?` ${d}`:""}`,children:[e.jsxs("div",{className:"eva-magi-console__title",children:[e.jsx("span",{className:"eva-magi-console__title-main",children:s}),e.jsx("span",{className:"eva-magi-console__title-ja",children:f})]}),e.jsx("div",{className:"eva-magi-console__panels",children:["melchior","balthasar","caspar"].map(t=>e.jsx("div",{className:"eva-magi-console__panel-wrapper",children:e.jsx(g,{system:t,vote:a[t],syncRate:r[t],pulse:c,showJapanese:p})},t))}),h&&e.jsx("div",{className:`eva-magi-console__result eva-magi-console__result--${u.state}`,children:u.text})]})}m.__docgenInfo={description:`Aggregate component rendering all three MAGI panels in the iconic layout
with a majority-vote result indicator.`,methods:[],displayName:"MagiConsole",props:{votes:{required:!1,tsType:{name:"MagiVotes"},description:"Vote states for each system.",defaultValue:{value:"{}",computed:!1}},syncRates:{required:!1,tsType:{name:"MagiSyncRates"},description:"Sync rates for each system.",defaultValue:{value:"{}",computed:!1}},pulse:{required:!1,tsType:{name:"boolean"},description:"Enable pulse on active votes. @default true",defaultValue:{value:"true",computed:!1}},showJapanese:{required:!1,tsType:{name:"boolean"},description:"Show Japanese subtitles. @default true",defaultValue:{value:"true",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Title above panels. @default 'MAGI SYSTEM'",defaultValue:{value:"'MAGI SYSTEM'",computed:!1}},titleJa:{required:!1,tsType:{name:"string"},description:"Japanese title. @default 'マギ・システム'",defaultValue:{value:"'マギ・システム'",computed:!1}},showResult:{required:!1,tsType:{name:"boolean"},description:"Show aggregate result. @default true",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"CSS class."}}};const _={title:"Eva/MagiConsole",component:m,parameters:{backgrounds:{default:"eva-void"}},decorators:[a=>e.jsx("div",{style:{padding:48},children:e.jsx(a,{})})]},n={args:{votes:{melchior:"approve",balthasar:"approve",caspar:"deny"},syncRates:{melchior:78.4,balthasar:65.2,caspar:42.8}}},o={args:{votes:{melchior:"deny",balthasar:"deny",caspar:"approve"},syncRates:{melchior:55,balthasar:60.1,caspar:71.3}}},l={args:{votes:{melchior:"approve",balthasar:"pending",caspar:"pending"},syncRates:{melchior:78.4,balthasar:50,caspar:50}}},i={args:{votes:{melchior:"offline",balthasar:"offline",caspar:"offline"}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    votes: {
      melchior: 'approve',
      balthasar: 'approve',
      caspar: 'deny'
    },
    syncRates: {
      melchior: 78.4,
      balthasar: 65.2,
      caspar: 42.8
    }
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    votes: {
      melchior: 'deny',
      balthasar: 'deny',
      caspar: 'approve'
    },
    syncRates: {
      melchior: 55.0,
      balthasar: 60.1,
      caspar: 71.3
    }
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    votes: {
      melchior: 'approve',
      balthasar: 'pending',
      caspar: 'pending'
    },
    syncRates: {
      melchior: 78.4,
      balthasar: 50.0,
      caspar: 50.0
    }
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    votes: {
      melchior: 'offline',
      balthasar: 'offline',
      caspar: 'offline'
    }
  }
}`,...i.parameters?.docs?.source}}};const S=["Approved","Denied","Deliberating","AllOffline"];export{i as AllOffline,n as Approved,l as Deliberating,o as Denied,S as __namedExportsOrder,_ as default};
