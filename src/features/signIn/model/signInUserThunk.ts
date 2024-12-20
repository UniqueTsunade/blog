import { ServerError, SignInFormData } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserResponse } from "./types";

export const signInUserThunk = createAsyncThunk<UserResponse, SignInFormData, {rejectValue: ServerError}>
 ("signIn/signInUser", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://blog-platform.kata.academy/api/users/login",
        {
          user: {
            email: formData.email,
            password: formData.password,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverError = error.response.data as ServerError;
        console.error(`Server error: ${error.response.status} - ${error.response.statusText}`,
        serverError
      );
      return rejectWithValue(serverError);
      }
      return rejectWithValue({
        errors: {
        body: ["An unexpected error occurred"],
      }
  })
}})