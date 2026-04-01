import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as y}from"./index-Dp4yRKOo.js";/* empty css                   */import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";function r({severity:c,title:h,titleJa:m,children:u,berserk:p=!1,autoDismiss:d,onDismiss:t,position:f="top",className:v}){y.useEffect(()=>{if(!d||!t)return;const A=setTimeout(t,d);return()=>clearTimeout(A)},[d,t]);const g=y.useCallback(()=>{t?.()},[t]);return e.jsxs("div",{className:`eva-hud-chrome eva-hud-alert eva-hud-alert--${c} eva-hud-alert--${f}${p?" eva-hud-chrome--berserk":""}${v?` ${v}`:""}`,role:"alert","data-animate":!0,children:[p&&e.jsx("div",{className:"eva-hud-chrome__berserk-watermark",children:"暴走"}),e.jsxs("div",{className:"eva-hud-alert__content",children:[e.jsxs("div",{className:"eva-hud-alert__titles",children:[e.jsx("span",{className:"eva-hud-alert__title",children:h}),m&&e.jsx("span",{className:"eva-hud-alert__title-ja",children:m})]}),u&&e.jsx("div",{className:"eva-hud-alert__body",children:u})]}),t&&e.jsx("button",{className:"eva-hud-alert__dismiss",onClick:g,type:"button","aria-label":"Dismiss alert",children:"✕"})]})}r.__docgenInfo={description:`Notification banner for system alerts.
Stacks vertically up to 3 (CTO decision #10).`,methods:[],displayName:"HudAlert",props:{severity:{required:!0,tsType:{name:"union",raw:"'info' | 'caution' | 'warning' | 'critical'",elements:[{name:"literal",value:"'info'"},{name:"literal",value:"'caution'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'critical'"}]},description:"Alert severity."},title:{required:!0,tsType:{name:"string"},description:'Alert title (e.g., "PATTERN BLUE").'},titleJa:{required:!1,tsType:{name:"string"},description:"Japanese equivalent."},children:{required:!1,tsType:{name:"ReactNode"},description:"Alert body content."},berserk:{required:!1,tsType:{name:"boolean"},description:"Enable berserk mode. @default false",defaultValue:{value:"false",computed:!1}},autoDismiss:{required:!1,tsType:{name:"number"},description:"Auto-dismiss after ms. @default undefined (persistent)"},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called on dismiss."},position:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'center'"}]},description:"Position within overlay zone. @default 'top'",defaultValue:{value:"'top'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"CSS class."}}};const b={title:"Chrome/HudAlert",component:r,parameters:{backgrounds:{default:"eva-void"}},decorators:[c=>e.jsx("div",{style:{padding:32,display:"flex",flexDirection:"column",gap:16,alignItems:"center"},children:e.jsx(c,{})})]},a={args:{severity:"info",title:"SYSTEM UPDATE",titleJa:"システム更新",children:"MAGI firmware update v3.14 available.",onDismiss:()=>{}}},i={args:{severity:"caution",title:"SYNC WARNING",titleJa:"シンクロ警告",children:"Pilot sync rate below optimal threshold.",onDismiss:()=>{}}},s={args:{severity:"warning",title:"PATTERN BLUE",titleJa:"パターン青",children:"Angel-class entity detected approaching Tokyo-3.",onDismiss:()=>{}}},n={args:{severity:"critical",title:"AT FIELD BREACH",titleJa:"ATフィールド突破",children:"Immediate defensive measures required.",onDismiss:()=>{}}},l={args:{severity:"critical",title:"EVA UNIT-01 BERSERK",titleJa:"初号機暴走",children:"Entry plug ejection failed. All hands brace.",berserk:!0,onDismiss:()=>{}}},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,alignItems:"center"},children:[e.jsx(r,{severity:"info",title:"INFO",titleJa:"情報",children:"System nominal."}),e.jsx(r,{severity:"caution",title:"CAUTION",titleJa:"注意",children:"Elevated readings."}),e.jsx(r,{severity:"warning",title:"WARNING",titleJa:"警報",children:"Pattern detected."}),e.jsx(r,{severity:"critical",title:"CRITICAL",titleJa:"緊急",children:"Breach imminent."})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    title: 'SYSTEM UPDATE',
    titleJa: 'システム更新',
    children: 'MAGI firmware update v3.14 available.',
    onDismiss: () => {}
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'caution',
    title: 'SYNC WARNING',
    titleJa: 'シンクロ警告',
    children: 'Pilot sync rate below optimal threshold.',
    onDismiss: () => {}
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    title: 'PATTERN BLUE',
    titleJa: 'パターン青',
    children: 'Angel-class entity detected approaching Tokyo-3.',
    onDismiss: () => {}
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'critical',
    title: 'AT FIELD BREACH',
    titleJa: 'ATフィールド突破',
    children: 'Immediate defensive measures required.',
    onDismiss: () => {}
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'critical',
    title: 'EVA UNIT-01 BERSERK',
    titleJa: '初号機暴走',
    children: 'Entry plug ejection failed. All hands brace.',
    berserk: true,
    onDismiss: () => {}
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center'
  }}>
      <HudAlert severity="info" title="INFO" titleJa="情報">System nominal.</HudAlert>
      <HudAlert severity="caution" title="CAUTION" titleJa="注意">Elevated readings.</HudAlert>
      <HudAlert severity="warning" title="WARNING" titleJa="警報">Pattern detected.</HudAlert>
      <HudAlert severity="critical" title="CRITICAL" titleJa="緊急">Breach imminent.</HudAlert>
    </div>
}`,...o.parameters?.docs?.source}}};const S=["Info","Caution","Warning","Critical","Berserk","AllSeverities"];export{o as AllSeverities,l as Berserk,i as Caution,n as Critical,a as Info,s as Warning,S as __namedExportsOrder,b as default};
