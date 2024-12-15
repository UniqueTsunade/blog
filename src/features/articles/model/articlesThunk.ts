import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticlesResponse } from "./types";
import { fetchArticlesFromServer } from "../api/articlesApi";

export const fetchArticle = createAsyncThunk<
  ArticlesResponse,
  { limit: number; offset: number }
>("articles/fetchArticles", async ({ limit, offset }) => {
  const response = await fetchArticlesFromServer({ limit, offset });
  return response;
});
