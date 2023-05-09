import{r as i,a1 as q,w as I,j as e,a0 as f,M as A,N as W,A as j,S as w,l as B,y as O,al as V,am as U,J as y,an as _,ao as $,ap as G,X as J,aq as K,D as S,ar as D}from"./index-7afe6f9a.js";const X=()=>{const[v,x]=i.useState(!1),[N,L]=i.useState(!1),[u,d]=i.useState(null),[c,b]=i.useState(0),[T,k]=i.useState(!1),[r,h]=i.useState({mobileNumber:!1,name:!1,email:!1,otp:!1}),[n,g]=i.useState({mobileNumber:"",otp:"",name:"",email:"",notify:!1}),C=q(),{enqueueSnackbar:z}=I(),F=()=>{b(0),g({mobileNumber:"",otp:"",name:"",email:"",notify:!1}),x(!1)},P=async()=>{const{mobileNumber:a}=n;if(a.trim()===""||a.trim().length!==10||isNaN(Number(a))){h({...r,mobileNumber:!0});return}k(!0);try{window.otpResult=await K(a);const t=await S("auth/login",{mobileNumber:a});if(t){const{isRegistered:s}=t.data;b(30),x(!0),L(!s)}}catch(t){console.log(t),z("Something went wrong...",{variant:"error"})}k(!1)},m=async a=>{const{name:t,value:s,checked:p}=a.target;if(r[t]=!1,d(null),t==="otp")if(s.length!==6)d(null);else{g(o=>({...o,otp:s}));try{await window.otpResult.confirm(s);const o=await S("auth/validate",{otp:s,mobileNumber:n.mobileNumber});o.status===200&&(d(!0),o.data&&C(D({token:o.data})))}catch{d(!1)}}t==="mobileNumber"&&v&&(x(!1),g({...n,otp:"",name:"",email:""}));let l={[t]:s};t==="notify"&&(l={[t]:p}),g(o=>({...o,...l}))},E=async()=>{const{email:a,name:t,otp:s}=n;if(s.trim().length===0||!u)return h({...r,otp:!0});if(t.trim().length===0)return h({...r,name:!0});if(a.trim().length===0)return h({...r,email:!0});const p={...n};delete p.otp;const l=await S("user",p);if(l.status===400)return alert(l.data);C(D({token:l.data})),F()};i.useEffect(()=>{const a=setInterval(()=>{c>0?b(t=>t-1):clearInterval(a)},1e3);return()=>clearInterval(a)},[c]);const R=e.jsxs(e.Fragment,{children:[e.jsx(f,{error:r.name,color:"text",label:"Full Name",margin:"dense",required:!0,size:"small",fullWidth:!0,value:n.name,onChange:m,name:"name"}),e.jsx(f,{error:r.email,color:"text",type:"email",label:"Email Address",margin:"dense",required:!0,size:"small",fullWidth:!0,value:n.email,onChange:m,name:"email"}),e.jsx(A,{sx:{fontSize:"10px"},control:e.jsx(W,{color:"secondary",checked:n.notify,onChange:m,name:"notify"}),label:e.jsx(j,{variant:"body2",children:"Yes, Keep me posted with current offers, new arrivals, sale and contest"})})]});return e.jsx(w,{justifyContent:"center",alignItems:"center",height:"75vh",children:e.jsx(B,{elevation:2,children:e.jsxs(O,{width:"40%",textAlign:"center",pt:2,sx:{width:{xs:360,sm:440},mx:"auto"},children:[e.jsx(j,{variant:"h5",children:"Login/Sign Up to explore great designs"}),e.jsxs(V,{children:["Login / Signup",e.jsx("div",{style:{fontSize:12,fontWeight:"normal"},children:"Get Exciting Offers & Track Order"})]}),e.jsxs(U,{children:[e.jsx(f,{error:r.mobileNumber,color:"text",inputProps:{pattern:"[0-9]{10}",maxLength:10},label:"Phone Number",name:"mobileNumber",onChange:m,value:n.mobileNumber,margin:"dense",required:!0,size:"small",fullWidth:!0}),v?e.jsxs(w,{spacing:2,direction:"column",children:[!u&&e.jsx(O,{display:"flex",mb:-3,justifyContent:"flex-end",children:e.jsxs(y,{disabled:c!==0,onClick:P,color:"secondary",children:["Resend OTP",c!==0&&` in ${c} s`]})}),e.jsx(f,{error:r.otp,InputProps:{endAdornment:n.otp.length===6&&e.jsxs(_,{position:"end",children:[u===!0&&e.jsx($,{color:"success"}),u===!1&&e.jsx(G,{color:"error"})]})},inputProps:{maxLength:6},color:"text",label:"Enter 6 Digit OTP",margin:"normal",size:"small",fullWidth:!0,value:n.otp,onChange:m,name:"otp"}),N&&R,e.jsx(y,{variant:"contained",sx:{bgcolor:"black",":hover":{bgcolor:"black"},color:"white"},onClick:E,children:N?"Sign Up":"Verify"})]}):e.jsx(e.Fragment,{children:e.jsx(y,{sx:{mt:2,bgcolor:"black",":hover":{bgcolor:"black"},color:"white"},variant:"contained",id:"sign-in-button",onClick:P,children:e.jsxs(w,{direction:"row",spacing:2,children:[T&&e.jsx(J,{size:20,height:"100%",color:"inherit"}),e.jsx(j,{whiteSpace:"nowrap",fontSize:14,children:"Login with OTP"})]})})})]})]})})})};export{X as default};
