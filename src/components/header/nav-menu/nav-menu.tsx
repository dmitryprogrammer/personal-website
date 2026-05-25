import {useTranslation} from "react-i18next";
import {NavLink} from "react-router";
import {useState, useRef, useEffect} from "react";
import "./nav-menu.scss";

export const NavMenu = () => {
  const {t} = useTranslation(undefined, {keyPrefix: "menu"});
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <nav className="nav-menu" ref={menuRef}>
      <div
        className={`nav-menu__overlay ${isOpen ? "nav-menu__overlay--open" : ""}`}
        onClick={closeMenu}
      />
      <button
        className={`nav-menu__toggle ${isOpen ? "nav-menu__toggle--open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span />
      </button>
      <ul className={`nav-menu__list ${isOpen ? "nav-menu__list--open" : ""}`}>
        <button
          className={`nav-menu__close ${isOpen ? "nav-menu__close--open" : ""}`}
          onClick={closeMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        <li className="nav-menu__item">
          <NavLink to="/" className="nav-menu__link" onClick={closeMenu}>
            {t("home")}
          </NavLink>
        </li>
        <li className="nav-menu__item">
          <NavLink to="/blog" className="nav-menu__link" onClick={closeMenu}>
            {t("blog")}
          </NavLink>
        </li>
        <li className="nav-menu__item">
          <NavLink
            to="/contacts"
            className="nav-menu__link"
            onClick={closeMenu}
          >
            {t("contacts")}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
