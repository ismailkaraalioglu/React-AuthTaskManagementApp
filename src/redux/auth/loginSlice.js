import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./services";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginStatus: "idle",
    loginError: null,
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    token: JSON.parse(sessionStorage.getItem("token")) || null,
  },
  reducers: {
    changeLoginStatus: (state, action) => {
      state.loginStatus = "idle";
      state.loginError = null;
    },
    userLogout: (state, action) => {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.loginStatus = "idle";
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loginStatus = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      sessionStorage.setItem("user", JSON.stringify(user));
      state.loginStatus = "succeeded";
    },
    [loginUser.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.loginError = action.payload;
    },
  },
});

export const { changeLoginStatus, userLogout } = loginSlice.actions;

export default loginSlice.reducer;
