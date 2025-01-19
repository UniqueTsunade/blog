import { Providers } from "./providers";
import AppRouter from "./routers";
import { useRestoreSession } from "./hooks/useRestoreSession";

function App() {
  useRestoreSession();

  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
