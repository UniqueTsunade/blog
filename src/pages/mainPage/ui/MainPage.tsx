import ArticleList from "./articleList";
import PaginationArticles from "./PaginationArticles";
import { useMainPageLogic } from "../hooks/useMainPageLogic";

const MainPage = () => {
  const { articlesCount, limit, currentPage, handlePageChange } =
    useMainPageLogic();

  return (
    <div>
      <ArticleList />
      <PaginationArticles
        count={Math.ceil(articlesCount / limit)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default MainPage;
