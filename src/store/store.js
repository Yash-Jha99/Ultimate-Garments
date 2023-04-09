import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart"
import authReducer from "./reducers/auth"
import { api } from "./middlewares/api";
import wishlist from "./reducers/wishlist";


export default configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        wishlist: wishlist
    },
    middleware: [...getDefaultMiddleware(), api]
})