import ArticleList from "@/entities/articleList";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchArticle } from "@/features/articles/model/articlesThunk";
import { AppDispatch } from "@/app/store";
import { setCurrentPage } from "@/features/pagination/model/paginationSlice";
import PaginationArticles from "@/features/pagination/ui";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  const { articlesCount } = useSelector(
    (state: RootState) => state.articles
  );
  const { currentPage, offset, limit } = useSelector(
    (state: RootState) => state.pagination
  );
  const dispatch: AppDispatch = useDispatch();


  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    dispatch(fetchArticle({ limit, offset }));
  }, [currentPage, limit, offset, dispatch]);


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
