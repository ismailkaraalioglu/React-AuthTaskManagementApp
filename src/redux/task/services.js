import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTasks = createAsyncThunk(
  "taskapp",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_ENDPOINT}/api/task`,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const createTask = createAsyncThunk(
  "taskapp/createTask",
  async ({ title, desc, userID, token }, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_ENDPOINT}/api/task`,
        headers: {
          Authorization: token,
        },
        data: {
          title,
          description: desc,
          ownerId: userID,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const editTask = createAsyncThunk(
  "task/app",
  async ({ title, desc, ownerId, token, task }, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_ENDPOINT}/api/task/${task.id}`,
        headers: {
          Authorization: token,
        },
        data: {
          title,
          description: desc,
          ownerId,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const removeTask = createAsyncThunk(
  "taskapp/removeTask",
  async ({ task, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}/api/task/${task.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return task.id;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);
