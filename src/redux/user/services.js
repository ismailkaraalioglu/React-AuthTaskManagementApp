import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUser = createAsyncThunk(
  "taskapp/getAllUser",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_ENDPOINT}/api/user`,
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
