import { updateArticleThunk } from "@/entities/articleManagement";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import ArticleForm from "@/widgets/articleForm";
import { FormValues } from "@/widgets/articleForm/ui/ArticleForm";
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";

const validationRules = {};

const UpdateArticle = () => {
  const dispatch = useAppDispatch();
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
    
    dispatch(updateArticleThunk(requestData));
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
