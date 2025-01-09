import Portal from "@/shared/ui/portal";
import Button from "../../button";
import styles from "./FullPageModal.module.scss";

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const FullPageModal: React.FC<ModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <Portal>
      <div className={styles.container}>
        <div className={styles.modalBox}>
          <header>
            <button className={styles.closeButton} onClick={onCancel}>
              ×
            </button>
          </header>
          <main>
            <p className={styles.text}>Are you sure you want to log out?</p>
          </main>
          <footer>
            <Button
              type="button"
              btnClassName={styles.btnAccept}
              btnText="Yes"
              handleClick={onConfirm}
            />
            <Button
              type="button"
              btnClassName={styles.btnRefusal}
              btnText="No"
              handleClick={onCancel}
            />
          </footer>
        </div>
      </div>
    </Portal>
  );
};

export default FullPageModal;
