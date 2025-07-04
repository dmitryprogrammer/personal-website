import {SocialMedia} from "../contents/social-media/social-media";
import {Header} from "../header/header/header";
import "./App.scss";

export default function App() {
  return (
    <main className="main-wrapper">
      <Header />
      <div className="container">
        <SocialMedia />
        <div>side</div>
      </div>
      <footer>123</footer>
    </main>
  );
}
