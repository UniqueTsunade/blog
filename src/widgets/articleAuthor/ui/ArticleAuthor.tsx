import { getDateArticleCreation } from "../lib/formatDate";
import styles from "./ArticleAuthor.module.scss";

interface ArticleAuthortProps {
  username: string;
  image: string;
  createdAt: string;
}

const ArticleAuthort: React.FC<ArticleAuthortProps> = ({
  username,
  image,
  createdAt,
}) => {
  if (!username || !image || !createdAt) {
    return null;
  }

  const formattedDate = getDateArticleCreation(createdAt);

  return (
    <>
      <div className={styles.articleData}>
        <h6 className={styles.authorName}>{username}</h6>
        <p className={styles.articleDate}>{formattedDate}</p>
      </div>
      <div>
        <img className={styles.authorProfile} src={image} alt="Profile" />
      </div>
    </>
  );
};

export default ArticleAuthort;
