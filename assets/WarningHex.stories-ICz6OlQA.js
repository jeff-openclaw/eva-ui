import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";const b={caution:{interval:2e3,label:"CAUTION",labelJa:"注意"},warning:{interval:1200,label:"WARNING",labelJa:"警報"},critical:{interval:800,label:"CRITICAL",labelJa:"緊急"},berserk:{interval:400,label:"暴走",labelJa:"BERSERK"}};function c({level:a,label:m,labelJa:v,pulseInterval:g,children:u,className:d}){const o=b[a],x=g??o.interval;return e.jsx("div",{className:`eva-warning-hex eva-warning-hex--${a}${d?` ${d}`:""}`,style:{"--pulse-interval":`${x}ms`},children:u??e.jsxs("div",{className:"eva-warning-hex__content",children:[e.jsx("div",{className:"eva-warning-hex__label",children:m??o.label}),e.jsx("div",{className:"eva-warning-hex__label-ja",children:v??o.labelJa})]})})}c.__docgenInfo={description:`Alert-state hex cell with pulsing animation.
Used for attention-drawing cells — angel detection, system warnings, boundary alerts.`,methods:[],displayName:"WarningHex",props:{level:{required:!0,tsType:{name:"union",raw:"'caution' | 'warning' | 'critical' | 'berserk'",elements:[{name:"literal",value:"'caution'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'critical'"},{name:"literal",value:"'berserk'"}]},description:"Warning severity."},label:{required:!1,tsType:{name:"string"},description:"Warning label text."},labelJa:{required:!1,tsType:{name:"string"},description:"Japanese label."},pulseInterval:{required:!1,tsType:{name:"number"},description:"Override pulse speed in ms."},children:{required:!1,tsType:{name:"ReactNode"},description:"Custom icon or content."},className:{required:!1,tsType:{name:"string"},description:"CSS class."}}};const p={width:76,height:88,clipPath:"polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"},f={title:"Eva/WarningHex",component:c,parameters:{backgrounds:{default:"eva-void"}},decorators:[a=>e.jsx("div",{style:{padding:48,display:"flex",gap:16},children:e.jsx("div",{style:p,children:e.jsx(a,{})})})]},r={args:{level:"caution"}},n={args:{level:"warning"}},s={args:{level:"critical"}},l={args:{level:"berserk"}},i={args:{level:"warning",label:"PATTERN BLUE",labelJa:"パターン青"}},t={decorators:[()=>e.jsx("div",{style:{padding:48,display:"flex",gap:16},children:["caution","warning","critical","berserk"].map(a=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:p,children:e.jsx(c,{level:a})}),e.jsx("div",{style:{color:"var(--eva-text-dim)",fontSize:"0.625rem",marginTop:4,fontFamily:"var(--eva-font-mono)"},children:a})]},a))})]};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    level: 'caution'
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    level: 'warning'
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    level: 'critical'
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    level: 'berserk'
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    level: 'warning',
    label: 'PATTERN BLUE',
    labelJa: 'パターン青'
  }
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  decorators: [() => <div style={{
    padding: 48,
    display: 'flex',
    gap: 16
  }}>
        {(['caution', 'warning', 'critical', 'berserk'] as const).map(level => <div key={level} style={{
      textAlign: 'center'
    }}>
            <div style={hexContainer}>
              <WarningHex level={level} />
            </div>
            <div style={{
        color: 'var(--eva-text-dim)',
        fontSize: '0.625rem',
        marginTop: 4,
        fontFamily: 'var(--eva-font-mono)'
      }}>
              {level}
            </div>
          </div>)}
      </div>]
}`,...t.parameters?.docs?.source}}};const w=["Caution","Warning","Critical","Berserk","PatternBlue","AllLevels"];export{t as AllLevels,l as Berserk,r as Caution,s as Critical,i as PatternBlue,n as Warning,w as __namedExportsOrder,f as default};
