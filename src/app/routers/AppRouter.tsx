import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import FullTextArticle from "@/pages/fullTextArticle/ui/FullTextArticle";
import SignUpPage from "@/pages/signUpPage";
import SignInPage from "@/pages/signInPage";
import MainPage from "@/pages/mainPage";
import AuthRedirect from "@/features/authentication";
import EditProfile from "@/pages/editProfile";
import NewArticle from "@/pages/newArticle";
import PrivateRoute from "@/shared/ui/privateRoute";
import UpdateArticle from "@/pages/updateArticle";

const AppRouter: React.FC = () => {
  return (
    <>
      <AuthRedirect />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/article/:slug" element={<FullTextArticle />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route
            path="/new-article"
            element={
              <PrivateRoute redirectPath="/sign-in">
                <NewArticle />
              </PrivateRoute>
            }
          />
           <Route path="/articles/:slug/edit" element={<UpdateArticle />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
