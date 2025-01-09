import styles from "./LocalModal.module.scss";
import Button from "../../button";

import Warning from "@/shared/assets/icons/Warning.svg";

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LocalModal: React.FC<ModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.localModal}>
      <div className={styles.modalBlock}>
        <svg
          className={styles.arrow}
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 0L6 12L2.14569e-07 6L6 0Z" />
        </svg>
        <div className={styles.warning}>
          <Warning className={styles.warningIcon} />
          <p className={styles.text}>Are you sure to delete this article?</p>
        </div>

        <div className={styles.warningBtns}>
          <Button
            type="button"
            btnClassName={styles.btnRefusal}
            btnText="No"
            handleClick={onCancel}
          />
          <Button
            type="button"
            btnClassName={styles.btnAccept}
            btnText="Yes"
            handleClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default LocalModal;
