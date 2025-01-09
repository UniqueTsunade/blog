import { AppDispatch } from "@/app/store";
import ArticleForm from "@/features/articleForm";
import { createArticle } from "@/features/articleForm/model/thunks";
import { FormValues } from "@/features/articleForm/ui/ArticleForm";
import { SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";

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
  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const tagList = Object.values(data.article.tagList).filter(Boolean);
    const requestData = {
      article: {
        ...data.article,
        tagList,
      },
    };
    dispatch(createArticle(requestData));
  };

  return (
    <ArticleForm
      legendText="Create new article"
      onSubmit={onSubmit}
      validationRules={validationRules}
    />
  );
};

export default NewArticle;
