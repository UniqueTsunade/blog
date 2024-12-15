import { BrowserRouter } from "react-router-dom";
import { Providers } from "./providers";
import AppRouter from "./routers";

function App() {

  return (
    <Providers>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Providers>
  );
}

export default App;