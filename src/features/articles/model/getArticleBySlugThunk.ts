import { createAsyncThunk } from "@reduxjs/toolkit";
import { FullArticle } from "./types";
import { fetchArticleBySlug } from "../api/articleBySlug";
import axios from "axios";

export const getArticleBySlug = createAsyncThunk<FullArticle, string>(
  'articles/getArticleBySlug',
  async (slug) => {
    try {
      const response = await fetchArticleBySlug(slug);
      return response;
    } 
    catch(error) {
        if (axios.isCancel(error)) {
          console.error("Request canceled:", error.message);
          return;
        }
        throw error;
    }
  }
)