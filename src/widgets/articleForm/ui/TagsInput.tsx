import styles from "../styles/ArticleForm.module.scss";
import TagForm from "./TagForm";

interface TagsInputProps {
    tags: string[];
    onRemove: (id: string) => void;
    onChange: (id: string, value: string) => void;
  }

const TagsInput: React.FC<TagsInputProps> = ({ tags, onRemove, onChange }) => (
  <div className={styles.tagsContainer}>
    {tags.map((id) => (
      <TagForm
        key={id}
        id={id}
        onRemove={() => onRemove(id)}
        onChange={(value) => onChange(id, value)}
      />
    ))}
  </div>
);

export default TagsInput;
