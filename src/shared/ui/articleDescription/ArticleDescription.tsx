import styles from "./ArticleDescription.module.scss";

interface ArticleDescriptionProps {
  description: string;
}

const ArticleDescription: React.FC<ArticleDescriptionProps> = ({
  description,
}) => {
  return (
    <div>
      <p className={styles.articleText}>{description}</p>
    </div>
  );
};

export default ArticleDescription;
