import styles from "./ArticlePreview.module.scss";

import { Article } from "@/features/articles/model/types";

import ArticleHeader from "../articleHeader/ArticleHeader";
import ArticleAuthort from "../articleAuthor";
import ArticleTags from "../articleTags";
import ArticleDescription from "../articleDescription";

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
        <ArticleHeader title={title} favoritesCount={favoritesCount} slug={slug} />
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
