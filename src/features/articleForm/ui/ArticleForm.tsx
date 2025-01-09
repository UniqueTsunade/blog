import { useState } from "react";
import Button from "../../../shared/ui/button";
import InputForm from "../../../shared/ui/inputForm";
import styles from "./styles/ArticleForm.module.scss";
import TagForm from "./TagForm";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import ValidationErrorMessage from "@/shared/ui/errorDisplay/validatioErrors";

export interface FormValues {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: Record<string, string>;
  };
}

interface ArticleFormProps {
  legendText: string;
  onSubmit: SubmitHandler<FormValues>;
  validationRules: ValidationRules;
}

interface ValidationRules {
  title?: {
    required?: string;
  };
  description?: {
    required?: string;
  };
  body?: {
    required?: string;
  };
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  legendText,
  onSubmit,
  validationRules,
}) => {
  const [tagKeys, setTagKeys] = useState<string[]>([uuidv4()]);

  const handleAddTag = () => {
    setTagKeys([...tagKeys, uuidv4()]);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRemoveTag = (id: string) => {
    if (tagKeys.length <= 1) {
      return;
    }
    setTagKeys(tagKeys.filter((tagId) => tagId !== id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.newForm}>
        <legend className={styles.legendForm}>{legendText}</legend>
        <InputForm
          htmlFor="newArticleTitle"
          labelText="Title"
          type="text"
          id="newArticleTitle"
          name="title"
          placeholder="Title"
          divClassName={styles.newFormBlock}
          labelClassName={styles.labelForm}
          inputClassName={styles.inputNewForm}
          register={register("article.title", validationRules.title)}
          error={errors.article?.title}
        />
        <InputForm
          htmlFor="newShortDescription"
          labelText="Short description"
          type="text"
          id="newShortDescription"
          name="shortDescription"
          placeholder="Short description"
          divClassName={styles.newFormBlock}
          labelClassName={styles.labelForm}
          inputClassName={styles.inputNewForm}
          register={register(
            "article.description",
            validationRules.description
          )}
          error={errors.article?.description}
        />
        <div className={styles.newFormBlock}>
          <label className={styles.labelForm} htmlFor="newArticleText">
            Text
          </label>
          <textarea
            className={`${styles.textareaNewForm} ${
              errors.article?.body ? styles.errorBorder : ""
            }`}
            name="newArticleText"
            id="newArticleText"
            placeholder="Text"
            style={{ borderColor: errors.article?.body ? "#F5222D" : "" }}
            {...register("article.body", validationRules.body)}
          ></textarea>
          {errors && <ValidationErrorMessage error={errors.article?.body} />}
        </div>
        <div className={styles.tagsBlock}>
          <p className={styles.labelForm}>Tags</p>
          <div className={styles.tagsContainer}>
            {tagKeys.map((id) => (
              <TagForm
                key={id}
                id={id}
                onRemove={() => handleRemoveTag(id)}
                disabled={tagKeys.length <= 1}
                onChange={(value) => setValue(`article.tagList.${id}`, value)}
                register={register(`article.tagList.${id}`)}
              />
            ))}
            <Button
              btnText="Add tag"
              type="button"
              btnClassName={styles.addTagBtn}
              handleClick={handleAddTag}
            />
          </div>
        </div>
        <Button btnText="Send" type="submit" btnClassName={styles.newFormBtn} />
      </fieldset>
    </form>
  );
};

export default ArticleForm;
