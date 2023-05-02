import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

let initialState = { items: [], deliveryAddress: null, paymentMethod: null };

if (typeof window !== "undefined") {
  const deliveryAddress = localStorage?.getItem("da");
  const items = localStorage?.getItem("ck");
  if (deliveryAddress)
    initialState.deliveryAddress = JSON.parse(deliveryAddress);
  if (items) initialState.items = JSON.parse(items);
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addToCheckout: (state, action) => {
      state.items = action.payload;
      if (typeof window !== "undefined") {
        localStorage?.setItem("ck", JSON.stringify(action.payload));
      }
    },

    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
      if (typeof window !== "undefined") {
        localStorage?.setItem("da", JSON.stringify(action.payload));
      }
    },

    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    initializeCheckout: (state, action) => {
      state.items = action.payload.items;
      state.deliveryAddress = action.payload.deliveryAddress;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  addToCheckout,
  setDeliveryAddress,
  setPaymentMethod,
  initializeCheckout,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
