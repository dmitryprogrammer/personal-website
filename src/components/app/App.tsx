import {Outlet} from "react-router";
import {Header} from "../header/header/header";
import "./App.scss";
import {Background} from "../background/Background";

export default function App() {
  return (
    <>
      <Background theme="light" />
      <main className="main-wrapper">
        <Header />
        <div className="main-container container">
          <Outlet />
        </div>
      </main>
    </>
  );
}
