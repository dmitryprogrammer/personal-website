import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router";

import {routes} from "./routes";
import "./assets/styles/index.scss";
import "./core/i18n/init";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
