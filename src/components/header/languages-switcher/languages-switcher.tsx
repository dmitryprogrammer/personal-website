import {useTranslation} from "react-i18next";
import "./languages-switcher.scss";
import {LANGUAGES, SUPPORTED_LANGUAGES} from "../../../core";

export const LanguagesSwitcher = () => {
  const {t, i18n} = useTranslation(undefined, {keyPrefix: "languages"});
  const currentLanguage = i18n.language as LANGUAGES;

  const switchLanguage = (language: LANGUAGES): void => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="languages-switcher">
      {SUPPORTED_LANGUAGES.map((language) => (
        <a
          key={language}
          href="#"
          className={`languages-switcher__item ${
            currentLanguage === language ? "active" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            switchLanguage(language);
          }}
        >
          {t(language)}
        </a>
      ))}
    </div>
  );
};
