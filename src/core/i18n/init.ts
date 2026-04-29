import i18next from "./i18next";
import I18NextHttpBackend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";
import {getInitialLanguage} from "./index";

export function initI18n(): void {
  i18next
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
      backend: {
        loadPath: "/src/assets/locales/{{lng}}/translation.json",
      },
      lng: getInitialLanguage(),
      supportedLngs: ["ru", "en"],
      interpolation: {escapeValue: false},
    });
}

// Инициализация только в браузере
if (typeof window !== "undefined") {
  initI18n();
}
