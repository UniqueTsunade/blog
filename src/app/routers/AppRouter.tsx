import MainPage from "@/pages/mainPage";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import FullTextArticle from "@/pages/fullTextArticle/ui/FullTextArticle";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/article/:slug" element={<FullTextArticle />} />
        <Route path="/sign-in" element={<Layout />} />
        <Route path="/sign-up" element={<Layout />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

