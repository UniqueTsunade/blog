import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetFormSubmitted } from "@/entities/signIn/model/signInSlice";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import { RootState } from "@/shared/lib/store/types";

export const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized, isFormSubmitted } = useSelector(
    (state: RootState) => state.signIn
  );

  useEffect(() => {
    if (isAuthorized && isFormSubmitted) {
      navigate("/");
      dispatch(resetFormSubmitted());
    }
  }, [isAuthorized, isFormSubmitted, navigate, dispatch]);

  return null;
};
