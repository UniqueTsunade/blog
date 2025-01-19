import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchArticle } from "@/entities/articlePreview/model/articlesThunk";
import { handleError } from "@/shared/utils/handleCustomError";
import { Status } from "@/shared/lib/types/sliceTypes";
import { ArticlesResponse, ArticlesState, CustomServerError } from "./types";
import { ArticleEvaluationResponse } from "@/shared/lib/types/articleTypes";
import { favoriteArticle, unfavoriteArticle } from "@/shared/model/articleEvaluation";


const initialState: ArticlesState = {
  status: Status.IDLE,
  error: null,
  currentPage: 1,
  currentArticles: [],
  offset: 0,
  limit: 5,
  isLoading: false,
  articlesCount: 0,
};

export const articles = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.offset = (state.currentPage - 1) * state.limit;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.status = Status.LOADING;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchArticle.fulfilled,
        (state, action: PayloadAction<ArticlesResponse>) => {
          state.status = Status.SUCCESS;
          state.currentArticles = action.payload.articles;
          state.articlesCount = action.payload.articlesCount;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchArticle.rejected,
        (state, action: PayloadAction<CustomServerError | undefined>) => {
          state.status = Status.ERROR;
          state.error = handleError(action, "Failed to fetch articles");
          state.isLoading = false;
        }
      )
      .addCase(favoriteArticle.pending, (state) => {
        state.status = Status.LOADING;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        favoriteArticle.fulfilled,
        (state, action: PayloadAction<ArticleEvaluationResponse>) => {
          state.status = Status.SUCCESS;
          const updatedArticle = action.payload.article;
          state.currentArticles = state.currentArticles.map((article) =>
            article.slug === updatedArticle.slug ? updatedArticle : article
          );
          state.isLoading = false;
        }
      )
      .addCase(
        favoriteArticle.rejected,
        (state, action: PayloadAction<CustomServerError | undefined>) => {
          state.status = Status.ERROR;
          state.error = handleError(
            action,
            "Failed attempt to add article to favorites"
          );
          state.isLoading = false;
        }
      )
      .addCase(unfavoriteArticle.pending, (state) => {
        state.status = Status.LOADING;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        unfavoriteArticle.fulfilled,
        (state, action: PayloadAction<ArticleEvaluationResponse>) => {
          state.status = Status.SUCCESS;
          const updatedArticle = action.payload.article;
          state.currentArticles = state.currentArticles.map((article) =>
            article.slug === updatedArticle.slug ? updatedArticle : article
          );
          state.isLoading = false;
        }
      )
      .addCase(
        unfavoriteArticle.rejected,
        (state, action: PayloadAction<CustomServerError | undefined>) => {
          state.status = Status.ERROR;
          state.error = handleError(
            action,
            "Failed attempt to add article to unfavorites"
          );
          state.isLoading = false;
        }
      );
  },
});

export const { setCurrentPage } = articles.actions;
export default articles.reducer;
