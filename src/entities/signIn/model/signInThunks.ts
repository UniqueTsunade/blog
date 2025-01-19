import { ServerError, SignInFormData } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserResponse } from "./types";

export const signInUserThunk = createAsyncThunk<
  UserResponse,
  SignInFormData,
  { rejectValue: ServerError }
>("signIn/signInUser", async (formData, { rejectWithValue }) => {
  try {
    const { email, password } = formData;

    const response = await axios.post(
      "https://blog-platform.kata.academy/api/users/login",
      {
        user: {
          email,
          password,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as ServerError);
    }
    throw error;
  }
});

export const getCurrentUser = createAsyncThunk<
  UserResponse,
  void,
  { rejectValue: ServerError }
>("user/getCurrentUser", async (__, { rejectWithValue }) => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      return rejectWithValue({
        errors: { body: ["Token is missing"] },
      });
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.get<UserResponse>(
      "https://blog-platform.kata.academy/api/user",
      { headers }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as ServerError);
    }
    throw error;
  }
});
