import styles from "./MainLoader.module.scss";

const MainLoader = () => {
  //return <span className={styles.loader}></span>;
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default MainLoader;
