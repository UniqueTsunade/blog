import styles from "./ArticleHeader.module.scss";
import LikeIcon from "../../assets/icons/Vector.svg";
import { Link } from "react-router-dom";

interface ArticleHeaderProps {
  title: string;
  favoritesCount: number;
  slug?: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  favoritesCount,
  slug,
}) => {
  return (
    <div className={styles.header}>
      {slug ? (
        <Link to={`/article/${slug}`}>
          <h5 className={styles.title}>{title}</h5>
        </Link>
      ) : (
        <h5 className={styles.title}>{title}</h5>
      )}
      <button>
        <LikeIcon className={styles.btnLike} />
      </button>
      <span>{favoritesCount}</span>
    </div>
  );
};
export default ArticleHeader;
