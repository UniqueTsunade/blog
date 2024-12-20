import styles from "./ServerErrorMessage.module.scss";

interface ServerErrorMessageProps {
  errors: { [fieldName: string]: string };
  message: string;
}

const ServerErrorMessage: React.FC<ServerErrorMessageProps> = ({
  errors,
  message,
}) => {
  if (Object.keys(errors).length === 0 && !message) return null;

  return (
    <div className={styles.serverErrorMessageBlock}>
      {Object.entries(errors).length > 0 && (
        <ul>
          {Object.entries(errors).map(([field, errorMessage]) => (
            <li key={field}>{`${field}: ${errorMessage}`}</li>
          ))}
        </ul>
      )}

      {message && <p className={styles.generalServerError}>{message}</p>}
    </div>
  );
};

export default ServerErrorMessage;
