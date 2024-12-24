import { Link } from "react-router-dom";
import styles from "../styles/HeaderUnauthorized.module.scss";

const HeaderUnauthorized = () => {
  return (
    <div className={styles.buttons}>
      <Link to="/sign-in" className={styles.signIn}>
        Sign In
      </Link>
      <Link to="/sign-up" className={styles.signUp}>
        Sign Up
      </Link>
    </div>
  );
};

export default HeaderUnauthorized;
