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
    return null; // Если какой-либо из параметров отсутствует, возвращаем null
  }

  const getDateArticleCreation = (date: string) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    const month = newDate.toLocaleString("en-US", options);
    const dateNum = newDate.getDate();
    const year = newDate.getFullYear();
    const dateArticleCreation = `${month} ${dateNum}, ${year}`;
    return dateArticleCreation;
  };

  getDateArticleCreation(createdAt);

  return (
    <>
      <div className={styles.articleData}>
        <h6 className={styles.authorName}>{username}</h6>
        <p className={styles.articleDate}>
          {getDateArticleCreation(createdAt)}
        </p>
      </div>
      <div>
        <img className={styles.authorProfile} src={image} alt="Profile" />
      </div>
    </>
  );
};

export default ArticleAuthort;
