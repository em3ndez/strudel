"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const t=require("react"),de=require("@uiw/react-codemirror"),w=require("@codemirror/view"),V=require("@codemirror/state"),fe=require("@codemirror/lang-javascript"),d=require("@lezer/highlight"),ge=require("@uiw/codemirror-themes"),Z=require("@strudel.cycles/webaudio"),me=require("react-hook-inview"),T=require("@strudel.cycles/core"),he=require("@strudel.cycles/transpiler"),ee=e=>e&&typeof e=="object"&&"default"in e?e:{default:e},f=ee(t),pe=ee(de),ve=ge.createTheme({theme:"dark",settings:{background:"#222",foreground:"#75baff",caret:"#ffcc00",selection:"rgba(128, 203, 196, 0.5)",selectionMatch:"#036dd626",lineHighlight:"#00000050",gutterBackground:"transparent",gutterForeground:"#8a919966"},styles:[{tag:d.tags.keyword,color:"#c792ea"},{tag:d.tags.operator,color:"#89ddff"},{tag:d.tags.special(d.tags.variableName),color:"#eeffff"},{tag:d.tags.typeName,color:"#c3e88d"},{tag:d.tags.atom,color:"#f78c6c"},{tag:d.tags.number,color:"#c3e88d"},{tag:d.tags.definition(d.tags.variableName),color:"#82aaff"},{tag:d.tags.string,color:"#c3e88d"},{tag:d.tags.special(d.tags.string),color:"#c3e88d"},{tag:d.tags.comment,color:"#7d8799"},{tag:d.tags.variableName,color:"#c792ea"},{tag:d.tags.tagName,color:"#c3e88d"},{tag:d.tags.bracket,color:"#525154"},{tag:d.tags.meta,color:"#ffcb6b"},{tag:d.tags.attributeName,color:"#c792ea"},{tag:d.tags.propertyName,color:"#c792ea"},{tag:d.tags.className,color:"#decb6b"},{tag:d.tags.invalid,color:"#ffffff"}]});const J=V.StateEffect.define(),be=V.StateField.define({create(){return w.Decoration.none},update(e,r){try{for(let o of r.effects)if(o.is(J))if(o.value){const n=w.Decoration.mark({attributes:{style:"background-color: #FFCA2880"}});e=w.Decoration.set([n.range(0,r.newDoc.length)])}else e=w.Decoration.set([]);return e}catch(o){return console.warn("flash error",o),e}},provide:e=>w.EditorView.decorations.from(e)}),te=e=>{e.dispatch({effects:J.of(!0)}),setTimeout(()=>{e.dispatch({effects:J.of(!1)})},200)},z=V.StateEffect.define(),Ee=V.StateField.define({create(){return w.Decoration.none},update(e,r){try{for(let o of r.effects)if(o.is(z)){const n=o.value.map(u=>(u.context.locations||[]).map(({start:m,end:g})=>{const s=u.context.color||"#FFCA28";let l=r.newDoc.line(m.line).from+m.column,p=r.newDoc.line(g.line).from+g.column;const E=r.newDoc.length;return l>E||p>E?void 0:w.Decoration.mark({attributes:{style:`outline: 1.5px solid ${s};`}}).range(l,p)})).flat().filter(Boolean)||[];e=w.Decoration.set(n,!0)}return e}catch{return w.Decoration.set([])}},provide:e=>w.EditorView.decorations.from(e)}),ye=[fe.javascript(),ve,Ee,be];function re({value:e,onChange:r,onViewChanged:o,onSelectionChange:n,options:u,editorDidMount:m}){const g=t.useCallback(p=>{r?.(p)},[r]),s=t.useCallback(p=>{o?.(p)},[o]),l=t.useCallback(p=>{p.selectionSet&&n&&n?.(p.state.selection)},[n]);return f.default.createElement(f.default.Fragment,null,f.default.createElement(pe.default,{value:e,onChange:g,onCreateEditor:s,onUpdate:l,extensions:ye}))}function G(...e){return e.filter(Boolean).join(" ")}function oe({view:e,pattern:r,active:o,getTime:n}){const u=t.useRef([]),m=t.useRef(0);t.useEffect(()=>{if(e)if(r&&o){m.current=0;let g=requestAnimationFrame(function s(){try{const l=n(),E=[Math.max(m.current??l,l-1/10,-.01),l+1/60];m.current=E[1],u.current=u.current.filter(h=>h.whole.end>l);const i=r.queryArc(...E).filter(h=>h.hasOnset());u.current=u.current.concat(i),e.dispatch({effects:z.of(u.current)})}catch{e.dispatch({effects:z.of([])})}g=requestAnimationFrame(s)});return()=>{cancelAnimationFrame(g)}}else u.current=[],e.dispatch({effects:z.of([])})},[r,o,e])}function we(e,r=!1){const o=t.useRef(),n=t.useRef(),u=s=>{if(n.current!==void 0){const l=s-n.current;e(s,l)}n.current=s,o.current=requestAnimationFrame(u)},m=()=>{o.current=requestAnimationFrame(u)},g=()=>{o.current&&cancelAnimationFrame(o.current),delete o.current};return t.useEffect(()=>{o.current&&(g(),m())},[e]),t.useEffect(()=>(r&&m(),g),[]),{start:m,stop:g}}function ke({pattern:e,started:r,getTime:o,onDraw:n,drawTime:u=[-2,2]}){let[m,g]=u;m=Math.abs(m);let s=t.useRef([]),l=t.useRef(null);t.useEffect(()=>{if(e&&r){const i=o(),h=e.queryArc(Math.max(i,0),i+g+.1);s.current=s.current.filter(v=>v.whole.begin<i),s.current=s.current.concat(h)}},[e,r]);const{start:p,stop:E}=we(t.useCallback(()=>{const i=o()+g;if(l.current===null){l.current=i;return}const h=e.queryArc(Math.max(l.current,i-1/10),i);l.current=i,s.current=(s.current||[]).filter(v=>v.whole.end>=i-m-g).concat(h.filter(v=>v.hasOnset())),n(e,i-g,s.current,u)},[e]));return t.useEffect(()=>{r?p():(s.current=[],E())},[r]),{clear:()=>{s.current=[]}}}function ne(e){return t.useEffect(()=>(window.addEventListener("message",e),()=>window.removeEventListener("message",e)),[e]),t.useCallback(r=>window.postMessage(r,"*"),[])}function ae({defaultOutput:e,interval:r,getTime:o,evalOnMount:n=!1,initialCode:u="",autolink:m=!1,beforeEval:g,afterEval:s,editPattern:l,onEvalError:p,onToggle:E,canvasId:i,drawContext:h,drawTime:v=[-2,2]}){const F=t.useMemo(()=>_e(),[]);i=i||`canvas-${F}`;const[S,D]=t.useState(),[N,x]=t.useState(),[y,L]=t.useState(u),[P,A]=t.useState(),[R,O]=t.useState(),[M,H]=t.useState(!1),j=y!==P,q=t.useCallback(c=>!!(c?.context?.onPaint&&h),[h]),{scheduler:C,evaluate:a,start:b,stop:B,pause:I}=t.useMemo(()=>T.repl({interval:r,defaultOutput:e,onSchedulerError:D,onEvalError:c=>{x(c),p?.(c)},getTime:o,drawContext:h,transpiler:he.transpiler,editPattern:l,beforeEval:({code:c})=>{L(c),g?.()},afterEval:({pattern:c,code:k})=>{A(k),O(c),x(),D(),m&&(window.location.hash="#"+encodeURIComponent(btoa(k))),s?.()},onToggle:c=>{H(c),E?.(c)}}),[e,r,o]),se=ne(({data:{from:c,type:k}})=>{k==="start"&&c!==F&&B()}),Q=t.useCallback(async(c=!0)=>{const k=await a(y,c);return se({type:"start",from:F}),k},[a,y]),K=t.useCallback((c,k,W,$)=>{const{onPaint:ie}=c.context||{},ue=typeof h=="function"?h(i):h;ie?.(ue,k,W,$)},[h,i]),U=t.useCallback(c=>{if(q(c)){const[k,W]=v,$=c.queryArc(0,W);K(c,-.001,$,v)}},[v,K,q]),X=t.useRef();t.useEffect(()=>{!X.current&&n&&y&&(X.current=!0,a(y,!1).then(c=>U(c)))},[n,y,a,U]),t.useEffect(()=>()=>{C.stop()},[C]);const ce=async()=>{M?(C.stop(),U(R)):await Q()},le=S||N;return ke({pattern:R,started:q(R)&&M,getTime:()=>C.now(),drawTime:v,onDraw:K}),{id:F,canvasId:i,code:y,setCode:L,error:le,schedulerError:S,scheduler:C,evalError:N,evaluate:a,activateCode:Q,activeCode:P,isDirty:j,pattern:R,started:M,start:b,stop:B,pause:I,togglePlay:ce}}function _e(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}function Y({type:e}){return f.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"sc-h-5 sc-w-5",viewBox:"0 0 20 20",fill:"currentColor"},{refresh:f.default.createElement("path",{fillRule:"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",clipRule:"evenodd"}),play:f.default.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"}),pause:f.default.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"}),stop:f.default.createElement("path",{fillRule:"evenodd",d:"M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5z",clipRule:"evenodd"})}[e])}const Me="_container_3i85k_1",Ce="_header_3i85k_5",Fe="_buttons_3i85k_9",De="_button_3i85k_9",Re="_buttonDisabled_3i85k_17",qe="_error_3i85k_21",Se="_body_3i85k_25",_={container:Me,header:Ce,buttons:Fe,button:De,buttonDisabled:Re,error:qe,body:Se},Ae=()=>Z.getAudioContext().currentTime;function Ne({tune:e,hideOutsideView:r=!1,enableKeyboard:o,drawTime:n,punchcard:u,canvasHeight:m=200}){n=n||(u?[0,4]:void 0);const g=!!n,s=t.useCallback(n?a=>document.querySelector("#"+a)?.getContext("2d"):null,[n]),{code:l,setCode:p,evaluate:E,activateCode:i,error:h,isDirty:v,activeCode:F,pattern:S,started:D,scheduler:N,togglePlay:x,stop:y,canvasId:L,id:P}=ae({initialCode:e,defaultOutput:Z.webaudioOutput,editPattern:a=>u?a.punchcard():a,getTime:Ae,evalOnMount:g,drawContext:s,drawTime:n}),[A,R]=t.useState(),[O,M]=me.useInView({threshold:.01}),H=t.useRef(),j=t.useMemo(()=>((M||!r)&&(H.current=!0),M||H.current),[M,r]);oe({view:A,pattern:S,active:D&&!F?.includes("strudel disable-highlighting"),getTime:()=>N.now()}),t.useLayoutEffect(()=>{if(o){const a=async b=>{(b.ctrlKey||b.altKey)&&(b.code==="Enter"?(b.preventDefault(),te(A),await i()):b.code==="Period"&&(y(),b.preventDefault()))};return window.addEventListener("keydown",a,!0),()=>window.removeEventListener("keydown",a,!0)}},[o,S,l,E,y,A]);const[q,C]=t.useState([]);return xe(t.useCallback(a=>{const{data:b}=a.detail;b?.hap?.context?.id===P&&C(I=>I.concat([a.detail]).slice(-10))},[])),f.default.createElement("div",{className:_.container,ref:O},f.default.createElement("div",{className:_.header},f.default.createElement("div",{className:_.buttons},f.default.createElement("button",{className:G(_.button,D?"sc-animate-pulse":""),onClick:()=>x()},f.default.createElement(Y,{type:D?"stop":"play"})),f.default.createElement("button",{className:G(v?_.button:_.buttonDisabled),onClick:()=>i()},f.default.createElement(Y,{type:"refresh"}))),h&&f.default.createElement("div",{className:_.error},h.message)),f.default.createElement("div",{className:_.body},j&&f.default.createElement(re,{value:l,onChange:p,onViewChanged:R})),n&&f.default.createElement("canvas",{id:L,className:"w-full pointer-events-none",height:m,ref:a=>{a&&a.width!==a.clientWidth&&(a.width=a.clientWidth)}}),!!q.length&&f.default.createElement("div",{className:"sc-bg-gray-800 sc-rounded-md sc-p-2"},q.map(({message:a},b)=>f.default.createElement("div",{key:b},a))))}function xe(e){Le(T.logger.key,e)}function Le(e,r,o=!1){t.useEffect(()=>(document.addEventListener(e,r,o),()=>{document.removeEventListener(e,r,o)}),[r])}const Pe=e=>t.useLayoutEffect(()=>(window.addEventListener("keydown",e,!0),()=>window.removeEventListener("keydown",e,!0)),[e]);exports.CodeMirror=re;exports.MiniRepl=Ne;exports.cx=G;exports.flash=te;exports.useHighlighting=oe;exports.useKeydown=Pe;exports.usePostMessage=ne;exports.useStrudel=ae;
