import {LanguagesSwitcher} from "../languages-switcher/languages-switcher";
import {Logo} from "../logo/logo";
import {ThemeSwitcher} from "../theme-switcher/theme-switcher";
import "./header.scss";

import {memo} from "react";

export const Header = memo(() => {
  return (
    <header className="header container">
      <Logo />
      <div className="header__actions">
        <LanguagesSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
});
