import Button from "@/shared/ui/button";
import ArticleDescription from "@/widgets/articleDescription";
import styles from "../styles/AuthorizedDescription.module.scss";
import { useNavigate } from "react-router-dom";
import LocalModal from "@/shared/ui/modals/localModal";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { fetchArticle } from "@/entities/articlePreview/model/articlesThunk";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import { RootState } from "@/shared/lib/store/types";
import { deleteArticleThunk } from "@/entities/articleManagement/model/thunks";

interface AuthorizedDescriptionProps {
  description: string;
  slug: string;
}

const AuthorizedDescription: React.FC<AuthorizedDescriptionProps> = ({
  description,
  slug,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { offset, limit } = useSelector((state: RootState) => state.articles);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openEditPage = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = useCallback(() => {
    dispatch(deleteArticleThunk(slug))
      .unwrap()
      .then(() => {
        navigate(`/`);
        dispatch(fetchArticle({ limit, offset }));
      })
      .catch((error) => {
        console.error("Failed to delete article:", error);
      });
  }, [dispatch, slug, navigate, limit, offset]);

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

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
