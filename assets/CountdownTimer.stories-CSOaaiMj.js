import{j as r}from"./jsx-runtime-Cf8x2fCZ.js";import{r as t}from"./index-Dp4yRKOo.js";import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";function j(e,n){const s=Math.max(0,Math.floor(e));if(n==="hh:mm:ss"){const y=Math.floor(s/3600),i=Math.floor(s%3600/60),d=s%60;return`${String(y).padStart(2,"0")} : ${String(i).padStart(2,"0")} : ${String(d).padStart(2,"0")}`}const o=Math.floor(s/60),x=s%60;return`${String(o).padStart(2,"0")} : ${String(x).padStart(2,"0")}`}function T({seconds:e,format:n="mm:ss",label:s="活動限界",labelSub:o="ACTIVITY LIMIT",warningThreshold:x=60,criticalThreshold:y=10,onExpire:i,autoStart:d=!1,paused:S=!1,className:w}){const[a,b]=t.useState(e),l=t.useRef(!1);t.useEffect(()=>{b(e),e>0&&(l.current=!1)},[e]),t.useEffect(()=>{if(!d||S)return;const C=setInterval(()=>{b(I=>I<=0?(clearInterval(C),0):I-1)},1e3);return()=>clearInterval(C)},[d,S,e]),t.useEffect(()=>{a<=0&&!l.current&&(l.current=!0,i?.()),a>0&&(l.current=!1)},[a,i]);const c=a<=0?"expired":a<=y?"critical":a<=x?"warning":"normal";return r.jsxs("div",{role:"timer","aria-live":c==="critical"||c==="expired"?"assertive":"polite","aria-label":`${o}: ${j(a,n)}`,className:`eva-countdown eva-countdown--${c}${w?` ${w}`:""}`,children:[r.jsx("div",{className:"eva-countdown__label",children:s}),r.jsx("div",{className:"eva-countdown__label-sub",children:o}),r.jsx("div",{className:"eva-countdown__time",children:j(a,n)}),c==="expired"&&r.jsx("div",{className:"eva-countdown__expired-label",children:"活動限界"})]})}T.__docgenInfo={description:`Eva-style countdown display with large segmented numerals,
Japanese labels, and urgency states.`,methods:[],displayName:"CountdownTimer",props:{seconds:{required:!0,tsType:{name:"number"},description:"Time remaining in seconds."},format:{required:!1,tsType:{name:"union",raw:"'mm:ss' | 'hh:mm:ss'",elements:[{name:"literal",value:"'mm:ss'"},{name:"literal",value:"'hh:mm:ss'"}]},description:"Display format. @default 'mm:ss'",defaultValue:{value:"'mm:ss'",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Label above timer. @default '活動限界'",defaultValue:{value:"'活動限界'",computed:!1}},labelSub:{required:!1,tsType:{name:"string"},description:"Sublabel. @default 'ACTIVITY LIMIT'",defaultValue:{value:"'ACTIVITY LIMIT'",computed:!1}},warningThreshold:{required:!1,tsType:{name:"number"},description:"Warning threshold in seconds. @default 60",defaultValue:{value:"60",computed:!1}},criticalThreshold:{required:!1,tsType:{name:"number"},description:"Critical threshold in seconds. @default 10",defaultValue:{value:"10",computed:!1}},onExpire:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when timer reaches zero."},autoStart:{required:!1,tsType:{name:"boolean"},description:"Auto-count down. @default false",defaultValue:{value:"false",computed:!1}},paused:{required:!1,tsType:{name:"boolean"},description:"Paused (only with autoStart).",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"CSS class."}}};const _={width:120,height:138,clipPath:"polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",background:"var(--eva-hex-fill)",border:"1px solid var(--eva-border)"},$={title:"Eva/CountdownTimer",component:T,parameters:{backgrounds:{default:"eva-void"}},decorators:[e=>r.jsx("div",{style:{padding:48,display:"flex",gap:24},children:r.jsx("div",{style:_,children:r.jsx(e,{})})})]},m={args:{seconds:300}},u={args:{seconds:45}},p={args:{seconds:8}},f={args:{seconds:0}},g={args:{seconds:15,autoStart:!0,criticalThreshold:10}},v={args:{seconds:7259,format:"hh:mm:ss"}},h={decorators:[()=>r.jsx("div",{style:{padding:48,display:"flex",gap:24},children:[300,45,8,0].map(e=>r.jsxs("div",{style:{textAlign:"center"},children:[r.jsx("div",{style:_,children:r.jsx(T,{seconds:e})}),r.jsx("div",{style:{color:"var(--eva-text-dim)",fontSize:"0.625rem",marginTop:8,fontFamily:"var(--eva-font-mono)"},children:e>60?"normal":e>10?"warning":e>0?"critical":"expired"})]},e))})]};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    seconds: 300
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    seconds: 45
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    seconds: 8
  }
}`,...p.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    seconds: 0
  }
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    seconds: 15,
    autoStart: true,
    criticalThreshold: 10
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    seconds: 7259,
    format: 'hh:mm:ss'
  }
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  decorators: [() => <div style={{
    padding: 48,
    display: 'flex',
    gap: 24
  }}>
        {[300, 45, 8, 0].map(s => <div key={s} style={{
      textAlign: 'center'
    }}>
            <div style={hexContainer}>
              <CountdownTimer seconds={s} />
            </div>
            <div style={{
        color: 'var(--eva-text-dim)',
        fontSize: '0.625rem',
        marginTop: 8,
        fontFamily: 'var(--eva-font-mono)'
      }}>
              {s > 60 ? 'normal' : s > 10 ? 'warning' : s > 0 ? 'critical' : 'expired'}
            </div>
          </div>)}
      </div>]
}`,...h.parameters?.docs?.source}}};const M=["Normal","Warning","Critical","Expired","AutoCounting","LongFormat","AllStates"];export{h as AllStates,g as AutoCounting,p as Critical,f as Expired,v as LongFormat,m as Normal,u as Warning,M as __namedExportsOrder,$ as default};
