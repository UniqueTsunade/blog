import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "../features/articles/model/articlesSlice";
import paginationSlice from "@/features/pagination/model/paginationSlice";
import signUpUser from "@/features/signUp/model/signUpSlice";
import signInUser from "@/features/signIn/model/signInSlice";
import editProfile from "@/features/editProfileForm/model/editProfileSlice";
import articleFormSlice from "@/features/articleForm/model/slice";

export const store = configureStore({
  reducer: {
    articles: articlesSlice,
    pagination: paginationSlice,
    signUp: signUpUser,
    signIn: signInUser,
    updateProfile: editProfile,
    createArticle: articleFormSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
