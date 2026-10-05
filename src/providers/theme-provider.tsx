import {createContext, useContext, useState, useEffect, ReactNode} from "react";
import {THEMES} from "../config/themes";
import {getSystemTheme, useSystemTheme} from "../core/hooks/useSystemTheme";

const THEME_STORAGE_KEY = "theme";

interface ThemeContextType {
  theme: THEMES;
  setTheme: (theme: THEMES) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const systemTheme = useSystemTheme();

  const [theme, setThemeState] = useState<THEMES>(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as THEMES;
    return storedTheme || getSystemTheme();
  });

  useEffect(() => {
    const hasUserPreference = localStorage.getItem(THEME_STORAGE_KEY) !== null;
    if (!hasUserPreference) {
      setThemeState(systemTheme);
    }
  }, [systemTheme]);

  useEffect(() => {
    const body = document.body;
    body.classList.remove(THEMES.LIGHT, THEMES.DARK);
    body.classList.add("theme", theme);
  }, [theme]);

  const setTheme = (nextTheme: THEMES) => {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setThemeState(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
