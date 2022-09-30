import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/loginSlice";
import registerSlice from "./auth/registerSlice";
import eventSlice from "./event/eventSlice";
import taskSlice from "./task/taskSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    event: eventSlice,
    task: taskSlice,
    user: userSlice,
  },
});
