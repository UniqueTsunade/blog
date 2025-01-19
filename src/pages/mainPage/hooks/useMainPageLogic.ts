import { setCurrentPage } from "@/entities/articlePreview/model/articlesSlice";
import { fetchArticle } from "@/entities/articlePreview/model/articlesThunk";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import { RootState } from "@/shared/lib/store/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useMainPageLogic = () => {
  const { articlesCount } = useSelector(
    (state: RootState) => state.articles);
  const { currentPage, offset, limit } = useSelector(
    (state: RootState) => state.articles
  );
  const dispatch = useAppDispatch();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    const promise = dispatch(fetchArticle({ limit, offset }));

    return () => {
      promise.abort();
    };
  }, [currentPage, dispatch, limit, offset]);

  return { articlesCount, limit, currentPage, handlePageChange };
};
