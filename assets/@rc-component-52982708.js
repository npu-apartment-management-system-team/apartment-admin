import{c as b,h as aa,a as U,e as Wr,b as Ea}from"./@babel-5495bcd4.js";import{r as t}from"./react-2ce75adb.js";import{r as wa}from"./react-dom-16e2f971.js";import{c as Lr,b as I,d as Na,u as Ta,r as la,s as xr,e as Sa,f as Pe,i as ta,h as La,j as sa,g as na,k as Wa,l as xa,m as za,n as Ba,o as _a}from"./rc-util-47d6e7fe.js";import{c as Ze}from"./classnames-776d2d10.js";import{R as Pa}from"./rc-resize-observer-f62c5579.js";import{C as Da}from"./rc-motion-e266f1c3.js";import"./react-is-e8e5dbb3.js";var ka=t.createContext(null),va=[];function Ha(e,a){var r=t.useState(function(){if(!Lr())return null;var C=document.createElement("div");return C}),n=b(r,1),o=n[0],i=t.useRef(!1),l=t.useContext(ka),s=t.useState(va),f=b(s,2),m=f[0],y=f[1],d=l||(i.current?void 0:function(C){y(function(S){var N=[C].concat(aa(S));return N})});function w(){o.parentElement||document.body.appendChild(o),i.current=!0}function v(){var C;(C=o.parentElement)===null||C===void 0||C.removeChild(o),i.current=!1}return I(function(){return e?l?l(w):w():v(),v},[e]),I(function(){m.length&&(m.forEach(function(C){return C()}),y(va))},[m]),[o,d]}function Va(){return document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth}var Aa="rc-util-locker-".concat(Date.now()),ca=0;function Fa(e){var a=!!e,r=t.useState(function(){return ca+=1,"".concat(Aa,"_").concat(ca)}),n=b(r,1),o=n[0];I(function(){if(a){var i=Na(),l=Va();Ta(`
html body {
  overflow-y: hidden;
  `.concat(l?"width: calc(100% - ".concat(i,"px);"):"",`
}`),o)}else la(o);return function(){la(o)}},[a,o])}var fa=!1;function Ia(e){return typeof e=="boolean"&&(fa=e),fa}var da=function(a){return a===!1?!1:!Lr()||!a?null:typeof a=="string"?document.querySelector(a):typeof a=="function"?a():a},Ra=t.forwardRef(function(e,a){var r=e.open,n=e.autoLock,o=e.getContainer;e.debug;var i=e.autoDestroy,l=i===void 0?!0:i,s=e.children,f=t.useState(r),m=b(f,2),y=m[0],d=m[1],w=y||r;t.useEffect(function(){(l||r)&&d(r)},[r,l]);var v=t.useState(function(){return da(o)}),C=b(v,2),S=C[0],N=C[1];t.useEffect(function(){var B=da(o);N(B??null)});var T=Ha(w&&!S),c=b(T,2),R=c[0],L=c[1],z=S??R;Fa(n&&r&&Lr()&&(z===R||z===document.body));var J=null;if(s&&xr(s)&&a){var ee=s;J=ee.ref}var X=Sa(J,a);if(!w||!Lr()||S===void 0)return null;var A=z===!1||Ia(),g=s;return a&&(g=t.cloneElement(s,{ref:X})),t.createElement(ka.Provider,{value:L},A?g:wa.createPortal(g,z))}),ma=t.createContext(null);function ha(e){return e?Array.isArray(e)?e:[e]:[]}function Ua(e,a,r,n){return t.useMemo(function(){var o=ha(r??a),i=ha(n??a),l=new Set(o),s=new Set(i);return e&&(l.has("hover")&&(l.delete("hover"),l.add("click")),s.has("hover")&&(s.delete("hover"),s.add("click"))),[l,s]},[e,a,r,n])}function qa(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],r=arguments.length>2?arguments[2]:void 0;return r?e[0]===a[0]:e[0]===a[0]&&e[1]===a[1]}function ja(e,a,r,n){for(var o=r.points,i=Object.keys(e),l=0;l<i.length;l+=1){var s,f=i[l];if(qa((s=e[f])===null||s===void 0?void 0:s.points,o,n))return"".concat(a,"-placement-").concat(f)}return""}function ga(e,a,r,n){return a||(r?{motionName:"".concat(e,"-").concat(r)}:n?{motionName:n}:null)}function sr(e){return e.ownerDocument.defaultView}function oa(e){for(var a=[],r=e?.parentElement,n=["hidden","scroll","clip","auto"];r;){var o=sr(r).getComputedStyle(r),i=o.overflowX,l=o.overflowY,s=o.overflow;[i,l,s].some(function(f){return n.includes(f)})&&a.push(r),r=r.parentElement}return a}function lr(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;return Number.isNaN(e)?a:e}function ur(e){return lr(parseFloat(e),0)}function ya(e,a){var r=U({},e);return(a||[]).forEach(function(n){if(!(n instanceof HTMLBodyElement)){var o=sr(n).getComputedStyle(n),i=o.overflow,l=o.overflowClipMargin,s=o.borderTopWidth,f=o.borderBottomWidth,m=o.borderLeftWidth,y=o.borderRightWidth,d=n.getBoundingClientRect(),w=n.offsetHeight,v=n.clientHeight,C=n.offsetWidth,S=n.clientWidth,N=ur(s),T=ur(f),c=ur(m),R=ur(y),L=lr(Math.round(d.width/C*1e3)/1e3),z=lr(Math.round(d.height/w*1e3)/1e3),J=(C-S-c-R)*L,ee=(w-v-N-T)*z,X=N*z,A=T*z,g=c*L,B=R*L,P=0,te=0;if(i==="clip"){var re=ur(l);P=re*L,te=re*z}var G=d.x+g-P,$=d.y+X-te,ae=G+d.width+2*P-g-B-J,De=$+d.height+2*te-X-A-ee;r.left=Math.max(r.left,G),r.top=Math.max(r.top,$),r.right=Math.min(r.right,ae),r.bottom=Math.min(r.bottom,De)}}),r}function Ca(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r="".concat(a),n=r.match(/^(.*)\%$/);return n?e*(parseFloat(n[1])/100):parseFloat(r)}function Ma(e,a){var r=a||[],n=b(r,2),o=n[0],i=n[1];return[Ca(e.width,o),Ca(e.height,i)]}function ba(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return[e[0],e[1]]}function Ke(e,a){var r=a[0],n=a[1],o,i;return r==="t"?i=e.y:r==="b"?i=e.y+e.height:i=e.y+e.height/2,n==="l"?o=e.x:n==="r"?o=e.x+e.width:o=e.x+e.width/2,{x:o,y:i}}function Se(e,a){var r={t:"b",b:"t",l:"r",r:"l"};return e.map(function(n,o){return o===a?r[n]||"c":n}).join("")}function Qa(e,a,r,n,o,i,l){var s=t.useState({ready:!1,offsetX:0,offsetY:0,offsetR:0,offsetB:0,arrowX:0,arrowY:0,scaleX:1,scaleY:1,align:o[n]||{}}),f=b(s,2),m=f[0],y=f[1],d=t.useRef(0),w=t.useMemo(function(){return a?oa(a):[]},[a]),v=t.useRef({}),C=function(){v.current={}};e||C();var S=Pe(function(){if(a&&r&&e){let F=function(Je,Be){var Ge=arguments.length>2&&arguments[2]!==void 0?arguments[2]:se,nr=P.x+Je,or=P.y+Be,ir=nr+p,Er=or+O,Xr=Math.max(nr,Ge.left),Or=Math.max(or,Ge.top),pr=Math.min(ir,Ge.right),ea=Math.min(Er,Ge.bottom);return Math.max(0,(pr-Xr)*(ea-Or))},tr=function(){ye=P.y+E,qe=ye+O,Ce=P.x+W,Me=Ce+p};var c=a,R=c.style.left,L=c.style.top,z=c.style.right,J=c.style.bottom,ee=c.ownerDocument,X=sr(c),A=U(U({},o[n]),i);c.style.left="0",c.style.top="0",c.style.right="auto",c.style.bottom="auto";var g;if(Array.isArray(r))g={x:r[0],y:r[1],width:0,height:0};else{var B=r.getBoundingClientRect();g={x:B.x,y:B.y,width:B.width,height:B.height}}var P=c.getBoundingClientRect(),te=X.getComputedStyle(c),re=te.width,G=te.height,$=ee.documentElement,ae=$.clientWidth,De=$.clientHeight,_e=$.scrollWidth,ne=$.scrollHeight,le=$.scrollTop,ke=$.scrollLeft,O=P.height,p=P.width,q=g.height,V=g.width,He={left:0,top:0,right:ae,bottom:De},Re={left:-ke,top:-le,right:_e-ke,bottom:ne-le},oe=A.htmlRegion,Ve="visible",$e="visibleFirst";oe!=="scroll"&&oe!==$e&&(oe=Ve);var j=oe===$e,Ee=ya(Re,w),M=ya(He,w),se=oe===Ve?M:Ee,K=j?M:se;c.style.left="auto",c.style.top="auto",c.style.right="0",c.style.bottom="0";var Ae=c.getBoundingClientRect();c.style.left=R,c.style.top=L,c.style.right=z,c.style.bottom=J;var ve=lr(Math.round(p/parseFloat(re)*1e3)/1e3),me=lr(Math.round(O/parseFloat(G)*1e3)/1e3);if(ve===0||me===0||ta(r)&&!La(r))return;var ce=A.offset,zr=A.targetOffset,Br=Ma(P,ce),vr=b(Br,2),Fe=vr[0],Z=vr[1],_r=Ma(g,zr),cr=b(_r,2),Hr=cr[0],fr=cr[1];g.x-=Hr,g.y-=fr;var he=A.points||[],dr=b(he,2),Vr=dr[0],Ie=dr[1],_=ba(Ie),H=ba(Vr),mr=Ke(g,_),hr=Ke(P,H),ge=U({},A),W=mr.x-hr.x+Fe,E=mr.y-hr.y+Z,ie=F(W,E),Ne=F(W,E,M),Q=Ke(g,["t","l"]),gr=Ke(P,["t","l"]),Ue=Ke(g,["b","r"]),Ye=Ke(P,["b","r"]),Te=A.overflow||{},yr=Te.adjustX,fe=Te.adjustY,Cr=Te.shiftX,Xe=Te.shiftY,Oe=function(Be){return typeof Be=="boolean"?Be:Be>=0},ye,qe,Ce,Me;tr();var pe=Oe(fe),Mr=H[0]===_[0];if(pe&&H[0]==="t"&&(qe>K.bottom||v.current.bt)){var be=E;Mr?be-=O-q:be=Q.y-Ye.y-Z;var er=F(W,be),Ar=F(W,be,M);er>ie||er===ie&&(!j||Ar>=Ne)?(v.current.bt=!0,E=be,ge.points=[Se(H,0),Se(_,0)]):v.current.bt=!1}if(pe&&H[0]==="b"&&(ye<K.top||v.current.tb)){var de=E;Mr?de+=O-q:de=Ue.y-gr.y-Z;var br=F(W,de),Y=F(W,de,M);br>ie||br===ie&&(!j||Y>=Ne)?(v.current.tb=!0,E=de,ge.points=[Se(H,0),Se(_,0)]):v.current.tb=!1}var wr=Oe(yr),Sr=H[1]===_[1];if(wr&&H[1]==="l"&&(Me>K.right||v.current.rl)){var Le=W;Sr?Le-=p-V:Le=Q.x-Ye.x-Fe;var Pr=F(Le,E),Fr=F(Le,E,M);Pr>ie||Pr===ie&&(!j||Fr>=Ne)?(v.current.rl=!0,W=Le,ge.points=[Se(H,1),Se(_,1)]):v.current.rl=!1}if(wr&&H[1]==="r"&&(Ce<K.left||v.current.lr)){var We=W;Sr?We+=p-V:We=Ue.x-gr.x-Fe;var Dr=F(We,E),Ir=F(We,E,M);Dr>ie||Dr===ie&&(!j||Ir>=Ne)?(v.current.lr=!0,W=We,ge.points=[Se(H,1),Se(_,1)]):v.current.lr=!1}tr();var xe=Cr===!0?0:Cr;typeof xe=="number"&&(Ce<M.left&&(W-=Ce-M.left,g.x+V<M.left+xe&&(W+=g.x-M.left+V-xe)),Me>M.right&&(W-=Me-M.right,g.x>M.right-xe&&(W+=g.x-M.right+xe)));var ue=Xe===!0?0:Xe;typeof ue=="number"&&(ye<M.top&&(E-=ye-M.top,g.y+q<M.top+ue&&(E+=g.y-M.top+q-ue)),qe>M.bottom&&(E-=qe-M.bottom,g.y>M.bottom-ue&&(E+=g.y-M.bottom+ue)));var ze=P.x+W,we=ze+p,rr=P.y+E,Ur=rr+O,kr=g.x,qr=kr+V,ar=g.y,jr=ar+q,Qr=Math.max(ze,kr),Jr=Math.min(we,qr),Rr=(Qr+Jr)/2,Gr=Rr-ze,Kr=Math.max(rr,ar),Zr=Math.min(Ur,jr),Yr=(Kr+Zr)/2,$r=Yr-rr;l?.(a,ge);var je=Ae.right-P.x-(W+P.width),Qe=Ae.bottom-P.y-(E+P.height);y({ready:!0,offsetX:W/ve,offsetY:E/me,offsetR:je/ve,offsetB:Qe/me,arrowX:Gr/ve,arrowY:$r/me,scaleX:ve,scaleY:me,align:ge})}}),N=function(){d.current+=1;var R=d.current;Promise.resolve().then(function(){d.current===R&&S()})},T=function(){y(function(R){return U(U({},R),{},{ready:!1})})};return I(T,[n]),I(function(){e||T()},[e]),[m.ready,m.offsetX,m.offsetY,m.offsetR,m.offsetB,m.arrowX,m.arrowY,m.scaleX,m.scaleY,m.align,N]}function Ja(e,a,r,n){I(function(){if(e&&a&&r){let y=function(){n()};var o=a,i=r,l=oa(o),s=oa(i),f=sr(i),m=new Set([f].concat(aa(l),aa(s)));return m.forEach(function(d){d.addEventListener("scroll",y,{passive:!0})}),f.addEventListener("resize",y,{passive:!0}),n(),function(){m.forEach(function(d){d.removeEventListener("scroll",y),f.removeEventListener("resize",y)})}}},[e,a,r])}function Ga(e,a,r,n,o,i,l,s){var f=t.useRef(e),m=t.useRef(!1);f.current!==e&&(m.current=!0,f.current=e),t.useEffect(function(){var y=sa(function(){m.current=!1});return function(){sa.cancel(y)}},[e]),t.useEffect(function(){if(a&&n&&(!o||i)){var y=function(){var J=!1,ee=function(g){var B=g.target;J=l(B)},X=function(g){var B=g.target;!m.current&&f.current&&!J&&!l(B)&&s(!1)};return[ee,X]},d=y(),w=b(d,2),v=w[0],C=w[1],S=y(),N=b(S,2),T=N[0],c=N[1],R=sr(n);R.addEventListener("mousedown",v),R.addEventListener("click",C);var L=na(r);return L&&(L.addEventListener("mousedown",T),L.addEventListener("click",c)),function(){R.removeEventListener("mousedown",v),R.removeEventListener("click",C),L&&(L.removeEventListener("mousedown",T),L.removeEventListener("click",c))}}},[a,r,n,o,i])}function Ka(e){var a=e.prefixCls,r=e.align,n=e.arrow,o=e.arrowPos,i=n||{},l=i.className,s=i.content,f=o.x,m=f===void 0?0:f,y=o.y,d=y===void 0?0:y,w=t.useRef();if(!r||!r.points)return null;var v={position:"absolute"};if(r.autoArrow!==!1){var C=r.points[0],S=r.points[1],N=C[0],T=C[1],c=S[0],R=S[1];N===c||!["t","b"].includes(N)?v.top=d:N==="t"?v.top=0:v.bottom=0,T===R||!["l","r"].includes(T)?v.left=m:T==="l"?v.left=0:v.right=0}return t.createElement("div",{ref:w,className:Ze("".concat(a,"-arrow"),l),style:v},s)}function Za(e){var a=e.prefixCls,r=e.open,n=e.zIndex,o=e.mask,i=e.motion;return o?t.createElement(Da,Wr({},i,{motionAppear:!0,visible:r,removeOnLeave:!0}),function(l){var s=l.className;return t.createElement("div",{style:{zIndex:n},className:Ze("".concat(a,"-mask"),s)})}):null}var Ya=t.memo(function(e){var a=e.children;return a},function(e,a){return a.cache}),Xa=t.forwardRef(function(e,a){var r=e.popup,n=e.className,o=e.prefixCls,i=e.style,l=e.target,s=e.onVisibleChanged,f=e.open,m=e.keepDom,y=e.onClick,d=e.mask,w=e.arrow,v=e.arrowPos,C=e.align,S=e.motion,N=e.maskMotion,T=e.forceRender,c=e.getPopupContainer,R=e.autoDestroy,L=e.portal,z=e.zIndex,J=e.onMouseEnter,ee=e.onMouseLeave,X=e.ready,A=e.offsetX,g=e.offsetY,B=e.offsetR,P=e.offsetB,te=e.onAlign,re=e.onPrepare,G=e.stretch,$=e.targetWidth,ae=e.targetHeight,De=typeof r=="function"?r():r,_e=f||m,ne=c?.length>0,le=t.useState(!c||!ne),ke=b(le,2),O=ke[0],p=ke[1];if(I(function(){!O&&ne&&l&&p(!0)},[O,ne,l]),!O)return null;var q="auto",V={left:"-1000vw",top:"-1000vh",right:q,bottom:q};if(X||!f){var He=C.points,Re=C._experimental,oe=Re?.dynamicInset,Ve=oe&&He[0][1]==="r",$e=oe&&He[0][0]==="b";Ve?(V.right=B,V.left=q):(V.left=A,V.right=q),$e?(V.bottom=P,V.top=q):(V.top=g,V.bottom=q)}var j={};return G&&(G.includes("height")&&ae?j.height=ae:G.includes("minHeight")&&ae&&(j.minHeight=ae),G.includes("width")&&$?j.width=$:G.includes("minWidth")&&$&&(j.minWidth=$)),f||(j.pointerEvents="none"),t.createElement(L,{open:T||_e,getContainer:c&&function(){return c(l)},autoDestroy:R},t.createElement(Za,{prefixCls:o,open:f,zIndex:z,mask:d,motion:N}),t.createElement(Pa,{onResize:te,disabled:!f},function(Ee){return t.createElement(Da,Wr({motionAppear:!0,motionEnter:!0,motionLeave:!0,removeOnLeave:!1,forceRender:T,leavedClassName:"".concat(o,"-hidden")},S,{onAppearPrepare:re,onEnterPrepare:re,visible:f,onVisibleChanged:function(se){var K;S==null||(K=S.onVisibleChanged)===null||K===void 0||K.call(S,se),s(se)}}),function(M,se){var K=M.className,Ae=M.style,ve=Ze(o,K,n);return t.createElement("div",{ref:Wa(Ee,a,se),className:ve,style:U(U(U(U({"--arrow-x":"".concat(v.x||0,"px"),"--arrow-y":"".concat(v.y||0,"px")},V),j),Ae),{},{boxSizing:"border-box",zIndex:z},i),onMouseEnter:J,onMouseLeave:ee,onClick:y},w&&t.createElement(Ka,{prefixCls:o,arrow:w,arrowPos:v,align:C}),t.createElement(Ya,{cache:!f},De))})}))}),Oa=t.forwardRef(function(e,a){var r=e.children,n=e.getTriggerDOMNode,o=xr(r),i=t.useCallback(function(s){xa(a,n?n(s):s)},[n]),l=Sa(i,r.ref);return o?t.cloneElement(r,{ref:l}):r}),pa=["prefixCls","children","action","showAction","hideAction","popupVisible","defaultPopupVisible","onPopupVisibleChange","afterPopupVisibleChange","mouseEnterDelay","mouseLeaveDelay","focusDelay","blurDelay","mask","maskClosable","getPopupContainer","forceRender","autoDestroy","destroyPopupOnHide","popup","popupClassName","popupStyle","popupPlacement","builtinPlacements","popupAlign","zIndex","stretch","getPopupClassNameFromAlign","alignPoint","onPopupClick","onPopupAlign","arrow","popupMotion","maskMotion","popupTransitionName","popupAnimation","maskTransitionName","maskAnimation","className","getTriggerDOMNode"];function et(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ra,a=t.forwardRef(function(r,n){var o=r.prefixCls,i=o===void 0?"rc-trigger-popup":o,l=r.children,s=r.action,f=s===void 0?"hover":s,m=r.showAction,y=r.hideAction,d=r.popupVisible,w=r.defaultPopupVisible,v=r.onPopupVisibleChange,C=r.afterPopupVisibleChange,S=r.mouseEnterDelay,N=r.mouseLeaveDelay,T=N===void 0?.1:N,c=r.focusDelay,R=r.blurDelay,L=r.mask,z=r.maskClosable,J=z===void 0?!0:z,ee=r.getPopupContainer,X=r.forceRender,A=r.autoDestroy,g=r.destroyPopupOnHide,B=r.popup,P=r.popupClassName,te=r.popupStyle,re=r.popupPlacement,G=r.builtinPlacements,$=G===void 0?{}:G,ae=r.popupAlign,De=r.zIndex,_e=r.stretch,ne=r.getPopupClassNameFromAlign,le=r.alignPoint,ke=r.onPopupClick,O=r.onPopupAlign,p=r.arrow,q=r.popupMotion,V=r.maskMotion,He=r.popupTransitionName,Re=r.popupAnimation,oe=r.maskTransitionName,Ve=r.maskAnimation,$e=r.className,j=r.getTriggerDOMNode,Ee=Ea(r,pa),M=A||g||!1,se=t.useState(!1),K=b(se,2),Ae=K[0],ve=K[1];I(function(){ve(za())},[]);var me=t.useRef({}),ce=t.useContext(ma),zr=t.useMemo(function(){return{registerSubPopup:function(h,D){me.current[h]=D,ce?.registerSubPopup(h,D)}}},[ce]),Br=Ba(),vr=t.useState(null),Fe=b(vr,2),Z=Fe[0],_r=Fe[1],cr=Pe(function(u){ta(u)&&Z!==u&&_r(u),ce?.registerSubPopup(Br,u)}),Hr=t.useState(null),fr=b(Hr,2),he=fr[0],dr=fr[1],Vr=Pe(function(u){ta(u)&&he!==u&&dr(u)}),Ie=t.Children.only(l),_=Ie?.props||{},H={},mr=Pe(function(u){var h,D,x=he;return x?.contains(u)||((h=na(x))===null||h===void 0?void 0:h.host)===u||u===x||Z?.contains(u)||((D=na(Z))===null||D===void 0?void 0:D.host)===u||u===Z||Object.values(me.current).some(function(k){return k?.contains(u)||u===k})}),hr=ga(i,q,Re,He),ge=ga(i,V,Ve,oe),W=t.useState(w||!1),E=b(W,2),ie=E[0],Ne=E[1],Q=d??ie,gr=Pe(function(u){d===void 0&&Ne(u)});I(function(){Ne(d||!1)},[d]);var Ue=t.useRef(Q);Ue.current=Q;var Ye=Pe(function(u){Q!==u&&(gr(u),v?.(u))}),Te=t.useRef(),yr=function(){clearTimeout(Te.current)},fe=function(h){var D=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;yr(),D===0?Ye(h):Te.current=setTimeout(function(){Ye(h)},D*1e3)};t.useEffect(function(){return yr},[]);var Cr=t.useState(!1),Xe=b(Cr,2),Oe=Xe[0],ye=Xe[1];I(function(u){(!u||Q)&&ye(!0)},[Q]);var qe=t.useState(null),Ce=b(qe,2),Me=Ce[0],pe=Ce[1],Mr=t.useState([0,0]),be=b(Mr,2),er=be[0],Ar=be[1],de=function(h){Ar([h.clientX,h.clientY])},br=Qa(Q,Z,le?er:he,re,$,ae,O),Y=b(br,11),wr=Y[0],Sr=Y[1],Le=Y[2],Pr=Y[3],Fr=Y[4],We=Y[5],Dr=Y[6],Ir=Y[7],xe=Y[8],ue=Y[9],ze=Y[10],we=Pe(function(){Oe||ze()});Ja(Q,he,Z,we),I(function(){we()},[er,re]),I(function(){Q&&!($!=null&&$[re])&&we()},[JSON.stringify(ae)]);var rr=t.useMemo(function(){var u=ja($,i,ue,le);return Ze(u,ne?.(ue))},[ue,ne,$,i,le]);t.useImperativeHandle(n,function(){return{forceAlign:we}});var Ur=function(h){ye(!1),ze(),C?.(h)},kr=function(){return new Promise(function(h){pe(function(){return h})})};I(function(){Me&&(ze(),Me(),pe(null))},[Me]);var qr=t.useState(0),ar=b(qr,2),jr=ar[0],Qr=ar[1],Jr=t.useState(0),Rr=b(Jr,2),Gr=Rr[0],Kr=Rr[1],Zr=function(h,D){if(we(),_e){var x=D.getBoundingClientRect();Qr(x.width),Kr(x.height)}},Yr=Ua(Ae,f,m,y),$r=b(Yr,2),je=$r[0],Qe=$r[1],F=function(h,D,x,k){H[h]=function(ia){var Nr;k?.(ia),fe(D,x);for(var ra=arguments.length,ua=new Array(ra>1?ra-1:0),Tr=1;Tr<ra;Tr++)ua[Tr-1]=arguments[Tr];(Nr=_[h])===null||Nr===void 0||Nr.call.apply(Nr,[_,ia].concat(ua))}},tr=je.has("click"),Je=Qe.has("click")||Qe.has("contextMenu");(tr||Je)&&(H.onClick=function(u){var h;Ue.current&&Je?fe(!1):!Ue.current&&tr&&(de(u),fe(!0));for(var D=arguments.length,x=new Array(D>1?D-1:0),k=1;k<D;k++)x[k-1]=arguments[k];(h=_.onClick)===null||h===void 0||h.call.apply(h,[_,u].concat(x))}),Ga(Q,Je,he,Z,L,J,mr,fe);var Be=je.has("hover"),Ge=Qe.has("hover"),nr,or;Be&&(F("onMouseEnter",!0,S,function(u){de(u)}),nr=function(){fe(!0,S)},le&&(H.onMouseMove=function(u){var h;(h=_.onMouseMove)===null||h===void 0||h.call(_,u)})),Ge&&(F("onMouseLeave",!1,T),or=function(){fe(!1,T)}),je.has("focus")&&F("onFocus",!0,c),Qe.has("focus")&&F("onBlur",!1,R),je.has("contextMenu")&&(H.onContextMenu=function(u){var h;de(u),fe(!0),u.preventDefault();for(var D=arguments.length,x=new Array(D>1?D-1:0),k=1;k<D;k++)x[k-1]=arguments[k];(h=_.onContextMenu)===null||h===void 0||h.call.apply(h,[_,u].concat(x))}),$e&&(H.className=Ze(_.className,$e));var ir=U(U({},_),H),Er={},Xr=["onContextMenu","onClick","onMouseDown","onTouchStart","onMouseEnter","onMouseLeave","onFocus","onBlur"];Xr.forEach(function(u){Ee[u]&&(Er[u]=function(){for(var h,D=arguments.length,x=new Array(D),k=0;k<D;k++)x[k]=arguments[k];(h=ir[u])===null||h===void 0||h.call.apply(h,[ir].concat(x)),Ee[u].apply(Ee,x)})});var Or=t.cloneElement(Ie,U(U({},ir),Er)),pr={x:We,y:Dr},ea=p?U({},p!==!0?p:{}):null;return t.createElement(t.Fragment,null,t.createElement(Pa,{disabled:!Q,ref:Vr,onResize:Zr},t.createElement(Oa,{getTriggerDOMNode:j},Or)),t.createElement(ma.Provider,{value:zr},t.createElement(Xa,{portal:e,ref:cr,prefixCls:i,popup:B,className:Ze(P,rr),style:te,target:he,onMouseEnter:nr,onMouseLeave:or,zIndex:De,open:Q,keepDom:Oe,onClick:ke,mask:L,motion:hr,maskMotion:ge,onVisibleChanged:Ur,onPrepare:kr,forceRender:X,autoDestroy:M,getPopupContainer:ee,align:ue,arrow:ea,arrowPos:pr,ready:wr,offsetX:Sr,offsetY:Le,offsetR:Pr,offsetB:Fr,onAlign:we,stretch:_e,targetWidth:jr/Ir,targetHeight:Gr/xe})))});return a}const vt=et(Ra);function ct(e){var a=t.createContext(void 0),r=function(o){var i=o.value,l=o.children,s=t.useRef(i);s.current=i;var f=t.useState(function(){return{getValue:function(){return s.current},listeners:new Set}}),m=b(f,1),y=m[0];return I(function(){wa.unstable_batchedUpdates(function(){y.listeners.forEach(function(d){d(i)})})},[i]),t.createElement(a.Provider,{value:y},l)};return{Context:a,Provider:r,defaultValue:e}}function ft(e,a){var r=Pe(typeof a=="function"?a:function(d){if(a===void 0)return d;if(!Array.isArray(a))return d[a];var w={};return a.forEach(function(v){w[v]=d[v]}),w}),n=t.useContext(e?.Context),o=n||{},i=o.listeners,l=o.getValue,s=t.useRef();s.current=r(n?l():e?.defaultValue);var f=t.useState({}),m=b(f,2),y=m[1];return I(function(){if(!n)return;function d(w){var v=r(w);_a(s.current,v,!0)||y({})}return i.add(d),function(){i.delete(d)}},[n]),s.current}var $a=t.createContext(0);function rt(){return t.useContext($a)}function dt(e,a){var r=xr(e),n=function(i,l){var s=r?{ref:l}:{},f=t.useRef(0),m=t.useRef(i);return(!a||a(m.current,i))&&(f.current+=1),m.current=i,t.createElement($a.Provider,{value:f.current},t.createElement(e,Wr({},i,s)))};return r?t.forwardRef(n):n}function mt(e,a){var r=xr(e),n=function(i,l){var s=r?{ref:l}:{};return rt(),t.createElement(e,Wr({},i,s))};return r?t.memo(t.forwardRef(n),a):t.memo(n,a)}export{Ra as P,vt as T,ft as a,ct as c,dt as m,mt as r,rt as u};