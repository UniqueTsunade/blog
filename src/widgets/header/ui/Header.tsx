import { Link } from "react-router-dom";
import styles from "./styles/Header.module.scss";
import HeaderAuthorized from "./components/HeaderAuthorized";
import HeaderUnauthorized from "./components/HeaderUnAuthorized";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/lib/store/types";

const Header: React.FC = () => {
  const { data, isAuthorized } = useSelector(
    (state: RootState) => state.signIn
  );

  return (
    <header className={styles.header}>
      <Link to="/">
        <h6 className={styles.logoName}>Realworld Blog</h6>
      </Link>
      {isAuthorized ? (
        <HeaderAuthorized username={data?.username} imageProfile={data?.image} />
      ) : (
        <HeaderUnauthorized />
      )}
    </header>
  );
};

export default Header;
