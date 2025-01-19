import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ServerError, SignUpFormData, UserResponse } from "./types";

export const signUpUserThunk = createAsyncThunk<
  UserResponse,
  SignUpFormData,
  { rejectValue: ServerError }
>("signUp/signUpUser", async (formData, { rejectWithValue }) => {
  try {
    const {username, email, password} = formData;

    const response = await axios.post(
      "https://blog-platform.kata.academy/api/users",
      {
        user: {
          username,
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
