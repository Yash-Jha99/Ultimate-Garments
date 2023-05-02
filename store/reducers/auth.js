import { createSlice } from "@reduxjs/toolkit";
import axios from "@/config/axios";
import jwtDecode from "jwt-decode";
import { HYDRATE } from "next-redux-wrapper";

let initialState = { isLoggedIn: false, token: null, user: {} };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      axios.defaults.headers.common.Authorization=token
      state.user = jwtDecode(token);

      if (typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);
      localStorage.setItem("token", token);
      if (params.get("from")) window.location.href = params.get("from");
      window.location.reload();
    },

    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      if (typeof window === "undefined") return;
      localStorage.clear();
      window.location.reload();
    },

    initializeUser: (state, action) => {
      const { token } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      console.log(token);
      axios.defaults.headers.common.Authorization=token;
      state.user = jwtDecode(token);
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

export default authSlice.reducer;
export const { login, logout, initializeUser } = authSlice.actions;
