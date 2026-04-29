import {LanguagesSwitcher} from "../languages-switcher/languages-switcher";
import {Logo} from "../logo/logo";
import {NavMenu} from "../nav-menu/nav-menu";
import "./header.scss";

export function Header() {
  return (
    <header className="header container">
      <Logo />
      <NavMenu />
      <LanguagesSwitcher />
    </header>
  );
}
