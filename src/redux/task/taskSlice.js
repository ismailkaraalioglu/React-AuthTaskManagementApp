import { createSlice } from "@reduxjs/toolkit";
import { getAllTasks, removeTask, createTask, editTask } from "./services";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    titleInput: "",
    descInput: "",
    selectUserId: "",
    editSelectUserIdValue: "",
    editTitleInputValue: "",
    editDescInputValue: "",
    currentEditTask: null,
    getAllTaskStatus: "idle",
    getAllTaskError: null,
    removeTaskStatus: "idle",
    removeTaskError: null,
    createTaskStatus: "idle",
    createTaskError: null,
    editTaskStatus: "idle",
    editTaskError: null,
  },
  reducers: {
    changeTitleInput: (state, action) => {
      state.titleInput = action.payload;
    },
    changeDescInput: (state, action) => {
      state.descInput = action.payload;
    },
    changeSelectUser: (state, action) => {
      state.selectUserId = action.payload;
    },
    changeRemoveStatus: (state, action) => {
      state.removeTaskStatus = "idle";
      state.removeTaskError = null;
    },
    changeCreateStatus: (state, action) => {
      state.createTaskStatus = "idle";
      state.createTaskError = null;
    },
    changeEditStatus: (state, action) => {
      state.editTaskStatus = "idle";
      state.editTaskError = null;
    },
    changeEditTitleInput: (state, action) => {
      state.editTitleInputValue = action.payload;
    },
    changeEditDescInput: (state, action) => {
      state.editDescInputValue = action.payload;
    },
    changeEditSelectUserId: (state, action) => {
      state.editSelectUserIdValue = action.payload;
    },
    currentEdit: (state, action) => {
      const currentTask = action.payload;
      const { title, description, ownerId } = action.payload;
      state.editTitleInputValue = title;
      state.editDescInputValue = description;
      state.editSelectUserIdValue = ownerId;
      state.currentEditTask = currentTask;
    },
    removeSelectUserId: (state, action) => {
      state.editSelectUserIdValue = action.payload;
    },
  },
  extraReducers: {
    [getAllTasks.pending]: (state, action) => {
      state.getAllTaskStatus = "loading";
    },
    [getAllTasks.fulfilled]: (state, action) => {
      state.getAllTaskStatus = "succeeded";
      state.tasks = action.payload;
    },
    [getAllTasks.rejected]: (state, action) => {
      state.getAllTaskStatus = "failed";
      state.getAllTaskError = action.payload;
    },
    [removeTask.pending]: (state, action) => {
      state.removeTaskStatus = "loading";
    },
    [createTask.rejected]: (state, action) => {
      state.createTaskStatus = "failed";
      state.createTaskError = action.payload;
    },
    [editTask.rejected]: (state, action) => {
      state.editTaskStatus = "failed";
      state.editTaskError = action.payload;
    },
    [removeTask.fulfilled]: (state, action) => {
      const id = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      state.tasks.splice(index, 1);
      state.removeTaskStatus = "succeeded";
    },
    [removeTask.rejected]: (state, action) => {
      state.removeTaskStatus = "failed";
      state.removeTaskError = action.payload;
    },
  },
});

export const {
  changeTitleInput,
  changeDescInput,
  changeSelectUser,
  changeRemoveStatus,
  changeCreateStatus,
  changeEditTitleInput,
  changeEditDescInput,
  changeEditSelectUserId,
  currentEdit,
  removeSelectUserId,
  changeEditStatus,
} = taskSlice.actions;

export default taskSlice.reducer;
