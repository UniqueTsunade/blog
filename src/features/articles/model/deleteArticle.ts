import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomServerError } from "./types";
import axios from "axios";

export const deleteArticle = createAsyncThunk<
  void,
  string,
  { rejectValue: CustomServerError }
>("articles/deleteArticle", async (slug, { rejectWithValue }) => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      return rejectWithValue({
        message: "Token is missing",
        errors: {},
      });
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(
      `https://blog-platform.kata.academy/api/articles/${slug}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }

    console.error("Unexpected error:", error);
    return rejectWithValue({
      message: "An unexpected error occurred",
      errors: {},
    });
  }
});
