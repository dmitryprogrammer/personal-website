import {Outlet} from "react-router";
import {useTheme} from "../../providers/theme-provider";
import {Background} from "../background/Background";
import {Header} from "../header/header/header";
import "./App.scss";

export default function App() {
  const {theme} = useTheme();

  return (
    <>
      <Background theme={theme} />
      <main className="main-wrapper">
        <Header />
        <div className="main-container container">
          <Outlet />
        </div>
      </main>
    </>
  );
}
