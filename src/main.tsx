import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/styles/index.scss";
import "./core/i18n/init";
import App from "./components/app/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
