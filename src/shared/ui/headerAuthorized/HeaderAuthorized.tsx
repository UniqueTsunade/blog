import { Link } from "react-router-dom";
import styles from "./HeaderAuthorized.module.scss";
import profileBase from "@/shared/assets/icons/Profile.png";

interface HeaderAuthorizedProps {
  username: string;
}

const HeaderAuthorized: React.FC<HeaderAuthorizedProps> = ({ username }) => {
  return (
    <div className={styles.headerAuthorized}>
      <Link to="/new-article" className={styles.createArticle}>
        Create article
      </Link>
      <div className={styles.profile}>
        <Link className={styles.userName} to="/profile">{username}</Link>
        <Link to="/profile"><img className={styles.userImage} src={profileBase} alt="Profile"/></Link>
      </div>
      <Link className={styles.logOutBtn} to="/">Log Out</Link>
    </div>
  );
};

export default HeaderAuthorized;
