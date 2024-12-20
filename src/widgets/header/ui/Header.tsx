import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import HeaderAuthorized from "@/shared/ui/headerAuthorized";
import HeaderUnauthorized from "@/shared/ui/headerUnauthorized";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";


const Header: React.FC = () => {

  const {data, isAuthorized} = useSelector((state: RootState) => state.signIn);


  return (
    <header className={styles.header}>
      <Link to="/">
        <h6 className={styles.logoName}>Realworld Blog</h6>
      </Link>
      {isAuthorized ? (
        <HeaderAuthorized username={data?.user.username} />
      ) : (
        <HeaderUnauthorized />
      )}
    </header>
  );
};

export default Header;
