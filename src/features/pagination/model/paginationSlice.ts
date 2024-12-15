import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "@/features/articles/model/types";
import { fetchArticle } from "@/features/articles/model/articlesThunk";

interface PaginationState {
  currentPage: number;
  currentArticles: Article[];
  isLoading: boolean;
  error: string | null; 
  offset: number;
  limit: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  currentArticles: [],
  isLoading: false,
  error: null,
  offset: 0,
  limit: 5,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.offset = (state.currentPage - 1) * state.limit; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentArticles = action.payload.articles; 
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Failed to fetch articles";
        console.error("Error fetching articles:", action.payload);
      });
  },
});

export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
