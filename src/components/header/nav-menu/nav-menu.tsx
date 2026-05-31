import {useTranslation} from "react-i18next";
import {NavLink} from "react-router";
import {useState, useRef, useEffect, useCallback} from "react";
import {useClickOutside} from "../../../core/hooks/useClickOutside";
import {NAVIGATION_ITEMS} from "../../../config/navigation";
import "./nav-menu.scss";

import { memo } from 'react';

export const NavMenu = memo(() => {
  const {t} = useTranslation(undefined, {keyPrefix: "menu"});
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside(menuRef, closeMenu);

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
  }, [isOpen, closeMenu]);

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
        {NAVIGATION_ITEMS.map((item) => (
          <li key={item.path} className="nav-menu__item">
            <NavLink
              to={item.path}
              className="nav-menu__link"
              onClick={closeMenu}
            >
              {t(item.labelKey)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});
