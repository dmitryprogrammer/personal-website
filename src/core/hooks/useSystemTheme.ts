import {useEffect, useState} from "react";
import {THEMES} from "../../config/themes";

const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

const isMatchMediaSupported = (): boolean =>
  typeof window !== "undefined" && typeof window.matchMedia === "function";

export const getSystemTheme = (): THEMES => {
  if (!isMatchMediaSupported()) {
    return THEMES.LIGHT;
  }

  return window.matchMedia(SYSTEM_THEME_QUERY).matches
    ? THEMES.DARK
    : THEMES.LIGHT;
};

export const useSystemTheme = (): THEMES => {
  const [systemTheme, setSystemTheme] = useState<THEMES>(getSystemTheme);

  useEffect(() => {
    if (!isMatchMediaSupported()) {
      return;
    }

    const mediaQueryList = window.matchMedia(SYSTEM_THEME_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? THEMES.DARK : THEMES.LIGHT);
    };

    mediaQueryList.addEventListener("change", handleChange);
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, []);

  return systemTheme;
};
