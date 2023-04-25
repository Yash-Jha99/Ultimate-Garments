import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegin } from "./api";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: { items: [], loading: true },
    reducers: {
        addedToWishlist: (state, action) => {
            state.items.push(action.payload)
        },
        removedFromWishlist: (state, action) => {
            state.items = state.items.filter(product => product.id !== action.payload.id)
        },

        initializedWishlist: (state, action) => {
            state.items = action.payload
            state.loading = false
        }
    }
})

const { addedToWishlist, removedFromWishlist, initializedWishlist } = wishlistSlice.actions

export const getWishlist = () => (dispatch, getState) => {
    return dispatch(apiCallBegin({
        url: "/wishlist/" + getState().auth.user.id,
        onSuccess: initializedWishlist.type
    }))
}

export const addToWishlist = (data) => (dispatch, getState) => dispatch(apiCallBegin({
    url: "/wishlist",
    data: { ...data, userId: getState().auth.user.id },
    method: "post",
    onSuccess: addedToWishlist.type
}))


export const removeFromWishlist = ({ id }) => apiCallBegin({
    url: "/wishlist/" + id,
    method: "delete",
    onSuccess: removedFromWishlist.type
})

export default wishlistSlice.reducer