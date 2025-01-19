import { v4 as uuidv4 } from "uuid";

interface ArticleTagsProps {
  tagList: string[];
  articleTagsClass?: string;
  articleTagClass?: string;
  secondsTagClass?: string;
}

const ArticleTags: React.FC<ArticleTagsProps> = ({
  tagList,
  articleTagsClass,
  articleTagClass,
  secondsTagClass
}) => {
  if (!tagList || !Array.isArray(tagList)) {
    return null;
  }

  const filteredTagList = tagList.filter((tag) => {
    return tag !== null && tag !== undefined && tag.trim() !== "";
  });

  return (
    <div className={articleTagsClass}>
      {filteredTagList.map((tag, index) => (
        <div key={uuidv4()} className={index > 0 ? secondsTagClass : articleTagClass}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default ArticleTags;
