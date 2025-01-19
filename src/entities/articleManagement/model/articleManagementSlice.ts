import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createArticleThunk,
  deleteArticleThunk,
  updateArticleThunk,
} from "./thunks";
import { Status } from "@/shared/lib/types/sliceTypes";
import { CustomServerError, ServerError } from "./types";
import { handleError } from "@/shared/utils/handleCustomError";

export interface ArticleManagementState {
  status: Status;
  error: string | null;
  isArticleSubmitted: boolean;
  isArticleUpdated: boolean;
}

const initialState: ArticleManagementState = {
  status: Status.IDLE,
  error: null,
  isArticleSubmitted: false,
  isArticleUpdated: false,
};

export const articleManagement = createSlice({
  name: "articleManagement",
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
      .addCase(createArticleThunk.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
        state.isArticleSubmitted = false;
      })
      .addCase(createArticleThunk.fulfilled, (state) => {
        state.status = Status.SUCCESS;
        state.isArticleSubmitted = true;
      })
      .addCase(
        createArticleThunk.rejected,
        (state, action: PayloadAction<ServerError | undefined>) => {
          state.status = Status.ERROR;
          state.isArticleSubmitted = false;
          state.error =
            action.payload?.message || "An unexpected error occurred";
        }
      )
      .addCase(updateArticleThunk.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
        state.isArticleUpdated = false;
      })
      .addCase(updateArticleThunk.fulfilled, (state) => {
        state.status = Status.SUCCESS;
        state.isArticleUpdated = true;
      })
      .addCase(
        updateArticleThunk.rejected,
        (state, action: PayloadAction<ServerError | undefined>) => {
          state.status = Status.ERROR;
          state.isArticleUpdated = false;
          state.error =
            action.payload?.message || "An unexpected error occurred";
        }
      )
      .addCase(deleteArticleThunk.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(deleteArticleThunk.fulfilled, (state) => {
        state.status = Status.SUCCESS;
      })
      .addCase(
        deleteArticleThunk.rejected,
        (state, action: PayloadAction<CustomServerError | undefined>) => {
          state.status = Status.ERROR;
          state.error = handleError(action, "Failed to delete articles");
        }
      );
  },
});

export const { resetArticleSubmitted, resetArticleUpdated } =
  articleManagement.actions;
export default articleManagement.reducer;
