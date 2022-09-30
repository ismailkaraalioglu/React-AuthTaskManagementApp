import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./services";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    registerStatus: "idle",
    registerError: null,
  },
  reducers: {
    changeRegisterStatus: (state, action) => {
      state.registerStatus = "idle";
      state.registerError = null;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.registerStatus = "loading";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.registerStatus = "succeeded";
    },
    [registerUser.rejected]: (state, action) => {
      state.registerStatus = "failed";
      state.registerError = action.payload;
    },
  },
});

export const { changeRegisterStatus } = registerSlice.actions;

export default registerSlice.reducer;
