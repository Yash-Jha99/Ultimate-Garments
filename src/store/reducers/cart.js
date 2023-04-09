import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegin } from "./api";

let initialState = { items: [], deliveryAddress: null, loading: true, buyNow: null }
const buyNow = localStorage.getItem("bn")
const deliveryAddress = localStorage.getItem('da')
if (buyNow) initialState.buyNow = JSON.parse(buyNow)
if (deliveryAddress) initialState.deliveryAddress = JSON.parse(deliveryAddress)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addedToCart: (state, action) => {
            state.items.push(action.payload)
        },
        removedFromCart: (state, action) => {
            state.items = state.items.filter(product => product.id !== action.payload.id)
        },
        updatedCart: (state, action) => {
            state.items = state.items.map(product => product.id === action.payload.id ? { ...product, quantity: action.payload.quantity } : product)
        },
        setDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload
            localStorage.setItem("da", JSON.stringify(action.payload))
        },
        initializeCart: (state, action) => {
            state.items = action.payload
            state.buyNow = null
            state.loading = false
        },
        setBuyNow: (state, action) => {
            state.buyNow = action.payload
            localStorage.setItem("bn", JSON.stringify(action.payload))
            state.items = []
        }
    }
})

const { addedToCart, removedFromCart, updatedCart, initializeCart } = cartSlice.actions

export const getCart = () => (dispatch, getState) => {
    return dispatch(apiCallBegin({
        url: "/cart",
        onSuccess: initializeCart.type
    }))
}

export const addToCart = (data) => (dispatch, getState) => dispatch(apiCallBegin({
    url: "/cart",
    data: { ...data },
    method: "post",
    onSuccess: addedToCart.type
}))


export const removeFromCart = ({ id }) => apiCallBegin({
    url: "/cart/" + id,
    method: "delete",
    onSuccess: removedFromCart.type
})

export const updateCart = ({ id, quantity }) => apiCallBegin({
    url: "/cart/" + id,
    method: "put",
    data: { quantity },
    onSuccess: updatedCart.type
})
export const { setDeliveryAddress, setBuyNow } = cartSlice.actions

export default cartSlice.reducer