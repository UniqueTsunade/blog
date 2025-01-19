import styles from "../styles/Skeleton.module.scss";
import ContentLoader from "react-content-loader";

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <ContentLoader
        speed={2}
        width={938}
        height={807}
        viewBox="0 0 938 807"
        backgroundColor="#e6e5e5"
        foregroundColor="#cecaca"
        style={{ backgroundColor: "#fff", marginTop:"26px", padding:"15px" }}
      >
        <circle cx="892" cy="46" r="46" />
        <rect x="753" y="8" rx="0" ry="0" width="81" height="28" />
        <rect x="751" y="38" rx="2" ry="2" width="83" height="22" />
        <rect x="0" y="0" rx="0" ry="0" width="160" height="28" />
        <rect x="173" y="3" rx="0" ry="0" width="34" height="22" />
        <rect x="0" y="33" rx="0" ry="0" width="38" height="20" />
        <rect x="0" y="61" rx="0" ry="0" width="682" height="45" />
        <rect x="0" y="130" rx="0" ry="0" width="938" height="599" />
      </ContentLoader>
    </div>
  );
};

export default Skeleton;
