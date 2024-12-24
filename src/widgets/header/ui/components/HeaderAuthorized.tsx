import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/HeaderAuthorized.module.scss";
import profileBase from "@/shared/assets/icons/Profile.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { clearSession } from "@/features/signIn/model/signInSlice";

interface HeaderAuthorizedProps {
  username: string;
  imageProfile?: string
}

const HeaderAuthorized: React.FC<HeaderAuthorizedProps> = ({ username, imageProfile }) => {

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(clearSession());
    navigate("/");
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
      <a className={styles.logOutBtn} onClick={logOut}>
        Log Out
      </a>
    </div>
  );
};

export default HeaderAuthorized;
