import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormValues, UserResponse } from "./types";
import axios from "axios";

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload: FormValues, { rejectWithValue }) => {
    try {
      const url = "https://blog-platform.kata.academy/api/user";


      const token = sessionStorage.getItem("authToken");
if (!token) {
  return rejectWithValue("Token is missing");
}

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

      const requestPayload = {
        user: payload,
      };

      const response = await axios.put<UserResponse>(url, requestPayload, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
      }

      console.error("Unexpected error:", error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);