import Button from "@/shared/ui/button";
import ArticleDescription from "@/shared/ui/articleDescription";
import styles from "./AuthorizedDescription.module.scss";
import { useNavigate } from "react-router-dom";
import LocalModal from "@/shared/ui/modals/localModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { deleteArticle } from "@/features/articles/model/deleteArticle";
import { fetchArticle } from "@/features/articles/model/articlesThunk";

interface AuthorizedDescriptionProps {
  description: string;
  slug: string;
}

const AuthorizedDescription: React.FC<AuthorizedDescriptionProps> = ({
  description,
  slug,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { offset, limit } = useSelector(
    (state: RootState) => state.pagination
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const openEditPage = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteArticle(slug))
    .unwrap() 
    .then(() => {
      console.log("offset", offset)
      navigate(`/`); 
      dispatch(fetchArticle({ limit, offset})); 
    })
    .catch((error) => {
      console.error("Failed to delete article:", error);
    });
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  console.log("isModalOpen", isModalOpen);

  return (
    <div className={styles.authorizedDescription}>
      <ArticleDescription
        articleTextClass={styles.text}
        isFullArticle={true}
        description={description}
      />
      <div className={styles.authorizedBtns}>
        <div className={styles.deleteButtonContainer}>
          <Button
            btnClassName={styles.removeBtn}
            type="button"
            btnText="Delete"
            handleClick={handleDeleteClick}
          />
          {isModalOpen && (
            <LocalModal
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
        </div>
        <Button
          btnClassName={styles.editBtn}
          type="button"
          btnText="Edit"
          handleClick={openEditPage}
        />
      </div>
    </div>
  );
};

export default AuthorizedDescription;
