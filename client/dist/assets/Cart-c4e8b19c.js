import{u as C,j as e,S as i,L as q,r as I,a as D,b as z,P as L,N as M,B as m,F as T,I as W,c as F,d as R,M as o,T as t,G as c,D as B,e as v,f as y,p as O}from"./index-13a4e5ec.js";const P=({id:r,productId:a,image:s,name:d,price:x,qty:b=1,size:h="L",color:u="red",discount:p=25,quantityInStock:j})=>{const[g,f]=I.useState(b),l=D(),{enqueueSnackbar:w}=z(),S=async()=>{l(y({id:r})),(await O("wishlist",{productId:a})).status},k=j===0;return e.jsxs(L,{sx:{":hover":{boxShadow:2},p:2},children:[e.jsxs(i,{direction:"row",spacing:2,pb:{xs:1,sm:1},children:[e.jsxs(i,{alignItems:"center",children:[e.jsx(M,{style:{textDecoration:"none",display:"block"},to:`/${d.replace(/\s+/g,"-")}?size=${h}&color=${u}`,children:e.jsx(m,{height:{xs:72,sm:120},width:{xs:72,sm:120},mx:{xs:0,sm:2},children:e.jsx("img",{src:s,alt:"product",style:{objectFit:"contain",width:"100%",height:"100%"}})})}),e.jsx(m,{sx:{minWidth:80},mt:2,children:e.jsxs(T,{fullWidth:!0,size:"small",children:[e.jsx(W,{color:"secondary",size:"small",id:"select-label-quantity",children:"Quantity"}),e.jsxs(F,{color:"secondary",id:"demo-simple-select",labelId:"select-label-quantity",label:"quantity",value:g,onChange:n=>{if(n.target.value>j)return w("Please select less quantity",{variant:"info"});f(n.target.value),l(R({id:r,quantity:n.target.value}))},children:[e.jsx(o,{value:1,children:"1"}),e.jsx(o,{value:2,children:"2"}),e.jsx(o,{value:3,children:"3"}),e.jsx(o,{value:4,children:"4"}),e.jsx(o,{value:5,children:"5"})]})]})})]}),e.jsxs(i,{width:"100%",overflow:"hidden",textOverflow:"ellipsis",children:[e.jsx(t,{variant:"body2",children:d}),e.jsxs(i,{direction:"row",spacing:{xs:1,sm:2},alignItems:"center",children:[e.jsxs(t,{fontWeight:"bold",variant:"h6",children:["₹ ",x]}),e.jsxs(t,{sx:{textDecoration:"line-through"},variant:"subtitle1",color:"text.secondary",children:["₹ ",Math.ceil(x*(1+p/100))]}),e.jsxs(t,{variant:"body1",color:"success.light",children:["(",p,"% off)"]})]}),e.jsxs(c,{container:!0,py:{xs:1,sm:2},children:[e.jsx(c,{item:!0,xs:6,children:e.jsxs(t,{variant:"body2",children:[e.jsx("b",{children:"Color : "}),u]})}),e.jsx(c,{item:!0,xs:6,children:e.jsxs(t,{variant:"body2",children:[e.jsx("b",{children:"Size : "}),h]})})]}),k&&e.jsx(t,{pt:2,variant:"h5",fontWeight:"medium",color:"error.light",children:"Out of Stock"})]})]}),e.jsx(B,{}),e.jsxs(i,{direction:"row",justifyContent:"space-around",px:{xs:2,sm:4},mb:-2,children:[e.jsx(v,{sx:{textTransform:"none",color:"text.secondary",":hover":{bgcolor:"inherit"}},disableRipple:!0,onClick:()=>{l(y({id:r}))},children:"Remove"}),e.jsx(v,{disableRipple:!0,sx:{textTransform:"none",color:"text.secondary",":hover":{bgcolor:"inherit"}},onClick:S,children:"Move to wishlist"})]})]})},E=()=>{const{items:r,loading:a}=C(s=>s.cart);return e.jsxs(i,{spacing:{xs:1,sm:2},children:[a&&e.jsx(q,{}),r.map(s=>e.jsx(P,{id:s.id,productId:s.product.id,image:s.product.image,price:s.product.price,name:s.product.name,qty:s.quantity,discount:s.product.discount,color:s.option.color,size:s.option.size,quantityInStock:s.option.stock},s.id))]})};export{E as default};