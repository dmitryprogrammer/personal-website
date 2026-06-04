import {THEMES} from "../../../config/themes";
import {useTheme} from "../../../core/hooks/useTheme";
import {SunIcon, MoonIcon} from "./icons";
import "./theme-switcher.scss";

export const ThemeSwitcher = () => {
  const {theme, setTheme} = useTheme();
  const themeSwitcherActiveClass = "theme-switcher_active";

  return (
    <ul className="theme-switcher-list">
      <li className="theme-switcher-list__item">
        <button
          className={`theme-switcher ${theme === THEMES.LIGHT ? themeSwitcherActiveClass : ""}`}
          onClick={() => setTheme(THEMES.LIGHT)}
          title="Light theme"
        >
          <SunIcon />
        </button>
      </li>
      <li className="theme-switcher-list__item">
        <button
          className={`theme-switcher ${theme === THEMES.DARK ? themeSwitcherActiveClass : ""}`}
          onClick={() => setTheme(THEMES.DARK)}
          title="Dark theme"
        >
          <MoonIcon />
        </button>
      </li>
    </ul>
  );
};
