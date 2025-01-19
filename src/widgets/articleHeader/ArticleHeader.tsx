import styles from "./ArticleHeader.module.scss";
import LikeIcon from "@/shared/assets/icons/Vector.svg";
import FavoritedIcon from "@/shared/assets/icons/RedVector.svg";
import { Link } from "react-router-dom";
import { hideText } from "@/shared/utils/textUtils";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import { toggleFavoriteArticle } from "@/shared/model/articleEvaluation";

interface ArticleHeaderProps {
  title?: string | null;
  favoritesCount?: number;
  slug?: string;
  articleHeaderClass?: string;
  favorited: boolean;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title = "Blank article",
  favoritesCount = 0,
  slug,
  articleHeaderClass,
  favorited,
}) => {
  if (!title || title.trim() === "") {
    title = "Blank article";
  }

  const articleTitle = hideText(title, 350, "20px Inter, sans-serif");
  const dispatch = useAppDispatch();

  const handleFavoriteClick = () => {
    if (!slug) {
      return;
    }
    dispatch(toggleFavoriteArticle(slug));
  };

  const renderedTitle = slug ? (
    <Link to={`/article/${slug}`}>
      <h5 className={styles.title}>{articleTitle}</h5>
    </Link>
  ) : (
    <h5 className={styles.fullTitle}>{title}</h5>
  );

  return (
    <div className={articleHeaderClass}>
      {renderedTitle}
      <div className={styles.btnsLikeContainer}>
        <button>
          {!favorited ? (
            <LikeIcon onClick={handleFavoriteClick} className={styles.btn} />
          ) : (
            <FavoritedIcon
              onClick={handleFavoriteClick}
              className={styles.favoritedBtn}
            />
          )}
        </button>
        <span>{favoritesCount}</span>
      </div>
    </div>
  );
};
export default ArticleHeader;
