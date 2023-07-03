import{r as a,j as e}from"./react-da577ac1.js";import{c as we}from"./react-dom-173b00bd.js";import{B as ye}from"./react-router-dom-9dcf34cd.js";import{a as J}from"./axios-4a70c6fc.js";import{q as Se}from"./qs-5aab86d2.js";import{J as be}from"./js-encrypt-af0330d8.js";import{I as L,T as se,B as E,M as ve,S as V,a as Ie,P as Ce,L as ee,b as Ae,H as ke,C as Ue,D as te,c as Re,R as T}from"./antd-5f34be1b.js";import{U as oe,r as Oe,s as X,i as Y,t as S}from"./@ant-design-7e270a14.js";import{u as re,a as ae,b as R,N as ie}from"./react-router-7fddc06d.js";import{v as H}from"./uuid-a960c1f4.js";import{s as Q}from"./store-9856e98f.js";import"./call-bind-fbf630b1.js";import"./get-intrinsic-bd2830fd.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-22e7ee79.js";import"./has-26d28e02.js";import"./scheduler-765c72db.js";import"./@remix-run-93d98c9a.js";import"./side-channel-3868fe1a.js";import"./object-inspect-8dcf31bb.js";import"./rc-util-dd884fa4.js";import"./@babel-5495bcd4.js";import"./react-is-e8e5dbb3.js";import"./classnames-37d210d3.js";import"./rc-resize-observer-00964e6d.js";import"./resize-observer-polyfill-0f9f8adb.js";import"./rc-motion-e1d2c9c6.js";import"./rc-menu-0c57ade6.js";import"./rc-overflow-edc1a9be.js";import"./@rc-component-d75880e0.js";import"./rc-select-225ebde9.js";import"./rc-virtual-list-4a714ac0.js";import"./rc-drawer-0fad46b9.js";import"./rc-field-form-2719b92f.js";import"./async-validator-7f96df71.js";import"./rc-table-a4c48146.js";import"./rc-pagination-32f0fc3e.js";import"./rc-picker-f4d9033d.js";import"./@ctrl-fb5a5473.js";import"./throttle-debounce-87e7e444.js";import"./rc-checkbox-cb815a21.js";import"./rc-dropdown-cf0343d9.js";import"./rc-tooltip-60a1eb88.js";import"./rc-tree-ce0960a2.js";import"./rc-input-7ee9d1c8.js";import"./rc-textarea-136dd7ac.js";import"./@emotion-c0b5c018.js";import"./stylis-fad5b415.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))m(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&m(f)}).observe(document,{childList:!0,subtree:!0});function p(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function m(n){if(n.ep)return;n.ep=!0;const s=p(n);fetch(n.href,s)}})();const O=J.create({baseURL:"https://apartment-server.wangminan.me",paramsSerializer:t=>Se.stringify(t,{arrayFormat:"brackets"})});O.interceptors.request.use(t=>(window.localStorage.getItem("token")!==void 0&&(t.headers.Authorization="Bearer "+window.localStorage.getItem("token")),t),t=>Promise.reject(t));O.interceptors.response.use(t=>(t!==null&&t.data!==null&&t.data.code!==null&&(t.data.code===4012||t.data.code===4010||t.data.code===4030)&&(window.localStorage.removeItem("token"),setTimeout(()=>{window.location.href="/login"},3e3)),t),t=>Promise.reject(t));const Le=`MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5vwYRBKySNSl/60qRqcD
lDVcNP9j2UyB7yalGI9MtlBEZ16pEiR08TuZjUL00go5LEb6z+ghVlp6UOsWR6i3
r7Q+FleKHG2yStqqaWx+11OQzOjffXQwqb1t/0bq/tzy04KBinSaB/yqnMc0yO8n
rZx8OtUX5rMcM7BjvpFOdnCSFUAOOfKRirfT5RydyGeLPOnBTwJIwpygGu20++UX
MxARO1aAJeUXeI+9g+XcsAi1EKbI2YdjWJ8PQnBC9+lsDRS3w8uKqUOZdYu/FxAy
bEjQ+YOXzfu2PB9+BdilkztV/yuF6hfk7MpGdA2JoBsJlljSYWH1mUE+e9mnUyHi
/wIDAQAB`;function Ee(t){const l=new be;return l.setPublicKey(Le),l.encrypt(t)}function Pe(t){const l="13777864453",p="root",[m,n]=a.useState(l),[s,f]=a.useState(p),[y,v]=a.useState(!1);function j(g){n(()=>g.target.value)}function C(g){f(()=>g.target.value)}function A(){v(!0),O({method:"POST",url:"/api/auth/login/password",data:{username:m,password:Ee(s)}}).then(g=>{const{code:d,result:x}=g.data;if(d===2e3)if(window.localStorage.setItem("token",x.token),window.localStorage.setItem("role",x.role),x.user)x.user,t.login(x.role,x.user);else{const I=x.admin;window.localStorage.setItem("user.id",I.id),window.localStorage.setItem("user.name",I.name),window.localStorage.setItem("user.loginAccountId",I.loginAccountId),window.localStorage.setItem("user.email",I.email),t.login(x.role,x.admin)}else{const{msg:I}=g.data;f(""),alert(I)}v(!1)})}return e.jsxs("div",{children:[e.jsx(L,{value:m,onChange:j,placeholder:"Enter your username",prefix:e.jsx(oe,{className:"site-form-item-icon"}),suffix:e.jsx(se,{title:"Extra information",children:e.jsx(Oe,{style:{color:"rgba(0,0,0,.45)"}})})}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(L.Password,{value:s,onChange:C,placeholder:"input password",iconRender:g=>g?e.jsx(X,{}):e.jsx(Y,{})}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(E,{size:"large",type:"primary",loading:y,onClick:A,children:"Login"})]})}function Be(){const[t,l]=a.useState(""),[p,m]=a.useState(""),[n,s]=a.useState(""),[f,y]=a.useState("");function v(d){l(()=>d.target.value)}function j(d,x){y(x!==""&&d!==x?()=>"error":()=>"")}function C(d){m(()=>d.target.value),j(d.target.value,n)}function A(d){s(()=>d.target.value),j(p,d.target.value)}function g(d){p!==n&&alert("")}return e.jsxs("div",{children:[e.jsx(L,{onChange:v,placeholder:"default size",prefix:e.jsx(oe,{})}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(L.Password,{onChange:C,placeholder:"input password",iconRender:d=>d?e.jsx(X,{}):e.jsx(Y,{})}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(L.Password,{status:f,onChange:A,placeholder:"password again",iconRender:d=>d?e.jsx(X,{}):e.jsx(Y,{})}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(E,{size:"large",type:"primary",onClick:g,children:"SignUP"})]})}const Te=""+new URL("apartment-d819f74c.svg",import.meta.url).href;function Ne(t){const{routers:l}=t,p=re();function m(n){p("/home"+l[parseInt(n.key,10)-1].route,{replace:!0})}return e.jsx("div",{children:e.jsx("div",{children:e.jsx(ve,{mode:t.mode,theme:t.theme,items:t.textitem,onClick:m})})})}function De(t){return e.jsx(se,{placement:"right",title:"先生/女士",children:e.jsxs("span",{children:["欢迎您，",t.job," ",t.usermsg]})})}function ne(t){const{getApart:l,getRoom:p}=t;let{tabletype:m,columns:n,tabledata:s,tablepage:f,tabletitle:y}=t;a.useEffect(()=>{console.log(f),m==="apart"?l(1,10):m==="room"&&p(1,5)},[m]);function v(j){console.log(j)}return e.jsx("div",{children:e.jsxs(V,{direction:"vertical",size:16,children:[e.jsx("h2",{children:y}),e.jsx(Ie,{columns:n,dataSource:s,pagination:!1}),e.jsx(Ce,{showQuickJumper:!0,defaultCurrent:1,total:f,onChange:v})]})})}const qe={textAlign:"center",minHeight:120,lineHeight:"120px",color:"#000",backgroundColor:"#eee"},ze={textAlign:"center",lineHeight:"120px"};function Fe(t){const{logOut:l}=t,{getApart:p,getRoom:m}=t,{lognum:n,textitem:s,usermsg:f,columns:y,tabledata:v,tablepage:j,tabletitle:C}=t,A=s[n].routers,[g,d]=a.useState(!1);function x(){l()}return e.jsx(V,{direction:"vertical",style:{width:"100%"},size:[0,48],children:e.jsxs(ee,{style:{minHeight:"100vh"},children:[e.jsx(Ae,{style:ze,collapsible:!0,collapsed:g,onCollapse:I=>d(I),children:e.jsx(Ne,{mode:"inline",theme:"dark",textitem:s[n].item,routers:A})}),e.jsxs(ee,{children:[e.jsx(ke,{children:e.jsx(E,{onClick:x,children:"LogOut"})}),e.jsx(Ue,{style:qe,children:e.jsxs(ae,{children:[e.jsx(R,{path:"/home/welcome",element:e.jsx(De,{job:s[n].name,usermsg:f})}),e.jsx(R,{path:"/home/apart",element:e.jsx(ne,{getApart:p,tabletype:"apart",columns:y,tabledata:v,tablepage:j,tabletitle:C})}),e.jsx(R,{path:"/home/room",element:e.jsx(ne,{getRoom:m,tabletype:"room",columns:y,tabledata:v,tablepage:j,tabletitle:C})}),e.jsx(R,{path:"*",element:e.jsx(ie,{to:"/home/welcome"})})]})})]})]})})}function Me(t){const{title:l,placement:p,onClose:m,open:n,tableitems:s,records:f,apartUpdate:y}=t,[v,j]=a.useState(!1),[C,A]=a.useState(0),[g,d]=a.useState({status:0});function x(){j(!0),y(f.key-1,g),j(!1)}function I(N){d(()=>(g.status=N.target.value,g)),A(N.target.value)}return s.length===0?e.jsx(te,{title:l,placement:p,onClose:m,open:n,children:e.jsx(Re,{})}):e.jsxs(te,{title:l,placement:p,onClose:m,open:n,children:[s,"此公寓",e.jsxs(T.Group,{onChange:I,value:C,children:[e.jsx(T,{value:0,children:"正常使用"}),e.jsx(T,{value:1,children:"启用中"}),e.jsx(T,{value:2,children:"弃用中"}),e.jsx(T,{value:3,children:"已弃用"})]}),e.jsx("br",{}),e.jsx("div",{style:{textAlign:"center"},children:e.jsx(E,{type:"primary",loading:v,onClick:x,children:"修改"})})]})}function b(t,l,p,m,n){return{key:l,icon:p,children:m,label:t,type:n}}const Ke=[{},{id:1,name:"超级管理员",item:[b("管理员账号管理","1",e.jsx(S,{})),b("外部单位管理","2",e.jsx(S,{})),b("公寓管理","3",e.jsx(S,{})),b("房间管理","4",e.jsx(S,{}))]},{id:2,name:"入住办理员",item:[b("入住申请审核","1",e.jsx(S,{})),b("床位编号录入","2",e.jsx(S,{})),b("人脸录入确认","3",e.jsx(S,{}))]},{id:3,name:"宿舍调配员",item:[b("住/调宿申请","1",e.jsx(S,{})),b("公寓管理","2",e.jsx(S,{})),b("房间管理","3",e.jsx(S,{})),b("床位管理","4",e.jsx(S,{}))],routers:[{route:"/promise"},{route:"/apart"},{route:"/room"},{route:"/bed"}]},{id:4,name:"财务人员",item:[b("缴费统计表","1",e.jsx(S,{})),b("催收信","2",e.jsx(S,{})),b("宿舍情况查询","3",e.jsx(S,{}))]}];function He(){const[t,l]=a.useState(!1),[p,m]=a.useState(0),[n,s]=a.useState(null),[f,y]=a.useState([]),[v,j]=a.useState([]),[C,A]=a.useState(0),[g,d]=a.useState(""),[x,I]=a.useState(!1),[N,le]=a.useState(""),[ce,W]=a.useState({}),[Ge,z]=a.useState([]),[ue,de]=a.useState([]),[D,F]=a.useState({}),[_,q]=a.useState([]);re(),a.useEffect(()=>{if(window.localStorage.getItem("token")!==null){let c={};c.name=window.localStorage.getItem("user.name"),c.id=window.localStorage.getItem("user.id"),c.loginAccountId=window.localStorage.getItem("user.loginAccountId"),c.email=window.localStorage.getItem("user.email");let u=window.localStorage.getItem("role");Z(u,c)}J.defaults.baseURL="https://apartment-server.wangminan.me",J.get("/api/auth/hello")},[]);const M=[{title:"Name",dataIndex:"name",key:"name"},{title:"Position",dataIndex:"position",key:"position"},{title:"Location",dataIndex:"location",key:"location"},{title:"Action",key:"action",render:(c,u,o)=>e.jsxs(V,{size:"middle",children:[e.jsx(E,{type:"primary",onClick:()=>pe(o,u),children:"修改此条目"}),e.jsxs(E,{type:"primary",onClick:()=>xe(o),children:["删除",u.name]})]})}];function $(c){z(()=>{let u=[];for(let o=0;o<c.length-1;o++)u.push(c[o].dataIndex);return u}),z(u=>u)}function me(c){F(()=>(D[c.target.id]=c.target.value,D))}function pe(c,u){W(u),I(!0),le(()=>"修改第"+(c+1)+"条"),z(o=>(W(w=>(de(()=>{let k=[];for(let r=0;r<o.length;r++)k.push(e.jsxs("div",{children:[e.jsx("p",{children:o[r]}),e.jsx(L,{id:o[r],onChange:me,defaultValue:w[o[r]]})]},H())),F(U=>(U[o[r]]=w[o[r]],U));return k}),w)),o))}function ge(c,u){let o=[];if(F(w=>(o=w.location.split(","),w)),o.length!=2){alert("Location格式不正确！");return}O({method:"PUT",url:`/api/management/apartment/${_[c]}`,data:{foremanAdminId:p,name:D.name,position:D.position,positionLongitude:o[1],positionLatitude:o[0],status:u.status}}).then(w=>{const{code:k}=w.data;if(k===2e3)K(1,10),alert("修改已完成");else{const{msg:r}=w.data;alert(r)}})}function xe(c){O({method:"DELETE",url:`/api/management/apartment/${_[c]}`}).then(u=>{const{code:o}=u.data;if(o===2e3)K(1,10);else{const{msg:w}=u.data;alert(w)}})}function K(c,u){O({method:"GET",url:`/api/management/apartment?pageNum=${c}&pageSize=${u}`}).then(o=>{const{code:w,msg:k}=o.data,{list:r,total:U}=o.data.result;if(w===2e3){d("公寓列表"),A(U/u+1),y(M),$(M),q(i=>(i=[],i));let P=[];for(let i=0;i<r.length;i++){q(B=>(B.push(r[i].id),B));let h={};h.key=H(),h.name=r[i].name,h.position=r[i].position,h.location=r[i].location,P.push(h)}j(P)}else alert(k)})}const fe=[{title:"Name",dataIndex:"name",key:"name"},{title:"Sex",dataIndex:"sex",key:"sex"},{title:"用途",dataIndex:"usage",key:"usage"},{title:"房间规格",dataIndex:"type",key:"type"},{title:"干部房",dataIndex:"isForCadre",key:"isForCadre"},{title:"保留间",dataIndex:"isReserved",key:"isReserved"}];function he(c,u){O.get("/api/management/room",{params:{pageNum:c,pageSize:u,apartmentId:1,query:"",isForCadre:"",type:""}}).then(o=>{const{code:w,msg:k}=o.data,{list:r,total:U}=o.data.result;if(console.log(U),w===2e3){d("房间列表"),A(U/u+1),y(fe),$(M),q(i=>(i=[],i));let P=[];for(let i=0;i<r.length;i++){q(B=>(B.push(r[i].id),B));let h={};h.key=H(),h.name=r[i].name,r[i].sex===0?h.sex="man":r[i].sex===1&&(h.sex="woman"),h.usage=r[i].usage,r[i].type===1?h.type="单人间":r[i].type===2?h.type="双人间":h.type=r[i].type+"人间",h.isForCadre=(!!r[i].isForCadre).toString(),h.isReserved=(!!r[i].isReserved).toString(),P.push(h)}j(P)}else alert(k)})}function Z(c,u){l(()=>!0),m(c),s(u.name)}function je(){window.localStorage.removeItem("token"),l(!1)}return t?e.jsxs("div",{children:[e.jsx(Fe,{lognum:p,usermsg:n,textitem:Ke,columns:f,tabledata:v,tablepage:C,tabletitle:g,logOut:je,getApart:K,getRoom:he}),e.jsx(Me,{title:N,placement:"bottom",onClose:()=>I(!1),open:x,tableitems:ue,records:ce,apartUpdate:ge})]}):e.jsx("div",{className:"login-box",children:e.jsx("div",{className:"glass",children:e.jsxs("div",{className:"innerlogin",children:[e.jsx("p",{children:"公寓员工管理系统"}),e.jsx("img",{src:Te}),e.jsxs(ae,{children:[e.jsx(R,{path:"/login",element:e.jsx(Pe,{login:Z})}),e.jsx(R,{path:"/register",element:e.jsx(Be,{})}),e.jsx(R,{path:"*",element:e.jsx(ie,{to:"/login"})})]})]})})})}const G="user_key",Qe={saveUser(t){Q.set(G,t)},getUser(){return Q.get(G)||{}},removeUser(){Q.remove(G)}};Qe.getUser();we.createRoot(document.getElementById("root")).render(e.jsx(ye,{children:e.jsx(He,{})}));