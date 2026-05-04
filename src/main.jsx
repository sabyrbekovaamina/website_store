import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MainContext from "./context/MainContext.jsx";
import AuthContext from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <MainContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MainContext>
  </AuthContext>,
);
