import{r as i,a1 as q,w as I,j as e,a0 as p,M as A,N as W,A as j,al as w,y as O,am as B,an as V,J as y,ao as U,ap as _,aq as $,X as G,ar as J,D as S,as as D}from"./index-4c215e85.js";const M=()=>{const[v,f]=i.useState(!1),[N,L]=i.useState(!1),[u,x]=i.useState(null),[c,b]=i.useState(0),[T,k]=i.useState(!1),[r,d]=i.useState({mobileNumber:!1,name:!1,email:!1,otp:!1}),[n,h]=i.useState({mobileNumber:"",otp:"",name:"",email:"",notify:!1}),C=q(),{enqueueSnackbar:z}=I(),F=()=>{b(0),h({mobileNumber:"",otp:"",name:"",email:"",notify:!1}),f(!1)},P=async()=>{const{mobileNumber:a}=n;if(a.trim()===""||a.trim().length!==10||isNaN(Number(a))){d({...r,mobileNumber:!0});return}k(!0);try{window.otpResult=await J(a);const t=await S("auth/login",{mobileNumber:a});if(t){const{isRegistered:o}=t.data;b(30),f(!0),L(!o)}}catch(t){console.log(t),z("Something went wrong...",{variant:"error"})}k(!1)},m=async a=>{const{name:t,value:o,checked:g}=a.target;if(r[t]=!1,x(null),t==="otp"&&o.length===6){h(s=>({...s,otp:o}));try{await window.otpResult.confirm(o);const s=await S("auth/validate",{otp:o,mobileNumber:n.mobileNumber});s.status===200&&(x(!0),s.data&&C(D({token:s.data})))}catch{x(!1)}}t==="mobileNumber"&&v&&(f(!1),h({...n,otp:"",name:"",email:""}));let l={[t]:o};t==="notify"&&(l={[t]:g}),h(s=>({...s,...l}))},E=async()=>{const{email:a,name:t,otp:o}=n;if(o.trim().length===0||!u)return d({...r,otp:!0});if(t.trim().length===0)return d({...r,name:!0});if(a.trim().length===0)return d({...r,email:!0});const g={...n};delete g.otp;const l=await S("user",g);if(l.status===400)return alert(l.data);C(D({token:l.data})),F()};i.useEffect(()=>{const a=setInterval(()=>{c>0?b(t=>t-1):clearInterval(a)},1e3);return()=>clearInterval(a)},[c]);const R=e.jsxs(e.Fragment,{children:[e.jsx(p,{error:r.name,color:"text",label:"Full Name",margin:"dense",required:!0,size:"small",fullWidth:!0,value:n.name,onChange:m,name:"name"}),e.jsx(p,{error:r.email,color:"text",type:"email",label:"Email Address",margin:"dense",required:!0,size:"small",fullWidth:!0,value:n.email,onChange:m,name:"email"}),e.jsx(A,{sx:{fontSize:"10px"},control:e.jsx(W,{color:"secondary",checked:n.notify,onChange:m,name:"notify"}),label:e.jsx(j,{variant:"body2",children:"Yes, Keep me posted with current offers, new arrivals, sale and contest"})})]});return e.jsx(w,{justifyContent:"center",alignItems:"center",height:"75vh",children:e.jsxs(O,{width:"40%",boxShadow:2,bgcolor:"white",textAlign:"center",pt:2,sx:{width:{xs:360,sm:440},mx:"auto"},children:[e.jsx(j,{variant:"h5",children:"Login/Sign Up to explore great designs"}),e.jsxs(B,{children:["Login / Signup",e.jsx("div",{style:{fontSize:12,fontWeight:"normal"},children:"Get Exciting Offers & Track Order"})]}),e.jsxs(V,{children:[e.jsx(p,{error:r.mobileNumber,color:"text",inputProps:{pattern:"[0-9]{10}",maxLength:10},label:"Phone Number",name:"mobileNumber",onChange:m,value:n.mobileNumber,margin:"dense",required:!0,size:"small",fullWidth:!0}),v?e.jsxs(w,{spacing:2,direction:"column",children:[!u&&e.jsx(O,{display:"flex",mb:-3,justifyContent:"flex-end",children:e.jsxs(y,{disabled:c!==0,onClick:P,color:"secondary",children:["Resend OTP",c!==0&&` in ${c} s`]})}),e.jsx(p,{error:r.otp,InputProps:{endAdornment:n.otp.length===6&&e.jsxs(U,{position:"end",children:[u===!0&&e.jsx(_,{color:"success"}),u===!1&&e.jsx($,{color:"error"})]})},inputProps:{maxLength:6},color:"text",label:"Enter 6 Digit OTP",margin:"normal",size:"small",fullWidth:!0,value:n.otp,onChange:m,name:"otp"}),N&&R,e.jsx(y,{variant:"contained",sx:{bgcolor:"black",":hover":{bgcolor:"black"},color:"white"},onClick:E,children:N?"Sign Up":"Verify"})]}):e.jsx(e.Fragment,{children:e.jsx(y,{sx:{mt:2,bgcolor:"black",":hover":{bgcolor:"black"},color:"white"},variant:"contained",id:"sign-in-button",onClick:P,children:e.jsxs(w,{direction:"row",spacing:2,children:[T&&e.jsx(G,{size:20,height:"100%",color:"inherit"}),e.jsx(j,{whiteSpace:"nowrap",fontSize:14,children:"Login with OTP"})]})})})]})]})})};export{M as default};
