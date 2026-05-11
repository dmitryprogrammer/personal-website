import {Outlet} from "react-router";
import {Header} from "../header/header/header";
import "./App.scss";

export default function App() {
  return (
    <main className="main-wrapper">
      <Header />
      <div className="main-container container">
        <Outlet />
      </div>
    </main>
  );
}
