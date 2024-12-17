
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import FullTextArticle from "@/pages/fullTextArticle/ui/FullTextArticle";
import SignUpPage from "@/pages/signUpPage";
import SignInPage from "@/pages/signInPage";
import MainPage from "@/pages/mainPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/article/:slug" element={<FullTextArticle />} /> 
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

