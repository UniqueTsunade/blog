import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/HeaderAuthorized.module.scss";
import profileBase from "@/shared/assets/icons/Profile.png";
import { clearSession } from "@/entities/signIn/model/signInSlice";
import { useState } from "react";
import FullPageModal from "@/shared/ui/modals/fullPageModal";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";

interface HeaderAuthorizedProps {
  username: string;
  imageProfile?: string;
}

const HeaderAuthorized: React.FC<HeaderAuthorizedProps> = ({
  username,
  imageProfile,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmLogOut = () => {
    setIsModalOpen(false);
    dispatch(clearSession());
    navigate("/");
  };

  const handleCancelLogOut = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.headerAuthorized}>
      <Link to="/new-article" className={styles.createArticle}>
        Create article
      </Link>
      <div className={styles.profile}>
        <Link className={styles.userName} to="/profile">
          {username}
        </Link>
        {imageProfile ? (
          <Link to="/profile">
            {" "}
            <img
              className={styles.userImage}
              src={imageProfile}
              alt="Profile"
            />
          </Link>
        ) : (
          <Link to="/profile">
            {" "}
            <img className={styles.userImage} src={profileBase} alt="Profile" />
          </Link>
        )}
      </div>
      <button className={styles.logOutBtn} onClick={handleLogOutClick}>
        Log Out
      </button>
      {isModalOpen && (
        <FullPageModal
          onConfirm={handleConfirmLogOut}
          onCancel={handleCancelLogOut}
        />
      )}
    </div>
  );
};

export default HeaderAuthorized;
