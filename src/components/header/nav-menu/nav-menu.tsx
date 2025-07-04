import {useTranslation} from "react-i18next";
import "./nav-menu.scss";

export const NavMenu = () => {
  const {t} = useTranslation(undefined, {keyPrefix: "menu"});

  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        <li className="nav-menu__item">
          <a href="#" className="nav-menu__link">
            {t("home")}
          </a>
        </li>
        <li className="nav-menu__item">
          <a href="#" className="nav-menu__link">
            {t("blog")}
          </a>
        </li>
        <li className="nav-menu__item">
          <a href="#" className="nav-menu__link">
            {t("contacts")}
          </a>
        </li>
      </ul>
    </nav>
  );
};
