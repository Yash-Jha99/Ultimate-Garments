import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

let initialState = { isLoggedIn: false, token: null, user: {} };
const token = localStorage.getItem("token");
if (token) {
  const user = jwtDecode(token);
  initialState = { isLoggedIn: true, token, user };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.user = jwtDecode(token);
      localStorage.setItem("token", token);
      const params = new URLSearchParams(window.location.search);
      if (params.get("from")) window.location.href = params.get("from");
      window.location.reload();
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.clear();
      window.location.reload();
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;

export const getAuth = () => (getState) => {
  return getState().auth;
};
