import Button from "@/shared/ui/button";
import styles from "./styles/TagForm.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface TagFormProps {
    id: string;
    onRemove?: () => void;
    disabled?: boolean;
    onChange?: (value: string) => void;
    register?: UseFormRegisterReturn; 
}

const TagForm: React.FC<TagFormProps> = ({ id, onRemove, disabled, onChange, register }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value); 
    }
  };

  return (
    <div className={styles.tagForm} id={id.toString()}>
      <input
        className={styles.tagInput}
        type="text"
        placeholder="Tag"
        onChange={handleChange} 
        {...(register || {})} 
      />
      <Button
        btnText="Delete"
        type="button"
        btnClassName={styles.deleteTagBtn}
        handleClick={onRemove || (() => {})}
        disabled={disabled}
      />
    </div>
  );
};


export default TagForm;
