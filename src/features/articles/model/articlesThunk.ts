import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticlesResponse, FetchArticlesParams } from "./types";
import { fetchArticlesFromServer } from "../api/articlesApi";
import axios from "axios";

export const fetchArticle = createAsyncThunk<
  ArticlesResponse,
  FetchArticlesParams
>("articles/fetchArticles", async (params, { signal }) => {
  try {
    const response = await fetchArticlesFromServer({ ...params, signal });
    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      return;
    }
    throw error;
  }
});