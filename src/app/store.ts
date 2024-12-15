import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "../features/articles/model/articlesSlice";
import paginationSlice from "@/features/pagination/model/paginationSlice";

export const store = configureStore({
  reducer: {
    articles: articlesSlice,
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
