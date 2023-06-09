import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegin } from "./api";

let initialState = { items: [], loading: true };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addedToCart: (state, action) => {
      state.items.push(action.payload);
    },

    removedFromCart: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload.id
      );
    },

    updatedCart: (state, action) => {
      state.items = state.items.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: action.payload.quantity }
          : product
      );
    },

    initializeCart: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
  },
});

const { addedToCart, removedFromCart, updatedCart, initializeCart } =
  cartSlice.actions;

export const getCart = () => (dispatch) => {
  return dispatch(
    apiCallBegin({
      url: "/cart",
      onSuccess: initializeCart.type,
    })
  );
};

export const addToCart = (data) => (dispatch) =>
  dispatch(
    apiCallBegin({
      url: "/cart",
      data: { ...data },
      method: "post",
      onSuccess: addedToCart.type,
    })
  );

export const removeFromCart = ({ id }) =>
  apiCallBegin({
    url: "/cart/" + id,
    method: "delete",
    onSuccess: removedFromCart.type,
  });

export const updateCart = ({ id, quantity }) =>
  apiCallBegin({
    url: "/cart/" + id,
    method: "put",
    data: { quantity },
    onSuccess: updatedCart.type,
  });

export default cartSlice.reducer;
