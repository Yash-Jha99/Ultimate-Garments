import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart"
import authReducer from "./reducers/auth"
import { api } from "./middlewares/api";
import checkout from "./reducers/checkout";


export default configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        checkout: checkout

    },
    middleware: (gDM) => gDM().concat(api)
})