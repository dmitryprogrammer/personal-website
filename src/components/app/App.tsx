import {Header} from "../header/header/header";
import "./App.scss";

export default function App() {
  return (
    <main className="main-wrapper">
      <Header />
      <div className="container">
        content
        <div>side</div>
      </div>
      <footer>123</footer>
    </main>
  );
}
