import { useEffect } from "react";
import { restoreSession } from "@/entities/signIn/model/signInSlice";
import { getCurrentUser } from "@/entities/signIn/model/signInThunks";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";

export const useRestoreSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());

    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);
};
