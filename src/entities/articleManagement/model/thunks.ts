import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ArticleResponse,
  CreateArticleData,
  CustomServerError,
  ServerError,
  UpdateArticleData,
} from "./types";

export const createArticleThunk = createAsyncThunk<
  ArticleResponse,
  CreateArticleData,
  { rejectValue: ServerError }
>("articles/createArticle", async (formData, { rejectWithValue }) => {
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

    const response = await axios.post<ArticleResponse>(
      "https://blog-platform.kata.academy/api/articles",
      formData,
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

export const updateArticleThunk = createAsyncThunk<
  ArticleResponse,
  UpdateArticleData,
  { rejectValue: ServerError }
>("articles/updateArticle", async (formData, { rejectWithValue }) => {
  try {
    const url = `https://blog-platform.kata.academy/api/articles/${formData.slug}`;

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

    const response = await axios.put<ArticleResponse>(url, formData, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as ServerError);
    }
    throw error;
  }
});

export const deleteArticleThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: CustomServerError }
>("articles/deleteArticle", async (slug, { rejectWithValue }) => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      return rejectWithValue({
        errors: { body: ["Token is missing"] },
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
      return rejectWithValue(error.response?.data as CustomServerError);
    }
    throw error;
  }
});
