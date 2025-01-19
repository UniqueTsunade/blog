import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormValues, ServerError, UpdateCurrentUserResponse } from "./types";
import axios from "axios";

export const updateUser = createAsyncThunk<
  UpdateCurrentUserResponse,
  FormValues,
  { rejectValue: ServerError }
>("user/updateUser", async (payload, { rejectWithValue }) => {
  try {
    const url = "https://blog-platform.kata.academy/api/user";

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

    const requestPayload = {
      user: payload,
    };

    const response = await axios.put<UpdateCurrentUserResponse>(
      url,
      requestPayload,
      {
        headers,
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
