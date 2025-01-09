import { RootState } from "@/app/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/app/store";
import { resetFormSubmitted } from "@/features/signIn/model/signInSlice";
import {
  resetArticleSubmitted,
  resetArticleUpdated,
} from "@/features/articleForm/model/slice";

const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isAuthorized, isFormSubmitted } = useSelector(
    (state: RootState) => state.signIn
  );
  const { isArticleSubmitted, isArticleUpdated } = useSelector(
    (state: RootState) => state.createArticle
  );

  useEffect(() => {
    if (isAuthorized && isFormSubmitted) {
      navigate("/");
      dispatch(resetFormSubmitted());
    }
  }, [isAuthorized, isFormSubmitted, navigate, dispatch]);

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

export default AuthRedirect;
