import {useTranslation} from "react-i18next";
import "./nav-menu.scss";
import {Link} from "react-router";

export const NavMenu = () => {
  const {t} = useTranslation(undefined, {keyPrefix: "menu"});

  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        <li className="nav-menu__item">
          <Link to="/" className="nav-menu__link">
            {t("home")}
          </Link>
        </li>
        <li className="nav-menu__item">
          <Link to="/blog" className="nav-menu__link">
            {t("blog")}
          </Link>
        </li>
        <li className="nav-menu__item">
          <Link to="/contacts" className="nav-menu__link">
            {t("contacts")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
