import ArticleForm from "@/features/articleForm";
import { AppDispatch } from "@/app/store";
import { updateArticle } from "@/features/articleForm/model/thunks";
import { FormValues } from "@/features/articleForm/ui/ArticleForm";
import { SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const validationRules = {};

const UpdateArticle = () => {
  const dispatch: AppDispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const tagList = Object.values(data.article.tagList).filter(Boolean);
    const requestData = {
      slug,
      article: {
        ...data.article,
        tagList,
      },
    };
    console.log("requestData: ", requestData);
    dispatch(updateArticle(requestData));
  };

  return (
    <ArticleForm
      legendText="Edit article"
      onSubmit={onSubmit}
      validationRules={validationRules}
    />
  );
};

export default UpdateArticle;
