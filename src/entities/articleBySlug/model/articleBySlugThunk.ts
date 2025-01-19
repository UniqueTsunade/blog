import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomServerError } from "./types";
import { FullArticle } from "@/shared/lib/types/articleTypes";

export const getArticleBySlug = createAsyncThunk<
  FullArticle,
  string,
  { rejectValue: CustomServerError }
>("articles/getArticleBySlug", async (slug, { rejectWithValue }) => {
  try {
    const response = await axios.get<FullArticle>(
      `https://blog-platform.kata.academy/api/articles/${slug}`
    );
    console.log("Raw server response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as CustomServerError);
    }
    throw error;
  }
});
