import { configureStore } from "@reduxjs/toolkit";
import cart from "./reducers/cart";
import auth from "./reducers/auth";
import { api } from "./middlewares/api";
import checkout from "./reducers/checkout";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      cart,
      auth,
      checkout,
    },
    middleware: (gDM) => gDM().concat(api),
    devTools: true,
  });

const wrapper = createWrapper(makeStore);

export default wrapper;
