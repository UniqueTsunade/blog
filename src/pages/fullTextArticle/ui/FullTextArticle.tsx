import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/app/store";
import { getArticleBySlug } from "@/features/articles/model/getArticleBySlugThunk";
import { useSelector } from "react-redux";
import styles from "./FullTextArticle.module.scss";

import ArticleHeader from "@/shared/ui/articleHeader/ArticleHeader";
import ArticleDescription from "@/shared/ui/articleDescription";
import ArticleTags from "@/shared/ui/articleTags";
import ArticleAuthort from "@/shared/ui/articleAuthor";
import ArticleBody from "@/shared/ui/articleBody";

const FullTextArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { fullArticle } = useSelector((state: RootState) => state.articles);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (slug) {
      dispatch(getArticleBySlug(slug));
    }
  }, [slug, dispatch]);

  console.log("fullArticle:", fullArticle)

  if (!fullArticle) {
    return <div>Loading...</div>; 
  }
  

  return (
    <div className={styles.fullArticle}>
      <div className={styles.topPart}>
        <div>
          <ArticleHeader
            articleHeaderClass={styles.topPart}
            title={fullArticle.title}
            favoritesCount={fullArticle.favoritesCount}
          />
          <ArticleTags tagList={fullArticle.tagList} />
          <ArticleDescription description={fullArticle.description} />
        </div>
        <ArticleAuthort
          username={fullArticle.author.username}
          image={fullArticle.author.image}
          createdAt={fullArticle.createdAt}
        />
      </div>
      <ArticleBody body={fullArticle.body} />
    </div>
  );
};

export default FullTextArticle;
