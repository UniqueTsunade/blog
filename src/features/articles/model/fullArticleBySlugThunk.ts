import { createAsyncThunk } from "@reduxjs/toolkit";
import { FullArticle } from "./types";
import { fetchArticleBySlug } from "../api/articleBySlug";


export const fetchFullArticleBySlug = createAsyncThunk<FullArticle, string>(
    'articles/fetchFullArticleBySlug',
    async (slug) => {
      console.log('Fetching article by slug:', slug); // Добавьте это для отладки
      const response = await fetchArticleBySlug(slug);
      return response;
    }
  );