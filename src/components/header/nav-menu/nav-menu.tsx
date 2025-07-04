import "./nav-menu.scss";

export const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        <li className="nav-menu__item">
          <a href="#" className="nav-menu__link">
            Home
          </a>
        </li>
        <li className="nav-menu__item">
          <a href="#" className="nav-menu__link">
            Blog
          </a>
        </li>
        <li className="nav-menu__item">
          <a href="#" className="nav-menu__link">
            Contacts
          </a>
        </li>
      </ul>
    </nav>
  );
};
