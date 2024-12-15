import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { store } from "../store";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ErrorBoundary fallback={<div>Что-то пошло не так...</div>}>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  );
};
