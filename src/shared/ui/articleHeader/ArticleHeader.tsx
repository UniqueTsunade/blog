import styles from "./ArticleHeader.module.scss";
import LikeIcon from "../../assets/icons/Vector.svg";
import { Link } from "react-router-dom";
import { hideText } from "@/shared/lib/textUtils";

interface ArticleHeaderProps {
  title?: string | null;
  favoritesCount?: number;
  slug?: string;
  articleHeaderClass?: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title = "Blank article",
  favoritesCount = 0,
  slug,
  articleHeaderClass,
}) => {
  if (!title || title.trim() === "") {
    title = "Blank article";
  }

  const articleTitle = hideText(title, 350, "20px Inter, sans-serif");

  return (
    <div className={articleHeaderClass}>
      {slug ? (
        <Link to={`/article/${slug}`}>
          <h5 className={styles.title}>{articleTitle}</h5>
        </Link>
      ) : (
        <h5 className={styles.fullTitle}>{title}</h5>
      )}
      <div className={styles.btnsLikeContainer}>
        <button>
          <LikeIcon className={styles.btnLike} />
        </button>
        <span>{favoritesCount}</span>
      </div>
    </div>
  );
};
export default ArticleHeader;
