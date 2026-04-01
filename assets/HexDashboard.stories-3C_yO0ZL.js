import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as S}from"./index-Dp4yRKOo.js";import{S as Y}from"./hexGeometry-NISS-ESB.js";import{r as Q,H as m}from"./HexCell-DQEFXEpr.js";import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";function B(t,s,o,d){switch(s){case"left":case"top":return[t,0];case"right":case"bottom":return[0,t];case"auto":return o&&!d?[t,0]:d&&!o?[0,t]:[t/2,t/2];case"split":default:return[t/2,t/2]}}function J(t,s,o){const{cellSize:d,gap:p,minGapSize:n,maxGapSize:a}=o,x=Y*d,f=2*d,u=x+p,b=1.5*d+p;let I=t-2*n,c=Math.max(1,Math.floor((I-x)/u)+1);const z=h=>{const i=(h-1)*u+x,v=t-i;return{gridWidth:i,remainder:v}};let{gridWidth:j,remainder:g}=z(c);if(a){let h=0;for(;c>1&&h<50;){const[i,v]=B(g,o.gapDistribution,o.hasLeftZone,o.hasRightZone);if(i<=a&&v<=a)break;c--,{gridWidth:j,remainder:g}=z(c),h++}}g<2*n&&c>1&&(c--,{gridWidth:j,remainder:g}=z(c));const[H,$]=B(Math.max(g,0),o.gapDistribution,o.hasLeftZone,o.hasRightZone);let q=s-2*n,r=Math.max(1,Math.floor((q-f)/b)+1);const y=h=>{const i=(h-1)*b+f,v=s-i;return{gridHeight:i,remainder:v}};let w=y(r);w.remainder<2*n&&r>1&&(r--,w=y(r));const[E,G]=B(Math.max(w.remainder,0),o.gapDistributionVertical,o.hasTopZone,o.hasBottomZone),O={x:H+x/2,y:E+d};return{cols:c,rows:r,leftGap:H,rightGap:$,topGap:E,bottomGap:G,cellWidth:x,cellHeight:f,horizSpacing:u,vertSpacing:b,gridOrigin:O,gridWidth:j,gridHeight:w.gridHeight,containerWidth:t,containerHeight:s}}function K(t,s){const[o,d]=S.useState(null);return S.useEffect(()=>{const p=t.current;if(!p)return;let n=null;const a=()=>{const{width:f,height:u}=p.getBoundingClientRect();f>0&&u>0&&d(J(f,u,s))},x=new ResizeObserver(()=>{n!=null&&cancelAnimationFrame(n),n=requestAnimationFrame(a)});return x.observe(p),a(),()=>{x.disconnect(),n!=null&&cancelAnimationFrame(n)}},[t,s]),o}function W({cellSize:t=44,gap:s=4,minGapSize:o=48,maxGapSize:d,gapDistribution:p="auto",gapDistributionVertical:n="auto",zones:a,corridorEffect:x=!1,corridorPerspective:f=1200,corridorAngle:u=4,className:b,children:I,onLayoutChange:c}){const z=S.useRef(null),j=!!a?.left,g=!!a?.right,H=!!a?.top,$=!!a?.bottom,q=S.useMemo(()=>({cellSize:t,gap:s,minGapSize:o,maxGapSize:d,gapDistribution:p,gapDistributionVertical:n,hasLeftZone:j,hasRightZone:g,hasTopZone:H,hasBottomZone:$}),[t,s,o,d,p,n,j,g,H,$]),r=K(z,q);S.useEffect(()=>{r&&c&&c(r)},[r,c]);const y=t-s/2,w=S.useMemo(()=>{if(!r)return null;const h=Y*y,i=2*y;return S.Children.map(I,v=>{if(!S.isValidElement(v))return v;const l=v.props;if(l.col==null||l.row==null)return v;const V=l.col*r.horizSpacing+(l.row%2===1?r.horizSpacing/2:0)+r.cellWidth/2,k=l.row*r.vertSpacing+t,C=Q(l.size),A=l.colSpan??1,R=l.rowSpan??1,U=A>1?(A-1)*r.horizSpacing+h:h,X=R>1?(R-1)*r.vertSpacing+i:i,Z=U*C,P=X*C;return e.jsx("div",{className:"eva-hex-dashboard__cell-wrapper",style:{position:"absolute",left:V-Z/2,top:k-P/2,width:Z,height:P},children:v},`cell-${l.col}-${l.row}`)})},[I,r,y,t]),E=r?{"--left-gap":`${r.leftGap}px`,"--right-gap":`${r.rightGap}px`,"--top-gap":`${r.topGap}px`,"--bottom-gap":`${r.bottomGap}px`,"--grid-width":`${r.gridWidth}px`,"--grid-height":`${r.gridHeight}px`,"--hex-cols":r.cols,"--hex-rows":r.rows,"--cell-size":t,"--cell-width":`${r.cellWidth}px`,"--cell-height":`${r.cellHeight}px`,"--corridor-perspective":`${f}px`,"--corridor-angle":`${u}deg`}:{},G=r?r.gridWidth:0,O=r?r.gridHeight:0;return e.jsx("div",{ref:z,className:`eva-hex-dashboard${b?` ${b}`:""}`,style:E,children:r&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"eva-hex-dashboard__grid",children:[e.jsx("svg",{className:"eva-hex-dashboard__bg-svg",width:G,height:O,viewBox:`0 0 ${G} ${O}`,children:Array.from({length:r.rows},(h,i)=>Array.from({length:r.cols},(v,l)=>{const V=l*r.horizSpacing+(i%2===1?r.horizSpacing/2:0)+r.cellWidth/2,k=i*r.vertSpacing+t,C=[];for(let A=0;A<6;A++){const R=2*Math.PI*(A+.5)/6;C.push(`${V+y*Math.cos(R)},${k+y*Math.sin(R)}`)}return e.jsx("polygon",{points:C.join(" "),fill:"var(--eva-hex-fill)",stroke:"var(--eva-border)",strokeWidth:1},`${l},${i}`)}))}),w]}),e.jsx("div",{className:"eva-hex-dashboard__zone eva-hex-dashboard__zone--top",children:a?.top}),e.jsx("div",{className:"eva-hex-dashboard__zone eva-hex-dashboard__zone--bottom",children:a?.bottom}),e.jsx("div",{className:`eva-hex-dashboard__zone eva-hex-dashboard__zone--left${x?" eva-hex-dashboard__zone--corridor-left":""}`,children:a?.left}),e.jsx("div",{className:`eva-hex-dashboard__zone eva-hex-dashboard__zone--right${x?" eva-hex-dashboard__zone--corridor-right":""}`,children:a?.right}),a?.overlay&&e.jsx("div",{className:"eva-hex-dashboard__zone eva-hex-dashboard__zone--overlay",children:a.overlay})]})})}W.__docgenInfo={description:`HexDashboard implements Approach C: fixed interior hex grid + adaptive border strips.
The interior is a pixel-perfect hex grid. Remaining space forms gap zones
where chrome (navbars, headers, etc.) mounts as first-class layout regions.`,methods:[],displayName:"HexDashboard",props:{cellSize:{required:!1,tsType:{name:"number"},description:"Hex circumradius in px. @default 44",defaultValue:{value:"44",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between hex cells in px. @default 4",defaultValue:{value:"4",computed:!1}},minGapSize:{required:!1,tsType:{name:"number"},description:"Minimum gap zone width in px. @default 48",defaultValue:{value:"48",computed:!1}},maxGapSize:{required:!1,tsType:{name:"number"},description:"Maximum gap zone width in px. @default undefined"},gapDistribution:{required:!1,tsType:{name:"union",raw:"'split' | 'left' | 'right' | 'auto'",elements:[{name:"literal",value:"'split'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'auto'"}]},description:"Horizontal gap distribution. @default 'auto'",defaultValue:{value:"'auto'",computed:!1}},gapDistributionVertical:{required:!1,tsType:{name:"union",raw:"'split' | 'top' | 'bottom' | 'auto'",elements:[{name:"literal",value:"'split'"},{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'auto'"}]},description:"Vertical gap distribution. @default 'auto'",defaultValue:{value:"'auto'",computed:!1}},zones:{required:!1,tsType:{name:"HexDashboardZones"},description:"Named gap zones with React content."},corridorEffect:{required:!1,tsType:{name:"boolean"},description:"Enable corridor perspective on side zones. @default false",defaultValue:{value:"false",computed:!1}},corridorPerspective:{required:!1,tsType:{name:"number"},description:"Corridor perspective depth in px. @default 1200",defaultValue:{value:"1200",computed:!1}},corridorAngle:{required:!1,tsType:{name:"number"},description:"Corridor rotation angle in degrees. @default 4",defaultValue:{value:"4",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"CSS class."},children:{required:!1,tsType:{name:"ReactNode"},description:"HexCell children."},onLayoutChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(layout: HexDashboardLayout) => void",signature:{arguments:[{type:{name:"HexDashboardLayout"},name:"layout"}],return:{name:"void"}}},description:"Callback fired after layout recomputation."}}};const ee={width:"100vw",height:"100vh",position:"fixed",top:0,left:0},L={width:800,height:500,border:"1px solid var(--eva-border)"},le={title:"Layout/HexDashboard",component:W,parameters:{layout:"fullscreen",backgrounds:{default:"eva-void"}}},T={decorators:[t=>e.jsx("div",{style:L,children:e.jsx(t,{})})]},_={decorators:[t=>e.jsx("div",{style:ee,children:e.jsx(t,{})})]},D={decorators:[t=>e.jsx("div",{style:L,children:e.jsx(t,{})})],render:t=>e.jsxs(W,{...t,children:[e.jsx(m,{col:0,row:0,state:"active",children:e.jsxs("div",{style:{color:"var(--eva-text-gold)",fontFamily:"var(--eva-font-mono)",fontSize:"0.625rem",textAlign:"center"},children:[e.jsx("div",{children:"MELCHIOR"}),e.jsx("div",{style:{fontSize:"0.5rem",color:"var(--eva-text-dim)"},children:"メルキオール"})]})}),e.jsx(m,{col:1,row:0,state:"active",children:e.jsxs("div",{style:{color:"var(--eva-text-gold)",fontFamily:"var(--eva-font-mono)",fontSize:"0.625rem",textAlign:"center"},children:[e.jsx("div",{children:"BALTHASAR"}),e.jsx("div",{style:{fontSize:"0.5rem",color:"var(--eva-text-dim)"},children:"バルタザール"})]})}),e.jsx(m,{col:2,row:0,state:"active",children:e.jsxs("div",{style:{color:"var(--eva-text-gold)",fontFamily:"var(--eva-font-mono)",fontSize:"0.625rem",textAlign:"center"},children:[e.jsx("div",{children:"CASPAR"}),e.jsx("div",{style:{fontSize:"0.5rem",color:"var(--eva-text-dim)"},children:"カスパー"})]})}),e.jsx(m,{col:4,row:2,state:"warning"})]})},M={decorators:[t=>e.jsx("div",{style:L,children:e.jsx(t,{})})],args:{gapDistribution:"left",minGapSize:64,zones:{left:e.jsxs("div",{style:{width:"100%",height:"100%",borderRight:"1px solid var(--eva-gold)",background:"var(--eva-panel)",padding:12,display:"flex",flexDirection:"column",gap:8,fontFamily:"var(--eva-font-mono)",color:"var(--eva-text-gold)",fontSize:"0.625rem"},children:[e.jsx("div",{style:{letterSpacing:"0.1em"},children:"NERV"}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[e.jsx("div",{style:{color:"var(--eva-text-gold)",cursor:"pointer"},children:"▸ DASHBOARD"}),e.jsx("div",{style:{color:"var(--eva-text-dim)"},children:"  MAGI"}),e.jsx("div",{style:{color:"var(--eva-text-dim)"},children:"  PILOT SYNC"}),e.jsx("div",{style:{color:"var(--eva-text-dim)"},children:"  ALERTS"})]}),e.jsx("div",{style:{color:"var(--eva-text-dim)",fontSize:"0.5rem"},children:"v3.01"})]}),top:e.jsxs("div",{style:{width:"100%",height:"100%",borderBottom:"1px solid var(--eva-gold)",background:"var(--eva-deep)",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",fontFamily:"var(--eva-font-mono)"},children:[e.jsx("div",{children:e.jsx("div",{style:{color:"var(--eva-text-gold)",fontSize:"0.875rem",letterSpacing:"0.05em"},children:"第壱中央指令所"})}),e.jsx("div",{style:{color:"var(--eva-text-dim)",fontSize:"0.625rem"},children:"MAGI SYSTEM: NOMINAL"})]})}}},F={decorators:[t=>e.jsx("div",{style:L,children:e.jsx(t,{})})],render:t=>e.jsxs(W,{...t,children:[e.jsx(m,{col:3,row:2,size:"lg",state:"active",children:e.jsxs("div",{style:{color:"var(--eva-text-gold)",fontFamily:"var(--eva-font-mono)",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"0.875rem",fontWeight:700,letterSpacing:"0.05em"},children:"MAIN MONITOR"}),e.jsx("div",{style:{fontSize:"0.625rem",color:"var(--eva-text-dim)",marginTop:4},children:"Central Dogma"}),e.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"center",marginTop:8},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.875rem",color:"var(--eva-text-gold)"},children:"98.2%"}),e.jsx("div",{style:{fontSize:"0.5rem",color:"var(--eva-text-dim)"},children:"SYNC"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.875rem",color:"var(--eva-text-gold)"},children:"NOMINAL"}),e.jsx("div",{style:{fontSize:"0.5rem",color:"var(--eva-text-dim)"},children:"STATUS"})]})]})]})}),e.jsx(m,{col:0,row:0,size:"sm",state:"active",children:e.jsx("div",{style:{color:"var(--eva-text-gold)",fontFamily:"var(--eva-font-mono)",fontSize:"0.5rem",textAlign:"center"},children:e.jsx("div",{children:"01"})})}),e.jsx(m,{col:1,row:0,state:"active",children:e.jsxs("div",{style:{color:"var(--eva-text-gold)",fontFamily:"var(--eva-font-mono)",fontSize:"0.625rem",textAlign:"center"},children:[e.jsx("div",{children:"MELCHIOR"}),e.jsx("div",{style:{fontSize:"0.5rem",color:"var(--eva-text-dim)"},children:"メルキオール"})]})}),e.jsx(m,{col:2,row:0,state:"active",children:e.jsxs("div",{style:{color:"var(--eva-text-gold)",fontFamily:"var(--eva-font-mono)",fontSize:"0.625rem",textAlign:"center"},children:[e.jsx("div",{children:"BALTHASAR"}),e.jsx("div",{style:{fontSize:"0.5rem",color:"var(--eva-text-dim)"},children:"バルタザール"})]})}),e.jsx(m,{col:6,row:1,size:"sm",state:"warning"}),e.jsx(m,{col:7,row:1,size:"sm",children:e.jsx("div",{style:{color:"var(--eva-text-dim)",fontFamily:"var(--eva-font-mono)",fontSize:"0.5rem",textAlign:"center"},children:"AUX"})}),e.jsx(m,{col:0,row:3,children:e.jsx("div",{style:{color:"var(--eva-text-dim)",fontFamily:"var(--eva-font-mono)",fontSize:"0.5rem",textAlign:"center"},children:"LOG"})}),e.jsx(m,{col:7,row:3,state:"active",children:e.jsx("div",{style:{color:"var(--eva-text-gold)",fontFamily:"var(--eva-font-mono)",fontSize:"0.625rem",textAlign:"center"},children:"CASPAR"})})]})},N={decorators:[t=>e.jsx("div",{style:L,children:e.jsx(t,{})})],args:{corridorEffect:!0,minGapSize:80,zones:{left:e.jsx("div",{style:{width:"100%",height:"100%",borderRight:"1px solid var(--eva-gold)",background:"var(--eva-panel)"}}),right:e.jsx("div",{style:{width:"100%",height:"100%",borderLeft:"1px solid var(--eva-gold)",background:"var(--eva-panel)"}})}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={contained}><Story /></div>]
}`,...T.parameters?.docs?.source},description:{story:"Basic dashboard with no zones — just the hex grid filling the container.",...T.parameters?.docs?.description}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={fullscreen}><Story /></div>]
}`,..._.parameters?.docs?.source},description:{story:"Fullscreen dashboard.",..._.parameters?.docs?.description}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={contained}><Story /></div>],
  render: args => <HexDashboard {...args}>
      <HexCell col={0} row={0} state="active">
        <div style={{
        color: 'var(--eva-text-gold)',
        fontFamily: 'var(--eva-font-mono)',
        fontSize: '0.625rem',
        textAlign: 'center'
      }}>
          <div>MELCHIOR</div>
          <div style={{
          fontSize: '0.5rem',
          color: 'var(--eva-text-dim)'
        }}>メルキオール</div>
        </div>
      </HexCell>
      <HexCell col={1} row={0} state="active">
        <div style={{
        color: 'var(--eva-text-gold)',
        fontFamily: 'var(--eva-font-mono)',
        fontSize: '0.625rem',
        textAlign: 'center'
      }}>
          <div>BALTHASAR</div>
          <div style={{
          fontSize: '0.5rem',
          color: 'var(--eva-text-dim)'
        }}>バルタザール</div>
        </div>
      </HexCell>
      <HexCell col={2} row={0} state="active">
        <div style={{
        color: 'var(--eva-text-gold)',
        fontFamily: 'var(--eva-font-mono)',
        fontSize: '0.625rem',
        textAlign: 'center'
      }}>
          <div>CASPAR</div>
          <div style={{
          fontSize: '0.5rem',
          color: 'var(--eva-text-dim)'
        }}>カスパー</div>
        </div>
      </HexCell>
      <HexCell col={4} row={2} state="warning" />
    </HexDashboard>
}`,...D.parameters?.docs?.source},description:{story:"Dashboard with HexCell children placed in the grid.",...D.parameters?.docs?.description}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={contained}><Story /></div>],
  args: {
    gapDistribution: 'left',
    minGapSize: 64,
    zones: {
      left: <div style={{
        width: '100%',
        height: '100%',
        borderRight: '1px solid var(--eva-gold)',
        background: 'var(--eva-panel)',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        fontFamily: 'var(--eva-font-mono)',
        color: 'var(--eva-text-gold)',
        fontSize: '0.625rem'
      }}>
          <div style={{
          letterSpacing: '0.1em'
        }}>NERV</div>
          <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
            <div style={{
            color: 'var(--eva-text-gold)',
            cursor: 'pointer'
          }}>▸ DASHBOARD</div>
            <div style={{
            color: 'var(--eva-text-dim)'
          }}>  MAGI</div>
            <div style={{
            color: 'var(--eva-text-dim)'
          }}>  PILOT SYNC</div>
            <div style={{
            color: 'var(--eva-text-dim)'
          }}>  ALERTS</div>
          </div>
          <div style={{
          color: 'var(--eva-text-dim)',
          fontSize: '0.5rem'
        }}>v3.01</div>
        </div>,
      top: <div style={{
        width: '100%',
        height: '100%',
        borderBottom: '1px solid var(--eva-gold)',
        background: 'var(--eva-deep)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'var(--eva-font-mono)'
      }}>
          <div>
            <div style={{
            color: 'var(--eva-text-gold)',
            fontSize: '0.875rem',
            letterSpacing: '0.05em'
          }}>
              第壱中央指令所
            </div>
          </div>
          <div style={{
          color: 'var(--eva-text-dim)',
          fontSize: '0.625rem'
        }}>
            MAGI SYSTEM: NOMINAL
          </div>
        </div>
    }
  }
}`,...M.parameters?.docs?.source},description:{story:"Dashboard with chrome in gap zones.",...M.parameters?.docs?.description}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={contained}><Story /></div>],
  render: args => <HexDashboard {...args}>
      {/* Large center panel */}
      <HexCell col={3} row={2} size="lg" state="active">
        <div style={{
        color: 'var(--eva-text-gold)',
        fontFamily: 'var(--eva-font-mono)',
        textAlign: 'center'
      }}>
          <div style={{
          fontSize: '0.875rem',
          fontWeight: 700,
          letterSpacing: '0.05em'
        }}>MAIN MONITOR</div>
          <div style={{
          fontSize: '0.625rem',
          color: 'var(--eva-text-dim)',
          marginTop: 4
        }}>Central Dogma</div>
          <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          marginTop: 8
        }}>
            <div>
              <div style={{
              fontSize: '0.875rem',
              color: 'var(--eva-text-gold)'
            }}>98.2%</div>
              <div style={{
              fontSize: '0.5rem',
              color: 'var(--eva-text-dim)'
            }}>SYNC</div>
            </div>
            <div>
              <div style={{
              fontSize: '0.875rem',
              color: 'var(--eva-text-gold)'
            }}>NOMINAL</div>
              <div style={{
              fontSize: '0.5rem',
              color: 'var(--eva-text-dim)'
            }}>STATUS</div>
            </div>
          </div>
        </div>
      </HexCell>
      {/* Small status cells around the center */}
      <HexCell col={0} row={0} size="sm" state="active">
        <div style={{
        color: 'var(--eva-text-gold)',
        fontFamily: 'var(--eva-font-mono)',
        fontSize: '0.5rem',
        textAlign: 'center'
      }}>
          <div>01</div>
        </div>
      </HexCell>
      <HexCell col={1} row={0} state="active">
        <div style={{
        color: 'var(--eva-text-gold)',
        fontFamily: 'var(--eva-font-mono)',
        fontSize: '0.625rem',
        textAlign: 'center'
      }}>
          <div>MELCHIOR</div>
          <div style={{
          fontSize: '0.5rem',
          color: 'var(--eva-text-dim)'
        }}>メルキオール</div>
        </div>
      </HexCell>
      <HexCell col={2} row={0} state="active">
        <div style={{
        color: 'var(--eva-text-gold)',
        fontFamily: 'var(--eva-font-mono)',
        fontSize: '0.625rem',
        textAlign: 'center'
      }}>
          <div>BALTHASAR</div>
          <div style={{
          fontSize: '0.5rem',
          color: 'var(--eva-text-dim)'
        }}>バルタザール</div>
        </div>
      </HexCell>
      <HexCell col={6} row={1} size="sm" state="warning" />
      <HexCell col={7} row={1} size="sm">
        <div style={{
        color: 'var(--eva-text-dim)',
        fontFamily: 'var(--eva-font-mono)',
        fontSize: '0.5rem',
        textAlign: 'center'
      }}>
          AUX
        </div>
      </HexCell>
      <HexCell col={0} row={3}>
        <div style={{
        color: 'var(--eva-text-dim)',
        fontFamily: 'var(--eva-font-mono)',
        fontSize: '0.5rem',
        textAlign: 'center'
      }}>
          LOG
        </div>
      </HexCell>
      <HexCell col={7} row={3} state="active">
        <div style={{
        color: 'var(--eva-text-gold)',
        fontFamily: 'var(--eva-font-mono)',
        fontSize: '0.625rem',
        textAlign: 'center'
      }}>
          CASPAR
        </div>
      </HexCell>
    </HexDashboard>
}`,...F.parameters?.docs?.source},description:{story:"Dashboard with mixed-size cells: a large center panel and smaller status cells.",...F.parameters?.docs?.description}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={contained}><Story /></div>],
  args: {
    corridorEffect: true,
    minGapSize: 80,
    zones: {
      left: <div style={{
        width: '100%',
        height: '100%',
        borderRight: '1px solid var(--eva-gold)',
        background: 'var(--eva-panel)'
      }} />,
      right: <div style={{
        width: '100%',
        height: '100%',
        borderLeft: '1px solid var(--eva-gold)',
        background: 'var(--eva-panel)'
      }} />
    }
  }
}`,...N.parameters?.docs?.source},description:{story:"Dashboard with corridor effect on side zones.",...N.parameters?.docs?.description}}};const se=["Default","Fullscreen","WithCells","WithZones","MixedSizes","CorridorEffect"];export{N as CorridorEffect,T as Default,_ as Fullscreen,F as MixedSizes,D as WithCells,M as WithZones,se as __namedExportsOrder,le as default};
