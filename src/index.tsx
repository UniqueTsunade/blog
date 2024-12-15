import ReactDOM from 'react-dom/client';
import App from './app';
import "./index.scss"; // под вопросом 

// const root = document.getElementById("root");

// if (!root) {
//     throw new Error("root not found")
// }

// const container = ReactDOM.createRoot(root);

// container.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>,
//   );



const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(<App />);