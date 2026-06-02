import {useState} from "react";
import {THEMES} from "../../../config/themes";
import "./theme-switcher.scss";

export const ThemeSwitcher = () => {
  const [, setTheme] = useState(THEMES.LIGHT);

  return (
    <ul className="theme-switcher-list">
      <li className="theme-switcher-list__item">
        <button
          className="theme-switcher theme-switcher_active"
          onClick={() => setTheme(THEMES.LIGHT)}
        >
          <span className="theme-switcher__icon">Light</span>
        </button>
      </li>
      <li className="theme-switcher-list__item">
        <button
          className="theme-switcher theme-switcher_active"
          onClick={() => setTheme(THEMES.DARK)}
        >
          <span className="theme-switcher__icon">Dark</span>
        </button>
      </li>
    </ul>
  );
};
