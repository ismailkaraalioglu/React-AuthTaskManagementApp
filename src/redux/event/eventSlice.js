import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
    confirmDeleteModal: false,
    currentDeleteTask: null,
  },
  reducers: {
    changeDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
    showConfirmDeleteModal: (state, action) => {
      state.confirmDeleteModal = !state.confirmDeleteModal;
      if (state.confirmDeleteModal) {
        state.currentDeleteTask = action.payload;
      }
    },
  },
});

export const { changeDarkMode, showConfirmDeleteModal } =
  eventSlice.actions;

export default eventSlice.reducer;
