import { Providers } from "./providers";
import AppRouter from "./routers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect } from "react";
import { restoreSession } from "@/features/signIn/model/signInSlice";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
