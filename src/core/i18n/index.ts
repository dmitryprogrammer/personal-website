import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";

export enum LANGUAGES {
  ru = "ru",
  en = "en",
}

export const SUPPORTED_LANGUAGES = ["ru", "en"];

i18next
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/src/assets/locales/{{lng}}/translation.json",
    },
    lng: detectUserLanguage(),
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: {escapeValue: false},
  });

export function detectUserLanguage(): LANGUAGES {
  const userLang = navigator.language;

  return userLang.indexOf("ru") >= 0 ? LANGUAGES.ru : LANGUAGES.en;
}
