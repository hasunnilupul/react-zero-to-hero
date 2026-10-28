import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Examples from "./examples/Examples.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <main>
      <h1>Props, State, and One-Way Data Flow</h1>
      <Examples />
      <h2>Lifting state up: the cart</h2>
      <App />
    </main>
  </StrictMode>
);
