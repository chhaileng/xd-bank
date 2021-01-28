(this["webpackJsonpxd-bank"]=this["webpackJsonpxd-bank"]||[]).push([[0],{2051:function(e,t){},2053:function(e,t){},2064:function(e,t){},2066:function(e,t){},2093:function(e,t){},2095:function(e,t){},2096:function(e,t){},2101:function(e,t){},2103:function(e,t){},2122:function(e,t){},2134:function(e,t){},2137:function(e,t){},2245:function(e,t,n){"use strict";n.r(t);var a=n(8),r=n(0),c=n.n(r),s=n(28),i=n.n(s),o=n(58),l=n(46),u=n(145),d=n.n(u),j=n(200),h=n.n(j),m=n(38),b=n.n(m),x=n(30),f=(n(371),n(61)),p=n.n(f),O=n(83),g=n.n(O),y=n(57),v=n.n(y),k=n(60),w=n.n(k),T=n(80),S=n.n(T),C=n(2253),q=n(2254);function A(){var e=Object(x.f)(),t=c.a.useState(!1),n=Object(l.a)(t,2),s=n[0],i=n[1],o=Object(r.useCallback)((function(t){i(!0),fetch("/login",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"username=".concat(t.username,"&password=").concat(t.password)}).then((function(t){i(!1),t.redirected?(b.a.success("Login success"),e.push("/")):b.a.error("Login failed")})).catch((function(e){i(!1),b.a.error("An unknown error occurred.")}))}),[i,e]);return Object(a.jsxs)("div",{style:{maxWidth:"400px",margin:"auto"},children:[Object(a.jsx)(w.a.Title,{level:3,children:"xD Bank Login"}),Object(a.jsx)(S.a,{style:{marginBottom:20},description:"Use any unique username and any password. Nothing is checked. Your user will be stored in memory and removed after 3 hours ^.^",type:"info"}),Object(a.jsxs)(p.a,{name:"normal_login",initialValues:{remember:!0},onFinish:o,validateMessages:{required:"Please input your ${name}",string:{max:"Limit to ${max} characters only"}},children:[Object(a.jsx)(p.a.Item,{name:"username",rules:[{required:!0,max:10}],children:Object(a.jsx)(g.a,{prefix:Object(a.jsx)(C.a,{}),placeholder:"Username"})}),Object(a.jsx)(p.a.Item,{name:"password",rules:[{required:!0}],children:Object(a.jsx)(g.a.Password,{prefix:Object(a.jsx)(q.a,{}),type:"password",placeholder:"Password"})}),Object(a.jsx)(p.a.Item,{children:Object(a.jsx)(v.a,{type:"primary",htmlType:"submit",loading:s,children:"Login"})})]})]})}var F=n(206),I=n(114),L=n.n(I),B=n(115),_=n.n(B),P=n(85),$=n.n(P),R=n(362),z=n.n(R),H=n(363),U=n.n(H),D=n(360),M=n.n(D),Q=n(361),W=n.n(Q);function E(e){var t=e.data,n=void 0===t?[]:t,r=[{title:"Amount",dataIndex:"amount",key:"amount",render:function(e){var t=new Intl.NumberFormat;return Object(a.jsxs)(w.a.Text,{type:e>0?"success":"danger",children:[e>0?"+":"",t.format(e)]})}},{title:"To / From",dataIndex:"username",key:"username",render:function(e){return Object(a.jsx)(w.a.Text,{style:{textTransform:"uppercase"},children:e})}},{title:"Remark",dataIndex:"remark",key:"remark"},{title:"Balance",key:"balance",dataIndex:"balance",render:function(e){return Object(a.jsx)(L.a,{prefix:"$",value:e,valueStyle:{fontSize:"inherit"}})}}];return Object(a.jsx)(W.a,{columns:r,dataSource:n})}function N(e){var t=e.user,n=e.setUser,r=c.a.useState(!1),s=Object(l.a)(r,2),i=s[0],o=s[1],u=c.a.useState(!1),d=Object(l.a)(u,2),j=d[0],h=d[1],m=p.a.useForm(),x=Object(l.a)(m,1)[0],f=t?t.transactions.map((function(e){return Object(F.a)(Object(F.a)({},e),{},{key:M.a.randomBytes(10).toString("hex")})})):[];return f.reverse(),t?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)($.a,{size:"middle",direction:"vertical",style:{width:"100%"},children:[Object(a.jsxs)(_.a,{children:[Object(a.jsx)(L.a,{title:"Account Name",value:t.username,style:{textTransform:"uppercase"}}),Object(a.jsx)(L.a,{title:"Balance",prefix:"$",value:t.balance,style:{margin:"0 32px",textTransform:"uppercase"}})]}),Object(a.jsx)(_.a,{children:Object(a.jsx)(v.a,{size:"small",type:"primary",onClick:function(){o(!0)},children:"Transfer"})}),Object(a.jsx)(w.a.Title,{level:5,children:"Transaction History"}),Object(a.jsx)(E,{data:f})]}),Object(a.jsxs)(z.a,{title:"Transfer",visible:i,onOk:x.submit,confirmLoading:j,onCancel:function(){o(!1),x.resetFields()},maskClosable:!1,okText:"Transfer",okButtonProps:{form:"form-transfer",key:"submit",htmlType:"submit"},children:[Object(a.jsx)(S.a,{style:{marginBottom:20},description:"You can transfer to a known account or just a random account. ^^",type:"info"}),Object(a.jsxs)(p.a,{labelCol:{span:5},wrapperCol:{span:18},validateMessages:{required:"${label} is required",types:{number:"Invalid amount"},number:{range:"Transfer amount must be between $${min} and $${max}"},string:{max:"Limit to ${max} characters only"}},form:x,onFinish:function(e){h(!0),fetch("/transfer",{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"username=".concat(e.username,"&amount=").concat(e.amount,"&remark=").concat(e.remark)}).then((function(e){return e.json()})).then((function(e){if(e.success){var t=e.user;n(t),b.a.success("Transfer success"),o(!1),x.resetFields()}else b.a.error(e.error);h(!1)})).catch((function(e){b.a.error("An unknown error occurred."),o(!1),h(!1)}))},children:[Object(a.jsx)(p.a.Item,{name:"username",label:"Account",rules:[{required:!0,max:10}],children:Object(a.jsx)(g.a,{placeholder:"Account name"})}),Object(a.jsx)(p.a.Item,{name:"amount",label:"Amount",rules:[{required:!0,type:"number",min:1,max:1e4}],children:Object(a.jsx)(U.a,{placeholder:"Amount to transfer",style:{width:"100%"}})}),Object(a.jsx)(p.a.Item,{name:"remark",label:"Remark",children:Object(a.jsx)(g.a,{placeholder:"Remark (optional)"})})]}),Object(a.jsx)(S.a,{style:{marginBottom:20},description:"Warning: This page is vulnerable to CSRF attacks!",type:"warning"})]})]}):""}var Y=n(204),J=n.n(Y),X=[{q:"What is xD Bank?",a_html:"It is a small application that does some trasfering money like a bank."},{q:"For what it is made?",a_html:"I made this application for security demonstration purpose."},{q:"What vulnerabilities on this website?",a_html:"Actually I made this for demonstration about XSS and CSRF."},{q:"Is it safe to use this application?",a_html:"YES! user information in this application is not stored or checked. Users and sessions are stored on memory and got reset when Heroku Dyno go to sleep."},{q:"How to access to application source code?",a_html:'The source code of this application is availble on <a href="https://github.com/chhaileng/xd-bank">GitHub</>.'},{q:"About",a_html:"Made by Chhaileng"}];function G(){var e=Object(x.f)(),t=Object(x.g)(),n=c.a.useState(""),r=Object(l.a)(n,2),s=r[0],i=r[1],o=new URLSearchParams(t.search).get("q"),u=o?X.filter((function(e){var t=e.q.toLowerCase().includes(o.toLowerCase()),n=document.createElement("span");n.innerHTML=e.a_html;var a=n.innerText.toLowerCase().includes(o.toLowerCase());return t||a})):X;return c.a.useEffect((function(){o&&i(o)}),[i,o]),Object(a.jsxs)($.a,{direction:"vertical",style:{width:"100%"},children:[Object(a.jsx)(w.a.Title,{level:5,children:"FAQs"}),Object(a.jsx)(g.a.Search,{onChange:function(e){return i(e.target.value)},placeholder:"Search FAQs",onSearch:function(t){e.push("/faq?q=".concat(encodeURIComponent(t.trim())))},value:s,enterButton:!0}),Object(a.jsxs)("p",{style:{fontSize:15},children:["Show"," ",Object(a.jsx)("span",{dangerouslySetInnerHTML:{__html:o?"search result of '".concat(o,"'"):"all FAQs"}})]}),u.length>0?Object(a.jsx)(J.a,{accordion:!0,children:u.map((function(e,t){return Object(a.jsx)(J.a.Panel,{header:e.q,children:Object(a.jsx)("div",{style:{width:"100%"},dangerouslySetInnerHTML:{__html:e.a_html}})},t+1)}))}):Object(a.jsx)("p",{children:"No result found"}),Object(a.jsx)(S.a,{style:{marginBottom:20},description:"Warning: This page is vulnerable to XSS attacks!",type:"warning"})]})}var V=n(364),Z=n.n(V),K=n(78),ee=n.n(K),te=n(2255);function ne(e){var t=e.user,n=Object(x.f)(),r=c.a.useState(!1),s=Object(l.a)(r,2),i=s[0],u=s[1],d=c.a.useCallback((function(){u(!0),fetch("/logout",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){u(!1),e.redirected&&(b.a.info("Account logged out"),n.push("/login"))})).catch((function(e){u(!1),b.a.error("An unknown error occurred.")}))}),[u,n]);return Object(a.jsx)(Z.a,{title:Object(a.jsx)(o.b,{to:t?"/":"/login",children:"xD Bank"}),tags:Object(a.jsx)(ee.a,{title:"! Secure Bank by Zer0xdz",children:Object(a.jsx)(te.a,{twoToneColor:"#52c41a"})}),extra:t?[Object(a.jsx)(o.b,{to:"/faq",style:{marginRight:12},children:"FAQ"},"faq"),Object(a.jsx)(ee.a,{title:"Logout of Account",children:Object(a.jsx)(v.a,{size:"small",danger:!0,onClick:d,loading:i,children:"Logout"})},"signout")]:[Object(a.jsx)(o.b,{to:"/faq",style:{marginRight:12},children:"FAQ"},"faq")]})}var ae=n(205),re=n.n(ae);function ce(){return Object(a.jsx)(d.a.Footer,{children:Object(a.jsxs)(_.a,{children:[Object(a.jsx)(re.a,{flex:"none",children:"\xa9 Copyright xD Bank | 2021"}),Object(a.jsx)(re.a,{flex:"auto",style:{textAlign:"right"},children:Object(a.jsxs)($.a,{size:"middle",children:[Object(a.jsx)("a",{href:"https://github.com/chhaileng/xd-bank",target:"_blank",rel:"noopener noreferrer",children:"Source Code"}),Object(a.jsx)(o.b,{to:"/faq",children:"FAQ"})]})})]})})}function se(){return Object(a.jsx)(w.a.Title,{level:4,style:{textAlign:"center",paddingTop:30},children:"Page Not Found"})}function ie(){var e=c.a.useState(!0),t=Object(l.a)(e,2),n=t[0],r=t[1],s=c.a.useState(null),i=Object(l.a)(s,2),o=i[0],u=i[1],j=c.a.useState(!1),m=Object(l.a)(j,2),f=m[0],p=m[1],O=Object(x.f)(),g=Object(x.g)(),y=c.a.useCallback((function(){return fetch("/user").then((function(e){return e.json()})).then((function(e){r(!1),u(e),e?"/login"===g.pathname&&(O.push("/"),f&&b.a.success("Authenticated")):"/"===g.pathname&&(O.push("/login"),f&&b.a.info("Please login to continue"))})).catch((function(e){r(!0)}))}),[O,u,r,g.pathname,f]);return c.a.useEffect((function(){f&&!g.pathname||(y(),p(!0));var e=setInterval(y,5e3);return function(){clearInterval(e)}}),[y,p,f,g.pathname]),Object(a.jsxs)("div",{style:{maxWidth:"1200px",margin:"auto"},children:[Object(a.jsx)(ne,{user:o}),Object(a.jsx)(d.a.Content,{style:{margin:20,minHeight:"calc(100vh - 182px)"},children:n?Object(a.jsx)("div",{style:{textAlign:"center",paddingTop:50},children:Object(a.jsx)(h.a,{size:"large",tip:"Connecting..."})}):Object(a.jsxs)(x.c,{children:[Object(a.jsx)(x.a,{exact:!0,path:"/login",children:Object(a.jsx)(A,{})}),Object(a.jsx)(x.a,{exact:!0,path:"/faq",children:Object(a.jsx)(G,{})}),Object(a.jsx)(x.a,{exact:!0,path:"/",children:Object(a.jsx)(N,{user:o,setUser:u})}),Object(a.jsx)(x.a,{exact:!0,path:"*",children:Object(a.jsx)(se,{})})]})}),Object(a.jsx)(ce,{})]})}var oe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,2256)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};i.a.render(Object(a.jsx)(o.a,{children:Object(a.jsx)(ie,{})}),document.getElementById("xd-bank")),oe()}},[[2245,1,2]]]);
//# sourceMappingURL=main.f3e7ed81.chunk.js.map