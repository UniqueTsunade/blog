import styles from "./ArticleTags.module.scss";
import { v4 as uuidv4 } from "uuid";


interface ArticleTagsProps {
  tagList: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tagList }) => {
  if (!tagList || !Array.isArray(tagList)) {
    return null;
  }

  const filteredTagList = tagList.filter((tag) => {
    return tag !== null && tag !== undefined && tag.trim() !== "";
  });

  return (
    <div className={styles.tags} >
      {filteredTagList.map((tag) => (
        <div key={uuidv4()} className={styles.tag}>
          {tag}
        </div>
      ))}
    </div>
  );
};



export default ArticleTags;
