import i18next from "./i18next";

export enum LANGUAGES {
  ru = "ru",
  en = "en",
}

export const SUPPORTED_LANGUAGES = [LANGUAGES.ru, LANGUAGES.en];

export function detectUserLanguage(): LANGUAGES {
  if (typeof navigator === "undefined") {
    return LANGUAGES.en;
  }
  const userLang = navigator.language;
  return userLang.toLowerCase().startsWith("ru") ? LANGUAGES.ru : LANGUAGES.en;
}

export function getInitialLanguage(): LANGUAGES {
  if (typeof window === "undefined") {
    return detectUserLanguage();
  }
  const stored = localStorage.getItem("i18nextLng") as LANGUAGES | null;
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }
  return detectUserLanguage();
}

export default i18next;
