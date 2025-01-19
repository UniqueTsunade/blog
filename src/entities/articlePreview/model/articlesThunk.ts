import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ArticlesResponse,
  CustomServerError,
  FetchArticlesParams,
} from "./types";

export const fetchArticle = createAsyncThunk<
  ArticlesResponse,
  FetchArticlesParams,
  { rejectValue: CustomServerError }
>("articles/fetchArticles", async (params, { signal, rejectWithValue }) => {
  try {
    const { limit, offset } = params;
    const response = await axios.get<ArticlesResponse>(
      `https://blog-platform.kata.academy/api/articles?limit=${limit}&offset=${offset}`,
      { signal }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as CustomServerError);
    }
    throw error;
  }
});
