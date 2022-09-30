import { createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "./services";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    getAllUsersStatus: "idle",
    getAllUsersError: null,
  },
  reducers: {},
  extraReducers: {
    [getAllUser.pending]: (state, action) => {
      state.getAllUsersStatus = "loading";
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.getAllUsersStatus = "succeeded";
      state.users = action.payload;
    },
    [getAllUser.pending]: (state, action) => {
      state.getAllUsersStatus = "failed";
      state.getAllUsersError = action.payload;
    },
  },
});

export default userSlice.reducer;
