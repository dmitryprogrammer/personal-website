import {useState, useEffect} from "react";
import {THEMES} from "../../config/themes";

const THEME_STORAGE_KEY = "theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<THEMES>(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as THEMES;
    return storedTheme || THEMES.LIGHT;
  });

  useEffect(() => {
    const body = document.body;
    body.classList.remove(THEMES.LIGHT, THEMES.DARK);
    body.classList.add("theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return {theme, setTheme};
};
