import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart"
import authReducer from "./reducers/auth"
import { api } from "./middlewares/api";
import checkout from "./reducers/checkout";
import theme from "./reducers/theme";


export default configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        checkout: checkout,
        theme: theme

    },
    middleware: (gDM) => gDM().concat(api)
})