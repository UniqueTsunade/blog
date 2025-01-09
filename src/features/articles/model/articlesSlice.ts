import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { Article, ArticlesResponse, FullArticle } from "./types";
import { fetchArticle } from "./articlesThunk";
import { Status } from "./types";
import { getArticleBySlug } from "./articleBySlugThunk";
import { handleCustomError } from "@/entities/articles/lib/handleCustomError";
import { deleteArticle } from "./deleteArticle";

export interface ArticlesSliceState {
  status: Status;
  fullArticle: Article | null;
  error: string | null;
  articlesCount: number;
  isLoading: boolean;
}

const initialState: ArticlesSliceState = {
  status: Status.IDLE,
  fullArticle: null,
  error: null,
  articlesCount: 0,
  isLoading: false,
};

export const articlesSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        fetchArticle.fulfilled,
        (state, action: PayloadAction<ArticlesResponse>) => {
          state.status = Status.SUCCESS;
          state.articlesCount = action.payload.articlesCount;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchArticle.rejected,
        (
          state,
          action: PayloadAction<unknown, string, unknown, SerializedError>
        ) => {
          state.status = Status.ERROR;
          state.error =
            handleCustomError(action.payload) ||
            action.error.message ||
            "Failed to fetch articles";
          console.error("Error fetching articles:", action.payload);
          state.isLoading = false;
        }
      )
      .addCase(getArticleBySlug.pending, (state) => {
        state.isLoading = true;
        state.status = Status.LOADING;
      })
      .addCase(
        getArticleBySlug.fulfilled,
        (state, action: PayloadAction<FullArticle>) => {
          state.status = Status.SUCCESS;
          state.fullArticle = action.payload.article;
          state.isLoading = false;
        }
      )
      .addCase(
        getArticleBySlug.rejected,
        (
          state,
          action: PayloadAction<unknown, string, unknown, SerializedError>
        ) => {
          state.status = Status.ERROR;
          state.error =
            handleCustomError(action.payload) ||
            action.error.message ||
            "Failed to fetch articles";
          console.error("Error fetching articles:", action.payload);
          state.isLoading = false;
        }
      )
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
        state.status = Status.LOADING;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = Status.SUCCESS;
        state.isLoading = false;
      })
      .addCase(
        deleteArticle.rejected,
        (
          state,
          action: PayloadAction<unknown, string, unknown, SerializedError>
        ) => {
          state.status = Status.ERROR;
          state.error =
            handleCustomError(action.payload) ||
            action.error.message ||
            "Failed to fetch articles";
          console.error("Error fetching articles:", action.payload);
          state.isLoading = false;
        }
      );
  },
});

export default articlesSlice.reducer;
