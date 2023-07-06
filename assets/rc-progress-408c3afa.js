import{r as o}from"./react-405f76d8.js";import{c as Y}from"./classnames-423472b7.js";import{c as G,a as U,b as ee,_ as x,e as te}from"./@babel-5495bcd4.js";import{c as re}from"./rc-util-850552fb.js";var ae={percent:0,prefixCls:"rc-progress",strokeColor:"#2db7f5",strokeLinecap:"round",strokeWidth:1,trailColor:"#D9D9D9",trailWidth:1,gapPosition:"bottom"},se=function(){var a=o.useRef([]),e=o.useRef(null);return o.useEffect(function(){var c=Date.now(),s=!1;a.current.forEach(function(i){if(i){s=!0;var r=i.style;r.transitionDuration=".3s, .3s, .3s, .06s",e.current&&c-e.current<100&&(r.transitionDuration="0s, 0s")}}),s&&(e.current=Date.now())}),a.current},F=0,oe=re();function ne(){var t;return oe?(t=F,F+=1):t="TEST_OR_SSR",t}const ce=function(t){var a=o.useState(),e=G(a,2),c=e[0],s=e[1];return o.useEffect(function(){s("rc_progress_".concat(ne()))},[]),t||c};var ie=["id","prefixCls","steps","strokeWidth","trailWidth","gapDegree","gapPosition","trailColor","strokeLinecap","style","className","strokeColor","percent"];function M(t){return+t.replace("%","")}function V(t){var a=t??[];return Array.isArray(a)?a:[a]}var _=100,R=function(a,e,c,s,i,r,I,v,l,k){var m=arguments.length>10&&arguments[10]!==void 0?arguments[10]:0,f=c/100*360*((360-r)/360),W=r===0?0:{bottom:0,top:180,left:90,right:-90}[I],p=(100-s)/100*e;return l==="round"&&s!==100&&(p+=k/2,p>=e&&(p=e-.01)),{stroke:typeof v=="string"?v:void 0,strokeDasharray:"".concat(e,"px ").concat(a),strokeDashoffset:p+m,transform:"rotate(".concat(i+f+W,"deg)"),transformOrigin:"0 0",transition:"stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s",fillOpacity:0}},ve=function(a){var e=U(U({},ae),a),c=e.id,s=e.prefixCls,i=e.steps,r=e.strokeWidth,I=e.trailWidth,v=e.gapDegree,l=v===void 0?0:v,k=e.gapPosition,m=e.trailColor,f=e.strokeLinecap,W=e.style,p=e.className,X=e.strokeColor,Z=e.percent,q=ee(e,ie),z=ce(c),N="".concat(z,"-gradient"),E=_/2-r/2,P=Math.PI*2*E,j=l>0?90+l/2:-90,g=P*((360-l)/360),T=x(i)==="object"?i:{count:i,space:2},y=T.count,A=T.space,H=R(P,g,0,100,j,l,k,m,f,r),O=V(Z),h=V(X),w=h.find(function(n){return n&&x(n)==="object"}),$=se(),J=function(){var u=0;return O.map(function(S,d){var b=h[d]||h[h.length-1],C=b&&x(b)==="object"?"url(#".concat(N,")"):void 0,D=R(P,g,u,S,j,l,k,b,f,r);return u+=S,o.createElement("circle",{key:d,className:"".concat(s,"-circle-path"),r:E,cx:0,cy:0,stroke:C,strokeLinecap:f,strokeWidth:r,opacity:S===0?0:1,style:D,ref:function(L){$[d]=L}})}).reverse()},K=function(){var u=Math.round(y*(O[0]/100)),S=100/y,d=0;return new Array(y).fill(null).map(function(b,C){var D=C<=u-1?h[0]:m,B=D&&x(D)==="object"?"url(#".concat(N,")"):void 0,L=R(P,g,d,S,j,l,k,D,"butt",r,A);return d+=(g-L.strokeDashoffset+A)*100/g,o.createElement("circle",{key:C,className:"".concat(s,"-circle-path"),r:E,cx:0,cy:0,stroke:B,strokeWidth:r,opacity:1,style:L,ref:function(Q){$[C]=Q}})})};return o.createElement("svg",te({className:Y("".concat(s,"-circle"),p),viewBox:"".concat(-_/2," ").concat(-_/2," ").concat(_," ").concat(_),style:W,id:c,role:"presentation"},q),w&&o.createElement("defs",null,o.createElement("linearGradient",{id:N,x1:"100%",y1:"0%",x2:"0%",y2:"0%"},Object.keys(w).sort(function(n,u){return M(n)-M(u)}).map(function(n,u){return o.createElement("stop",{key:u,offset:n,stopColor:w[n]})}))),!y&&o.createElement("circle",{className:"".concat(s,"-circle-trail"),r:E,cx:0,cy:0,stroke:m,strokeLinecap:f,strokeWidth:I||r,style:H}),y?K():J())};export{ve as C};