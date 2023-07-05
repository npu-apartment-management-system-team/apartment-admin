import{e as x,a as C,c as H}from"./@babel-5495bcd4.js";import{r as n,R as c}from"./react-2ce75adb.js";import{P as se}from"./@rc-component-e9870b4d.js";import{c as O}from"./classnames-776d2d10.js";import{n as ce,B as fe,C as F,K as G}from"./rc-util-717c2e4e.js";import{C as p}from"./rc-motion-d640d26c.js";function J(e,a,t){var o=a;return!o&&t&&(o="".concat(e,"-").concat(t)),o}function Q(e,a){var t=e["page".concat(a?"Y":"X","Offset")],o="scroll".concat(a?"Top":"Left");if(typeof t!="number"){var r=e.document;t=r.documentElement[o],typeof t!="number"&&(t=r.body[o])}return t}function ue(e){var a=e.getBoundingClientRect(),t={left:a.left,top:a.top},o=e.ownerDocument,r=o.defaultView||o.parentWindow;return t.left+=Q(r),t.top+=Q(r,!0),t}const me=n.memo(function(e){var a=e.children;return a},function(e,a){var t=a.shouldUpdate;return!t});var Z={width:0,height:0,overflow:"hidden",outline:"none"},de=c.forwardRef(function(e,a){var t=e.prefixCls,o=e.className,r=e.style,i=e.title,s=e.ariaId,f=e.footer,d=e.closable,v=e.closeIcon,y=e.onClose,b=e.children,g=e.bodyStyle,N=e.bodyProps,h=e.modalRender,R=e.onMouseDown,I=e.onMouseUp,A=e.holderRef,k=e.visible,P=e.forceRender,u=e.width,S=e.height,E=n.useRef(),w=n.useRef();c.useImperativeHandle(a,function(){return{focus:function(){var m;(m=E.current)===null||m===void 0||m.focus()},changeActive:function(m){var M=document,W=M.activeElement;m&&W===w.current?E.current.focus():!m&&W===E.current&&w.current.focus()}}});var D={};u!==void 0&&(D.width=u),S!==void 0&&(D.height=S);var T;f&&(T=c.createElement("div",{className:"".concat(t,"-footer")},f));var $;i&&($=c.createElement("div",{className:"".concat(t,"-header")},c.createElement("div",{className:"".concat(t,"-title"),id:s},i)));var U;d&&(U=c.createElement("button",{type:"button",onClick:y,"aria-label":"Close",className:"".concat(t,"-close")},v||c.createElement("span",{className:"".concat(t,"-close-x")})));var V=c.createElement("div",{className:"".concat(t,"-content")},U,$,c.createElement("div",x({className:"".concat(t,"-body"),style:g},N),b),T);return c.createElement("div",{key:"dialog-element",role:"dialog","aria-labelledby":i?s:null,"aria-modal":"true",ref:A,style:C(C({},r),D),className:O(t,o),onMouseDown:R,onMouseUp:I},c.createElement("div",{tabIndex:0,ref:E,style:Z,"aria-hidden":"true"}),c.createElement(me,{shouldUpdate:k||P},h?h(V):V),c.createElement("div",{tabIndex:0,ref:w,style:Z,"aria-hidden":"true"}))}),ee=n.forwardRef(function(e,a){var t=e.prefixCls,o=e.title,r=e.style,i=e.className,s=e.visible,f=e.forceRender,d=e.destroyOnClose,v=e.motionName,y=e.ariaId,b=e.onVisibleChanged,g=e.mousePosition,N=n.useRef(),h=n.useState(),R=H(h,2),I=R[0],A=R[1],k={};I&&(k.transformOrigin=I);function P(){var u=ue(N.current);A(g?"".concat(g.x-u.left,"px ").concat(g.y-u.top,"px"):"")}return n.createElement(p,{visible:s,onVisibleChanged:b,onAppearPrepare:P,onEnterPrepare:P,forceRender:f,motionName:v,removeOnLeave:d,ref:N},function(u,S){var E=u.className,w=u.style;return n.createElement(de,x({},e,{ref:a,title:o,ariaId:y,prefixCls:t,holderRef:S,style:C(C(C({},w),r),k),className:O(i,E)}))})});ee.displayName="Content";function ve(e){var a=e.prefixCls,t=e.style,o=e.visible,r=e.maskProps,i=e.motionName;return n.createElement(p,{key:"mask",visible:o,motionName:i,leavedClassName:"".concat(a,"-mask-hidden")},function(s,f){var d=s.className,v=s.style;return n.createElement("div",x({ref:f,style:C(C({},v),t),className:O("".concat(a,"-mask"),d)},r))})}function Ce(e){var a=e.prefixCls,t=a===void 0?"rc-dialog":a,o=e.zIndex,r=e.visible,i=r===void 0?!1:r,s=e.keyboard,f=s===void 0?!0:s,d=e.focusTriggerAfterClose,v=d===void 0?!0:d,y=e.wrapStyle,b=e.wrapClassName,g=e.wrapProps,N=e.onClose,h=e.afterOpenChange,R=e.afterClose,I=e.transitionName,A=e.animation,k=e.closable,P=k===void 0?!0:k,u=e.mask,S=u===void 0?!0:u,E=e.maskTransitionName,w=e.maskAnimation,D=e.maskClosable,T=D===void 0?!0:D,$=e.maskStyle,U=e.maskProps,V=e.rootClassName,_=n.useRef(),m=n.useRef(),M=n.useRef(),W=n.useState(i),X=H(W,2),z=X[0],Y=X[1],te=ce();function ae(){F(m.current,document.activeElement)||(_.current=document.activeElement)}function ne(){if(!F(m.current,document.activeElement)){var l;(l=M.current)===null||l===void 0||l.focus()}}function oe(l){if(l)ne();else{if(Y(!1),S&&_.current&&v){try{_.current.focus({preventScroll:!0})}catch{}_.current=null}z&&R?.()}h?.(l)}function L(l){N?.(l)}var K=n.useRef(!1),B=n.useRef(),re=function(){clearTimeout(B.current),K.current=!0},ie=function(){B.current=setTimeout(function(){K.current=!1})},q=null;T&&(q=function(j){K.current?K.current=!1:m.current===j.target&&L(j)});function le(l){if(f&&l.keyCode===G.ESC){l.stopPropagation(),L(l);return}i&&l.keyCode===G.TAB&&M.current.changeActive(!l.shiftKey)}return n.useEffect(function(){i&&(Y(!0),ae())},[i]),n.useEffect(function(){return function(){clearTimeout(B.current)}},[]),n.createElement("div",x({className:O("".concat(t,"-root"),V)},fe(e,{data:!0})),n.createElement(ve,{prefixCls:t,visible:S&&i,motionName:J(t,E,w),style:C({zIndex:o},$),maskProps:U}),n.createElement("div",x({tabIndex:-1,onKeyDown:le,className:O("".concat(t,"-wrap"),b),ref:m,onClick:q,style:C(C({zIndex:o},y),{},{display:z?null:"none"})},g),n.createElement(ee,x({},e,{onMouseDown:re,onMouseUp:ie,ref:M,closable:P,ariaId:te,prefixCls:t,visible:i&&z,onClose:L,onVisibleChanged:oe,motionName:J(t,I,A)}))))}var ye=function(a){var t=a.visible,o=a.getContainer,r=a.forceRender,i=a.destroyOnClose,s=i===void 0?!1:i,f=a.afterClose,d=n.useState(t),v=H(d,2),y=v[0],b=v[1];return n.useEffect(function(){t&&b(!0)},[t]),!r&&s&&!y?null:n.createElement(se,{open:t||r||y,autoDestroy:!1,getContainer:o,autoLock:t||y},n.createElement(Ce,x({},a,{destroyOnClose:s,afterClose:function(){f?.(),b(!1)}})))};ye.displayName="Dialog";export{ye as D,de as P};
