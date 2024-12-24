import styles from "../styles/ArticlePreview.module.scss";

import { Article } from "@/features/articles/model/types";

import ArticleHeader from "@/shared/ui/articleHeader/ArticleHeader";
import ArticleAuthort from "@/shared/ui/articleAuthor";
import ArticleTags from "@/shared/ui/articleTags";
import ArticleDescription from "@/shared/ui/articleDescription";

interface ArticlePreviewProps {
  article: Article;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  const {
    title,
    favoritesCount,
    tagList,
    description,
    author,
    createdAt,
    slug,
  } = article;



  return (
    <div className={styles.articlePreview}>
      <div className={styles.mainInfo}>
        <ArticleHeader articleHeaderClass={styles.header} title={title} favoritesCount={favoritesCount} slug={slug} />
        <ArticleTags tagList={tagList} />
        <ArticleDescription description={description} />
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
