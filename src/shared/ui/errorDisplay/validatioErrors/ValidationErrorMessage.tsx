import { FieldError } from "react-hook-form";
import styles from "./ValidationErrorMessage.module.scss";

interface ValidationErrorMessage {
  error: FieldError | null;
  errorClassName?: string;
}

const ValidationErrorMessage: React.FC<ValidationErrorMessage> = ({
  error,
  errorClassName,
}) => {


  if (!error) return null;
  const combinedClassName = errorClassName
    ? `${styles.errorMessage} ${errorClassName}`
    : styles.errorMessage;

  return <p className={combinedClassName}>{error.message}</p>;
};

export default ValidationErrorMessage;


