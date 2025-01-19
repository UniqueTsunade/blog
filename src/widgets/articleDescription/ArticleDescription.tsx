import { hideText } from "@/shared/utils/textUtils";

interface ArticleDescriptionProps {
  description: string;
  isFullArticle?: boolean;
  articleTextClass?: string;
}

const ArticleDescription: React.FC<ArticleDescriptionProps> = ({
  description,
  isFullArticle = false,
  articleTextClass,
}) => {
  if (!description) {
    return null;
  }

  const descriptionText = hideText(description, 682, "12px Inter, sans-serif");

  return (
    <div>
      <p className={articleTextClass}>
        {isFullArticle ? description : descriptionText}
      </p>
    </div>
  );
};

export default ArticleDescription;
