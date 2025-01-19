import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getArticleBySlug } from "./articleBySlugThunk";
import { handleError } from "@/shared/utils/handleCustomError";
import { Status } from "@/shared/lib/types/sliceTypes";
import { ArticlesBySlugState, CustomServerError } from "./types";
import {
  ArticleEvaluationResponse,
  FullArticle,
} from "@/shared/lib/types/articleTypes";
import {
  favoriteArticle,
  unfavoriteArticle,
} from "@/shared/model/articleEvaluation";

const initialState: ArticlesBySlugState = {
  status: Status.IDLE,
  fullArticle: null,
  currentPage: 1,
  error: null,
  offset: 0,
  limit: 5,
  isLoading: false,
};

export const articlesBySlug = createSlice({
  name: "articlesBySlug",
  initialState,
  reducers: {
    updateFullArticle: (state, action: PayloadAction<FullArticle>) => {
      state.fullArticle = action.payload.article;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticleBySlug.pending, (state) => {
        state.status = Status.LOADING;
        state.isLoading = true;
        state.error = null;
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
        (state, action: PayloadAction<CustomServerError | undefined>) => {
          state.status = Status.ERROR;
          state.error = handleError(action, "Failed to get an article");
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
          state.fullArticle = action.payload.article;
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
          state.fullArticle = action.payload.article;
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

export const { updateFullArticle } = articlesBySlug.actions;
export default articlesBySlug.reducer;
