import { Status } from "@/features/articles/model/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createArticle, updateArticle } from "./thunks";
import { ServerError } from "./types";

export interface articleFormState {
  status: Status;
  error: string | null;
  isArticleSubmitted: boolean;
  isArticleUpdated: boolean;
}

const initialState: articleFormState = {
  status: Status.IDLE,
  error: null,
  isArticleSubmitted: false,
  isArticleUpdated: false
};

export const articleFormSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    resetArticleSubmitted: (state) => {
      state.isArticleSubmitted = false;
    },
    resetArticleUpdated: (state) => {
      state.isArticleUpdated = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createArticle.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
        state.isArticleSubmitted = false;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.isArticleSubmitted = true;
      })
      .addCase(
        createArticle.rejected,
        (state, action: PayloadAction<ServerError | undefined>) => {
          state.status = Status.ERROR;
          state.isArticleSubmitted = false;
          state.error =
            action.payload?.message || "An unexpected error occurred";
        }
      )
      .addCase(updateArticle.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
        state.isArticleUpdated = false;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.isArticleUpdated = true;
      })
      .addCase(
        updateArticle.rejected,
        (state, action: PayloadAction<ServerError | undefined>) => {
          state.status = Status.ERROR;
          state.isArticleUpdated = false;
          state.error =
            action.payload?.message || "An unexpected error occurred";
        }
      )
  },
});

export const { resetArticleSubmitted, resetArticleUpdated } = articleFormSlice.actions;
export default articleFormSlice.reducer;
