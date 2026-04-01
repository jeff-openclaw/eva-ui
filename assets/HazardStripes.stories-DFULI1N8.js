import{j as o}from"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";function u({angle:i=45,stripeWidth:d=4,color:m,bgColor:g,height:n=4,animated:f=!1,speed:p=20,className:c}){const l=d*2*1.414,h=p>0?l/p:1e9;return o.jsx("div",{"aria-hidden":"true",className:`eva-hazard-stripes${f?" eva-hazard-stripes--animated":""}${c?` ${c}`:""}`,style:{"--stripe-angle":`${i}deg`,"--stripe-width":`${d}px`,"--stripe-color":m,"--stripe-bg":g,"--stripe-height":typeof n=="number"?`${n}px`:n,"--stripe-duration":`${h}s`,"--stripe-size":`${l}px`}})}u.__docgenInfo={description:`Decorative diagonal stripe pattern used as accent borders,
dividers, and warning indicators throughout the Eva aesthetic.`,methods:[],displayName:"HazardStripes",props:{angle:{required:!1,tsType:{name:"number"},description:"Stripe angle in degrees. @default 45",defaultValue:{value:"45",computed:!1}},stripeWidth:{required:!1,tsType:{name:"number"},description:"Individual stripe width in px. @default 4",defaultValue:{value:"4",computed:!1}},color:{required:!1,tsType:{name:"string"},description:"Primary stripe color. @default var(--eva-crimson)"},bgColor:{required:!1,tsType:{name:"string"},description:"Background stripe color. @default var(--eva-void)"},height:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Height of the stripe bar. @default 4",defaultValue:{value:"4",computed:!1}},animated:{required:!1,tsType:{name:"boolean"},description:"Animate stripes (scrolling motion). @default false",defaultValue:{value:"false",computed:!1}},speed:{required:!1,tsType:{name:"number"},description:"Animation speed — pixels per second for scroll. @default 20",defaultValue:{value:"20",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"CSS class."}}};const S={title:"Components/HazardStripes",component:u,parameters:{backgrounds:{default:"eva-void"}},decorators:[i=>o.jsx("div",{style:{padding:24},children:o.jsx(i,{})})]},e={},r={args:{stripeWidth:8,height:8}},a={args:{animated:!0,height:6}},s={args:{color:"var(--eva-gold)",height:4}},t={args:{color:"var(--eva-warning)",animated:!0,height:8,stripeWidth:6}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    stripeWidth: 8,
    height: 8
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    animated: true,
    height: 6
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'var(--eva-gold)',
    height: 4
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'var(--eva-warning)',
    animated: true,
    height: 8,
    stripeWidth: 6
  }
}`,...t.parameters?.docs?.source}}};const b=["Default","Thick","Animated","GoldStripes","WarningBar"];export{a as Animated,e as Default,s as GoldStripes,r as Thick,t as WarningBar,b as __namedExportsOrder,S as default};
