import {ContentText} from "../contents/content-text/content-text";
import {SocialMedia} from "../contents/social-media/social-media";
import {Header} from "../header/header/header";
import "./App.scss";

export default function App() {
  return (
    <main className="main-wrapper">
      <Header />
      <div className="main-container container">
        <SocialMedia />
        <ContentText />
      </div>
      <footer></footer>
    </main>
  );
}
