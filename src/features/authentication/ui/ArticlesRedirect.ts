import {
  resetArticleSubmitted,
  resetArticleUpdated,
} from "@/entities/articleManagement/model/articleManagementSlice";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import { RootState } from "@/shared/lib/store/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ArticlesRedirect: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isArticleSubmitted, isArticleUpdated } = useSelector(
    (state: RootState) => state.articleManagement
  );

  useEffect(() => {
    if (isArticleSubmitted || isArticleUpdated) {
      navigate("/");
      dispatch(resetArticleSubmitted());
    }
  }, [isArticleSubmitted, navigate, dispatch]);

  useEffect(() => {
    if (isArticleUpdated) {
      navigate("/");
      dispatch(resetArticleUpdated());
    }
  }, [isArticleUpdated, navigate, dispatch]);

  return null;
};
