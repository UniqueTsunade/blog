import { Providers } from "./providers";
import AppRouter from "./routers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect } from "react";
import { restoreSession } from "@/features/signIn/model/signInSlice";
import { getCurrentUser } from "@/features/signIn/model/thunks";

function App() {
  const dispatch: AppDispatch = useDispatch();

   useEffect(() => {
    dispatch(restoreSession());

    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      dispatch(getCurrentUser()); 
    } else {
      console.log("we don`t have a token")
    }
  }, [dispatch]);

  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
