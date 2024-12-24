import { hideText } from "@/shared/lib/textUtils";
import styles from "./ArticleDescription.module.scss";

interface ArticleDescriptionProps {
  description: string;
}

const ArticleDescription: React.FC<ArticleDescriptionProps> = ({
  description,
}) => {

  if (!description) {
    return null;
  };

  const descriptionText = hideText(description, 682, "12px Inter, sans-serif")

  return (
    <div className={styles.articleDescription}>
      <p className={styles.articleText}>{descriptionText}</p>
    </div>
  );
};

export default ArticleDescription;
