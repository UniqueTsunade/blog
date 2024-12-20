import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.scss"; // под вопросом
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

const container = ReactDOM.createRoot(root);

container.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);