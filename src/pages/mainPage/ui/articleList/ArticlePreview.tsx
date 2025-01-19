import styles from "../../styles/ArticlePreview.module.scss";
import ArticleHeader from "@/widgets/articleHeader/ArticleHeader";
import ArticleAuthort from "@/widgets/articleAuthor";
import ArticleTags from "@/widgets/articleTags";
import ArticleDescription from "@/widgets/articleDescription";
import { Article } from "@/shared/lib/types/articleTypes";

interface ArticlePreviewProps {
  article: Article;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  const {
    title,
    favoritesCount,
    favorited,
    tagList,
    description,
    author,
    createdAt,
    slug,
  } = article;

  return (
    <div className={styles.articlePreview}>
      <div className={styles.mainInfo}>
        <ArticleHeader
          articleHeaderClass={styles.header}
          title={title}
          favoritesCount={favoritesCount}
          slug={slug}
          favorited={favorited}
        />
        <ArticleTags
          articleTagsClass={styles.tags}
          articleTagClass={styles.tag}
          secondsTagClass={styles.someTag}
          tagList={tagList}
        />
        <ArticleDescription
          articleTextClass={styles.descriptionText}
          description={description}
        />
      </div>
      <ArticleAuthort
        username={author.username}
        image={author.image}
        createdAt={createdAt}
      />
    </div>
  );
};

export default ArticlePreview;
