import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article, ArticlesResponse, FullArticle } from "./types";
import { fetchArticle } from "./articlesThunk";
import { Status } from "./types";
import { fetchFullArticleBySlug } from "./fullArticleBySlugThunk";

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
  isLoading: true,
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
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = (action.payload as string) || "Failed to fetch articles";
        console.error("Error fetching articles:", action.payload);
        state.isLoading = false;
      })
      .addCase(fetchFullArticleBySlug.pending, (state) => {
        state.isLoading = true;
        state.status = Status.LOADING;
      })
      .addCase(
        fetchFullArticleBySlug.fulfilled,
        (state, action: PayloadAction<FullArticle>) => {
          state.status = Status.SUCCESS;
          state.fullArticle = action.payload.article;
          state.isLoading = false;
        }
      )
      .addCase(fetchFullArticleBySlug.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = (action.payload as string) || "Failed to fetch articles";
        console.error("Error fetching articles:", action.payload);
        state.isLoading = false;
      });
  },
});

export default articlesSlice.reducer;
