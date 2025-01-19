import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../lib/store/types";
import { CustomServerError } from "./types";
import { ArticleEvaluationResponse } from "../lib/types/articleTypes";

export const favoriteArticle = createAsyncThunk<
  ArticleEvaluationResponse,
  string,
  { rejectValue: CustomServerError }
>(
  "favoriteArticle/pickFavoriteArticle",
  async (slug: string, { rejectWithValue }) => {
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
      const response = await axios.post<ArticleEvaluationResponse>(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        {},
        { headers }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as CustomServerError);
      }
      throw error;
    }
  }
);

export const unfavoriteArticle = createAsyncThunk<
  ArticleEvaluationResponse,
  string,
  { rejectValue: CustomServerError }
>(
  "unfavoriteArticle/pickUnfavoriteArticle",
  async (slug: string, { rejectWithValue }) => {
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
      const response = await axios.delete<ArticleEvaluationResponse>(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        { headers }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as CustomServerError);
      }
      throw error;
    }
  }
);

export const toggleFavoriteArticle = createAsyncThunk<
  ArticleEvaluationResponse,
  string,
  { rejectValue: CustomServerError }
>(
  "toggleFavoriteArticle",
  async (slug: string, { dispatch, getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const article = state.articles.currentArticles.find(
      (article) => article.slug === slug
    );

    if (!article) {
      return rejectWithValue({
        errors: { body: ["Article not found"] },
      });
    }

    try {
      const favoriteResult = await dispatch(favoriteArticle(slug)).unwrap();
      if (favoriteResult.article.favoritesCount === article.favoritesCount) {
        const unfavoriteResult = await dispatch(
          unfavoriteArticle(slug)
        ).unwrap();
        return unfavoriteResult;
      }

      return favoriteResult;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as CustomServerError);
      }
      throw error;
    }
  }
);
