import {useTranslation} from "react-i18next";
import "./languages-switcher.scss";
import {detectUserLanguage, LANGUAGES} from "../../../core";
import {useState} from "react";

const defaultLanguage = detectUserLanguage();

export const LanguagesSwitcher = () => {
  const {t, i18n} = useTranslation(undefined, {keyPrefix: "languages"});

  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

  const switchLanguage = (language: LANGUAGES): void => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  const isActiveButton = (language: LANGUAGES): string => {
    if (currentLanguage === language) {
      return "active";
    }

    return "";
  };

  return (
    <div className="languages-switcher">
      <a
        href="#"
        className={"languages-switcher__item " + isActiveButton(LANGUAGES.ru)}
        onClick={() => switchLanguage(LANGUAGES.ru)}
      >
        {t(LANGUAGES.ru)}
      </a>
      <a
        href="#"
        className={"languages-switcher__item " + isActiveButton(LANGUAGES.en)}
        onClick={() => switchLanguage(LANGUAGES.en)}
      >
        {t(LANGUAGES.en)}
      </a>
    </div>
  );
};
