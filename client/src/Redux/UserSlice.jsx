import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../services/api";

// actions
export const signUp = createAsyncThunk(
  "user/signUp",
  async (values, { rejectWithValue }) => {
    const toastId = toast.loading("Creating your account...");
    try {
      const { data } = await axios.post(
        `${API_URL}/api/users/register`,
        values
      );
      toast.success("Account created successfully!");
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.response?.data?.errors
          ? error.response.data.errors[0]?.msg
          : null) ||
        "Sign up failed. Please check your details.";
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      toast.dismiss(toastId);
    }
  }
);

export const logIn = createAsyncThunk(
  "user/logIn",
  async (values, { rejectWithValue }) => {
    const toastId = toast.loading("Logging in...");
    try {
      const { data } = await axios.post(
        `${API_URL}/api/users/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Welcome back!");
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.response?.data?.errors
          ? error.response.data.errors[0]?.msg
          : null) ||
        "Login failed. Please check your credentials.";
      toast.error(message);
      return rejectWithValue(message);
    } finally {
      toast.dismiss(toastId);
    }
  }
);

// slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    id: localStorage.getItem("userId") || null,
    username: localStorage.getItem("username") || null,
    email: localStorage.getItem("email") || null,
    isLoadingUser: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      state.token = null;
      state.id = null;
      state.username = null;
      state.email = null;
      state.error = null;
    },
    updateUserCredentials: (state, action) => {
      const { username, email } = action.payload;
      if (username) {
        state.username = username;
        localStorage.setItem("username", username);
      }
      if (email) {
        state.email = email;
        localStorage.setItem("email", email);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Log In
      .addCase(logIn.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.error = null;
        if (action.payload) {
          const { token, _id, username, email } = action.payload;
          localStorage.setItem("userId", _id);
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("email", email);

          state.token = token;
          state.id = _id;
          state.username = username;
          state.email = email;
        }
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.error = null;
        if (action.payload) {
          const { token, _id, username, email } = action.payload;
          localStorage.setItem("userId", _id);
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("email", email);

          state.token = token;
          state.id = _id;
          state.username = username;
          state.email = email;
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logout, updateUserCredentials } = userSlice.actions;
