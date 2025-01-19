import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleBySlug } from "@/entities/articleBySlug/model/articleBySlugThunk";
import { useSelector } from "react-redux";
import styles from "../styles/FullTextArticle.module.scss";
import AuthorizedDescription from "./AuthorizedDescription";
import ArticleHeader from "@/widgets/articleHeader/ArticleHeader";
import ArticleDescription from "@/widgets/articleDescription";
import ArticleTags from "@/widgets/articleTags";
import ArticleAuthort from "@/widgets/articleAuthor";
import ArticleBody from "./ArticleBody";
import Skeleton from "./Skeleton";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import { RootState } from "@/shared/lib/store/types";

const FullTextArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { fullArticle } = useSelector(
    (state: RootState) => state.articlesBySlug
  );
  const { isAuthorized } = useSelector((state: RootState) => state.signIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (slug) {
      dispatch(getArticleBySlug(slug));
    }
  }, [slug, dispatch]);

  if (!fullArticle) {
    return <Skeleton />;
  }

  return (
    <div className={styles.fullArticle}>
      <div className={styles.topPart}>
        <div>
          <ArticleHeader
            articleHeaderClass={styles.header}
            title={fullArticle.title}
            favoritesCount={fullArticle.favoritesCount}
            slug={slug}
            favorited={fullArticle.favorited}
          />
          <ArticleTags
            articleTagsClass={styles.tags}
            articleTagClass={styles.tag}
            secondsTagClass={styles.someTag}
            tagList={fullArticle.tagList}
          />
        </div>
        <ArticleAuthort
          username={fullArticle.author.username}
          image={fullArticle.author.image}
          createdAt={fullArticle.createdAt}
        />
      </div>
      {isAuthorized ? (
        <AuthorizedDescription
          slug={slug}
          description={fullArticle.description}
        />
      ) : (
        <ArticleDescription
          articleTextClass={styles.text}
          isFullArticle={true}
          description={fullArticle.description}
        />
      )}
      <ArticleBody body={fullArticle.body} />
    </div>
  );
};

export default FullTextArticle;
