import {useTranslation} from "react-i18next";
import {NavLink} from "react-router";
import "./nav-menu.scss";

export const NavMenu = () => {
  const {t} = useTranslation(undefined, {keyPrefix: "menu"});

  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        <li className="nav-menu__item">
          <NavLink to="/" className="nav-menu__link">
            {t("home")}
          </NavLink>
        </li>
        <li className="nav-menu__item">
          <NavLink to="/blog" className="nav-menu__link">
            {t("blog")}
          </NavLink>
        </li>
        <li className="nav-menu__item">
          <NavLink to="/contacts" className="nav-menu__link">
            {t("contacts")}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
