import { configureStore } from "@reduxjs/toolkit";
import signUpUser from "@/entities/signUp/model/signUpSlice";
import signInUser from "@/entities/signIn/model/signInSlice";
import articleManagement from "@/entities/articleManagement/model/articleManagementSlice";
import articlesBySlug from "@/entities/articleBySlug/model/articleBySlugSlice";
import articles from "@/entities/articlePreview/model/articlesSlice";
import updateUserProfile from "@/entities/userUpdate/model/updateUserSlice";

export const store = configureStore({
  reducer: {
    articles,
    articlesBySlug,
    signUp: signUpUser,
    signIn: signInUser,
    updateUserProfile,
    articleManagement,
  },
});
