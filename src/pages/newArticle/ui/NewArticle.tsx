import { createArticleThunk } from "@/entities/articleManagement";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import ArticleForm from "@/widgets/articleForm";
import { FormValues } from "@/widgets/articleForm/ui/ArticleForm";
import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";

const validationRules = {
  title: {
    required: "Title is required",
  },
  description: {
    required: "Short description is required",
  },
  body: {
    required: "Text is required",
  },
};

const NewArticle = () => {
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = useCallback((data) => {
    const tagList = Object.values(data.article.tagList).filter(Boolean);
    const requestData = {
      article: {
        ...data.article,
        tagList,
      },
    };
    dispatch(createArticleThunk(requestData));
  }, [dispatch, createArticleThunk]);

  return (
    <ArticleForm
      legendText="Create new article"
      onSubmit={onSubmit}
      validationRules={validationRules}
    />
  );
};

export default NewArticle;
