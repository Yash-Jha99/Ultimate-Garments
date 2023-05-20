import{t as W,v as M,j as e,A as T,J as g,S as i,w as n,x as u,E as q,D as I,s as N,r as f,H as z,a1 as O,G as F,X as U,W as V,a9 as Y,aa as B,ab as K,ac as $,l as E,a8 as A,O as P,a2 as G,ad as J}from"./index-dce7b652.js";var w={},X=M;Object.defineProperty(w,"__esModule",{value:!0});var D=w.default=void 0,Q=X(W()),Z=e,ee=(0,Q.default)((0,Z.jsx)("path",{d:"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"}),"Payment");D=w.default=ee;const te="/assets/empty-cart-a2175a2f.png",se=({deliveryAddress:s})=>{const a=T();return e.jsxs(g,{sx:{cursor:"pointer"},border:"1px solid lightgray",padding:2,children:[e.jsxs(i,{mb:1,justifyContent:"space-between",alignItems:"center",direction:"row",children:[e.jsx(n,{variant:"body1",children:"Deliver To:"}),e.jsx(u,{variant:"outlined",color:"secondary",size:"small",onClick:()=>a("/checkout/shipping"),children:"Change"})]}),e.jsxs(n,{fontWeight:500,variant:"subtitle1",mb:1,children:[s.firstName," ",s.lastName," ","("+s.pincode+")"]}),e.jsxs(n,{variant:"body2",children:[s.address,", ",s.town,","," ",s.city,", ",s.state," "]}),e.jsx(n,{variant:"subtitle2",children:s.mobileNumber})]})},ne=({itemsCount:s,totalDiscount:a,totalAmount:c})=>{const l=q();return e.jsxs(i,{spacing:{xs:1,sm:1.5},children:[e.jsxs(n,{variant:"h6",children:["PRICE DETAILS (",s," items)"]}),e.jsx(I,{}),l.pathname==="/checkout/payment"?e.jsxs(i,{spacing:2,direction:"row",justifyContent:"space-between",children:[e.jsx(n,{variant:"body2",children:"Total Price"}),e.jsxs(n,{variant:"body2",children:["₹",c]})]}):e.jsxs(e.Fragment,{children:[e.jsxs(i,{spacing:1,direction:"row",justifyContent:"space-between",children:[e.jsx(n,{variant:"body2",children:"Total MRP (Inc. of Taxes)"}),e.jsxs(n,{variant:"body2",children:["₹",c+a]})]}),e.jsxs(i,{spacing:2,direction:"row",justifyContent:"space-between",children:[e.jsx(n,{variant:"body2",children:"Discount"}),e.jsxs(n,{variant:"body2",children:["- ₹",a]})]})]}),e.jsxs(i,{spacing:2,direction:"row",justifyContent:"space-between",children:[e.jsx(n,{variant:"body2",children:"Shipping"}),e.jsx(n,{variant:"body2",children:"Free"})]}),e.jsx(I,{}),e.jsxs(i,{spacing:1,direction:"row",justifyContent:"space-between",children:[e.jsx(n,{fontWeight:500,variant:"body1",children:l.pathname==="/checkout/payment"?"Amount Payable":"Total Amount"}),e.jsxs(n,{fontWeight:500,variant:"body1",children:["₹",c]})]}),e.jsxs(n,{variant:"body1",bgcolor:"success.light",p:.5,textAlign:"center",children:["You Saved ₹",a," on this order"]})]})},ae=N("div")(({theme:s,ownerState:a})=>({backgroundColor:s.palette.mode==="dark"?s.palette.grey[700]:"#ccc",zIndex:1,color:"#fff",width:36,height:36,display:"flex",borderRadius:"50%",justifyContent:"center",alignItems:"center",...a.active&&{background:s.palette.secondary.main,boxShadow:"0 4px 6px 0 rgba(0,0,0,.25)"},...a.completed&&{background:s.palette.secondary.main}}));function ie(s){const{active:a,completed:c,className:l}=s,h={1:e.jsx(G,{fontSize:"small"}),2:e.jsx(J,{fontSize:"small"}),3:e.jsx(D,{fontSize:"small"})};return e.jsx(ae,{ownerState:{completed:c,active:a},className:l,children:h[String(s.icon)]})}const C=["/checkout/cart","/checkout/shipping","/checkout/payment"],ce=()=>{const s=["My Cart","Address","Payment"],[a,c]=f.useState(0),[l,h]=f.useState(!1),{items:L,deliveryAddress:y,paymentMethod:b}=z(t=>t.checkout),{items:p,loading:R}=z(t=>t.cart),x=f.useRef(),m=q(),_=O(),j=T(),{enqueueSnackbar:v}=F();let r=L;m.pathname==="/checkout/cart"&&(r=p);const S=r.map(t=>t.product.price*t.quantity).reduce((t,d)=>t+d,0),H=r.map(t=>Math.ceil(t.product.price*t.product.discount/100)*t.quantity).reduce((t,d)=>t+d,0),k=async()=>{if(a===0){if(p.some(t=>t.quantityInStock===0))return v("Please remove out of stock item",{variant:"warning"});_(A(p)),j(C[1])}if(a===1){if(!y)return v("Please select a address",{variant:"warning"});j(C[2])}if(a===2){if(!b)return v("Please select a payment method",{variant:"warning"});const t={products:r.map(o=>({cartId:o.id,id:o.product.id,price:o.product.price,quantity:o.quantity,optionId:o.option.id})),paymentType:b,addressId:y.id};h(!0);const d=await P("order",t);if(d.status===201)if(b==="Cash")j("/myaccount/order/success");else{const o=await P("payment/create-checkout-session",{orderItemIds:d.data.orderItemIds,orderId:d.data.orderId});o.status===200&&window.location.replace(o.data.url)}h(!1)}};return f.useEffect(()=>{c(C.indexOf(m.pathname))},[m.pathname]),e.jsxs(g,{children:[l&&e.jsx(U,{fullscreen:!0}),!R&&r.length===0&&p.length===0&&e.jsxs(g,{textAlign:"center",children:[e.jsx(V,{message:"Your cart is empty",image:te}),e.jsx(u,{sx:{mt:-25},variant:"contained",size:"large",color:"secondary",onClick:()=>j("/"),children:"Start Shopping"})]}),(r.length!==0||p.length!==0)&&e.jsxs(e.Fragment,{children:[e.jsx(Y,{sx:{mb:1,mt:2,mx:{xs:1,sm:8}},activeStep:a,alternativeLabel:!0,children:s.map(t=>e.jsx(B,{children:e.jsx(K,{StepIconComponent:ie,children:t})},t))}),e.jsxs(i,{mx:{xs:0,sm:10},mb:{xs:1,sm:0},direction:{xs:"column",sm:"row"},spacing:{xs:1,sm:6},alignItems:{xs:"center",sm:"flex-start"},justifyContent:"center",children:[e.jsx(i,{mb:{xs:0,sm:2},width:{xs:"100%",sm:"70%"},children:e.jsx($,{})}),e.jsx(E,{sx:{width:{xs:"100%",sm:"30%"}},children:e.jsxs(i,{spacing:{xs:1,sm:2},p:{xs:1,sm:3},position:{xs:"static",sm:"sticky"},top:75,children:[m.pathname==="/checkout/payment"&&e.jsx(se,{deliveryAddress:y}),e.jsx(g,{ref:x,children:e.jsx(ne,{itemsCount:r.length,totalDiscount:H,totalAmount:S})}),e.jsx(u,{sx:{p:1,fontSize:20,display:{xs:"none",sm:"initial"}},variant:"contained",color:"secondary",fullWidth:!0,size:"large",onClick:k,children:"CHECKOUT SECURELY"})]})})]}),e.jsx(E,{sx:{position:"fixed",width:"100vw",bottom:0,display:{xs:"flex",sm:"none"}},elevation:4,children:e.jsxs(i,{zIndex:20,direction:"row",justifyContent:"space-between",alignItems:"center",px:2,pt:1,pb:2,width:"100%",position:"sticky",bottom:0,children:[e.jsxs(i,{justifyContent:"center",children:[e.jsxs(n,{lineHeight:1,fontWeight:500,fontSize:18,children:["₹",S]}),e.jsx(u,{sx:{p:0,fontWeight:400,fontSize:13,textTransform:"initial"},color:"secondary",onClick:()=>x==null?void 0:x.current.scrollIntoView({behaviour:"smooth",block:"start"}),children:"View price details"})]}),e.jsx(u,{variant:"contained",color:"secondary",size:"large",onClick:k,children:"CHECKOUT SECURELY"})]})})]})]})};export{ce as default};
