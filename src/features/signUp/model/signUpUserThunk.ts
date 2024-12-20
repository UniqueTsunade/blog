import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ServerError, SignUpFormData, UserResponse } from "./types";

export const signUpUserThunk = createAsyncThunk<
  UserResponse,
  SignUpFormData,
  { rejectValue: ServerError }
>("signUp/signUpUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "https://blog-platform.kata.academy/api/users",
      {
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response.data as ServerError;
      console.error(
        `Server error: ${error.response.status} - ${error.response.statusText}`,
        serverError
      );
      return rejectWithValue(serverError);
    }
    return rejectWithValue({
      errors: {},
      message: "An unexpected error occurred",
    });
  }
});
