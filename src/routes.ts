import {RouteObject} from "react-router";
import App from "./components/app/App";
import {Blog} from "./pages/blog/blog";
import {Home} from "./pages/home/home";
import {Contacts} from "./pages/contacts/contacts";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: App,
    children: [
      {index: true, Component: Home},
      {path: "/blog", Component: Blog},
      {path: "/contacts", Component: Contacts},
    ],
  },
];
