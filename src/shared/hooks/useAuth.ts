import { useSelector } from "react-redux";
import { RootState } from "../lib/store/types";

export const useAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.signIn.isAuthorized
  );

  return { isAuthenticated };
};
