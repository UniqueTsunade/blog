import styles from "./ArticleTags.module.scss";
import { v4 as uuidv4 } from "uuid";


interface ArticleTagsProps {
  tagList: string[];
  articleTagsClass?: string;
  articleTagClass?: string;
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tagList, articleTagsClass, articleTagClass }) => {
  if (!tagList || !Array.isArray(tagList)) {
    console.log("no taglist")
    return null;
  }

  const filteredTagList = tagList.filter((tag) => {
    return tag !== null && tag !== undefined && tag.trim() !== "";
  });

  console.log("tagList: ",tagList)

  return (
    <div className={articleTagsClass} >
      {filteredTagList.map((tag) => (
        <div key={uuidv4()} className={articleTagClass}>
          {tag}
        </div>
      ))}
    </div>
  );
};



export default ArticleTags;
