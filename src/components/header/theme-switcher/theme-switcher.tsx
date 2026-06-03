import {THEMES} from "../../../config/themes";
import {useTheme} from "../../../core/hooks/useTheme";
import "./theme-switcher.scss";

export const ThemeSwitcher = () => {
  const {theme, setTheme} = useTheme();

  return (
    <ul className="theme-switcher-list">
      <li className="theme-switcher-list__item">
        <button
          className={`theme-switcher ${theme === THEMES.LIGHT ? "theme-switcher_active" : ""}`}
          onClick={() => setTheme(THEMES.LIGHT)}
        >
          <span className="theme-switcher__icon">Light</span>
        </button>
      </li>
      <li className="theme-switcher-list__item">
        <button
          className={`theme-switcher ${theme === THEMES.DARK ? "theme-switcher_active" : ""}`}
          onClick={() => setTheme(THEMES.DARK)}
        >
          <span className="theme-switcher__icon">Dark</span>
        </button>
      </li>
    </ul>
  );
};
