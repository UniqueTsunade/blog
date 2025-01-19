import styles from "./ServerErrorMessage.module.scss";

interface ServerErrorMessageProps {
  error: string | null;
}

const ServerErrorMessage: React.FC<ServerErrorMessageProps> = ({ error }) => {
  const formatMessage = (message: string): string => {
    if (!message.endsWith(".")) {
      return `${message}.`;
    }
    return message;
  };

  if (!error) return null;

  if (!error.includes(",")) {
    return (
      <div className={styles.serverErrorMessageBlock}>
        <p className={styles.generalServerError}>{error}</p>
      </div>
    );
  }

  const errorMessages = error
    .split(",")
    .map((message) => message.trim())
    .filter((message) => message.length > 0);

  return (
    <div className={styles.serverErrorMessageBlock}>
      <ul>
        {errorMessages.map((message) => (
          <li key={message}>{formatMessage(message)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServerErrorMessage;
