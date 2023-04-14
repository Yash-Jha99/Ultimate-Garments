import { createSlice } from "@reduxjs/toolkit";

let initialState = { items: [], deliveryAddress: null, paymentMethod: null }
const deliveryAddress = localStorage.getItem('da')
const items = localStorage.getItem('ck')
if (deliveryAddress) initialState.deliveryAddress = JSON.parse(deliveryAddress)
if (items) initialState.items = JSON.parse(items)

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        addToCheckout: (state, action) => {
            state.items = action.payload
            localStorage.setItem("ck", JSON.stringify(action.payload))
        },

        setDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload
            localStorage.setItem("da", JSON.stringify(action.payload))
        },

        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
        }
    }
})

export const { addToCheckout, setDeliveryAddress, setPaymentMethod } = checkoutSlice.actions
export default checkoutSlice.reducer