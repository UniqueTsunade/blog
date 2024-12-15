import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <h6 className={styles.logoName}>Realworld Blog</h6>
      </Link>
      <div className={styles.buttons}>
        <Link to="/sign-in" className={styles.signIn}>
          Sign In
        </Link>
        <Link to="/sign-up" className={styles.signUp}>
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
