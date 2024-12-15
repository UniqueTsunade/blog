import styles from "./ArticleTags.module.scss";
import { v4 as uuidv4 } from "uuid";

interface ArticleTagsProps {
    tagList: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({tagList}) => {
    return (
        <div className={styles.tags}>
        {tagList.map((tag) => (
            <div key={uuidv4()} className={styles.tag}>
              {tag}
            </div>
          ))}
          </div>
    )
}

export default ArticleTags;