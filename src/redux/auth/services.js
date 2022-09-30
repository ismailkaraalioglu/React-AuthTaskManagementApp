import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "taskapp/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_ENDPOINT}/api/auth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
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

export const loginUser = createAsyncThunk(
  "taskapp/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_ENDPOINT}/api/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { email, password },
      });
      sessionStorage.setItem("token", JSON.stringify(res.data.token));
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
