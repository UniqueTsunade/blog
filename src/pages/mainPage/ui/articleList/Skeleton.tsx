import ContentLoader from "react-content-loader";
import styles from "../../styles/Skeleton.module.scss";

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <ContentLoader
        speed={2}
        width={938}
        height={140}
        viewBox="0 0 938 140"
        backgroundColor="#e6e5e5"
        foregroundColor="#cecaca"
        style={{ backgroundColor: "#fff", marginBottom: "26px" }}
      >
        <rect x="16" y="21" rx="0" ry="0" width="160" height="28" />
        <rect x="188" y="27" rx="0" ry="0" width="34" height="22" />
        <rect x="779" y="22" rx="0" ry="0" width="74" height="15" />
        <rect x="769" y="42" rx="0" ry="0" width="86" height="15" />
        <rect x="16" y="54" rx="6" ry="6" width="43" height="22" />
        <rect x="62" y="54" rx="6" ry="6" width="43" height="22" />
        <rect x="16" y="86" rx="0" ry="0" width="682" height="38" />
        <circle cx="896" cy="35" r="23" />
      </ContentLoader>
    </div>
  );
};

export default Skeleton;
