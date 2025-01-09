import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ArticleResponse,
  CreateArticleData,
  ServerError,
  UpdateArticleData,
} from "./types";
import axios from "axios";

export const createArticle = createAsyncThunk<
  ArticleResponse,
  CreateArticleData,
  { rejectValue: ServerError }
>("articles/createArticle", async (formData, { rejectWithValue }) => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      return rejectWithValue({ message: "Token is missing" });
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post<ArticleResponse>(
      "https://blog-platform.kata.academy/api/articles",
      formData,
      { headers }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Server response:", error.response?.data);
      return rejectWithValue(
        (error.response?.data as ServerError) || { message: error.message }
      );
    }
    return rejectWithValue({ message: "An unexpected error occurred" });
  }
});

export const updateArticle = createAsyncThunk<
  ArticleResponse,
  UpdateArticleData,
  { rejectValue: ServerError }
>("articles/updateArticle", async (formData, { rejectWithValue }) => {
  try {
    const url = `https://blog-platform.kata.academy/api/articles/${formData.slug}`;

    const token = sessionStorage.getItem("authToken");
    if (!token) {
      return rejectWithValue({ message: "Token is missing" });
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.put<ArticleResponse>(url, formData, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }

    console.error("Unexpected error:", error);
    return rejectWithValue({ message: "An unexpected error occurred" });
  }
});
